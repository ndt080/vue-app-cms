<template>
  <div class="home-layout">
    <Nav />
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script>
  import Nav from "../components/Nav";
    export default {
        name: "HomeLayout",
        components: {
          Nav
        }
    }

</script>

<style scoped>
  .home-layout{
    display: inline-flex;
    position: absolute;
    width: 100vw;
    height: 100vh;
    background: rgb(0,0,0);
    background: linear-gradient( rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9) ), url('../assets/img/world.svg');
    background-repeat: no-repeat;
    background-size: cover;
    -webkit-background-size: cover;
    -o-background-size: cover;
    -moz-background-size: cover;
    background-attachment: fixed;
    background-position: center;
  }
</style>
