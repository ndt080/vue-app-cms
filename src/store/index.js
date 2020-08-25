import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import sche from './sche'
import info from './info'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: null,
    isEditT: true
  },
  mutations: {
    setError(state, error){
      state.error = error
    },
    clearError(state){
      state.error = null
    }
  },
  actions: {
  },
  getters:{
    error: s => s.error,
    isEditT: s => s.isEditT
  },
  modules: {
    auth, sche, info
  }
})
