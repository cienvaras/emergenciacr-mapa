<template>
  <div class="app">
    <header class="page-header">
      <h1 class="site-title">#EmergenciaCR</h1>
    </header>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,700');

* {
  box-sizing: border-box;
}

html {
  font-size: 62.5%;
  font-family: "Source Sans Pro", sans-serif;
}
body {
  margin: 0;
}
.app {
  height: 100vh;
  display: flex;
  flex-direction: column;
}
.page-header {
  height: 80px;
  flex: 0 0 80px;
  padding: 20px;
}
.site-title {
  font-weight: 300;
  font-size: 3.2rem;
  margin: 0;
}
.button {
  display: inline-block;
  background-color: #fdaa51;
  color: #fff;
  padding: 8px 15px;
  text-decoration: none;
  font-size: 1.4rem;
  border-radius: 3px;
}
</style>
