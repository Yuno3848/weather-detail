document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.querySelector("#city-input");
  const weatherBtn = document.querySelector("#get-weather-btn");
  const weatherInfo = document.querySelector("#weather-info");
  const cityDisplay = document.querySelector("#city-name");
  const tempDisplay = document.querySelector("#temperature");
  const description = document.querySelector("#description");
  const error = document.querySelector("#error-message");

  const API_KEY = "77115815bef954ef3af33322aa5cd068";

  weatherBtn.addEventListener("click", async () => {
    const city = cityInput.value.trim();
    if (!city) return;

    try {
      const weatherData = await fetchWeatherData(city);
      displayWeather(weatherData);
    } catch (error) {
      showError();
    }
  });

  async function fetchWeatherData(city) {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

    const fetchUrl = await fetch(url);
    console.log(fetchUrl);
    console.log(typeof fetchUrl);
    if (!fetchUrl.ok) {
      throw new Error("City not found");
    }
    const data = await fetchUrl.json();
    return data;
  }
  function displayWeather(data) {
    console.log(data);
    const { name, main, weather } = data;
    cityDisplay.textContent = name;
    tempDisplay.textContent = `Temperature : ${main.temp}`;
    description.textContent = `Weather : ${weather[0].main}`;
    weatherInfo.classList.remove("hidden");
    error.classList.add("hidden");
  }
  function showError() {
    weatherInfo.classList.add("hidden");
    error.classList.remove("hidden");
  }
});
