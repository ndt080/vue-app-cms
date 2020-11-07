<template>
  <div class="card-deck" style="vertical-align: middle;">
    <div class="card" style="border: none; padding: 3rem">
      <picture>
        <source :srcset="require(`@/assets/img/logo.webp`)" type="image/webp">
        <img class="img-home" :src="require(`@/assets/img/sche1.svg`)" alt="ЛОГО" style="max-width: 90%"/>
      </picture>
    </div>
      <form @submit.prevent="submitHandler"
            class="card"
            style="border: none; padding: 3rem"
            method="POST"
      >
        <div class="form-group">
          <h1 style="text-align: center; color: #3740ff"><b>Добро пожаловать!</b></h1>
        </div>
        <div class="form-group">
          <input type="email" class="form-control-lg" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"
                 v-model.trim="email"
          >
        </div>
        <div class="form-group">
          <input type="password" class="form-control-lg" id="exampleInputPassword1" placeholder="Password"
                 autocomplete="current-password"
                 v-model="password">
        </div>
        <button type="submit" id="primary" class="btn-lg">Войти</button>
      </form>
  </div>

</template>

<script>
import {email, minLength, required} from "vuelidate/lib/validators";

export default {
name: "Login_login",
  data: () => ({
    email: '',
    password: ''
  }),
  validations: {
    email: {email, required},
    password: {required, minLength: minLength(6)}
  },
  methods: {
    async submitHandler (){
      if(this.$v.$invalid){
        this.$v.$touch()
        return
      }
      const formData ={
        email: this.email,
        password: this.password
      }
      try{
        await this.$store.dispatch('login', formData)
        await this.$router.push('/')
        await this.$toast.success('Вы успешно авторизировались!');
      }catch (e) {
        this.$toast.error(e);
      }
    },
  }
}
</script>

<style scoped>
  .btn-lg, .form-control-lg {
    width: 100%;
    border-color: rgba(0,0,0,0.1);
  }
  form{
    width: 20rem;
  }
  .img-home{
    box-shadow: 0 14px 28px rgba(0,0,0,0.25);
    border-radius: 0.25rem;
  }
</style>
