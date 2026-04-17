<script>
	import { onMount } from 'svelte';

	let deferredPrompt = null;
	let showInstallButton = false;
	let isIOS = false;
	let showIOSInstructions = false;
	let hydrated = false; // Prevenir hydration mismatch

	onMount(() => {
		hydrated = true; // Marcar como hidratado
		
		// Detectar iOS
		isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
		console.log('📱 Detectando dispositivo:', { isIOS, userAgent: navigator.userAgent });

		// Verificar manifest
		fetch('/manifest.json')
			.then(r => r.json())
			.then(manifest => console.log('✅ Manifest cargado:', manifest))
			.catch(e => console.error('❌ Error cargando manifest:', e));

		// Verificar service worker
		if ('serviceWorker' in navigator) {
			console.log('✅ Service Worker soportado');
		} else {
			console.warn('⚠️ Service Worker NO soportado');
		}

		// Intentar mostrar botón en iOS
		if (isIOS) {
			showIOSInstructions = true;
			console.log('📱 iOS detectado - mostrando instrucciones');
		}

		// Detectar si el navegador soporta PWA install prompt
		window.addEventListener('beforeinstallprompt', (e) => {
			console.log('🎉 beforeinstallprompt disparado!');
			e.preventDefault();
			deferredPrompt = e;
			showInstallButton = true;
		});

		// Esto puede no dispararse en algunos navegadores, así que mostrar botón de todas formas si es iOS
		setTimeout(() => {
			if (!showInstallButton && isIOS) {
				showInstallButton = true;
				console.log('⏱️ Mostrando botón por timeout en iOS');
			}
		}, 2000);

		// Detectar si la app ya está instalada
		window.addEventListener('appinstalled', () => {
			console.log('✅ App instalada exitosamente');
			showInstallButton = false;
			deferredPrompt = null;
		});

		console.log('🔍 PWAInstaller inicializado');
	});

	async function handleInstall() {
		console.log('👆 Click en botón instalar');
		
		if (isIOS && !deferredPrompt) {
			// Mostrar instrucciones para iOS
			showIOSInstructions = true;
			return;
		}

		if (!deferredPrompt) {
			console.log('❌ No hay prompt disponible');
			return;
		}

		// Mostrar el prompt nativo del navegador
		deferredPrompt.prompt();

		// Esperar la respuesta del usuario
		const { outcome } = await deferredPrompt.userChoice;
		console.log(`📱 Usuario eligió: ${outcome}`);

		// Limpiar el estado
		deferredPrompt = null;
		showInstallButton = false;
	}

	function closeIOSInstructions() {
		showIOSInstructions = false;
	}
</script>

{#if hydrated && (showInstallButton || showIOSInstructions)}
	<button class="install-btn" onclick={handleInstall} title="Instalar aplicación">
		<i class="fas fa-download"></i>
		<span>Instalar</span>
	</button>
{/if}

{#if hydrated && showIOSInstructions && isIOS}
	<div class="ios-modal-overlay" onclick={closeIOSInstructions}>
		<div class="ios-modal" onclick={(e) => e.stopPropagation()}>
			<button class="close-btn" onclick={closeIOSInstructions}>
				<i class="fas fa-times"></i>
			</button>
			<h3>📱 Instalar en iPhone</h3>
			<ol>
				<li>Abre Safari (si no lo has hecho)</li>
				<li>Toca el botón <strong>Compartir</strong> (cuadro con flecha)</li>
				<li>Selecciona <strong>Agregar a pantalla de inicio</strong></li>
				<li>¡Listo! Tu app estará en la pantalla de inicio</li>
			</ol>
		</div>
	</div>
{/if}

<style>
	.install-btn {
		display: flex;
		align-items: center;
		gap: 6px;
		background: linear-gradient(135deg, var(--text-blue), #0052a3);
		color: white;
		border: none;
		padding: 8px 14px;
		border-radius: 8px;
		font-size: 13px;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s ease;
		box-shadow: 0 2px 8px rgba(0, 102, 204, 0.3);
		white-space: nowrap;
	}

	.install-btn:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(0, 102, 204, 0.5);
		background: linear-gradient(135deg, #0052a3, #003d7a);
	}

	.install-btn:active {
		transform: translateY(0);
		box-shadow: 0 2px 6px rgba(0, 102, 204, 0.4);
	}

	.install-btn i {
		font-size: 14px;
	}

	/* Modal de instrucciones para iOS */
	.ios-modal-overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.5);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1000;
		padding: 16px;
	}

	.ios-modal {
		background: white;
		border-radius: 16px;
		padding: 24px;
		max-width: 340px;
		box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
		position: relative;
		animation: slideUp 0.3s ease;
	}

	@keyframes slideUp {
		from {
			transform: translateY(20px);
			opacity: 0;
		}
		to {
			transform: translateY(0);
			opacity: 1;
		}
	}

	.ios-modal h3 {
		margin: 0 0 16px 0;
		font-size: 18px;
		font-weight: 600;
		color: var(--text-main);
	}

	.ios-modal ol {
		margin: 0;
		padding-left: 20px;
		list-style: decimal;
	}

	.ios-modal li {
		margin: 8px 0;
		font-size: 14px;
		color: var(--text-gray);
		line-height: 1.5;
	}

	.ios-modal strong {
		color: var(--text-main);
		font-weight: 600;
	}

	.close-btn {
		position: absolute;
		top: 12px;
		right: 12px;
		background: none;
		border: none;
		font-size: 20px;
		cursor: pointer;
		color: var(--text-gray);
		padding: 4px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.close-btn:hover {
		color: var(--text-main);
	}

	@media (max-width: 640px) {
		.install-btn {
			padding: 10px 12px;
			font-size: 12px;
			gap: 8px;
		}

		.install-btn i {
			font-size: 16px;
		}

		.install-btn span {
			display: inline;
		}

		.ios-modal {
			max-width: 90%;
			padding: 20px;
		}

		.ios-modal h3 {
			font-size: 16px;
		}

		.ios-modal li {
			font-size: 13px;
		}
	}
</style>
