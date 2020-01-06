<template>
  <div id="container">
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
@import url('https://fonts.googleapis.com/css?family=Khand|Luckiest+Guy');

body {
  background: #eae8e7;
  margin-left: 100px;
    margin-right: 100px;

  #container {
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI,Helvetica Neue,Helvetica,Arial,sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
    font-size: 14px;
    
  }
  

}
</style>
