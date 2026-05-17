export { getWeatherTheme };

//background kep

function getWeatherTheme(weatherCode: number) {
    switch (true) {

        case weatherCode === 0:
            return {
                background:
                    "/images/sunny.avif",
                icon: "☀️",
                text: "Tiszta ég"
            };

        case weatherCode <= 48:
            return {
                background:
                    "/images/cloudy.avif",
                icon: "☁️",
                text: "Felhős"
            };

        case weatherCode <= 57:
            return {
                background:
                    "/images/drizzle.avif",
                icon: "🌫️",
                text: "Borult"
            };

        case weatherCode <= 67:
            return {
                background:
                    "/images/drizzle.avif",
                icon: "🌧️",
                text: "Esős"
            };

        case weatherCode <= 77:
            return {
                background:
                    "/images/snowy.avif",
                icon: "❄️",
                text: "Havas"
            };

        default:
            return {
                background:
                    "/images/default.avif",
                icon: "⛈️",
                text: "Viharos"
            };

    }

}

