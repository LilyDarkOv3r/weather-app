export { getWeatherTheme };
export { updateDayTime };

//background kep

const overlay = document.querySelector("#overlay") as HTMLDivElement;
const cycleIcon = document.querySelector("#cycleicon") as HTMLDivElement;

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
    if (hour >= 18 || hour < 6) {
       overlay.style.background ="rgba(2, 17, 65, 0.54)";
       document.body.classList.add("night-mode");
        cycleIcon.innerHTML = "🌙";
    }
   else {
        overlay.style.background =
            "rgba(71, 75, 22, 0.2)";
        document.body.classList.remove("night-mode");
        cycleIcon.innerHTML = "☀️";
    }
}