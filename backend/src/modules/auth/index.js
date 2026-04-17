import { generateToken } from '../../core/jwt/jwt.js';
import { requireAdmin } from '../../core/middleware/admin.middleware.js';
import { extractAndVerifyToken } from '../../core/middleware/auth.middleware.js';
import { FirestoreClient } from '../../infrastructure/database/connection.js';
import { initializeAuth, loginGoogle, obtenerTodosLosUsuarios, actualizarRolUsuario, actualizarEstadoUsuario, crearUsuarioManual, eliminarUsuario } from './auth.repository.js';

export function registerAuthRoutes(router, env) {
	// Inicializar Firestore client para auth
	initializeAuth(env);
	const jwtSecret = env.JWT_SECRET || 'tu-secret-key-desarrollo';
	const db = new FirestoreClient(env); // ⭐ Cliente Firestore para verificaciones

	// Verificar token (PUBLIC - para validar antes de acceder a rutas protegidas)
	router.post('/api/auth/verify', async (req) => {
		try {
			const payload = await extractAndVerifyToken(req, jwtSecret);

			if (!payload) {
				return new Response(
					JSON.stringify({
						ok: false,
						mensaje: 'Token inválido o expirado'
					}),
					{ status: 401, headers: { 'Content-Type': 'application/json' } }
				);
			}

			return new Response(
				JSON.stringify({
					ok: true,
					mensaje: 'Token válido',
					usuario: {
						id: payload.id,
						email: payload.email,
						nombre: payload.nombre,
						rol: payload.rol
					}
				}),
				{ status: 200, headers: { 'Content-Type': 'application/json' } }
			);
		} catch (error) {
			return new Response(
				JSON.stringify({ ok: false, error: error.message }),
				{ status: 500, headers: { 'Content-Type': 'application/json' } }
			);
		}
	});

	// Login con Google (PUBLIC)
	router.post('/api/auth/login-google', async (req) => {
		const { idToken, googleId, nombre, email, foto } = await req.json();

		try {
			const usuario = await loginGoogle(googleId, nombre, email, foto);

			console.log('🔐 Usuario después de login:', {
				id: usuario.id,
				nombre: usuario.nombre,
				email: usuario.email,
				rol: usuario.rol,
				estado: usuario.estado
			});

			// Generar JWT token
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

			console.log('✅ Token generado para usuario con rol:', usuario.rol);

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
			console.error('❌ Error en login:', error);
			return new Response(
				JSON.stringify({ error: error.message }),
				{ status: 500, headers: { 'Content-Type': 'application/json' } }
			);
		}
	});

	// Obtener todos los usuarios (ADMIN ONLY)
	router.get('/api/admin/usuarios', async (req) => {
		// Verificar que sea admin ⭐ Pasar db para verificar rol en BD
		const authResult = await requireAdmin(req, jwtSecret, db);
		if (authResult instanceof Response) {
			return authResult;
		}

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

	// Actualizar rol de usuario (ADMIN ONLY)
	router.put('/api/admin/usuarios/:id/rol', async (req, params) => {
		// Verificar que sea admin
		const authResult = await requireAdmin(req, jwtSecret, db);
		if (authResult instanceof Response) {
			return authResult;
		}

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

	// Actualizar estado de usuario (ADMIN ONLY)
	router.put('/api/admin/usuarios/:id/estado', async (req, params) => {
		// Verificar que sea admin
		const authResult = await requireAdmin(req, jwtSecret, db);
		if (authResult instanceof Response) {
			return authResult;
		}

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

	// Crear usuario manualmente (ADMIN ONLY)
	router.post('/api/admin/usuarios', async (req) => {
		// Verificar que sea admin
		const authResult = await requireAdmin(req, jwtSecret, db);
		if (authResult instanceof Response) {
			return authResult;
		}

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

	// Eliminar usuario (ADMIN ONLY)
	router.delete('/api/admin/usuarios/:id', async (req, params) => {
		// Verificar que sea admin
		const authResult = await requireAdmin(req, jwtSecret, db);
		if (authResult instanceof Response) {
			return authResult;
		}

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


