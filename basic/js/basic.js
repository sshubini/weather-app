import rainy from "./weather/rainy.js";
import sunny from "./weather/sunny.js";
import thunder from "./weather/thunder.js";
import dusty from "./weather/dusty.js";
import snowy from "./weather/snowy.js";
import cloudy from "./weather/cloudy.js";
import windy from "./weather/windy.js";
import Slider from "./slider.js";

const APIkey = 'd45d73bd9864b3ae2216f9a07f82a08d';

const info = document.querySelector('.info');
const cityName = info.querySelector('.city');
const tempTxt = info.querySelector('.temp');
const dayName = info.querySelector('.day');
let index;

// dom
const title = document.querySelector('.title');
const cont = document.querySelector('.canvas-box');





if('geolocation' in navigator) {
    /* 위치정보 사용 가능 */
    navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        getInfo(lat,lon)
    });
}else{
    getInfo(37, 127)
}

const getInfo = (lat,lon) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}`)
    .then(res=> res.json())
    .then(data=>{
        return {
            city: data.name,
            temp: Math.round(data.main.temp - 273.15),
            weather:data.weather[0].main,
        }
    }).then(info=>{
        setCity(info.city);
        setWeather(info.weather);
        setDate();
        setTemp(info.temp);
         Slider(title,cont,index)();
    })

}
let weekdays = ['Sun','Mon','Tue','Wed','Thur','Fri','Sat'];
const setCity = city => {
    cityName.textContent = city;
}
const setWeather = weatherInfo => {
    let weather;
    cont.innerHTML = '';
    switch(weatherInfo){
        case 'Clear' :
            index = 0;
            weather = sunny;
            break;
        case 'Clouds':
        case 'Mist':
        case 'Haze':
            index = 1;
            weather = cloudy;
            break;
        case 'Rain':
        case 'Drizzle':
            index = 2;
            weather = rainy;
            break;
        case 'Snow' :
            index = 3;
            weather = snowy;
            break;
        case 'Tornado' :
            index = 4;
            weather = windy;
            break;
        case 'Dust':
        case 'Ash':
            index = 5;
            weather = dusty;
            break;
        case 'Thunderstorm' :
            index = 6;
            weather = thunder;
            break;
    }
    new p5(weather,'container')
    cont.className=`cvs${index}`
}
const setDate = () => {
    const today = new Date();
    dayName.textContent = weekdays[today.getDay()]
}
const setTemp = temp => {
    tempTxt.textContent = temp;
}

