<template>
  <div class="text-gray-700">
    <nav class="bg-gray-100">
      <div class="container mx-auto flex justify-between font-bold p-4">
        <router-link to="/" class="outline-none border-b-2 border-transparent focus:border-blue-300">The Funnest App</router-link>
        <router-link to="/doodle" class="outline-none border-b-2 border-transparent focus:border-blue-300">Doodle</router-link>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  created() {
    this.$store.dispatch('initWebRtc')
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
