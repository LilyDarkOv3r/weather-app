export { getWeatherText };

function getWeatherText(weatherCode: number){

    switch (true) {

        case weatherCode === 0:
            return "Tiszta ég";

        case weatherCode <= 48:
            return "Felhős";

        case weatherCode <= 67:
            return "Esős";

        case weatherCode <= 77:
            return "Havas";

        default:
            return "Viharos";
    }

}
