import {configureStore} from '@reduxjs/toolkit';

import createSagaMiddleware from '@redux-saga/core';


import { pokemonSlice } from "../reducer/pokemonSlice";
import rootSaga from '../saga';

const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
    reducer:{
        pokemons: pokemonSlice.reducer
    },
    // middleware: [sagaMiddleware] chatgpt dice que se corrige con el sgte codigo: 
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),


})


sagaMiddleware.run(rootSaga)

export default store;