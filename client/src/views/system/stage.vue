<template>
    <div class="page-role">
        <x-wrapper
                title="阶段"
                service="stage"
                :columns="columns"
                :model="model"
                :rules="rules"
                :filter="filter"
                ref="wrapper"
                :loads="true"
        >
            <div slot="dialog" slot-scope="{ model }">
                <FormItem :label="stageModel.code" prop="code">
                    <Input v-model="model.code" :placeholder="'请输入'+ stageModel.code"  />
                </FormItem>
                <FormItem :label="stageModel.name" prop="name">
                    <Input v-model="model.name" :placeholder="'请输入'+ stageModel.name"  />
                </FormItem>
                <FormItem  :label="stageModel.value" prop="value" >
                    <InputNumber style="width: 100%" v-model="model.value" :placeholder="'请输入'+ stageModel.value"  />
                </FormItem>
            </div>
        </x-wrapper>
    </div>
</template>
<script>
import types from "@/types";
const { stageModel, newStage } = types;
import Vue from "vue";
import { mapState } from "vuex";

export default {
  data() {
    return {
      stageModel,
      columns: [
        {
          width: 40,
          align: "center",
          type: "selection"
        },
        {
          title: stageModel.code,
          width: 100,
          key: "code",
        },
        {
          title: stageModel.name,
          width: 250,
          key: "name",
        },
        {
          title: stageModel.value,
          minWidth: 150,
          key: "value",
        },
        {
          title: "创建时间",
          width: 150,
          key: "created",
          render: (h, {row})=> {
            return h('div', row.created?new Date(row.created).Format('yyyy-MM-dd'):'-')
          }
        },
        {
          title: "操作",
          width: 120,
          fixed: "right",
          align: "center",
          render: (h, { row }) => {
            return h("div", [
              h(
                "iconButton",
                {
                  props: {
                    icon: "iconfont icon-bianji",
                    type: "primary",
                    tooltip: null,
                    placement: "left"
                  },
                  style: {
                    marginRight: "8px"
                  },
                  on: {
                    click: () => this.$refs.wrapper.onEdit(row)
                  }
                },
                "编辑"
              ),
              h(
                "iconButton",
                {
                  props: {
                    type: "error",
                    icon: "iconfont icon-shanchu",
                    tooltip: null,
                    placement: "right"
                  },
                  on: {
                    click: () =>
                      this.$refs.wrapper.onDelete(
                        row.id,
                        `确定要删除角色【${row.name}】吗？`
                      )
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      rules: {
        name: [{ required: true, message: "必填", trigger: "blur" }],
        code: [{ required: true, message: "必填", trigger: "blur" }],
        value: [{ required: true,type: 'number', message: "必填", trigger: "blur" }],
      },
      filter: [
        {
          type: "input",
          name: stageModel.name,
          field: "name",
          placeholder: "请输入名称模糊查询"
        }
      ],
      total: 0,
      model: newStage
    };
  },
  computed: {
    ...mapState(["windowHeight"])
  },
  methods: {}
};
</script>
<style lang="less">
.page-role {
  height: 100%;
}
</style>
