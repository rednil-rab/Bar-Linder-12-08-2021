import React from 'react';
import { useSelector } from 'react-redux';
import * as utils from '../../../../utils'

export default function DayCard(props) {
    const metric = useSelector(state => state.metric);
    return (
        <div className="day-card">
            <h1>{props.day}</h1>
            <img src={utils.imageDispenser(props.condition)} alt="weather_image"/>
            <h2>{metric ? `${props.celsius}°c` : `${props.fahrenheit}°F`}</h2>
        </div>
    )
}