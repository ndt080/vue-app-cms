<template>
    <div class="dropdown-menu dropdown-login">
        <router-link class="router-link" to="/">
            <div class="btn btn-login">
                Главная
            </div>
        </router-link>
        <div class="dropdown-divider"></div>
        <section v-if="!isLogin">
            <router-link class="router-link" tag="a" to="/login">
                <div class="btn btn-login">
                    <span><img :src="require(`@/assets/img/login.svg`)" alt="На главную"/></span>
                    Вход
                </div>
            </router-link>
            <router-link class="router-link" tag="a" to="/registration">
                <div class="btn btn-login">
                    <span><img :src="require(`@/assets/img/arrow.svg`)" alt="На главную"/></span>
                    Регистрация
                </div>
            </router-link>
        </section>
        <section v-else>
            <router-link class="router-link" tag="a" to="/profile">
                <div class="btn btn-login">
                    <span><img :src="require(`@/assets/img/user.svg`)" alt="На главную"/></span>
                    Профиль
                </div>
            </router-link>
            <a class="router-link" href="" @click.prevent="logout">
                <div class="btn btn-login">
                    <span><img :src="require(`@/assets/img/logout.svg`)" alt="На главную"/></span>
                    Выход
                </div>
            </a>
        </section>
    </div>
</template>

<script>
    export default {
        name: "LoginNav",
        data() {
            return{
                isLogin: this.isAuth()
            }
        },
        methods:{
            async logout(){
                await this.$store.dispatch('logout')
                await this.$router.push('/login?message=logout')
            },
            isAuth(){
                const auth = localStorage.getItem('userAuth')
                return auth === 'yes';
            }
        }
    }
</script>

<style scoped>
    .btn-login{
        display: inline-flex;
        font-size: 1.25rem;
        width: 100%;
        text-align: left;
        border-radius: 0;
    }
    .btn-login:hover{
        background: rgba(51,51,255,0.15);
    }
    .btn-login img{
        width: 1.3rem;
        height: 1.3rem;
        margin-right: 10px;
    }
    .dropdown-login, .dropdown-divider{
        margin: 0;
        padding: 0;
    }
    .router-link {
        text-decoration: none;
        color: #0a0a0a;
    }
    .login{
        display: none;
    }
</style>
