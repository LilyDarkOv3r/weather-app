import { getWeather, getLocationName } from "./api/weather";
import { saveCity as savedCity, searchCity, getSavedCity, saveCity } from "./city";
import { getWeatherTheme, updateDayTime } from "./ui/weathertheme";
import { getWeatherText } from "./ui/weatherText";



const tempP = document.querySelector("#temp") as HTMLParagraphElement; 
const rainP = document.querySelector("#esomenny") as HTMLParagraphElement;
const searchedCity = document.querySelector("#citysearch") as HTMLInputElement;
const searchBTN = document.querySelector("#searchBTN") as HTMLButtonElement;
const background = document.querySelector("#background") as HTMLDivElement;
const weatherText = document.querySelector("#weather-text") as HTMLParagraphElement;
const cityName = document.querySelector("#city-name") as HTMLHeadingElement;
const weatherIcon = document.querySelector("#weather-icon") as HTMLParagraphElement;
const searchResults = document.querySelector("#search-results") as HTMLDivElement;
const humidity = document.querySelector( "#humidity") as HTMLParagraphElement;
const windSpeed = document.querySelector("#wind-speed") as HTMLParagraphElement;
const clock = document.querySelector( "#clock") as HTMLDivElement;
const feelsLike = document.querySelector("#feels-like") as HTMLParagraphElement;
const sunSecondary = document.querySelector("#sun-secondary") as HTMLParagraphElement;
const forecastContainer = document.querySelector("#forecast-container") as HTMLDivElement;




let clockInterval: number|undefined; //ora resethez

function UpdateClock(timezone:string) {
       const cityTime = new Date().toLocaleTimeString(
        "hu-HU",
        {
            timeZone: timezone
        }
    );
    clock.innerHTML = cityTime;
}

async function loadWeather(lat:number, lon:number) {  //kipakolja az oldalra az adatokat
    const weatherData = await getWeather(lat, lon);
    //console.log(weatherData.daily.sunrise);
    const sunrise = weatherData.daily.sunrise[0];
    const sunset = weatherData.daily.sunset[0];
    const sunriseTime = sunrise.split("T")[1];
    const sunsetTime = sunset.split("T")[1];
   const currentHour = Number(new Date().toLocaleTimeString(
            "hu-HU",
            {
                hour: "numeric",
                hour12: false,
                timeZone:
                    weatherData.timezone
            }
        )
    );
    
if (currentHour >= 18 || currentHour < 6) {
    sunSecondary.innerHTML = `🌇 Sunset ${sunsetTime} <span id="sun-primary">🌅 Sunrise ${sunriseTime}</span> `;
}
else {
    sunSecondary.innerHTML = `🌅 Sunrise ${sunriseTime} <span id="sun-primary">🌇 Sunset ${sunsetTime}</span>`;
}

    tempP.innerHTML = `  ${weatherData.current.temperature_2m}°C`;
    rainP.innerHTML = ` ${weatherData.current.rain} mm/h`;
    humidity.innerHTML = `${weatherData.current.relative_humidity_2m}%`;
    windSpeed.innerHTML = `${weatherData.current.wind_speed_10m} km/h`;
    feelsLike.innerHTML = `Feels like ${weatherData.current.apparent_temperature}°C`;
    const timezone = weatherData.timezone;
    clearInterval(clockInterval);
    clockInterval = setInterval(() => { //ez itt callback!!!
        UpdateClock(timezone);
    }, 1000);
    //clearInterval(clockInterval);

   
    weatherText.innerHTML = getWeatherText(weatherData.current.weather_code);
    const weatherTheme = getWeatherTheme(weatherData.current.weather_code);

    background.style.transform = "scale(1.05)"; //nagyobbra meretezi a kepet, igy elmosodik
    background.style.filter = "blur(4px)"; //elmosodik a kep
    setTimeout(() => {
        background.style.backgroundImage = `url(${weatherTheme.background})`;
        background.style.transform = "scale(1)"; //visszaallitja a kep meretet
        background.style.filter = "blur(0px)"; //visszaallitja a kepet
    }, 300); //300ms mulva megvaltoztatja a kepet, igy atmegy a ket kep kozott, ha azonnal valtoztatna akkor nem lenne atmenet

    updateDayTime(weatherData.timezone);

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


    //background.style.backgroundImage = `url(${weatherTheme.background})`;
    weatherText.innerHTML = weatherTheme.text;
    weatherIcon.innerHTML = weatherTheme.icon;
    //console.log(weatherData.current);

    console.log(weatherData);
}

searchBTN.addEventListener("click", async () => {
    const cityData = await searchCity(searchedCity.value);

    // if (!cityData || cityData.results.length === 0) {
    //     alert("Nem található ilyen város");
    //     return;
    // }
    const result = cityData.results[0];
    cityName.innerHTML = result.name;
    
    loadWeather(result.latitude, result.longitude);
    savedCity(result.name);

});

//loadWeather(47.4979, 19.0402); //pesti koordok hog ne legyen ures a weboldal
//cityName.innerHTML = "Budapest";

async function startLoading() {    
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


//    const savedCity = getSavedCity();
// if (savedCity) {
//     const cityData = await searchCity(savedCity);
    
//     if (cityData&& cityData.results && cityData.results.length > 0) {
//         const result = cityData.results[0];

//         cityName.innerHTML = result.name;
//         loadWeather(result.latitude, result.longitude);
//     }    
// }
// else {
//     cityName.innerHTML = "Budapest";
//     loadWeather(47.4979, 19.0402);
// }};

startLoading();

navigator.geolocation.getCurrentPosition(async (position) => {
const locationName = await getLocationName(position.coords.latitude, position.coords.longitude);
cityName.innerHTML = locationName;
loadWeather(position.coords.latitude, position.coords.longitude);
    },
() => {
setTimeout(() => {startLoading();}, 
    2000);
},
    {timeout: 10000}
);
searchedCity.addEventListener("input", async () => {
    if (searchedCity.value === "") {
    searchResults.innerHTML = "";
    searchResults.style.display = "none";
    return;
}
    const cityData = await searchCity(searchedCity.value);
    searchResults.innerHTML = "";
    searchResults.style.display = "flex";
    
    cityData.results.forEach((city: any) => {
        const cityElement = document.createElement("div");
        cityElement.classList.add("search-result");
        cityElement.innerHTML = city.name;
        cityElement.addEventListener("click", () => {
            cityName.innerHTML = city.name;
            loadWeather(city.latitude, city.longitude);
            saveCity(city.name);
            
            searchResults.innerHTML = "";
            searchResults.style.display = "none";
        });
        searchResults.appendChild(cityElement);
    });
});

searchedCity.addEventListener("keydown",(event) => {
        if (event.key === "Enter") {
            searchBTN.click();
            searchResults.innerHTML = "";
            searchResults.style.display = "none";
        }

    }
);
const cycleicon = document.querySelector("#cycleicon") as HTMLDivElement;

cycleicon.animate(

    [

        {
            transform:
                "translateX(40px)",

            opacity: 0
        },

        {
            transform:
                "translateX(0)",

            opacity: 1
        }

    ],

    {
        duration: 500,
        easing: "ease"
    }
);
