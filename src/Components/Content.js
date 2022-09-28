import { useState } from 'react';
import { useEffect } from 'react';
import Weather from './Weather';


const Content = () => {
    


    const [ state, setState ] = useState('London');

    const [ weatherData, setWeatherData ] = useState(null);
   


    const handleClick = () => {
        setState(document.querySelector('input').value)
 
    }

    useEffect(() => {
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${state}&APPID=af857fba3f7a9739e495cd7df64d3a4d`, {mode: 'cors'})
        .then(result => {
            return result.json();
        })
        .then(data => setWeatherData(data))
        .catch(e => console.log(e))
        
    }, [state])


    
    return (
        <div className="content">
            <input type="text" placeholder="Enter a city name" />
            <button id='button' onClick={ handleClick }>Search</button>
            { weatherData && < Weather array = { weatherData } /> }
        </div>
    );
}
 
export default Content;