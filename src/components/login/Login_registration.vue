<template>
  <form class="form-horizontal" action='' method="POST"
        @submit.prevent="submitHandler">
      <div class="form-group">
        <!-- Username -->
        <label class="control-label"  for="text">Как вас называть?</label>
          <input type="text" id="text" name="text" placeholder="" class="form-control"
                 v-model.trim="username">
        <small class="form-text text-muted">Используется для записи в очередь</small>
      </div>
      <div class="control-group">
          <!-- DateBirth -->
          <label class="control-label" for="date">Когда вы родились?</label>
          <input type="date" id="date" name="date" placeholder="" class="form-control"
                 v-model.trim="dateBirth">
          <p class="help-block"></p>
      </div>

      <div class="form-group">
          <!-- Course and group -->
          <label class="mr-sm-2" for="inlineFormCustomSelect">Курс</label>
          <select class="custom-select mr-sm-2" id="inlineFormCustomSelect"
                  v-model.trim="course">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="3">4</option>
          </select>
          <label class="mr-sm-2" for="inlineFormCustomSelect1">Группа</label>
          <select class="custom-select mr-sm-2" id="inlineFormCustomSelect1"
                  v-model.trim="group">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
              <option value="13">13</option>
              <option value="14">14</option>
              <option value="15">15</option>
          </select>
          <small class="form-text text-muted">Используется для корректного отображения расписания занятий</small>
      </div>

      <div class="control-group">
        <!-- E-mail -->
        <label class="control-label" for="email">Электронная почта</label>
          <input type="text" id="email" name="email" placeholder="email" class="form-control"
                 autocomplete="current-password"
                 v-model.trim="email">
          <p class="help-block"></p>
      </div>

      <div class="control-group">
        <!-- Password-->
        <label class="control-label" for="password">Пароль</label>
          <input type="password" id="password" name="password" placeholder="" class="form-control"
                 autocomplete="current-password"
                 v-model.trim="password">
      </div>
      <div class="control-group" style="margin-top: 1.5rem;">
        <button class="btn btn-success">Зарегистрироваться</button>
      </div>
  </form>
</template>
<script>
    import {email, required, minLength} from 'vuelidate/lib/validators'
    export default {
        name: 'Login_registration',
        metaInfo:{
            title: 'Регистрация'
        },
        data: () => ({
            email: '',
            password: '',
            username: '',
            dateBirth: '',
            course: '',
            group: ''
        }),
        validations: {
            email: {email, required},
            password: {required, minLength: minLength(6)},
            username: {required},
            dateBirth: {required},
            course: {required},
            group: {required},
        },
        methods: {
            async submitHandler (){
                if(this.$v.$invalid){
                    this.$v.$touch()
                    return
                }
                const formData ={
                    email: this.email,
                    password: this.password,
                    username: this.username,
                    dateBirth: this.dateBirth,
                    course: this.course,
                    group: this.group,
                }
                try{
                    await this.$store.dispatch('register', formData)
                    await this.$router.push('/login')
                }catch (e) {}
            },
        }
    }
</script>
<style scoped>
.btn, .form-control {
  width: 100%;
}
form{
  width: 20rem;
  font-size: 1.2em;
}
</style>
