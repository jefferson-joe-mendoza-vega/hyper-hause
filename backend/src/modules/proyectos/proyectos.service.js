import { ProyectosRepository } from './proyectos.repository.js';
import { createProyectoModel, validateProyecto } from './proyectos.model.js';

export class ProyectosService {
  constructor(env) {
    this.env         = env;
    this.repository  = new ProyectosRepository(env);
  }

  /**
   * Obtener todos los proyectos
   */
  async getAll() {
    try {
      const proyectos = await this.repository.getAll();
      return proyectos.filter(p => p.activo);
    } catch (error) {
      console.error('Error en ProyectosService.getAll:', error);
      return [];
    }
  }

  /**
   * Obtener proyecto por ID
   */
  async getById(id) {
    if (!id) throw new Error('ID requerido');
    
    const proyecto = await this.repository.getById(id);
    if (!proyecto) throw new Error('Proyecto no encontrado');
    
    return proyecto;
  }

  /**
   * Obtener proyecto por slug
   */
  async getBySlug(slug) {
    if (!slug) throw new Error('Slug requerido');
    
    const proyecto = await this.repository.getBySlug(slug);
    if (!proyecto) throw new Error('Proyecto no encontrado');
    
    return proyecto;
  }

  /**
   * Crear proyecto
   */
  async create(data) {
    // Validar
    const validation = validateProyecto(data);
    if (!validation.isValid) {
      throw new Error(validation.errors.join(' '));
    }

    // Crear modelo
    const proyecto = createProyectoModel(data);

    // Generar slug
    proyecto.slug = this._generarSlug(proyecto.nombre);

    // Guardar
    return await this.repository.create(proyecto);
  }

  /**
   * Actualizar proyecto
   */
  async update(id, data) {
    if (!id) throw new Error('ID requerido');

    // Validar
    const validation = validateProyecto(data);
    if (!validation.isValid) {
      throw new Error(validation.errors.join(' '));
    }

    // Crear modelo
    const proyecto = createProyectoModel(data);

    // Generar slug si cambió nombre
    if (data.nombre) {
      proyecto.slug = this._generarSlug(data.nombre);
    }

    // Actualizar
    return await this.repository.update(id, proyecto);
  }

  /**
   * Eliminar proyecto
   */
  async delete(id) {
    if (!id) throw new Error('ID requerido');
    
    return await this.repository.delete(id);
  }

  /**
   * Generar slug a partir del nombre
   */
  _generarSlug(nombre) {
    return nombre
      .toLowerCase()
      .trim()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remover acentos
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  }
}
