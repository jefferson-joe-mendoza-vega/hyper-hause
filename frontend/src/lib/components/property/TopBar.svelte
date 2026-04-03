<script>
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	let { slug = '' } = $props();
	let showShareMenu = $state(false);
	let isFavorited = $state(false);

	const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

	function handleBack() {
		goto('/propiedades');
	}

	function toggleShareMenu() {
		showShareMenu = !showShareMenu;
	}

	function toggleFavorite() {
		isFavorited = !isFavorited;
	}

	function shareToWhatsApp() {
		const text = `Mira esta propiedad: ${currentUrl}`;
		window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
		showShareMenu = false;
	}

	function shareToFacebook() {
		window.open(
			`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
			'_blank'
		);
		showShareMenu = false;
	}

	function shareToTwitter() {
		const text = `Descubre esta propiedad increíble en HYPER HOUSE: ${currentUrl}`;
		window.open(
			`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`,
			'_blank'
		);
		showShareMenu = false;
	}

	function copyLink() {
		navigator.clipboard.writeText(currentUrl);
		showShareMenu = false;
		// Aquí podrías mostrar un toast de confirmación
		alert('Enlace copiado al portapapeles');
	}
</script>

<header class="top-bar">
	<div class="top-bar-left">
		<i class="fas fa-arrow-left" onclick={handleBack} />
		<span>{slug}</span>
	</div>
	<div class="top-bar-right">
		<div class="share-menu-wrapper">
			<i class="fas fa-share-nodes" onclick={toggleShareMenu} />
			{#if showShareMenu}
				<div class="share-menu">
					<button onclick={shareToWhatsApp}>
						<i class="fab fa-whatsapp" /> WhatsApp
					</button>
					<button onclick={shareToFacebook}>
						<i class="fab fa-facebook" /> Facebook
					</button>
					<button onclick={shareToTwitter}>
						<i class="fab fa-twitter" /> Twitter
					</button>
					<button onclick={copyLink}>
						<i class="fas fa-link" /> Copiar enlace
					</button>
				</div>
			{/if}
		</div>
		<i
			class={`far fa-heart ${isFavorited ? 'favorited' : ''}`}
			onclick={toggleFavorite}
		/>
	</div>
</header>

<style>
	.top-bar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 16px 20px;
		background-color: var(--white);
		position: sticky;
		top: 0;
		z-index: 100;
		border-bottom: 1px solid var(--border-color);
	}

	.top-bar-left {
		display: flex;
		align-items: center;
		gap: 16px;
		color: var(--text-main);
		font-size: 14px;
		font-weight: 600;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		max-width: 70%;
	}

	.top-bar-left i {
		font-size: 16px;
		cursor: pointer;
		transition: 0.2s;
	}

	.top-bar-left i:hover {
		color: var(--logo-green);
	}

	.top-bar-right {
		display: flex;
		gap: 16px;
		color: var(--text-main);
		font-size: 18px;
		align-items: center;
	}

	.top-bar-right i {
		cursor: pointer;
		transition: 0.2s;
	}

	.top-bar-right i:hover {
		color: var(--logo-green);
	}

	.top-bar-right i.favorited {
		color: var(--notification-red);
	}

	.share-menu-wrapper {
		position: relative;
	}

	.share-menu {
		position: absolute;
		top: 100%;
		right: 0;
		background: var(--white);
		border: 1px solid var(--border-color);
		border-radius: 12px;
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
		z-index: 1000;
		min-width: 180px;
		margin-top: 8px;
		overflow: hidden;
	}

	.share-menu button {
		width: 100%;
		padding: 12px 16px;
		border: none;
		background: transparent;
		color: var(--text-main);
		font-size: 14px;
		font-weight: 500;
		cursor: pointer;
		display: flex;
		align-items: center;
		gap: 12px;
		transition: 0.2s;
		text-align: left;
	}

	.share-menu button:hover {
		background-color: var(--bg-gray-light);
		color: var(--logo-green);
	}

	.share-menu button i {
		width: 20px;
		display: flex;
		justify-content: center;
	}
</style>
