<template>
  <div class="dropdown-login">
    <section v-if="!isLogin">
      <router-link class="router-link" tag="a" to="/login">
        <button class="btn btn-login">
          <span><img :src="require(`@/assets/img/login.svg`)" alt="На главную"/></span>
          Вход/Регистрация
        </button>
      </router-link>
    </section>
    <section v-else>
      <a class="router-link" href="" @click.prevent="logout">
        <button class="btn btn-login">
          <span><img :src="require(`@/assets/img/logout.svg`)" alt="На главную"/></span>
          Выход
        </button>
      </a>
    </section>

    <div class="dropdown-divider"></div>

    <section>
      <router-link class="router-link" tag="a" to="/">
        <button class="btn btn-login">
          Главная
        </button>
      </router-link>
    </section>

    <div class="dropdown-divider"></div>

    <section>
      <router-link class="router-link" tag="a" to="/About">
        <button class="btn btn-login">
          О прокте
        </button>
      </router-link>
    </section>

    <div class="dropdown-divider"></div>

    <section>
      <router-link class="router-link" tag="a" to="/faq">
        <button class="btn btn-login">
          FAQ
        </button>
      </router-link>
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
        font-size: 1.25em;
        width: 100%;
        text-align: left;
        border-radius: 0;
    }
    .btn-login:hover{
        background: rgba(154,198,172,0.3);
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
