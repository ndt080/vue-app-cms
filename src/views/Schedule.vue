<template>
  <div>
    <div class="card-deck" style="padding: 0; margin: 0;">
      <a><p class="site-header-text"> РАСПИСАНИЕ</p></a>
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
      </header>
      <ModCard v-if="isMod"/>

      <Loader v-if="loading"/>
    <!-- Дни недели -->
    <div class="card-deck" v-else>
        <section class="card-section"
                 v-if="this.selected === 'actual_week'"
        >
            <SchNow />
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
            <Card v-for="(card, i) of this.getSchedule_next"
                  v-bind:key="card.id"
                  v-bind:i="i"
                  v-bind:card="card"
                  v-bind:lessons="card.lessons"
                  v-bind:date="card.date"
                  v-bind:title="card.title"
            />
        </section>
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
                <div class="text-right">
                    <a class="text-secondary" href="https://gitlab.com/gera-univ/site/pi14-schedule">git</a>
                </div>
                <div id="alert-schedule-out-of-date" class="alert alert-dismissible">
                    <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
                    <p id="text-schedule-out-of-date">??</p>
                    неделя <strong id="week-schedule-out-of-date">??</strong>
                </div>
            </div>
        </div>
    </div>

  </div>

</template>

<script>
    import Card from "../components/schedule/Card";
    import {mapMutations, mapActions, mapGetters} from "vuex";
    import ModCard from "../components/schedule/ModCard";
    import SchNow from "../components/schedule/SchNow";
    export default {
        name: "Schedule",
        components: {SchNow, ModCard, Card},
        data() {
            return{
                isLogin: this.isAuth(),
                isWeek: false,
                selected: 'actual_week',
                isMod: false,
                loading: true
            }
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
        },
        computed:{
            ...mapGetters(["getSchedule_next"]),
            schedule (){
                return this.$store.getters.schedule
            },
        },
        async mounted() {
            if(!Object.keys(this.$store.getters.schedule).length) {
                await this.$store.dispatch('fetchSchedule')
                this.loading = false
            }
        }
    }
</script>

<style scoped>
header button {
    margin-right: 1.3rem;
}
</style>
