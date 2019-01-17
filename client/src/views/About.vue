<template>
<div >
  {{name}}
  <div>
    <input type="text" v-model="name">
  </div>
  <Button @click="onChangeName" type="primary">改变名字</Button>
  <test></test>
</div>
</template>
<script>
export default {
  data() {
    return {
      name: "george"
    };
  },
  methods: {
    onChangeName() {
      this.name = "jack";
    }
  }
};

// $("#test").text("jack");
</script>
