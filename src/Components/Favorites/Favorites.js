import React, {useLayoutEffect, useState} from 'react';
import { Route } from 'react-router-dom';
import FavoriteCard from './FavoriteCard/FavoriteCard';
import './favorites.css'
import { useSelector } from 'react-redux';
import axios from 'axios';
import * as utils from '../../utils';

export default function Favorites() {
    const favorites = useSelector(state => state.favorites);
    const [favArray, setFav] = useState([])

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