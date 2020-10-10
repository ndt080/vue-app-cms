<template>
  <div class="overlay-i">
    <TopNav/>
    <Home_Auth/>
  </div>
</template>

<script>

import TopNav from "../components/home/TopNav";
import Home_Auth from "@/components/home/Home_Auth";
export default {
  name: 'Home',
    components: {Home_Auth, TopNav},
    metaInfo:{
    title: 'Главная'
  },
}
</script>

<style scoped>
.overlay-i {
  padding: 2% 5rem 3% 3%;
  margin: 0 auto;
  width: 96vw;
  min-height: 100vh;
  font-family: 'Oswald', sans-serif;
  color: rgb(154,198,172);
}
  @media (max-width: 500px) {
    .overlay-i{
      padding: 3% 4.4rem 3% 3%;
    }
    footer{
      padding: 0 5rem 0 1.5rem !important;
    }
  }
  footer{
    display: inline-flex;
    justify-content: space-between;
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
    padding: 0 5rem 0 3rem;
  }
  footer p{
    font-size: 1.3em !important;
    color: #9ac6ac !important;
  }
</style>
