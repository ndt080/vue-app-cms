<template>
    <section>
        <div>
            <a class="dropdown-toggle" data-toggle="collapse" href="#collapseDateWeek" aria-expanded="false" aria-controls="collapseDateWeek">
                Настройка даты текущей недели
            </a>
            <div class="collapse" id="collapseDateWeek">
                <div class="form-row">
                    <div class="col">
                        <input type="date" class="form-control" placeholder="с">
                    </div>
                    <p> </p>
                    <div class="col">
                        <input type="date" class="form-control" placeholder="по">
                    </div>
                </div>
            </div>
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
    export default {
        name: "ModCard",
        components: {FormModCard}
    }
</script>

<style scoped>
section a{
    text-decoration: none;
    font-size: 1.7em;
    font-family: 'Oswald', sans-serif;
    color: #0a0a0a;
}
</style>
