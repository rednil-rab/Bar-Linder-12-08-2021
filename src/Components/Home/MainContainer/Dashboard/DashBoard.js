import React from 'react';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import * as action from '../../../../store/action';
import * as Icon from 'react-bootstrap-icons';
import * as utils from '../../../../utils';

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
        backgroundColor: '#242132',
        opacity: 1,
        border: `1px solid ${theme.palette.grey[400]}`,
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


export default function Dashboard(props) {
  const dispatch = useDispatch();
  const isFavorite = useSelector(state => state.isFavorite);

  const handleChange = () => {
    dispatch({ type: action.TOGGLE_METRIC })
  }
  const handleClick = () => {
    dispatch({ type: action.UPDATE_FAVORITES })
  }

  return (
    <div className="dashboard">
      <div className="weather-widget">
        <img alt="weather_img" src={utils.imageDispenser(props.current)}>
        </img>
        <div style={{ color: props.dark ? '#ffffff' : '#000000' }}>
          <p>{props.location}</p>
          <p>{props.degrees}</p>

        </div>
      </div>
      <div >
        <FormControlLabel
          control={<IOSSwitch checked={props.metric} name="checkedB" onChange={handleChange} label={'dark'} />}

        />
          <h3>{props.metric ? 'Celcius' : 'Fahrenheit'}</h3>
      </div>


        {
          isFavorite ? <Icon.HeartFill onClick={() => handleClick()} className="favorites-icon" style={{ color: '#fe0000' }} /> : <Icon.Heart onClick={() => handleClick()} className="favorites-icon" style={{ color: props.dark ? '#ffffff' : '#000000' }} />
        }


      </div>
      )
}