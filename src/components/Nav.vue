<template>
  <div class="nav" v-bind:class="{ active: isOpen }">
    <div class="nav-container-top" v-bind:class="{ active: isOpen }">
      <!-- Index link -->
      <div class="bars">
        <div class="dropleft">
          <a href="#" data-toggle="dropdown">
            <img class="nav-elements" :src="require(`@/assets/img/3.svg`)" alt="На главную"/>
          </a>
          <div class="dropdown-menu dropdown-login">
            <div class="btn btn-login">
              <router-link class="router-link" to="/">Главная</router-link>
            </div>
            <div class="dropdown-divider"></div>
            <div class="btn btn-login">
              <span><img :src="require(`@/assets/img/login.svg`)" alt="На главную"/></span>
              <router-link class="router-link" to="/login">Вход</router-link>
            </div>
            <div class="btn btn-login">
              <span><img :src="require(`@/assets/img/arrow.svg`)" alt="На главную"/></span>
              <router-link class="router-link" to="/registration">Регистрация</router-link>
            </div>
          </div>
        </div>
      </div>
      <!-- notification -->
      <div class="bars">
        <div class="dropleft">
          <a href="#" data-toggle="dropdown">
            <img :src="require(`@/assets/img/notification-on.svg`)" id="notification-alarm" title="Уведомления" class="nav-elements"  alt="ДР"/>
          </a>
          <div class="dropdown-menu">
            <div class="alert alert-warning" style="min-width: 200px">
              Новый адрес сайта <a href="https://fpmi.spiralarms.org">fpmi.spiralarms.org</a>. Обновите свои
              закладки.
            </div>
            <list class="dropdown-item disabled" id="birthdays-list"><b style="font-size: 20px;">ДНИ
              РОЖДЕНИЯ:</b>
            </list>
          </div>
        </div>
      </div>
      <!-- helpful link -->
      <div class="bars">
        <a href="#">
          <img :src="require(`@/assets/img/helpful.svg`)"  title="Полезная информация и материалы" class="nav-elements" alt="Полезное" />
        </a>
      </div>
      <!-- light/night mode -->
      <div class="bars">
        <input type="checkbox" class="checkbox" id="theme-switcher-checkbox"/>
        <label for="theme-switcher-checkbox" title="Light/Night mode"></label>
      </div>
    </div>
    <!-- empty -->
    <a href="#" class="nav-elements-empty">
      <div class="bars"></div>
    </a>
    <!-- Bottom link block -->
    <div class="nav-container-bottom" v-bind:class="{ active: isOpen }">
      <!--GIT link -->
      <div class="bars">
        <a href="https://gitlab.com/gera-univ/site/pi14-schedule">
          <img :src="require(`@/assets/img/git.svg`)"  title="Присоединяйся к разработке проекта!" class="nav-elements-bottom" alt="Git" />
        </a>
      </div>
    </div>

    <!-- trigger -->
    <a href="#" v-bind:class="{ active: isOpen }" class="nav__trigger"
                v-on:click="openMenu()">
      <div class="bars"></div>
    </a>
    <!-- Menu content -->
    <div class="nav__content" v-bind:class="{ active: isOpen }">
      <nav class="nav__list" v-bind:class="{ active: isOpen }">
        <ul>
          <li class="nav__item"><router-link class="router-link" to="/">Главная</router-link></li>
          <li class="nav__item"><router-link class="router-link" to="/schedule">13 гр. 2 курс</router-link></li>
          <li class="nav__item"><router-link class="router-link" to="/schedule">14 гр. 2 курс</router-link></li>
          <li class="nav__item"><router-link class="router-link" to="/schedule">13 гр. 3 курс</router-link></li>
          <li class="nav__item"><router-link class="router-link" to="/about">О проекте</router-link></li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Nav",
    data() {
      return{
        isOpen: false
      }
    },
    methods:{
      openMenu(event) {
        this.isOpen = !this.isOpen;
      }
    }
  }

</script>

