const input = document.getElementsByClassName("city");

// OpenWeather Info

const apiKey = "ed9b976f8239422013ce555f2bc79a28";

let weather = {

  async fetchWeather(city) {
    //fetchWeather: function (city){
    const urlToFetch = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
   
    try {
      const response = await fetch(urlToFetch);
      if (response.ok) {
        const data = await response.json();
        return this.displayWeather(data);
      }
    } catch (error) {
      console.log(error);
    }
    
  },
  
  displayWeather: function (data) {
    const { name } = data;
    const { country } = data.sys
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    console.log(name, icon, description, temp, humidity, speed);
   
    document.querySelector(".city").innerText = "Weather in " + name +", " + country;
    document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temperature").innerText = temp + "°c";
    document.querySelector(".humidity").innerText = "Humidity: " + humidity;
    document.querySelector(".windSpeed").innerText = "WindSpeed: " + speed;

    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + name + "')";
  },
  search: function () {
    this.fetchWeather(document.querySelector(".weather-search").value);
  },

};


/////////////////////////////////EVENT LISTENER/////////////////////////////////
document.querySelector(".button-search").addEventListener("click", function () {
  weather.search();
});

document.querySelector(".weather-search").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

weather.fetchWeather("toronto");
