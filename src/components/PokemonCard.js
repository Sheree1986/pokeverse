import React, { useEffect, useState, useContext } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

import { FavoritesContext } from './FavoritesProvider';


function PokemonCard({ url, name, pokemonFilteredList }) {

  const { addFavorite, removeFavorite, isFavorite } = useContext(FavoritesContext);

  const [pokemon, setPokemon] = useState(null);

  const fetchPokemon = async () => {
    const res = await fetch(url);
    const data = await res.json();
    setPokemon(data);
    // console.log(pokemon)
  };

  useEffect(() => {
    fetchPokemon();
  }, [pokemonFilteredList]);

  return (
    <>
      {pokemon ? (
        <Card className="w-100 h-100 div-card"  >
          <Card.Img src={`${pokemon.sprites.front_default}`}></Card.Img>
          <Card.Body>
            <Card.Title >      
              <Link to={`/${name}`} style={{color: "black"}}>
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </Link>
              {/* {pokemon.name} */}
            </Card.Title>
            <Card.Text as={"div"}>
              <ul>
                {pokemon.abilities.map((pokemonAbility, idx) => (
                  <li key={idx}>{pokemonAbility.ability.name}</li>
                ))}
              </ul>
            </Card.Text>
            {isFavorite(name) ? (
            <Button onClick={() => removeFavorite(name)} variant="danger">
              Remove from Favorites
            </Button>
          ) : (
            <Button onClick={() => addFavorite({ name, url })}>
              Add to Favorites
            </Button>
          )}
          </Card.Body>
        </Card>
      ) : (
        ""
      )}
    </>
  );
}

export { PokemonCard };