<template>
  <table class="table table-hover">
    <tbody>
    <tr>
      <td class="table-header">ФИО</td>
      <td class="table-section">{{name}}</td>
    </tr>
    <tr>
      <td class="table-header">Дата рождения</td>
      <td class="table-section">{{dateBirth}}</td>
    </tr>
    <tr>
      <td class="table-header">Курс/группа</td>
      <td class="table-section">курс {{course}} группа {{group}}</td>
    </tr>
    </tbody>
  </table>
</template>

<script>
    export default {
        name: "UserInfo",
        computed: {
            name () {
                return this.$store.getters.info.username
            },
            dateBirth (){
                return this.$store.getters.info.dateBirth
            },
            course (){
                return this.$store.getters.info.course
            },
            group (){
                return this.$store.getters.info.group
            },
        },
    }
</script>

<style scoped>
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
