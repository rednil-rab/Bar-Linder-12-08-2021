import React from 'react';
import { Route } from 'react-router-dom';
import FavoriteCard from './FavoriteCard/FavoriteCard';
import './favorites.css'
import { useSelector } from 'react-redux';


export default function Favorites() {
    const favorites = useSelector(state => state.favorites);

    const cards = favorites.map(card => 
            <FavoriteCard city={card.city} id={card.key}/>
    )

    return (
        <Route exec path="/favorites" >
        <div className="favorites">
            {cards}
        </div>
        </Route>

    )
}