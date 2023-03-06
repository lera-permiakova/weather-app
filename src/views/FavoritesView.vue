<template>
  <div class="favorites-view">
    <router-link to="/" class="favorites-view-button-comeback">
      <icon-arrow/>
      Back
    </router-link>

    <h3 class="favorites-view-title">
      <img src="@/assets/icons/preloader.svg" alt="Title Preloader" class="title-preloader" v-if="sync">
      Selected cities
    </h3>

    <template v-if="favoriteCitiesWeather.length">
      <city-weather-info v-for="city in favoriteCitiesWeather"
                         :key="city.id"
                         :city="city"
                         :buttonStatus="false"
                         :hourly-forecast-time="city.hourlyForecastTime"
                         :hourly-forecast-temp="city.hourlyForecastTemp"
      />
    </template>
    <div v-else class="favorites-view-empty">
      Here is nothing yet. Add cities from the main page!
    </div>

  </div>
</template>

<script>
import CityWeatherInfo from "@/components/CityWeatherInfo";
import IconArrow from "@/icons/ArrowLeft";
import {mapActions, mapGetters, mapMutations} from "vuex";

export default {
  name: 'FavoritesView',
  components: {
    CityWeatherInfo,
    IconArrow
  },
  mounted() {
    if (localStorage.length > 0) {
      this.changeSyncStatus(true)
      Object.keys(localStorage).map(key => {
        this.getCurrentWeather({...JSON.parse(localStorage.getItem(key)), type: 'saved'})
      })
    }
  },
  computed: {
    ...mapGetters({
      citiesWeather: 'getCitiesSaved',
      sync: 'getSync'
    }),
    favoriteCitiesWeather() {
      return this.citiesWeather.filter(city => city.favorite === true)
    }
  },
  methods: {
    ...mapMutations({
      changeSyncStatus: 'changeSyncStatus'
    }),
    ...mapActions({
      getCurrentWeather: 'getCurrentWeather',
    }),
  }
}
</script>

<style scoped>
  .favorites-view-button-comeback {
    width: 88px;
    display: flex;
    align-items: center;
    cursor: pointer;
    font-size: 20px;
    font-weight: bold;
    color: #183651;
    text-decoration: none;
  }
  .icon-arrow-left {
    height: 16px;
    margin-right: 10px;
    margin-bottom: 9px;
    color: #183651;
  }
  .favorites-view-title {
    width: max-content;
    position: relative;
    margin: 0 auto 40px;
    font-size: 32px;
    text-align: center;
    color: #fff;
  }
  .title-preloader {
    position: absolute;
    top: 50%;
    left: -40px;
    transform: translateY(-50%);
  }
  .favorites-view-empty {
    padding: 16px;
    font-size: 18px;
    text-align: center;
  }
</style>

