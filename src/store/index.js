import { createStore } from 'vuex'

export default createStore({
  state: {
    citiesAdded: [],
    citiesSaved: [],
    Sync: false
  },
  getters: {
    getCitiesAdded: (state) => state.citiesAdded,
    getCitiesSaved: (state) => state.citiesSaved,
    getSync: (state) => state.Sync
  },
  mutations: {
    setNewCityInfo: (state, {cityInfo, type}) => {
      console.log(cityInfo, 99999, type)
      const cities = type === 'new' ? state.citiesAdded : state.citiesSaved
      const index = cities.findIndex(city => city.id === cityInfo.id)
      if (index >= 0) {
        cities[index] = cityInfo
      } else {
        cities.push(cityInfo)
      }
    },
    deleteWeatherCard: (state, id) => state.citiesAdded.splice(state.citiesAdded.findIndex(city => city.id === id), 1),
    changeFavoriteStatus: (state, id) => {
      const chosenCityAdded = state.citiesAdded.find(city => city.id === id)
      const chosenCitySaved = state.citiesSaved.find(city => city.id === id)
      if (chosenCityAdded !== undefined) {
        chosenCityAdded.favorite = !chosenCityAdded.favorite
      }
      if (chosenCitySaved !== undefined) {
        chosenCitySaved.favorite = !chosenCitySaved.favorite
      }
    },
    changeSyncStatus: (state, status) => state.Sync = status
  },
  actions: {
    async getIP({ dispatch }) {
      try {
        const res = await fetch('https://api.ipify.org?format=json')
        const data = await res.json()
        dispatch("getCity", data)
      } catch(e) {
        console.log(e)
      }
    },
    async getCity({ dispatch }, { ip }) {
      console.log(ip)
      try {
        const res = await fetch(`http://api.sypexgeo.net/json/${ip}`)
        const data = await res.json()
        dispatch('getCurrentWeather', {lat : data.region.lat, lon: data.region.lon})
      } catch(e) {
        console.error(e)
      }
    },
    async getCurrentWeather({ dispatch }, {lat, lon, type = 'new'}) {
      try {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=25afb82ea05f9bd1034e28e041035526`)
        const data = await res.json()
        const id = `${lat}${lon}`
        const favorite = Object.keys(localStorage).includes(id)
        const chosenCityWeather = {
          id,
          favorite,
          lat,
          lon,
          name: data.name,
          country: data.sys.country,
          main: {
            ...data.main,
            description: data.weather[0].description,
            icon: data.weather[0].icon,
            wind: data.wind.speed,
            visibility: data.visibility
          }}
        dispatch('get5DaysForecast', {lat, lon, chosenCityWeather, type})
        // console.log('getCurrentWeather', data)
      } catch(e) {
        console.log(e)
      }
    },
    async get5DaysForecast({ commit }, {lat, lon, chosenCityWeather, type}) {
      try {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=25afb82ea05f9bd1034e28e041035526&units=metric`)
        const data = await res.json()
        // console.log(1111, data)
        const hourlyForecastTemp = data.list.slice(0, 9).reduce((acc, el) => [...acc, el.main.temp],[])
        const hourlyForecastTime = data.list.slice(0, 9).reduce((acc, el) => [...acc, el['dt_txt'].substr(11, 5)],[])
        // console.log('hourlyForecastTemp:', hourlyForecastTemp, 'hourlyForecastTime:', hourlyForecastTime)
        const forecast = data.list.reduce((acc, el)=> {
          const key = el['dt_txt'].slice(0, 10)
          const average3HoursAmount = (el.main['temp_min'] + el.main['temp_max']) / 2
          if (acc[key] === undefined) {
            return {
              ...acc,
              [key]: {
                dayAmount: average3HoursAmount,
                count: 1
              }
            }
          } else {
             acc[key].dayAmount += average3HoursAmount
             acc[key].count ++
            return acc
          }
        }, {})
        console.log(forecast, 'forecast')
        commit('setNewCityInfo', {
        cityInfo: {...chosenCityWeather, forecast, hourlyForecastTemp, hourlyForecastTime},
          type,
      })
        commit('changeSyncStatus', false)
      } catch(e) {
        console.log(e)
      }
    },
  },
  modules: {
  }
})
