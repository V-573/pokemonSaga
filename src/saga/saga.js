import { put, call, takeEvery } from "redux-saga/effects";
import {
  failedFetch,
  fetchPokemons,
  loadingPokemons,
  setSelectedPokemon,
} from "../reducer/pokemonSlice";
import { pokemonSlice } from "../reducer/pokemonSlice";
import {
  fetchPokemonDetailsFromAPI,
  fetchPokemonsFromAPI,
} from "../services/pokemonService";

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
