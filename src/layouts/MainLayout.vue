<template>
  <div class="main-layout">
<!--    <Nav />-->
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script>
  import Nav from "../components/nav/Nav";
  export default {
    name: "MainLayout",
    components: {
      Nav
    },
    async mounted() {
      await this.$store.dispatch('fetchInfo')
      await this.$store.dispatch('fetchSchedule')
    }
  }
</script>

<style scoped>

</style>
