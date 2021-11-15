<template>
  <div class='container'>

    <div class='card'>
      <div class='input'>
        <input
          type='text'
          placeholder='Enter the city...'
          v-model='query'
          @keypress.enter='fetchWeather($event)'
        >
        <button @click='fetchWeather'>Search</button>
      </div>

      <div class='info' v-if='typeof weather.main != "undefined"'>
        <div class='logo'>
          <img :src='logo' alt=''>
          <p>{{ weather.weather[0].main }}</p>
        </div>
        <div class='info__content'>
          <div class='city'>
            {{ weather.name }}, {{ weather.sys.country }}
          </div>
          <div class='temp'>
            {{ weather.main.temp }}℃
          </div>
        </div>
        <div class='info__content'>
          <div class='info__content-item'>
            Wind speed: {{ weather.wind.speed }}
          </div>
          <div class='info__content-item'>
            Pressure: {{ weather.main.pressure }}
          </div>
        </div>
      </div>

      <div class='fav' v-if='typeof weather.main != "undefined"'>
        <button class='fav-btn' @click='addToFav'>Add city to favourites</button>
      </div>

    </div>

    <div class='favCities' v-if='favourites.length > 0'>
      <div class='fav-item' v-for='city in favourites' @click='fetchWeatherByCity(city)'>
        {{city}}
      </div>
    </div>


  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      api_key: 'ff7e0242676aeda88831243296d4cebe',
      base_url: 'https://api.openweathermap.org/data/2.5/weather',
      query: '',
      weather: {},
      logo: '',
      favourites: [],
    };
  },
  mounted() {
    this.fetchWeather()
  },
  methods: {
    fetchWeather() {
      axios.get(`${this.base_url}?q=${this.query ? this.query : 'london'}&appid=${this.api_key}&units=metric`)
        .then(res => {
          console.log(res.data);
          this.weather = res.data;
          this.logo = `http://openweathermap.org/img/wn/${res.data.weather[0].icon}.png`;
        });
    },
    fetchWeatherByCity(city) {
      this.query = city
      this.fetchWeather()
      this.query = ''
    },
    addToFav() {
      if (!this.favourites.includes((this.weather.name))) {
        this.favourites.push(this.weather.name)
      }
    },
  },
};
</script>

<style scoped>
p {
  margin: 0;
  padding: 0;
}

.container {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card {
  height: 500px;
  width: 300px;
  background: #888;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 20px;
}

.input {
  height: 40px;
  width: 100%;
  display: flex;
  margin-bottom: 40px;
}
.input button {
  border: none;
  padding: 0 10px;
  margin-left: -10px;
  background: #222222;
  color: #fff;
  cursor: pointer;
}

.fav {
  height: 10%;
}

.input input {
  width: 100%;
  padding: 10px 15px;
  border-radius: 10px;
  outline: none;
  border: none;
}

.info {
  text-align: center;
  font-weight: 500;
  height: 70%;
}

.city {
  font-size: 16px;
}

.temp {
  font-size: 24px;
  font-weight: 900;
}

.logo {
  margin-bottom: 40px;
  font-weight: 300;
}

.info__content {
  margin-bottom: 40px;
}

.info__content-item {
  font-weight: 300;
  margin-bottom: 5px;
}

.fav-btn {
  padding: 10px;
  background: #222;
  color: #fff;
  font-weight: 600;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  transition: background .2s ease;
}

.fav-btn:hover {
  background: #333;
}

.favCities {
  display: flex;
  flex-direction: column;
  margin-left: 15px;
}

.fav-item {
  cursor: pointer;
}

</style>
