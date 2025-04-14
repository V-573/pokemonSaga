import { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { fetchingPokemons } from '../reducer/pokemonSlice'


const Pokemons = ()=>{
const [localPage, setLocalPage] = useState(0)

    const { isLoading, pokemons = [], error} = useSelector(state =>state.pokemons)
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(fetchingPokemons(localPage)) // esta despachando una accion redux con el formato:
        //{  type: 'pokemon/fetchingPokemons', payload: 0  // o el valor actual de localPage}
   
     


    },[localPage, dispatch])

    return(
<div>
    <h1>Pokemons</h1>
    {error && <p>algo a salido mal</p>}
    {isLoading && <p>cargando...</p>}
    <div>
        {pokemons.map((pokemon)=>(
            <p key={pokemon.name}>{pokemon.name}</p>
        ))}
    </div>
    <button
    onClick={()=> setLocalPage(localPage + 1)}
    >NEXT PAGE</button>
</div>


    )

}


export default Pokemons;
 