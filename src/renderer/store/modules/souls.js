import db from '../../../database/base';


const state = {
  souls: [],
  soul: null,
  currentSoulId: null,
  count: 0
};

const mutations = {
  GET_SOUL(state, payload) {
    if (!payload.soul.userId) return;
    state.currentSoulId = payload.soul.userId;
    state.soul = payload.soul;
  },
  FAVOR_SOUL(state, payload) {
    state.soul = {...state.soul, isFavorite: payload.isFavor};
  },
};

const actions = {
  async getSoul({ commit, state }, { offset }) {
    const simplify = new db.Database(`../simplify/hangzhou`);
    await simplify.connectDb();
    const soul = await simplify.readSoulById(state.currentSoulId, offset);
    await simplify.closeDb();
    commit('GET_SOUL', {soul: parse(soul) || {}});
  },
  async favor({ commit, state }, { isFavor }) {
    console.log('commit Favorite');
    const simplify = new db.Database(`../simplify/hangzhou`);
    await simplify.connectDb();
    await simplify.favor(state.currentSoulId, isFavor);
    await simplify.closeDb();

    commit('FAVOR_SOUL', {isFavor});
  }
};

const parse = (data) => {
  for (let i in data) {
    try {
      data[i] = JSON.parse(data[i]);
    } catch(err) {
    }
  }
  return data;
};

export default {
  state,
  mutations,
  actions,
};
