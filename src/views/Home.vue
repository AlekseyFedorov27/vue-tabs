<template>
  <div>
    <div class="container" ref="tabsSliderContainer">
      <div class="nav_btn nav_btn--prev" @click="prev" v-if="showNav && showNavPrev">&#8249;</div>
      <Tabs ref="tabs" />
      <div class="nav_btn nav_btn--next" @click="next" v-if="showNav && showNavNext">
        &#8250;
      </div>
    </div>
  </div>
</template>

<script>
import Tabs from "@/components/Tabs";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Home",
  components: { Tabs },
  data() {
    return {
      tabs: null,
      showNav: false,
      tabsContainer: null,
      domMutationsObserver: null,
      resizeObserver: null,
      selectIdTab: this.select,
    };
  },
  async mounted() {
    await this.fetchUsers();
    this.fetchPosts(this.select + 1);
    this.initElements();
    this.initDOMResizeObserver();
    this.initDOMMutationsObserver();
  },
  destroyed() {
    this.destroyObservers();
  },
  watch: {
    select() {
      this.selectTabID(this.select);
    },
  },
  computed: {
    showNavPrev() {
      return this.select !== 0;
    },
    showNavNext() {
      let tabsLength = Array.from(this.tabs.childNodes).length;
      this.hendlerScroll();
      return this.select !== tabsLength - 1;
    },
    ...mapGetters(["select", "select", "users"]),
  },
  methods: {
    ...mapActions(["fetchUsers", "fetchPosts", "deleteUser", "selectTab"]),
    hendlerScroll() {
      let tabsScroll = this.tabs.scrollLeft;
      let tabsContainerLenght = this.tabsContainer.clientWidth;
      return tabsScroll + 100 > tabsContainerLenght;
    },
    prev() {
      if (this.select > 0) {
        this.selectTab(this.select - 1);
        this.selectTabID(this.select);
      }
    },
    next() {
      if (this.select < this.users.length) {
        this.selectTab(this.select + 1);
        this.selectTabID(this.select);
      }
    },
    initElements() {
      this.tabs = this.$refs.tabs.$el.children[0];
      this.tabsContainer = this.$refs.tabsSliderContainer;
    },
    initDOMResizeObserver() {
      this.resizeObserver = new ResizeObserver((records) => {
        const [record] = records;
        if (!record) return;
        let wightTabs = record.target.scrollWidth;
        let wightView = record.contentRect.width;
        this.showNav = wightTabs > wightView;
      });
      this.resizeObserver.observe(this.tabs);
    },
    initDOMMutationsObserver() {
      const config = {
        childList: true,
        subtree: true,
        characterDataOldValue: true,
      };
      this.domMutationsObserver = new MutationObserver((records) => {
        const [record] = records;
        if (!record) return;
        let wightTabs = record.target.scrollWidth;
        this.showNav = wightTabs > this.tabsContainer.offsetWidth;
      });
      this.domMutationsObserver.observe(this.tabs, config);
    },
    getScrollLenghtIdTab(id) {
      let arr = Array.from(this.tabs.childNodes);
      let activeArr = arr.filter((el) => el.id <= id);
      let scrollLenght = activeArr.reduce((acc, item) => {
        acc += item.clientWidth;
        return acc;
      }, 0);
      return scrollLenght;
    },
    selectTabID(id) {
      this.tabs.scrollLeft = this.getScrollLenghtIdTab(id);
    },
    destroyObservers() {
      if (this.domMutationsObserver) {
        this.domMutationsObserver.disconnect();
      }
      if (this.resizeObserver) {
        this.resizeObserver.disconnect();
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.container {
  position: relative;
  max-width: 1000px;
  margin: 0 auto;
  padding-top: 30px;
}

.nav_btn {
  position: absolute;
  cursor: pointer;
  background-color: aquamarine;
  padding: 8px;
  user-select: none;
  top: 30px;

  &--prev {
    left: 0;
  }

  &--next {
    right: 0;
  }
}
</style>
