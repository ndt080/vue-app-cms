<template>
    <form class="form-group" @submit.prevent="submitHandler" action='' method="POST">
        <!-- week -->
        <label class="form-group">
            <select class="custom-select my-1 mr-sm-2">
                <option value="actual_week">Текущая неделя</option>
                <option value="next_week">Следующая неделя</option>
            </select>
            <!-- dateWeek-->
            <select class="custom-select my-1 mr-sm-2"
                    v-model="dateWeek">
                <option value="D1Monday">Понедельник</option>
                <option value="D2Tuesday">Вторник</option>
                <option value="D3Wednesday">Среда</option>
                <option value="D4Thursday">Четверг</option>
                <option value="D5Friday">Пятница</option>
                <option value="D6Saturday">Суббота</option>
            </select>
            <!-- lesson-->
            <select class="custom-select my-1 mr-sm-2"
                    v-model="lesson">
                <option value="0">пара 1</option>
                <option value="1">пара 2</option>
                <option value="2">пара 3</option>
                <option value="3">пара 4</option>
            </select>
        </label>
        <!-- common: timeFrom, timeTo -->
        <div class="form-group">
            <a class="dropdown-toggle" data-toggle="collapse" href="#collapseTimeLess" aria-expanded="false" aria-controls="collapseTimeLess">
                Время
            </a>
            <div class="form-group collapse" id="collapseTimeLess">
                <label>
                с <input type="time" class="form-control" v-model="timeFrom"/> по <input type="time" class="form-control" v-model="timeTo"/>
                </label>
            </div>
        </div>
        <!-- common: subject, teachOne, teachTwo, cabOne, cabTwo-->
        <div class="form-group">
            <a class="dropdown-toggle" data-toggle="collapse" href="#collapseCommonLess" aria-expanded="false" aria-controls="collapseCommonLess">
                Общее
            </a>
            <div class="collapse" id="collapseCommonLess" >
                предмет: <input type="text" class="form-control" v-model="subject"/>
                #1 преподаватель: <input type="text" class="form-control" v-model="teachOne"/>
                #1 кабинет: <input type="text" class="form-control" v-model="cabOne"/>
                #2 преподаватель: <input type="text" class="form-control" v-model="teachTwo"/>
                #2 кабинет: <input type="text" class="form-control" v-model="cabTwo"/>
            </div>
        </div>
        <!-- homework-->
        <div class="form-group">
            <a class="dropdown-toggle" data-toggle="collapse" href="#collapseHomeLess" aria-expanded="false" aria-controls="collapseHomeLess">
                Домашнее задание
            </a>
            <div class="collapse" id="collapseHomeLess">
                <input type="text" class="form-control"
                       v-model="homework"/>
            </div>
        </div>
        <!-- button submit-->
        <button class="btn btn-success">Сохранить</button>
    </form>
</template>

<script>
    import {required} from "vuelidate/lib/validators";

    export default {
        name: "FormModCard",
        data: () => ({
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
        }),
        validations: {
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
        },
        methods:{
            async submitHandler (){
                if(this.$v.$invalid){
                    this.$v.$touch()
                    return
                }

                const formData = {
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
    label{
        display: inline-flex;
    }
    form a{
        text-decoration: none;
        font-size: 1.2em;
        font-family: 'Oswald', sans-serif;
        color: #0275d8;
    }
    form {
        font-size: 1.2em;
        font-family: 'Oswald', sans-serif;
        color: #0a0a0a;
    }
    .btn{
        width: 100%;
    }
</style>
