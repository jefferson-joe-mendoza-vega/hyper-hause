import { generateToken } from '../../core/jwt/jwt.js';
import { initializeAuth, loginGoogle, obtenerTodosLosUsuarios, actualizarRolUsuario, actualizarEstadoUsuario, crearUsuarioManual, eliminarUsuario } from './auth.repository.js';

export function registerAuthRoutes(router, env) {
	// Inicializar Firestore client para auth
	initializeAuth(env);

	// Login con Google
	router.post('/api/auth/login-google', async (req) => {
		const { idToken, googleId, nombre, email, foto } = await req.json();

		try {
			const usuario = await loginGoogle(googleId, nombre, email, foto);

			// Generar JWT token
			const jwtSecret = env.JWT_SECRET || 'tu-secret-key-desarrollo';
			const token = await generateToken(
				{
					id: usuario.id,
					googleId: usuario.googleId,
					email: usuario.email,
					nombre: usuario.nombre,
					rol: usuario.rol
				},
				jwtSecret,
				7 * 24 * 60 * 60 // 7 días
			);

			return new Response(
				JSON.stringify({
					ok: true,
					mensaje: 'Login exitoso',
					token,
					usuario: {
						id: usuario.id,
						nombre: usuario.nombre,
						email: usuario.email,
						foto: usuario.foto,
						rol: usuario.rol,
						estado: usuario.estado
					}
				}),
				{ status: 200, headers: { 'Content-Type': 'application/json' } }
			);
		} catch (error) {
			return new Response(
				JSON.stringify({ error: error.message }),
				{ status: 500, headers: { 'Content-Type': 'application/json' } }
			);
		}
	});

	// Obtener todos los usuarios (admin)
	router.get('/api/admin/usuarios', async (req) => {
		try {
			const usuarios = await obtenerTodosLosUsuarios();

			return new Response(
				JSON.stringify({
					ok: true,
					total: usuarios.length,
					usuarios
				}),
				{ status: 200, headers: { 'Content-Type': 'application/json' } }
			);
		} catch (error) {
			return new Response(
				JSON.stringify({ error: error.message }),
				{ status: 500, headers: { 'Content-Type': 'application/json' } }
			);
		}
	});

	// Actualizar rol de usuario
	router.put('/api/admin/usuarios/:id/rol', async (req, params) => {
		const id = params.id;
		const { rol } = await req.json();

		try {
			const resultado = await actualizarRolUsuario(id, rol);

			return new Response(
				JSON.stringify({
					ok: true,
					mensaje: 'Rol actualizado',
					resultado
				}),
				{ status: 200, headers: { 'Content-Type': 'application/json' } }
			);
		} catch (error) {
			return new Response(
				JSON.stringify({ error: error.message }),
				{ status: 500, headers: { 'Content-Type': 'application/json' } }
			);
		}
	});

	// Actualizar estado de usuario
	router.put('/api/admin/usuarios/:id/estado', async (req, params) => {
		const id = params.id;
		const { estado } = await req.json();

		try {
			const resultado = await actualizarEstadoUsuario(id, estado);

			return new Response(
				JSON.stringify({
					ok: true,
					mensaje: 'Estado actualizado',
					resultado
				}),
				{ status: 200, headers: { 'Content-Type': 'application/json' } }
			);
		} catch (error) {
			return new Response(
				JSON.stringify({ error: error.message }),
				{ status: 500, headers: { 'Content-Type': 'application/json' } }
			);
		}
	});

	// Crear usuario manualmente (admin)
	router.post('/api/admin/usuarios', async (req) => {
		const { nombre, email, rol } = await req.json();

		try {
			const usuario = await crearUsuarioManual(nombre, email, rol || 'normal');

			return new Response(
				JSON.stringify({
					ok: true,
					mensaje: 'Usuario creado',
					usuario
				}),
				{ status: 201, headers: { 'Content-Type': 'application/json' } }
			);
		} catch (error) {
			return new Response(
				JSON.stringify({ error: error.message }),
				{ status: 500, headers: { 'Content-Type': 'application/json' } }
			);
		}
	});

	// Eliminar usuario
	router.delete('/api/admin/usuarios/:id', async (req, params) => {
		const id = params.id;

		try {
			const resultado = await eliminarUsuario(id);

			return new Response(
				JSON.stringify({
					ok: true,
					mensaje: 'Usuario eliminado',
					resultado
				}),
				{ status: 200, headers: { 'Content-Type': 'application/json' } }
			);
		} catch (error) {
			return new Response(
				JSON.stringify({ error: error.message }),
				{ status: 500, headers: { 'Content-Type': 'application/json' } }
			);
		}
	});
}

