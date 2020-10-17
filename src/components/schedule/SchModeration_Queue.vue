<template>
  <form class="form-mod" @submit.prevent="submitHandler" action='' method="POST">
    <div class="row" style="padding-left: 1rem">
      <div class="col-md-10 text-form-group">
          Наименование предмета<span style="color: red">*</span>:
          <input type="text"
                 class="form-control"
                 placeholder="Предмет"
                 v-model="subject"/>
      </div>
    </div>
    <div class="row" style="padding: 0 0 1rem 1rem">
      <div class="col-md-5 text-form-group">
        Преподаватель #1<span style="color: red">*</span>:
        <input type="text"
               class="form-control"
               placeholder="#1 преподаватель"
               v-model="teacher1"/>
      </div>
      <div class="col-md-5 text-form-group">
        Преподаватель #2<span style="color: red">*</span>:
        <input type="text"
               class="form-control"
               placeholder="#2 преподаватель"
               v-model="teacher2"/>
      </div>
    </div>
    <div class="row" style="padding: 0 0 0 1rem">
      <div class="col-md-10">
        <button class="btn btn-success">Сохранить</button>
      </div>
    </div>
  </form>
</template>

<script>
import {required} from "vuelidate/lib/validators";

export default {
  name: "SchModeration_Queue",
  data: () => ({
    subject: null,
    teacher1: null,
    teacher2: null
  }),
  validations: {
    subject: {required},
    teacher1: {required},
    teacher2: {required}
  },
  methods:{
    async submitHandler (){
      if(this.$v.$invalid){
        this.$v.$touch()
        return
      }
      const formData = {
        subject: this.subject,
        teacher1: this.teacher1,
        teacher2: this.teacher2
      }
      try{
        await this.$store.dispatch('addQueueCard', formData)
        this.$toast.success('Изменения применены');
      }catch (e) {
        this.$toast.error('Ошибка применения изменений!');
      }
    }
  }
}
</script>

<style scoped>
form a{
  text-decoration: none;
  font-size: 1.2em;
  color: #0275d8;
  padding-left: 0.5rem;
}
form {
  font-size: 1.2em;
  font-family: 'Oswald', sans-serif;
  color: #0a0a0a;
}
.btn{
  width: 100%;
}
.form-group{
  padding: 0;
  margin: 0;
}
.form-group label{
  display: inline-flex;
}
.form-group .text-form-group {
  display: inline-flex;
}
.form-group .text-form-group  span{
  padding-right: 10px;
}
</style>
