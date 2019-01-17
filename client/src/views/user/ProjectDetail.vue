<template>
  <div class="project-detail">
    <Spin v-show="loading" fix></Spin>
    <div class="project-detail__header">
      {{ project.name }}
      <Button
        style="float: right"
        @click="onBack"
        icon="ios-arrow-back"
        type="primary"
        >返回</Button
      >
    </div>
    <Divider></Divider>
    <div class="project-detail__content" v-if="project.id">
      <table class="detail-table">
        <tr>
          <td class="name">项目编号：</td>
          <td>{{ project.no }}</td>
          <td class="name">设计阶段：</td>
          <td>{{ project.stage }}</td>
          <td class="name">负责人：</td>
          <td>{{ project.user }}</td>
          <td class="name">时间段：</td>
          <td>{{ project.time }}</td>
        </tr>
        <tr>
          <td class="name">深度：</td>
          <td>{{ project.deep }}</td>
          <td class="name">设计量系数：</td>
          <td>{{ project.design_num }}</td>
          <td class="name">工作量系数</td>
          <td></td>
          <td colspan="2"></td>
        </tr>
      </table>

      <Alert style="margin-top: 15px" show-icon>请认真填写项目报表。</Alert>
      <table class="project-table">
        <tr>
          <th style="width: 100px;"></th>
          <th v-for="section in project.sections" :key="section.id">
            {{ section.name }}
          </th>
          <th>合计</th>
          <th style="width: 80px;">负责人系数</th>
          <th style="width: 100px">最终</th>
        </tr>
        <tr>
          <td class="name">评价百分比</td>
          <td
            class="name"
            v-for="section in project.sections"
            :key="section.id"
          >
            {{ section.value }}%
          </td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <!--<tr>-->
        <!--<td>设计人员</td>-->
        <!--<td :colspan="project.sections.length + 3"></td>-->
        <!--</tr>-->
        <tr v-for="user in users" :key="user.id">
          <td>【{{ user.name }}】</td>
          <td
            style="text-align: center"
            v-for="section in project.sections"
            :key="section.id"
          >
            <InputNumber
              size="small"
              :min="0"
              :max="100"
              v-model="model[user.id][section.id]"
              style="width: 100px"
              placeholder="请输入"
            />
            %
          </td>
          <td>{{ getUserCount(user.id) }} %</td>
          <td>{{ getNumber(user.id) }}</td>
          <td style="font-weight: bold;color: #4d8dee;">
            {{ getTotal(user.id) }} %
          </td>
        </tr>
        <tr>
          <td class="name">合计</td>
          <td
            style="text-align: center"
            v-for="section in project.sections"
            :key="section.id"
          >
            {{ getSectionCount(section.id) }} %
          </td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </table>

      <div style="text-align: right">
        <Button
          style="margin-top: 20px;width: 200px;"
          size="large"
          type="success"
          @click="onSubmit"
          >提交</Button
        >
      </div>
    </div>
  </div>
</template>

<script>
import myService from "@/services/my";
import { mapState } from "vuex";
export default {
  props: ["id"],
  name: "ProjectDetail",
  data() {
    return {
      project: {
        sections: []
      },
      loading: true,
      model: {}
    };
  },
  computed: {
    ...mapState("common", ["users"])
  },
  methods: {
    render() {
      this.loading = true;
      myService.project({ id: this.id }).then(rep => {
        this.initModel(rep);

        this.$nextTick(() => {
          this.project = rep;
          this.loading = false;
        });
      });
    },
    initModel(data) {
      this.users.forEach(user => {
        this.$set(this.model, user.id, {});
        data.sections.forEach(section => {
          this.$set(this.model[user.id], section.id, 0);
        });
      });
    },
    getSectionCount(section) {
      if (this.project.id) {
        let count = 0;
        this.users.forEach(user => {
          count += this.model[user.id][section];
        });
        return count.toFixed(1);
      } else {
        return "-";
      }
    },
    getUserCount(id) {
      let count = 0;
      this.project.sections.forEach(section => {
        count += this.model[id][section.id];
      });

      return count.toFixed(1);
    },
    getNumber(id) {
      return this.project.user == id ? 1.2 : 1;
    },
    getTotal(id) {
      const total = this.getUserCount(id) * this.getNumber(id);
      return total.toFixed(1);
    },
    onBack() {
      this.$emit("back");
    },
    onSubmit() {
      this.$Modal.confirm({
        title: "提示",
        content: "确定提交当前填报内容吗？",
        onOk: () => {
          const params = { project: this.id, data: [] };
          this.users.forEach(user => {
            this.project.sections.forEach(section => {
              params.data.push({
                user: user.id,
                section: section.id,
                value: this.model[user.id][section.id]
              });
            });
          });

          this.loading = true;
          myService.score(params).then(rep => {
            this.loading = false;
            this.$Message.success("操作成功！");
          });
        }
      });
    }
  },
  mounted() {
    this.render();
  }
};
</script>

<style lang="less">
.project-detail {
  height: 100%;
  &__header {
    font-size: 18px;
    color: #383838;
  }

  .detail-table {
    width: 100%;
    border-collapse: collapse;
    td {
      height: 32px;
      width: 15%;
      border: 1px solid #ddd;
      padding: 0 10px;
      font-weight: bold;
      &.name {
        width: 10%;
        font-weight: normal;
        text-align: right;
        background-color: #f1f1f1;
      }
    }
  }

  .project-table {
    width: 100%;
    border-collapse: collapse;
    td,
    th {
      height: 40px;
      border: 1px solid #ddd;
      text-align: center;

      &.name {
        background-color: #f1f1f1;
        text-align: center;
      }
    }

    tr {
      td:first-child {
        text-align: center;
      }
    }

    th {
      background-color: #0099cc;
      color: #fff;
      text-align: center;
      font-weight: bold;
    }
  }
}
</style>
