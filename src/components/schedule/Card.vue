<template>
  <div class="card mb-3 border card-border card-section--content">
    <div class="card-header">
        <p class="alert text-left">{{card.title}}</p>
        <div class="text-right badge badge-light date-label" id="date-monday">{{date(card.date)}}</div>
    </div>
    <div class="card-body card-body-text">
        <ul class="list-group">
        <Card_Lessons v-for="(les, i) of card.lessons"
                      v-bind:key="les.id"
                      v-bind:index="i"
                      v-bind:les="les"
                      v-bind:time="les.time"
                      v-bind:timeEnd="les.timeEnd"
                      v-bind:subj="les.subj"
                      v-bind:teach1="les.teach1"
                      v-bind:teach2="les.teach2"
                      v-bind:cab1="les.cab1"
                      v-bind:cab2="les.cab2"
                      v-bind:homework="les.homework"
                      v-bind:color="les.color"
                      v-bind:datecard="card.date"
            />
        </ul>
    </div>
  </div>
</template>

<script>
    import Card_Lessons from "./Card_Lessons";
    export default {
        name: "Card",
        components: {Card_Lessons},
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
        }
    }
</script>

