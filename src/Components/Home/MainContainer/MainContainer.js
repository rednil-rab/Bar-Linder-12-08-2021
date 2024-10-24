import React from 'react';
import { useSelector } from 'react-redux';
import Dashboard from './Dashboard/DashBoard';
import DayCard from './dayCard/DayCard';
import styled from 'styled-components';
import useWindowSize from '../../../hooks/useWindowsize';
import CardSilder from './CardSlider/CardSlider';

export default function MainContainer() {
  const dark = useSelector(state => state.dark);
  const location = useSelector(state => state.city);
  const celsius = useSelector(state => state.celsius);
  const fahrenheit = useSelector(state => state.fahrenheit);
  const metric = useSelector(state => state.metric);
  const current = useSelector(state => state.current);
  const days = useSelector(state => state.days);
  const key = useSelector(state => state.key);
  const windowSize = useWindowSize();

  const deskDayCardArray = days.map((day,index) => <DayCard key={`card_${index}`} day={day.weekday} celsius={day.celsius} fahrenheit={day.fahrenheit} condition={day.condition}/>);
    
  const Container = styled.div`
    background: ${dark ? '#2D2C41': 'rgba(255, 255, 255, 0.2)'};
    color: ${dark ? '#ffffff' : '#000000'};
    width: ${windowSize.width < 900 ? '95%' : '70%'};
    height: 70%;
    margin-bottom: 7%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    `;
  const CardsContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;
    height: 45%;
    align-items: flex-start;
    `;
  return (
    <Container className="main-container">
      <Dashboard 
        location={location}
        degrees={metric ? `${celsius}°c`:`${fahrenheit}°F`}
        dark={dark}
        metric={metric}
        key={key}
        current={current}
      />
      <h1>{current}</h1>
      {
        windowSize.width < 900 ?
          <CardSilder
            windowWidth={windowSize.width}
            cards={deskDayCardArray}
          /> :
          <CardsContainer >
            {deskDayCardArray}
          </CardsContainer>
      }


    </Container >
  );
}