<template>
  <div class="card mb-3 border card-border card-section--content">
    <div class="card-header">
        <p class="alert text-left">{{card.title}}</p>
        <div class="text-right badge badge-light date-label" id="date-monday">{{card.date}}</div>
    </div>
    <div class="card-body card-body-text">
        <ul class="list-group">
            <!-- 1 пара -->
            <li class="list-group-item list-group-item-success">
                <span>{{card.lessons[0].time}}</span>
                <span class="text-right">{{card.lessons[0].timeEnd}}</span><br>
            </li>

            <!-- 2 пара -->
            <li class="list-group-item list-group-item-success">
                <span >{{card.lessons[1].time}}</span>
                <span class="text-right">{{card.lessons[1].timeEnd}}</span><br>
            </li>

            <!-- 3 пара -->
            <li class="list-group-item list-group-item-success">
                <span>{{card.lessons[2].time}}</span>
                <span class="text-right">{{card.lessons[2].timeEnd}}</span><br>
            </li>

            <!-- 4 пара -->
            <li class="list-group-item list-group-item-success">
                <span>{{card.lessons[3].time}}</span>
                <span class="text-right">{{card.lessons[3].timeEnd}}</span><br>
            </li>
        </ul>
    </div>
  </div>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        name: "Card",
        props: {
            card: {
                type: Object,   //указываем тип передаваемого элемента
                required: true,  //делаем его обязательным
            },
            index: Number
        },
        computed:{
            ...mapGetters(["isEditT"])
        }
    }
</script>

<style scoped>
    span{

    }
</style>
