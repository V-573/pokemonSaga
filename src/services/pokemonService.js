


// servicio traer de la API INFORMACION del pokemons seleccionado
export const fetchPokemonDetailsFromAPI = async (name) =>{
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    if (!response.ok) throw new Error('Error al obtener detalles del pokemon');
    const data = await response.json();
    return data;
};

// servicio traer los datos de la API de pokemons

export const fetchPokemonsFromAPI = async(page=0)=>{
    const resp = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${page * 10}`)
    const data = resp.json()
    return data;
}