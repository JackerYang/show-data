<template>
  <div class="rain-list">
    <item-title title="城市降雨量排行"></item-title>
    <div class="box">
      <div class="title layout">
        <span>排行</span>
        <span>城市</span>
        <span>降雨量(mm)</span>
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
    computed: {
      lisData() {
        return this.$store.state.lisData;
      }
    },
    watch: {
      lisData: {
        deep: true,
        handler: function () {
          this.lists.forEach(item => {
            item.number += Math.round(Math.random() * 10);
          });
          this.lists.sort((a, b) => {
            return b.number - a.number;
          });
        }
      }
    },
    data() {
      return {
        lists: [
          {
            product: "北京",
            number: 99
          },
          {
            product: "上海",
            number: 120
          },
          {
            product: "广州",
            number: 12
          },
          {
            product: "深圳",
            number: 23
          },
          {
            product: "杭州",
            number: 45
          },
          {
            product: "厦门",
            number: 54
          },
          {
            product: "青岛",
            number: 65
          },
          {
            product: "成都",
            number: 75
          }
        ]
      };
    }
  };
</script>

<style lang="less" scoped>
  .rain-list {
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