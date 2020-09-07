<template>
  <li class="list-group-item list-group-item-success">
    {{que.user}}
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

</style>
