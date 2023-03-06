<template>
  <div class="main-view">
    <h3 class="main-view-title">
      <img src="@/assets/icons/preloader.svg" alt="Title Preloader" class="title-preloader" v-if="sync">
      World weather
    </h3>

    <input-search :model="searchModel" @onClick="addNewCityWeather"/>
      <transition-group name="new-city">
        <city-weather-info v-for="city in citiesWeather"
                           :key="city.id"
                           button-status
                           :city="city"
        />
      </transition-group>
  </div>
</template>

<script>

import CityWeatherInfo from "@/components/CityWeatherInfo";
import InputSearch from '@/components/InputSearch.vue'
import {mapActions, mapGetters} from "vuex";

export default {
  name: 'HomeView',
  components: {
    InputSearch,
    CityWeatherInfo
  },
  data() {
    return {
      searchModel: '',
    }
  },
  computed: {
    ...mapGetters({
      citiesWeather: 'getCitiesAdded',
      sync: 'getSync'
    })
  },
  methods: {
    ...mapActions({
      getCurrentWeather: 'getCurrentWeather'
    }),
    addNewCityWeather(lat, lon) {
      this.getCurrentWeather({lat, lon})
    },
  }
}
</script>

<style scoped>
  .main-view {
    padding: 20px 0;
  }
  .main-view-title {
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
  .new-city-enter-from, .new-city-leave-to {
    opacity: 0;
    transform: translateY(-10px);
  }
  .new-city-enter-to, .new-city-leave-from {
     opacity: 1;
     transform: translateY(0);
  }
  .new-city-enter-active, .new-city-leave-active {
     transition: all .2s ease-in;
  }
</style>
