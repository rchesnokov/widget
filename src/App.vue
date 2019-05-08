<template>
  <div id="app">
    <Main></Main>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Main from '@/views/Main.vue';

@Component({
  components: {
    Main,
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
}

#app {
  min-height: 100%;
  font-family: $font;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 1rem;
  background-color: $pale-grey;

  * {
    box-sizing: border-box;
    outline: none;
  }
}

/* Animations */

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: opacity 0.4s, max-height 0.3s;
}

.slide-down-enter,
.slide-down-leave-to {
  opacity: 0;
  max-height: 0;
}
</style>
