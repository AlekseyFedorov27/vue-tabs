import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import { initialUsersList } from "@/store/constants";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    users: [],
    posts: [],
    select: 0,
  },
  getters: {
    users: ({ users }) => users,
    posts: ({ posts }) => posts,
    select: ({ select }) => select,
  },
  mutations: {
    SET_USERS(state, data) {
      state.users = data;
    },
    SET_POST(state, data) {
      state.posts = data;
    },
    DELETE_USER(state, id) {
      state.users.splice(id, 1);
      console.log(id);
      state.select = state.users.length == id ? (state.select = state.users.length - 1) : id;
    },
    SET_SELECT(state, id) {
      state.select = id;
    },
  },
  actions: {
    async fetchUsers({ commit }) {
      try {
        let requests = initialUsersList.map(({ id }) => axios.get(`https://jsonplaceholder.typicode.com/users/${id}`));
        const response = await Promise.all(requests);
        const users = response.map(({ data }) => data);
        commit("SET_USERS", users);
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    async fetchPosts({ commit }, userID) {
      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userID}`);
        commit("SET_POST", response.data);
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    deleteUser({ commit }, id) {
      commit("DELETE_USER", id);
    },
    selectTab({ commit, dispatch }, id) {
      dispatch("fetchPosts", id);
      commit("SET_SELECT", id);
    },
  },
  modules: {},
});
