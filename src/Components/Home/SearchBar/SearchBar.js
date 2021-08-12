import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import {useDispatch, useSelector } from 'react-redux';
import * as action from '../../../store/action';
import * as utils from '../../../utils';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import * as requests from '../../../requests/requests'


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
      requests.citySelection({key: '215854', value: 'Tel Aviv'},dispatch,notify)
      dispatch({type: action.TOGGLE_FIRST})
    }
  },[]);
  






  function  suppressNonEng(e)
  {
    let key;
    if(window.event)  key = window.event.keyCode;     //IE
    else  key = e.which;     //firefox


    if(key >128)  return false;
    else  return true;
  }

  const handleInput = utils.debounce( async (q) => {
    try {
      let result = await requests.getCities(q);
      setCities(result);
    } catch {
      notify()
    }


  },500)


  const handleChange = async (item) => {
    requests.citySelection(item,dispatch,notify);
  }

  return (
    <div className="search-bar">
    <Select
      onChange={handleChange}
      onInputChange={handleInput}
      onKeyDown={(event)=> suppressNonEng(event)}
      options={cities} />
    <ToastContainer />
    </div>

  );
}

