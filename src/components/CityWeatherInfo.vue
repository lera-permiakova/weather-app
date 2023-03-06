<template>
  <div class="city-weather-info-plate" v-if="!toggleStatus">
    <weather-card :name="city.name"
                        :country="city.country"
                        :favorite="city.favorite"
                        :tabs="tabs"
                        :current-tab="currentTab"
                        :button-close="buttonStatus"
                        @onTab="currentTab = $event"
                        @onChoose="handleAddToFavorites"
                        @onDelete="deleteWeatherCard(this.city.id)">

      <template #tab-content-0>
        <div class="city-weather-card-temp">
          <h3 class="city-weather-card-temp-subtitle">{{temperature.main}}°C</h3>
          <img alt="weather" :src="`http://openweathermap.org/img/wn/${city.main.icon}@2x.png`">
        </div>

        <h4 class="city-weather-card-feels-like">
          Feels like {{temperature.fellsLike}}°C, {{city.main.description}}
        </h4>

        <div class="city-weather-card-body">
          <div class="city-weather-card-body-left">
            <div class="city-weather-card-body-main-item">
              <span class="value-definition">Humidity: </span>{{city.main.humidity}}%
            </div>
            <div class="city-weather-card-body-main-item">
              <span class="value-definition">Wind: </span> {{wind}}m/s
            </div>
            <div class="city-weather-card-body-main-item">
              <span class="value-definition">Pressure: </span> {{city.main.pressure}}hPa
            </div>
          </div>

          <div class="city-weather-card-body-right">
            <div class="city-weather-card-body-main-item">
              <span class="value-definition">Visibility: </span>{{visibility}}km
            </div>
            <div class="city-weather-card-body-main-item">
              <span class="value-definition">Dew point: </span> {{temperature.dewPoint}}°C
            </div>
          </div>
        </div>
      </template>

      <template #tab-content-1>
        <div class="forecast-weather-card-body">
          <div class="forecast-weather-card-body-day" v-for="date in forecastPrepared" :key="date">
            <span class="forecast-weather-card-body-day-data">{{date[0]}}</span>
            <span class="forecast-weather-card-body-day-temp">{{date[1]}}°C</span>
          </div>
        </div>
      </template>
    </weather-card>

    <chart-component v-if="currentTab === 0"
                     class="chart-plate"
                     :chart-id="`${city.id}-0`"
                     :measurements="city.hourlyForecastTemp"
                     :labels="city.hourlyForecastTime"
                     name="Hourly forecast"/>

    <chart-component v-if="currentTab === 1"
                     class="chart-plate"
                     :chart-id="`${city.id}-1`"
                     :measurements="forecastMeasurements"
                     :labels="forecastLabels"
                     name="5-day forecast"/>

    <modal-base :status="modalStatus" block @onOk="modalStatus = false">
      <template #title>The maximum number of cities allowed is 5.</template>
      <template #description>To add a new city, please remove another city from your favorites.</template>
      <template #button-accept>Got it!</template>
    </modal-base>
  </div>
</template>

<script>
import WeatherCard from '@/components/WeatherCard.vue'
import ChartComponent from "@/components/ChartComponent";
import ModalBase from "@/modals/Base.vue"
import {mapMutations} from "vuex";

export default {
  name: 'CityWeatherInfo',
  components: {
    WeatherCard,
    ChartComponent,
    ModalBase
  },
  props: {
    city: {
      type: Object,
      required: true
    },
    buttonStatus: Boolean
  },
  data() {
    return {
      toggleStatus: false,
      tabs: ['Current', '5 days'],
      currentTab: 0,
      modalStatus: false
    }
  },
  computed: {
    forecastLabels() {
      return Object.keys(this.city.forecast).map(key => {
        const month = parseInt(key.substr(-5, 2))
        const day = parseInt(key.slice(-2))
        switch (month) {
          case 1:
            return 'Jan, ' + day
          case 2:
            return 'Feb, ' + day
          case 3:
            return 'Mar, ' + day
          case 4:
            return 'Apr, ' + day
          case 5:
            return 'May, ' + day
          case 6:
            return 'June, ' + day
          case 7:
            return 'July, ' + day
          case 8:
            return 'Aug, ' + day
          case 9:
            return 'Sep, ' + day
          case 10:
            return 'Oct, ' + day
          case 11:
            return 'Nov, ' + day
          case 12:
            return 'Dec, ' + day

        }
      })
    },
    forecastMeasurements() {
      return Object.values(this.city.forecast).map(value => Math.round(value.dayAmount / value.count))
    },
    temperature() {
      return {
        main: Math.round(this.city.main.temp),
        fellsLike: Math.round(this.city.main['feels_like']),
        dewPoint : Math.round(this.city.main['temp_min'])
      }
    },
    visibility() {
      return (this.city.main.visibility / 1000).toFixed(1)
    },
    wind() {
      return (this.city.main.wind / 1000).toFixed(1)
    },
    forecastPrepared() {
      return this.forecastLabels.reduce((acc, item, i) => [...acc, [item, this.forecastMeasurements[i]]] , []).slice(0, 5)
    },
  },
  methods: {
    ...mapMutations({
      deleteWeatherCard: 'deleteWeatherCard',
      changeFavoriteStatus: 'changeFavoriteStatus'
    }),
    handleAddToFavorites() {
      if (this.city.favorite) {
        localStorage.removeItem(this.city.id)
      } else if (localStorage.length === 5) {
        this.modalStatus = true
        return
      } else {
        localStorage.setItem(this.city.id, JSON.stringify({lat: this.city.lat, lon: this.city.lon}))
      }
      this.changeFavoriteStatus(this.city.id)
    }
  },
}
</script>

<style scoped>
  .city-weather-info-plate {
    margin-bottom: 40px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }
  .city-weather-card-temp {
    padding-right: 38px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 28px;
  }
  .city-weather-card-temp-subtitle {
    font-size: 20px;
    color: #2566b1;
  }
  img {
    height: 40px;
    width: 40px;
    margin: 0 0 4px 4px;
  }
  .city-weather-card-feels-like {
    padding-left: 44px;
    font-size: 17px;
    font-weight: 600;
    margin-bottom: 26px;
    color: #183651;
  }
  .city-weather-card-body {
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-content: space-between;
    padding-left: 44px;
  }
  .city-weather-card-body-main-item {
    margin-bottom: 12px;
  }
  .value-definition{
    font-weight: 600;
  }
  .forecast-weather-card-body-day {
    padding: 6px 0;
    display: grid;
    justify-content: center;
    grid-template-columns: 100px 100px;
  }

  .forecast-weather-card-body-day-data{
    font-weight: 600;
    font-size: 17px;
    color: rgb(37,102,177);
  }
  .forecast-weather-card-body-day-temp{
    font-weight: 600;
    justify-self: flex-end;
  }
  @media (min-width: 768px) {
    .city-weather-info-plate {
      flex-direction: row;
    }
    .facade-navigation-tabs {
      margin-right: 16px;
    }
  }

</style>
