<template>
  <div class="overlay-i">
    <TopNav />
    <!-- GIF LOGO BOX -->
    <div class="container-img-i">
        <img class="img-body" :src="require(`@/assets/img/logo.gif`)" alt="ЛОГО" />
    </div>
    <!-- TEXT CONTENT -->
    <h1>WELCOME, ФПМИ-ШНИК БГУ!!!</h1>
    <p class="text-body-i">"Оставь надежду всяк сюда входящий, боль и страдания не заставят себя ждать. Соседи не забудут крик бомбящий,
        ведь Орешко будет завтра лабу принимать..."
    </p>
    <section>
      <h2 v-if="!isLogin">чтобы в полной мере воспользователь функциями приложения, необходимо <br />
      <router-link to="/login">войти</router-link> или <router-link to="/registration">зарегистрироваться</router-link></h2>
    </section>
    <footer>
        <p class="text-left">Powered by Vue.js and firebase </p>
        <p class="text-right" v-if="isLogin">перейти к <router-link to="/schedule">расписанию занятий</router-link></p>
    </footer>
  </div>
</template>

<script>

import TopNav from "../components/home/TopNav";
export default {
  name: 'Home',
    components: {TopNav},
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
    padding: 3%;
    margin: 0 auto;
    width: 100%;
    font-family: 'Oswald', sans-serif;
    color: rgb(154,198,172);
  }
  @media (max-width: 500px) {
    .container-img-i{
        padding: 5% 0 0 0 !important;
    }
    .img-body{
        width: 18rem !important;
        height: 12rem;
    }
    .text-body-i{
      font-size: 20px !important;
      padding: 0 !important;
    }
    footer{
      padding: 0 5rem 0 1.5rem !important;
    }
  }
  .text-body-i{
      padding: 0 5rem 0 5rem;
  }
  .overlay-i h1{
    font-size: 45px;
    text-align: center;
    font-weight: bold;
  }
  .overlay-i h2{
    font-size: 2rem;
    text-align: center;
    font-weight: bold;
    padding-top: 1rem;
  }
  .overlay-i p{
    font-size: 24px;
    color: #e6e6e6;
    text-align: center;
    padding-top: 0.3rem;
  }
  .overlay-i a{
    text-decoration: none;
  }
  .container-img-i{
    position: relative;
    display: block;
    margin: 0 auto;
    padding-left: 1.5%;
    padding-top: 5%;
    text-align: center;
  }
  .img-body{
    width: 20rem;
    height: 15rem;
    border-radius: 0.5rem;
    margin-bottom: 30px;
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
  section {

  }
</style>
