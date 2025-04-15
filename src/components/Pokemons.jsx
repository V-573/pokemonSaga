import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchingPokemons, fetchPokemonDetails, toggleFavoriteSaga, loadFavoritos} from "../reducer/pokemonSlice";

const Pokemons = () => {
  const [localPage, setLocalPage] = useState(0);

  const {
    isLoading,
    pokemons = [],
    error,
    selectedPokemon,
    favoritos,
  } = useSelector((state) => state.pokemons);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchingPokemons(localPage)); // esta despachando una accion redux con el formato:
    //{  type: 'pokemon/fetchingPokemons', payload: 0  // o el valor actual de localPage}
    dispatch(loadFavoritos()); //carga favoritos

  }, [localPage, dispatch]);

  const handleToggleFavorite = (name) => {
    dispatch(toggleFavoriteSaga(name));
  };


  return (
    <div>

      <h1>Pokemons</h1>
      {error && <p>algo a salido mal</p>}
      {isLoading && <p>cargando...</p>}
      <div>
        {pokemons.map((pokemon) => (
        <div  key={pokemon.name} style={{ display: 'flex', alignItems: 'center', gap: '10px' }} > 
        
        <p
            key={pokemon.name}
            onClick={() => dispatch(fetchPokemonDetails(pokemon.name))}
            style={{ cursor: "pointer" }}
          >
            {pokemon.name}
          </p>
          <button onClick={() => handleToggleFavorite(pokemon.name)}>
      {favoritos.includes(pokemon.name) ? '★' : '☆'}
    </button>
          </div> 
          ))}
      </div>

      <button onClick={() => setLocalPage(localPage + 1)}>NEXT PAGE</button>


{/* desplegar lista de favoritos: */}

<h2>⭐ Mis Favoritos</h2>
{favoritos.length === 0 && <p>No tienes favoritos aún.</p>}
<div>
  {favoritos.map((name) => (
    <div key={name} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <p
        onClick={() => dispatch(fetchPokemonDetails(name))}
        style={{ cursor: 'pointer', margin: 0 }}
      >
        {name}
      </p>
      <button onClick={() => handleToggleFavorite(name)}>★ Quitar</button>
    </div>
  ))}
</div>




      {/* Mostrar detalle del Pokémon */}
      {selectedPokemon && (
        <div>
          <h2>Detalle de {selectedPokemon.name}</h2>
          <p>Peso: {selectedPokemon.weight}</p>
          <p>Altura: {selectedPokemon.height}</p>
          <p>
            Habilidades:{" "}
            {selectedPokemon.abilities.map((a) => a.ability.name).join(", ")}
          </p>
        </div>
      )}
    </div>
  );
};

export default Pokemons;
