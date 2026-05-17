import { getWeather } from "./api/weather";
import { searchCity } from "./api/city";
import { backgroundSwitch } from "./ui/background";



const tempP = document.querySelector("#temp") as HTMLParagraphElement; 
const rainP = document.querySelector("#esomenny") as HTMLParagraphElement;
const searchedCity = document.querySelector("#citysearch") as HTMLInputElement;
const searchBTN = document.querySelector("#searchBTN") as HTMLButtonElement;
const background = document.querySelector("#background") as HTMLDivElement;



async function loadWeather(lat:number, lon:number) {  //kipakolja az oldalra az adatokat
    const weatherData = await getWeather(lat, lon);
    backgroundSwitch(
        weatherData.current.weather_code, background
    );
    tempP.innerHTML = `  ${weatherData.current.temperature_2m}°C`;
    rainP.innerHTML = ` ${weatherData.current.rain} mm/h`;
}


searchBTN.addEventListener("click", async () => {
    const cityData = await searchCity(searchedCity.value);

    if (!cityData || cityData.results.length === 0) {
        alert("Nem található ilyen város");
        return;
    }
    const result = cityData.results[0];
   
    loadWeather(result.latitude, result.longitude);

});

loadWeather(47.4979, 19.0402); //pesti koordok hog ne legyen ures a weboldal

navigator.geolocation.getCurrentPosition((position) => {
    loadWeather(position.coords.latitude, position.coords.longitude);
});


