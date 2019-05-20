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

/* Tooltip */
.tooltip {
  z-index: 9999;

  &-inner {
    padding: 6px 16px;
    margin-bottom: 8px;
    font-size: rem(13px);
    line-height: 1.38;
    border-radius: 5px;
    background-color: $blue;
    color: $white;
  }

  &-arrow {
    position: absolute;
    top: calc(100% - 8px);
    left: 50%;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 4px 4px 0 4px;
    border-color: $blue transparent transparent transparent;
    transform: rotateX(-50%);
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

.slide-down-in-enter-active {
  transition: opacity 0.4s;
}

.slide-down-in-leave-active {
  transition: none;
}

.slide-down-in-enter,
.slide-down-in-leave-to {
  opacity: 0;
}
</style>
