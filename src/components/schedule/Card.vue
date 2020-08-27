<template>
  <div class="card mb-3 border card-border card-section--content">
    <div class="card-header">
        <p class="alert text-left">{{card.title}}</p>
        <div class="text-right badge badge-light date-label" id="date-monday">{{date(card.date)}}</div>
    </div>
    <div class="card-body card-body-text">
        <ul class="list-group">
            <!-- 1 пара -->
            <li class="list-group-item list-group-item-success">
                <span>{{card.lessons[0].time}}</span>
                <span class="text-right">{{card.lessons[0].timeEnd}}</span><br>
                <b>{{card.lessons[0].subj}}</b><br>
                <div class="card-tech">
                    <div>
                        <span>{{card.lessons[0].teach}}</span><b class="text-right">{{card.lessons[0].cab}}</b>
                    </div>
                    <div>
                        <span>{{card.lessons[0].teach2}}</span><b class="text-right">{{card.lessons[0].cab2}}</b>
                    </div>
                </div>
                <div class="card-homework list-group-item-secondary"
                     v-if="card.lessons[0].homework">
                    {{card.lessons[0].homework}}
                </div>
            </li>

            <!-- 2 пара -->
            <li class="list-group-item list-group-item-success">
                <span >{{card.lessons[1].time}}</span>
                <span class="text-right">{{card.lessons[1].timeEnd}}</span><br>
                <b>{{card.lessons[1].subj}}</b><br>
                <div class="card-tech">
                    <div>
                        <span>{{card.lessons[1].teach}}</span><b class="text-right">{{card.lessons[1].cab}}</b>
                    </div>
                    <div>
                        <span>{{card.lessons[1].teach2}}</span><b class="text-right">{{card.lessons[1].cab2}}</b>
                    </div>
                </div>
                <div class="card-homework list-group-item-secondary"
                     v-if="card.lessons[1].homework">
                    {{card.lessons[1].homework}}
                </div>
            </li>

            <!-- 3 пара -->
            <li class="list-group-item list-group-item-success">
                <span>{{card.lessons[2].time}}</span>
                <span class="text-right">{{card.lessons[2].timeEnd}}</span><br>
                <b>{{card.lessons[2].subj}}</b><br>
                <div class="card-tech">
                    <div>
                        <span>{{card.lessons[2].teach}}</span><b class="text-right">{{card.lessons[2].cab}}</b>
                    </div>
                    <div>
                        <span>{{card.lessons[2].teach2}}</span><b class="text-right">{{card.lessons[2].cab2}}</b>
                    </div>
                </div>
                <div class="card-homework list-group-item-secondary"
                     v-if="card.lessons[2].homework">
                    {{card.lessons[2].homework}}
                </div>
            </li>

            <!-- 4 пара -->
            <li class="list-group-item list-group-item-success">
                <span>{{card.lessons[3].time}}</span>
                <span class="text-right">{{card.lessons[3].timeEnd}}</span><br>
                <b>{{card.lessons[3].subj}}</b><br>
                <div class="card-tech">
                    <div>
                        <span>{{card.lessons[3].teach}}</span><b class="text-right">{{card.lessons[3].cab}}</b>
                    </div>
                    <div>
                        <span>{{card.lessons[3].teach2}}</span><b class="text-right">{{card.lessons[3].cab2}}</b>
                    </div>
                </div>
                <div class="card-homework list-group-item-secondary"
                     v-if="card.lessons[3].homework">
                    {{card.lessons[3].homework}}
                </div>
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
        methods: {
            date (string){
                return string[8] + string[9] + '.' + string[5] + string[6]
            }
        },
        computed:{
            ...mapGetters(["isEditT"])
        }
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
</style>
