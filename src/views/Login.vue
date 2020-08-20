<template>
  <div class="login">
    <h1>Вход</h1>
    <form>
      <div class="form-group">
        <label for="exampleInputEmail1">Электронная почта</label>
        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
        <small id="emailHelp" class="form-text text-muted">Мы никогда не будем делиться вашей электронной почтой с кем-либо еще.</small>
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Пароль</label>
        <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
      </div>
      <div class="form-check">
        <input type="checkbox" class="form-check-input" id="exampleCheck1">
        <label class="form-check-label" for="exampleCheck1">Check me out</label>
      </div>
      <button type="submit" class="btn btn-primary">Войти</button>
      <div class="text-center p-t-46 p-b-20">
        <span class="txt2">
            или <router-link class="router-link" to="/registration">зарегистрироваться</router-link>
        </span>
      </div>
    </form>
  </div>
</template>

<style scoped>
  .btn{
    width: 100%;
  }
</style>
