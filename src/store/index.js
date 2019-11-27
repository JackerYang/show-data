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
    raiChar: null,
    homChar: null,
    mapChar: null,

    // websocket实例
    ws: null,
    wsState: false,

    temData: null
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
    },
    SET_HOM_CHAR: (state, val) => {
      state.homChar = val;
    },
    SET_MAP_CHAR: (state, val) => {
      state.mapChar = val;
    },

    SET_WEBSOCKET: (state, instance) => {
      state.ws = instance;
    },
    SET_WEBSOCKET_STATE: (state, val) => {
      state.wsState = val;
    },
    SET_TEM_DATA: (state, val) => {
      state.temData = val;
    }
  },
  actions: {
    connectWebsocket: ({ commit }) => {
      let instance = new WebSocket("ws://192.168.2.145:10000/webSocket?Authorization=ysw");
      commit("SET_WEBSOCKET", instance);
      instance.onopen = () => {
        commit("SET_WEBSOCKET_STATE", true);
        instance.onmessage = e => {
          let data = JSON.parse(e.data);
          if (data.res && data.type === "temperature") {
            commit("SET_TEM_DATA", data.data);
          }
        };
        instance.onclose = () => {
          commit("SET_WEBSOCKET_STATE", false);
        };
      };
    }
  },
  modules: {}
});
