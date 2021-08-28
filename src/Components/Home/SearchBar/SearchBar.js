import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import {useDispatch, useSelector } from 'react-redux';
import * as action from '../../../store/action';
import * as utils from '../../../utils';
import { ToastContainer, toast } from 'react-toastify';
import * as requests from '../../../requests/requests'
import styled from 'styled-components';

export default function SearchBar() {
  const dispatch = useDispatch();
  const first = useSelector(state => state.first);
  const initialValue = []
  const [cities, setCities] = useState(initialValue);
  const errorId = utils.ID();


  const notify = () => toast.error("Network Error", {
    toastId: errorId
  });

  useEffect(()=>{
    
    if (!first) {
      dispatch({ type: action.UPDATE_KEY, key: '215854', city: 'Tel Aviv' });
      requests.citySelection({key: '215854', value: 'Tel Aviv'},dispatch,notify);
      requests.nextFiveDays({key: '215854', value: 'Tel Aviv'},dispatch,notify);
      dispatch({type: action.TOGGLE_FIRST})
    }
  },[]);
  
  const SearchContainer = styled.div`
  width: 30%;
  height: 5%;
  background: transparent;
  height: 3.5vw;
  `
  const handleInput = utils.debounce( async (q) => {
    try {
      let result = await requests.getCities(q);
      setCities(result);
    } catch {
      notify()
    }


  },500)


  const handleChange = async (item) => {
    dispatch({ type: action.UPDATE_KEY, key: item.key, city: item.value });
    requests.citySelection(item,dispatch,notify);
    requests.nextFiveDays(item,dispatch,notify);
  }

  return (
    <SearchContainer >
    <Select
      onChange={handleChange}
      onInputChange={handleInput}
      options={cities} />
    <ToastContainer />
    </SearchContainer >

  );
}

