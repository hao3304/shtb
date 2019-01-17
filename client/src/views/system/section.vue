<template>
    <div class="page-section">
        <f-panel>
            <div slot="header" style="text-align: right;padding-right: 5px">
                <Button @click="onAdd" type="primary" class="f-button" icon="md-add" :disabled="!project">
                    评价内容
                </Button>
            </div>
            <div slot="body" slot-scope="props">
                <Table
                        :height="props.bodyHeight"
                        size="small"
                        :columns="columns"
                        :data="data"
                        :loading="loading"
                        border
                        class="f-table"
                >
                </Table>
            </div>
        </f-panel>
        <Drawer
                v-model="dialog"
                :title="title"
                :width="600"
                :loading="formLoading"
                class="f-drawer"
        >
            <div class="f-drawer__body">
                <i-form ref="form" :label-width="75" :rules="rules" :model="model">
                    <FormItem :label="sectionModel.name" prop="name">
                        <Input v-model="model.name" :placeholder="'请输入'+ sectionModel.name"  />
                    </FormItem>
                    <FormItem :label="sectionModel.value" prop="value">
                        <InputNumber :min="0" v-model="model.value" style="width: 120px" :placeholder="'请输入'+ sectionModel.value"  /> %
                    </FormItem>
                </i-form>
            </div>

            <div class="f-drawer__footer">
                <Button @click="onCancel">取消</Button>
                <Button @click="onOk" type="primary">确定</Button>
            </div>
        </Drawer>
    </div>
</template>

<script>
import types from "@/types";
const { newSection, sectionModel } = types;
import sectionService from "@/services/section";

export default {
  props: ["project"],
  name: "dictItem",
  data() {
    return {
      newSection: newSection,
      sectionModel,
      data: [],
      columns: [
        {
          title: "#",
          type: "index",
          width: 40,
          align: "center"
        },
        {
          title: sectionModel.name,
          key: "name",
          width: 120,
          sortable: true
        },
        {
          title: sectionModel.value,
          key: "value",
          width: 120,
          sortable: true,
          render(h, {row}) {
            return h('div', row.value + '%')
          }
        },

        {
          title: "创建时间",
          key: "created",
          mWidth: 150
        },
        {
          title: "操作",
          width: 150,
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
                    click: () => this.onEdit(row)
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
                      this.onDelete(row.id, `确定要删除字典【${row.name}】吗？`)
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
        value: [{ required: true, type: 'number', message: "必填", trigger: "blur" }]
      },
      parent: {},
      dialog: false,
      title: "新增字典",
      formLoading: false,
      loading: false,
      model: newSection(),
      action: "",
      query: {
        page: 1,
        size: 999,
        count: 1,
        code: ''
      }
    };
  },
  watch: {
    project() {
      this.setParent();
    }
  },
  methods: {
    setParent() {
      if (this.project) {
        this.model.project = this.project;
        this.query.project = this.project;
        this.render();
      } else {
        this.data = [];
      }
    },
    render() {
      this.loading = true;
      sectionService.findAll(this.query).then(rep => {
        this.data = rep.data;
        this.loading = false;
      });
    },
    onAdd() {
      this.dialog = true;
      this.action = "add";
      this.$refs.form.resetFields();
      this.model = newSection();
      this.model.project = this.project;
    },
    onCancel() {
      this.dialog = false;
    },
    onOk() {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.action == "update") {
            this.update();
          } else {
            this.save();
          }
        } else {
          this.$Message.warning("请填写完整！");
        }
      });
    },
    save() {
      this.formLoading = true;
      sectionService.add(this.model).then(() => {
        this.formLoading = false;
        this.dialog = false;
        this.$Message.success("新增成功！");
        this.render();
      });
    },
    onDelete(id, str) {
      this.$Modal.confirm({
        title: "提示",
        content: str ? str : "确定要删除当前选择数据吗？",
        loading: true,
        onOk: () => {
          sectionService
            .remove(id)
            .then(() => {
              this.$Modal.remove();
              this.$Message.success("删除成功！");
              this.render();
            })
            .catch(() => {
              this.loading = false;
            });
        }
      });
    },
    onEdit(data) {
      this.$refs.form.resetFields();
      const values = JSON.parse(JSON.stringify(data));
      delete values["_rowKey"];
      delete values["_index"];
      this.model = { ...values };
      this.dialog = true;
      this.action = "update";
      this.updateId = values.id;
    },
    update() {
      this.formLoading = true;
      sectionService
        .update(this.updateId, this.model)
        .then(rep => {
          console.log(rep);
          this.dialog = false;
          this.$Message.success("编辑成功！");
          this.render();
          this.formLoading = false;
        })
        .catch(() => {
          this.formLoading = false;
        });
    },
    reset() {
      this.query.filters[0].args = [];
      this.parent = {};
      this.data = [];
      this.model = newSection();
    }
  }
};
</script>

<style lang="less">
.page-section {
  height: 100%;
}
</style>
