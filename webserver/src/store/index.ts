import { createStore } from "vuex";
import createPersistedState from 'vuex-persistedstate';

export default createStore({
  state: {
    authToken: '',
	unAuthorizedAccessCount: 0,
	homePageVisitCount: 0,
	showLoginSnackbar: false,
	showWelcomeSnackbar: false
  },
  getters: {
    getAuthToken(state){
    	return state.authToken;
    },
	getLoginSnackbar(state){
		return state.showLoginSnackbar;
	},
	getWelcomeSnackbar(state){
		return state.showWelcomeSnackbar;
	},
	getUnAuthorizedAccessCount(state){
		return state.unAuthorizedAccessCount;
	},
	getHomePageVisitCount(state){
		return state.homePageVisitCount;
	}
  },
  mutations: {
	setShowLoginSnackbar(state, payload) {
		state.showLoginSnackbar = payload;
	},
	setShowWelcomeSnackbar(state, payload) {
		state.showWelcomeSnackbar = payload;
	},
	incrementUnAuthAccess(state){
		state.unAuthorizedAccessCount++;
	},
	incrementHomePageVisit(state){
		state.homePageVisitCount++;
	},
	setAuthAccessToken(state, payload) {
		state.authToken = payload;
	},
  },
  actions: {
    triggerLoginSnackbar({ commit }) {
    	commit('setShowLoginSnackbar', true);
    },
	resetLoginSnackbar({ commit }) {
		commit('setShowLoginSnackbar', false);
	},
	triggerWelcomeSnackbar({ commit }) {
    	commit('setShowWelcomeSnackbar', true);
    },
	resetWelcomeSnackbar({ commit }) {
		commit('setShowWelcomeSnackbar', false);
	},
	incrementUnAuthorizedAccessCount({ commit }) {
		commit('incrementUnAuthAccess');
	},
	incrementHomePageVisit({ commit }) {
		commit('incrementHomePageVisit');
	},
	setAuthToken({ commit }, payload){
		commit('setAuthAccessToken', payload);
	}
  },
  modules: {},
  plugins: [
    createPersistedState({
      key: 'auth-app-persisted-state',
      paths: ['unAuthorizedAccessCount','authToken','homePageVisitCount'],
      storage: window.sessionStorage
    })
  ]
});
