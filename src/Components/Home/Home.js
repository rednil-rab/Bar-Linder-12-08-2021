import React from 'react';
import { Route } from 'react-router-dom';
import SearchBar from './SearchBar/SearchBar';
import MainContainer from './MainContainer/MainContainer';
import './home.css';
import styled from 'styled-components';


export default function Home() {
  const Container = styled.div`
    width: 100%;
    height: 89%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    padding: 1%;
    position: relative;
    `;
  return (
    <Route exec path="/" >
      <Container>
        <SearchBar />
        <MainContainer />
      </Container>
    </Route>
  );
}