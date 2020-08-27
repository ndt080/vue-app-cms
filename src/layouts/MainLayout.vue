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
    },
    async mounted() {
      if(!Object.keys(this.$store.getters.info).length) {
        await this.$store.dispatch('fetchInfo')
      }
      if(!Object.keys(this.$store.getters.schedule).length) {
        await this.$store.dispatch('fetchSchedule')
        this.loading = false
      }
    }
  }
</script>

<style scoped>

</style>
