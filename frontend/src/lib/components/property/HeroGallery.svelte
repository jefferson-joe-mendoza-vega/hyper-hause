<script>
	let { image = '', badge = 'ALQUILAR', currentPhoto = 1, totalPhotos = 3 } = $props();

	let thumbnails = [
		{ img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=150&q=80', label: 'fachada' },
		{ img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=150&q=80', label: 'gym' },
		{ img: 'https://images.unsplash.com/photo-1556910103-1c02745a872f?auto=format&fit=crop&w=150&q=80', label: 'cocina' }
	];

	let selectedThumb = 0;

	function selectThumbnail(index) {
		selectedThumb = index;
	}
</script>

<div class="hero-gallery">
	<div class="hero-image" style="background-image: url('{image}')">
		<div class="badge-alquilar">{badge}</div>
		<div class="photo-count">
			<i class="fas fa-images" /> {currentPhoto}/{totalPhotos}
		</div>
	</div>

	<div class="thumbnails">
		{#each thumbnails as thumb, index (index)}
			<div
				class="thumb-item {selectedThumb === index ? 'active' : ''}"
				on:click={() => selectThumbnail(index)}
				on:keydown={(e) => e.key === 'Enter' && selectThumbnail(index)}
				role="button"
				tabindex="0"
			>
				<div class="thumb-img" style="background-image: url('{thumb.img}');" />
				<span>{thumb.label}</span>
			</div>
		{/each}
	</div>
</div>

<style>
	.hero-gallery {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 12px;
		background-color: var(--white);
		padding-bottom: 16px;
	}

	.hero-image {
		width: 100%;
		height: 280px;
		background-size: cover;
		background-position: center;
		position: relative;
	}

	.badge-alquilar {
		position: absolute;
		top: 16px;
		left: 16px;
		background-color: var(--accent-green);
		color: var(--white);
		padding: 6px 12px;
		border-radius: 6px;
		font-size: 11px;
		font-weight: 700;
		letter-spacing: 0.5px;
	}

	.photo-count {
		position: absolute;
		bottom: 16px;
		right: 16px;
		background-color: rgba(0, 0, 0, 0.6);
		color: var(--white);
		padding: 6px 10px;
		border-radius: 8px;
		font-size: 12px;
		font-weight: 500;
		display: flex;
		align-items: center;
		gap: 6px;
		backdrop-filter: blur(4px);
	}

	.thumbnails {
		display: flex;
		gap: 12px;
		padding: 0 20px;
		overflow-x: auto;
		scrollbar-width: none;
	}

	.thumbnails::-webkit-scrollbar {
		display: none;
	}

	.thumb-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 6px;
		cursor: pointer;
	}

	.thumb-img {
		width: 80px;
		height: 50px;
		border-radius: 8px;
		background-size: cover;
		background-position: center;
		border: 2px solid transparent;
		opacity: 0.7;
		transition: 0.2s;
	}

	.thumb-item.active .thumb-img {
		border-color: var(--accent-green-dark);
		opacity: 1;
	}

	.thumb-item span {
		font-size: 10px;
		color: var(--text-main);
		font-weight: 500;
	}
</style>
