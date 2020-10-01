import React, {useState, useEffect} from 'react';
import MoreInfo from './components/MoreInfo'
import SearchBox from './components/SearchBox';

const api = {
  key: process.env.REACT_APP_WEATHER_KEY,
  base: 'http://api.openweathermap.org/data/2.5/'
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
  const [bg, setBg] = useState('');
  const [hourly, setHourly] = useState([]);
  
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
        })
    })
    // get default background
  // fetch(`${unsplash_api.base}?page=1&query=san+francisco`, {
  //   headers:{
  //     Authorization: unsplash_api.access_key
  //   }
  // })
  //   .then(res => res.json())
  //   .then(res => {
  //     console.log('unsplash api response', res.results[0].urls.regular, res)
  //     setBg(res.results[0].urls.regular)
  //     setQuery('')
  //   })
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
      // fetch(`${unsplash_api.base}?page=1&query=${query}`, {
      //   headers:{
      //     Authorization: unsplash_api.access_key
      //   }
      // })
      //   .then(res => res.json())
      //   .then(res => {
      //     console.log('unsplash api response', res)
      //     if (res.results.length != 0){
      //       setBg(res.results[0].urls.regular)
      //     } else {
      //       setBg('https://c0.wallpaperflare.com/preview/181/2/553/sky-sunset-sunrise-blank.jpg')
      //     }
      //     setQuery('')
      //   })
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
    <div className='app' style={{ backgroundImage: `url(${bg})`}}>
      <main>
        <SearchBox query={query} setQuery={setQuery} search={search} />
        {(typeof weather.main != "undefined") ? (
        <div>
          <div className='location-box'>
            <div className='location'>{weather.name}, {weather.sys.country}</div>
            <div className='date'>{dateBuilder(new Date((weather.dt + weather.timezone + 25200) * 1000))}</div>
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
                {weather.weather[0].main}
                <img className='weather-icon' src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
              </div>
            </div>
          </div>
          <MoreInfo weatherInfo={weather} units={units} />
        </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
