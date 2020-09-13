<template>
    <form class="form-mod" @submit.prevent="submitHandler" action='' method="POST">
        <div class="form-group row">
            <!-- week -->
            <div class="col-md-4">
                Неделя<span style="color: red">*</span>:
                <select class="custom-select my-1 mr-sm-2"
                        v-model="week">
                    <option value="_now">Текущая неделя</option>
                    <option value="_next">Следующая неделя</option>
                </select>
            </div>
            <!-- dateWeek-->
            <div class="col-md-4">
                День<span style="color: red">*</span>:
                <select class="custom-select my-1 mr-sm-2"
                        v-model="dateWeek" >
                    <option selected value="D1Monday">Понедельник</option>
                    <option value="D2Tuesday">Вторник</option>
                    <option value="D3Wednesday">Среда</option>
                    <option value="D4Thursday">Четверг</option>
                    <option value="D5Friday">Пятница</option>
                    <option value="D6Saturday">Суббота</option>
                </select>
            </div>
            <!-- lesson-->
            <div class="col-md-4">
                Занятие<span style="color: red">*</span>:
                <select class="custom-select my-1 mr-sm-2 form-control"
                        v-model="lesson">
                    <option selected value="0">пара 1</option>
                    <option value='1'>пара 2</option>
                    <option value='2'>пара 3</option>
                    <option value='3'>пара 4</option>
                    <option value='4'>пара 5</option>
                </select>
            </div>
          <!-- Type lessons (color)-->
          <div class="col-md-4" v-if="week && dateWeek && lesson">
            Тип:
            <select class="custom-select my-1 mr-sm-2 form-control"
                    v-model="colorLes">
              <option selected value="list-group-item-success">лекция</option>
              <option value="list-group-item-primary">практическое</option>
              <option value="list-group-item-secondary">отсутствует</option>
            </select>
          </div>
            <!-- Queue -->
            <div class="col-md-5" v-if="week && dateWeek && lesson">
                Форма очереди<sup style="color: red; font-size: 0.7em">[beta]</sup>:
                <select class="custom-select my-1 mr-sm-2 form-control"
                        v-model="queueLes">
                    <option selected value='true'>Добавить</option>
                    <option value='false'>Убрать</option>
                </select>
            </div>
          <!-- Queue -->
            <div class="col-md-5 text-form-group" v-if="queueLes === 'true'">
              <input type="text" class="form-control" placeholder="#1 преподаватель" v-model="queueLesTeach1"/>
            </div>
            <div class="col-md-5 text-form-group" v-if="queueLes === 'true'">
              <input type="text" class="form-control" placeholder="#2 преподаватель" v-model="queueLesTeach2"/>
            </div>
        </div>

        <!-- common: timeFrom, timeTo -->
        <div class="form-group" v-if="week && dateWeek && lesson">
            <a class="dropdown-toggle" data-toggle="collapse" href="#collapseTimeLess" aria-expanded="false" aria-controls="collapseTimeLess">
                Время
            </a>
            <div class="form-group row collapse" id="collapseTimeLess">
                <div class="col-md-3 text-form-group">
                    <span>с </span>
                    <input type="time" class="form-control" v-model="timeFrom"/>
                </div>
                <div class="col-md-3 text-form-group">
                    <span>по </span>
                    <input type="time" class="form-control" v-model="timeTo"/>
                </div>
            </div>
        </div>
        <!-- common: subject, teachOne, teachTwo, cabOne, cabTwo-->
        <div class="form-group" v-if="week && dateWeek && lesson">
            <a class="dropdown-toggle" data-toggle="collapse" href="#collapseCommonLess" aria-expanded="false" aria-controls="collapseCommonLess">
                Общее
            </a>
            <div class="form-group row collapse" id="collapseCommonLess" >
                <div class="col-md-5">
                    #1 преподаватель: <input type="text" class="form-control" v-model="teachOne"/>
                </div>
                <div class="col-md-5">
                    #1 кабинет: <input type="text" class="form-control" v-model="cabOne"/>
                </div>
                <div class="col-md-5">
                    #2 преподаватель: <input type="text" class="form-control" v-model="teachTwo"/>
                </div>
                <div class="col-md-5">
                    #2 кабинет: <input type="text" class="form-control" v-model="cabTwo"/>
                </div>
                <div class="col-md-10">
                    предмет: <textarea type="text" class="form-control" v-model="subject"/>
                </div>
            </div>
        </div>
        <!-- homework-->
        <div class="form-group" v-if="week && dateWeek && lesson">
            <a class="dropdown-toggle" data-toggle="collapse" href="#collapseHomeLess" aria-expanded="false" aria-controls="collapseHomeLess">
                Домашнее задание
            </a>
            <div class="form-group row collapse" id="collapseHomeLess">
                <div class="col-md-10">
                    <textarea type="text" class="form-control"
                              style="margin-bottom: 1rem"
                              v-model="homework"/>
                </div>
            </div>
        </div>
        <!-- button submit-->
        <div class="form-group row" v-if="week && dateWeek && lesson">
            <div class="col-md-8">
                <button class="btn btn-success">Сохранить</button>
            </div>
        </div>
    </form>
</template>

<script>
    import {required} from "vuelidate/lib/validators";

    export default {
        name: "FormModCard",
        data: () => ({
            week: '',
            dateWeek: '',
            lesson: '',
            timeFrom: '',
            timeTo: '',
            subject: '',
            teachOne: '',
            teachTwo: '',
            cabOne: '',
            cabTwo: '',
            homework: '',
            colorLes: '',
            queueLes: '',
          queueLesTeach1: '',
          queueLesTeach2: ''
        }),
        validations: {
          week: {required},
          dateWeek: {required},
          lesson: {required},
          timeFrom: {},
          timeTo: {},
          subject: {},
          teachOne: {},
          teachTwo: {},
          cabOne: {},
          cabTwo: {},
          homework: {},
          colorLes: {},
          queueLes: {},
          queueLesTeach1: {},
          queueLesTeach2: {}
        },
        methods:{
            async submitHandler (){
                if(this.$v.$invalid){
                    this.$v.$touch()
                    return
                }
                const formData = {
                  week: this.week,
                  dateWeek: this.dateWeek,
                  lesson: this.lesson,
                  timeFrom: this.timeFrom,
                  timeTo: this.timeTo,
                  subject: this.subject,
                  teachOne: this.teachOne,
                  teachTwo: this.teachTwo,
                  cabOne: this.cabOne,
                  cabTwo: this.cabTwo,
                  homework: this.homework,
                  colorLes: this.colorLes,
                  queue: {
                    queueLes: this.queueLes,
                    queueLesTeach1: this.queueLesTeach1,
                    queueLesTeach2: this.queueLesTeach2,
                  },
                }
                try{
                    await this.$store.dispatch('modSchedule', formData)
                    this.$toast.success('Изменения применены');
                }catch (e) {
                    this.$toast.error('Ошибка применения изменений!');
                }
            }
        }
    }
</script>

<style scoped>
    form a{
        text-decoration: none;
        font-size: 1.2em;
        color: #0275d8;
        padding-left: 0.5rem;
    }
    form {
        font-size: 1.2em;
        font-family: 'Oswald', sans-serif;
        color: #0a0a0a;
    }
    .btn{
        width: 100%;
    }
    .form-group{
        padding: 0;
        margin: 0;
    }
    .form-group label{
        display: inline-flex;
    }
    .form-group .text-form-group {
        display: inline-flex;
    }
    .form-group .text-form-group  span{
        padding-right: 10px;
    }
</style>
