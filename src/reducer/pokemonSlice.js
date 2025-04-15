import {createAction, createSlice} from '@reduxjs/toolkit';



export const pokemonSlice = createSlice({
    name:'pokemon',
    initialState:{
        page:0,
        pokemons:[],
        isLoading: false,
        error: null,
        selectedPokemon: null, // detalls de un nuevo pokemon
        favoritos:[],
        searchResults: [], // ✅ nueva propiedad para resultados de búsqueda
    },
    reducers:{
        loadingPokemons: (state)=> {
            state.isLoading= true;
        },
        fetchPokemons: (state, action) =>{
            state.isLoading= false;
            state.page = action.payload.page;
            state.pokemons = action.payload.pokemons
        },
        failedFetch: (state, action) =>{
            state.isLoading = false;
            state.error = action.payload.error
        },
        setSelectedPokemon: (state, action) => {
            console.log('📥 action.payload recibido en reducer:', action.payload)
            state.selectedPokemon = action.payload
          },
//favoritos:
toggleFavorite: (state, action) => {
    const name = action.payload;
    if (state.favoritos.includes(name)) {
      state.favoritos = state.favoritos.filter(fav => fav !== name);
    } else {
      state.favoritos.push(name);
    }
  },
  setFavoritos: (state, action) => {
    state.favoritos = action.payload;
  },
// reducer para guardar los resultados de la busqueda
  setSearchResults: (state, action) => {
    state.searchResults = action.payload
  }


    }
})

export const {loadingPokemons, fetchPokemons, failedFetch,  setSelectedPokemon, toggleFavorite, setFavoritos, setSearchResults } = pokemonSlice.actions   

export const fetchingPokemons = createAction('pokemon/fetchingPokemons') //Sirve para disparar una intención desde el componente, que será escuchada por Redux-Saga, no por el reducer

//mostrar detalles de un pokemon
export const fetchPokemonDetails = createAction('pokemon/fetchPokemonDetails')

export const toggleFavoriteSaga= createAction('pokemon/toggleFavoriteSaga');
export const loadFavoritos = createAction('pokemon/loadFavoritos');
export const searchPokemonByName = createAction('pokemon/searchByName');
export const searchPokemonByNameLista = createAction('pokemon/searchByNameLista');