const state = {
  souls: [],
  soul: null,
  currentSoulId: null,
  favorites: {},
};

const mutations = {
  GET_SOUL(state, payload) {
    console.log(2222)
    state.soul = payload.data;
  },
  ADD_FAVORITES_SOUL(state, payload) {
    state.favorites[payload.id] = payload.data;
  },
  REMOVE_FAVORITES_SOUL(state, payload) {
    delete state.favorites[payload.id];
  },
};

const actions = {
  getSoul({ commit}) {
    console.log('isNext')
    //
    commit('GET_SOUL');
  },
  addFavorite({ commit }) {
    console.log('addFavorite')
    commit('ADD_FAVORITES_SOUL');
  },
  removeFavorite({ commit }) {
    commit('REMOVE_FAVORITES_SOUL');
  },
};

export default {
  state,
  mutations,
  actions,
};
