<template>
  <div id="app" :class="{shrink:sliderExpand}">
    <Spin fix v-show="fullLoading">
      <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
      <div>加载中...</div>
    </Spin>
    <template v-if="token">
      <f-header></f-header>
      <div class="container">
        <f-slider></f-slider>
        <div class="main">
          <f-tab></f-tab>
        </div>
      </div>
      <f-footer></f-footer>
    </template>
    <Login v-else></Login>
  </div>
</template>
<script>
import FHeader from "@/components/layout/FHeader";
import FSlider from "@/components/layout/FSlider";
import FFooter from "@/components/layout/FFooter";
import FTab from "@/components/layout/FTab";


import Login from "./Login";

import { mapMutations, mapState } from "vuex";
export default {
  components: {
    FHeader,
    FSlider,
    FFooter,
    FTab,
    Login,
  },
  computed: {
    ...mapState(["token"]),
    ...mapState("app", ["sliderExpand"]),
    ...mapState('common', ['fullLoading'])
  },
  methods: {
    ...mapMutations("app", ["init"])
  },
  mounted() {
    this.init();
  }
};
</script>
<style lang="less">
  .demo-spin-icon-load{
    animation: ani-demo-spin 1s linear infinite;
  }
  @keyframes ani-demo-spin {
    from { transform: rotate(0deg);}
    50%  { transform: rotate(180deg);}
    to   { transform: rotate(360deg);}
  }

</style>
