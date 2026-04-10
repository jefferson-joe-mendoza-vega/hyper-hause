import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		hmr: {
			protocol: 'ws',
			host: 'localhost',
			port: 5173
		}
	},
	css: {
		postcss: './postcss.config.js',
		devSourcemap: false
	},
	build: {
		minify: 'terser',
		sourcemap: false
	}
});
