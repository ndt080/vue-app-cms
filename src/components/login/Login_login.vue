<template>
  <form @submit.prevent="submitHandler">
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
    <button type="submit" class="btn-lg btn-primary">Войти</button>
  </form>
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
      }catch (e) {}
    },
  }
}
</script>

<style scoped>
.btn-lg, .form-control-lg {
  width: 100%;
}
form{
  width: 20rem;
}
</style>
