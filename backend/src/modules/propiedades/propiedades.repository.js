import { FirestoreClient } from '../../infrastructure/database/connection.js';
import { COLLECTION, createPropiedadModel } from './propiedades.model.js';

export class PropiedadesRepository {
  constructor(env) {
    this.db = new FirestoreClient(env);
  }

  async findAll() {
    return this.db.getAll(COLLECTION);
  }

  async findById(id) {
    return this.db.getById(COLLECTION, id);
  }

  /** Filtra por tipoOperacion y/o tipoInmueble */
  async findByFilters({ tipoOperacion, tipoInmueble, limit = 20 } = {}) {
    const filters = [];
    if (tipoOperacion) filters.push({ field: 'tipoOperacion', op: 'EQUAL', value: tipoOperacion });
    if (tipoInmueble)  filters.push({ field: 'tipoInmueble',  op: 'EQUAL', value: tipoInmueble });
    return this.db.query(COLLECTION, filters, 'creadoEn', limit);
  }

  async create(data) {
    const model = createPropiedadModel(data);
    return this.db.create(COLLECTION, model);
  }

  async update(id, data) {
    const partial = {
      ...data,
      actualizadoEn: new Date().toISOString()
    };
    return this.db.update(COLLECTION, id, partial);
  }

  async delete(id) {
    return this.db.delete(COLLECTION, id);
  }
}
