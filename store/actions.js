import { map } from 'underscore'

export default {
	async getPokemonsCount({ commit }) {
		const pokemons = await this.$axios
			.get('/api/pokemon?offset=1&limit=1')
			.then((res) => res)
			.catch(() => null)

		if (pokemons.status === 200 && pokemons.data && pokemons.data.count) {
			commit('SET_POKEMONS_COUNT', pokemons.data.count)
		}
	},
	async populatePokemons({ commit, dispatch, state }) {
		const randomizer = (min, max) => {
			return Math.floor(Math.random() * (max - min + 1) + min)
		}
		const limit = 10
		const offset = randomizer(0, state.pokemons_count - limit)

		const pokemons = await this.$axios
			.get(`/api/pokemon?offset=${offset}&limit=${limit}`)
			.then((res) => res)
			.catch(() => null)
		if (pokemons.status === 200 && pokemons?.data) {
			commit('SET_POKEMONS', pokemons.data)
			dispatch('populatePokemonsDetail')
		}
	},
	async populatePokemonsDetail({ commit, state }) {
		const pokemons_detail = map(state.pokemons, async (pokemon) => {
			const pokemon_detail = await this.$axios
				.get(`/api/pokemon/${pokemon.name}`)
				.then((res) => res)
				.catch(() => null)

			if (pokemon_detail.status === 200 && pokemon_detail.data) {
				return pokemon_detail.data
			}

			return pokemon_detail
		})

		await Promise.all(pokemons_detail).then((details) => commit('SET_POKEMONS_DETAILS', details))
	},
	resetPokemon({ commit }) {
		commit('SET_POKEMON', null)
	},
	async searchPokemon({ commit }, id_or_name = null) {
		const pokemon = await this.$axios
			.get(`/api/pokemon/${id_or_name}`)
			.then((res) => res)
			.catch(() => null)
		if (pokemon.status === 200 && pokemon?.data) {
			commit('SET_POKEMON', pokemon.data)
		}
	},
}
