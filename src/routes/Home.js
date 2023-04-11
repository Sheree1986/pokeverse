import React, { useState} from 'react';
import { PokemonCard } from '../components/PokemonCard';

import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Home({pokemon, pokemonFilteredList, setPokemonFilteredList}) {

  function handleChange(e) {
    const value = e.target.value;
    const regex = new RegExp(value, 'gi');
    const filtered = pokemon.filter((pokemon) => {
      return pokemon.name.match(regex);
    });
    setPokemonFilteredList(filtered);
    // console.log(pokemonFilteredList)
  }

  return (
    <div data-testid="app">
        {/* <h2 className='text-center'>Start Searching to select a Pokemon!</h2> */}
      <InputGroup onChange={handleChange} className="mb-3 w-50 mx-auto">
      <InputGroup.Text id="basic-addon1">Search Pokemon Name:</InputGroup.Text>
        <Form.Control
          placeholder="Search"
          aria-label="search"
          aria-describedby="basic-addon1"
        />
      </InputGroup>
      <Container>
        <Row md={4}>
          {pokemonFilteredList.map((pokemon, idx) => (
            <Col key={idx} className="mt-4" md="3" >
              <PokemonCard
                pokemonFilteredList={pokemonFilteredList}
                key={idx}
                name={pokemon.name}
                url={pokemon.url}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export { Home };