function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}


function displayTemperature(response){
    let city = document.querySelector(".city");
    let country = document.querySelector(".country");
    let day = document.querySelector(".current-date");
    let humidity = document.querySelector(".humidity");
    let wind = document.querySelector(".wind");
    let condition = document.querySelector(".condition");
    let temperature = document.querySelector(".temp-detail");
    let fahrenheit = document.querySelector(".fahrenheit");

    city.innerHTML = response.data.city;
    country.innerHTML = response.data.country;
    humidity.innerHTML = `${response.data.temperature.humidity}%`;
    wind.innerHTML =`${response.data.wind.speed}km/h`
    condition.innerHTML = response.data.condition.description;
    temperature.innerHTML = Math.round(response.data.temperature.current);
    temp = response.data.temperature.current;
    fahrenheit.innerHTML = (temp * 9/5 +32) + "  Fahrenheit";
    let currentDate = new Date();
    day.innerHTML = formatDate(currentDate);
    
}


function searchCity(new_city){
  let city = new_city;
  let apiKey = "b2a5adcct04b33178913oc335f405433";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
   
  axios.get(apiUrl).then(displayTemperature);

}


function search(event){
    event.preventDefault();
    let city = document.querySelector(".city");
    let searchElement = document.querySelector(".search-input");
    city.innerHTML = searchElement.value;
    new_city = searchElement.value;
    searchCity(new_city);
}

let form = document.querySelector(".search-form");
form.addEventListener("submit",search)