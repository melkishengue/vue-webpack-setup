<template>
  <div>
      <filterComponent />

      <div class="user-div" v-for="user in users">
        <user :user='user'/>
      </div>
  </div>
</template>

<script>
import UserComponent from 'Components/users/user/User.vue';
import FilterComponent from 'Components/Filter.vue';
import { mapState } from 'vuex';

export default {
  name: 'Users',
  components: {
    user: UserComponent,
    filterComponent: FilterComponent
  },
  data() {
    return {

    }
  },
  created() {
    this.$store.dispatch('fetchUsers');
  },
  // with mapState you map store state properties with local properties
  computed: mapState({
    // create property users locally mapped with users from the store
    users: (state) => {
      return state.users
    }
  }),
  methods: {

  }
}
</script>

<style lang="scss" scoped>
  .buttons-div {

  }

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
    ont-weight: bold;
  }
</style>
