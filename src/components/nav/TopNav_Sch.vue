<template>
  <div class="topNav" >
    <section class="desktop text-left animate__animated animate__zoomIn" style="display: inline-flex">
      <header class="logo">
        <img alt="logo"
             width="35"
             height="35"
             :src="require(`@/assets/img/sche1.svg`)"
        />
        <p>&nbsp; &nbsp;</p>
        <router-link to="/">
          schedule.fpmi
        </router-link>
        <p style="line-height: 1em; padding: 6.5px 25px 0 15px; color: #3740ff">
          {{course}}&nbsp;course
          {{group}}&nbsp;group
        </p>
      </header>

      <section class="nav">
        <ul class="nav__links animate__animated animate__zoomIn">
          <li>
            <button class="btn btn-dark" v-if="isLogin && !isMod" @click.prevent="isModeration">
              <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
              </svg>
              <span>&nbsp;РЕДАКТИРОВАТЬ</span>
            </button>
            <button class="btn btn-danger" v-if="isLogin && isMod" @click.prevent="isModeration">ОТМЕНИТЬ</button>
          </li>
          <li>
            <select class="custom-select my-1 mr-sm-2"
                    @change.prevent="refresh()"
                    v-model="selected"
                    :disabled="isQSh">
              <option value="actual_week">Текущая неделя</option>
              <option value="next_week">Следующая неделя</option>
            </select>
          </li>
          <li>
            <button class="btn btn-light border"
                    title="Показать/закрыть очередь"
                    v-if="isLogin"
                    @click.prevent="isQueueShow">
              <img class="scroll-icon" :src="require(`@/assets/img/queue.svg`)" alt="QUEUE"/>
              ОЧЕРЕДЬ
            </button>
          </li>
          <li>
            <button class="btn btn-dark"
                    title="Показать/закрыть скроллбар"
                    v-if="isLogin"
                    @click.prevent="isScroll">
              <img class="scroll-icon" :src="require(`@/assets/img/scroll.svg`)" alt="Scrl"/>
            </button>
          </li>
          <li>
            <button class="btn btn-dark"
                    title="Обновить расписание"
                    @click.prevent="refresh()">
              <img class="scroll-icon" :src="require(`@/assets/img/repeat.svg`)" alt="Repeat"/>
            </button>
          </li>
        </ul>
      </section>
    </section>

    <section class="desktop text-right animate__animated animate__zoomIn" style="display: inline-flex">
      <div class="dropdown">
        <a href="#" data-toggle="dropdown">
          <img alt="logo"
               width="50rem"
               :src="require(`@/assets/img/2.svg`)"
          />
        </a>
        <section class="dropdown-menu">
          <DropNav />
        </section>
      </div>
    </section>

    <section class="mobile animate__animated animate__zoomIn">
      <nav>
        <ul class="nav__links">
          <li>
            <select class="custom-select my-1 mr-sm-2"
                    @change.prevent="refresh()"
                    v-model="selected"
                    :disabled="isQSh">
              <option value="actual_week">Текущая неделя</option>
              <option value="next_week">Следующая неделя</option>
            </select>
          </li>
          <li>
            <button class="btn btn-dark" v-if="isLogin && !isMod" @click.prevent="isModeration">
              <svg width="20" height="20" viewBox="0 0 16 16" class="bi bi-pencil-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
              </svg>
            </button>
            <button class="btn btn-danger" v-if="isLogin && isMod" @click.prevent="isModeration">
              <svg width="20" height="20" viewBox="0 0 16 16" class="bi bi-x" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
              </svg>
            </button>
          </li>
          <li class="droptop">
              <a href="#" data-toggle="dropdown">
                <img alt="logo"
                     width="30"
                     height="30"
                     :src="require(`@/assets/img/2.svg`)"
                />
              </a>
            <section class="dropdown-menu">
              <DropNav />
            </section>
          </li>
          <li>
            <button class="btn btn-dark"
                    title="Обновить расписание"
                    @click.prevent="refresh()">
              <img height="20" width="20" :src="require(`@/assets/img/repeat.svg`)" alt="Repeat"/>
            </button>
          </li>
          <li>
            <button class="btn btn-light border"
                    title="Показать/закрыть очередь"
                    v-if="isLogin"
                    @click.prevent="isQueueShow">
              <img :src="require(`@/assets/img/queue.svg`)" width="25" height="25" alt="QUEUE"/>
              QUEUE
            </button>
          </li>
        </ul>
      </nav>
    </section>

  </div>
