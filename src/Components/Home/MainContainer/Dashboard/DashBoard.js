import React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useDispatch, useSelector } from 'react-redux';
import IOSSwitch from '../../../IOSSwitch/IOSSwitch';
import * as action from '../../../../store/action';
import * as Icon from 'react-bootstrap-icons';
import * as utils from '../../../../utils';
import styled from 'styled-components';
import useWindowSize from '../../../../hooks/useWindowsize';

export default function Dashboard(props) {
  const dispatch = useDispatch();
  const isFavorite = useSelector(state => state.isFavorite);
  const windowSize = useWindowSize();

  const handleChange = () => {
    dispatch({ type: action.TOGGLE_METRIC });
  };
  const handleClick = () => {
    dispatch({ type: action.UPDATE_FAVORITES });
  };


  const SwitchCOntainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  `;
  const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-content: center;
  width: 100%;
  `;
  const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${windowSize.width < 900 ? 'center' : 'flex-end'};
  `;

  return (
    <Container >
      <div className="weather-widget">
        <img alt="weather_img" src={utils.imageDispenser(props.current)}>
        </img>
        <div style={{ color: props.dark ? '#ffffff' : '#000000' }}>
          <p>{props.location}</p>
          <p>{props.degrees}</p>

        </div>
      </div>
      <SwitchCOntainer>
        <FormControlLabel
          style={{marginRight: 'unset'}}control={<IOSSwitch checked={props.metric} name="checkedB" onChange={handleChange} label={'dark'} />}
        />
        <h3>{props.metric ? 'Celcius' : 'Fahrenheit'}</h3>
      </SwitchCOntainer>
      <IconContainer>
        {
          isFavorite ? <Icon.HeartFill onClick={() => handleClick()} className="favorites-icon" style={{ color: '#fe0000' }} /> : <Icon.Heart onClick={() => handleClick()} className="favorites-icon" style={{ color: props.dark ? '#ffffff' : '#000000', }} />
        }
      </IconContainer>



    </Container >
  );
}