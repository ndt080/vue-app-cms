<template>
<div>
    <div class="card-deck" style="padding: 0; margin: 0;">
        <a><p class="site-header-text"> ПРОФИЛЬ ПОЛЬЗОВАТЕЛЯ</p></a>
    </div>
    <h1>Здравствуйте, {{name}} </h1>
    <div class="card-deck" style="padding: 0; margin: 0;">
        <div class="card" style="max-width: 18rem">
            <img :src="require(`@/assets/img/hacker.svg`)" class="card-img-top" alt="avatar" />
            <div class="card-body">
                <h5 class="card-title">{{status}}</h5>
                <a href="#" class="btn btn-primary">Редактировать профиль</a>
            </div>
        </div>

        <div class="card" style="max-width: 60rem">
            <div class="card-body">
                <table class="table table-hover">
                    <tbody>
                    <tr>
                        <td>ФИО</td>
                        <td>{{name}}</td>
                    </tr>
                    <tr>
                        <td>Дата рождения</td>
                        <td>{{dateBirth}}</td>
                    </tr>
                    <tr>
                        <td>Курс/группа</td>
                        <td>курс {{course}} группа {{group}}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
</template>

<script>
    export default {
        name: "Profile",
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
            status (){
                return this.$store.getters.info.status
            },
        },
    }
</script>

<style scoped>
    .card-img-top{
        margin: 0 auto;
        max-width: 15rem;
        max-height: 15rem;
        padding-top: 20px;
    }
    .card .btn {
        width: 100%;
    }
     .card-title{
         border-radius: 1.3rem;
         background: #5cb85c;
         text-align: center;
         padding: 2px;
     }
</style>
