<template>
  <div class="main-layout">
    <Nav />
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script>
  import Nav from "../components/Nav";
  export default {
    name: "MainLayout",
    components: {
      Nav
    }
  }
</script>

<style scoped>

</style>
