import Vue from 'vue';
import Vuex from 'vuex';

import { createPersistedState, createSharedMutations } from 'vuex-electron';

import modules from './modules';

Vue.use(Vuex);

export default new Vuex.Store({
  modules,
  plugins: [
    createPersistedState(),
    // createSharedMutations(), // 与主进程共享store，需要在main中import store
  ],
  strict: process.env.NODE_ENV !== 'production',
});
