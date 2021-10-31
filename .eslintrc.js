module.exports = {
	root: true,
	env: {
		browser: true,
		node: true
	},
	parserOptions: {
		parser: '@babel/eslint-parser',
		requireConfigFile: false
	},
	extends: [
		'@nuxtjs',
		'plugin:nuxt/recommended',
		'prettier'
	],
	plugins: [
	],
	// add your custom rules here
	rules: {
		'camelcase': 'off',
		'func-names': 'off',
		'no-param-reassign': 'off',
		'no-process-exit': 'off',
		'no-restricted-globals': 'off',
		'no-underscore-dangle': ['error', { 'allow': ['_id', '__typename'] }],
		'no-unused-vars': 'warn',
	}
}
