<template>
  <li class="list-group-item list-group-item-success queue-name"
      v-bind:style="{
            'grid-row': row,
            'grid-column': (teach1)?2:1,
      }">
    <div class="text-left">
      {{que.user}}
      <p>[{{this.teacher?this.teacher.split('_')[0]:'ноунейм'}}]</p>
    </div>
    <button class="btn text-right close"
            v-on:click.prevent="deleteObject()"
            v-if="this.UID === this.que.userID || status === 'admin'"
    >&times;</button>
  </li>
</template>

<script>
export default {
  name: "CardQRec",
  props: {
    que: {
      type: Object,   //указываем тип передаваемого элемента
      required: true,  //делаем его обязательным
    },
    data: {},
    index: String,
    teacher: String,
    j: Number,
  },
  data: () => ({
    counter1: parseInt(localStorage.getItem('count1'), 10),
    counter2: parseInt(localStorage.getItem('count2'), 10),
    row: 0
  }),
  mounted() {
    localStorage.setItem('count1', '0');
    localStorage.setItem('count2', '0');
  },
  watch:{
    index: {
      immediate: true,
      deep: true,
      handler() {
        if(this.teach1){
          localStorage.setItem('count1', (this.counter1+1).toString());
          this.row = parseInt(localStorage.getItem('count1'), 10);
        }
        if(!this.teach1){
          localStorage.setItem('count2', (this.counter2+1).toString());
          this.row = parseInt(localStorage.getItem('count2'), 10);
        }
      }
    },
  },
  computed: {
    teach1(){
      if(this.teacher){
        let str = this.teacher.split('').reverse().join(' ')
        return str[0] !== '0'
      }
    },
    UID () {
      return this.$store.getters.UID
    },
    status () {
      return this.$store.getters.info.status
    },
  },
  methods: {
    deleteObject() {
      try{
        if((this.que.userID?this.UID === this.que.userID:this.UID) || status === 'admin'){
          if(confirm("Удалить запись?")) {
            const tmp = {
              queueID: this.data.queueID,
              recID: this.index
            }
            this.$store.dispatch('delRecQueue', tmp)
            this.$toast.success('Запись удалена!');
          }
        }
      }catch (e) {
        this.$toast.error('Ошибка удаления записи!');
      }
    }
  }
}
</script>

<style scoped>
  .queue-name{
    font-size: 0.8em !important;
    line-height: 1.5em;
    padding-bottom: 0;
  }

</style>
