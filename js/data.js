import { appid, weatherData, hour, minutes, body } from "./variables.js";

export const getWeatherData = async(city) => {

  weatherData.classList.add('loading');
  weatherData.innerHTML = ``;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${appid}&units=metric`;

  try {
    body.classList.remove('not-found');
    const response = await fetch(url);
    if (!response.ok) {
      body.className = '';
      body.classList.add('not-found');
      weatherData.classList.remove('loading');
      weatherData.innerHTML = `<div class="weather-info"><h1> City Not Found <h1></div>`;
    }
    const data = await response.json();
    return embedWeatherData(data);
  } catch (error) {
    console.error("Error fetching weather data:", error.message);
    throw error;
  }
};

const embedWeatherData = (data) => {
  console.log(data);
  let conditions = data.weather[0].main;
  let lowerCaseString = conditions.toLowerCase();
  body.className = "";
  body.classList.add(lowerCaseString);

  weatherData.innerHTML = `
    <div class="weather-info">
        <h1>${data.name}</h1>
        <div class='time'>${hour}:${minutes}</div>
        <div class="conditions">
            <img src="https://openweathermap.org/img/wn/${
              data.weather[0].icon
            }@2x.png" alt="${data.weather[0].main}">
            <h2>${data.weather[0].main}</h2>
           
        </div>
        <div class="temp">
            <div class="deg">${Math.round(data.main.temp)}&deg;</div>
            <div class="min-max-temp">
                <div class="max-temp">${Math.round(
                  data.main.temp_max
                )}&deg;c</div>
                <div class="min-temp">${Math.round(
                  data.main.temp_min
                )}&deg;c</div>
            </div>
        </div>
    </div>
    `;
    weatherData.classList.remove('loading');
 
};