import { getWeather } from "./api/weather";
import { saveCity as savedCity, searchCity, getSavedCity } from "./city";
import { getWeatherTheme } from "./ui/weathertheme";
import { getWeatherText } from "./ui/weatherText";



const tempP = document.querySelector("#temp") as HTMLParagraphElement; 
const rainP = document.querySelector("#esomenny") as HTMLParagraphElement;
const searchedCity = document.querySelector("#citysearch") as HTMLInputElement;
const searchBTN = document.querySelector("#searchBTN") as HTMLButtonElement;
const background = document.querySelector("#background") as HTMLDivElement;
const weatherText = document.querySelector("#weather-text") as HTMLParagraphElement;
const cityName = document.querySelector("#city-name") as HTMLHeadingElement;
const weatherIcon = document.querySelector("#weather-icon") as HTMLParagraphElement;


async function loadWeather(lat:number, lon:number) {  //kipakolja az oldalra az adatokat
    const weatherData = await getWeather(lat, lon);

    tempP.innerHTML = `  ${weatherData.current.temperature_2m}°C`;
    rainP.innerHTML = ` ${weatherData.current.rain} mm/h`;
    weatherText.innerHTML = getWeatherText(weatherData.current.weather_code);
    const weatherTheme = getWeatherTheme(weatherData.current.weather_code);

    background.style.backgroundImage = `url(${weatherTheme.background})`;
    weatherText.innerHTML = weatherTheme.text;
    weatherIcon.innerHTML = weatherTheme.icon;
}

searchBTN.addEventListener("click", async () => {
    const cityData = await searchCity(searchedCity.value);

    if (!cityData || cityData.results.length === 0) {
        alert("Nem található ilyen város");
        return;
    }
    const result = cityData.results[0];
    cityName.innerHTML = result.name;
    loadWeather(result.latitude, result.longitude);
    savedCity(result.name);

});

loadWeather(47.4979, 19.0402); //pesti koordok hog ne legyen ures a weboldal
cityName.innerHTML = "Budapest";

async function startLoading() {
    const savedCity = getSavedCity();
if (savedCity) {
    const cityData = await searchCity(savedCity);
    
    if (cityData&& cityData.results && cityData.results.length > 0) {
        const result = cityData.results[0];

        cityName.innerHTML = result.name;
        loadWeather(result.latitude, result.longitude);
    }    
}
else {
    cityName.innerHTML = "Budapest";
    loadWeather(47.4979, 19.0402);
}};

startLoading();

navigator.geolocation.getCurrentPosition((position) => {
    cityName.innerHTML = "Saját helyzet";
    loadWeather(position.coords.latitude, position.coords.longitude);
});


