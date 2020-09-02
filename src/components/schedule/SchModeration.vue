<template>
    <div class="mod-block">
        <section>
            <a href="#collapseDateWeek" class="text-justify" data-toggle="collapse">
                Настройка даты недель
                <svg width="0.7em" height="1em" viewBox="0 0 16 16" class="bi bi-caret-down-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                </svg>
            </a>
            <div class="form-group row" id="collapseDateWeek">
                <form class="col-md-3" @submit.prevent="submitHandler" action='' method="POST">
                    <label>
                        <input type="date" class="form-control" placeholder="с"
                               v-model.trim="dateFrom"/>
                        <button class="btn btn-success">Сохранить</button>
                    </label>
                </form>
                <form class="col-md-4" @submit.prevent="submitClone" action='' method="POST">
                    <button class="btn btn-primary">Дублирование расписания на следующую неделю</button>
                </form>
            </div>
        </section>
        <section>
            <a  href="#collapseTime" class="text-justify" data-toggle="collapse">
                Настройка времени и наименований занятий
                <svg width="0.7em" height="1em" viewBox="0 0 16 16" class="bi bi-caret-down-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                </svg>
            </a>
            <div class="collapse" id="collapseTime">
                <FormModCard />
            </div>
        </section>
    </div>
</template>

<script>
    import FormModCard from "./FormModCard";
    import {required} from "vuelidate/lib/validators";
    export default {
        name: "SchModeration",
        components: {FormModCard},
        data: () => ({
            dateFrom: '',
        }),
        validations: {
            dateFrom: {required}
        },
        methods:{
            async submitHandler (){
                if(this.$v.$invalid){
                    this.$v.$touch()
                    return
                }

                const formData = {
                    dateFrom: this.dateFrom
                }
                try{
                    await this.$store.dispatch('modScheduleDate', formData)
                    this.$toast.success('Изменения применены');
                }catch (e) {
                    this.$toast.error('Ошибка применения изменений!');
                }
            },
            async submitClone (){
                try{
                    await this.$store.dispatch('cloneSchedule', {})
                    this.$toast.success('Дублирование расписания прошло успешно!');
                }catch (e) {
                    this.$toast.error('Ошибка дублирования расписания!');
                }
            }
        }
    }
</script>

<style scoped>
    section a{
        text-decoration: none;
        font-size: 1.5em;
        font-family: 'Oswald', sans-serif;
        color: #0a0a0a;
    }
    .form-group{
        padding: 0;
        margin: 0;
    }
    label button{
        margin-left: 20px;
        margin-right: 0;
    }
    #collapseDateWeek label{
        display: inline-flex;
    }
    .mod-block{
        display: block !important;
        padding-bottom: 1rem;
    }
</style>
