<template>
    <div class="f-tab">
        <Tabs ref="tabs" style="width: 100%;" @tabClose="onTabClose" @tabSelect="onTabSelect"  :scrollable="true" :style="{height: windowHeight - 79 + 'px'}">
            <!--<TabPanel  title="实时数据" iconCls="ivu-icon ivu-icon-logo-windows">-->
                <!--<iframe :src="getSrc('/hn/monitor')" style="width: 100%;" :style="{height: windowHeight - 116 + 'px'}" frameborder="0"></iframe>-->
            <!--</TabPanel>-->
            <TabPanel v-for="tab in tabs" :closable="tabs.length > 1" :target="tab" :title="tab.text" :key="tab.text" iconCls="ivu-icon ivu-icon-logo-windows">
                <iframe :src="getSrc(tab.path)" style="width: 100%;" :style="{height: windowHeight - 115 + 'px'}" frameborder="0"></iframe>
            </TabPanel>
        </Tabs>
    </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { routes } from "@/router";
export default {
  name: "FTab",
  computed: {
    ...mapState(["windowHeight"]),
    ...mapState("app", ["tabs", "tabIndex"])
  },
  watch: {
    tabIndex() {
      this.$nextTick(() => {
        this.$refs.tabs.select(this.tabIndex);
      });
    }
  },
  methods: {
    ...mapMutations("app", ["remove_tab", "set_tab_index"]),
    getSrc(path) {
      if (path.indexOf("http") > -1) {
        return path;
      }

      return (
        window.location.origin + process.env.VUE_APP_BASE + "index.html#" + path
      );
    },
    onTabClose(tab) {
      this.remove_tab(tab.$attrs.target);
      this.set_tab_index(this.tabs.length);
    },
    onTabSelect(panel) {
      const index = this.$refs.tabs.getPanelIndex(panel);
      this.set_tab_index(index);
    },
    onRefresh() {
      const panel = this.$refs.tabs.getSelectedPanel();
      const iframe = $(panel.$el).find("iframe");
      const src = iframe.attr("src");
      iframe.attr("src", "");
      this.$nextTick(() => {
        iframe.attr("src", src);
      });
    }
  },
  mounted() {
    eventBus.$on("refresh", () => {
      this.onRefresh();
    });
  }
};
</script>

<style lang="less">
.f-tab {
  .panel-body {
    overflow: hidden;
  }

  .tabs-container {
    padding-left: 4px;
  }

  .tabs {
    padding-left: 0;
    .tabs-icon {
      margin-top: -6px;
    }
  }

  .tabs-header {
    border: none;
  }
}
</style>
