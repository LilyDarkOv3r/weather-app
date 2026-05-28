//Napkelte-napnyugta betöltés

let clockInterval: number|undefined; //ora resethez
const sunSecondary = document.querySelector("#sun-secondary") as HTMLParagraphElement;

export function renderSunCycle(weatherData:any) {
    const sunrise = weatherData.daily.sunrise[0];
    const sunset = weatherData.daily.sunset[0];
    const sunriseTime = sunrise.split("T")[1];
    const sunsetTime = sunset.split("T")[1];
    const currentHour = Number(new Date().toLocaleTimeString( "hu-HU",{hour: "numeric", hour12: false,timeZone: weatherData.timezone}));
    const sunsetHour = Number(sunsetTime.split(":")[0])
if (currentHour >= sunsetHour || currentHour < 6) {
    sunSecondary.innerHTML = `🌇 Sunset ${sunsetTime} <span id="sun-primary">🌅 Sunrise ${sunriseTime}</span> `;
}
else {
    sunSecondary.innerHTML = `🌅 Sunrise ${sunriseTime} <span id="sun-primary">🌇 Sunset ${sunsetTime}</span>`;
}};

//══════════════════════════════════════════════════════════════════════════════════════════════════════
//✦ . 　⁺ 　 . ✦ . 　⁺ 　 . ✦ . 　⁺ 　 . ✦ . 　⁺ 　 . ✦ . 　⁺ 　 . ✦ .✦ . 　⁺ 　 . ✦ . 　⁺ 　 . ✦ . 　⁺ 　
//︶⊹︶︶୨୧︶︶⊹︶︶⊹︶︶୨୧︶︶⊹︶︶⊹︶︶୨୧︶︶⊹︶︶⊹︶⊹︶︶୨୧︶︶⊹︶︶⊹︶︶୨୧︶︶⊹︶︶⊹︶︶୨୧︶︶⊹︶︶⊹


//Óra

const clock = document.querySelector( "#clock") as HTMLDivElement;

export function clockStart(timezone:string) {
    clearInterval(clockInterval);
    clockInterval = setInterval(() => {
        UpdateClock(timezone);
    }, 1000);    
}

function UpdateClock(timezone:string) {
       const cityTime = new Date().toLocaleTimeString(
        "hu-HU",
        {
            timeZone: timezone
        }
    );
    clock.innerHTML = cityTime;
}

//══════════════════════════════════════════════════════════════════════════════════════════════════════
//✦ . 　⁺ 　 . ✦ . 　⁺ 　 . ✦ . 　⁺ 　 . ✦ . 　⁺ 　 . ✦ . 　⁺ 　 . ✦ .✦ . 　⁺ 　 . ✦ . 　⁺ 　 . ✦ . 　⁺ 　
//︶⊹︶︶୨୧︶︶⊹︶︶⊹︶︶୨୧︶︶⊹︶︶⊹︶︶୨୧︶︶⊹︶︶⊹︶⊹︶︶୨୧︶︶⊹︶︶⊹︶︶୨୧︶︶⊹︶︶⊹︶︶୨୧︶︶⊹︶︶⊹

//Oldal update

import {getWeatherTheme, updateDayTime} from "./weathertheme";

const background = document.querySelector("#background") as HTMLDivElement;


export function updateWeatherTheme(weatherData: any) {
    const weatherTheme = getWeatherTheme(weatherData.current.weather_code);
    background.style.transform = "scale(1.05)"; 
    background.style.filter = "blur(4px)"; 
    
    setTimeout(() => {
        background.style.backgroundImage = `url(${weatherTheme.background})`;
        background.style.transform = "scale(1)"; 
        background.style.filter = "blur(0px)"; 
    }, 300); 
    
    updateDayTime(weatherData.timezone);
}

//══════════════════════════════════════════════════════════════════════════════════════════════════════
//✦ . 　⁺ 　 . ✦ . 　⁺ 　 . ✦ . 　⁺ 　 . ✦ . 　⁺ 　 . ✦ . 　⁺ 　 . ✦ .✦ . 　⁺ 　 . ✦ . 　⁺ 　 . ✦ . 　⁺ 　
//︶⊹︶︶୨୧︶︶⊹︶︶⊹︶︶୨୧︶︶⊹︶︶⊹︶︶୨୧︶︶⊹︶︶⊹︶⊹︶︶୨୧︶︶⊹︶︶⊹︶︶୨୧︶︶⊹︶︶⊹︶︶୨୧︶︶⊹︶︶⊹

