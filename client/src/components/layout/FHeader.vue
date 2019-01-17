<template>
    <div class="f-header">
        <div class="f-header__title">
            <img src="~@/assets/images/ff.png" style="width: 40px;margin-left: 20px;margin-right: -20px;" alt=""> <img src="~@/assets/images/sys.png" style="width: 320px;" alt="">
        </div>

        <div class="f-header__module">
            <!--<ul>-->
                <!--<li v-for="m in module" :class="{active: m.id == selectModule}" @click="set_module(m.id)" :key="m.id">-->
                    <!--<a href="javascript:;">-->
                        <!--<iconfont :icon="m.iconCls"></iconfont>-->
                        <!--<span>{{m.text}}</span>-->
                    <!--</a>-->
                <!--</li>-->
            <!--</ul>-->
        </div>
        <div class="user-info">
            <Poptip :title="'您好，'+ me.name" placement="bottom-end">
                <div slot="content">
                    <div class="ivu-cell-group"><div class="ivu-cell">
                        <div class="ivu-cell-link">
                            <div class="ivu-cell-item">
                                <div class="ivu-cell-icon"></div> <div class="ivu-cell-main">
                                <div class="ivu-cell-title">修改密码</div> <div class="ivu-cell-label">
                            </div></div> <div class="ivu-cell-footer"><span class="ivu-cell-extra"></span></div></div></div>
                        <!----></div><div class="ivu-cell"><div class="ivu-cell-link"><div class="ivu-cell-item"><div class="ivu-cell-icon">

                    </div> <div class="ivu-cell-main"><div class="ivu-cell-title">锁屏</div>
                        <div class="ivu-cell-label"></div></div> <div class="ivu-cell-footer"><span class="ivu-cell-extra"></span></div></div></div>
                        <!----></div>
                        <div class="ivu-cell ivu-cell-with-link">
                            <a href="javascript:;"  @click="onSelect('logout')" class="ivu-cell-link">
                                <div class="ivu-cell-item"><div class="ivu-cell-icon"></div> <div class="ivu-cell-main"><div style="color: #515a6e" class="ivu-cell-title">退出</div>
                                    <div class="ivu-cell-label"></div></div> <div class="ivu-cell-footer"><span class="ivu-cell-extra"></span>
                                </div>
                                </div>
                            </a>
                            <div class="ivu-cell-arrow">
                                <i class="ivu-icon ivu-icon-ios-arrow-forward"></i>
                            </div>
                        </div>
                    </div>
                </div>

                <Avatar  :src="getAvatar()" />
            </Poptip>
        </div>
        <div class="f-header__toolbar">
            <span style="display: inline-block;height: 28px;margin-right: 20px"></span>
            <Badge style="margin-right: 20px;" dot>
                <Icon @click="onMyTicket" type="md-notifications-outline" class="f-header__icon" size="22" ></Icon>
            </Badge>
            <Icon style="margin-right: 20px;" type="md-refresh" class="f-header__icon" @click="onRefresh"  size="22" />
            <Icon style="margin-right: 20px;" class="f-header__icon" custom="iconfont icon-quanping" v-if="!fullScreen" size="22" @click="onFullScreen" ></Icon>
            <Icon style="margin-right: 20px;" class="f-header__icon" custom="iconfont icon-009pingmusuoxiao" v-if="fullScreen"  size="22" @click="onExitFullScreen" ></Icon>
            <Icon style="margin-right: 10px;" class="f-header__icon" custom="iconfont icon-tuichu" size="22" @click="onLogout" ></Icon>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import Cookies from "js-cookie";
import { baseURL } from "@/services/axios";
export default {
  name: "FHeader",
  computed: {
    ...mapState("app", ["module", "selectModule"]),
    ...mapState("common", ["me"])
  },
  data() {
    return {
      fullScreen: false
    };
  },
  methods: {
    ...mapMutations("app", ["set_module", "add_tab"]),
    ...mapMutations(["logout"]),
    getAvatar() {
      if (this.me.avatar) {
        return baseURL + `/image/${this.me.avatar}/128/128`;
      } else {
        return require("@/assets/images/avatar.png");
      }
    },
    onLogout() {
      this.$Modal.confirm({
        title: "提示",
        content: "确定要退出当前用户？",
        onOk: () => {
          this.logout();
          Cookies.remove("token");
          this.$router.replace({ name: "login" });
        },
        onCancel: () => {}
      });
    },
    onFullScreen() {
      const element = document.documentElement;
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
      this.fullScreen = true;
    },
    onExitFullScreen() {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
      this.fullScreen = false;
    },
    onRefresh() {
      eventBus.$emit("refresh");
    },
    onMyTicket() {
      this.add_tab({
        text: "我的工单",
        path: "/kf/ticket/1"
      });
    }
  }
};
</script>

<style lang="less">
@import "~@/styles/theme.less";

.f-header {
  height: @HeaderHeight;
  background-color: @HeaderBg;
  background-image: linear-gradient(143deg, #2945cb 20%, #0072ca 81%, #3a9dff);
  display: flex;

  &__title {
    display: flex;
    align-items: center;
  }

  &__module {
    flex: 1;
    ul {
      padding: 0;
      margin: 0;
      height: 100%;
      li {
        list-style: none;
        width: 90px;
        height: 100%;
        display: inline-block;
        transition: all 0.2s;
        &.active {
          background-color: @HeaderActiveBg;
          a {
            color: #fff;
          }
        }

        &:hover {
          a {
            color: #fff;
          }
        }
        a {
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          color: rgba(255, 255, 255, 0.8);
          text-decoration: none;
          i {
            font-size: 22px;
            height: 30px;
          }
          span {
            font-size: 12px;
          }
        }
      }
    }
  }
  &__toolbar {
    display: flex;
    align-items: center;
    .ivu-icon {
      color: #efefef;
      cursor: pointer;
      &:hover {
        color: #fff;
      }
    }
  }
  .user-info {
    width: 50px;
    display: flex;
    cursor: pointer;
    align-items: center;
    position: relative;
    &:after {
      content: " ";
      position: absolute;
      top: 10px;
      bottom: 10px;
      width: 1px;
      right: 0;
      background-color: #1534ca;
    }

    .ivu-poptip-body {
      padding: 0;
    }
  }
}
</style>
