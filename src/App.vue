<template>
  <div id="app">
    <app-header></app-header>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from "./components/shared/Header.vue";

export default {
  name: "App",
  components: { appHeader: Header },
};
</script>

<style lang="scss">
@import "./shared/colours";
@import "~bootstrap/dist/css/bootstrap.css";
@import "~bootstrap-vue/dist/bootstrap-vue.css";

#app {
  font-family: Helvetica, Arial, sans-serif;
  font-size: 14px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333333;
  margin: 0;
}

/* Type box */
.type-box {
  display: inline-block;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  border: 1px solid transparent;
  padding: 0.175rem 0.5rem 0.16rem 0.5rem;
  margin: 3px 7.5px 3px 0;
  font-size: 0.7rem;
  font-weight: bold;
  text-transform: uppercase;
  line-height: 1.5;
  color: $white;
}

.type-box-sml {
  margin: 0;
}

/* Vue audio */
.icon-stop2,
.vue-sound__playback-time-wrapper,
.volume-toggle,
.icon-paragraph-justify,
.vue-sound__extern-wrapper {
  display: none !important;
}

.icon-play3::before {
  content: "\EA26" !important;
}

.toCapitalFirst {
  text-transform: capitalize;
}

@media only screen and (max-width: 500px) {
  #app {
    margin: 10px 2px;
  }
  .col {
    padding: 0;
  }
  .table th,
  .table td {
    padding: 0.35rem;
  }
}
</style>