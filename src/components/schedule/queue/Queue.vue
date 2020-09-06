<template>
  <li class="list-group-item" :class="les.color">
    <span>{{les.time}}</span>
    <span class="text-right">{{les.timeEnd}}</span><br>
  </li>
</template>

<script>
    export default {
        name: "Queue",
        props: {
            les: {
                type: Object,   //указываем тип передаваемого элемента
                required: true,  //делаем его обязательным
            },
            index: Number
        },
        data: () => ({
            cls: new Date(),
        }),
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
