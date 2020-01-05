// WELCOME TO THE STORE, THE SINGLE SOURCE OF TRUTH

import Vue from 'vue';
import Vuex from 'vuex';
const faceapi = require('face-api.js');

import { 
  UPDATE_LOADING
} from 'Src/store.constants';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    loading: true
  },
  mutations: {
    [UPDATE_LOADING](state, payload) {
      const { loading } = payload;
      state.loading = loading;
    }
  },
  actions: {
    loadModels() {
      return new Promise((resolve, reject) => {
        Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
          faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
          faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
          // faceapi.nets.faceExpressionNet.loadFromUri('/models')
        ]).then(resolve).catch(reject);
      })
    },
    setLoading({ commit }, payload) {
      commit(UPDATE_LOADING, payload);
    }
  }
});
