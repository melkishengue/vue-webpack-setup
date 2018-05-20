<template>
  <div>
      <button type="button" v-bind:class="{ active: filter=='' }" v-on:click="setFilter('')">All</button>
      <button type="button" v-bind:class="{ active: filter=='.org' }" v-on:click="setFilter('.org')">.org</button>
      <button type="button" v-bind:class="{ active: filter=='.net' }" v-on:click="setFilter('.net')">.net</button>
      <button type="button" v-bind:class="{ active: filter=='.com' }" v-on:click="setFilter('.com')">.com</button>
      <button type="button" v-bind:class="{ active: filter=='.info' }" v-on:click="setFilter('.info')">.info</button>
  </div>
</template>

<script>

import { mapState } from 'vuex';

export default {
  name: 'FilterComponent',
  data() {
    return {

    }
  },
  created() {

  },
  computed: mapState({
    filter: (state) => {
      return state.filter;
    }
  }),
  methods: {
    setFilter(filter) {
      this.$store.dispatch('filterUsers', filter);
    }
  }
}
</script>

<style lang="scss" scoped>

  button:focus {outline:0;}

  button {
    font-size: 16px;
    border: 2px solid silver;
    border-radius: 4px;
    text-align: left;
    padding: 5px;
    margin: 5px;
    /* float: left; */
  }

  .active {
    border: 2px solid black;
  }
</style>
