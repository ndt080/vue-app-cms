<template>
  <div class="overlay-i">
    <div class="card-deck" style="padding: 0; margin: 0;"
         v-if="isLogin && !isMod">
      <a><p class="site-header-text">РАСПИСАНИЕ ЗАНЯТИЙ <span v-if="course">{{group}} ГРУППЫ {{course}} КУРСА</span></p></a>
    </div>
    <header>
        <button class="btn btn-dark" v-if="isLogin && !isMod" @click.prevent="isModeration">
          <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
          </svg>
          <span>&nbsp; РЕДАКТИРОВАТЬ</span>
        </button>
        <button class="btn btn-danger" v-if="isLogin && isMod" @click.prevent="isModeration">ОТМЕНИТЬ</button>
        <label>
            <select class="custom-select my-1 mr-sm-2"
                    v-model="selected">
                <option value="actual_week">Текущая неделя</option>
                <option value="next_week">Следующая неделя</option>
            </select>
        </label>
      <button class="btn btn-light"
              title="Показать/закрыть очередь"
              v-if="isLogin"
              @click.prevent="isQueueShow">
        <img class="scroll-icon" :src="require(`@/assets/img/queue.svg`)" alt="QUEUE"/>
        КУЕУЕ <sup style="color: red; font-size: 0.7em">[alpha]</sup>
      </button>
        <button class="btn btn-dark"
                title="Показать/закрыть скроллбар"
                v-if="isLogin"
                @click.prevent="isScroll">
            <img class="scroll-icon" :src="require(`@/assets/img/scroll.svg`)" alt="Scrl"/>
        </button>
        <button class="btn btn-dark"
                title="Обновить расписание"
                v-if="isLogin"
                @click.prevent="refresh">
            <img class="scroll-icon" :src="require(`@/assets/img/repeat.svg`)" alt="Repeat"/>
        </button>
    </header>
      <SchModeration v-if="isMod"/>
      <Loader v-if="loading"></Loader>
    <!-- Дни недели -->
    <div v-else-if="!loading && schedule">
        <section v-if="this.selected === 'actual_week'"
                 v-bind:class="{ 'card-section': !isScroller, 'card-section-with-scroll': isScroller  }"
        >
            <Card v-if="!isQSh" v-for="(card, i) of schedule"
                  v-bind:key="card.id"
                  v-bind:i="i"
                  v-bind:card="card"
                  v-bind:lessons="card.lessons"
                  v-bind:date="card.date"
                  v-bind:title="card.title"
            />
            <CardQ v-if="isQSh" v-for="(card, i) of schedule"
                   v-bind:key="card.id"
                   v-bind:i="i"
                   v-bind:card="card"
                   v-bind:date="card.date"
                   v-bind:title="card.title"
                   v-bind:week="true"
            />
        </section>
        <section v-if="this.selected === 'next_week'"
                 v-bind:class="{ 'card-section': !isScroller, 'card-section-with-scroll': isScroller  }"
        >
          <Card v-if="!isQSh" v-for="(card, i) of schedule_next"
                v-bind:key="card.id"
                v-bind:i="i"
                v-bind:card="card"
                v-bind:lessons="card.lessons"
                v-bind:date="card.date"
                v-bind:title="card.title"
          />
          <CardQ v-if="isQSh" v-for="(card, i) of schedule_next"
                 v-bind:key="card.id"
                 v-bind:i="i"
                 v-bind:card="card"
                 v-bind:date="card.date"
                 v-bind:title="card.title"
                 v-bind:week="false"
          />
        </section>
    </div>
      <div class="card-deck info-message" v-else-if="!loading && isNull">
          <p class="text-danger text-center">Расписание {{group}} группы {{course}} курса еще никто не заполнил. Воспользуйтесь конструктором, чтобы это сделать!</p>
      </div>

    <div class="card-deck">
        <div class="card mb-3 border card-border border card-border border card-border" style="max-width: 44rem">
            <div class="card-body card-body-text">
            </div>
        </div>
        <div class="w-100 d-none d-sm-block d-md-none"><!-- wrap every card on sm--></div>
        <div class="card mb-3 border card-border border card-border border card-border" style="max-width: 44rem">
            <div class="card-body card-body-text">
              <ul class="list-group">
                <li class="list-group-item list-group-item-success">
                  ПОЛЕЗНОЕ<br>
                  <a href="https://student.bsu.by/PersonalCabinet">Личный кабинет студента</a><br/>
                </li>
                <li class="list-group-item list-group-item-success">
                  <button class="btn btn-light">
                    <img width="20px" height="20px"
                         alt="Google Drive"
                         src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyIDUxMjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHBvbHlnb24gc3R5bGU9ImZpbGw6I0ZGQzEwNzsiIHBvaW50cz0iMzQxLjM0NCwzNTIgNTEyLDM1MiAzNDEuMzQ0LDMyIDE3MC42NTYsMzIgIi8+DQo8cG9seWdvbiBzdHlsZT0iZmlsbDojMjE5NkYzOyIgcG9pbnRzPSIxNTguNDY0LDM1MiA4NS4zNDQsNDgwIDQzMiw0ODAgNTEyLDM1MiAiLz4NCjxwb2x5Z29uIHN0eWxlPSJmaWxsOiM0Q0FGNTA7IiBwb2ludHM9IjE3MC42NTYsMzIgMCwzMzAuNjU2IDg1LjM0NCw0ODAgMjUzLjA1NiwxODYuNDk2ICIvPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPC9zdmc+DQo=" />
                    <span>&nbsp; &nbsp; GOOGLE ДИСК. Материалы</span>
                  </button>
                </li>
              </ul>
            </div>
            <div class="card-footer">

            </div>
        </div>
    </div>

  </div>

