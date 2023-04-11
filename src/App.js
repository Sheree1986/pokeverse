
import React, {useState, useEffect} from 'react';
import { Navigation } from './components/Navigation';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {Home} from './routes/Home';
import {PokemonDetails} from './routes/PokemonDetails';
import {FavoritesProvider} from './components/FavoritesProvider';
import { Favorites } from './routes/Favorites';

const LIMIT = 150;
const pokeApi = `https://pokeapi.co/api/v2/pokemon/?limit=${LIMIT}`;



function App() {
  const [pokemon, setPokemon] = useState([]);
  const [pokemonFilteredList, setPokemonFilteredList] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
    const res = await fetch(pokeApi);
    const data = await res.json();
    setPokemon(data.results);
    setPokemonFilteredList(data.results);

  }
    fetchData()
      .catch(console.error);
    }, []);
  
    return (
      <FavoritesProvider>
          <BrowserRouter>
            <div data-testid="app">
              <Navigation />
              <Routes>
                <Route path="/" element={<Home pokemon={pokemon} pokemonFilteredList={pokemonFilteredList} setPokemonFilteredList={setPokemonFilteredList}/>} />
                <Route path="/:name" element={<PokemonDetails />} />
                <Route path="/favorites" element={<Favorites />} />
              </Routes>
            </div>
          </BrowserRouter>
      </FavoritesProvider>
  
    );
  }
  
  export { App };