<script>
	import PWAInstaller from './PWAInstaller.svelte';
</script>

<header>
	<div class="header-wrapper">
		<div class="logo-wrapper">
			<img src="/logo.webp" alt="Hyper House Logo" class="logo-icon" />
			<div class="logo-text">
				<span>HYPER HOUSE</span>
				<span>Inmobiliaria</span>
			</div>
		</div>
		<nav class="desktop-nav">
			<a href="/" class="nav-link active">Inicio</a>
			<a href="/propiedades" class="nav-link">Propiedades</a>
			<a href="/buscar" class="nav-link">Buscar</a>
			<a href="/proyectos" class="nav-link">Proyectos</a>
		</nav>
		<div class="header-right">
			<PWAInstaller />
			<button class="notification-btn">
				<i class="far fa-bell" />
				<span class="dot" />
			</button>
		</div>
	</div>
</header>

<style>
	header {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		display: flex;
		justify-content: center;
		padding: 16px 24px;
		background: rgba(255, 255, 255, 0.95);
		backdrop-filter: blur(10px);
		border-bottom: 1px solid var(--border-color);
		z-index: 100;
		box-shadow: var(--shadow-sm);
	}

	.header-wrapper {
		width: 100%;
		max-width: 1600px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.logo-wrapper {
		display: flex;
		align-items: center;
		gap: 12px;
	}

	.logo-icon {
		width: 40px;
		height: 40px;
		object-fit: contain;
		flex-shrink: 0;
	}

	.logo-text {
		display: flex;
		flex-direction: column;
	}

	.logo-text span:first-child {
		color: var(--text-blue);
		font-weight: 700;
		font-size: 15px;
		letter-spacing: -0.3px;
		line-height: 1.1;
	}

	.logo-text span:last-child {
		color: var(--text-gray);
		font-size: 11px;
	}

	.desktop-nav {
		display: none;
		gap: 8px;
		align-items: center;
	}

	.nav-link {
		color: var(--text-gray);
		text-decoration: none;
		font-size: 14px;
		font-weight: 500;
		padding: 8px 16px;
		border-radius: 8px;
		transition: all 0.3s;
	}

	.nav-link:hover,
	.nav-link.active {
		color: var(--text-blue);
		background: var(--bg-gray-light);
	}

	.header-right {
		display: flex;
		align-items: center;
		gap: 12px;
	}

	.notification-btn {
		position: relative;
		background: none;
		border: none;
		color: var(--text-main);
		font-size: 20px;
		cursor: pointer;
		transition: 0.2s;
		padding: 4px;
	}

	.notification-btn:hover {
		color: var(--text-blue);
	}

	.notification-btn .dot {
		position: absolute;
		top: 0;
		right: 0;
		width: 6px;
		height: 6px;
		background: var(--notification-red);
		border-radius: 50%;
		border: 1px solid var(--white);
	}

	/* Tablet */
	@media (min-width: 768px) {
		header {
			padding: 20px 48px;
		}

		.logo-icon {
			width: 42px;
			height: 42px;
		}

		.logo-text span:first-child {
			font-size: 16px;
		}
	}

	/* Desktop */
	@media (min-width: 1024px) {
		header {
			padding: 16px 80px;
		}

		.header-wrapper {
			max-width: 1600px;
		}

		.logo-wrapper {
			gap: 16px;
		}

		.desktop-nav {
			display: flex;
			position: absolute;
			left: 50%;
			transform: translateX(-50%);
		}

		.nav-link {
			font-size: 15px;
			padding: 12px 20px;
		}
	}
</style>
