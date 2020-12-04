<template>
  <div class="card-deck">
    <div class="card animate__animated animate__zoomIn" style="border: none; padding: 2rem 0.5rem 2rem 2rem; max-width: 20rem">
      <img :src="require(`@/assets/img/hacker.svg`)" class="card-img-top img-ava animate__animated animate__zoomIn" alt="avatar"
           v-if="!ava"/>
      <img :src="ava" class="card-img-top img-ava animate__animated animate__zoomIn" alt="avatar"
           v-else/>
      <button class="btn text-center"
              :class="status==='admin'?['admin']:['user']"
              style="padding: 5px; border-radius: 0.3rem; margin-bottom: 10px">{{status}}</button>
      <button class="btn text-center"
              id="primary"
              style="padding: 5px; border-radius: 0.3rem; margin-bottom: 10px"
              @click.prevent="isModeration">Изменить данные</button>
      <UserInfo v-if="!isMod"/>
      <UserInfo_Mod v-else/>
    </div>

    <div class="card animate__animated animate__bounceInDown" style="border: none; padding: 2rem 0.5rem 2rem 2rem; max-width: 100%">
      <h2 class="text-center">Здрямс{{', '+name}} &#129325;</h2>
      <UpdateLog/>
    </div>
  </div>
</template>

<script>
import FormProfile from "@/components/FormProfile";
import UserInfo from "@/components/home/profile/UserInfo";
import UserInfo_Mod from "@/components/home/profile/UserInfo_Mod";
import UpdateLog from "@/components/home/update/UpdateLog";
export default {
  name: "Home_Auth",
  components: {UpdateLog, UserInfo_Mod, UserInfo, FormProfile},
  data() {
    return{
      isMod: false
    }
  },
  computed: {
    name () {
      return this.$store.getters.info.username
    },
    status (){
      return this.$store.getters.info.status
    },
    ava (){
      return this.$store.getters.info.ava
    },
  },
  methods:{
    isModeration(){
      this.isMod = !this.isMod
      return this.isMod
    },
  },
}
</script>

<style scoped>
@media (max-width: 700px) {
  .card{
    padding-bottom: 0 !important;
  }
}
.img-ava{
  border-radius: 0.25rem !important;
  box-shadow: 0 14px 28px rgba(0,0,0,0.25) !important;
  margin-bottom: 30px;
}
.overlay-i h2{
  font-size: 2rem;
  text-align: center;
  font-weight: bold;
  color: #3740ff;
  padding-bottom: 1rem;
}
.card-title{
  background: #fff;
  border-top-left-radius: 0.25rem;
  border-top-right-radius: 0.25rem;
  padding: 7px 14px 7px 14px;
  font-size: 1.3em;
  color: #0a0a0a;
}
.list-group-item-none{
  background: rgba(255,255,255, 0);
  border-radius: 0;
}
.list-group-item-none p{
  color: #e2e3e5 !important;
}
.admin{
  color: #fff;
  background: #0a0a0a;
}
.user{
  color: #fff;
  background: #e51661;
}

</style>
