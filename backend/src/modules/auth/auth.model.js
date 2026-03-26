// Modelo de Usuario
export const usuarioSchema = {
	googleId: String,
	nombre: String,
	email: String,
	foto: String,
	rol: String, // 'admin' o 'normal'
	estado: String, // 'activo' o 'inactivo'
	fechaCreacion: Date,
	ultimoAcceso: Date
};

// Validar estructura de usuario
export function validarUsuario(usuario) {
	if (!usuario.googleId || !usuario.email) {
		throw new Error('googleId y email son requeridos');
	}

	if (!['admin', 'normal'].includes(usuario.rol)) {
		throw new Error('rol debe ser "admin" o "normal"');
	}

	return true;
}
