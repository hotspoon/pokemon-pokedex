export default {
	// Target: https://go.nuxtjs.dev/config-target
	target: 'static',

	// Global page headers: https://go.nuxtjs.dev/config-head
	head: {
		title: 'pokemon',
		htmlAttrs: {
			lang: 'en',
		},
		meta: [{ charset: 'utf-8' }, { name: 'viewport', content: 'width=device-width, initial-scale=1' }, { hid: 'description', name: 'description', content: '' }, { name: 'format-detection', content: 'telephone=no' }],
		link: [
			{ rel: 'icon', type: 'image/x-icon', href: 'https://i.postimg.cc/wB8ck0z9/favicon-32x32.png' },
			{
				rel: 'stylesheet',
				href: 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
			},
			{
				rel: 'stylesheet',
				href: 'https://cdnjs.cloudflare.com/ajax/libs/viewerjs/1.10.2/viewer.min.css',
			},
		],
		script: [
			{
				src: 'https://cdnjs.cloudflare.com/ajax/libs/viewerjs/1.10.2/viewer.min.js',
			},
			{
				src: 'https://code.jquery.com/jquery-3.2.1.slim.min.js',
			},
			{
				src: 'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js',
			},
			{
				src: 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js',
			},
		],
	},

	// Global CSS: https://go.nuxtjs.dev/config-css
	css: [],

	// Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
	plugins: [],

	// Auto import components: https://go.nuxtjs.dev/config-components
	components: true,

	// Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
	buildModules: [
		// https://go.nuxtjs.dev/eslint
		'@nuxtjs/eslint-module',
		// https://go.nuxtjs.dev/tailwindcss
		'@nuxtjs/tailwindcss',
	],

	// Modules: https://go.nuxtjs.dev/config-modules
	modules: ['@nuxtjs/axios', '@nuxtjs/proxy'],

	// Build Configuration: https://go.nuxtjs.dev/config-build
	build: {},

	axios: {
		proxy: true,
	},

	proxy: {
		'/api/': { target: 'https://pokeapi.co/api/v2/', pathRewrite: { '^/api/': '' }, changeOrigin: true },
	},
}
