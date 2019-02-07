<template>
  <div class="filter-container">
    <div class="left">
      Search: <input type="text" placeholder="E.g.: website:dach" v-model="searchParam" v-on:keyup="launchFilter" />
    </div>
    <div class="right">
      <button v-for="iFilter in filters" type="button" v-bind:class="{ active: iFilter.filter==filter_category }" v-on:click="setCategory(iFilter.filter)">
        {{ iFilter.display }}
      </button>
    </div>
  </div>
</template>

<script>

import { mapState } from 'vuex';

export default {
  name: 'FilterComponent',
  data() {
    return {
      searchParam: '',
      // to fire the search only after a certain amount of time
      timeout: null,
      filters: [{
        filter: '',
        display: 'All'
      },
      {
        filter: '.org',
        display: '.org'
      },
      {
        filter: '.net',
        display: '.net'
      },
      {
        filter: '.com',
        display: '.com'
      },
      {
        filter: '.info',
        display: '.info'
      }]
    }
  },
  created() {

  },
  computed: mapState({
    filter_category: (state) => {
      return state.filter_category;
    },
    searched_text: (state) => {
      return state.filter_text.indexOf(':') !== -1 ? state.filter_text.split(':')[1] : ''
    }
  }),
  methods: {
    setCategory(filter) {
      this.$store.dispatch('filter', {category: filter});
    },
    launchFilter(event) {
      clearTimeout(this.timeout);

      // delay search by 900 to allow for batching
      this.timeout = setTimeout( () => {
        this.$store.dispatch('filter', {text: this.searchParam});
      }, 900);
    }
  }
}
</script>

<style lang="scss" scoped>
  .filter-container {
    width: 100%;
    display: grid;
    grid-gap: 10px;
    grid-template-columns: repeat(2, 1fr);
    margin-top: 40px;
    margin-bottom: 10px;

    .left, .right {
      display: inline;
    }

    .left {
      text-align: left;
    }

    .right {
      text-align: right;
    }

    .hint {
      font-size: 11px;
      color: #999;
    }

    input {
      padding: 5px;
      width: 300px;
      color: #666;
      font-size: 14px;
    }

    button:focus, input:focus {outline:0;}

    button {
      font-size: inherit;
      border-radius: 0px;
      text-align: left;
      padding: 5px;
      margin: 5px;
      cursor: pointer;
      font-family: inherit;
      color: #666;
      font-size: 13px;
      border: none;
      box-shadow: 0 1px 1px 0 rgba(42,42,42,.4);
    }

    .active {
      background-color: #ff5900;
      color: white;
    }
  }
</style>
