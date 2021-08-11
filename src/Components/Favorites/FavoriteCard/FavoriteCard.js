import React, { useState } from 'react';
import image from './cloudy.svg';
import { useSelector } from 'react-redux';
import * as utils from '../../../utils';
import axios from 'axios';

export default function FavoriteCard(props) {
    const dark = useSelector(state => state.dark);
    const favorites = useSelector(state => state.favorites);
    const [celsius, setCel] = useState('');
    const [fahrenheit, setFar] = useState('');
    const [condition, setCon] = useState('');

    async function getCity() {
        const response = await axios.get(`${utils.ACCU_WEATHER_HOST}/currentconditions/v1/${props.id}?apikey=${utils.API_KEY}&language=en&details=true`);
        setCel(response.data[0].Temperature.Metric.Value);
        setFar(response.data[0].Temperature.Imperial.Value);
        setCon(response.data[0].WeatherText);
    }


    getCity();
    return (
    <div style={{background: dark ? '#2D2C41' : 'rgba(255, 255, 255, 0.2)',color: dark ? '#ffffff' : '#000000',}} className="favorite-card" >
        <h1> {props.city}<br></br> {celsius}</h1>
        <h2> {condition} </h2> <img src={utils.imageDispenser(condition)} alt="weather_image" />
    </div>
    )
}