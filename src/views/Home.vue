<template>
  <div class="overlay-i">
    <TopNav v-bind:isLogin="isLogin"/>
    <Home_Auth v-if="isLogin"/>
    <Home_noAuth v-if="!isLogin"/>
    <footer>
        <p class="text-left">Powered by Vue.js and firebase </p>
    </footer>
  </div>
</template>

<script>

import TopNav from "../components/home/TopNav";
import Home_Auth from "@/components/home/Home_Auth";
import Home_noAuth from "@/components/home/Home_noAuth";
export default {
  name: 'Home',
    components: {Home_noAuth, Home_Auth, TopNav},
    metaInfo:{
    title: 'Главная'
  },
  data() {
    return{
      isLogin: this.isAuth()
    }
  },
  methods:{
    isAuth(){
      const auth = localStorage.getItem('userAuth')
      return auth === 'yes';
    }
  },
}
</script>

<style scoped>
.overlay-i {
  padding: 2% 7.2rem 3% 3%;
  margin: 0 auto;
  width: 100vw;
  min-height: 100vh;
  font-family: 'Oswald', sans-serif;
  color: rgb(154,198,172);
}
  @media (max-width: 500px) {
    .overlay-i{
      padding: 3% 5.2rem 3% 3%;
    }
    footer{
      padding: 0 5rem 0 1.5rem !important;
    }
  }
  footer{
    display: inline-flex;
    justify-content: space-between;
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
    padding: 0 5rem 0 3rem;
  }
  footer p{
    font-size: 1.3em !important;
    color: #9ac6ac !important;
  }
</style>
