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
    }
  }
</script>
<style lang="scss">
@import '~bootstrap/dist/css/bootstrap.min.css';
@import './assets/css/common.css';

  .toast-icon, .toast .progress{
    display: none;
  }
</style>
