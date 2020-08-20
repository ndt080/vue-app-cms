<template>
  <div class="empty-layout">
    <Nav />
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script>
  import Nav from "../components/Nav";
    export default {
      name: "EmptyLayout",
      components:{
          Nav
      }
    }
</script>

<style scoped>

</style>
