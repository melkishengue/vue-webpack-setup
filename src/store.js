// WELCOME TO THE STORE, THE SINGLE SOURCE OF TRUTH

import Vue from 'vue';
import Vuex from 'vuex';
import UsersService from 'Services/users.service';
import constants from 'Src/store.constants';

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
    selected: [],
    filter_text: '',
    filter_category: '',

  },
  mutations: {
    [constants.UPDATE_USERS](state, users) {
      state.users = users;
      state.savedUsers = users;
    },
    [constants.FILTER_USERS](state) {
      let users = state.savedUsers.filter((user) => {
        return user.website.indexOf(state.filter_category) !== -1;
      });

      if (state.filter_text.indexOf(':') !== -1) {
        let arr = state.filter_text.split(':');
        users = users.filter((user) => {
          let value = user[arr[0]];
          // if the field does not exist
          if (!value) return false;
          return value.toLowerCase().indexOf(arr[1])  !== -1;
        });
      }

      state.users = users;
    },
    [constants.SET_USERS](state, users) {
      state.users = users;
    },
    [constants.SET_FILTER_TEXT](state, filter_text) {
      state.filter_text = filter_text;
    },
    [constants.SET_FILTER_CATEGORY](state, filter_category) {
      state.filter_category = filter_category;
    },
    [constants.TOGGLE_SELECTED](state, user) {
      let { id }  = user;
      if (state.selected.includes(id)) {
        state.selected.splice(state.selected.indexOf(id), 1);
      } else {
        state.selected.push(id);
      }
    }
  },
  actions: {
    async fetchUsers({ commit }) {
      let users = await UsersService.getUsers();
      commit (constants.UPDATE_USERS, users);
    },
    toggleSelect({ commit }, user) {
      commit(constants.TOGGLE_SELECTED, user);
    },
    filter({ commit, state }, payload) {
      return new Promise((resolve, reject) => {
        let { text, category } = payload;

        if (text !== undefined) commit(constants.SET_FILTER_TEXT, text);
        if (category !== undefined) commit(constants.SET_FILTER_CATEGORY, category);

        commit(constants.FILTER_USERS);
        resolve();
      })
    }
  },
  getters: {
    countSelected(state) {
      // go through state.users and count those who are selected: whose ids are in the selected array
      let selectedAndFiltered = state.users.filter((user) => {
        return state.selected.includes(user.id);
      });

      return {
        count: selectedAndFiltered.length,
        all: selectedAndFiltered.length === state.users.length
      };
    }
  }
});
