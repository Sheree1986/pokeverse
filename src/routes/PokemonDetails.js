import { useEffect, useState } from "react";
import { useParams }  from "react-router-dom";

const getPokemonDetails = async (name) => {
    const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${name}`;
    const res = await fetch(pokemonUrl);
    const data = await res.json();
    console.log(data);
    return data;
}

export default function PokemonDetails(props) {
    const params = useParams();
    const [pokemon, setPokemon] = useState(null);
    
    useEffect(() => {
        try {
            getPokemonDetails(params.name).then(details => {
                setPokemon(details);
            });
        } catch (error) {
            throw new Error(error);
        }
    }, [])
    
    if (!pokemon) {
        return <>loading...</>
    }

    return (
        <>
        
        
            <img src={pokemon.sprites.front_default}  height={'300'}/>
            <h1>{params.name}</h1>
            <p>Height: {pokemon.height}</p>
            <p>Weight: {pokemon.weight}</p>
          
            <ul>
                        {
                            pokemon.abilities.map(ability => (
                                <li key={ability.ability.name}>{ability.ability.name}</li>
                            ))
                        }
                    </ul>
                    <div>
                  <div><span className='fw-bold'>Types</span>:               
                      <ul>
                      {pokemon.types.map((pokemonType, idx) => (
                        <li key={idx}>{pokemonType.type.name}</li>
                      ))}
                    </ul>
                  </div>
                  <div><span className='fw-bold'>Stats</span>:               
                      <ul>
                      {pokemon.stats.map((pokemonStat, idx) => (
                        <li key={idx}>{pokemonStat.stat.name}: {pokemonStat.base_stat}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              
           

    </>

    );
}