export { getWeather };
export { getLocationName };


//api teszt

async function getWeather(lat: number, lon: number) { // async a varakozos fuggveny miatt
    const weatherRequest = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code,rain,relative_humidity_2m,wind_speed_10m,apparent_temperature&current=is_day&timezone=auto&daily=sunrise,sunset,temperature_2m_max,temperature_2m_min,weather_code`);
    
    if (!weatherRequest.ok) { // ha nem valaszol az api
    alert("Hiba történt");
    return;
}
    const weatherData = await weatherRequest.json();
    return weatherData;
}
getWeather(47.68, 17.63);

async function getLocationName(lat:number, lon:number) {
    const locationRequest = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`);
    const locationData = await locationRequest.json();
     return (locationData.address.city || locationData.address.town || locationData.address.village);
}