<template>
  <div class="overlay-i">
    <div></div>
    <div style="padding-top: 7rem;">
      <Login_login v-if="isLoginForm" />
      <Login_registration v-else/>

      <div class="text-center" style="font-size: 1.5em">
            <span class="link">
                или
                <a href="#" @click.prevent="isForm()" v-if="!isLoginForm">войти</a>
                <a href="#" @click.prevent="isForm()" v-else>зарегистрироваться</a>
            </span>
      </div>

    </div>
    <footer>
      <p class="text-left">Powered by Vue.js and firebase </p>
    </footer>
  </div>
</template>

<script>
  import TopNav from "@/components/nav/TopNav";
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
  width: 98vw;
  min-height: 100vh;
  padding: 0 1rem 0 2rem;

  font-family: 'Oswald', sans-serif;
  color: #0a0a0a;
}

footer{
  display: inline-flex;
  justify-content: space-between;
  padding: 0 5rem 0 3rem;
}
footer p{
  font-size: 1.3em !important;
  color: #3740ff !important;
}
.link a{
  color: #3740ff;
}
</style>
