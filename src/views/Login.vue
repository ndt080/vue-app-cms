<template>
  <div class="card-deck">
    <h1>Вход</h1>
    <form @submit.prevent="submitHandler">
      <div class="form-group">
        <label for="exampleInputEmail1">Электронная почта</label>
        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"
                v-model.trim="email"
        >
        <small id="emailHelp" class="form-text text-muted">Мы никогда не будем делиться вашей электронной почтой с кем-либо еще.</small>
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Пароль</label>
        <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password"
               autocomplete="current-password"
               v-model="password">
      </div>
      <button type="submit" class="btn btn-primary">Войти</button>
      <div class="text-center p-t-46 p-b-20">
        <span class="txt2">
            или <router-link class="router-link" to="/registration">зарегистрироваться</router-link>
        </span>
      </div>
    </form>
  </div>
</template>

<script>
  import {email, required, minLength} from 'vuelidate/lib/validators'
  export default {
    name: 'Login',
    metaInfo:{
      title: 'Вход'
    },
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
        }catch (e) {}
      }
    }
  }
</script>

<style scoped>
  .btn{
    width: 100%;
  }
</style>
