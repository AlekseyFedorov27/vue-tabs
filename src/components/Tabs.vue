<template>
  <div class="container_tabs" v-if="users.length > 0">
    <div class="vtabs">
      <template v-for="(item, index) in users">
        <tab-item :key="item.id" :tab="item" :id="index" />
      </template>
    </div>
    <template>
      <InfoUser :userInf="users[select]"/>
    </template>
    <UserPosts />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import InfoUser from "@/components/InfoUser";
import TabItem from "@/components/TabItem";
import UserPosts from "@/components/UserPosts";

export default {
  name: "Tabs",
  components: { TabItem, InfoUser, UserPosts },
  data: function() {
    return {
      selectUserId: this.select,
      tabWight: 10,
    };
  },
  computed: {
    ...mapGetters(["users", "select"]),
  },
};
</script>
<style lang="scss" scoped>
.vtabs {
  display: flex;
  overflow-x: scroll;
  scrollbar-width: thin;
  scroll-behavior: smooth;
}

*::-webkit-scrollbar {
  width: 3px;
}
*::-webkit-scrollbar-thumb {
  background-color: rgb(162, 162, 238);
  border-radius: 20px;
}
</style>
