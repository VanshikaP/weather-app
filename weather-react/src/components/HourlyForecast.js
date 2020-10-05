import React from 'react';

const HourlyForecast = ({hourly, currentDt, timezone, units, localTimezoneOffset}) => {
    const convertTime = d => {
        let hours = new Date((d+timezone+localTimezoneOffset) * 1000).getHours()
        if (hours == 0){
            return '12 AM'
        } else if (hours > 12){
            return `${hours-12} PM`
        } else if(hours < 12){
            return `${hours} AM`
        } else if (hours == 12){
            return '12 PM'
        }
    }
    return (
        <div className='hourly-container'>
            {hourly.map(h => (
                <div className='hourly-box' key={h.dt}>
                    <div className='hourly-time'>
                    {convertTime(h.dt)}
                    </div>
                    <div className='hourly-icon'>
                    <img className='hourly-icon-img' src={`http://openweathermap.org/img/wn/${h.weather[0].icon}.png`} alt={h.weather[0].main}/>
                    </div>
                    <div className='hourly-temp'>
                        {Math.round(h.temp)} °
                        {units === 'metric' ? ('C') : ('F')}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default HourlyForecast