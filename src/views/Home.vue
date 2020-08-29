<template>
  <div class="overlay-i">
    <!-- GIF LOGO BOX -->
    <div class="container-img-i">
      <iframe class="embed-responsive-item img-body"
              src="https://www.arcgis.com/apps/opsdashboard/index.html#/85320e2ea5424dfaaa75ae62e5c06e61"
              allowfullscreen></iframe>
      <!-- <a href="index.html"><img class="img-body" src="img/logo.gif" alt="Еноты"></a> -->
    </div>
    <!-- TEXT CONTENT -->
    <h1 class="text-body-i">WELCOME, ФПМИ-ШНИК БГУ!!!</h1>
    <p class="text-body-i">«Примешь синюю таблетку — и сказке конец. Ты проснешься в своей постели и поверишь,
      что это был сон.
      Примешь красную таблетку — войдешь в страну чудес. Я покажу тебе, глубока ли кроличья нора» <i> —
        Морфеус </i></p>
    <div v-if="!isLogin">
      <h2 class="text-body-i"  >чтобы в полной мере воспользователь функциями приложения, необходимо <br />
      <router-link to="/login">войти</router-link> или <router-link to="/registration">зарегистрироваться</router-link></h2>
    </div>
    <div v-else>
      <h2 class="text-body-i" >перейти к <router-link to="/schedule">расписанию занятий</router-link></h2>
    </div>

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
    margin: auto;
    padding-left: 1.5%;
    padding-top: 1.5%;
    text-align: center;
  }
  .img-body{
    width: 100%;
    height: 18rem;
    border-radius: 0.5rem;
  }
</style>
