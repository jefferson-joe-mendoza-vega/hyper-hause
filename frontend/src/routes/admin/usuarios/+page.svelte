<script>
	import { onMount } from 'svelte';

	const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8787';

	let usuarios = $state([]);
	let loading = $state(true);
	let error = $state(null);
	let editandoId = $state(null);
	let nuevoRol = $state('normal');

	onMount(async () => {
		console.log('📋 Iniciando carga de usuarios...');
		await cargarUsuarios();
	});

	async function cargarUsuarios() {
		console.log('📋 Iniciando carga de usuarios...');
		
		try {
			const token = localStorage.getItem('auth_token');
			console.log('🔑 Token encontrado:', token ? '✅' : '❌');
			
			if (!token) {
				error = 'No estás autenticado. Por favor inicia sesión.';
				loading = false;
				return;
			}

			console.log('📡 Llamando a backend:', `${BACKEND_URL}/api/admin/usuarios`);

			const res = await fetch(`${BACKEND_URL}/api/admin/usuarios`, {
				method: 'GET',
				headers: {
					'Authorization': `Bearer ${token}`,
					'Content-Type': 'application/json'
				}
			});

			console.log('📊 Respuesta status:', res.status);

			if (!res.ok) {
				const data = await res.json();
				throw new Error(data.error || 'Error al obtener usuarios');
			}

			const data = await res.json();
			console.log('✅ Data recibida:', data);
			
			usuarios = data.usuarios || [];
			console.log('✅ Usuarios asignados:', usuarios.length);
			
		} catch (err) {
			console.error('❌ Error en fetch:', err.message);
			error = err.message;
		} finally {
			loading = false;
			console.log('✅ Loading puesto a false');
		}
	}

	async function actualizarRol(usuarioId, rolActual) {
		const nuevoRolSeleccionado = rolActual === 'admin' ? 'normal' : 'admin';
		
		try {
			const token = localStorage.getItem('auth_token');
			
			const res = await fetch(`${BACKEND_URL}/api/admin/usuarios/${usuarioId}/rol`, {
				method: 'PUT',
				headers: {
					'Authorization': `Bearer ${token}`,
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ rol: nuevoRolSeleccionado })
			});

			if (!res.ok) {
				const data = await res.json();
				throw new Error(data.error || 'Error al actualizar rol');
			}

			console.log('✅ Rol actualizado correctamente');
			editandoId = null;
			await cargarUsuarios();
		} catch (err) {
			console.error('❌ Error:', err);
			alert('Error al actualizar rol: ' + err.message);
		}
	}

	function formatearFecha(fecha) {
		if (!fecha) return '-';
		try {
			return new Date(fecha).toLocaleDateString('es-ES', {
				year: 'numeric',
				month: '2-digit',
				day: '2-digit'
			});
		} catch {
			return 'Inválida';
		}
	}
</script>

