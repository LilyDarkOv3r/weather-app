export { getWeather };



//api teszt

async function getWeather(lat: number, lon: number) { // async a varakozos fuggveny miatt
    const weatherRequest = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code,rain,relative_humidity_2m,wind_speed_10m,apparent_temperature`);
    
    if (!weatherRequest.ok) { // ha nem valaszol az api
    alert("Hiba történt");
    return; //kilep az egesz fuggvenybol, kesobb johet ide egy trycatch hogy ujraprobalja ha marad idom (nem lesz ra lol), mert igy nem fogja megprobalni ujra
}
    const weatherData = await weatherRequest.json();
    //console.log(weatherData);
   
    // tempP.innerHTML = `Hőmérséklet: ${weatherData.current.temperature_2m}°C`; //kulon fuggvenybe kellene majd rakni a requestbol
    // rainP.innerHTML = `Csapadékmennyiség: ${weatherData.current.rain} mm/h`;

    return weatherData; //hogy a backgroundswitchnek meglegyen
}
getWeather(47.68, 17.63);