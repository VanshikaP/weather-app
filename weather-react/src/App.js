import React, {useState, useEffect} from 'react';
import MoreInfo from './components/MoreInfo'
import SearchBox from './components/SearchBox';
import HourlyForecast from './components/HourlyForecast';
import WeeklyForecast from './components/WeeklyForecast';
// random comment
const api = {
  key: process.env.REACT_APP_WEATHER_KEY,
  base: 'https://api.openweathermap.org/data/2.5/'
}

const unsplash_api = {
  access_key: `Client-ID ${process.env.REACT_APP_UNSPLASH_KEY}`,
  base: 'https://api.unsplash.com/search/photos'
}

function App() {
  const [query, setQuery] = useState('san+francisco');
  const [units, setUnits] = useState('metric');
  const [location, setLocation] = useState({lat: 37.77, lon: -122.42})
  const [weather, setWeather] = useState({});
  const [uvi, setUvi] = useState('');
  const [bg, setBg] = useState('');
  const [hourly, setHourly] = useState([]);
  const [weekly, setWeekly] = useState([]);
  const localTimezoneOffset = new Date().getTimezoneOffset()*60;
  // console.log('Timezone offset', localTimezoneOffset)
  
  // get user location if allowed
  useEffect(() => {
    if('geolocation' in navigator){
      console.log('Location is available')
      navigator.geolocation.getCurrentPosition(function(position) {
        console.log("Latitude is :", position.coords.latitude);
        console.log("Longitude is :", position.coords.longitude);
        setLocation({lat: position.coords.latitude, lon: position.coords.longitude})
      });
    }
  },[])
  
  useEffect(() => {
    // get default current weather information
    fetch(`${api.base}weather?lat=${location.lat}&lon=${location.lon}&units=${units}&APPID=${api.key}`)
    .then(res => res.json())
    .then(result => {
      setWeather(result)
      console.log(result)
      // get hourly forecast
      fetch(`${api.base}onecall?lat=${location.lat}&lon=${location.lon}&units=${units}&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          console.log('Hourly', result)
          setUvi(result.current.uvi)
          setHourly(result.hourly)
          setWeekly(result.daily)
        })
    })
    // get default background
  fetch(`${unsplash_api.base}?page=1&query=clouds`, {
    headers:{
      Authorization: unsplash_api.access_key
    }
  })
    .then(res => res.json())
    .then(res => {
      console.log('unsplash api response', res.results[0].urls.regular, res)
      setBg(res.results[0].urls.regular)
      setQuery('')
    })
  }, [units, location])

  const search = evt => {
    if (evt.key === 'Enter'){
      // get weather information
      fetch(`${api.base}weather?q=${query}&units=${units}&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result)
          console.log(result)
        })
        // get background
      fetch(`${unsplash_api.base}?page=1&query=${query}`, {
        headers:{
          Authorization: unsplash_api.access_key
        }
      })
        .then(res => res.json())
        .then(res => {
          console.log('unsplash api response', res)
          if (res.results.length != 0){
            setBg(res.results[0].urls.regular)
          } else {
            setBg('https://c0.wallpaperflare.com/preview/181/2/553/sky-sunset-sunrise-blank.jpg')
          }
          setQuery('')
        })
    }
  }


  const dateBuilder = d => {
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}\n${date} ${month} ${year}`
  }
  return (
    <div className='app' style={{ backgroundImage: `url(${bg})`}} >
      <main>
        <SearchBox query={query} setQuery={setQuery} search={search} />
        {(typeof weather.main != "undefined") ? (
        <div>
          <div className='location-box'>
            <div className='location'>{weather.name}, {weather.sys.country}</div>
            <div className='date'>{dateBuilder(new Date((weather.dt + weather.timezone + localTimezoneOffset) * 1000))}</div>
          </div>
          <div className='weather-box'>
            <div className='temp'>
              {Math.round(weather.main.temp)}
              <span className='temp-unit' onClick={() => {units === 'metric' ? setUnits('imperial') : setUnits('metric')}}>
                °
                {units === 'metric' ? ('C') : ('F')}
              </span>
              <div className='temp-range'>
              {Math.round(weather.main.temp_max)}°/{Math.round(weather.main.temp_min)}°
              </div>
            </div>
            <div className='weather'>
              <div className='desc'>
                <span className='weather-desc'>{weather.weather[0].main}</span>
                <img className='weather-icon' src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt='' />
              </div>
            </div>
          </div>
          <HourlyForecast hourly={hourly} timezone={weather.timezone} units={units} currentDt={weather.dt} localTimezoneOffset={localTimezoneOffset} />
          {/* <WeeklyForecast weekly={weekly} timezone={weather.timezone} localTimezoneOffset={localTimezoneOffset}/> */}
          <MoreInfo weatherInfo={weather} units={units} uvi={uvi}/>
          <div className='weather-info'>
            {weather.weather[0].icon}
          </div>
        </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
