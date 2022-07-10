const submitBtn = document.querySelector('.submit');
const userInput = document.querySelector('#weatherData');
const locationName = document.querySelector('.locationName');
const currentTemp = document.querySelector('.temperature');
const day = document.querySelector('.day');
const time = document.querySelector('.time');

locationName.innerHTML = `Enter City Name to get current weather updates`;
currentTemp.innerHTML = `0&deg;C`;

const getCityName = async (e)=>{
    e.preventDefault();
    
    if(userInput.value == ''){
        // alert('Enter something to search');
        locationName.innerHTML = `Enter Something to get info`;
        currentTemp.innerHTML = '';
        return;
    }

    if(userInput.value != null){
        try {
            let cityName = userInput.value;
            let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=f3f47c2c700876f9c8b6838e2587db14`;
            const response = await fetch(apiUrl);
            const realtimeWeatherData = await response.json();
            console.log(realtimeWeatherData);
            let tempMood = realtimeWeatherData.weather[0].main;
            let city = realtimeWeatherData.name;
            let countryName = realtimeWeatherData.sys.country;
            let temp = realtimeWeatherData.main.temp;
            locationName.innerHTML = `${city}, ${countryName}`;
            let clear = `<i class="fas fa-sun" style='color: #eccc68;'></i>`;
            let cloud = `<i class="fas fa-cloud" style='color: #f1f2f6;'></i>`;
            let rain = `<i class="fas fa-cloud-rain" style='color: #a4b0be;'></i>`;
            if(tempMood == 'Clear'){
                currentTemp.innerHTML = `${temp}&deg;C ${clear}`;
            }else if(tempMood == 'Clouds'){
                currentTemp.innerHTML = `${temp}&deg;C ${cloud}`;
            }else if(tempMood == 'Rain'){
                currentTemp.innerHTML = `${temp}&deg;C ${rain}`;
            }else {
                currentTemp.innerHTML = `${temp}&deg;C ${cloud}`;
            }
        } catch {
            locationName.innerHTML = `Please Enter the city name properly`;
            currentTemp.innerHTML = `0&deg;C`;
        }
    }

}

// Adding current day and time

let currentTime, currentDay;
const getCurrentDay = ()=>{
    currentTime = new Date();
    currentDay = currentTime.getDay();
    switch (currentDay) {
        case 1:
            currentDay = 'Monday'
            break;
        case 2:
            currentDay = 'Tuesday'
            break;
        case 3:
            currentDay = 'Wednesday'
            break;
        case 4:
            currentDay = 'Thursday'
            break;
        case 5:
            currentDay = 'Friday'
            break;
        case 6:
            currentDay = 'Saturday'
            break;
        default:
            currentDay = 'Sunday'
            break;
    }
}
const getCurrentTime = ()=>{
    let now = new Date();
    let dateNow = now.getDate();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let period = 'AM';

    if(hours > 11){
        period = 'PM';
        if(hours > 12){
            hours = hours-12;
        }
    }

    if(minutes < 10){
        minutes = '0' + minutes;
    }else if(hours < 10){
        hours = '0' + hours;
    }
    // console.log(currentDay, dateNow, hours, minutes, period);
    day.innerHTML = `${currentDay}, ${dateNow}th`;
    time.innerHTML = `${hours}:${minutes} ${period}`;
    // const nightMode = ()=>{
        //     if(hours == 11){
            //         console.log('hello');
            //     }
            // }
        }        
        
        // nightMode();

getCurrentDay();
getCurrentTime();
setInterval(getCurrentTime, 2000);



submitBtn.addEventListener('click',getCityName);