import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import schedule_global from './schedele_global'
import schedule_common from "@/store/schedule_common";
import queue from './queue'
import info from './info'
import posts from './posts'
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
    auth, schedule_global, schedule_common, info, queue, posts
  }
})
