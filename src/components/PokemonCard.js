// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import Card from "react-bootstrap/Card";


// function PokemonCard({ url, name, pokeList }) {

//   const [pokemon, setPokemon] = useState(null);
  

//   useEffect(() => {
//     fetch(url)
//       .then((res) => res.json())
//       .then((data) => {
//         setPokemon(data);
       
//       })
//       .catch((error) => {
//         console.log("Pokemon not found", error);
//       });
//   }, [url]);
//   const navigateToPokemonCard = () => {
//     navigate(name);
//   };

//   return (
//     <>
     
//       <Card style={{ width: "18rem", height: "100%" }}>
//         <Card.Img variant="top" src={pokemon?.sprites.front_default} />
//         <Card.Body>
//           <Card.Title>{name}</Card.Title>
//           <Card.Text as="div">
//           <p>Abilities:</p>
//             {pokemon?.abilities.map((pokeAbility) => (
          
//               <ul>
               
//                 <li>{pokeAbility.ability.name}</li>
//               </ul>
//             ))}
//           </Card.Text>
//         </Card.Body>
//       </Card>
  
//     </>
//   );
// }

// export { PokemonCard };
import React from 'react';
import { Card } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const getSinglePokemon = async (url) => {

  try {
    const response = await fetch(url);
    const json = await response.json();
    return json;
  } catch (error) {
      throw new Error(error);
  }
}

function PokemonCard(props) {
  const [singlePokemonInfo, setSinglePokemonInfo] = useState();
  const pokemon = props.pokemonObject;

  useEffect(() => {
      getSinglePokemon(pokemon.url).then((pokemonInfo) => {
        setSinglePokemonInfo(pokemonInfo);
      }).catch( error => {throw new Error(error)})
  })
  
  if (singlePokemonInfo) {
  return (
    <Card>
      <Card.Img src={singlePokemonInfo.sprites.front_default}></Card.Img>
      <Link to={`/${singlePokemonInfo.name}`}>
        <Card.Title>{singlePokemonInfo.name}</Card.Title>
      </Link>
      <p>Abilities:</p>
     {singlePokemonInfo.abilities.map((ability) => {
      
         return  (<ul><li><Card.Text>{ability.ability.name}</Card.Text></li></ul>)

         
      
      })} 
      
    </Card>
  );
}
}

export { PokemonCard };