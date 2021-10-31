<template>
	<div class="relative flex flex-col items-top justify-center min-h-screen bg-gray-100 py-8 px-4 sm:items-center overflow-x-hidden">
		<link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.1.2/dist/tailwind.min.css" rel="stylesheet" />
		<div class="max-w-2xl mx-auto w-full flex items-center">
			<div class="ml-2 flex flex-1">
				<form ref="form_search_pokemon" class="flex flex-1" @submit.prevent="searchPokemon(name)">
					<input id="pokemon" v-model="name" type="text" name="pokemon" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2" placeholder="Search pokemon by name or id..." />
					<button v-if="!state_pokemon" type="submit" class="ml-2 inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Search</button>
				</form>
				<button v-if="state_pokemon" type="button" class="ml-2 inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" @click="resetSearchPokemon">Reset</button>
			</div>
		</div>
		<div class="mt-8 max-w-4xl mx-auto sm:px-6 lg:px-8">
			<ul v-if="state_pokemon" role="list" class="grid grid-cols-1">
				<li class="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200">
					<div class="flex-1 flex flex-col p-2">
						<img v-if="state_pokemon.sprites && state_pokemon.sprites.front_default" class="w-24 h-24 flex-shrink-0 mx-auto" :src="state_pokemon.sprites.front_default" alt="" />
						<h3 class="mt-6 text-gray-900 text-sm font-medium">
							{{ state_pokemon.name }}
						</h3>
						<dl class="mt-1 flex-grow flex flex-col justify-between">
							<dt class="sr-only">ID</dt>
							<dd class="text-gray-500 text-sm">#{{ state_pokemon.id }}</dd>
						</dl>
					</div>
				</li>
			</ul>
			<ul v-if="!state_pokemon && state_pokemons.length > 0" role="list" class="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
				<li v-for="pokemon in state_pokemons" :key="pokemon.name" class="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200">
					<div class="flex-1 flex flex-col p-2">
						<img v-if="pokemon.sprites && pokemon.sprites.front_default" class="w-24 h-24 flex-shrink-0 mx-auto" :src="pokemon.sprites.front_default" alt="" />
						<h3 class="mt-6 text-gray-900 text-sm font-medium">
							{{ pokemon.name }}
						</h3>
						<dl class="mt-1 flex-grow flex flex-col justify-between">
							<dt class="sr-only">ID</dt>
							<dd class="text-gray-500 text-sm">#{{ pokemon.id }}</dd>
						</dl>
					</div>
				</li>
			</ul>
		</div>
		<div v-if="!state_pokemon" class="flex w-screen items-center justify-center h-20">
			<button type="button" class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" @click="populatePokemons">Load more</button>
		</div>
	</div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
	name: 'Pokemon',
	data() {
		return {
			name: null,
		}
	},
	computed: {
		...mapState({
			state_pokemon: 'pokemon',
			state_pokemons: 'pokemons',
			state_pokemons_count: 'pokemons_count',
		}),
	},
	created() {
		this.getPokemonsCount().then(() => {
			this.populatePokemons()
		})
	},
	methods: {
		...mapActions({
			getPokemonsCount: 'getPokemonsCount',
			populatePokemons: 'populatePokemons',
			populatePokemonsDetail: 'populatePokemonsDetail',
			resetPokemon: 'resetPokemon',
			searchPokemon: 'searchPokemon',
		}),
		resetSearchPokemon() {
			this.name = null
			this.resetPokemon()
		},
	},
}
</script>
