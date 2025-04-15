import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchingPokemons,
  fetchPokemonDetails,
  toggleFavoriteSaga,
  loadFavoritos,
  searchPokemonByName,
  searchPokemonByNameLista,
  setSearchResults,
} from "../reducer/pokemonSlice";

const Pokemons = () => {
  const dispatch = useDispatch();
  const [localPage, setLocalPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const {
    isLoading,
    pokemons = [],
    error,
    selectedPokemon,
    favoritos,
    searchResults = [],
  } = useSelector((state) => state.pokemons);

  useEffect(() => {
    dispatch(fetchingPokemons(localPage));
    dispatch(loadFavoritos());
  }, [localPage, dispatch]);

  // 🔍 Búsqueda con debounce
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim().length > 2) {
      dispatch(searchPokemonByNameLista(value)); // Saga que trae lista
    } else {
      dispatch(setSearchResults([])); // Limpiar si borran el input
    }
  };

  const handleToggleFavorite = (name) => {
    dispatch(toggleFavoriteSaga(name));
  };

  // Mostrar la lista adecuada: si hay búsqueda activa o no
  const displayedPokemons =
    searchTerm.trim().length > 2 ? searchResults : pokemons;

  return (
    <div>
      <h1>Pokémons</h1>

      {/* 🔍 Input de búsqueda */}
      <input
        type="text"
        placeholder="Buscar Pokémon por nombre"
        value={searchTerm}
        onChange={handleSearchChange}
        style={{ padding: "6px", marginBottom: "10px", width: "250px" }}
      />

      {/* 🔁 Estado de carga o error */}
      {isLoading && <p>⏳ Cargando...</p>}
      {error && <p>❌ Algo salió mal: {error}</p>}

      {/* ⚠️ No encontrado */}
      {searchTerm.length > 2 &&
        !isLoading &&
        searchResults.length === 0 && (
          <p>⚠️ No se encontró ningún Pokémon con ese nombre</p>
        )}

      {/* 📋 Lista de Pokémon (busqueda o pagina) */}
      <div>
        {displayedPokemons.map((pokemon) => (
          <div
            key={pokemon.name}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "6px",
            }}
          >
            <p
              onClick={() => dispatch(fetchPokemonDetails(pokemon.name))}
              style={{ cursor: "pointer", margin: 0 }}
            >
              {pokemon.name}
            </p>
            <button onClick={() => handleToggleFavorite(pokemon.name)}>
              {favoritos.includes(pokemon.name) ? "★" : "☆"}
            </button>
          </div>
        ))}
      </div>

      {/* ➡️ Botón de paginación solo si no estás buscando */}
      {searchTerm.length <= 2 && (
       
       <div>
       
        {localPage > 0 && (
          <button onClick={() => setLocalPage(localPage - 1)}>PREVIOUS PAGE</button>
        )}
        <button onClick={() => setLocalPage(localPage + 1)}>Siguiente Página</button>
        <p>Página actual: {localPage}</p>
</div>
      )}

      {/* ⭐ Favoritos */}
      <h2>⭐ Mis Favoritos</h2>
      {favoritos.length === 0 && <p>No tienes favoritos aún.</p>}
      {favoritos.map((name) => (
        <div
          key={name}
          style={{ display: "flex", alignItems: "center", gap: "10px" }}
        >
          <p
            onClick={() => dispatch(fetchPokemonDetails(name))}
            style={{ cursor: "pointer", margin: 0 }}
          >
            {name}
          </p>
          <button onClick={() => handleToggleFavorite(name)}>★ Quitar</button>
        </div>
      ))}

      {/* 🧾 Detalle del Pokémon seleccionado */}
      {selectedPokemon && (
        <div style={{ marginTop: "20px" }}>
          <h2>Detalle de {selectedPokemon.name}</h2>
          <p>Peso: {selectedPokemon.weight}</p>
          <p>Altura: {selectedPokemon.height}</p>
          <p>
            Habilidades:{" "}
            {selectedPokemon.abilities
              .map((a) => a.ability.name)
              .join(", ")}
          </p>
        </div>
      )}
    </div>
  );
};

export default Pokemons;
