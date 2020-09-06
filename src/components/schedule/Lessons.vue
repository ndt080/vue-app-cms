<template>
    <li class="list-group-item" :class="[les.color]" >
        <span>{{les.time}}</span>
        <span class="text-right">{{les.timeEnd}}</span><br>
        <b style="white-space: pre-line">{{les.subj}}</b><br>
        <div class="card-tech">
            <div>
                <span>{{les.teach1}}</span><b class="text-right">{{les.cab1}}</b>
            </div>
            <div>
                <span>{{les.teach2}}</span><b class="text-right">{{les.cab2}}</b>
            </div>
        </div>
        <!-- common: timeFrom, timeTo -->
        <div class="homework" v-if="les.homework">
            <a class="dropdown-toggle" data-toggle="collapse" v-bind:href="'#collapseHomeW' + index" aria-expanded="false" v-bind:aria-controls="'collapseHomeW' + index">
                Домашнее задание
            </a>
            <div class="collapse" v-bind:id="'collapseHomeW' + index">
                <div class="card-homework list-group-item-secondary">
                    <p style="white-space: pre-line">{{les.homework}}</p>
                </div>
            </div>
        </div>
    </li>
</template>

<script>
import dateFilter from "@/filters/date.filter";

export default {
        name: "Lessons",
        props: {
          les: {
              type: Object,   //указываем тип передаваемого элемента
              required: true,  //делаем его обязательным
          },
          index: Number
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
    .inactive{
      opacity: 0.3;
    }
    .inactive:hover{
      opacity: 1;
    }
</style>
