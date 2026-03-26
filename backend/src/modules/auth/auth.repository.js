import { FirestoreClient } from '../../infrastructure/database/connection.js';
import { validarUsuario } from './auth.model.js';

let db;

/**
 * Inicializar cliente de Firestore
 */
export function initializeAuth(env) {
	db = new FirestoreClient(env);
}

/**
 * Login con Google - Crear o actualizar usuario
 */
export async function loginGoogle(googleId, nombre, email, foto) {
	try {
		// Buscar usuario existente
		const usuarios = await db.query('usuarios', [
			{ field: 'googleId', op: 'EQUAL', value: googleId }
		]);

		let usuario;

		if (usuarios.length === 0) {
			// Crear nuevo usuario
			const nuevoUsuario = {
				googleId,
				nombre,
				email,
				foto,
				rol: 'normal',
				estado: 'activo',
				fechaCreacion: new Date().toISOString(),
				ultimoAcceso: new Date().toISOString()
			};

			validarUsuario(nuevoUsuario);
			usuario = await db.create('usuarios', nuevoUsuario);
		} else {
			// Actualizar último acceso
			usuario = usuarios[0];
			await db.update('usuarios', usuario.id, {
				ultimoAcceso: new Date().toISOString()
			});
			usuario.ultimoAcceso = new Date().toISOString();
		}

		return usuario;
	} catch (error) {
		console.error('Error en loginGoogle:', error.message);
		throw new Error('Error al procesar login: ' + error.message);
	}
}

/**
 * Obtener todos los usuarios (para admin)
 */
export async function obtenerTodosLosUsuarios() {
	try {
		const usuarios = await db.getAll('usuarios');
		return usuarios.map(u => ({
			...u,
			fechaCreacion: u.fechaCreacion ? new Date(u.fechaCreacion).toLocaleDateString() : null,
			ultimoAcceso: u.ultimoAcceso ? new Date(u.ultimoAcceso).toLocaleDateString() : null
		}));
	} catch (error) {
		console.error('Error obteniendo usuarios:', error.message);
		throw error;
	}
}

/**
 * Actualizar rol de usuario
 */
export async function actualizarRolUsuario(usuarioId, rol) {
	try {
		if (!['admin', 'normal'].includes(rol)) {
			throw new Error('Rol inválido. Debe ser "admin" o "normal"');
		}

		const resultado = await db.update('usuarios', usuarioId, { rol });
		return resultado;
	} catch (error) {
		console.error('Error actualizando rol:', error.message);
		throw error;
	}
}

/**
 * Actualizar estado de usuario
 */
export async function actualizarEstadoUsuario(usuarioId, estado) {
	try {
		if (!['activo', 'inactivo'].includes(estado)) {
			throw new Error('Estado inválido. Debe ser "activo" o "inactivo"');
		}

		const resultado = await db.update('usuarios', usuarioId, { estado });
		return resultado;
	} catch (error) {
		console.error('Error actualizando estado:', error.message);
		throw error;
	}
}

/**
 * Crear usuario manualmente (solo admin)
 */
export async function crearUsuarioManual(nombre, email, rol = 'normal') {
	try {
		// Validar que no exista un usuario con ese email
		const existentes = await db.query('usuarios', [
			{ field: 'email', op: 'EQUAL', value: email }
		]);

		if (existentes.length > 0) {
			throw new Error('El email ya está registrado');
		}

		const nuevoUsuario = {
			googleId: null,
			nombre,
			email,
			foto: null,
			rol,
			estado: 'activo',
			fechaCreacion: new Date().toISOString(),
			ultimoAcceso: new Date().toISOString()
		};

		validarUsuario(nuevoUsuario);
		const usuario = await db.create('usuarios', nuevoUsuario);
		return usuario;
	} catch (error) {
		console.error('Error creando usuario:', error.message);
		throw error;
	}
}

/**
 * Eliminar usuario
 */
export async function eliminarUsuario(usuarioId) {
	try {
		await db.delete('usuarios', usuarioId);
		return { mensaje: 'Usuario eliminado correctamente' };
	} catch (error) {
		console.error('Error eliminando usuario:', error.message);
		throw error;
	}
}

