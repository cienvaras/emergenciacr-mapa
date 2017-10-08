<template>
  <div class="app">
    <header class="page-header">
      <h1>#EmergenciaCR</h1>
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
}
</style>
