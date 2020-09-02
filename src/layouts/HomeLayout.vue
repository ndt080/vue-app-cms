<template>
  <div class="home-layout">
    <Nav />
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script>
  import Nav from "../components/nav/Nav";
    export default {
        name: "HomeLayout",
        components: {
          Nav
        },
    }

</script>

<style scoped>

</style>
