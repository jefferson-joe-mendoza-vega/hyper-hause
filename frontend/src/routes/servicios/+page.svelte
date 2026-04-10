<script>
	import { goto } from '$app/navigation';

	const servicios = [
		{
			id: 'venta',
			icon: 'fas fa-tag',
			iconBg: '#eef4ff',
			iconColor: '#1a4b8e',
			titulo: 'Venta de Propiedades',
			descripcion: 'Publica tu propiedad y llega a miles de compradores interesados.',
			badge: 'Popular',
			badgeBg: '#eef4ff',
			badgeColor: '#1a4b8e'
		},
		{
			id: 'alquiler',
			icon: 'fas fa-key',
			iconBg: '#fff7ed',
			iconColor: '#f59e0b',
			titulo: 'Alquiler',
			descripcion: 'Encuentra el inquilino ideal para tu inmueble rápidamente.',
			badge: null
		},
		{
			id: 'tasacion',
			icon: 'fas fa-chart-bar',
			iconBg: '#f0fdf4',
			iconColor: '#22c55e',
			titulo: 'Tasación de Inmuebles',
			descripcion: 'Conoce el valor real de tu propiedad con nuestros expertos.',
			badge: 'Gratis',
			badgeBg: '#f0fdf4',
			badgeColor: '#22c55e'
		},
		{
			id: 'asesoria',
			icon: 'fas fa-headset',
			iconBg: '#fdf4ff',
			iconColor: '#a855f7',
			titulo: 'Asesoría Especializada',
			descripcion: 'Consulta con agentes certificados para tomar la mejor decisión.',
			badge: null
		},
		{
			id: 'proyectos',
			icon: 'fas fa-city',
			iconBg: '#fff1f2',
			iconColor: '#f43f5e',
			titulo: 'Proyectos Inmobiliarios',
			descripcion: 'Accede a los mejores proyectos en preventa y estreno a nivel nacional.',
			badge: 'Nuevo',
			badgeBg: '#fff1f2',
			badgeColor: '#f43f5e'
		},
		{
			id: 'financiamiento',
			icon: 'fas fa-calculator',
			iconBg: '#ecfeff',
			iconColor: '#0891b2',
			titulo: 'Simulador Hipotecario',
			descripcion: 'Calcula tu cuota mensual y encuentra el mejor crédito hipotecario.',
			badge: null
		}
	];

	const estadisticas = [
		{ valor: '12K+', label: 'Propiedades' },
		{ valor: '98%', label: 'Satisfacción' },
		{ valor: '8 años', label: 'Experiencia' }
	];
</script>

<svelte:head>
	<title>Servicios — HyperHause</title>
	<meta name="description" content="Descubre todos los servicios inmobiliarios de HyperHause: venta, alquiler, tasación, asesoría y más." />
</svelte:head>

