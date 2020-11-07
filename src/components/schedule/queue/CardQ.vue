<template>
  <div>
    <Loader v-if="loading"></Loader>
    <div class="card mb-3 border card-border card-section--content"
         style="max-width: 25rem"
         v-if="!loading">
      <div class="card-header">
        <p class="alert text-left">"{{card.subject}}"</p>
        <div class="alert text-right badge date-label">
          <button class="alert btn text-right close"
                  @click.prevent="deleteQueue()"
                  style="padding: 14px 10px 10px 10px !important; font-size: 2em">
              &times;
          </button>
        </div>
      </div>
      <div class="card-body card-body-text" v-if="">
        <form class="form-inline" @submit.prevent="submitQueue()">
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
                <option :value="card.teacher1+'_0'">{{card.teacher1}}</option>
                <option :value="card.teacher2+'_1'">{{card.teacher2}}</option>
              </select>
            </p>
            <p class="col-4">
              <button class="form-control btn-success">Записаться</button>
            </p>
          </div>
        </form>
        <ul class="list-group grid-container" v-if="card.people">
          <CardQRec v-for="(que, i, j) of card.people"
                       v-bind:key="que.id"
                       v-bind:j="j+=1"
                       v-bind:index="i"
                       v-bind:id="que.id"
                       v-bind:user="que.userID"
                       v-bind:teacher="que.teach"
                       v-bind:que="que"
                       v-bind:data="{queueID: ind}"
          />
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import CardQRec from "./CardQRec";
import {required} from "vuelidate/lib/validators";
export default {
  name: "CardQ",
  components: {CardQRec},
  props: {
    card: {
      type: Object,   //указываем тип передаваемого элемента
      required: true,  //делаем его обязательным
    },
    ind: String,
  },
  data: () => ({
    nameInput: '',
    teachInput: null,
    loading: true
  }),
  validations: {
    nameInput: {required},
    teachInput: {required},
  },
  mounted() {
    this.$store.dispatch('fetchQueue')
    this.loading = false
  },
  methods:{
    submitQueue(){
      if(this.$v.$invalid){
        this.$v.$touch()
        return
      }
      const formData = {
        user: this.nameInput,
        queueID: this.ind,
        teacher: this.teachInput,
      }
      try{
        this.$store.dispatch('addQueuePeople', formData)
        this.$toast.success('Запись добавлена!');
      }catch (e) {
        this.$toast.error('Ошибка добавления записи!');
      }
    },
    date (string){
      return string[8] + string[9] + '.' + string[5] + string[6]
    },
    deleteQueue() {
      try{
        if(this.$store.getters.info.status === 'admin') {
          if (confirm("Вы действительно хотите удалить очередь?")) {
            const tmp = {
              queueID: this.ind,
            }
            this.$store.dispatch('removeQueue', tmp)
            this.loading = true
            this.$toast.success('Очередь удалена!');
            this.$store.dispatch('fetchQueue')
            this.loading = false
          }
        } else{
          this.$toast.warning('НЕДОСТАТОЧНО ПРАВ! Обратитесь к администратору для удаления данной очереди!');
        }
      }catch (e) {
        this.$toast.error('Ошибка удаления очедери!');
      }
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
  width: 22.4rem;
}
input:first-child{
  margin-right: 1.6rem;
}
input:focus{ outline:none; }
.grid-container{
  display: grid;
  grid-template-areas: "left right";
  grid-template-columns: repeat(2, 50%);
}
</style>
