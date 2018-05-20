<template>
  <div id="app">
    <Users />
    <Count />
  </div>

</template>

<script>
import Users from 'Components/users/Users.vue';
import Count from 'Components/Count.vue';

export default {
  name: 'app',
  components: {
    Users,
    Count
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