<!-- ── Hero de servicios ──────────────────────────────────────────────────── -->
<div class="servicios-hero">
	<div class="hero-content">
		<p class="hero-eyebrow">Lo que hacemos</p>
		<h1 class="hero-title">Nuestros<br /><span>Servicios</span></h1>
		<p class="hero-subtitle">Todo lo que necesitas para comprar, vender o alquilar con éxito.</p>
	</div>

	<!-- Stats -->
	<div class="stats-row">
		{#each estadisticas as stat}
			<div class="stat-item">
				<span class="stat-valor">{stat.valor}</span>
				<span class="stat-label">{stat.label}</span>
			</div>
		{/each}
	</div>
</div>

<!-- ── Grid de servicios ──────────────────────────────────────────────────── -->
<div class="servicios-section">
	<div class="servicios-grid">
		{#each servicios as s}
			<button class="servicio-card" onclick={() => goto(`/servicios/${s.id}`)}>
				<div class="card-top">
					<div class="servicio-icon" style="background:{s.iconBg}; color:{s.iconColor}">
						<i class={s.icon} />
					</div>
					{#if s.badge}
						<span class="servicio-badge" style="background:{s.badgeBg}; color:{s.badgeColor}">
							{s.badge}
						</span>
					{/if}
				</div>
				<h3 class="servicio-titulo">{s.titulo}</h3>
				<p class="servicio-desc">{s.descripcion}</p>
				<div class="servicio-footer">
					<span class="ver-mas">Ver más</span>
					<i class="fas fa-arrow-right arrow-icon" />
				</div>
			</button>
		{/each}
	</div>
</div>

<!-- ── CTA Banner ─────────────────────────────────────────────────────────── -->
<div class="cta-banner">
	<div class="cta-content">
		<i class="fas fa-phone-alt cta-icon" />
		<div>
			<p class="cta-title">¿Necesitas ayuda personalizada?</p>
			<p class="cta-sub">Habla con un asesor ahora mismo</p>
		</div>
	</div>
	<button class="cta-btn">
		<i class="fas fa-headset" /> Contactar
	</button>
</div>

<style>
	/* ── Hero ── */
	.servicios-hero {
		background: linear-gradient(145deg, #1a233a 0%, #1a4b8e 100%);
		padding: 32px 24px 28px;
		color: white;
		position: relative;
		overflow: hidden;
	}

	.servicios-hero::before {
		content: '';
		position: absolute;
		top: -40px;
		right: -40px;
		width: 200px;
		height: 200px;
		background: rgba(0, 208, 132, 0.12);
		border-radius: 50%;
	}

	.servicios-hero::after {
		content: '';
		position: absolute;
		bottom: -60px;
		left: -30px;
		width: 160px;
		height: 160px;
		background: rgba(255, 255, 255, 0.05);
		border-radius: 50%;
	}

	.hero-content {
		position: relative;
		z-index: 1;
		margin-bottom: 28px;
	}

	.hero-eyebrow {
		font-size: 11px;
		font-weight: 700;
		letter-spacing: 0.12em;
		color: var(--logo-green);
		text-transform: uppercase;
		margin-bottom: 8px;
	}

	.hero-title {
		font-size: 30px;
		font-weight: 700;
		line-height: 1.2;
		margin-bottom: 10px;
		letter-spacing: -0.5px;
	}

	.hero-title span {
		color: var(--logo-green);
	}

	.hero-subtitle {
		font-size: 13px;
		color: rgba(255, 255, 255, 0.7);
		line-height: 1.5;
		max-width: 280px;
	}

	/* ── Stats ── */
	.stats-row {
		display: flex;
		gap: 0;
		position: relative;
		z-index: 1;
		background: rgba(255, 255, 255, 0.08);
		border-radius: 16px;
		padding: 16px 0;
	}

	.stat-item {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2px;
		border-right: 1px solid rgba(255, 255, 255, 0.12);
	}

	.stat-item:last-child {
		border-right: none;
	}

	.stat-valor {
		font-size: 20px;
		font-weight: 700;
		color: white;
	}

	.stat-label {
		font-size: 11px;
		color: rgba(255, 255, 255, 0.6);
	}

	/* ── Sección de servicios ── */
	.servicios-section {
		padding: 24px 20px 16px;
	}

	.servicios-grid {
		display: flex;
		flex-direction: column;
		gap: 14px;
	}

	/* ── Card de servicio ── */
	.servicio-card {
		background: white;
		border-radius: 18px;
		padding: 20px;
		display: flex;
		flex-direction: column;
		gap: 10px;
		box-shadow: 0 4px 18px rgba(0, 0, 0, 0.05);
		border: 1.5px solid transparent;
		cursor: pointer;
		text-align: left;
		transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
		font-family: 'Inter', sans-serif;
		width: 100%;
	}

	.servicio-card:hover {
		border-color: var(--border-color);
		box-shadow: 0 8px 28px rgba(0, 0, 0, 0.09);
		transform: translateY(-2px);
	}

	.card-top {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
	}

	.servicio-icon {
		width: 52px;
		height: 52px;
		border-radius: 14px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 20px;
		flex-shrink: 0;
	}

	.servicio-badge {
		font-size: 10px;
		font-weight: 700;
		padding: 4px 10px;
		border-radius: 20px;
		letter-spacing: 0.04em;
	}

	.servicio-titulo {
		font-size: 15px;
		font-weight: 700;
		color: var(--text-main);
		line-height: 1.3;
	}

	.servicio-desc {
		font-size: 12px;
		color: var(--text-gray);
		line-height: 1.55;
	}

	.servicio-footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 4px;
	}

	.ver-mas {
		font-size: 12px;
		font-weight: 600;
		color: var(--text-blue);
	}

	.arrow-icon {
		font-size: 12px;
		color: var(--text-blue);
	}

	/* ── CTA Banner ── */
	.cta-banner {
		margin: 8px 20px 24px;
		background: linear-gradient(135deg, #1a233a 0%, #1a4b8e 100%);
		border-radius: 18px;
		padding: 20px;
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.cta-content {
		display: flex;
		align-items: center;
		gap: 14px;
	}

	.cta-icon {
		font-size: 22px;
		color: var(--logo-green);
		flex-shrink: 0;
	}

	.cta-title {
		font-size: 14px;
		font-weight: 700;
		color: white;
		margin-bottom: 3px;
	}

	.cta-sub {
		font-size: 12px;
		color: rgba(255, 255, 255, 0.65);
	}

	.cta-btn {
		width: 100%;
		padding: 13px;
		background: var(--logo-green);
		color: #1a233a;
		border: none;
		border-radius: 12px;
		font-size: 14px;
		font-weight: 700;
		cursor: pointer;
		font-family: 'Inter', sans-serif;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		transition: opacity 0.2s, transform 0.15s;
	}

	.cta-btn:hover {
		opacity: 0.9;
		transform: translateY(-1px);
	}

	/* ── Responsive desktop ── */
	@media (min-width: 768px) {
		.servicios-grid {
			display: grid;
			grid-template-columns: 1fr 1fr;
			gap: 16px;
		}
	}

	@media (min-width: 1024px) {
		.servicios-grid {
			grid-template-columns: repeat(3, 1fr);
		}

		.servicios-hero {
			padding: 48px 60px 40px;
		}

		.servicios-section {
			padding: 32px 60px 24px;
		}

		.cta-banner {
			margin: 8px 60px 32px;
			flex-direction: row;
			align-items: center;
		}

		.cta-banner .cta-content {
			flex: 1;
		}

		.cta-btn {
			width: auto;
			padding: 13px 28px;
			flex-shrink: 0;
		}
	}
</style>
