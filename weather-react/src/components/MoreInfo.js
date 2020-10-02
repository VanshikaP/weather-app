import React from 'react'

const MoreInfo = ({weatherInfo, units, uvi}) => {
    // const dateToday = new Date((weatherInfo.sys.sunset + weatherInfo.timezone + 25200) * 1000).toDateString()
    // console.log(dateToday)
    return (
        <div className='weather-info'>
            <table className='weather-table'>
                <tbody>
                    <tr>
                        <td>
                            <span className='weather-field'>Feels like</span><br/>
                            <span className='weather-value'>{weatherInfo.main.feels_like} </span>
                            <span className='weather-unit'>
                            °
                            {units === 'metric' ? ('C') : ('F')}
                            </span>
                        </td>
                        <td>
                            <span className='weather-field'>Humidity</span><br/>
                            <span className='weather-value'>{weatherInfo.main.humidity} </span>
                            <span className='weather-unit'>
                            %
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span className='weather-field'>Sunrise</span><br/>
                            <span className='weather-value'>{new Date((weatherInfo.sys.sunrise+weatherInfo.timezone+25200) * 1000).toLocaleTimeString('en-US')}</span>
                        </td>
                        <td>
                            <span className='weather-field'>Pressure</span><br/>
                            <span className='weather-value'>{weatherInfo.main.pressure} </span>
                            <span className='weather-unit'>
                            hPa
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span className='weather-field'>Sunset</span><br/>
                            <span className='weather-value'>{new Date((weatherInfo.sys.sunset+weatherInfo.timezone+25200) * 1000).toLocaleTimeString('en-US')}</span>
                        </td>
                        <td>
                            <span className='weather-field'>Wind</span><br/>
                            <span className='weather-value'>{weatherInfo.wind.speed} </span>
                            <span className='weather-unit'>
                            {units === 'metric' ? ('m/s') : ('mph')}
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span className='weather-field'>Visibility</span><br/>
                            <span className='weather-value'>{Math.round(weatherInfo.visibility / 100)/10} </span>
                            <span className='weather-unit'>
                            km
                            </span>
                        </td>
                        <td>
                            <span className='weather-field'>UV Index</span><br/>
                            <span className='weather-value'>{Math.round(uvi)} </span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default MoreInfo