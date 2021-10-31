import { findWhere, map } from 'underscore'

export default {
	SET_POKEMON(state, pokemon = null) {
		state.pokemon = pokemon
	},
	SET_POKEMONS(state, { next = null, previous = null, results = [] } = null) {
		state.pokemons = [...state.pokemons, ...results]
		state.pokemons_next = next
		state.pokemons_previous = previous
	},
	SET_POKEMONS_COUNT(state, count = 0) {
		state.pokemons_count = count
	},
	SET_POKEMONS_DETAILS(state, pokemons_detail = []) {
		state.pokemons = map(state.pokemons, (pokemon) => {
			const detail = findWhere(pokemons_detail, { name: pokemon.name })

			return {
				...pokemon, ...detail
			}
		})
	}
}
