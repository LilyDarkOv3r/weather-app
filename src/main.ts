const tempP = document.querySelector("#temp") as HTMLParagraphElement; 
const rainP = document.querySelector("#esomenny") as HTMLParagraphElement;
const searchedCity = document.querySelector("#citysearch") as HTMLInputElement;
const searchBTN = document.querySelector("#searchBTN") as HTMLButtonElement;

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
   
    tempP.innerHTML = `Hőmérséklet: ${weatherData.current.temperature_2m}°C`; //kulon fuggvenybe kellene majd rakni a requestbol
    rainP.innerHTML = `Csapadékmennyiség: ${weatherData.current.rain} mm/h`;
}
getWeather(47.68, 17.63);

async function searchCity(city: string) {
    const cityRequest = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}`);

        const cityData = await cityRequest.json();
        return cityData.results;
}

searchBTN!.addEventListener("click", async () => {
    const cityData = await searchCity(searchedCity.value);
    if (!cityData.results) { //csak mert hisztizik a konzol

    alert("Nem található ilyen város");

    return;
    }
    const result = cityData.results[0]; //nulladik elem a legjobb talalat, de akar folyamatosan frissites lehetne a talalatokbol egy listaval ala

    getWeather(result.latitude, result.longitude);
});
