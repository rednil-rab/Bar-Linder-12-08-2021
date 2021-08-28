import React from 'react'
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import IOSSwitch from '../IOSSwitch/IOSSwitch';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { useSelector, useDispatch } from 'react-redux';
import * as action from '../../store/action'
import useWindowSize from '../../hooks/useWindowsize';
import styled from 'styled-components';




export default function NavBar() {
  const dark = useSelector(state => state.dark);
  const dispatch = useDispatch();
  const windowSize = useWindowSize();

  const handleChange = () => {
    dispatch({ type: action.TOGGLE_THEME })
  }
  const style = {
    color: dark ? '#ffffff' : '#000000',
    borderBottom: dark ? 'solid 2px #ffffff' : 'solid 2px #000000'
  }



  const StyledH1 = styled.h1`
  font-size: ${windowSize.width < 900 ? '5vw' : '2vw'};
  `
  const SwitchCOntainer = styled.div`
  display: flex;
  flex-direction: ${windowSize.width < 900 ? 'column' : 'row'}
  `
  const NavBar = styled.div`
  position: relative;
  top: 0;
  width: 100vw;
  height: 13%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1%;
  transition: color .3s ease;`
const br = windowSize.width < 900 ? <br></br> : '';

  return (
    <NavBar style={style} className="navbar">
      <StyledH1>
        Weather {br} App
      </StyledH1>
      <SwitchCOntainer>
        <FormControlLabel
          control={<IOSSwitch checked={dark} onChange={handleChange} name="checkedB" label={'dark'} />}
        />
        {dark ? 'dark mode' : 'light mode'}
      </SwitchCOntainer>

      <ButtonGroup style={{alignItems: 'center'}} size="lg" className={windowSize.width < 900 ? "btn-group-vertical" : "mb-2"}>
        <Link to="/home"><Button style={{width: '100%'}} variant={dark ? "outline-light" : "outline-dark"}>Home</Button></Link>
        <Link to="/favorites"><Button style={{width: '100%'}} variant={dark ? "outline-light" : "outline-dark"}>Favorites</Button></Link>
      </ButtonGroup>

    </NavBar>
  )
}