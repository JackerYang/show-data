<template>
  <div class="item-title">
    {{ title }}
  </div>
</template>

<script>
  export default {
    name: "ItemTitle",
    props: {
      title: {
        type: String,
        required: true
      }
    }
  };
</script>

<style lang="less" scoped>
  .item-title {
    height: 36px;
    line-height: 36px;
    padding: 0 15px;
    color: #fff;
    font-family: "Fira Code Retina", sans-serif;
  }
</style>