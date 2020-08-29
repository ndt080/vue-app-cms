<template>
  <div class="overlay-i">
    <!-- GIF LOGO BOX -->
    <div class="container-img-i">

        <img class="img-body" :src="require(`@/assets/img/logo.gif`)" alt="ЛОГО" />

    </div>
    <!-- TEXT CONTENT -->
    <h1 class="text-body-i">WELCOME, ФПМИ-ШНИК БГУ!!!</h1>
    <p class="text-body-i">«Примешь синюю таблетку — и сказке конец. Ты проснешься в своей постели и поверишь,
      что это был сон.
      Примешь красную таблетку — войдешь в страну чудес. Я покажу тебе, глубока ли кроличья нора» <i> —
        Морфеус </i></p>
    <div >
      <h2 class="text-body-i" v-if="!isLogin">чтобы в полной мере воспользователь функциями приложения, необходимо <br />
      <router-link to="/login">войти</router-link> или <router-link to="/registration">зарегистрироваться</router-link></h2>
    </div>
    <footer>
        <p class="text-left">Powered by Vue.js and firebase </p>
        <p class="text-right" v-if="isLogin">перейти к <router-link to="/schedule">расписанию занятий</router-link></p>
    </footer>
  </div>
</template>

<script>

export default {
  name: 'Home',
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
    padding: 1.5%;
    margin: 0 auto;
    margin-right: 5rem;
    font-family: 'Oswald', sans-serif;
    color: rgb(154,198,172);
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
    padding-top: 2rem;
  }
  .overlay-i p{
    font-size: 24px;
    color: #e6e6e6;
    text-align: center;
  }
  .overlay-i a{
    text-decoration: none;
  }
  .container-img-i{
    position: relative;
    display: block;
    margin: 0 auto;
    padding-left: 1.5%;
    padding-top: 1.5%;
    text-align: center;
  }
  .img-body{
    width: 25rem;
    height: 15rem;
    border-radius: 0.5rem;
    margin-bottom: 30px;
  }
  footer{
    display: inline-flex;
    justify-content: space-between;
    position: fixed;
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
