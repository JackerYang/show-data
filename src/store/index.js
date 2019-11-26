import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 图形实例
    temChar: null,
    humChar: null,
    traChar: null,
    exmChar: null,
    raiChar: null
  },
  mutations: {
    SET_TEM_CHAR: (state, val) => {
      state.temChar = val;
    },
    SET_HUM_CHAR: (state, val) => {
      state.humChar = val;
    },
    SET_TRA_CHAR: (state, val) => {
      state.traChar = val;
    },
    SET_EXM_CHAR: (state, val) => {
      state.exmChar = val;
    },
    SET_RAI_CHAR: (state, val) => {
      state.raiChar = val;
    }
  },
  actions: {},
  modules: {}
});
