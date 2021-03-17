<template>
  <div class="userinfo" v-if="userInf">
    <div>id: {{ userInf.id }}</div>
    <div>name : {{ userInf.name }}</div>
    <div>username : {{ userInf.username }}</div>
    <div>email : {{ userInf.email }}</div>
    <div>address : {{ userInf.address.street }}</div>
    <div>phone: {{ userInf.phone }}</div>
    <div>website: {{ userInf.website }}</div>
  </div>
</template>
<script>
export default {
  name: "InfoUser",
  props: {
    userInf: {
      type: Object,
    },
  },
};
</script>

<style lang="scss" scoped>
.userinfo {
  padding: 20px;
  background-color: rgb(231, 231, 231);
  div {
    margin-bottom: 10px;
  }
}
</style>
