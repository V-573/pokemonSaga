import {put, call, takeEvery} from 'redux-saga/effects'
import { failedFetch, fetchPokemons, loadingPokemons,  setSelectedPokemon} from '../reducer/pokemonSlice'
import { pokemonSlice } from '../reducer/pokemonSlice'

// servicio traer los datos de la API de pokemons

const fetchPokemonsFromAPI = async(page=0)=>{
    const resp = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${page * 10}`)
    const data = resp.json()
    return data;
}

// Saga para obtener los datos
function* getPokemons(action){
    const page = action.payload
    try{
        yield put(loadingPokemons())
        // obtener los datos de la API
        const data = yield call(fetchPokemonsFromAPI, page)
        
        // guardar los datos en la store si todo es exitoso
        yield put(fetchPokemons({pokemons:data.results, page: page}))
    }
    catch (error) {
        yield put(failedFetch({error:error.message}))


    }

}

function* getPokemonDetails(action) {

    console.log('quiero ver como llega el payload', action.payload)
    try {
      const data = yield call(() =>
        fetch(`https://pokeapi.co/api/v2/pokemon/${action.payload}`).then(res => res.json())
      )

   // 🔍 Aquí ves la data completa que trae la API
   console.log('📦 Data del Pokémon desde la API:', data)


      yield put(pokemonSlice.actions.setSelectedPokemon(data))
    } catch (error) {
      console.error('Error fetching details', error)
    }
  }




// saga principal para observar la accion de getPokemons
export function* watchGetPokemons(){
    yield takeEvery('pokemon/fetchingPokemons', getPokemons)
}


// saga adicional para observar cada pokemon de getPokemonsDetails
export function* watchGetPokemonDetails() {
    yield takeEvery('pokemon/fetchPokemonDetails', getPokemonDetails)
  }

  
 
  