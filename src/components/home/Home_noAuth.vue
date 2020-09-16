<template>
  <div>
    <!-- GIF LOGO BOX -->
    <div class="container-img-i">
      <img class="img-body" :src="require(`@/assets/img/logo.gif`)" alt="ЛОГО" />
    </div>
    <!-- TEXT CONTENT -->
    <h1>WELCOME, ФПМИ-ШНИК БГУ!!!</h1>
    <p class="text-body-i">"Оставь надежду всяк сюда входящий, боль и страдания не заставят себя ждать. Соседи не забудут крик бомбящий,
      ведь Орешко будет завтра лабу принимать..."
    </p>
    <h2>чтобы в полной мере воспользователь функциями приложения, необходимо <br />
      <router-link to="/login">войти</router-link> или <router-link to="/registration">зарегистрироваться</router-link></h2>
  </div>
</template>

<script>
export default {
name: "Home_noAuth"
}
</script>

<style scoped>
@media (max-width: 500px) {
  .container-img-i{
    padding: 5% 0 0 0 !important;
  }
  .img-body{
    width: 18rem !important;
    height: 12rem;
  }
  .text-body-i{
    font-size: 20px !important;
    padding: 0 !important;
  }
}
.text-body-i{
  padding: 0 5rem 0 5rem;
}
.overlay-i h1{
  font-size: 45px;
  text-align: center;
  font-weight: bold;
}
.overlay-i h2{
  font-size: 2rem;
  text-align: center;
  font-weight: bold;
  padding-top: 1rem;
}
.overlay-i p{
  font-size: 24px;
  color: #e6e6e6;
  text-align: center;
  padding-top: 0.3rem;
}
.overlay-i a{
  text-decoration: none;
}
.container-img-i{
  position: relative;
  display: block;
  margin: 0 auto;
  padding-left: 1.5%;
  padding-top: 2rem;
  text-align: center;
}
.img-body{
  width: 20rem;
  height: 15rem;
  border-radius: 0.5rem;
  margin-bottom: 30px;
}
</style>
