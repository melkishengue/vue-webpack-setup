// WELCOME TO THE STORE, THE SINGLE SOURCE OF TRUTH

import Vue from 'vue';
import Vuex from 'vuex';
import UsersService from 'Services/users.service';
import { UPDATE_USERS, FILTER_USERS } from 'Src/store.constants';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    users: [],
    savedUsers: [],
    filter: ''
  },
  mutations: {
    [UPDATE_USERS](state, users) {
      state.users = users;
      state.savedUsers = users;
    },
    [FILTER_USERS](state, filter) {
      state.filter = filter;
      state.users = state.savedUsers.filter((user) => {
        return user.website.indexOf(filter) !== -1
      });
    }
  },
  actions: {
    // normally actions receive the context as param: fetchUsers(context)
    // I just need context.commit though
    fetchUsers({ commit }) {
      UsersService.get('users').then(response => {
        commit(UPDATE_USERS, response.data);
      });
    },
    filterUsers({ commit }, filter) {
      commit(FILTER_USERS, filter);
    }
  },
  // not really useful since I can map store properties with local properties within components
  getters: {
    users(state) {
      return state.users
    }
  }
})
