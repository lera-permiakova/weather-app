<template>
  <div class="app">
    <header class="app-header">
      <div class="app-header-info">
        <div class="app-header-title">
          <img class="app-header-logo" src="./assets/icons/sun.png" alt="sun">
          <h1 class="app-header-title-name">Weather Forecast</h1>
        </div>

        <div class="router-button">
          <router-link to="/favorites" class="router-button-link">
            Favorites
          </router-link>
        </div>
      </div>
    </header>

    <main class="app-body">
      <router-view/>
    </main>
  </div>
</template>

<script>
/*eslint-disable*/
import {mapActions, mapMutations} from "vuex";

export default {
  name: 'App',
  async mounted() {
    this.changeSyncStatus(true)
    await this.getIP()
  },
  methods: {
    ...mapMutations({
      changeSyncStatus: 'changeSyncStatus'
    }),
    ...mapActions({
      getIP: 'getIP',
    })
  }
}
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #000;
    scroll-behavior: smooth;
  }
  html, body {
    width: 100%;
    height: 100%;
    margin: 0;
    background-color: rgb(130,150,170);
  }
  h3, h2, h1, h4, p {
    margin: 0;
  }
  ul {
    margin: 0;
    padding: 0;
  }
  .app {
    min-width: 360px;
  }
  .app-header {
    height: 84px;
    padding: 10px 0;
    background-color: #183651;
    position: sticky;
    display: flex;
    align-items: center;
    top: 0;
    z-index: 9;
    box-sizing: border-box;
    box-shadow: 0 4px 12px 1px rgba(59,65,71, .4);
  }
  .app-header-info {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    padding: 0 10px;
    box-sizing: border-box;
    display: inherit;
    align-items: inherit;
    justify-content: space-between;
    color: #fff;
    max-width: 1200px;
  }
  .app-header-title{
    display: inherit;
    align-items: inherit;
  }
  .app-header-title-name {
    font-size: 22px;
  }
  .app-header-logo {
    height: 36px;
    width: 36px;
    margin-right: 12px;
  }
  .app-body {
    max-width: 1200px;
    margin: 0 auto;
    box-sizing: border-box;
    padding: 20px 10px;

  }
  .router-button {
    height: 100%;
    display: inherit;
    align-items: inherit;
    border-radius: 3px;
    border-left: 1px solid #010203;
    border-right: 1px solid #010203;
  }
  .router-button:hover {
    background-color: rgba(47,74,98, .5)
  }
  .router-button:active {
    background-color: rgba(47,74,98, .3)
  }
  .router-button-link{
    display: inherit;
    align-items: inherit;
    height: 100%;
    padding: 0 10px;
    align-self: center;
    text-decoration: none;
    font-weight: 600;
    font-size: 15px;
    color: rgb(242, 193, 68);
    cursor: pointer;
    transition: background-color .3s;
  }
  @media (min-width: 480px) {
    .app-header-info {
      padding: 0 20px;
    }
    .app-header-logo {
      height: 42px;
      width: 42px;
    }
    .app-header-title-name {
      font-size: 32px;
    }
    .router-button-link {
      font-size: 19px;
    }
    .app-body {
      padding: 20px;
    }
  }
  @media (min-width: 1025px) {
    .app-header-info {
      padding: 0 40px;
    }
    .app-header-logo {
      height: 42px;
      width: 42px;
    }
    .app-header-title-name {
      font-size: 32px;
    }
    .router-button-link {
      font-size: 19px;
    }
    .app-body {
      padding: 20px 40px;
    }
  }
</style>
