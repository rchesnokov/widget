<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/ui">UI Kit</router-link>
    </div>
    <router-view />
  </div>
</template>

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

#nav {
  padding: 30px;
  text-align: center;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: opacity 0.4s;
}

.slide-down-enter,
.slide-down-leave-to {
  opacity: 0;
}
</style>
