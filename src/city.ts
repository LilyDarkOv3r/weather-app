export { searchCity };
export { saveCity };
export { getSavedCity };

//keresés
async function searchCity(city: string) {
    const cityRequest = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}`);

        const cityData = await cityRequest.json();
        return cityData;
}

function saveCity(city:string) {
    localStorage.setItem("lastCity", city);
}

function getSavedCity() {
    return localStorage.getItem("lastCity");
}   