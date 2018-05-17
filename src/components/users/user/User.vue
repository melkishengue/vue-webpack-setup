<template>
  <div>

    <div v-bind:class="{ user_div: true, selected: selected }" class="" v-on:click="toggleSelect">
      <label for="">Name:</label> {{ user.name }} </br>
      <label for="">Email:</label> {{ user.email }} </br>
      <label for="">Website:</label> {{ user.website }}</br>
      <label for="">Phone:</label> {{ user.phone }}</br>
      <router-link to="/details">View details</router-link>
    </div>
  </div>
</template>

<script>

import { mapState } from 'vuex';

export default {
  name: 'Users',
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data() {
    return {

    }
  },
  computed: mapState({
    // can't use an arrow function here, loose of the this reference for the vue component
    selected: function (state) {
      return state.selected == this.user.id
    }
  }),
  methods: {
    toggleSelect() {
      this.$store.dispatch('toggleSelect', this.user.id);
    }
  }
}
</script>

<style scoped>
  .user_div {
    border: 2px solid silver;
    border-radius: 4px;
    text-align: left;
    padding: 15px;
    margin: 5px;
    width: 20%;
    float: left;
    cursor: pointer;
  }

  label {
    font-weight: bold;
  }

  .selected {
    border: 2px solid black;
  }
</style>
