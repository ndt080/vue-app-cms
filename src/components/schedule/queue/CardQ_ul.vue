<template>
  <ul class="list-group grid-container" v-if="les.qPeople">
    <CardQ_ul_li v-for="(que, i, j) of les.qPeople"
               v-bind:key="que.id"
               v-bind:j="j+=1"
               v-bind:index="i"
               v-bind:id="que.id"
               v-bind:user="que.user"
               v-bind:teacher="que.teach"
               v-bind:que="que"
               v-bind:data="data"
    />
  </ul>
</template>

<script>
    import CardQ_ul_li from "@/components/schedule/queue/CardQ_ul_li";
    export default {
      name: "CardQ_ul",
      components: {CardQ_ul_li},
      props: {
        les: {
              type: Object,   //указываем тип передаваемого элемента
              required: true,  //делаем его обязательным
          },
          index: Number,
          data: {}
      },
    }
</script>

<style>
  .card-tech{
    display: block;
  }
  .card-homework{
    padding: 0.5rem;
    text-align: justify-all;
    border-radius: 0.5rem;
  }
  .homework a{
    text-decoration: none;
  }
  .grid-container{
    display: grid;
    grid-template-areas: "left right";
    grid-template-columns: repeat(2, 50%);
  }

</style>
