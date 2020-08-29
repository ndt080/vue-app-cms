<template>
<div>
    <div class="card-deck" style="padding: 0; margin: 0;">
        <a><p class="site-header-text"> ПРОФИЛЬ ПОЛЬЗОВАТЕЛЯ</p></a>
    </div>
    <h1>Здравствуйте, {{name}} </h1>
    <div class="card-deck" style="padding: 0; margin: 0;">
        <div class="card" style="max-width: 18rem">
            <img :src="require(`@/assets/img/hacker.svg`)" class="card-img-top" alt="avatar"
                 v-if="!ava"/>
            <img :src="ava" class="card-img-top" alt="avatar"
                 v-else/>
            <div class="card-body">
                <h5 class="card-title">{{status}}</h5>
                <a href="#" class="btn btn-primary"
                   @click.prevent="isModeration">Редактировать профиль</a>
            </div>
        </div>

        <FormProfile v-if="!isMod" />
        <FormModProfile v-else/>

    </div>
</div>
</template>

<script>
    import FormModProfile from "../components/FormModProfile";
    import FormProfile from "../components/FormProfile";
    export default {
        name: "Profile",
        metaInfo:{
            title: 'Профиль пользователя'
        },
        components: {FormProfile, FormModProfile},
        data() {
            return{
                isMod: false
            }
        },
        computed: {
            name () {
                return this.$store.getters.info.username
            },
            status (){
                return this.$store.getters.info.status
            },
            ava (){
                return this.$store.getters.info.ava
            },
        },
        methods:{
            isModeration(){
                this.isMod = !this.isMod
                return this.isMod
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
