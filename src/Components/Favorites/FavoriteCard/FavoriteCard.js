import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as utils from '../../../utils';
import * as requests from '../../../requests/requests';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import * as action from '../../../store/action';
import styled from 'styled-components';
import useWindowSize from '../../../hooks/useWindowsize';

export default function FavoriteCard(props) {
  const dispatch = useDispatch();
  const windowSize = useWindowSize();

  const metric = useSelector(state => state.metric);
  const [celsius, setCel] = useState('');
  const [fahrenheit, setFar] = useState('');
  const [condition, setCon] = useState('');
  const errorId = utils.ID();


  const notify = () => toast.error('Network Error', {
    toastId: errorId
  });

  async function getCity() {
    try {
      const response = await axios.get(`${utils.ACCU_WEATHER_HOST}/currentconditions/v1/${props.id}?apikey=${utils.API_KEY}&language=en&details=true`);
      setCel(response.data[0].Temperature.Metric.Value);
      setFar(response.data[0].Temperature.Imperial.Value);
      setCon(response.data[0].WeatherText);
    } catch(e) {
      console.error(e);
    }

  }

  const handleClick = () => {
    dispatch({ type: action.UPDATE_KEY, key: props.id, city: props.city });
    requests.citySelection({ key: props.id, value: props.city }, dispatch, notify);
    requests.nextFiveDays({key: props.id, value: props.city},dispatch,notify);
  };
  getCity();

  const Container = styled.div`
    height: 35%;
    width: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    background: ${props.mode ? '#2D2C41' : 'rgba(255, 255, 255, 0.2)'};
    color: ${props.mode ? '#ffffff' : '#000000'};
    `;

  const StyledH1 = styled.h1`
    font-size:  ${windowSize.width < 900 ? '5vw': '1.7vw'};
    text-decoration: none;
    `;

  const StyleImg = styled.img`
    height: 40%;
    object-fit: contain;
    `;
  return (
    <Link to="/home">
      <Container onClick={() => handleClick()}>
        <StyledH1> {props.city}<br></br> {metric ? `${celsius}°c` : `${fahrenheit}°f`}</StyledH1>
        <StyledH1> {condition} </StyledH1> 
        <StyleImg src={utils.imageDispenser(condition)} alt="weather_image" />
        <ToastContainer />
      </Container>
    </Link>

  );
}