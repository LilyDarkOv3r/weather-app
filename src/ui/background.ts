export { backgroundSwitch };

//background kep

function backgroundSwitch(weatherCode: number, background: HTMLDivElement) {
 console.log(weatherCode);
   switch (true) {
    
    case weatherCode === 0:
        background.style.backgroundImage = "url('/images/sunny.avif')";
        console.log("Sunny");
        break;
    
    case weatherCode <= 48: 
        background.style.backgroundImage = "url('/images/drizzle.avif')";
        console.log("Partly cloudy");
        break;
    
    case weatherCode <= 57:
        background.style.backgroundImage = "url('/images/cloudy.avif')";
        console.log("Cloudy");
        break;
    
    case weatherCode <= 67:
        background.style.backgroundImage = "url('/images/rainy.avif')";
        console.log("Rainy");
        break;

    case weatherCode <= 77:
        background.style.backgroundImage = "url('/images/snowy.avif')";
        console.log("Snowy");
        break;

    default:
        background.style.backgroundImage = "url('/images/thunderstorm.avif')";
        console.log("Default");

 }   
}

