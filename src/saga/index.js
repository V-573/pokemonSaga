import {all} from 'redux-saga/effects'

import {watchGetPokemons, watchGetPokemonDetails, watchFavorites, watchSearchPokemon, watchSearchByName } from './saga'



export default function* rootSaga(){
yield all ([
    watchGetPokemons(),
    watchGetPokemonDetails(),
    watchFavorites(),
    watchSearchPokemon(),
    watchSearchByName(),
])
}
