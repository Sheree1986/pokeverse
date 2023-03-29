import React, {useState, useEffect} from 'react';
import { Navigation } from './components/Navigation';
import { PokemonCard } from './components/PokemonCard';
import { Container, Col, Form, InputGroup, Row } from "react-bootstrap";

const LIMIT = 150;
const pokeApi = `https://pokeapi.co/api/v2/pokemon/?limit=${LIMIT}`;

function App() {
  const [pokeCards, setPokeCards] = useState([]);
  const [pokeList, setPokeList] = useState([]);


  useEffect(() => {
    fetch(pokeApi)
    .then((res) => res.json())
    .then((data) => {
      setPokeCards(data.results);
    })
    .catch((error) => {
      console.log("Pokemon not found", error)
  });
}, []);
handleChange = (event) => {
  const value = event.target.value;
  const regex = new RegExp(value, "gi");
  const filtered = pokeCards.filter((pokemon) => {
    return pokemon.name.match(regex);
  });

  setPokeList(filtered);
};
  return (
    <div data-testid="app">
      <Navigation />

      <center><h1>Pokemon should appear here</h1></center>
 
      <Container>
        <InputGroup size="sm" className="mb-3">
          <InputGroup.Text
            type="search"
            variant="outline-secondary"
            id="search"
          >
            Search
          </InputGroup.Text>
          <Form.Control
            className="search-input"
            placeholder="Pokemon Name"
            aria-label="Pokemon Name"
            name="search"
            onChange={handleChange}
          />
        </InputGroup>
        <br />
        <Row xs={1} md={4} className="g-4">
          {pokeList.map((card) => (
            <Col key={card.name}>
              <PokemonCard name={card.name} url={card.url} />
            </Col>
          ))}
        </Row>
     
      </Container>
    </div>
  );
}

export { App };
