<template>
  <div class="home-layout">
    <Nav />
    <div class="content">
      <router-view />
    </div>
    <Modal_install />
  </div>
</template>

<script>
import Nav from "../components/nav/Nav";
import Modal_install from "@/components/Modal_install";
  export default {
  name: "HomeLayout",
  components: {
    Modal_install,
    Nav
  },
  async mounted() {
    await this.$store.dispatch('fetchInfo')
    await this.$store.dispatch('fetchPostsUpdate')
  }
}

</script>

<style scoped>

</style>
