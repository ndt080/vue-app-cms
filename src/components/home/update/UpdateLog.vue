<template>
  <div class="card card-common-settings" style="max-width: 100%; max-height: 25rem">
    <div class="card-title" style="margin: 0">UPDATE LOG:</div>
    <ul class="list-group" style="overflow-y: scroll;">
      <Post_update  v-for="(post, i) of posts"
                    v-bind:key="post.id"
                    v-bind:index="i"
                    v-bind:post="post"
                    v-bind:date="post.date"
                    v-bind:title="post.title"
                    v-bind:text="post.text"
      />
    </ul>
    <AddPost_update v-if="this.status === 'admin'"/>
  </div>
</template>

<script>
import Post_update from "@/components/home/update/Post_update";
import AddPost_update from "@/components/home/update/AddPost_update";
export default {
name: "UpdateLog",
  components: {AddPost_update, Post_update},
  async mounted() {
    await this.$store.dispatch('fetchPostsUpdate')
  },
  computed: {
    status() {
      return this.$store.getters.info.status
    },
    posts() {
      return this.$store.getters.postsUpdate
    },
  }
}
</script>

<style scoped>
.card-title{
  background: #fff;
  border-top-left-radius: 0.25rem;
  border-top-right-radius: 0.25rem;
  padding: 7px 14px 7px 14px;
  font-size: 1.3em;
  color: #0a0a0a;
}
.list-group-item-none{
  background: rgba(255,255,255, 0);
  border-radius: 0;
}
.list-group-item-none p{
  color: #e2e3e5 !important;
}
</style>
