import { useEffect, useState } from 'react'
import axios from 'axios'


function App() {
  let location="dallas";

  const [data,setData]=useState({
    celcius:'',
    name: '',
    humidity:'',
    desc:''
  })

  const [name,setName]=useState("");

  useEffect(()=>{
    let url=`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=cdbf67dc54d48c45e2381c4d855f25ff`;
    axios.get(url)
    .then(res => {
      setData({...data, celcius: res.data.main.temp,
                        name: res.data.name,
                        humidity: res.data.main.humidity,
                        desc: res.data.weather[0].description,
                        weatherId: res.data.weather[0].id
      })
    })
    .catch(err => console.log(err));

  })

  function k2c(k){
    if(k==''){
      return ""
    }
    let c;
    c=k-273;
    return Math.round(c);
  }




  let weathId=data.weatherId;

  function weatherEmoji(wId){
    switch(true){
      case(wId >= 200 && wId<300): return "⛈️";
      case(wId >= 300 && wId<400): return "🌧️";
      case(wId >= 500 && wId<600): return "🌧️";
      case(wId >= 600 && wId<700): return "❄️";
      case(wId >= 700 && wId<800): return "🌫️";
      case(wId===800): return "☀️";
      case(wId >= 801 && wId<810): return "☁️";
    }
  }



 
  
  return (
    <div className='Body'>
      <form className="weatherform" id='form'>
        <input value={name} type='text' className='cityInput' placeholder='Enter City' onChange={e => setName(e.target.value)}/>
      </form>

      <div className="card" >
        <h1 className='cityDisplay'>{data.name}</h1>
        <p className="tempDisplay" >{k2c(data.celcius)}°C</p>
        <p className="humidityDisplay">Humidity: {data.humidity}%</p>
        <p className="weatherEmoji">{weatherEmoji(weathId)}</p>
        <p className="descDisplay">{data.desc}</p>
      </div>
    </div>
  )
}

export default App
