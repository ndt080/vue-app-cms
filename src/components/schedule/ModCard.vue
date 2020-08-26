<template>
    <section>
        <div>
            <form class="card-body form-group" @submit.prevent="submitHandler" action='' method="POST">
                <a class="dropdown-toggle" data-toggle="collapse" href="#collapseDateWeek" aria-expanded="false" aria-controls="collapseDateWeek">
                    Настройка даты текущей недели
                </a>
                <div class="collapse" id="collapseDateWeek">
                    <div class="form-row">
                        <div class="col form-group">
                            <input type="date" class="form-control" placeholder="с"
                                   v-model.trim="dateFrom"/>
                        </div>
                        <div class="col form-group">
                            <button class="btn btn-success">Сохранить</button>
                        </div>
                    </div>
                </div>

            </form>
        </div>
        <div>
            <a class="dropdown-toggle" data-toggle="collapse" href="#collapseTime" aria-expanded="false" aria-controls="collapseTime">
                Настройка времени и наименований занятий
            </a>
            <div class="collapse" id="collapseTime">
            <FormModCard />
            </div>
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
</style>
