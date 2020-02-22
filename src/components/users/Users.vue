<template>
  <div>
    <filterComponent />

    <transition-group tag="div" name="list" class="users-container">
      <user v-for="user in users" :user='user' :key="user.id"/>
    </transition-group>
    <div v-if="!users.length" class="disabled left">No users found</div>
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
  computed: mapState({
    users: (state) => {
      return state.users
    }
  }),
  methods: {

  }
}
</script>

<style lang="scss" scoped>
  .users-container {
    display: grid;
    grid-gap: 5px;
    grid-template-columns: repeat(4, 1fr);
    clear: right;
  }

  .disabled {
    color: #999;
  }

  .list-enter-active,
  .list-leave-active,
  .list-move {
    transition: 200ms cubic-bezier(0.59, 0.12, 0.34, 0.95);
    transition-property: opacity, transform;
  }

  .list-enter {
    opacity: 0;
    transform: translateX(50px) scaleY(0.5);
  }

  .list-enter-to {
    opacity: 1;
    transform: translateX(0) scaleY(1);
  }

  .list-leave-active {
    position: absolute;
  }

  .list-leave-to {
    opacity: 0;
    transform: scaleY(0);
    transform-origin: center top;
  }
</style>
