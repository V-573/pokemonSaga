import {createAction, createSlice} from '@reduxjs/toolkit';



export const pokemonSlice = createSlice({
    name:'pokemon',
    initialState:{
        page:0,
        pokemons:[],
        isLoading: false,
        error: null,
        selectedPokemon: null, // detalls de un nuevo pokemon
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
        }
    }
})

export const {loadingPokemons, fetchPokemons, failedFetch} = pokemonSlice.actions   

export const fetchingPokemons = createAction('pokemon/fetchingPokemons') //Sirve para disparar una intención desde el componente, que será escuchada por Redux-Saga, no por el reducer

//mostrar detalles de un pokemon
export const fetchPokemonDetails = createAction('pokemon/fetchPokemonDetails')