<div class="usuarios-admin">
	<h1 class="page-title">Gestionar Usuarios</h1>

	{#if loading}
		<div class="loading">
			<p>⏳ Cargando usuarios...</p>
		</div>
	{:else if error}
		<div class="error-state">
			<p>❌ {error}</p>
		</div>
	{:else if usuarios.length === 0}
		<div class="empty-state">
			<p>📭 No hay usuarios registrados</p>
		</div>
	{:else}
		<div class="usuarios-table">
			<table>
				<thead>
					<tr>
						<th>Email</th>
						<th>Nombre</th>
						<th>Rol</th>
						<th>Estado</th>
						<th>Último Acceso</th>
						<th>Fecha Creación</th>
						<th>Acciones</th>
					</tr>
				</thead>
				<tbody>
					{#each usuarios as usuario (usuario.id)}
						<tr>
							<td class="email">{usuario.email}</td>
							<td>{usuario.nombre}</td>
							<td>
								<span class="rol-badge" class:admin={usuario.rol === 'admin'}>
									{usuario.rol}
								</span>
							</td>
							<td>
								<span class="estado-badge" class:activo={usuario.estado === 'activo'}>
									{usuario.estado}
								</span>
							</td>
							<td class="fecha">{formatearFecha(usuario.ultimoAcceso)}</td>
							<td class="fecha">{formatearFecha(usuario.fechaCreacion)}</td>
							<td class="acciones">
								<button 
									class="btn-cambiar-rol"
									onclick={() => actualizarRol(usuario.id, usuario.rol)}
									title={usuario.rol === 'admin' ? 'Bajar a usuario normal' : 'Hacer admin'}
								>
									{usuario.rol === 'admin' ? '👤 Bajar rol' : '👑 Hacer admin'}
								</button>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
</div>

<style>
	.usuarios-admin {
		max-width: 1200px;
		margin: 0 auto;
		padding: 20px;
	}

	.page-title {
		font-size: 28px;
		color: var(--text-main);
		font-weight: 700;
		margin-bottom: 30px;
		letter-spacing: -0.5px;
	}

	.loading,
	.empty-state,
	.error-state {
		background-color: var(--white);
		border-radius: 12px;
		padding: 60px 20px;
		text-align: center;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
	}

	.error-state {
		color: #ef4444;
		font-weight: 600;
	}

	.empty-state {
		color: var(--text-gray);
	}

	.usuarios-table {
		background: var(--white);
		border-radius: 12px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
		overflow-x: auto;
	}

	table {
		width: 100%;
		border-collapse: collapse;
		font-size: 14px;
	}

	thead {
		background: #f8fafc;
		border-bottom: 2px solid #e2e8f0;
	}

	th {
		padding: 16px 12px;
		text-align: left;
		font-weight: 600;
		color: var(--text-main);
		letter-spacing: -0.3px;
	}

	tbody tr {
		border-bottom: 1px solid #f1f5f9;
		transition: background-color 0.15s;
	}

	tbody tr:hover {
		background-color: #fafbfc;
	}

	td {
		padding: 14px 12px;
		color: var(--text-main);
	}

	.email {
		font-family: 'Monaco', 'Courier New', monospace;
		font-size: 12px;
		color: var(--text-blue);
	}

	.fecha {
		font-size: 12px;
		color: var(--text-gray);
	}

	.rol-badge {
		display: inline-block;
		padding: 4px 12px;
		border-radius: 20px;
		background: #eef4ff;
		color: var(--text-blue);
		font-weight: 600;
		font-size: 12px;
	}

	.rol-badge.admin {
		background: #dbeafe;
		color: #1e40af;
	}

	.estado-badge {
		display: inline-block;
		padding: 4px 12px;
		border-radius: 20px;
		background: #f0fdf4;
		color: #22c55e;
		font-weight: 600;
		font-size: 12px;
	}

	.estado-badge:not(.activo) {
		background: #fee2e2;
		color: #ef4444;
	}

	.acciones {
		text-align: center;
	}

	.btn-cambiar-rol {
		padding: 6px 12px;
		border-radius: 8px;
		border: 1px solid #e2e8f0;
		background: white;
		color: var(--text-blue);
		font-size: 12px;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.2s;
		white-space: nowrap;
	}

	.btn-cambiar-rol:hover {
		background: #eef4ff;
		border-color: var(--text-blue);
		box-shadow: 0 2px 4px rgba(26, 75, 142, 0.1);
	}

	.btn-cambiar-rol:active {
		transform: scale(0.98);
	}

	/* Responsive */
	@media (max-width: 1024px) {
		.usuarios-admin {
			max-width: 100%;
			padding: 16px;
		}

		.page-title {
			font-size: 24px;
			margin-bottom: 24px;
		}

		table {
			font-size: 13px;
		}

		th,
		td {
			padding: 12px 8px;
		}
	}

	@media (max-width: 768px) {
		.page-title {
			font-size: 20px;
			margin-bottom: 20px;
		}

		.loading,
		.empty-state,
		.error-state {
			padding: 40px 16px;
			border-radius: 8px;
		}

		th,
		td {
			padding: 10px 6px;
			font-size: 12px;
		}

		.email {
			font-size: 10px;
		}
	}

	@media (max-width: 480px) {
		.page-title {
			font-size: 18px;
			margin-bottom: 16px;
		}

		.loading,
		.empty-state,
		.error-state {
			padding: 30px 12px;
		}

		table {
			font-size: 11px;
		}

		th,
		td {
			padding: 8px 4px;
		}
	}
</style>
