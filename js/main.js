import * as elements from "./variables.js";
import { getWeatherData } from "./data.js";


elements.searchFrom.addEventListener("submit",(e) => {
      let cityName = elements.userInputText.value;
      getWeatherData(cityName)
      e.preventDefault();
    }
)
