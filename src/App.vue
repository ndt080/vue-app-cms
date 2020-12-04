<template>
  <div id="app">
    <Toasts
      :max-messages="3"
      :closeable="true"
    ></Toasts>
    <component :is="layout">
      <router-view/>
    </component>
  </div>
</template>

<script>
  import EmptyLayout from "./layouts/EmptyLayout";
  import MainLayout from "./layouts/MainLayout";
  import HomeLayout from "./layouts/HomeLayout";
  export default {
    name: "App",
    computed:{
      layout(){
        return (this.$route.meta.layout || 'main') + '-layout'
      } ,
    },
    components: {
      EmptyLayout, MainLayout, HomeLayout
    },
    async mounted() {
      let date = new Date();
      if (date.getDay() === 6 && (date.getHours() === 21) && (date.getMinutes() === 43)) {
        await this.$store.dispatch('newWeekSchedule')
      }
    },
  }
</script>
<style lang="scss">
@import '~bootstrap/dist/css/bootstrap.min.css';
@import '~animate.css';
@import './assets/css/common.css';

  .toast .progress{
    display: none;
  }
</style>