</template>

<script>
    import Card from "../components/schedule/Card";
    import {mapMutations, mapActions, mapGetters} from "vuex";
    import SchModeration from "../components/schedule/SchModeration";
    import CardQ from "../components/schedule/CardQ";
    export default {
        name: "Schedule",
        metaInfo:{
          title: 'Расписание'
        },
        components: {CardQ, SchModeration, Card},
        data() {
            return{
                isLogin: this.isAuth(),
                isWeek: false,
                selected: 'actual_week',
                isMod: false,
                loading: true,
                isNull: false,
                isScroller: false,
                isQSh: false,
                date: new Date(),
              interval: null
            }
        },
        async mounted() {
            await this.$store.dispatch('fetchSchedule')
            this.loading = false
             if(!this.$store.getters.schedule){
                 this.isNull = true
            }
             this.interval = setInterval(() => {
                this.date = new Date()
             }, 1000)
        },
        methods:{
            isAuth(){
                const auth = localStorage.getItem('userAuth')
                return auth === 'yes';
            },
            isModeration(){
                return this.isMod = !this.isMod
            },
            isScroll(){
                return this.isScroller = !this.isScroller
            },
            isQueueShow(){
                return this.isQSh = !this.isQSh
            },
            async refresh(){
                this.loading = true;
                await this.$store.dispatch('fetchSchedule')
                this.isNull = !this.$store.getters.schedule;
                this.loading = false
            }
        },
        computed:{
            schedule_next (){
                return this.$store.getters.schedule_next
            },
            schedule (){
                return this.$store.getters.schedule
            },
            course (){
                return this.$store.getters.info.course
            },
            group (){
                return this.$store.getters.info.group
            },
        },
      beforeDestroy() {
          clearInterval(this.interval)
      }
    }
</script>

<style scoped>
  .overlay-i {
    padding: 0 4.2rem 0 2%;
    width: 98.7vw;
    max-width: 100%;
    min-height: 100vh;
  }
  .card-deck{
    width: 100%;
  }
    header button,  header label {
        margin-right: 1.3%;
    }
    .scroll-icon{
        padding-top: 0;
        padding-bottom: 0;
        height: 1.3rem;
    }
    .info-message{
        width: 100%;
        margin: 0 auto;
        padding: 0 1rem 0 0;
        font-size: 1.5em;
    }
</style>
