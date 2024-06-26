<template>
  <nav>
    <img alt="Vue logo" src="./assets/gatr-logo.png" style="width: 50.1px;margin-bottom:1em;" /><br />
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <router-view />
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

button {
  background-color: #0a3110;
  color: white;
  font-size: 1.2em;
  border: 1px solid black;
  border-radius: 10px;
  box-shadow: 16px 15px 11px -5px #0a3110;
}

body {
  background-color: darkblue;
  padding: 1em;
}

nav {
  padding: 20px;
  background-color: DodgerBlue;
  border-radius: 10px 10px 0px 0px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: white;
    }
  }
}
</style>
