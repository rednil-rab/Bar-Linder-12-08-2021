import React from 'react'
import './navbar.css';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { withStyles } from '@material-ui/core/styles';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { useSelector, useDispatch } from 'react-redux';
import * as action from '../../store/action'



const IOSSwitch = withStyles((theme) => ({
    root: {
      width: 42,
      height: 26,
      padding: 0,
      margin: theme.spacing(1),
    },
    switchBase: {
      padding: 1,
      '&$checked': {
        transform: 'translateX(16px)',
        color: theme.palette.common.white,
        '& + $track': {
          backgroundColor: '#ffffff',
          opacity: 1,
          border: 'none',
        },
      },
      '&$focusVisible $thumb': {
        color: '#52d869',
        border: '6px solid #fff',
      },
    },
    thumb: {
      width: 24,
      height: 24,
    },
    track: {
      borderRadius: 26 / 2,
      border: `1px solid ${theme.palette.grey[400]}`,
      backgroundColor: '#242132',
      opacity: 1,
      transition: theme.transitions.create(['background-color', 'border']),
    },
    checked: {},
    focusVisible: {},
  }))(({ classes, ...props }) => {
    return (
      <Switch
        focusVisibleClassName={classes.focusVisible}
        disableRipple
        classes={{
          root: classes.root,
          switchBase: classes.switchBase,
          thumb: classes.thumb,
          track: classes.track,
          checked: classes.checked,
        }}
        {...props}
      />
    );
  });




export default function NavBar() {
    const dark = useSelector(state => state.dark);
    const dispatch = useDispatch();

    const handleChange = () => {
        dispatch({type: action.TOGGLE_THEME})
    }
    const style = {
        color: dark ? '#ffffff' : '#000000',
        borderBottom: dark ? 'solid 2px #ffffff' : 'solid 2px #000000'
    }
    return (
        <div style={style} className="navbar">
            <h1>
               Weather App
            </h1><div>
            <FormControlLabel
        control={<IOSSwitch checked={dark} onChange={handleChange} name="checkedB" label={'dark'}/>}
      />
      {dark ? 'dark mode':'light mode'}
            </div>

            <ButtonGroup size="lg" className="mb-2">
                <Link to="/home"><Button variant={dark ?  "outline-light" : "outline-dark"}>Home</Button></Link>
                <Link to="/favorites"><Button variant={dark ?  "outline-light" : "outline-dark"}>Favorites</Button></Link>
            </ButtonGroup>

        </div>
    )
}