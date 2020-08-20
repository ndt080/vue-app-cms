<template>
  <div class="registration">
    <h1>Регистрация</h1>
    <form class="form-horizontal" action='' method="POST">
        <div class="form-group">
          <!-- Username -->
          <label class="control-label"  for="username">Имя пользователя</label>
            <input type="text" id="username" name="username" placeholder="" class="form-control">
        </div>
        <div class="control-group">
          <!-- E-mail -->
          <label class="control-label" for="date">Дата рождения</label>
          <input type="text" id="date" name="date" placeholder="" class="form-control">
          <p class="help-block"></p>
        </div>

        <div class="control-group">
          <!-- E-mail -->
          <label class="control-label" for="email">Электронная почта</label>
            <input type="text" id="email" name="email" placeholder="" class="form-control">
            <p class="help-block"></p>
        </div>

        <div class="control-group">
          <!-- Password-->
          <label class="control-label" for="password">Пароль</label>
            <input type="password" id="password" name="password" placeholder="" class="form-control">
            <p class="help-block">Пароль должен содержать более 4 символов</p>
        </div>

        <div class="control-group">
          <!-- Password -->
          <label class="control-label"  for="password_confirm">Подтверждение пароля</label>
          <div class="controls">
            <input type="password" id="password_confirm" name="password_confirm" placeholder="" class="form-control">
            <p class="help-block"></p>
          </div>
        </div>

        <div class="control-group">
          <button class="btn btn-success">Зарегистрироваться</button>
          <div class="text-center p-t-46 p-b-20">
            <span class="txt2">
                или <router-link class="router-link" to="/login">войти</router-link>
            </span>
          </div>
        </div>
    </form>
  </div>
</template>

<style scoped>
  .btn{
    width: 100%;
  }
</style>
