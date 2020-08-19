<template>
  <div id="app">
    <component :is="layout">
      <router-view/>
    </component>
  </div>
</template>

<script>
  import EmptyLayout from "./layouts/EmptyLayout";
  import MainLayout from "./layouts/MainLayout";
  export default {
    computed:{
      layout(){
        return (this.$route.meta.layout || 'main') + '-layout'
      } ,
    },
    components: {
      EmptyLayout, MainLayout
    }
  }
</script>
<style lang="scss">
@import '~bootstrap/dist/css/bootstrap.min.css';
@import 'assets/css/common.css';
</style>
