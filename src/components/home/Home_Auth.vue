<template>
  <div class="home-auth-content">
    <h2 class="text-center">Здрямс{{', '+name}} &#129325;</h2>
    <div class="card-deck" style="padding: 0; margin: 0 0 0 -20px !important;">
      <div class="card card-profile-settings" style="max-width: 15%">
        <img :src="require(`@/assets/img/hacker.svg`)" class="card-img-top" alt="avatar"
             v-if="!ava"/>
        <img :src="ava" class="card-img-top" alt="avatar"
             v-else/>
        <div class="card-body">
          <h5 class="card-title text-center"
              :class="status==='admin'?['list-group-item-primary']:['list-group-item-success']"
              style="padding: 5px; border-radius: 0.3rem">{{status}}</h5>
          <a href="#" class="btn btn-primary"
             style="width: 100%; margin-bottom: 10px"
             @click.prevent="isModeration">Редактировать профиль</a>
          <UserInfo v-if="!isMod"/>
          <UserInfo_Mod v-if="isMod"/>
        </div>
      </div>

      <div class="card-deck card-deck-common-settings" style="max-width: 75%">
        <div class="card card-common-settings" style="max-width: 48rem">
          <div class="card-title">ОБЩИЕ НАСТРОЙКИ:</div>
          <div class="card-body">
          </div>
        </div>
        <div class="card card-common-settings" style="max-width: 48rem">
          <div class="card-title">-- --</div>
          <div class="card-body">
          </div>
        </div>

        <div class="w-50 d-none d-sm-block d-md-none"><!-- wrap every card on sm--></div>
        <div class="w-50 d-none d-lg-block d-md-block d-xl-none"><!-- wrap every 2 on lg and md--></div>

        <UpdateLog/>
      </div>
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
@media (max-width: 700px){
  .card-profile-settings{
    max-width: 48rem !important;
  }
}
@media (max-width: 1440px) {
  .card-deck-common-settings {
    max-width: 48rem !important;
  }
}
@media (max-width: 1280px) {
  .card-deck-common-settings {
    max-width: 60%!important;
  }
}
@media (max-width: 1150px) {
  .card-deck-common-settings {
    max-width: 24rem !important;
  }
}
.card{
  margin: 10px 10px 10px 20px;
  background-color: rgba(247, 247, 247, 0.2) !important;
  border: none !important;
  color: #0a0a0a;
}

.overlay-i h2{
  font-size: 2rem;
  text-align: center;
  font-weight: bold;
  padding-top: 1rem;
  color: #f0ad4e;
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
</style>
