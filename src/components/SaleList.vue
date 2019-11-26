<template>
  <div class="sale-list">
    <item-title title="实时销量排行"></item-title>
    <div class="box">
      <div class="title layout">
        <span>排行</span>
        <span>商品</span>
        <span>销量 ( 件 )</span>
      </div>
      <div class="items">
        <div v-for="(item, index) in lists" :key="item.product" class="item layout">
          <span>{{ "NO." + (index + 1) }}</span>
          <span>{{ item.product }}</span>
          <span>{{ item.number }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ItemTitle from "./common/ItemTitle";

  export default {
    name: "SaleList",
    components: {
      ItemTitle
    },
    data() {
      return {
        lists: [
          {
            product: "扫地机器人",
            number: 12394
          },
          {
            product: "华为Mate30",
            number: 12394
          },
          {
            product: "小零食",
            number: 12394
          },
          {
            product: "小米路由器",
            number: 12394
          },
          {
            product: "西装",
            number: 12394
          },
          {
            product: "三只松鼠",
            number: 12394
          },
          {
            product: "Mac笔记本",
            number: 12394
          },
          {
            product: "平板",
            number: 12394
          },
        ],
        timer: null
      };
    },
    mounted() {
      this.timer = setInterval(() => {
        this.lists.forEach(item => {
          item.number += Math.round(Math.random() * 10);
        });
        this.lists.sort((a, b) => {
          return b.number - a.number;
        });
      }, 2000);
    }
  };
</script>

<style lang="less" scoped>
  .sale-list {
    width: 100%;
    height: 100%;
    .box {
      height: ~"calc(100% - 36px)";
      padding: 0 15px;
      color: #999;
      .layout {
        display: flex;
        justify-content: space-between;
        span {
          width: 40%;
          &:first-child {
            width: 30%;
          }
          &:last-child {
            width: 30%;
          }
        }
      }
      .title {
        border-bottom: 1px solid #999;
        padding: 15px 0;
      }
      .items {
        height: ~"calc(100% - 85px)";
        padding: 15px 0;
        overflow: hidden;
        .item {
          color: #fff;
          margin-bottom: 10px;
          &:nth-child(1) {
            color: #805BCE;
          }
          &:nth-child(2) {
            color: #FFCA29;
          }
          &:nth-child(3) {
            color: #FF4B8A;
          }
        }
      }

    }
  }
</style>