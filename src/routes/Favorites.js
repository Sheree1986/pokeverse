import React, { useContext } from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { PokemonCard } from '../components/PokemonCard';

import { FavoritesContext } from '../components/FavoritesProvider';


function Favorites() {

  const { favorites } = useContext(FavoritesContext);
  console.log(favorites)

    return (
        <>
                <Container>
                    <Row md={4}>
                      {favorites.map(fav => (
                        <Col key={fav.name} className="mt-4" md="3" >
                          <PokemonCard
                            key={fav.name}
                            name={fav.name}
                            url={fav.url}
                          />
                        </Col>
                      ))}
                    </Row>
                </Container>
        </>
    )
}

export { Favorites }