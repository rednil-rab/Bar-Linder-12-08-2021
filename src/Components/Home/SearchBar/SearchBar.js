import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import * as list from './list';
import {useDispatch } from 'react-redux';
import * as action from '../../../store/action';
import * as utils from '../../../utils';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import Geocode from "react-geocode";

Geocode.setApiKey("AIzaSyDI_cZNKbdlEDqkcwzQysW24VMkcIv50NI");


export default function SearchBar() {
  const dispatch = useDispatch();
  const initialValue = []
  const [cities, setCities] = useState(initialValue);
  const errorId = utils.ID();
  // const options = list.list.map(
  //   item => {
  //     return { value: item.AdministrativeArea.LocalizedName, label: item.AdministrativeArea.LocalizedName, key: item.Key }
  //   }
  // )

  const notify = () => toast.error("Network Error", {
    toastId: errorId
  });

  useEffect(()=>{
    citySelection({key: '215854', value: 'Tel Aviv'})
  },[]);
  
 const getCities = (q)  => {
  fetch(`${utils.ACCU_WEATHER_HOST}/locations/v1/cities/autocomplete?apikey=${utils.API_KEY}&q=${q}&language=en`)
  .then(res => res.json())
  .then((data) => {
    console.log(data);
    let temp = data.map(
      item =>{
        return {value: item.AdministrativeArea.LocalizedName, label: item.AdministrativeArea.LocalizedName, key: item.Key}
      }
    )
    console.log(temp);
    setCities(temp);
    console.log(cities)
  })
  .catch(notify)
 }

  const makeDayArray = (array) => {
    let days = array.map(day => {
      let weekday = new Date(day.Date)
      return {
        weekday: utils.weekDayConvertor[weekday.getDay()],
        celsius: Math.ceil(day.Temperature.Maximum.Value) ,
        fahrenheit: utils.cToF(Math.ceil(day.Temperature.Maximum.Value)),
        condition: day.Day.IconPhrase
      }
    });
    
    return days
  }

  const citySelection = async (item) => {
    dispatch({type: action.UPDATE_KEY, key: item.key, city: item.value});
    debugger;
    console.log(item.key);
    try {
      const response = await axios.get(`${utils.ACCU_WEATHER_HOST}/currentconditions/v1/${item.key}?apikey=${utils.API_KEY}&language=en&details=true`)
      dispatch({type: action.UPDATE_TEMPERATURE, celsius: response.data[0].Temperature.Metric.Value,fahrenheit: response.data[0].Temperature.Imperial.Value});
      dispatch({type: action.UPDATE_CURRENT, value: response.data[0].WeatherText});
    } catch (error) {
      console.log(error);
      notify();
    }

    try {
      const response2 = await axios.get(`${utils.ACCU_WEATHER_HOST}/forecasts/v1/daily/5day/${item.key}?apikey=${utils.API_KEY}&language=en&details=true&metric=true`)
      console.log(response2);
      dispatch({type: action.UPDATE_DAYS, value: makeDayArray(response2.data.DailyForecasts)}) 
    } catch (error) {
      notify()
      console.log(error);
    }
  }



  const handleInput = utils.debounce((q) => {
    getCities(q);
  },500)


  const handleChange = async (item) => {
    citySelection(item);
  }

  return (
    <div className="search-bar">
    <Select
      onChange={handleChange}
      onInputChange={handleInput}
      options={cities} />
    <ToastContainer />
    </div>

  );
}

