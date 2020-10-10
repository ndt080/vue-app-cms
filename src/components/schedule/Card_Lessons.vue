<template>
    <li class="list-group-item" :class="!this.changeTypeLes?(!this.nowTypeLes?[les.color]:[nowColor]):[pastColor]" >
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
import firebase from "firebase";

export default {
  name: "Card_Lessons",
    props: {
      les: {
        type: Object,   //указываем тип передаваемого элемента
        required: true,  //делаем его обязательным
      },
      index: Number,
      datecard: String,
      time: String,
      timeEnd: String
    },
    data() {
      return{
        date: new Date(),
        interval: null,
        changeTypeLes: false,
        nowTypeLes: false,
        pastColor: 'list-group-item-dark',
        nowColor: 'list-group-item-warning'
      }
    },
    computed: {
      dateSchedule(){
        let date = new Date(this.datecard);
        date.setHours(23);
        return date = new Date(date.setMinutes(59))
      },
    },
    async mounted() {
      this.date = new Date()
      this.checkDate(this.date, this.dateSchedule, this.time, this.timeEnd);
      this.interval = setInterval(() => {
        this.date = new Date()
        this.checkDate(this.date, this.dateSchedule, this.time, this.timeEnd);
      }, 60*1000)
    },
    methods:{
      checkDate(dateNow, dateSch, timeSch, timeEndSch){
        if(dateSch.toISOString().split('T')[0] <= dateNow.toISOString().split('T')[0]) {
          //PAST LESSON COLOR
          if(this.setTime(dateSch, timeEndSch) <= dateNow){
            this.changeTypeLes = true
          }
        }
        if(dateSch.toISOString().split('T')[0] === dateNow.toISOString().split('T')[0]) {
          //NOW LESSON COLOR
          if(this.setTime(dateSch, timeSch) >= dateNow && this.setTime(dateSch, timeEndSch) >= dateNow){
            this.nowTypeLes = true
          }
        }
      },
      getTime(string, option){
          if(option === 'hour'){
            string = (string[0]!=='0'?string[0]:'')+string[1]
          }
          if(option === 'minute'){
            string = (string[3]!=='0'?string[3]:'')+string[4]
          }
        return parseInt(string)
      },
      setTime(date, time){
        date.setSeconds(0);
        date.setHours(this.getTime(time, 'hour'));
        date.setMinutes(this.getTime(time, 'minute'));
        return date;
      }

    },
    beforeDestroy() {
      clearInterval(this.interval)
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
    .homework a{
        text-decoration: none;
    }
    .inactive{
      opacity: 0.3;
    }
    .inactive:hover{
      opacity: 1;
    }
    .list-group-item-dark{
      opacity: 0.5;
      color:rgba(0,0,0,0.5);
    }
    .list-group-item-warning{
      box-shadow: 0 0 20px #f0ad4e;
    }
</style>
