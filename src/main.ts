import { getWeather } from "./api/weather";
import { searchCity } from "./api/city";
import { backgroundSwitch } from "./ui/background";



// const tempP = document.querySelector("#temp") as HTMLParagraphElement; 
// const rainP = document.querySelector("#esomenny") as HTMLParagraphElement;
const searchedCity = document.querySelector("#citysearch") as HTMLInputElement;
const searchBTN = document.querySelector("#searchBTN") as HTMLButtonElement;
const background = document.querySelector("#background") as HTMLDivElement;



async function loadWeather(lat:number, lon:number) {
    const weatherData = await getWeather(lat, lon);
    backgroundSwitch(
        weatherData.current.weather_code, background
    );
}


searchBTN.addEventListener("click", async () => {
    const cityData =await searchCity(searchedCity.value);

    if (!cityData || cityData.results.length === 0) {
        alert("Nem található ilyen város");
        return;
    }
    const result = cityData.results[0];
   
    loadWeather(result.latitude, result.longitude);

});




