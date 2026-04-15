<script>
	let form = $state({
		nombre: '',
		celular: '',
		correo: '',
		mensaje: ''
	});

	function handleSubmit(e) {
		e.preventDefault();
		// TODO: conectar con backend o servicio de contacto
		console.log('Consulta enviada:', form);
	}

	const stats = [
		{ value: '2022', label: 'Año de creación' },
		{ value: '389', label: 'Clientes felices' },
		{ value: '17', label: 'Socios Inmobiliarios' },
		{ value: '178', label: 'Operaciones' }
	];

	const testimonials = [
		{
			initials: 'MC',
			name: 'María Castro',
			tipo: 'Cliente - Venta',
			color: '#50C878',
			texto:
				'"Excelente servicio, me ayudaron a vender mi casa en tiempo récord. Muy profesionales y atentos en todo momento."'
		},
		{
			initials: 'JR',
			name: 'Jorge Rodríguez',
			tipo: 'Cliente - Alquiler',
			color: '#38BDF8',
			texto:
				'"Encontré el departamento ideal gracias a su equipo. Todo el proceso fue rápido y sin complicaciones."'
		},
		{
			initials: 'AS',
			name: 'Ana Sánchez',
			tipo: 'Cliente - Compra',
			color: '#50C878',
			texto:
				'"Confianza total. Me asesoraron en cada paso de la compra de mi primera casa. Altamente recomendados."'
		}
	];

	const servicios = [
		'Asesoría Legal',
		'Evaluación de riesgo para inversiones inmobiliarias',
		'Compra/Venta y alquiler de Propiedades',
		'Saneamiento Físico Legal'
	];

	const contacto = [
		{ icon: '📍', texto: 'Av. Paseo de la República 291, Lima' },
		{ icon: '📞', texto: '+51 955 855 016' },
		{ icon: '✉️', texto: 'ventas@hyperhouseinmobiliaria.com' }
	];
</script>

