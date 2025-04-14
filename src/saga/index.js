import {all} from 'redux-saga/effects'

import {watchGetPokemons, watchGetPokemonDetails} from './saga'



export default function* rootSaga(){
yield all ([
    watchGetPokemons(),
    watchGetPokemonDetails(),
])
}
