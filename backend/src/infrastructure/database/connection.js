/**
 * Firestore REST API Client para Cloudflare Workers
 * Usa fetch() nativo — sin npm SDK de Firebase
 *
 * Variables de entorno requeridas (wrangler.toml / .dev.vars):
 *   FIREBASE_PROJECT_ID   = "hyper-hause"
 *   FIREBASE_API_KEY      = "AIzaSy..."   (para reglas públicas/auth básica)
 *   FIREBASE_CLIENT_EMAIL = "..."         (service account — para operaciones admin)
 *   FIREBASE_PRIVATE_KEY  = "-----BEGIN PRIVATE KEY-----\n..." (service account)
 */

const FIRESTORE_BASE = (projectId) =>
  `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents`;

// ─── Conversión JS ↔ Firestore ──────────────────────────────────────────────

function toFirestoreValue(value) {
  if (value === null || value === undefined) return { nullValue: null };
  if (typeof value === 'boolean')  return { booleanValue: value };
  if (typeof value === 'number')   return Number.isInteger(value)
    ? { integerValue: String(value) }
    : { doubleValue: value };
  if (typeof value === 'string')   return { stringValue: value };
  if (value instanceof Date)       return { timestampValue: value.toISOString() };
  if (Array.isArray(value))        return { arrayValue: { values: value.map(toFirestoreValue) } };
  if (typeof value === 'object')   return { mapValue: { fields: toFields(value) } };
  return { stringValue: String(value) };
}

function toFields(obj) {
  return Object.fromEntries(
    Object.entries(obj).map(([k, v]) => [k, toFirestoreValue(v)])
  );
}

function fromFirestoreValue(v) {
  if ('nullValue'      in v) return null;
  if ('booleanValue'   in v) return v.booleanValue;
  if ('integerValue'   in v) return parseInt(v.integerValue, 10);
  if ('doubleValue'    in v) return v.doubleValue;
  if ('stringValue'    in v) return v.stringValue;
  if ('timestampValue' in v) return v.timestampValue;
  if ('arrayValue'     in v) return (v.arrayValue.values || []).map(fromFirestoreValue);
  if ('mapValue'       in v) return fromFields(v.mapValue.fields || {});
  return null;
}

function fromFields(fields) {
  return Object.fromEntries(
    Object.entries(fields).map(([k, v]) => [k, fromFirestoreValue(v)])
  );
}

// Extrae id + datos de un documento Firestore
function parseDoc(doc) {
  const parts = doc.name.split('/');
  return {
    id: parts[parts.length - 1],
    ...fromFields(doc.fields || {})
  };
}

// ─── Clase FirestoreClient ────────────────────────────────────────────────────

export class FirestoreClient {
  constructor(env) {
    this.projectId  = env.FIREBASE_PROJECT_ID;
    this.apiKey     = env.FIREBASE_API_KEY;
    this.base       = FIRESTORE_BASE(this.projectId);
  }

  _url(path, params = {}) {
    const url = new URL(`${this.base}/${path}`);
    url.searchParams.set('key', this.apiKey);
    for (const [k, v] of Object.entries(params)) {
      url.searchParams.set(k, v);
    }
    return url.toString();
  }

  async _request(method, path, body = null, params = {}) {
    const res = await fetch(this._url(path, params), {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : undefined
    });

    const json = await res.json();

    if (!res.ok) {
      const msg = json?.error?.message || 'Error Firestore';
      throw new Error(`Firestore [${res.status}]: ${msg}`);
    }

    return json;
  }

  // ── CRUD ────────────────────────────────────────────────────────────────────

  /** Obtiene todos los docs de una colección */
  async getAll(collection) {
    const json = await this._request('GET', collection);
    if (!json.documents) return [];
    return json.documents.map(parseDoc);
  }

  /** Obtiene un doc por id */
  async getById(collection, id) {
    const json = await this._request('GET', `${collection}/${id}`);
    return parseDoc(json);
  }

  /** Crea un doc (Firestore genera el id) */
  async create(collection, data) {
    const json = await this._request(
      'POST',
      collection,
      { fields: toFields(data) }
    );
    return parseDoc(json);
  }

  /** Actualiza parcialmente un doc (PATCH con updateMask) */
  async update(collection, id, data) {
    const fields   = toFields(data);
    const mask     = Object.keys(fields).map(f => `updateMask.fieldPaths=${f}`).join('&');
    const url      = `${this._url(`${collection}/${id}`)}&${mask}`;

    const res = await fetch(url, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fields })
    });

    const json = await res.json();
    if (!res.ok) throw new Error(`Firestore [${res.status}]: ${json?.error?.message}`);
    return parseDoc(json);
  }

  /** Elimina un doc */
  async delete(collection, id) {
    await this._request('DELETE', `${collection}/${id}`);
    return true;
  }

  /**
   * Query estructurada (runQuery) — filtros simples por campo
   * filters: [{ field, op, value }]
   * ops válidos: EQUAL, NOT_EQUAL, LESS_THAN, GREATER_THAN, ARRAY_CONTAINS
   */
  async query(collection, filters = [], orderBy = null, limit = 20) {
    const where = filters.length
      ? {
          compositeFilter: {
            op: 'AND',
            filters: filters.map(({ field, op, value }) => ({
              fieldFilter: {
                field: { fieldPath: field },
                op,
                value: toFirestoreValue(value)
              }
            }))
          }
        }
      : undefined;

    const structuredQuery = {
      from: [{ collectionId: collection }],
      ...(where    && { where }),
      ...(orderBy  && { orderBy: [{ field: { fieldPath: orderBy }, direction: 'DESCENDING' }] }),
      limit
    };

    const json = await this._request('POST', ':runQuery', { structuredQuery });

    if (!Array.isArray(json)) return [];
    return json
      .filter(r => r.document)
      .map(r => parseDoc(r.document));
  }
}
