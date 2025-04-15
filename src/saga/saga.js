import { put, call, takeEvery, select } from "redux-saga/effects";
import {
  failedFetch,
  fetchPokemons,
  loadingPokemons,
  setSelectedPokemon,
  toggleFavorite,
  setFavoritos
} from "../reducer/pokemonSlice";

import { pokemonSlice } from "../reducer/pokemonSlice";

import {
  fetchPokemonDetailsFromAPI,
  fetchPokemonsFromAPI,
} from "../services/pokemonService";


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
