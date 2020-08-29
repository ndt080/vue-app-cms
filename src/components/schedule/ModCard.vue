<template>
    <section>
        <form class="card-body form-group" @submit.prevent="submitHandler" action='' method="POST">
            <a class="dropdown-toggle" data-toggle="collapse" href="#collapseDateWeek" aria-expanded="false" aria-controls="collapseDateWeek">
                Настройка даты текущей недели
            </a>
            <div class="form-group row collapse" id="collapseDateWeek">
                <div class="col-md-6">
                    <input type="date" class="form-control" placeholder="с"
                           v-model.trim="dateFrom"/>
                </div>
                <div class="col-md-2">
                    <button class="btn btn-success">Сохранить</button>
                </div>
            </div>
        </form>

        <a class="dropdown-toggle" data-toggle="collapse" href="#collapseTime" aria-expanded="false" aria-controls="collapseTime">
            Настройка времени и наименований занятий
        </a>
        <div class="collapse" id="collapseTime">
            <FormModCard />
        </div>
    </section>
</template>

<script>
    import FormModCard from "./FormModCard";
    import {required} from "vuelidate/lib/validators";
    export default {
        name: "ModCard",
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
            }
        }
    }
</script>

<style scoped>
    section a{
        text-decoration: none;
        font-size: 1.7em;
        font-family: 'Oswald', sans-serif;
        color: #0a0a0a;
    }
    form {
        padding: 0;
    }
    @media (max-width: 700px) {
        section a {
            font-size: 1.4em;
        }
    }
    .form-group{
        padding: 0;
        margin: 0;
    }
</style>
