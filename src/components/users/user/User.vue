<template>
    <div v-bind:class="{ user_div: true, selected: selected }" v-on:click="toggleSelect">
        <label for="">Name:</label> {{ user.name }} </br>
        <label for="">Email:</label> {{ user.email }} </br>
        <label for="">Website:</label> {{ user.website }}</br>
        <label for="">Phone:</label> {{ user.phone }}</br>
        <transition
        name="custom-classes-transition"
        enter-active-class="animated bounceIn">
          <div v-if="selected" class="check">
            selected
          </div>
        </transition>
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
    selected: function (state) {
      return state.selected.includes(this.user.id);
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

  .user_div {
    border: none;
    text-align: left;
    color: #999;
    cursor: pointer;
    position: relative;
    background-color: white;
    font-size: 14px;
    box-shadow: 0 1px 1px 0 rgba(42,42,42,.4);
    padding: 10px;
  }

  .check {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 11px;
    color: #ff5900;
  }

  label {
    color: #666;
    font-weight: bold;
  }
</style>
