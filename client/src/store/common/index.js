import { getLoads } from "@/services/loads";
export default {
  namespaced: true,
  state: {
    me: {},
    stages: [],
    users: [],
    dicts: [],
    fullLoading: true
  },
  actions: {
    init({ commit }) {
      getLoads().then(rep => {
        commit("SET_INIT", rep);
        commit("SET_LOADING", false);
      });
      // iotClient
      //   .query({
      //     query: loads
      //   })
      //   .then(rep => {
      //     commit("SET_INIT", rep);
      //   })
      //   .catch(err => {
      //     console.log(err);
      //     Vue.$store.commit("logout");
      //     Vue.$router.push("/login");
      //   });
    }
  },
  mutations: {
    SET_INIT(state, data) {
      state.me = data.me;
      state.stages = data.stages;
      state.users = data.users;
      state.dicts = data.dicts;
    },
    SET_LOADING(state, payload) {
      state.fullLoading = payload;
    }
  }
};
