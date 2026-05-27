import { loadWeather, startLoading } from "../weatherLoader";
import { getLocationName } from "../api/weather";
const cityName = document.querySelector("#city-name") as HTMLHeadingElement;


async function handleGeolocationSuccess(position: GeolocationPosition) {
    const locationName = await getLocationName(position.coords.latitude, position.coords.longitude);
    cityName.innerHTML = locationName;
    loadWeather(position.coords.latitude, position.coords.longitude);
}

function handleGeolocationError() {
    setTimeout(() => {startLoading();}, 
    2000)};

export function doGeolocation() {
    navigator.geolocation.getCurrentPosition(handleGeolocationSuccess, handleGeolocationError, {timeout: 10000});
}
