import * as load from "./ui/loaddata"
import { getWeather,  } from "./api/weather";
import { searchCity, getSavedCity } from "./city"

export async function loadWeather(lat:number, lon:number) {  //kipakolja az oldalra az adatokat
    const weatherData = await getWeather(lat, lon);
    
    load.renderSunCycle(weatherData);

    load.clockStart(weatherData.timezone);

    load.updateWeatherTheme(weatherData);

    load.renderCurrentWeather(weatherData);

    load.renderForecast(weatherData);

}

const cityName = document.querySelector("#city-name") as HTMLParagraphElement;

export async function startLoading() {    
    const savedCity = getSavedCity();
if (savedCity) {
    const cityData = await searchCity(savedCity);
    const result = cityData.results[0];

    cityName.innerHTML = result.name;
    loadWeather(result.latitude, result.longitude);
}
else {
    cityName.innerHTML = "Budapest";
    loadWeather(47.4979, 19.0402);
}}; 