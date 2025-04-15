import { put, call, takeEvery, select, delay, takeLatest } from "redux-saga/effects";
import {
  failedFetch,
  fetchPokemons,
  loadingPokemons,
  setSelectedPokemon,
  toggleFavorite,
  setFavoritos,
   setSearchResults,
} from "../reducer/pokemonSlice";

import { pokemonSlice } from "../reducer/pokemonSlice";

import {
  fetchPokemonDetailsFromAPI,
  fetchPokemonsFromAPI,
} from "../services/pokemonService";

//funcion para ampliar lista de busqueda y no en detalle
function* searchByNameSaga(action) {
  const query = action.payload.toLowerCase()

  try {
    yield delay(500) // debounce de 500ms
    const response = yield call(() => 
      fetch(`https://pokeapi.co/api/v2/pokemon/${query}`).then(res => res.json())
    )

    yield put(setSearchResults([response])) // ✅ guardamos en lista
  } catch (error) {
    // Si no existe, limpia la lista de resultados
    yield put(setSearchResults([]))
  }
}



//funcion para buscar por medio de un input el pokemon
function* searchPokemon(action) {
  try {
    yield delay(500) // debounce

    const response = yield call(() =>
      fetch(`https://pokeapi.co/api/v2/pokemon/${action.payload.toLowerCase()}`)
        .then(res => {
          if (!res.ok) throw new Error('No se encontró el Pokémon')
          return res.json()
        })
    )

    yield put(setSelectedPokemon(response))
  } catch (error) {
    yield put(failedFetch({ error: error.message }))
  }
}

//guardar en el local storage
function* handleToggleFavorite(action){
  const name = action.payload;

  // 1. toggle en el estado 
  yield put(toggleFavorite(name));

  //2. obtener favoritos actualizados del estado
  const favoritos = yield select(state => state.pokemons.favoritos)

  //3. guardar en el localStorage
  yield call([localStorage, 'setItem'], 'favoritos', JSON.stringify(favoritos));

}

//cargar favoritos al iniciar la app
function* handleLoadFavorites(){
  const stored = yield call([localStorage, 'getItem'], 'favoritos' );
  if(stored){
    const parsed = JSON.parse(stored);
    yield put(setFavoritos(parsed));
  }
}



// Saga para obtener los datos
function* getPokemons(action) {
  const page = action.payload;
  try {
    yield put(loadingPokemons());
    // obtener los datos de la API
    const data = yield call(fetchPokemonsFromAPI, page);

    // guardar los datos en la store si todo es exitoso
    yield put(fetchPokemons({ pokemons: data.results, page: page }));
  } catch (error) {
    yield put(failedFetch({ error: error.message }));
  }
}


// Saga para obtener informacion de pokemon seleccionado
function* getPokemonDetails(action) {
  // se realizo con .then() y se va a cambiar para usarlo con await/async

  try {
    const data = yield call(fetchPokemonDetailsFromAPI, action.payload);
    yield put(setSelectedPokemon(data));
  } catch (error) {
    console.error("Error fetching details", error.message);
  }
}

// saga principal para observar la accion de getPokemons
export function* watchGetPokemons() {
  yield takeEvery("pokemon/fetchingPokemons", getPokemons);
}

// saga adicional para observar cada pokemon de getPokemonsDetails
export function* watchGetPokemonDetails() {
  yield takeEvery("pokemon/fetchPokemonDetails", getPokemonDetails);
}

// watch para favoritos
export function* watchFavorites(){
  yield takeEvery('pokemon/toggleFavoriteSaga', handleToggleFavorite);
  yield takeEvery('pokemon/loadFavoritos', handleLoadFavorites);
}


//watch para busqueda de pokemon por el input
export function* watchSearchPokemon() {
  yield takeLatest('pokemon/searchByName', searchPokemon)
}

export function* watchSearchByName() {
  yield takeLatest('pokemon/searchByNameLista', searchByNameSaga)
}

// function* getPokemonDetails(action) {
// se realizo con .then() y se va a cambiar para usarlo con await/async
//   console.log('quiero ver como llega el payload', action.payload)
//   try {
//     const data = yield call(() =>
//       fetch(`https://pokeapi.co/api/v2/pokemon/${action.payload}`).then(res => res.json())
//     )

//  // 🔍 Aquí ves la data completa que trae la API
//  console.log('📦 Data del Pokémon desde la API:', data)

//     yield put(pokemonSlice.actions.setSelectedPokemon(data))
//   } catch (error) {
//     console.error('Error fetching details', error)
//   }

// a continuacion el ejercicio realizado con async/await
//}
