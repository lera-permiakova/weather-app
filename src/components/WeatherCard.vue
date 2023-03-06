<template>
  <div class="facade-navigation-tabs">
    <icon-close @click="modalStatus = true" v-if="buttonClose"/>
    <div class="navigation-tabs-plate">
      <div class="navigation-tabs-plate-header">
        <button v-for="(tab, tabIndex) in tabs"
                :key="tabIndex"
                class="daily-weather-card-tabs-button"
                :class="{'tab-active': currentTab === tabIndex}"
                @click="$emit('onTab', tabIndex)">
          {{tab}}
        </button>
      </div>
      <div class="navigation-tabs-plate-title">
        <icon-star :class="{'icon-favorite-active': favorite}" @click="$emit('onChoose')"/>
        <h2 class="daily-weather-card-header-text">{{name}}, {{country}}</h2>
      </div>

      <transition-group :name="tabTransitionName">
        <template v-for="(tab, tabIndex) in tabs">
          <div class="navigation-tabs-content" :key="tabIndex" v-if="tabIndex === currentTab">
            <slot :name="`tab-content-${tabIndex}`"/>
          </div>
        </template>
      </transition-group>

      <modal-base :status="modalStatus" @onClose="modalStatus = false" @onOk="$emit('onDelete')">
        <template #title>Delete weather block?</template>
        <template #button-accept>Delete</template>
      </modal-base>
    </div>
  </div>
</template>

<script>
import IconStar from '@/icons/Star.vue'
import IconClose from "@/icons/Close";
import ModalBase from '@/modals/Base.vue'

export default {
  name: 'WeatherCard',
  components: { IconStar, IconClose, ModalBase},
  props: {
    tabs: {
      type: Array,
      required: true,
      validator: (tabs => tabs.length > 1)
    },
    currentTab: Number,
    name: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    },
    favorite: {
      type: Boolean,
      required: true
    },
    buttonClose: {
      type: Boolean,
      default: () => true
    }
  },
  data() {
    return {
      modalStatus: false,
      tabTransitionName: 'tab-slot-left',
    }
  },
  watch: {
    currentTab(to, from) {
      this.tabTransitionName = to < from ? 'tab-slot-right' : 'tab-slot-left'
    }
  }
}
</script>

<style lang="css" scoped>
  .facade-navigation-tabs{
    width: 100%;
    position: relative;
    max-width: 460px;
    margin-bottom: 10px;
  }
  .navigation-tabs-plate {
    height: 340px;
    background-color: #c7d5e7;
    border-radius: 8px;
    box-sizing: border-box;
    overflow: hidden;
    box-shadow: rgba(35,55, 80, .3) 0 6px 12px;
  }
  .icon-close {
    position: absolute;
    top: -8px;
    right: -8px;
    height: 16px;
    padding: 6px;
    text-align: center;
    border-radius: 50%;
    color: #010203;
    cursor: pointer;
    background-color: #B03C05;
    transition: background-color .3s, transform .3s;
  }
  .icon-close:hover {
    background-color: #b74f1d;
  }
  .icon-close:active {
    transform: scale(.9);
  }
  .navigation-tabs-plate-header {
    background-color: #4A5A6A;
    margin-bottom: 12px;
    border-radius: 8px 8px 0 0;
  }
  .daily-weather-card-tabs-button {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    font-weight: 600;
    font-size: 22px;
    padding: 16px 0;
    width: 50%;
    border: none;
    background-color: #4A5A6A;
    color: #c7d5e7;
    cursor: pointer;
    box-sizing: border-box;
    border-radius: 8px 8px 0 0;
    transition: all .3s;
  }
  .daily-weather-card-tabs-button.tab-active:first-child{
    border-radius: 8px 12px 0 0;
  }
  .daily-weather-card-tabs-button.tab-active:last-child{
    border-radius: 12px 8px 0 0;
  }
  .tab-active {
    background-color: #c7d5e7;
    box-shadow: none;
    color: #183651;
    cursor: default;
  }
  .navigation-tabs-plate-title {
    padding: 0 10px;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    overflow: hidden;
  }
  .daily-weather-card-header-text{
    overflow-x: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #010203;
  }
  .icon-star {
    color: grey;
    height: 32px;
    margin-right: 8px;
    cursor: pointer;
    transition: transform .3s;
  }
  .icon-star:hover {
    transform: scale(1.2);
  }
  .icon-favorite-active {
    color: #dd4c07;
  }

  .navigation-tabs-content {
    width: 100%;
    height: 100%;
    overflow: hidden;
    box-sizing: border-box;
  }

  .tab-slot-right-enter-active {
     transform: translateX(-30%);
     opacity: 0;
     transition: all 300ms linear;
   }

  .tab-slot-right-enter-to {
     transform: translateX(0);
     opacity: 1;
   }

  .tab-slot-right-leave-active {
     transform: translateX(0);
     opacity: 1;
     transition: all 300ms linear;
   }

  .tab-slot-right-leave-to {
     transform: translateX(30%);
     opacity: 0;
   }

  .tab-slot-left-enter-active {
     transform: translateX(30%);
     opacity: 0;
     transition: all 300ms linear;
   }

  .tab-slot-left-enter-to {
     transform: translateX(0);
     opacity: 1;
   }

  .tab-slot-left-leave-active {
     transform: translateX(0);
     opacity: 1;
     transition: all 300ms linear;
   }

  .tab-slot-left-leave-to {
     transform: translateX(-30%);
     opacity: 0;
   }
</style>