<section class="footer-section">
	<div class="footer-container">

		<!-- Stats -->
		<div class="stats-grid">
			{#each stats as stat}
				<div class="stat-item">
					<div class="stat-value">{stat.value}</div>
					<div class="stat-label">{stat.label}</div>
				</div>
			{/each}
		</div>

		<!-- Testimonios -->
		<div class="testimonials-block">
			<div class="testimonials-header">
				<h2 class="testimonials-title">Qué dicen nuestros clientes</h2>
				<p class="testimonials-sub">
					En cada operación, nuestro compromiso es brindar un servicio profesional, cercano y efectivo.
					Ya sea para vender o alquilar una propiedad, nos enfocamos en lograr resultados concretos
					y una experiencia sin complicaciones.
				</p>
			</div>

			<div class="testimonials-grid">
				{#each testimonials as t}
					<div class="testimonial-card">
						<div class="testimonial-author">
							<div class="avatar" style="background:{t.color}">
								{t.initials}
							</div>
							<div>
								<div class="author-name">{t.name}</div>
								<div class="author-tipo">{t.tipo}</div>
							</div>
						</div>
						<p class="testimonial-text">{t.texto}</p>
					</div>
				{/each}
			</div>
		</div>

		<!-- Footer principal -->
		<footer class="footer-main">

			<!-- Columna 1: Nosotros -->
			<div class="footer-col">
				<div class="footer-logo">
					<div class="footer-logo-icon">HH</div>
					<div>
						<div class="footer-logo-name">HYPER HOUSE</div>
						<div class="footer-logo-sub">Inmobiliaria</div>
					</div>
				</div>
				<h3 class="footer-col-title">NOSOTROS</h3>
				<p class="footer-desc">
					En Hyper House Inmobiliaria ofrecemos soluciones para inversiones en la compra, venta o
					alquiler de inmuebles residenciales, comerciales e industriales. Con un enfoque moderno,
					confiable y personalizado.
				</p>
				<div class="social-block">
					<div class="social-label">Síguenos</div>
					<div class="social-icons">
						<a href="https://facebook.com" target="_blank" rel="noopener" class="social-btn" title="Facebook">
							<span class="social-fb">f</span>
						</a>
						<a href="https://x.com" target="_blank" rel="noopener" class="social-btn" title="X (Twitter)">
							<span>𝕏</span>
						</a>
						<a href="https://linkedin.com" target="_blank" rel="noopener" class="social-btn" title="LinkedIn">
							<span>🔗</span>
						</a>
					</div>
				</div>
			</div>

			<!-- Columna 2: Servicios -->
			<div class="footer-col">
				<h3 class="footer-col-title">SERVICIOS</h3>
				<ul class="footer-list">
					{#each servicios as s}
						<li class="footer-list-item">
							<span class="check">✓</span>
							<span>{s}</span>
						</li>
					{/each}
				</ul>
			</div>

			<!-- Columna 3: Contacto -->
			<div class="footer-col">
				<h3 class="footer-col-title">CONTACTO</h3>
				<ul class="footer-list">
					{#each contacto as c}
						<li class="footer-list-item">
							<span class="contact-icon">{c.icon}</span>
							<span>{c.texto}</span>
						</li>
					{/each}
				</ul>
			</div>

			<!-- Columna 4: Formulario -->
			<div class="footer-col">
				<h3 class="footer-col-title">CONSULTA</h3>
				<form class="consulta-form" onsubmit={handleSubmit}>
					<input
						type="text"
						placeholder="Nombre Completo"
						bind:value={form.nombre}
						class="form-input"
					/>
					<input
						type="tel"
						placeholder="Celular/WhatsApp"
						bind:value={form.celular}
						class="form-input"
					/>
					<input
						type="email"
						placeholder="Correo"
						bind:value={form.correo}
						class="form-input"
					/>
					<textarea
						placeholder="Describe lo que necesitas"
						rows="3"
						bind:value={form.mensaje}
						class="form-input form-textarea"
					></textarea>
					<button type="submit" class="form-btn">Suscríbete</button>
				</form>
			</div>
		</footer>

		<!-- Copyright -->
		<div class="footer-copy">
			© 2026 Hyper House Inmobiliaria. Todos los derechos reservados.
		</div>

	</div>
</section>

<style>
	/* ===== SECCIÓN FOOTER GENERAL ===== */
	.footer-section {
		background-color: #0b1121;
		color: #ffffff;
		font-family: 'Inter', system-ui, -apple-system, sans-serif;
		width: 100%;
		box-sizing: border-box;
		padding: 0;
		margin: 0;
	}

	.footer-container {
		max-width: 1280px;
		margin: 0 auto;
		padding: 64px 24px;
	}

	/* ===== STATS ===== */
	.stats-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 32px;
		text-align: center;
		border-bottom: 1px solid #1e293b;
		padding-bottom: 48px;
		margin-bottom: 64px;
	}

	.stat-value {
		font-size: 2.25rem;
		font-weight: 700;
		color: #50c878;
		margin-bottom: 6px;
		line-height: 1;
	}

	.stat-label {
		color: #94a3b8;
		font-size: 13px;
	}

	/* ===== TESTIMONIOS ===== */
	.testimonials-block {
		margin-bottom: 64px;
	}

	.testimonials-header {
		text-align: center;
		max-width: 680px;
		margin: 0 auto 40px;
	}

	.testimonials-title {
		font-size: 1.5rem;
		font-weight: 700;
		color: #fff;
		margin-bottom: 12px;
	}

	.testimonials-sub {
		color: #94a3b8;
		font-size: 14px;
		line-height: 1.6;
	}

	.testimonials-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 20px;
	}

	.testimonial-card {
		background: #151c2c;
		border: 1px solid #1e293b;
		border-radius: 16px;
		padding: 24px;
		transition: border-color 0.2s;
	}

	.testimonial-card:hover {
		border-color: #50c878;
	}

	.testimonial-author {
		display: flex;
		align-items: center;
		gap: 14px;
		margin-bottom: 16px;
	}

	.avatar {
		width: 42px;
		height: 42px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 700;
		font-size: 13px;
		color: #fff;
		flex-shrink: 0;
	}

	.author-name {
		font-weight: 700;
		font-size: 14px;
		color: #fff;
	}

	.author-tipo {
		color: #94a3b8;
		font-size: 12px;
	}

	.testimonial-text {
		color: #cbd5e1;
		font-size: 14px;
		line-height: 1.6;
	}

	/* ===== FOOTER PRINCIPAL ===== */
	.footer-main {
		display: grid;
		grid-template-columns: 1fr;
		gap: 40px;
		border-top: 1px solid #1e293b;
		padding-top: 48px;
	}

	.footer-col {
		display: flex;
		flex-direction: column;
		gap: 0;
	}

	/* Logo */
	.footer-logo {
		display: flex;
		align-items: center;
		gap: 12px;
		margin-bottom: 20px;
	}

	.footer-logo-icon {
		width: 36px;
		height: 36px;
		background: #50c878;
		border-radius: 8px;
		color: #fff;
		font-weight: 700;
		font-size: 13px;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.footer-logo-name {
		font-weight: 700;
		font-size: 13px;
		letter-spacing: 0.5px;
		color: #fff;
	}

	.footer-logo-sub {
		font-size: 10px;
		color: #94a3b8;
		letter-spacing: 0.1em;
		text-transform: uppercase;
	}

	/* Titles */
	.footer-col-title {
		font-size: 13px;
		font-weight: 700;
		color: #fff;
		letter-spacing: 0.05em;
		margin-bottom: 20px;
	}

	/* Desc */
	.footer-desc {
		color: #94a3b8;
		font-size: 13px;
		line-height: 1.65;
		margin-bottom: 24px;
	}

	/* Social */
	.social-label {
		font-size: 13px;
		color: #fff;
		margin-bottom: 12px;
	}

	.social-icons {
		display: flex;
		gap: 10px;
	}

	.social-btn {
		width: 34px;
		height: 34px;
		background: #1e293b;
		border-radius: 8px;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		text-decoration: none;
		color: #fff;
		font-size: 15px;
		transition: background 0.2s;
	}

	.social-btn:hover {
		background: #334155;
	}

	.social-fb {
		color: #60a5fa;
		font-weight: 700;
	}

	/* Listas */
	.footer-list {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 14px;
	}

	.footer-list-item {
		display: flex;
		align-items: flex-start;
		gap: 10px;
		color: #cbd5e1;
		font-size: 13px;
		line-height: 1.5;
	}

	.check {
		color: #50c878;
		font-size: 13px;
		flex-shrink: 0;
		margin-top: 1px;
	}

	.contact-icon {
		flex-shrink: 0;
		font-size: 14px;
	}

	/* Formulario */
	.consulta-form {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.form-input {
		width: 100%;
		background: #1a2234;
		border: 1px solid #2a344a;
		border-radius: 8px;
		padding: 12px 14px;
		font-size: 13px;
		color: #fff;
		font-family: 'Inter', sans-serif;
		outline: none;
		transition: border-color 0.2s;
	}

	.form-input::placeholder {
		color: #64748b;
	}

	.form-input:focus {
		border-color: #50c878;
	}

	.form-textarea {
		resize: none;
	}

	.form-btn {
		width: 100%;
		background: #50c878;
		color: #fff;
		font-weight: 700;
		font-size: 14px;
		padding: 13px;
		border: none;
		border-radius: 8px;
		cursor: pointer;
		font-family: 'Inter', sans-serif;
		transition: background 0.2s, transform 0.1s;
	}

	.form-btn:hover {
		background: #3fa060;
	}

	.form-btn:active {
		transform: scale(0.98);
	}

	/* Copyright */
	.footer-copy {
		text-align: center;
		color: #475569;
		font-size: 12px;
		margin-top: 48px;
		padding-bottom: 16px;
	}

	/* ===== RESPONSIVE ===== */
	@media (min-width: 640px) {
		.stats-grid {
			grid-template-columns: repeat(4, 1fr);
			gap: 40px;
		}

		.footer-container {
			padding: 72px 28px;
		}

		.testimonials-grid {
			grid-template-columns: repeat(2, 1fr);
			gap: 24px;
		}

		.footer-main {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (min-width: 768px) {
		.footer-container {
			padding: 80px 48px;
		}

		.testimonials-grid {
			grid-template-columns: repeat(3, 1fr);
		}

		.footer-main {
			grid-template-columns: repeat(4, 1fr);
			gap: 48px;
		}

		.stats-grid {
			gap: 48px;
		}
	}

	@media (min-width: 1024px) {
		.footer-container {
			padding: 100px 80px;
		}

		.footer-col-title {
			font-size: 14px;
		}

		.footer-list-item {
			font-size: 14px;
		}
	}

	@media (min-width: 1440px) {
		.footer-container {
			padding: 120px 100px;
			max-width: 1600px;
		}

		.stats-grid {
			gap: 60px;
		}

		.footer-main {
			gap: 60px;
		}
	}
</style>
