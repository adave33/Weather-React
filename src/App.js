import React ,{useState} from 'react';
const weatherapi = {
  key: "3d0276ef3bfe81f749091b1e5536d28f",
  base:"https://api.openweathermap.org/data/2.5/"
}


function App() {

  const [query,setQuery]= useState('');
  const [weather,setWeather]= useState({});

  const search = evt=>{
    if(evt.key ==="Enter"){
      fetch(`${weatherapi.base}weather?q=${query}& units=metric&APPID=${weatherapi.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result);
        setQuery('');
      })
    }
  }

  const dateBuilder = (d) =>{
    let months=["January","February","March","April","May","June","July","August","September","October","Noveember","December"];
    let days=["Sunday","Monday","Tuesday","Wednessday","Thursday","Friday","Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }
  return (
    <div class={
      (typeof weather.main != "undefined")
      ? 
      (((weather.main.temp - 273.15) > 16) ? 'app warm' : 'app') 
      : 'app'}>
      <main>
        <div class="search-box">
          <input type="text" 
          class="search-bar" 
          placeholder="Search...."
          onChange={e=>setQuery(e.target.value)}
          value={query}
          onKeyPress={search}/>
        </div>
        {(typeof weather.main != "undefined") ? (
        <div>  
          <div class="location-box">
            <div class="location">{weather.name}, {weather.sys.country}</div>
            <div class="date">{dateBuilder(new Date())}</div>
          </div>
          <div class="weather-box">
            <div class="temp">{Math.round(weather.main.temp - 273.15)}°C</div>
            <div class="weather"> {weather.weather[0].main}</div>
          </div>
        </div>
        ): ('')}
        
      </main>
    </div>
  );
}

export default App;
