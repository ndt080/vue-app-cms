<template>
  <li class="list-group-item list-group-item-none">
    <div class="card-body-text">
      <p class="text-left date">{{post.date}}</p>
      <p class="text-center title">{{post.title}}</p>
    </div>
    <div class="card-body-text">
      <p class="text-justify" style="white-space: pre-line">{{post.text}}</p>
    </div>
    <hr/>
  </li>
</template>

<script>
export default {
name: "Post_update",
  props: {
    post: {
      type: Object,   //указываем тип передаваемого элемента
      required: true,  //делаем его обязательным
    },
  },
}
</script>

<style scoped>
.list-group-item-none{
  background: rgba(255,255,255,0.5) !important;
  border: none;
  padding: 0;
}
.title{
  font-size: 1.3rem;
  font-weight: bold;
}
.date{
  font-size: 1.3rem;
  font-weight: bold;
  color: #3740ff;
}
</style>
