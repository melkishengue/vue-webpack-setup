<template>
  <div>

    <div v-bind:class="{ user_div: true, selected: selected }" v-on:click="toggleSelect">
      <label for="">Name:</label> {{ user.name }} </br>
      <label for="">Email:</label> {{ user.email }} </br>
      <label for="">Website:</label> {{ user.website }}</br>
      <label for="">Phone:</label> {{ user.phone }}</br>
      <transition
      name="custom-classes-transition"
      enter-active-class="animated bounceIn">
        <div v-if="selected" class="check">
          <img src="~Assets/check.png" alt="">
        </div>
      </transition>
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
      return state.selected.includes(this.user);
    }
  }),
  methods: {
    toggleSelect() {
      this.$store.dispatch('toggleSelect', this.user);
    }
  }
}
</script>

<style lang="scss" scoped>
  .user_div:hover {
    border: 2px solid orange;
  }

  .user_div {
    border: 2px solid silver;
    border-radius: 4px;
    text-align: left;
    padding: 15px;
    margin: 5px;
    width: 20%;
    float: left;
    cursor: pointer;
    position: relative;
  }

  .check img {
    width: 30px;
  }

  .check {
    position: absolute;
    top: 10px;
    right: 10px;

  }

  label {
    font-weight: bold;
  }

  .selected {
    border: 2px solid orange;
    color: black;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
