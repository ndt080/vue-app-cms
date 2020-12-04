<template>
  <div class="overlay-i">
    <div></div>
    <div style="padding-top: 7rem;">
      <Loader v-if="loading"
              style="margin-top: 2rem"
      />
      <Home_Auth v-else/>
    </div>
  </div>
</template>

<script>

import TopNav from "../components/nav/TopNav";
import Home_Auth from "@/components/home/Home_Auth";
export default {
  name: 'Home',
    components: {Home_Auth, TopNav},
    metaInfo:{
    title: 'Главная'
  },
  data() {
    return{
      loading: true,
    }
  },
  async mounted() {
    await this.$store.dispatch('fetchInfo')
    this.loading = false
  },
}
</script>

<style scoped>
.overlay-i {
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  width: 98vw;
  min-height: 100vh;
  padding: 0 3% 1rem 3%;

  font-family: 'Oswald', sans-serif;
  color: #0a0a0a;
}

</style>
