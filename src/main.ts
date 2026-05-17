// const tempP = document.querySelector("#temp") as HTMLParagraphElement; 
// const rainP = document.querySelector("#esomenny") as HTMLParagraphElement;
const searchedCity = document.querySelector("#citysearch") as HTMLInputElement;
const searchBTN = document.querySelector("#searchBTN") as HTMLButtonElement;
const background = document.querySelector("#background") as HTMLDivElement;

//api teszt

async function getWeather(lat: number, lon: number) { // async a varakozos fuggveny miatt
    const weatherRequest = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code,rain`);
    
    if (!weatherRequest.ok) { // ha nem valaszol az api
    alert("Hiba történt");
    return; //kilep az egesz fuggvenybol, kesobb johet ide egy trycatch hogy ujraprobalja ha marad idom (nem lesz ra lol), mert igy nem fogja megprobalni ujra
}
    const weatherData = await weatherRequest.json();
    console.log(weatherData);
   
    // tempP.innerHTML = `Hőmérséklet: ${weatherData.current.temperature_2m}°C`; //kulon fuggvenybe kellene majd rakni a requestbol
    // rainP.innerHTML = `Csapadékmennyiség: ${weatherData.current.rain} mm/h`;

    return weatherData; //hogy a backgroundswitchnek meglegyen
}
getWeather(47.68, 17.63);

async function loadWeather(lat:number, lon:number) {
    const weatherData = await getWeather(lat, lon);
    backgroundSwitch(
        weatherData.current.weather_code
    );
}

//keresés
async function searchCity(city: string) {
    const cityRequest = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}`);

        const cityData = await cityRequest.json();
        return cityData;
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




//background kep

function backgroundSwitch(weatherCode: number) {
 console.log(weatherCode);
   switch (true) {
    
    case weatherCode === 0:
        background.style.backgroundImage = "url('/images/sunny.avif')";
        console.log("Sunny");
        break;
    
    case weatherCode <= 48: 
        background.style.backgroundImage = "url('/images/drizzle.avif')";
        console.log("Partly cloudy");
        break;
    
    case weatherCode <= 57:
        background.style.backgroundImage = "url('/images/cloudy.avif')";
        console.log("Cloudy");
        break;
    
    case weatherCode <= 67:
        background.style.backgroundImage = "url('/images/rainy.avif')";
        console.log("Rainy");
        break;

    case weatherCode <= 77:
        background.style.backgroundImage = "url('/images/snowy.avif')";
        console.log("Snowy");
        break;

    default:
        background.style.backgroundImage = "url('/images/thunderstorm.avif')";
        console.log("Default");

 }   
}

