<template>
  <form class="form-group animate__animated animate__zoomIn" @submit.prevent="submitHandler" action='' method="POST">
    <table class="table table-hover">
      <tbody>
        <tr class="form-group">
          <td class="table-header">Аватар</td>
          <td class="table-section">
            <input type="text"
                   class="form-control"
                   placeholder="Вставьте ссылку на картинку"
                   v-model.trim="dataAva"/>
          </td>
        </tr>
        <tr class="form-group">
          <td class="table-header">ФИО</td>
          <td class="table-section">
            <input type="text"
                   class="form-control"
                   v-model.trim="dataName"/>
          </td>
        </tr>
        <tr class="form-group">
          <td class="table-header">Дата рождения</td>
          <td class="table-section">
            <input type="date"
                   class="form-control"
                   v-model.trim="dataDateBirth"/>
          </td>
        </tr>
        <tr class="form-group">
          <td class="table-header">Курс</td>
          <td class="table-section">
            <input type="number"
                   class="form-control"
                   v-model.trim="dataCourse"/>
          </td>
        </tr>
        <tr class="form-group">
          <td class="table-header">Группа</td>
          <td class="table-section">
            <input type="number"
                   class="form-control"
                   v-model.trim="dataGroup" />
          </td>
        </tr>
      </tbody>
    </table>
    <button class="btn btn-success">СОХРАНИТЬ</button>
  </form>
</template>

<script>
    import {email, minLength, required} from "vuelidate/lib/validators";

    export default {
        name: "UserInfo_Mod",
        data: () => ({
            username: '',
            dateBirth: '',
            course: '',
            group: '',
            ava: ''
        }),
        validations: {
            dataName: {},
            dataDateBirth: {},
            dataCourse: {},
            dataGroup: {},
            dataAva: {},
        },
        computed: {
            dataName: {
                get(){
                    return this.$store.getters.info.username
                },
                set(value){
                    this.$store.getters.info.username = value
                    this.username = value
                }
            },
            dataDateBirth: {
                get(){
                    return this.$store.getters.info.dateBirth
                },
                set(value) {
                    this.$store.getters.info.dateBirth = value
                    this.dateBirth = value
                }
            },
            dataCourse: {
                get(){
                    return this.$store.getters.info.course
                },
                set(value) {
                    this.$store.getters.info.course = value
                    this.course = value
                }
            },
            dataGroup: {
                get(){
                    return this.$store.getters.info.group
                },
                set(value) {
                    this.$store.getters.info.group = value
                    this.group = value
                }
            },
            dataAva: {
                get(){
                    return this.$store.getters.info.ava
                },
                set(value) {
                    this.$store.getters.info.ava = value
                    this.ava = value
                }
            },
        },
        methods:{
            async submitHandler (){
                if(this.$v.$invalid){
                    this.$v.$touch()
                    return
                }

                const formData ={
                    username: this.username,
                    dateBirth: this.dateBirth,
                    course: this.course,
                    group: this.group,
                    ava: this.ava,
                }
                try{
                    await this.$store.dispatch('modProfile', formData)
                    this.$toast.success('Изменения применены');
                }catch (e) {
                    this.$toast.error('Ошибка применения изменений!');
                }
            }
        }
    }
</script>

<style scoped>
  .btn{
      width: 100%;
  }
  .table-header{
     font-weight: bold;
     color: #e51661;
     width: 45%;
   }
  .table-section{
    font-weight: bold;
    color: #0a0a0a;
  }
</style>
