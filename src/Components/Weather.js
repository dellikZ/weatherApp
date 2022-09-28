const Weather = (props) => {

    if(props.array.cod === '404') {
        return (
            <div className="weather-div">
                <h2>Invalid City Name</h2>
            </div>
        );
    }

    console.log(props.array)

    const getLocation = () => {
        return `${props.array.name}, ${props.array.sys.country}`;
    }



    const getTemps = () => {
        const currentTemp = props.array.main.temp;
        const maxTemp = props.array.main.temp_max;
        const minTemp = props.array.main.temp_min;
        const realFeel = props.array.main.feels_like;

        const tempsArr = [];
        tempsArr.push(currentTemp, maxTemp, minTemp, realFeel);
        return tempsArr;
    }

    const convertTempsToCelsius = () => {
        let temps = getTemps();
        let convertedTemps = [];
        for(let i = 0; i < temps.length; i++) {
            convertedTemps.push(Math.round(temps[i] - 273.15));
        }
        return convertedTemps;
    }

    const getSunriseAndSunset = () => {
        const sunData = {};
        const sunrise = props.array.sys.sunrise;
        const sunset = props.array.sys.sunset;
        const convertMs = (num) => {
            const seconds = Math.floor((num / 1000) % 60);
            const minutes = Math.floor((num / (1000 * 60)) % 60);
            const hours = Math.floor((num / (1000 * 60 * 60)) % 24);

            return `${hours}:${minutes}`;
        }
        sunData.sunrise = `${convertMs(sunrise)} AM `;
        sunData.sunset = `${convertMs(sunset)} PM`;
        return sunData;
    }

    const getWeather = () => {
        const weather = props.array.weather[0].description;

        const capitalizedWeatherDesc = weather.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());

        return capitalizedWeatherDesc;
    }

    const getHumidity = () => {
        return `${props.array.main.humidity}%`;
    }

    const getIcon = () => {
        const iconID = props.array.weather[0].icon;
        return `https://openweathermap.org/img/w/${iconID}.png`;
    }

    console.log(getIcon())

    return (
        <div className="weather-div">
            <div className="weather-header">
                <h2>{ getLocation() }</h2>
                <img src={ getIcon() } alt="" />
            </div>
           <p>{ getWeather() }</p>
           <div className="temps">
            <div className="temp-main">
                <p>Temperature: { convertTempsToCelsius()[0] }C</p>
                <p>Feels Like: { convertTempsToCelsius()[3] }C</p>
            </div>
            <div className="temp-min">
                <p>Maximum Temperature: { convertTempsToCelsius()[1] }C</p>
                <p>Minimum Temperature: { convertTempsToCelsius()[2] }C</p>
            </div>
           </div>
           <p>Humidity: { getHumidity() }</p>
           
           
           
           <div className="sundata">
            <p>Sunrise: { getSunriseAndSunset().sunrise }</p>
            <p>Sunset: { getSunriseAndSunset().sunset }</p>
           </div>
        </div>
    );
}
 
export default Weather;