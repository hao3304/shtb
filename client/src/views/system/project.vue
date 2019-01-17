<template>
    <div class="page-role">
        <two-v>
            <x-wrapper
                    slot="top"
                    title="项目"
                    service="project"
                    :columns="columns"
                    :model="model"
                    :rules="rules"
                    :filter="filter"
                    ref="wrapper"
                    @on-row-click="onRowClick"
                    :loads="true"
                    @refresh="onRefresh"
            >
                <div slot="dialog" slot-scope="{ model }">
                    <FormItem :label="projectModel.no" prop="no">
                        <Input v-model="model.no" :placeholder="'请输入'+ projectModel.no"  />
                    </FormItem>
                    <FormItem :label="projectModel.name" prop="name">
                        <Input v-model="model.name" :placeholder="'请输入'+ projectModel.name"  />
                    </FormItem>
                    <FormItem :label="projectModel.user" >
                        <Select v-model="model.user" :placeholder="'请选择'+ projectModel.user" >
                            <Option v-for="user in users" :label="`${user.name}`" :key="user.id" :value="user.id"></Option>
                        </Select>
                    </FormItem>
                    <FormItem :label="projectModel.time" >
                        <Input v-model="model.time" :placeholder="'请输入'+ projectModel.time"  />
                    </FormItem>
                    <FormItem :label="projectModel.stage" >
                        <Select v-model="model.stage" :placeholder="'请选择'+ projectModel.stage" >
                            <Option v-for="stage in stages" :label="`【${stage.code}】${stage.name}`" :key="stage.id" :value="stage.id"></Option>
                        </Select>
                    </FormItem>
                    <FormItem :label="projectModel.building_type" >
                        <Select v-model="model.building_type" :placeholder="'请选择'+ projectModel.building_type" >
                            <Option v-for="build in buildType" :label="`${build.name}`" :key="build.id" :value="build.value"></Option>
                        </Select>
                    </FormItem>
                    <FormItem :label="projectModel.design_num" >
                        <Input v-model="model.design_num" :placeholder="'请输入'+ projectModel.design_num"  />
                    </FormItem>
                    <FormItem :label="projectModel.deep" >
                        <Input v-model="model.deep" :placeholder="'请输入'+ projectModel.deep"  />
                    </FormItem>
                    <FormItem :label="projectModel.area" >
                        <Input v-model="model.area" :placeholder="'请输入'+ projectModel.area"  />
                    </FormItem>
                    <FormItem :label="projectModel.status">
                        <RadioGroup v-model.number="model.status">
                            <Radio :label="1">启用</Radio>
                            <Radio :label="0">禁用</Radio>
                        </RadioGroup>
                    </FormItem>
                </div>
            </x-wrapper>
            <section-item ref="item" :project="selectId" slot="bottom"></section-item>
        </two-v>
    </div>
</template>
<script>
import types from "@/types";
const { projectModel, newProject } = types;
import Vue from "vue";
import { mapState } from "vuex";
import sectionItem from './section'
export default {
  components: {
    sectionItem
  },
  data() {
    return {
      projectModel,
      columns: [
        {
          width: 40,
          align: "center",
          type: "selection"
        },
        {
          title: projectModel.no,
          width: 100,
          key: "no",
        },
        {
          title: projectModel.name,
          width: 200,
          key: "name",
        },
        {
          title: projectModel.user,
          width: 100,
          key: "user",
          render: (h, {row})=> {
            const user = this.users.find(u => u.id == row.user);
            return h('div', user?user.name:'-')
          }
        },
        {
          title: projectModel.time,
          width: 150,
          key: "time",
        },
        {
          title: projectModel.stage,
          width: 220,
          key: "stage",
          render: (h,{row})=> {
            const stage = this.stages.find(s=> s.id == row.stage);
            return h('div',stage?`【${stage.code}】${stage.name}`: '-')
          }
        },
        {
          title: projectModel.building_type,
          width: 150,
          key: "building_type",
          render: (h,{row})=> {
            const build = this.buildType.find(s=> s.value == row.building_type);
            return h('div',build?build.name: '-')
          }
        },{
          title: projectModel.design_num,
          width: 150,
          key: "design_num",
        },{
          title: projectModel.deep,
          width: 150,
          key: "deep",
        },
        {
          title: '工作量系数',
          width: 120,
          render: (h, {row})=> {
            return h('Tag', row.design_num * row.deep)
          }
        },
        {
          title: projectModel.area,
          width: 100,
          key: "area",
        },
        {
          title: projectModel.status,
          width: 100,
          key: "status",
          sortable: "custom",
          render: (h, { row }) => {
            return h(
              "Tag",
              {
                props: {
                  color: row.status == 1 ? "success" : "default",
                  size: "small",
                  type: "border"
                },
                style: {
                  fontSize: "12px"
                }
              },
              row.status == 1 ? "启用中" : "已禁用"
            );
          }
        },
        {
          title: "创建时间",
          width: 150,
          key: "created",
          sortable: "custom",
          render: (h, { row }) => {
            return h("div", {}, Vue.filter("dateFormat")(row.created * 1000));
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
        sn: [{ required: true, message: "必填", trigger: "blur" }],
        account: [{ required: true, message: "必填", trigger: "blur" }],
        password: [{ required: true, message: "必填", trigger: "blur" }]
      },
      filter: [
        {
          type: "input",
          name: projectModel.name,
          field: "name",
          placeholder: "请输入名称模糊查询"
        },
        {
          type: "select",
          name: projectModel.status,
          field: "status",
          placeholder: "请选择状态进行筛选",
          data: [{ value: 1, name: "启用" }, { value: 0, name: "禁用" }]
        }
      ],
      total: 0,
      model: newProject,
      selectId: null
    };
  },
  computed: {
    ...mapState(["windowHeight"]),
    ...mapState('common', ['stages', 'users', 'dicts']),
    buildType() {
      const dict = this.dicts.find(d=> d.code =='T001');
      return dict? dict.values:[];
    }
  },
  methods: {
    onRowClick(row) {
      this.selectId = null;
      this.$nextTick(() => {
        this.selectId = row.id;
      });
    },
    onRefresh() {
      this.$refs["item"].reset();
      this.selectId = null;
    }
  }
};
</script>
<style lang="less">
.page-role {
  height: 100%;
}
</style>
