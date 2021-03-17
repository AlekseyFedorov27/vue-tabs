<template>
  <div class="userpost" v-if="posts.length">
    <h3>User posts: </h3>
      <template v-for="item in posts">
        <div :key="item.id">
          <div>title : {{ item.title }}</div>
        </div>
      </template>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "InfoPosts",
  computed: {
    ...mapGetters(["posts"]),
  },
};
</script>

<style lang="scss" scoped>
.userpost {
  position: relative;
  padding: 20px;
  background-color: rgb(189, 242, 252);
  div {
    margin-bottom: 10px;
  }
  .postlist {
    position: relative;
  }
}


</style>