//Szöveges kiírás + ikonok

const tempP = document.querySelector("#temp") as HTMLParagraphElement; 
const rainP = document.querySelector("#esomenny") as HTMLParagraphElement;
const humidity = document.querySelector( "#humidity") as HTMLParagraphElement;
const windSpeed = document.querySelector("#wind-speed") as HTMLParagraphElement;
const feelsLike = document.querySelector("#feels-like") as HTMLParagraphElement;
const weatherText = document.querySelector("#weather-text") as HTMLParagraphElement;
const weatherIcon = document.querySelector("#weather-icon") as HTMLParagraphElement;



export function renderCurrentWeather(weatherData:any) {
    const weatherTheme = getWeatherTheme(weatherData.current.weather_code);
    
    tempP.innerHTML = `  ${weatherData.current.temperature_2m}°C`;
    rainP.innerHTML = ` ${weatherData.current.rain} mm/h`;
    humidity.innerHTML = `${weatherData.current.relative_humidity_2m}%`;
    windSpeed.innerHTML = `${weatherData.current.wind_speed_10m} km/h`;
    feelsLike.innerHTML = `Feels like ${weatherData.current.apparent_temperature}°C`;

    weatherText.innerHTML = weatherTheme.text;
    weatherIcon.innerHTML = weatherTheme.icon;

}

//══════════════════════════════════════════════════════════════════════════════════════════════════════
//✦ . 　⁺ 　 . ✦ . 　⁺ 　 . ✦ . 　⁺ 　 . ✦ . 　⁺ 　 . ✦ . 　⁺ 　 . ✦ .✦ . 　⁺ 　 . ✦ . 　⁺ 　 . ✦ . 　⁺ 　
//︶⊹︶︶୨୧︶︶⊹︶︶⊹︶︶୨୧︶︶⊹︶︶⊹︶︶୨୧︶︶⊹︶︶⊹︶⊹︶︶୨୧︶︶⊹︶︶⊹︶︶୨୧︶︶⊹︶︶⊹︶︶୨୧︶︶⊹︶︶⊹

//Előrejelzés

const forecastContainer = document.querySelector("#forecast-container") as HTMLDivElement;


export function renderForecast(weatherData:any) {
    forecastContainer.innerHTML = ""; //elorejelzes torlese, hogy ne gyarapszon vegtelenul a forecast ha sokat keresunk
    weatherData.daily.time.forEach((day:string, index:number) => {
        const maxTemp = weatherData.daily.temperature_2m_max[index];
        const minTemp = weatherData.daily.temperature_2m_min[index];
        const weatherCode = weatherData.daily.weather_code[index];
        const forecastCard = document.createElement("div");
        const formattedDay = new Date(day).toLocaleDateString("en-US", { weekday: "short" });
        const weatherTheme = getWeatherTheme(weatherCode);
    forecastCard.classList.add("forecast-card");
    forecastCard.innerHTML = `<p id="formatted-day">${formattedDay}</p>
        <p id="forecast-max">${maxTemp}° </p>
        <p id="forecast-min">${minTemp}°</p>
        <p id="forecast-icon">${weatherTheme.icon}</p>`;
    forecastContainer.appendChild(forecastCard)});
}

//══════════════════════════════════════════════════════════════════════════════════════════════════════
//✦ . 　⁺ 　 . ✦ . 　⁺ 　 . ✦ . 　⁺ 　 . ✦ . 　⁺ 　 . ✦ . 　⁺ 　 . ✦ .✦ . 　⁺ 　 . ✦ . 　⁺ 　 . ✦ . 　⁺ 　
//︶⊹︶︶୨୧︶︶⊹︶︶⊹︶︶୨୧︶︶⊹︶︶⊹︶︶୨୧︶︶⊹︶︶⊹︶⊹︶︶୨୧︶︶⊹︶︶⊹︶︶୨୧︶︶⊹︶︶⊹︶︶୨୧︶︶⊹︶︶⊹
