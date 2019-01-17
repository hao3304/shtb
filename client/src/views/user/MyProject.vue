<template>
  <div class="my-project">
    <Spin v-show="loading" fix></Spin>
    <div v-show="!selectId" class="my-project__header">
      共有 <span>{{ list.length }}</span> 个负责项目
    </div>
    <div v-show="!selectId" class="my-project__content">
      <div
        class="my-project-list"
        v-for="item in list"
        :key="item.id"
        @click="onSelect(item)"
      >
        <div class="my-project-list__item">
          <div class="item__content">
            <h5>{{ item.name }}</h5>
          </div>
          <div class="item__shadow"></div>
        </div>
      </div>
    </div>
    <project-detail
      @back="onBack"
      v-if="selectId"
      :id="selectId"
    ></project-detail>
  </div>
</template>
<script>
import myService from "@/services/my";
import ProjectDetail from "./ProjectDetail";
export default {
  name: "MyProject",
  components: { ProjectDetail },
  data() {
    return {
      list: [],
      selectId: null,
      loading: true
    };
  },
  methods: {
    render() {
      this.loading = true;
      myService.project().then(rep => {
        this.list = rep;
        this.loading = false;
      });
    },
    onSelect(project) {
      this.selectId = project.id;
    },
    onBack() {
      this.selectId = null;
    }
  },
  mounted() {
    this.render();
  }
};
</script>

<style lang="less">
.my-project {
  height: 100%;
  padding: 20px;
  &__header {
    font-size: 18px;
    color: #383838;
    span {
      color: #4d8dee;
    }
  }

  &-list {
    display: flex;
    align-items: stretch;
    flex-wrap: wrap;
    margin-top: 20px;
    justify-content: flex-start;
    &__item {
      width: 248px;
      height: 124px;
      background-image: url("~@/assets/images/cover-media.jpg");
      box-shadow: 1px 1px 0 rgba(56, 56, 56, 0.15);
      border-radius: 4px;
      cursor: pointer;
      transition: transform 0.218s ease, -webkit-transform 0.218s ease;
      transform: translateY(0);
      position: relative;

      &:hover {
        transform: translateY(-4px);
      }
      h5 {
        color: #fff;
        font-size: 16px;
        z-index: 1;
      }

      .item__content {
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        z-index: 1;
        padding: 10px;
        position: absolute;
        transition: transform 0.218s ease, -webkit-transform 0.218s ease;
        box-shadow: 0 0 0 rgba(56, 56, 56, 0.15);
        &:hover {
          box-shadow: 0 6px 12px rgba(56, 56, 56, 0.1);
        }
      }

      .item__shadow {
        background-image: linear-gradient(
          180deg,
          rgba(56, 56, 56, 0.35) 0%,
          rgba(56, 56, 56, 0)
        );
        background-repeat: repeat-x;
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#59383838",endColorstr="#00383838",GradientType=0);
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        border-radius: 4px 4px 0 0;
        z-index: 0;
      }
    }
  }
}
</style>
