<template>
  <div>
    <h3 class="post-header">Доска объявлений </h3>
    <ul class="list-group">
      <Post_update  v-for="(post, i) in posts"
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
import posts from "@/store/posts";

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
  },
}
</script>

<style scoped>
.post-header{
  color: #fff;
  background: #3740ff;
  padding: 0.5rem;
  border-radius: 0.3rem;
  text-align: center;
}
</style>
