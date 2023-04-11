import React, { createContext, useState } from 'react';

export const FavoritesContext = createContext();

function FavoritesProvider({children}) {

    const [favorites, setFavorites] = useState([])

    function addFavorite(pokemon) {
   
        console.log(pokemon)
      
        setFavorites([...favorites, pokemon])
    }

    function removeFavorite(name) {
      
        console.log(name)

        setFavorites( favorites.filter(fav => fav.name != name) );

    }

    function isFavorite(name) {

        return favorites.filter(fav => fav.name == name).length > 0;
      }

    return (
        <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }} >
            {children}
        </FavoritesContext.Provider>
    )
}

export { FavoritesProvider }