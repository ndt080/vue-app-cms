<template>
  <ul class="list-group" v-if="les.qPeople">
    <li class="list-group-item text-center">
      {{les.subj}}:
    </li>
    <QNameUser v-for="(que, i) of les.qPeople"
               v-bind:key="que.id"
               v-bind:index="i"
               v-bind:id="que.id"
               v-bind:user="que.user"
               v-bind:que="que"
               v-bind:data="data"
    />
  </ul>
</template>

<script>
    import QNameUser from "@/components/schedule/queue/QNameUser";
    export default {
      name: "Queue",
      components: {QNameUser},
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

<style scoped>
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

</style>
