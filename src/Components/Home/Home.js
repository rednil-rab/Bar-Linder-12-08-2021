import React from 'react';
import { Route } from 'react-router-dom';
import SearchBar from './SearchBar/SearchBar';
import MainContainer from './MainContainer/MainContainer';
import './home.css'



export default function Home() {
    return (
        <Route exec path="/" >
        <div className='home'>
            <SearchBar />
            <MainContainer />
        </div>
        </Route>
    )
}