</template>

<script>
import DropNav from "@/components/nav/DropNav";
export default {
  name: "TopNav_Sch",
  components: {DropNav},
  data() {
    return {
      selected: 'actual_week',
      isLogin: this.isAuth(),
    };
  },
  computed:{
    isQSh(){
      return this.$store.getters.queueShow;
    },
    isScroller(){
      return this.$store.getters.scrollerShow;
    },
    isMod(){
      return this.$store.getters.editSchedule;
    },
    group (){
      return this.$store.getters.info.group
    },
    course (){
      return this.$store.getters.info.course
    },
  },
  methods: {
    refresh(){
      this.$store.dispatch('refresh');
    },
    isAuth(){
      const auth = localStorage.getItem('userAuth')
      return auth === 'yes';
    },
    isModeration(){
      return this.$store.commit('setEditSchedule', !this.isMod)
    },
    isScroll(){
      return this.$store.commit('setScrollerShow', !this.isScroller);
    },
    isQueueShow(){
      this.isQSh?this.$router.push('/schedule'):this.$router.push('/queue')
      return this.$store.commit('setQueueShow', !this.isQSh);
    },
  },
  watch:{
    selected: {
      immediate: true,
      deep: true,
      handler() {
        this.$store.commit('setSelectedSchedule', this.selected)
      }
    },
  },
}
</script>


<style scoped>
.mobile{
  display: none !important;
}
.topNav {
  display: flex;
  position: fixed;
  width: 100%;
  height: 4.3rem;
  right: 0;
  left: 0;
  background: rgba(255,255,255,1);
  box-shadow: 0 4px 8px rgba(0,0,0,0.25);
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem 0 1rem;
  z-index: 10;
}
.topNav header{
  font-size: 1.5em;
  margin: 20px 0 0 0;
}
.topNav header p{
  padding: 0 0 0 5px;
}
.topNav header a{
  color: #1f1f1f;
  padding: 0 0 0 5px;
  text-decoration: none;
}
.topNav header img{
  margin: 5px 0 0 5px;
}
.logo{
  display: inline-flex;
}
.install{
  font-size: 1.2em;
  color: #fff;
  background: #3740ff;
  padding: 5px 25px 5px 25px;
  margin: 5px 1.2rem 0 0;
}
.install:hover{
  background: #000ad1;
  color: #fff;
}
.nav__links {
  display: flex;
  font-size: 1.5em;
  padding: 20px 0 0 5px;
  list-style: none;
}
.nav__links li {
  padding: 0 20px 0 0;
}
.nav__links li a {
  color: #1f1f1f;
  text-decoration: none;
  padding-bottom: 5px;
}
.nav__links li a:hover {
  border-bottom: 3px solid #1f1f1f;
}
.scroll-icon{
  padding-top: 0;
  padding-bottom: 0;
  height: 1.3rem;
}
section.dropdown-menu .links{
  display: flex;
  list-style: none;
  flex-direction: column;
}
section.dropdown-menu .links a{
  text-decoration: none;
  font-size: 1.25em;
  color: #0a0a0a;
}

@media (max-width: 1050px) {
  .desktop{
    display: none !important;
  }
  .mobile{
    display: block !important;
  }
  .mobile nav .nav__links{
    justify-content: space-around !important;
  }
  .topNav{
    bottom: 0 !important;
    height: 5.5rem;
    padding: 0 0 1.3rem 0;
    margin: 0;
    justify-content: center !important;
  }
  .mobile nav .nav__links button{
    padding: 0.3rem 0.5rem 0.3rem 0.5rem;
  }
}
</style>
