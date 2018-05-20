// WELCOME TO THE STORE, THE SINGLE SOURCE OF TRUTH

import Vue from 'vue';
import Vuex from 'vuex';
import UsersService from 'Services/users.service';
import { UPDATE_USERS, FILTER_USERS, TOGGLE_SELECTED } from 'Src/store.constants';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    // filtered users
    users: [],
    // original fetched users, needed for applying filters
    savedUsers: [],
    // applied filter
    filter: '',
    // selected users
    selected: []
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
    },
    [TOGGLE_SELECTED](state, user) {
      if (state.selected.includes(user)) {
        state.selected.splice(state.selected.indexOf(user), 1);
      } else {
        state.selected.push(user);
      }
    }
  },
  actions: {
    // normally actions receive the context as param: fetchUsers(context)
    // I just need context.commit though
    fetchUsers({ commit }) {
      UsersService.getUsers().then(response => {
        commit(UPDATE_USERS, response.data);
      });
    },
    filterUsers({ commit }, filter) {
      commit(FILTER_USERS, filter);
    },
    toggleSelect({ commit }, user) {
      commit(TOGGLE_SELECTED, user);
    }
  },
  getters: {
    countSelected(state) {
      return state.selected.reduce((sum, element) => {
        if (state.users.includes(element)) return sum+1;
        return sum;
      }, 0);
    }
  }
})
