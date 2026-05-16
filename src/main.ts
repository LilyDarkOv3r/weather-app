//api teszt

async function getWeather(lat: number, lon: number) { // async a varakozos fuggveny miatt
    const valasz = await fetch( //internetes keres
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code,rain`
    );
    const adat = await valasz.json();
    console.log(adat);
}

getWeather(47.68, 17.63); 