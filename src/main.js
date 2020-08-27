import Vue from 'vue';
import Vuelidate from "vuelidate";
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import Loader from "./components/Loader";
import 'bootstrap/dist/js/bootstrap.min';
import 'jquery/dist/jquery.min';
import VueBootstrapToasts from "vue-bootstrap-toasts";

import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/database';

Vue.config.productionTip = false
Vue.use(Vuelidate);
Vue.use(VueBootstrapToasts);
Vue.component('Loader', Loader)

firebase.initializeApp({
  apiKey: "AIzaSyC3wKon8167t3AduzsYPWEJ2NdZPdDnUTQ",
  authDomain: "fpmispiralarms.firebaseapp.com",
  databaseURL: "https://fpmispiralarms.firebaseio.com",
  projectId: "fpmispiralarms",
  storageBucket: "fpmispiralarms.appspot.com",
  messagingSenderId: "1097714644804",
  appId: "1:1097714644804:web:caa1674a4f9cb32bb28911",
  measurementId: "G-Y6MS0B0P9J"
})

let app
firebase.auth().onAuthStateChanged(() => {
  if(!app){
    app =  new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})


