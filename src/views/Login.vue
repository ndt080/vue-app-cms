<template>
  <div class="overlay-i">
    <TopNav/>
    <!-- GIF LOGO BOX -->
    <div class="container-img-i" style="text-align: center; margin: 0 auto;" v-if="isLoginForm">
      <img class="img-body" :src="require(`@/assets/img/logo.gif`)" alt="ЛОГО" style="max-width: 22rem"/>
      <h1>WELCOME, май френд ту зе щедуле!!!</h1>
    </div>
    <Login_login v-if="isLoginForm" />
    <Login_registration v-else/>
    <div class="text-center" style="font-size: 1.5em">
          <span class="txt2">
              или
              <a href="#" @click.prevent="isForm()" v-if="!isLoginForm">войти</a>
              <a href="#" @click.prevent="isForm()" v-else>зарегистрироваться</a>
          </span>
    </div>
    <footer>
      <p class="text-left">Powered by Vue.js and firebase </p>
    </footer>
  </div>
</template>

<script>
  import TopNav from "@/components/home/TopNav";
  import Login_registration from "@/components/login/Login_registration";
  import Login_login from "@/components/login/Login_login";
  export default {
    name: 'Login',
    components: {Login_login, Login_registration, TopNav},
    metaInfo:{
      title: 'Вход'
    },
    data() {
      return{
        isLoginForm: true,
      }
    },
    methods:{
      isForm(){
          return this.isLoginForm = !this.isLoginForm;
      }
    },
  }
</script>

<style scoped>
.overlay-i {
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;

  width: 96vw;
  min-height: 100vh;
  padding: 2% 5rem 3% 3%;

  font-family: 'Oswald', sans-serif;
  color: rgb(154,198,172);
}

@media (max-width: 500px) {
  .overlay-i{
    padding: 3% 4.4rem 3% 3%;
  }
  footer{
    padding: 0 5rem 0 1.5rem !important;
  }
}
footer{
  display: inline-flex;
  justify-content: space-between;
  padding: 0 5rem 0 3rem;
}
footer p{
  font-size: 1.3em !important;
  color: #9ac6ac !important;
}
</style>
