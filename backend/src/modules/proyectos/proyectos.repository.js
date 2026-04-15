import { COLLECTION } from './proyectos.model.js';

export class ProyectosRepository {
  constructor(env) {
    this.env         = env;
    this.firestore   = env.__kv__; // Kv binding desde Cloudflare
  }

  /**
   * Obtener todos los proyectos
   */
  async getAll() {
    try {
      // Desde Firestore, obtener documentos con activo = true
      const getDoc = async () => {
        const response = await fetch(
          `https://firestore.googleapis.com/v1/projects/${this.env.FIREBASE_PROJECT_ID}/databases/(default)/documents/${COLLECTION}`,
          {
            headers: {
              'Authorization': `Bearer ${await this._getFirebaseToken()}`
            }
          }
        );
        if (!response.ok) throw new Error('Error fetching from Firestore');
        const data = await response.json();
        return data.documents?.map(doc => this._docToObject(doc)) || [];
      };

      return await getDoc();
    } catch (error) {
      console.error('Error en ProyectosRepository.getAll:', error);
      return [];
    }
  }

  /**
   * Obtener proyecto por ID
   */
  async getById(id) {
    try {
      const response = await fetch(
        `https://firestore.googleapis.com/v1/projects/${this.env.FIREBASE_PROJECT_ID}/databases/(default)/documents/${COLLECTION}/${id}`,
        {
          headers: {
            'Authorization': `Bearer ${await this._getFirebaseToken()}`
          }
        }
      );

      if (!response.ok) return null;
      
      const doc = await response.json();
      return this._docToObject(doc);
    } catch (error) {
      console.error('Error en ProyectosRepository.getById:', error);
      return null;
    }
  }

  /**
   * Obtener proyecto por slug
   */
  async getBySlug(slug) {
    try {
      const response = await fetch(
        `https://firestore.googleapis.com/v1/projects/${this.env.FIREBASE_PROJECT_ID}/databases/(default)/documents/${COLLECTION}?pageSize=1&orderBy=slug&filter={"fieldFilter":{"field":{"fieldPath":"slug"},"op":"EQUAL","value":{"stringValue":"${slug}"}}}`,
        {
          headers: {
            'Authorization': `Bearer ${await this._getFirebaseToken()}`
          }
        }
      );

      if (!response.ok) return null;
      
      const data = await response.json();
      const doc = data.documents?.[0];
      return doc ? this._docToObject(doc) : null;
    } catch (error) {
      console.error('Error en ProyectosRepository.getBySlug:', error);
      return null;
    }
  }

  /**
   * Crear proyecto
   */
  async create(proyectoData) {
    try {
      const response = await fetch(
        `https://firestore.googleapis.com/v1/projects/${this.env.FIREBASE_PROJECT_ID}/databases/(default)/documents/${COLLECTION}`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${await this._getFirebaseToken()}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            fields: this._objectToFirestoreFields(proyectoData)
          })
        }
      );

      if (!response.ok) throw new Error('Error creating proyecto');
      
      const doc = await response.json();
      return this._docToObject(doc);
    } catch (error) {
      console.error('Error en ProyectosRepository.create:', error);
      throw error;
    }
  }

  /**
   * Actualizar proyecto
   */
  async update(id, proyectoData) {
    try {
      const response = await fetch(
        `https://firestore.googleapis.com/v1/projects/${this.env.FIREBASE_PROJECT_ID}/databases/(default)/documents/${COLLECTION}/${id}`,
        {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${await this._getFirebaseToken()}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            fields: this._objectToFirestoreFields(proyectoData)
          })
        }
      );

      if (!response.ok) throw new Error('Error updating proyecto');
      
      const doc = await response.json();
      return this._docToObject(doc);
    } catch (error) {
      console.error('Error en ProyectosRepository.update:', error);
      throw error;
    }
  }

  /**
   * Eliminar proyecto
   */
  async delete(id) {
    try {
      const response = await fetch(
        `https://firestore.googleapis.com/v1/projects/${this.env.FIREBASE_PROJECT_ID}/databases/(default)/documents/${COLLECTION}/${id}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${await this._getFirebaseToken()}`
          }
        }
      );

      if (!response.ok) throw new Error('Error deleting proyecto');
      
      return true;
    } catch (error) {
      console.error('Error en ProyectosRepository.delete:', error);
      throw error;
    }
  }

  /**
   * Helper: Convertir documento Firestore a objeto JS
   */
  _docToObject(doc) {
    if (!doc.fields) return null;
    
    const obj = {
      id: doc.name?.split('/').pop() || null,
      ...this._firestoreFieldsToObject(doc.fields)
    };
    
    return obj;
  }

  /**
   * Helper: Convertir campos Firestore a objeto JS
   */
  _firestoreFieldsToObject(fields) {
    const obj = {};
    
    for (const [key, value] of Object.entries(fields)) {
      if (value.stringValue !== undefined) {
        obj[key] = value.stringValue;
      } else if (value.numberValue !== undefined) {
        obj[key] = Number(value.numberValue);
      } else if (value.booleanValue !== undefined) {
        obj[key] = value.booleanValue;
      } else if (value.arrayValue?.values) {
        obj[key] = value.arrayValue.values.map(v => {
          if (v.stringValue) return v.stringValue;
          if (v.numberValue) return Number(v.numberValue);
          if (v.mapValue) return this._firestoreFieldsToObject(v.mapValue.fields);
          return v;
        });
      } else if (value.mapValue?.fields) {
        obj[key] = this._firestoreFieldsToObject(value.mapValue.fields);
      } else if (value.nullValue === null) {
        obj[key] = null;
      }
    }
    
    return obj;
  }

  /**
   * Helper: Convertir objeto JS a campos Firestore
   */
  _objectToFirestoreFields(obj) {
    const fields = {};
    
    for (const [key, value] of Object.entries(obj)) {
      if (value === null || value === undefined) {
        fields[key] = { nullValue: null };
      } else if (typeof value === 'string') {
        fields[key] = { stringValue: value };
      } else if (typeof value === 'number') {
        fields[key] = { doubleValue: value };
      } else if (typeof value === 'boolean') {
        fields[key] = { booleanValue: value };
      } else if (Array.isArray(value)) {
        fields[key] = {
          arrayValue: {
            values: value.map(v => {
              if (typeof v === 'string') return { stringValue: v };
              if (typeof v === 'number') return { doubleValue: v };
              if (typeof v === 'object') return { mapValue: { fields: this._objectToFirestoreFields(v) } };
              return { stringValue: String(v) };
            })
          }
        };
      } else if (typeof value === 'object') {
        fields[key] = { mapValue: { fields: this._objectToFirestoreFields(value) } };
      }
    }
    
    return fields;
  }

  /**
   * Helper: Obtener token de Firebase (JWT para autenticarse con Firestore)
   */
  async _getFirebaseToken() {
    // Para Cloudflare Workers, usar el API key de Firebase
    // En producción, usar Service Account para mejor seguridad
    return `${this.env.FIREBASE_API_KEY}`;
  }
}
