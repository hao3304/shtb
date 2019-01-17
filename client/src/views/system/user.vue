<template>
    <div class="page-user">
        <x-wrapper
                title="用户"
                service="user"
                :columns="columns"
                :model="model"
                :rules="rules"
                :filter="filter"
                ref="wrapper"
                :orders="['-changed']"
                :height="windowHeight - 260"
        >
            <div slot="dialog" slot-scope="{ model }">
                <FormItem :label="userModel.name" prop="name">
                    <Input v-model="model.name" :placeholder="'请输入'+ userModel.name"  />
                </FormItem>
                <FormItem :label="userModel.username" >
                    <Input v-model="model.username" :placeholder="'请输入'+ userModel.username"  />
                </FormItem>

                <FormItem :label="userModel.password" >
                    <Input v-model="model.password" type="password" :placeholder="'请输入'+ userModel.password"  />
                </FormItem>

                <FormItem :label="userModel.mobile" >
                    <Input v-model="model.mobile" :placeholder="'请输入'+ userModel.mobile"  />
                </FormItem>

                <FormItem :label="userModel.sex">
                    <RadioGroup v-model.number="model.sex">
                        <Radio :label="1">男</Radio>
                        <Radio :label="0">女</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem :label="userModel.status">
                    <RadioGroup v-model.number="model.status">
                        <Radio :label="1">启用</Radio>
                        <Radio :label="0">禁用</Radio>
                    </RadioGroup>
                </FormItem>

                <FormItem :label="userModel.admin">
                    <i-switch v-model="model.admin" :true-value="1" :false-value="0"></i-switch>
                </FormItem>
            </div>
        </x-wrapper>

        <Modal title="重置密码" v-model="dialog">
            <Input type="password" v-model="newPassword" placeholder="请输入新的密码" />
            <div slot="footer">
                <Button @click="dialog = false">取消</Button>
                <Button @click="onOk" type="primary">确定</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
import types from "@/types";
const { userModel, newUser } = types;
import Vue from "vue";
import uploadPic from "@/components/uploadPic";
import { mapState } from "vuex";
import roleUserService from "@/services/role_user";
import { resetPasword } from "@/services/user";

export default {
  name: "User",
  components: {
    uploadPic
  },
  computed: {
    ...mapState("common", ["roles"]),
    ...mapState(["windowHeight"])
  },
  data() {
    return {
      userModel,
      columns: [
        {
          width: 40,
          align: "center",
          type: "selection"
        },
        {
          title: userModel.name,
          width: 150,
          key: "name",
        },
        {
          title: userModel.username,
          width: 150,
          key: "username",
        },
        {
          title: userModel.status,
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
          title: userModel.admin,
          width: 120,
          key: "admin",
          sortable: "custom",
          render: (h, { row }) => {
            return h("div", {}, row.admin == 1 ? "是" : "");
          }
        },
        {
          title: userModel.sex,
          sortable: "custom",
          width: 100,
          key: "sex",
          render: (h, { row }) => {
            return h("div", {}, Vue.filter("sex")(row.sex));
          }
        },
        {
          title: userModel.mobile,
          width: 120,
          key: "mobile"
        },
        {
          title: "创建时间",
          minWidth: 150,
          key: "created",
          sortable: "custom",
        },
        {
          title: "操作",
          fixed: "right",
          width: 120,
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
              // h(
              //   "iconButton",
              //   {
              //     props: {
              //       icon: "iconfont icon-iconfontmima",
              //       type: "primary",
              //       tooltip: "重置密码",
              //       placement: "right"
              //     },
              //     style: {
              //       marginRight: "8px"
              //     },
              //     on: {
              //       click: () => this.onRestPwd(row)
              //     }
              //   },
              //   "编辑"
              // ),
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
          name: userModel.name,
          field: "name",
          placeholder: `请输入${userModel.name}模糊查询`
        },
        {
          type: "input",
          name: userModel.account,
          field: "account",
          placeholder: `请输入${userModel.account}模糊查询`
        },
        {
          type: "select",
          name: userModel.sex,
          field: "sex",
          placeholder: "请选择性别进行筛选",
          data: [
            { value: 0, name: "未知" },
            { value: 1, name: "男" },
            { value: 2, name: "女" }
          ]
        },
        {
          type: "input",
          name: userModel.idcard,
          field: "idcard",
          placeholder: `请输入${userModel.idcard}模糊查询`
        },
        {
          type: "input",
          name: userModel.email,
          field: "email",
          placeholder: `请输入${userModel.email}模糊查询`
        },
        {
          type: "input",
          name: userModel.job,
          field: "job",
          placeholder: `请输入${userModel.job}模糊查询`
        },
        {
          type: "input",
          name: userModel.mobile,
          field: "mobile",
          placeholder: `请输入${userModel.mobile}模糊查询`
        },
        {
          type: "input",
          name: userModel.smobile,
          field: "smobile",
          placeholder: `请输入${userModel.smobile}模糊查询`
        },
        {
          type: "input",
          name: userModel.telephone,
          field: "telephone",
          placeholder: `请输入${userModel.telephone}模糊查询`
        }
      ],
      total: 0,
      model: newUser,
      active: "one",
      targetRole: [],
      dialog: false,
      newPassword: "",
      selectUser: null
    };
  },
  methods: {
    onOk() {
      if (this.newPassword == "") {
        return this.$Message.warning("密码不能为空！");
      }
      resetPasword({
        id: [this.selectUser.id],
        password: this.newPassword
      }).then(() => {
        this.dialog = false;
        this.$Message.success("修改成功！");
      });
    },
    onRestPwd(row) {
      this.selectUser = row;
      this.dialog = true;
      this.newPassword = "";
    },
  }
};
</script>
<style lang="less">
.page-user {
  height: 100%;
}
.role-list {
  border: 1px solid #ddd;
  padding: 5px 10px 10px 10px;
  &__item {
    margin-top: 5px;
  }
}
</style>
