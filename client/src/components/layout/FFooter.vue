<template>
    <div class="f-footer">
        <div class="f-footer__left">
            当前用户：{{me.name}}
        </div>
        <div class="f-footer__center">
            版权所有 @ 2018-2019 <a href="javascript:;">XXXX软件有限公司</a>
        </div>
        <div class="f-footer__right">
            版本号：v0.1.0
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "FFooter",
  computed: {
    ...mapState("common", ["me"])
  }
};
</script>

<style lang="less">
.f-footer {
  height: 30px;
  line-height: 30px;
  border-top: 1px solid #d3d3d3;
  font-size: 12px;
  color: #000;
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  right: 0;

  &__left {
    width: 200px;
    padding: 0 15px;
  }
  &__center {
    flex: 1;
    text-align: center;
  }
  &__right {
    width: 200px;
    padding: 0 15px;
    text-align: right;
  }
}
</style>
