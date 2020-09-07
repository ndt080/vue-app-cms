<template>
    <div class="mod-block">
        <section>
            <a href="#collapseDateWeek" class="text-justify" data-toggle="collapse">
                Настройка недель
                <svg width="0.7em" height="1em" viewBox="0 0 16 16" class="bi bi-caret-down-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                </svg>
            </a>
            <div class="form-group row collapse" id="collapseDateWeek">
                <form class="col-md-7" @submit.prevent="submitHandler" action='' method="POST">
                    <label>
                        <input type="date" class="form-control" placeholder="с"
                               v-model.trim="dateFrom"/>
                        <button class="btn btn-success">Сохранить</button>
                    </label>
                </form>
                <form class="col-md-4" @submit.prevent="submitClone" action='' method="POST">
                    <button class="btn btn-light" title="Дублирование расписания на следующую неделю">
                      <img alt="Duplicate"
                           width="20px" height="20px"
                           src="data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjUxMiIgdmlld0JveD0iMCAwIDYwIDYwIiB3aWR0aD0iNTEyIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxnIGlkPSJQYWdlLTEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PGcgaWQ9IjEwNC0tLUNsb25lLURyaXZlIiBmaWxsLXJ1bGU9Im5vbnplcm8iPjxwYXRoIGlkPSJTaGFwZSIgZD0ibTM5IDIwdjMzYzAtMy4zMTM3MDg1LTIuNjg2MjkxNS02LTYtNmgtMjZjLTMuMzExNjUzMzQuMDA0OTU2My01Ljk5NTA0MzY2IDIuNjg4MzQ2Ny02IDZ2LTMzYzAtMy4zMTM3MDg1IDIuNjg2MjkxNS02IDYtNmgyNmMzLjMxMzcwODUgMCA2IDIuNjg2MjkxNSA2IDZ6IiBmaWxsPSIjZThlZGZjIi8+PHBhdGggaWQ9IlNoYXBlIiBkPSJtMzMgMTRoLTNjMy4zMTM3MDg1IDAgNiAyLjY4NjI5MTUgNiA2djI3LjgxMWMxLjg1NDE5NTMgMS4wNzA1MTgxIDIuOTk3NDQ2OSAzLjA0Nzk2MjIgMyA1LjE4OXYtMzNjMC0zLjMxMzcwODUtMi42ODYyOTE1LTYtNi02eiIgZmlsbD0iI2NhZDlmYyIvPjxwYXRoIGlkPSJTaGFwZSIgZD0ibTM5IDUzYy0uMDA0OTU2MyAzLjMxMTY1MzMtMi42ODgzNDY3IDUuOTk1MDQzNy02IDZoLTI2Yy0zLjMxMzcwODUgMC02LTIuNjg2MjkxNS02LTYgLjAwNDk1NjM0LTMuMzExNjUzMyAyLjY4ODM0NjY2LTUuOTk1MDQzNyA2LTZoMjZjMy4zMTM3MDg1IDAgNiAyLjY4NjI5MTUgNiA2eiIgZmlsbD0iI2E0YzJmNyIvPjxwYXRoIGlkPSJTaGFwZSIgZD0ibTMzIDQ3aC0zYzMuMzEzNzA4NSAwIDYgMi42ODYyOTE1IDYgNi0uMDA0OTU2MyAzLjMxMTY1MzMtMi42ODgzNDY3IDUuOTk1MDQzNy02IDZoM2MzLjMxMTY1MzMtLjAwNDk1NjMgNS45OTUwNDM3LTIuNjg4MzQ2NyA2LTYgMC0xLjU5MTI5ODktLjYzMjE0MS0zLjExNzQyMjQtMS43NTczNTkzLTQuMjQyNjQwN3MtMi42NTEzNDE4LTEuNzU3MzU5My00LjI0MjY0MDctMS43NTczNTkzeiIgZmlsbD0iIzdmYWNmYSIvPjxjaXJjbGUgaWQ9Ik92YWwiIGN4PSIzMyIgY3k9IjUzIiBmaWxsPSIjZThlZGZjIiByPSIyIi8+PHBhdGggaWQ9IlNoYXBlIiBkPSJtNTkgN3YzM2MwLTMuMzEzNzA4NS0yLjY4NjI5MTUtNi02LTZoLTE0di0xNGMwLTMuMzEzNzA4NS0yLjY4NjI5MTUtNi02LTZoLTEydi03YzAtMy4zMTM3MDg1IDIuNjg2MjkxNS02IDYtNmgyNmMzLjMxMzcwODUgMCA2IDIuNjg2MjkxNSA2IDZ6IiBmaWxsPSIjZThlZGZjIi8+PHBhdGggaWQ9IlNoYXBlIiBkPSJtNTMgMWgtM2MzLjMxMzcwODUgMCA2IDIuNjg2MjkxNSA2IDZ2MjcuODExYzEuODU0MTk1MyAxLjA3MDUxODEgMi45OTc0NDY5IDMuMDQ3OTYyMiAzIDUuMTg5di0zM2MwLTMuMzEzNzA4NS0yLjY4NjI5MTUtNi02LTZ6IiBmaWxsPSIjY2FkOWZjIi8+PHBhdGggaWQ9IlNoYXBlIiBkPSJtNTkgNDBjLS4wMDQ5NTYzIDMuMzExNjUzMy0yLjY4ODM0NjcgNS45OTUwNDM3LTYgNmgtMTR2LTEyaDE0YzMuMzEzNzA4NSAwIDYgMi42ODYyOTE1IDYgNnoiIGZpbGw9IiNhNGMyZjciLz48cGF0aCBpZD0iU2hhcGUiIGQ9Im01MyAzNGgtM2MzLjMxMzcwODUgMCA2IDIuNjg2MjkxNSA2IDYtLjAwNDk1NjMgMy4zMTE2NTMzLTIuNjg4MzQ2NyA1Ljk5NTA0MzctNiA2aDNjMy4zMTE2NTMzLS4wMDQ5NTYzIDUuOTk1MDQzNy0yLjY4ODM0NjcgNi02IDAtMS41OTEyOTg5LS42MzIxNDEtMy4xMTc0MjI0LTEuNzU3MzU5My00LjI0MjY0MDdzLTIuNjUxMzQxOC0xLjc1NzM1OTMtNC4yNDI2NDA3LTEuNzU3MzU5M3oiIGZpbGw9IiM3ZmFjZmEiLz48Y2lyY2xlIGlkPSJPdmFsIiBjeD0iNTMiIGN5PSI0MCIgZmlsbD0iI2NhZDlmYyIgcj0iMiIvPjxwYXRoIGlkPSJTaGFwZSIgZD0ibTI0IDdjMC0zLjMxMzcwODUgMi42ODYyOTE1LTYgNi02aC0zYy0zLjMxMzcwODUgMC02IDIuNjg2MjkxNS02IDZ2N2gzeiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGlkPSJTaGFwZSIgZD0ibTcgNTloM2MtMy4zMTM3MDg1IDAtNi0yLjY4NjI5MTUtNi02di0zM2MwLTMuMzEzNzA4NSAyLjY4NjI5MTUtNiA2LTZoLTNjLTMuMzEzNzA4NSAwLTYgMi42ODYyOTE1LTYgNnYzM2MwIDMuMzEzNzA4NSAyLjY4NjI5MTUgNiA2IDZ6IiBmaWxsPSIjZmZmIi8+PHBhdGggaWQ9IlJlY3RhbmdsZS1wYXRoIiBkPSJtMCAyMGgydjhoLTJ6IiBmaWxsPSIjZmZmIi8+PGcgZmlsbD0iIzQyOGRmZiI+PGNpcmNsZSBpZD0iT3ZhbCIgY3g9IjEiIGN5PSIyNCIgcj0iMSIvPjxwYXRoIGlkPSJTaGFwZSIgZD0ibTMzIDUwYy0xLjY1Njg1NDIgMC0zIDEuMzQzMTQ1OC0zIDNzMS4zNDMxNDU4IDMgMyAzIDMtMS4zNDMxNDU4IDMtMy0xLjM0MzE0NTgtMy0zLTN6bTAgNGMtLjU1MjI4NDcgMC0xLS40NDc3MTUzLTEtMXMuNDQ3NzE1My0xIDEtMSAxIC40NDc3MTUzIDEgMS0uNDQ3NzE1MyAxLTEgMXoiLz48cGF0aCBpZD0iU2hhcGUiIGQ9Im01IDIyYy41NTIyODQ3NSAwIDEtLjQ0NzcxNTMgMS0xdi0xYzAtLjU1MjI4NDctLjQ0NzcxNTI1LTEtMS0xcy0xIC40NDc3MTUzLTEgMXYxYzAgLjU1MjI4NDcuNDQ3NzE1MjUgMSAxIDF6Ii8+PHBhdGggaWQ9IlNoYXBlIiBkPSJtNCA0MWMwIC41NTIyODQ3LjQ0NzcxNTI1IDEgMSAxczEtLjQ0NzcxNTMgMS0xdi0xNmMwLS41NTIyODQ3LS40NDc3MTUyNS0xLTEtMXMtMSAuNDQ3NzE1My0xIDF6Ii8+PHBhdGggaWQ9IlNoYXBlIiBkPSJtNTMgMGgtMjZjLTMuODY0MTY1Ny4wMDQ0MDg2NC02Ljk5NTU5MTQgMy4xMzU4MzQzNC03IDd2NmgtMTNjLTMuODY0MTY1NjYuMDA0NDA4Ni02Ljk5NTU5MTM2IDMuMTM1ODM0My03IDcgMCAuNTUyMjg0Ny40NDc3MTUyNSAxIDEgMXMxLS40NDc3MTUzIDEtMWMuMDAzMzA2MTItMi43NjAwNTMyIDIuMjM5OTQ2ODUtNC45OTY2OTM5IDUtNWgyNmMyLjc2MDA1MzIuMDAzMzA2MSA0Ljk5NjY5MzkgMi4yMzk5NDY4IDUgNXYyOC4xMTFjLTEuMzEzMTkyNS0xLjM1MDAyNDgtMy4xMTY2NDEtMi4xMTE0NDA3LTUtMi4xMTFoLTI2Yy0xLjg4MzM1OTA0LS4wMDA0NDA3LTMuNjg2ODA3NDcuNzYwOTc1Mi01IDIuMTExdi0yMC4xMTFjMC0uNTUyMjg0Ny0uNDQ3NzE1MjUtMS0xLTFzLTEgLjQ0NzcxNTMtMSAxdjI1Yy4wMDQ0MDg2NCAzLjg2NDE2NTcgMy4xMzU4MzQzNCA2Ljk5NTU5MTQgNyA3aDI2YzMuODY0MTY1Ny0uMDA0NDA4NiA2Ljk5NTU5MTQtMy4xMzU4MzQzIDctN3YtNmgxM2MzLjg2MzkzNzYtLjAwNDk1ODQgNi45OTUwNDE2LTMuMTM2MDYyNCA3LTd2LTMzYy0uMDA0NDA4Ni0zLjg2NDE2NTY2LTMuMTM1ODM0My02Ljk5NTU5MTM2LTctN3ptLTIwIDU4aC0yNmMtMi43NjE0MjM3NSAwLTUtMi4yMzg1NzYzLTUtNXMyLjIzODU3NjI1LTUgNS01aDI2YzIuNzYxNDIzNyAwIDUgMi4yMzg1NzYzIDUgNXMtMi4yMzg1NzYzIDUtNSA1em0yMy41My0xNC40NjRjLS45MzE5Nzc5Ljk0Mjc1MzctMi4yMDQzNTg0IDEuNDcwNDQ5Mi0zLjUzIDEuNDY0bC0xMyAuMDAwMDU4NHYtMTAuMDAwMDU4NGgxM2MyLjc2MDA1MzIuMDAzMzA2MSA0Ljk5NjY5MzkgMi4yMzk5NDY4IDUgNSAuMDA1OTE2OSAxLjMyODQ4MTQtLjUyNDAzMSAyLjYwMzI0MDQtMS40NyAzLjUzNnptMS40Ny04LjQyNWMtMS4zMTMxOTI1LTEuMzUwMDI0OC0zLjExNjY0MS0yLjExMTQ0MDctNS0yLjExMWgtMTN2LTEzYy0uMDA0NDA4Ni0zLjg2NDE2NTctMy4xMzU4MzQzLTYuOTk1NTkxNC03LTdoLTd2LTFjMC0uNTUyMjg0Ny0uNDQ3NzE1My0xLTEtMXMtMSAuNDQ3NzE1My0xIDF2MWgtMnYtNmMuMDAzMzA2MS0yLjc2MDA1MzE1IDIuMjM5OTQ2OC00Ljk5NjY5Mzg4IDUtNWgyNmMyLjc2MDA1MzIuMDAzMzA2MTIgNC45OTY2OTM5IDIuMjM5OTQ2ODUgNSA1eiIvPjxwYXRoIGlkPSJTaGFwZSIgZD0ibTUzIDM3Yy0xLjY1Njg1NDIgMC0zIDEuMzQzMTQ1OC0zIDNzMS4zNDMxNDU4IDMgMyAzIDMtMS4zNDMxNDU4IDMtMy0xLjM0MzE0NTgtMy0zLTN6bTAgNGMtLjU1MjI4NDcgMC0xLS40NDc3MTUzLTEtMXMuNDQ3NzE1My0xIDEtMSAxIC40NDc3MTUzIDEgMS0uNDQ3NzE1MyAxLTEgMXoiLz48cGF0aCBpZD0iU2hhcGUiIGQ9Im0yNSA2Yy0uNTUyMjg0NyAwLTEgLjQ0NzcxNTI1LTEgMXYxYzAgLjU1MjI4NDc1LjQ0NzcxNTMgMSAxIDFzMS0uNDQ3NzE1MjUgMS0xdi0xYzAtLjU1MjI4NDc1LS40NDc3MTUzLTEtMS0xeiIvPjwvZz48L2c+PC9nPjwvc3ZnPg==" />
                      <span>&nbsp; CLONE</span>
                    </button>
                </form>
            </div>
        </section>
        <section>
            <a  href="#collapseTime" class="text-justify" data-toggle="collapse">
                Настройка занятий
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
      position: relative;
      margin: 0;
      padding: 0;
      width: 100%;
    }
</style>
