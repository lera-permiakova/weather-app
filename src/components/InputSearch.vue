<template>
  <div class="facade-input-search">
    <img src="@/assets/icons/preloader.svg" alt="Title Preloader" class="input-preloader" v-if="preloader">
    <div class="facade-input-search-main"
         tabindex="0">
      <input
          v-model.trim="baseModel"
          placeholder="Search city"
          type="text"
          @blur="handleCloseDropdown"/>
      <icon-search class="icon icon-search"/>
      <icon-close v-if="baseModel.length"
                  class="icon icon-close"
                  :class="{cleaningActive: baseModel.length}"
                  @click="clearInput"/>
    </div>
    <transition name="list">
      <div class="facade-input-search-country-plate" v-if="citiesMatched.length">
        <ul class="facade-input-search-country-plate-list">
          <li class="facade-input-search-country-list-plate-item"
              v-for="city in citiesMatched"
              :key="city.id"
              @click="handleChooseCityClick(city.lat, city.lng)">
            {{city.name}}, {{city.country}}
          </li>
        </ul>
      </div>
    </transition>
  </div>

</template>

<script>
import debounce from 'lodash/debounce'
import IconClose from '@/icons/Close'
import IconSearch from '@/icons/Search'
import {mapGetters} from "vuex";
const citiesAll = require('../../node_modules/cities.json/cities');


export default {
  name: 'InputSearch',
  components: { IconClose, IconSearch },
  props: {
    model: {
      type: String,
      required: true
    }
  },
  created () {
    this.modelDebounceFunction = debounce(() => this.applicableCopyOfEmit(), 200)
  },
  data () {
    return {
      baseModel: '',
      citiesMatched: [],
      preloader: false
    }
  },
  computed: {
    ...mapGetters({
      citiesWeather: 'getCitiesAdded',
    })
  },
  methods: {
    clearInput () {
      if (this.baseModel.length) {
        this.baseModel = ''
        this.citiesMatched = []
      }
    },
    applicableCopyOfEmit () {
      this.$emit('onSearch', this.baseModel)
      this.searchCities(this.baseModel)
    },
    searchCities(search) {
      if (search.length) {
        this.preloader = true
        this.citiesMatched = citiesAll.filter(city => city.name.toLowerCase().startsWith(search.toLowerCase()));
        this.preloader = false
      } else {
        this.citiesMatched = []
      }
    },
    handleChooseCityClick(lat, lon) {
      if (this.citiesWeather.length > 4) {
        return
      }
      this.$emit('onClick', lat, lon)
      this.handleCloseDropdown()
    },
    handleCloseDropdown() {
      this.baseModel = ''
      this.citiesMatched = []
    }
  },
  watch: {
    model (_model) {
      if (_model !== this.baseModel) this.baseModel = _model
    },
    baseModel () {
      this.modelDebounceFunction()
    }
  }
}
</script>

<style lang="css" scoped>
  .facade-input-search {
    position: relative;
    height: 48px;
    margin-bottom: 30px;
  }
  .input-preloader {
    position: absolute;
    left: -36px;
  }
  .facade-input-search-main {
    position: absolute;
    width: 100%;
    height: 44px;
    box-sizing: border-box;
    overflow: hidden;
    border-radius: 8px;
    background-color: #fff;
    transition: border .2s ease-out;
    border: 2px solid rgb(99,106,115);
    z-index: 7;
    box-shadow: rgba(35,55, 80, .2) 0 6px 12px;
  }
  input {
    width: 100%;
    height: 100%;
    padding: 10px 40px;
    border-radius: 8px;
    box-sizing: border-box;
    border: unset;
    background-color: #fff;
    font-size: 15px;
    line-height: 20px;
    outline: none;
  }
  .icon {
    position: absolute;
    color: grey;
  }
  .icon-search{
    top: 12px;
    left: 12px;
    height: 16px;
    color: rgb(99,106,115);
  }
  .icon-close {
    top: 7px;
    right: 9px;
    padding: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    border-radius: 50%;
    transition: .3s all ease-out;
    cursor: pointer;
  }
  .cleaningActive{
    color: #212A33;
  }
  .icon-close:hover{
    color: #0d3472;
    background-color: rgba(91,97,110, .4);
  }
  .icon-close:active{
    transform: scale(.9);
  }
  .facade-input-search-main:focus-within{
    border-color: #0d3472;
  }
  .facade-input-search-country-plate {
    position: absolute;
    width: 100%;
    height: 300px;
    z-index: 6;
    top: 52px;
    padding: 12px 40px;
    overflow: hidden;
    box-sizing: border-box;
    background-color: #fff;
    border: 2px solid rgba(13,52,114, .8);
    border-radius: 8px;
    box-shadow: rgba(35,55, 80, .3) 0 6px 12px;
  }
  .facade-input-search-country-plate-list {
    height: 100%;
    overflow-y: scroll;
    scroll-behavior: smooth;
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .facade-input-search-country-plate-list::-webkit-scrollbar {
    width: 0;
  }
  .facade-input-search-country-list-plate-item {
    padding: 4px 0;
    cursor: pointer;
    transition: background-color .3s;
  }
  .facade-input-search-country-list-plate-item:hover {
    background-color: lightsteelblue;
  }
  .list-enter-from, .list-leave-to {
    height: 0;
    overflow: hidden;
  }
  .list-enter-to, .list-leave-from {
    height: 300px;
    overflow: hidden;
  }
  .list-enter-active, .list-leave-active {
    transition: all .2s ease-in;
  }

</style>
