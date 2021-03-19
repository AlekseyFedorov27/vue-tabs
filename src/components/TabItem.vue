<template>
  <div class="vtab" :class="tabClasses" @click="onSelectTab" :id="tab.id">
    <span class="ellipsis" v-tooltip:name="'bottom'" id="tooltip">
      <div class="vtab-name">
        {{ tab.name }}
      </div>
    </span>
    <span @click.stop="onDeleteTab()">
      <svg height="8pt" viewBox="0 0 365.696 365.696" width="8pt" xmlns="http://www.w3.org/2000/svg">
        <path
          d="m243.1875 182.859375 113.132812-113.132813c12.5-12.5 12.5-32.765624 0-45.246093l-15.082031-15.082031c-12.503906-12.503907-32.769531-12.503907-45.25 0l-113.128906 113.128906-113.132813-113.152344c-12.5-12.5-32.765624-12.5-45.246093 0l-15.105469 15.082031c-12.5 12.503907-12.5 32.769531 0 45.25l113.152344 113.152344-113.128906 113.128906c-12.503907 12.503907-12.503907 32.769531 0 45.25l15.082031 15.082031c12.5 12.5 32.765625 12.5 45.246093 0l113.132813-113.132812 113.128906 113.132812c12.503907 12.5 32.769531 12.5 45.25 0l15.082031-15.082031c12.5-12.503906 12.5-32.769531 0-45.25zm0 0"
        />
      </svg>
    </span>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import tooltip from "../ui/tooltip.js";
export default {
  name: "TabItem",
  props: {
    tab: {
      type: Object,
      required: true,
    },
    id: {
      type: Number,
    },
  },
  mixins: [tooltip],
  computed: {
    tabClasses() {
      return { active: this.select === this.id };
    },
    ...mapGetters(["select"]),
  },
  methods: {
    ...mapActions(["selectTab", "deleteUser", "fetchPosts"]),
    onSelectTab() {
      this.selectTab(this.id);
    },
    onDeleteTab() {
      this.deleteUser(this.id);
      this.fetchPosts(this.tab.id);
    },
  },
};
</script>

<style lang="scss" scoped>
.vtab {
  white-space: nowrap;
  cursor: pointer;
  padding: 10px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  user-select: none;

  &.active {
    background-color: rgb(255, 218, 115);
  }

  &-name {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-right: 5px;
    width: 90%;
  }
}
</style>
