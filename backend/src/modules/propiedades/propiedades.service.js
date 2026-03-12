import { PropiedadesRepository } from './propiedades.repository.js';
import { validatePropiedad }      from './propiedades.model.js';
import { generateSlug }           from '../../common/utils/slugify.js';

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

    // 1. Crear documento → Firestore genera el ID
    const created = await this.repo.create(data);

    // 2. Generar slug: "casa-moderna-san-isidro-xk92mn"
    const slug = generateSlug(data.titulo, created.id);

    // 3. Guardar slug en el documento
    await this.repo.update(created.id, { slug });

    return { ...created, slug };
  }

  async getBySlug(slug) {
    const propiedad = await this.repo.findBySlug(slug);
    if (!propiedad) throw new Error('Propiedad no encontrada.');
    return propiedad;
  }

  async getRecomendadas(limit = 10) {
    return this.repo.findByRecomendadas(limit);
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