<style scoped>
  *,
  *:before,
  *:after {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
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
  .nav {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: 4.5rem;
    background-color: #0a0a0a;
    -webkit-transition: 1s cubic-bezier(0.645, 0.045, 0.355, 1);
    transition: 1s cubic-bezier(0.645, 0.045, 0.355, 1);
    will-change: width;
    z-index: 1;
  }
  .nav.active {
    width: 100vw;
  }

  .nav__trigger {
    display: block;
    position: absolute;
    top: 50%;
    right: 1rem;
    margin-top: -10px;
    padding: 8px 0;
    -webkit-transition: 0.2s ease-in-out;
    transition: 0.2s ease-in-out;
    z-index: 10;
  }
  .nav__trigger .bars {
    position: relative;
  }
  .nav__trigger .bars, .nav__trigger .bars:before, .nav__trigger .bars:after {
    width: 40px;
    height: 4px;
    background-color: #9ac6ac;
    border-radius: 4px;
    -webkit-transition: 0.2s ease-in-out;
    transition: 0.2s ease-in-out;
  }
  .nav__trigger .bars:before, .nav__trigger .bars:after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    will-change: transform;
  }
  .nav__trigger .bars:before {
    -webkit-transform: translateY(-8px);
    transform: translateY(-8px);
  }
  .nav__trigger .bars:after {
    -webkit-transform: translateY(8px);
    transform: translateY(8px);
  }
  .nav__trigger.active {
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }
  .nav__trigger.active .bars:before, .nav__trigger.active .bars:after {
    -webkit-transform: translateX(0) rotate(-90deg);
    transform: translateX(0) rotate(-90deg);
  }

  .nav__content {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    max-width: 1200px;
    padding: 1rem 3.75rem 1rem 2.75rem;
    opacity: 0;
    visibility: hidden;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    -webkit-transition: 0s linear 0.25s;
    transition: 0s linear 0.25s;
  }
  .nav__content.active {
    visibility: visible;
    opacity: 1;
    -webkit-transition: 0s linear 1s;
    transition: 0s linear 1s;
  }
  .nav__content.active .nav__item a {
    opacity: 1;
    -webkit-transform: translateY(0);
    transform: translateY(0);
    -webkit-transition-property: opacity, color, -webkit-transform;
    transition-property: opacity, color, -webkit-transform;
    transition-property: transform, opacity, color;
    transition-property: transform, opacity, color, -webkit-transform;
    -webkit-transition-duration: 0.55s, 0.55s, 0.3s;
    transition-duration: 0.55s, 0.55s, 0.3s;
    -webkit-transition-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1), ease-in-out, ease-in-out;
    transition-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1), ease-in-out, ease-in-out;
  }
  .nav__content.active .nav__list .nav__item:nth-of-type(1) a {
    -webkit-transition-delay: 0s, 0s, 0s;
    transition-delay: 0s, 0s, 0s;
  }
  .nav__content.active .nav__list .nav__item:nth-of-type(2) a {
    -webkit-transition-delay: 0.5s, 0.7s, 0s;
    transition-delay: 0.5s, 0.5s, 0s;
  }
  .nav__content.active .nav__list .nav__item:nth-of-type(3) a {
    -webkit-transition-delay: 0.75s, 0.75s, 0s;
    transition-delay: 0.75s, 0.75s, 0s;
  }
  .nav__content.active .nav__list .nav__item:nth-of-type(4) a {
    -webkit-transition-delay: 1s, 1s, 0s;
    transition-delay: 1s, 1s, 0s;
  }
  .nav__content.active .nav__list .nav__item:nth-of-type(5) a {
    -webkit-transition-delay: 1.25s, 1.25s, 0s;
    transition-delay: 1.25s, 1.25s, 0s;
  }
  .nav__content.active .nav__list .nav__item:nth-of-type(6) a {
    -webkit-transition-delay: 0.25s, 0.25s, 0s;
    transition-delay: 0.25s, 0.25s, 0s;
  }
  .nav__content.active .nav__list .nav__item:nth-of-type(7) a {
    -webkit-transition-delay: 0.3s, 0.3s, 0s;
    transition-delay: 0.3s, 0.3s, 0s;
  }
  .nav__content.active .nav__list .nav__item:nth-of-type(8) a {
    -webkit-transition-delay: 0.35s, 0.35s, 0s;
    transition-delay: 0.35s, 0.35s, 0s;
  }
  .nav__content.active .nav__list .nav__item:nth-of-type(9) a {
    -webkit-transition-delay: 0.4s, 0.4s, 0s;
    transition-delay: 0.4s, 0.4s, 0s;
  }

  .nav__list ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .nav__item {
    overflow: hidden;
  }
  .nav__item a {
    display: inline-block;
    color: #9ac6ac;
    text-decoration: none;
    font-size: 2rem;
    font-size: 8vw;
    font-size: 14vmin;
    font-weight: 300;
    font-family: 'Oswald', sans-serif;
    line-height: 7rem;
    opacity: 0;
    -webkit-transform: translateY(100%);
    transform: translateY(100%);
    -webkit-transition: 0.5s cubic-bezier(0.645, 0.045, 0.355, 1);
    transition: 0.5s cubic-bezier(0.645, 0.045, 0.355, 1);
    will-change: transform, opacity;
  }
  .nav__item a:hover {
    color: white;
  }
  .nav__divider {
    margin: 1.75rem 0 1.5rem;
    width: 100%;
    height: 2px;
    background-color: #9ac6ac;
    -webkit-transform: scaleX(0);
    transform: scaleX(0);
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transition: 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    transition: 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  }

  .nav .nav-elements{
    margin: 0.4rem;
    width: 3.8rem;
    display: inline-block;
  }
  .nav .nav-elements-empty{
    margin: 0.3rem;
    height: 75%;
  }
  .nav .nav-container-bottom{
    display: inline-block;
    position: absolute;
    bottom: 0;
  }
  .nav .nav-elements-bottom{
    margin: 0.4rem;
    width: 3.8rem;
  }
  .nav .nav-container-top{
    display: inline-block;
    position: absolute;
    top: 0;
  }
  .nav .nav-container-bottom.active{
    -webkit-transition: 0s linear 3s;
    transition: 0s linear 3s;
    display: none;
  }
  .nav .nav-container-top.active{
    -webkit-transition: 0s linear 3s;
    transition: 0s linear 3s;
    display: none;
  }
</style>
