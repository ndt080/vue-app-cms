<template>
  <div class="empty-layout">
<!--    <Nav />-->
    <TopNav />
    <div class="content">
      <router-view />
    </div>
    <Modal_install />
  </div>
</template>

<script>
  import Nav from "../components/nav/Nav";
  import firebase from "firebase";
  import Modal_install from "@/components/Modal_install";
  import TopNav from "@/components/nav/TopNav";
    export default {
      name: "EmptyLayout",
      data: () => ({
        message: ''
      }),
      components:{
        TopNav,
        Modal_install,
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
