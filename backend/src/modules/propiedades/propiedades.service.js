import { PropiedadesRepository } from './propiedades.repository.js';
import { validatePropiedad }      from './propiedades.model.js';

export class PropiedadesService {
  constructor(env) {
    this.repo = new PropiedadesRepository(env);
  }

  async getAll() {
    return this.repo.findAll();
  }

  async getById(id) {
    const propiedad = await this.repo.findById(id);
    if (!propiedad) throw new Error('Propiedad no encontrada.');
    return propiedad;
  }

  async buscar({ tipoOperacion, tipoInmueble, limit } = {}) {
    return this.repo.findByFilters({ tipoOperacion, tipoInmueble, limit });
  }

  async create(data) {
    const errors = validatePropiedad(data);
    if (errors.length) throw new ValidationError(errors);
    return this.repo.create(data);
  }

  async update(id, data) {
    await this.getById(id); // verifica que existe
    return this.repo.update(id, data);
  }

  async delete(id) {
    await this.getById(id); // verifica que existe
    return this.repo.delete(id);
  }
}

class ValidationError extends Error {
  constructor(errors) {
    super('Error de validación');
    this.name    = 'ValidationError';
    this.errors  = errors;
    this.status  = 422;
  }
}
