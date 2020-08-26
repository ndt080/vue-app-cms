<template>
    <div class="card" style="max-width: 60rem">
        <div class="card-body">
            <table class="table table-hover">
                <tbody>
                <tr>
                    <td>ФИО</td>
                    <td>{{name}}</td>
                </tr>
                <tr>
                    <td>Дата рождения</td>
                    <td>{{dateBirth}}</td>
                </tr>
                <tr>
                    <td>Курс/группа</td>
                    <td>курс {{course}} группа {{group}}</td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    export default {
        name: "FormProfile",
        computed: {
            name () {
                return this.$store.getters.info.username
            },
            dateBirth (){
                return this.$store.getters.info.dateBirth
            },
            course (){
                return this.$store.getters.info.course
            },
            group (){
                return this.$store.getters.info.group
            },
        },
    }
</script>

<style scoped>

</style>
