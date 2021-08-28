import React from 'react';
import { useSelector } from 'react-redux';
import * as utils from '../../../../utils';
import styled from 'styled-components';
import useWindowSize from '../../../../hooks/useWindowsize';

export default function DayCard(props) {
    const metric = useSelector(state => state.metric);
    const windowSize = useWindowSize();

    const DayCard = styled.div`
    width: ${windowSize.width < 900 ? '75%' : '15%'};
    height: ${windowSize.width < 900 ? '50vw' : '90%'};
    border: solid 2px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    margin: auto;
    `

    const StyledH1 = styled.h1`
    font-size: ${windowSize.width < 900 ? '5vw' : '1vw'};
    `

    const StyledImg = styled.img`
    object-fit: contain;
    height: 40%;
    `
    return (
        <DayCard className="day-card">
            <StyledH1>{props.day}</StyledH1>
            <img src={utils.imageDispenser(props.condition)} alt="weather_image"/>
            <StyledH1>{metric ? `${props.celsius}°c` : `${props.fahrenheit}°F`}</StyledH1>
        </DayCard>
    )
}