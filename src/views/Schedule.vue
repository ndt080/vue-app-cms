<template>
  <div>
    <div class="card-deck" style="padding: 0; margin: 0;"
         v-if="isLogin && !isMod">
      <a><p class="site-header-text">РАСПИСАНИЕ ЗАНЯТИЙ</p></a>
    </div>
      <header>
          <button class="btn btn-dark" v-if="isLogin && !isMod" @click.prevent="isModeration">РЕДАКТИРОВАТЬ РАСПИСАНИЕ</button>
          <button class="btn btn-secondary" v-if="isLogin && isMod" @click.prevent="isModeration">ОТМЕНИТЬ РЕДАКТИРОВАНИЕ</button>
          <label>
              <select class="custom-select my-1 mr-sm-2"
                      v-model="selected">
                  <option value="actual_week">Текущая неделя</option>
                  <option value="next_week">Следующая неделя</option>
              </select>
          </label>
          <button class="btn btn-dark" v-if="isLogin" @click.prevent="isScroll">
              <img class="scroll-icon" :src="require(`@/assets/img/scroll.svg`)" alt="Scrl"/>
          </button>
          <button class="btn btn-dark" v-if="isLogin"  @click.prevent="refresh">
              <img class="scroll-icon" :src="require(`@/assets/img/repeat.svg`)" alt="Repeat"/>
          </button>
      </header>
      <ModCard v-if="isMod"/>
      <Loader v-if="loading"></Loader>
    <!-- Дни недели -->
    <div class="card-deck" v-if="!loading && schedule">
        <section v-if="this.selected === 'actual_week'"
                 v-bind:class="{ 'card-section': !isScroller, 'card-section-with-scroll': isScroller  }"
        >
            <Card v-for="(card, i) of schedule"
                  v-bind:key="card.id"
                  v-bind:i="i"
                  v-bind:card="card"
                  v-bind:lessons="card.lessons"
                  v-bind:date="card.date"
                  v-bind:title="card.title"
            />
        </section>
        <section class="card-section"
                 v-if="this.selected === 'next_week'"
        >
            <Card v-for="(card, i) of schedule_next"
                  v-bind:key="card.id"
                  v-bind:i="i"
                  v-bind:card="card"
                  v-bind:lessons="card.lessons"
                  v-bind:date="card.date"
                  v-bind:title="card.title"
            />
        </section>
    </div>
      <div class="card-deck info-message" v-if="!loading && !schedule">
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
                        <a href="https://student.bsu.by/PersonalCabinet">Личный кабинет студента</a><br>
                    </li>
                </ul>
                <br>
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
    import ModCard from "../components/schedule/SchModeration";
    export default {
        name: "Schedule",
        metaInfo:{
          title: 'Расписание'
        },
        components: {ModCard, Card},
        data() {
            return{
                isLogin: this.isAuth(),
                isWeek: false,
                selected: 'actual_week',
                isMod: false,
                loading: true,
                isScroller: false
            }
        },
        async mounted() {
            await this.$store.dispatch('fetchSchedule')
            this.loading = false
        },
        methods:{
            isAuth(){
                const auth = localStorage.getItem('userAuth')
                return auth === 'yes';
            },
            isModeration(){
                this.isMod = !this.isMod
                return this.isMod
            },
            isScroll(){
                this.isScroller = !this.isScroller
                return this.isScroller
            },
            async refresh(){
                this.loading = true;
                await this.$store.dispatch('fetchSchedule')
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
        }
    }
</script>

<style scoped>
    header button,  header label {
        margin-right: 1.3rem;
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
