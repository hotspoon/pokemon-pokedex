<template>
	<div class="container">
		<div class="relative flex flex-col items-top justify-center min-h-screen bg-gray-100 py-8 px-4 sm:items-center overflow-x-hidden">
			<header class="d-flex justify-content-center p-2">
				<a href="/"><img src="https://i.postimg.cc/s2v1DWGh/pokemon.png" alt="Pokemon" width="180" /></a>
			</header>
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
			<div class="container mt-2">
				<div class="row">
					<div class="col-md"></div>
					<div class="col-md">
						<ul v-if="state_pokemon" class="">
							<li class="m-2">
								<div class="card card-custom rounded">
									<div class="card-body">
										<div class="flex-container">
											<img v-if="state_pokemon.sprites && state_pokemon.sprites.front_default" class="img-size img-custom" :src="state_pokemon.sprites.front_default" alt="" @click="showImage()" />
										</div>
										<div class="row text-center">
											<div class="col-md">
												<span class="text-number">{{ state_pokemon.id }}</span>
											</div>
										</div>
										<div class="row text-center mb-1">
											<div class="col-md">
												<span class="text-name">{{ state_pokemon.name }}</span>
											</div>
										</div>
										<div class="row text-center">
											<div class="col-md">
												<a href="javascript:void(0)" class="btn btn-primary rounded" data-toggle="modal" data-target="#modal-detail" @submit.prevent="searchPokemon(name)">Detail Pokemon</a>
											</div>
										</div>
									</div>
								</div>
							</li>
						</ul>
					</div>
					<div class="col-md"></div>
				</div>
				<ul v-if="!state_pokemon && state_pokemons.length > 0" role="list" class="grid-container">
					<li v-for="pokemon in state_pokemons" :key="pokemon.name" class="m-2">
						<div class="card card-custom">
							<div class="card-body">
								<div class="flex-container">
									<img v-if="pokemon.sprites && pokemon.sprites.front_default" class="img-size img-custom" :src="pokemon.sprites.front_default" alt="" />
								</div>
								<div class="row text-center mb-1">
									<div class="col-md">
										<span class="text-number">{{ pokemon.id }}</span>
									</div>
								</div>
								<div class="row text-center mb-1">
									<div class="col-md">
										<span class="text-name">{{ pokemon.name }}</span>
									</div>
								</div>
								<div class="row text-center">
									<div class="col-md">
										<a href="javascript:void(0)" class="btn btn-primary rounded" data-toggle="modal" data-target="#modal-detail" @click="searchPokemon(pokemon.id)">Detail Pokemon</a>
									</div>
								</div>
							</div>
						</div>
					</li>
				</ul>
			</div>
			<div v-if="!state_pokemon" class="flex w-screen items-center justify-center h-20">
				<button type="button" class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" @click="populatePokemons">Load more</button>
			</div>
		</div>
		<!-- Modal -->
		<div id="modal-detail" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
			<div class="modal-dialog" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<h5 id="exampleModalLabel" class="modal-title">Detail Pokemon</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body">
						<ul v-if="state_pokemon" class="">
							<li class="m-2">
								<div class="flex-container">
									<img v-if="state_pokemon.sprites && state_pokemon.sprites.front_default" class="img-size img-custom" :src="state_pokemon.sprites.front_default" alt="" @click="showImage()" />
								</div>
								<div class="row text-center">
									<div class="col-md">
										<span class="text-number">{{ state_pokemon.id }}</span>
									</div>
								</div>
								<div class="row text-center mb-1">
									<div class="col-md">
										<span class="text-name">{{ state_pokemon.name }}</span>
									</div>
								</div>
								<div class="row mb-1">
									<div class="col-md">
										<table class="table">
											<thead>
												<tr>
													<th>Ability</th>
													<th>Height</th>
													<th>Weight</th>
													<th>Base Experience</th>
												</tr>
											</thead>
											<tbody>
												<td>{{ state_pokemon.abilities[0].ability.name }}</td>
												<td>{{ state_pokemon.height }}</td>
												<td>{{ state_pokemon.weight }}</td>
												<td>{{ state_pokemon.base_experience }}</td>
											</tbody>
										</table>
									</div>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
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
		showImage() {
			window.open(this.state_pokemon.sprites.front_default, '_blank').focus()
		},
	},
}
</script>

<style>
.flex-container {
	display: flex;
	justify-content: center;
	align-items: center;
}
.img-size {
	height: 200px;
	width: 200px;
}
.img-custom:hover {
	cursor: pointer;
}
.card-custom {
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.text-number {
	font-size: 1rem;
	margin-bottom: 1rem;
}
.text-name {
	font-size: 1.1rem;
	margin-bottom: 1rem;
	text-transform: uppercase;
}
.grid-container {
	display: grid;
	grid-template-columns: repeat(4, minmax(0, 1fr));
}
</style>
