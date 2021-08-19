import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as utils from '../../../utils';
import * as requests from '../../../requests/requests'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import * as action from '../../../store/action';

export default function FavoriteCard(props) {
    const dispatch = useDispatch();
    const dark = useSelector(state => state.dark);
    const metric = useSelector(state => state.metric);
    const [celsius, setCel] = useState('');
    const [fahrenheit, setFar] = useState('');
    const [condition, setCon] = useState('');
    const errorId = utils.ID();


    const notify = () => toast.error("Network Error", {
        toastId: errorId
    });

    async function getCity() {
        try {
            const response = await axios.get(`${utils.ACCU_WEATHER_HOST}/currentconditions/v1/${props.id}?apikey=${utils.API_KEY}&language=en&details=true`);
            setCel(response.data[0].Temperature.Metric.Value);
            setFar(response.data[0].Temperature.Imperial.Value);
            setCon(response.data[0].WeatherText);
        } catch {

        }

    }

    const handleClick = () => {
        dispatch({ type: action.UPDATE_KEY, key: props.id, city: props.city });
        requests.citySelection({ key: props.id, value: props.city }, dispatch, notify);
        requests.nextFiveDays({key: props.id, value: props.city},dispatch,notify);
    }
    getCity();
    return (
        <Link to="/home">
            <div onClick={() => handleClick()} style={{ background: dark ? '#2D2C41' : 'rgba(255, 255, 255, 0.2)', color: dark ? '#ffffff' : '#000000', }} className="favorite-card" >
                <h1> {props.city}<br></br> {metric ? `${celsius}°c` : `${fahrenheit}°f`}</h1>
                <h2> {condition} </h2> <img src={utils.imageDispenser(condition)} alt="weather_image" />
                <ToastContainer />
            </div>
        </Link>

    )
}