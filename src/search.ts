import { saveCity as savedCity, searchCity, saveCity } from "./city";
import { loadWeather } from "./weatherLoader";

const searchedCity = document.querySelector("#citysearch") as HTMLInputElement;
const searchBTN = document.querySelector("#searchBTN") as HTMLButtonElement;
const cityName = document.querySelector("#city-name") as HTMLHeadingElement;

async function handleSearch(searchedCityInput: string) {
    const cityData = await searchCity(searchedCityInput);
    const result = cityData.results[0];
    cityName.innerHTML = result.name;
    
    loadWeather(result.latitude, result.longitude);
    savedCity(result.name);

    searchedCity.value = "";
}

//══════════════════════════════════════════════════════════════════════════════════════════════════════
//✦ . 　⁺ 　 . ✦ . 　⁺ 　 . ✦ . 　⁺ 　 . ✦ . 　⁺ 　 . ✦ . 　⁺ 　 . ✦ .✦ . 　⁺ 　 . ✦ . 　⁺ 　 . ✦ . 　⁺ 　
//︶⊹︶︶୨୧︶︶⊹︶︶⊹︶︶୨୧︶︶⊹︶︶⊹︶︶୨୧︶︶⊹︶︶⊹︶⊹︶︶୨୧︶︶⊹︶︶⊹︶︶୨୧︶︶⊹︶︶⊹︶︶୨୧︶︶⊹︶︶⊹

const searchResults = document.querySelector("#search-results") as HTMLDivElement;

function handleCitySelection(city: any) {
    cityName.innerHTML = city.name;
    loadWeather(city.latitude, city.longitude);
    saveCity(city.name);
            
    searchResults.innerHTML = "";
    searchResults.style.display = "none";
}

//══════════════════════════════════════════════════════════════════════════════════════════════════════
//✦ . 　⁺ 　 . ✦ . 　⁺ 　 . ✦ . 　⁺ 　 . ✦ . 　⁺ 　 . ✦ . 　⁺ 　 . ✦ .✦ . 　⁺ 　 . ✦ . 　⁺ 　 . ✦ . 　⁺ 　
//︶⊹︶︶୨୧︶︶⊹︶︶⊹︶︶୨୧︶︶⊹︶︶⊹︶︶୨୧︶︶⊹︶︶⊹︶⊹︶︶୨୧︶︶⊹︶︶⊹︶︶୨୧︶︶⊹︶︶⊹︶︶୨୧︶︶⊹︶︶⊹

async function handleSearchList(){
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
            handleCitySelection(city);
        });
        searchResults.appendChild(cityElement);
    });
}

//══════════════════════════════════════════════════════════════════════════════════════════════════════
//✦ . 　⁺ 　 . ✦ . 　⁺ 　 . ✦ . 　⁺ 　 . ✦ . 　⁺ 　 . ✦ . 　⁺ 　 . ✦ .✦ . 　⁺ 　 . ✦ . 　⁺ 　 . ✦ . 　⁺ 　
//︶⊹︶︶୨୧︶︶⊹︶︶⊹︶︶୨୧︶︶⊹︶︶⊹︶︶୨୧︶︶⊹︶︶⊹︶⊹︶︶୨୧︶︶⊹︶︶⊹︶︶୨୧︶︶⊹︶︶⊹︶︶୨୧︶︶⊹︶︶⊹

function handleEnterPress(event: KeyboardEvent) {
  if (event.key === "Enter") {
            searchBTN.click();
            searchResults.innerHTML = "";
            searchResults.style.display = "none";
            searchedCity.value = "";
        }
}

//══════════════════════════════════════════════════════════════════════════════════════════════════════
//✦ . 　⁺ 　 . ✦ . 　⁺ 　 . ✦ . 　⁺ 　 . ✦ . 　⁺ 　 . ✦ . 　⁺ 　 . ✦ .✦ . 　⁺ 　 . ✦ . 　⁺ 　 . ✦ . 　⁺ 　
//︶⊹︶︶୨୧︶︶⊹︶︶⊹︶︶୨୧︶︶⊹︶︶⊹︶︶୨୧︶︶⊹︶︶⊹︶⊹︶︶୨୧︶︶⊹︶︶⊹︶︶୨୧︶︶⊹︶︶⊹︶︶୨୧︶︶⊹︶︶⊹


export function doSearch() {
    searchedCity.addEventListener("keydown",(event) => {      
    handleEnterPress(event);
    });

    searchBTN.addEventListener("click",  () => {
    handleSearch(searchedCity.value);
    });

    searchedCity.addEventListener("input",  () => {
    handleSearchList();
    });
}
