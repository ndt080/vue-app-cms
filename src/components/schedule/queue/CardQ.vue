<template>
  <div>
    <Loader v-if="loading"></Loader>
    <div class="card mb-3 border card-border card-section--content"
         style="max-width: 25rem"
         v-if="!loading && getQueue(index, 'status') === true">
      <div class="card-header">
        <p class="alert text-left">"{{getLessonTitle(index)}}"</p>
        <div class="text-right badge badge-light date-label" id="date-monday">{{date(card.date)}}</div>
      </div>
      <div class="card-body card-body-text" v-if="">
        <form class="form-inline" @submit.prevent="submitQueue">
          <div class="form-group group">
            <input class="form-control" type="text"
                   v-model.trim="nameInput"
                   placeholder="Введите имя"
                   required
            />
          </div>
          <div class="form-group group card-desk row">
            <p class="col-8">
              <select class="form-control"
                      v-model="teachInput">
                <option :value="null" disabled>Выбрать преподавателя...</option>
                <option :value="getQueue(index, 'teach1')+'_0'">{{getQueue(index, 'teach1')}}</option>
                <option :value="getQueue(index, 'teach2')+'_1'">{{getQueue(index, 'teach2')}}</option>
              </select>
            </p>
            <p class="col-4">
              <button class="form-control btn-success">Записаться</button>
            </p>
          </div>
        </form>
        <CardQ_ul v-for="(les, i) of card.lessons"
               v-bind:key="les.id"
               v-bind:i="i"
               v-bind:les="les"
               v-bind:subj="les.subj"
               v-bind:teach1="les.teach1"
               v-bind:teach2="les.teach2"
               v-bind:qPeople="les.qPeople"
               v-bind:data="{cardID: index, week: week, lesson: getQueue(index, 'lesson')}"
        />
      </div>
    </div>
  </div>
</template>

<script>
import CardQ_ul from "./CardQ_ul";
import {required} from "vuelidate/lib/validators";
export default {
  name: "CardQ",
  components: {CardQ_ul},
  props: {
    card: {
      type: Object,   //указываем тип передаваемого элемента
      required: true,  //делаем его обязательным
    },
    index: String,
    week: Boolean
  },
  data: () => ({
    nameInput: '',
    teachInput: null,
    loading: true
  }),
  validations: {
    nameInput: {required},
    teachInput: {},
  },
  mounted() {
    this.$store.dispatch('fetchQueue', {index: this.index, week: this.week})
    this.loading = false
  },
  computed:{
    queueArr (){
      return this.$store.getters.queueArr
    }
  },
  /*watch:{
      index: {
      immediate: true,
      deep: true,
      handler(newValue, oldValue) {
        console.log(newValue)
        this.loading = true
        this.$store.dispatch('fetchQueue', {index: newValue, week: this.week})
        console.log(status)
        this.loading = false
      }
    },
  },
   */
  methods:{
    submitQueue(){
      if(this.$v.$invalid){
        this.$v.$touch()
        return
      }
      const formData = {
        user: this.nameInput,
        cardID: this.index,
        week: this.week,
        lesson: this.getQueue(this.index, 'lesson'),
        teacher: this.teachInput,
      }
      try{
        this.$store.dispatch('modQueue', formData)
        this.$toast.success('Запись добавлена!');
      }catch (e) {
        this.$toast.error('Ошибка добавления записи!');
      }
    },
    date (string){
      return string[8] + string[9] + '.' + string[5] + string[6]
    },
     getQueue(ind, option){
      let tmpI = ''
      let dayIndex = ["D1Monday","D2Tuesday","D3Wednesday","D4Thursday","D5Friday","D6Saturday"]
      for(let i = 0; i < dayIndex.length; i++){
        if(ind === dayIndex[i]){
          tmpI = i
        }
      }
      if(this.queueArr[tmpI]['status'] && this.queueArr[tmpI]['lesson']){
        return this.queueArr[tmpI][option]
      }
    },
    getLessonTitle(ind){
      this.getQueue(ind, 'lesson')
      let tmpI = this.getQueue(ind, 'lesson')
      return this.card.lessons[tmpI]['subj']
    },
  }
}
</script>

<style scoped>
.group{
  position:relative;
}
input{
  font-size:18px;
  padding:10px 10px 10px 5px;
  display:block;
  border:none;
  border-bottom: 2px solid #757575;
  margin-bottom: 1rem;
}
input[type=text]{
  width: 22.4rem;
}
input:first-child{
  margin-right: 1.6rem;
}
input:focus{ outline:none; }
.btn-5 {
  border: 1px solid;
  margin-left: 1.6rem;
}
.btn-5:hover {
  border: 1px solid;
  box-shadow: inset 0 0 20px rgba(232, 232, 247, 0.5), 0 0 50px rgba(232, 232, 247, 1);
  outline-offset: 15px;
  text-shadow: 1px 1px 2px #427388;
}
</style>
