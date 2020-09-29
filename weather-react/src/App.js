import React, {useState, useEffect} from 'react';

const api = {
  key: process.env.REACT_APP_WEATHER_KEY,
  base: 'http://api.openweathermap.org/data/2.5/'
}

const unsplash_api = {
  access_key: `Client-ID ${process.env.REACT_APP_UNSPLASH_KEY}`,
  base: 'https://api.unsplash.com/search/photos'
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [bg, setBg] = useState('./assets/cold.jpg');
  useEffect(() => {
    // get default weather information
    fetch(`${api.base}weather?q=san+francisco&units=metric&APPID=${api.key}`)
    .then(res => res.json())
    .then(result => {
      setWeather(result)
      console.log(result)
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
  }, [])

  const search = evt => {
    if (evt.key === 'Enter'){
      // get weather information
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
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
      //     console.log('unsplash api response', res.results[0].urls.regular, res)
      //     setBg(res.results[0].urls.regular)
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
        <div className='search-box'>
          <input 
            type='text'
            className='search-bar'
            placeholder='Search...'
            onChange = {e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
        <div>
          <div className='location-box'>
            <div className='location'>{weather.name}, {weather.sys.country}</div>
            <div className='date'>{dateBuilder(new Date())}</div>
          </div>
          <div className='weather-box'>
            <div className='temp'>
              {Math.round(weather.main.temp)}°C
            </div>
            <div className='weather'>
              {weather.weather[0].main}
            </div>
          </div>
        </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
