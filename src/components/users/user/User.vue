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
import UsersService from 'Services/users.service';
import Vue from 'vue';
const eventHub = new Vue();

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
      selected: false,
      eventHub: eventHub
    }
  },
  created() {
    this.eventHub.$on('unselectAll', data => {
      if(data.id !== this.id) this.selected = false;
    });
  },
  methods: {
    toggleSelect() {
      this.eventHub.$emit('unselectAll', {id: this.user.id});
      this.selected = !this.selected;
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
