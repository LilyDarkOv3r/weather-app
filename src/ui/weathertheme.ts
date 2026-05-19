export { getWeatherTheme };
export { updateDayTime };

//background kep

const overlay = document.querySelector("#overlay") as HTMLDivElement;


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
                    "/images/thunderstorm.avif",
                icon: "⛈️",
                text: "Viharos"
            };

    }

}

function updateDayTime(timezone: string) {
    const hour = Number(new Date().toLocaleTimeString(
                "hu-HU",
                {
                    hour: "numeric",
                    hour12: false,
                    timeZone:
                        timezone
                }
            )
        );
    if (hour >= 18 || hour <= 6) {
       overlay.style.background ="rgba(0,0,0,0.5)";
    }
   else {
        overlay.style.background =
            "rgba(0,0,0,0.2)";
    }
}