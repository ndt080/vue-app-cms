<template>
    <form>
        <label>
            <select class="custom-select my-1 mr-sm-2">
                <option value="actual_week">Текущая неделя</option>
                <option value="next_week">Следующая неделя</option>
            </select>
            <select class="custom-select my-1 mr-sm-2">
                <option value="M">Понедельник</option>
                <option value="T">Вторник</option>
                <option value="W">Среда</option>
                <option value="Th">Четверг</option>
                <option value="W">Пятница</option>
                <option value="S">Суббота</option>
            </select>
            <select class="custom-select my-1 mr-sm-2">
                <option value="1">пара 1</option>
                <option value="2">пара 2</option>
                <option value="3">пара 3</option>
                <option value="4">пара 4</option>
            </select>
        </label>
        <div>
            <a class="dropdown-toggle" data-toggle="collapse" href="#collapseTimeLess" aria-expanded="false" aria-controls="collapseTimeLess">
                Время
            </a>
            <div class="collapse" id="collapseTimeLess">
                <label>
                с <input type="time" class="form-control" /> по <input type="time" class="form-control"/>
                </label>
            </div>
        </div>
        <div>
            <a class="dropdown-toggle" data-toggle="collapse" href="#collapseCommonLess" aria-expanded="false" aria-controls="collapseCommonLess">
                Общее
            </a>
            <div class="collapse" id="collapseCommonLess">
                предмет: <input type="text" class="form-control"/>
                преподаватель: <input type="text" class="form-control" />
                кабинет: <input type="text" class="form-control"/>
            </div>
        </div>
        <div>
            <a class="dropdown-toggle" data-toggle="collapse" href="#collapseHomeLess" aria-expanded="false" aria-controls="collapseHomeLess">
                Домашнее задание
            </a>
            <div class="collapse" id="collapseHomeLess">
                <input type="text" class="form-control"/>
            </div>
        </div>

        <button type="submit" class="btn btn-success">Сохранить</button>
    </form>
</template>

<script>
    export default {
        name: "FormModCard"
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
