import React from 'react'
import { useSelector } from 'react-redux'
import Dashboard from './Dashboard/DashBoard'
import DayCard from './dayCard/DayCard'

export default function MainContainer() {
    const dark = useSelector(state => state.dark);
    const location = useSelector(state => state.city);
    const celsius = useSelector(state => state.celsius);
    const fahrenheit = useSelector(state => state.fahrenheit);
    const metric = useSelector(state => state.metric);
    const current = useSelector(state => state.current);
    const days = useSelector(state => state.days);
    const key = useSelector(state => state.key);

    const dayCardArray = days.map((day,index) => <DayCard key={`card_${index}`} day={day.weekday} celsius={day.celsius} fahrenheit={day.fahrenheit} condition={day.condition}/>);
    return (
        <div style={{background: dark ? '#2D2C41': 'rgba(255, 255, 255, 0.2)', color: dark ? '#ffffff' : '#000000',}} className='main-container'>
            <Dashboard 
            location={location}
            degrees={metric ? `${celsius}°c`:`${fahrenheit}°F`}
            dark={dark}
            metric={metric}
            key={key}
            current={current}
            />
            <h1>{current}</h1>
            <div className="forecast-div">
                {dayCardArray}
            </div>
        </div>
    )
}