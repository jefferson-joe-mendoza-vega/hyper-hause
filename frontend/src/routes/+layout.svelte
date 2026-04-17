<script>
	import { onMount } from 'svelte';
	import Header from '$lib/components/Header.svelte';
	import BottomNav from '$lib/components/BottomNav.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import GoogleOneTap from '$lib/components/GoogleOneTap.svelte';
	import '../app.css';

	let { children } = $props();

	onMount(() => {
		// Registrar service worker para PWA
		if ('serviceWorker' in navigator) {
			navigator.serviceWorker.register('/sw.js')
				.then((registration) => {
					console.log('✅ Service Worker registrado:', registration);
				})
				.catch((error) => {
					console.error('❌ Error registrando Service Worker:', error);
				});
		}
	});
</script>

<svelte:head>
	<link rel="icon" href="/logo.webp" type="image/webp" />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="mobile-container">
	<GoogleOneTap />
	<Header />
	<main>
		{@render children()}
	</main>
	<Footer />
	<BottomNav />
</div>

<style>
	main {
		flex: 1;
		overflow-y: auto;
	}
</style>
