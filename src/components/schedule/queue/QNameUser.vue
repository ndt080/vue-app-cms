<template>
  <li class="list-group-item list-group-item-success queue-name"
      v-bind:class="{left_ul: !teach1, right_ul: teach1}"
  >
    <!--v-bind:style="{'grid-row': counter1 += 1}" -->
    <div class="text-left">
      {{que.user}}
      <p>[{{que.teach.split('_')[0]}}]</p>
    </div>
    <button class="btn text-right close" v-on:click.prevent="deleteObject()">&times;</button>
  </li>
</template>

<script>
export default {
  name: "QNameUser",
  props: {
    que: {
      type: Object,   //указываем тип передаваемого элемента
      required: true,  //делаем его обязательным
    },
    data: {},
    index: String
  },
  data: () => ({
    counter1: 0,
    counter2: 0,
  }),
  computed: {
    teach1(){
      let str = this.que.teach.split('').reverse().join('')
      console.log(str)
      return str[0] === '0'? false:true
    }
  },
  methods: {
    deleteObject() {
      try{
        const tmp = {
          cardID: this.data.cardID,
          week: this.data.week,
          lesson: this.data.lesson,
          recID: this.index
        }
        this.$store.dispatch('delRecQueue', tmp)
        this.$toast.success('Запись удалена!');
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
  .right_ul{
    grid-column-end: right;
  }
  .left_ul{
    grid-column-start: left;
  }
</style>
