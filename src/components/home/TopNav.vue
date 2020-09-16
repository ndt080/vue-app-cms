<template>
  <header class="topNav" >
    <h4 class="text-left">
      МЕНЕДЖЕР РАСПИСАНИЯ ФПМИ БГУ
    </h4>
    <h4 class="text-right" v-if="isLogin">перейти к <router-link to="/schedule">расписанию занятий</router-link></h4>
  </header>
</template>

<script>
    export default {
        name: "TopNav",
      props: ['isLogin']
    }
</script>

<style scoped>
  header {
    display: flex;
    width: 100%;
    background: rgba(255,255,255,1);
    justify-content: space-between;
    align-items: center;
    padding: 15px 5%;
    z-index: 1000;
    border-radius: 1rem;
  }
  header h4{
    padding-top: 5px;
    line-height: 1em;
    color: #0e0e0e;
  }
  header a{
    text-decoration: none;
  }
</style>
