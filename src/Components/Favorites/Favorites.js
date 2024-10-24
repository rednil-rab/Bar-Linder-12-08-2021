import React from 'react';
import { Route } from 'react-router-dom';
import FavoriteCard from './FavoriteCard/FavoriteCard';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import useWindowSize from '../../hooks/useWindowsize';

export default function Favorites() {
  const dark = useSelector(state => state.dark);
  const favorites = useSelector(state => state.favorites);
  const windowSize = useWindowSize();

  const cards = favorites.map((card, index) => 
    <FavoriteCard key={`card_${index}`} city={card.city} id={card.key}/>
  );

  const Container = styled.div`
    height: 90%;
    width: 90%;
    display: grid;
    grid-template-columns: ${windowSize.width < 900 ? '1fr 1fr' : '1fr 1fr 1fr 1fr 1fr'};
    grid-row-gap: 5%;
    grid-column-gap: 5%;
    margin-top: 1vw;
    `;

  return (
    <Route exec path="/favorites" >
      <Container mode={dark} className="favorites">
        {cards}
      </Container>
    </Route>

  );
}