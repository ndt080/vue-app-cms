<template>
  <div class="card mb-3 border card-border card-section--content"
       style="max-width: 22rem"
       v-if="card.queue">
    <div class="card-header">
      <p class="alert text-left">ОЧЕРЕДЬ: "{{card.title}}"</p>
      <div class="text-right badge badge-light date-label" id="date-monday">{{date(card.date)}}</div>
    </div>
    <div class="card-body card-body-text">
      <form class="form-inline" @submit.prevent="submitQueue">
        <div class=" form-group group card-desk">
          <input class="form-control form-control-lg" type="text"
                 v-model="nameInput"
                 placeholder="Введите имя"
                 required
          />
        </div>
      </form>
      <Queue v-for="(les, i) of card.lessons"
             v-bind:key="les.id"
             v-bind:i="i"
             v-bind:les="les"
             v-bind:subj="les.subj"
             v-bind:teach1="les.teach1"
             v-bind:teach2="les.teach2"
             v-bind:qPeople="les.qPeople"
             v-bind:data="{cardID: index, week: week, lesson: card.queue.lesson}"
      />
    </div>
  </div>
</template>

<script>
import Queue from "./queue/Queue";
import {required} from "vuelidate/lib/validators";
export default {
  name: "CardQ",
  components: {Queue},
  props: {
    card: {
      type: Object,   //указываем тип передаваемого элемента
      required: true,  //делаем его обязательным
    },
    index: String,
    week: {},
    queue: {}
  },
  data: () => ({
    nameInput: '',
  }),
  validations: {
    nameInput: {required}
  },
  methods:{
    async submitQueue(){
      if(this.$v.$invalid){
        this.$v.$touch()
        return
      }
      const formData = {
        user: this.nameInput,
        cardID: this.index,
        week: this.week,
        lesson: this.card.queue.lesson
      }
      console.log(formData)
      try{
        await this.$store.dispatch('modQueue', formData)
        this.$toast.success('Запись добавлена!');
      }catch (e) {
        this.$toast.error('Ошибка добавления записи!');
      }
    },
    date (string){
      return string[8] + string[9] + '.' + string[5] + string[6]
    }
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
  width: 19.4rem;
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
