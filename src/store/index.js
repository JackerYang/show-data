import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 图形实例
    temChar: null,
    humChar: null,
    traChar: null,
    subChar: null,
    raiChar: null,
    homChar: null,
    mapChar: null,

    // websocket实例
    ws: null,
    // websocket是否连接
    wsState: false,

    // 数据
    temData: null,
    humData: null,
    traData: null,
    subData: null,
    raiData: null,
    lisData: null,
    homData: null
  },
  mutations: {
    // 创建 7 个echarts实例
    SET_TEM_CHAR: (state, val) => {
      state.temChar = val;
    },
    SET_HUM_CHAR: (state, val) => {
      state.humChar = val;
    },
    SET_TRA_CHAR: (state, val) => {
      state.traChar = val;
    },
    SET_SUB_CHAR: (state, val) => {
      state.subChar = val;
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

    // 建立websocket连接，并初始化
    SET_WEBSOCKET: (state, callbacks) => {
      let { onopen, onmessage, onclose } = callbacks;
      // 建立连接
      // state.ws = new WebSocket("ws://192.168.2.145:10000/webSocket?Authorization=ysw");
      state.ws = new WebSocket("ws://114.55.95.208:8096/websocket/ysw");

      // 连接成功
      state.ws.onopen = onopen;
      // 收到消息
      state.ws.onmessage = onmessage;
      // 断开连接
      state.ws.onclose = onclose;
    },
    // 修改websocket连接状态
    SET_WEBSOCKET_STATE: (state, val) => {
      state.wsState = val;
    },
    // 收到各类数据
    SET_DATA: (state, data) => {
      state[data.type + "Data"] = data.data;
    }
  },
  actions: {
    init_websocket: ({ commit, dispatch }) => {
      commit("SET_WEBSOCKET", {
        onopen: () => {
          commit("SET_WEBSOCKET_STATE", true);
        },
        onmessage: e => {
          let data = JSON.parse(e.data);
          commit("SET_DATA", data);
        },
        onclose: () => {
          commit("SET_WEBSOCKET_STATE", false);
          // 自动重连
          setTimeout(() => {
            dispatch("init_websocket");
          }, 1000);
        }
      });
    }
  }
});
