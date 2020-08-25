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
      data: () => ({
        message: ''
      }),
      components:{
          Nav
      },
      computed:{
        error(){
          return this.$store.getters.error
        }
      },
      watch:{
        error(fbError){
          this.$toast.error(fbError.message);
          console.log(fbError)
        }
      }
    }
</script>

<style scoped>

</style>
