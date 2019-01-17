<template>
  <div class="page-home">

    <not-find content="建设中...">
      <div slot="button"></div>
    </not-find>

  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {}
  },
  computed: {
    ...mapState(["windowHeight"])
  },

};
</script>
<style lang="less">
</style>
