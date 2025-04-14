import {all} from 'redux-saga/effects'
import watchGetPokemons from './saga'

export default function* rootSaga(){
yield all ([
    watchGetPokemons(),
])
}
