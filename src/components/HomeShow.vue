<template>
  <div class="home-show">
    <item-title title="资源总量统计" />
    <div class="desc">
      <div class="item">
        数据总量：
        <count-to :start-val="startVal.total" :end-val="endVal.total" class="total" :duration="2000" />
      </div>
      <div class="item">
        更新数量：
        <count-to :start-val="startVal.update" :end-val="endVal.update" class="update" :duration="2000" />
      </div>
      <div class="item">
        共享次数：
        <count-to :start-val="startVal.share" :end-val="endVal.share" class="share" :duration="2000" />
      </div>
    </div>
    <div id="hom-char"></div>
  </div>
</template>

<script>
  import CountTo from "vue-count-to";
  import ItemTitle from "./common/ItemTitle";
  import { getTime } from "../libs/utils";

  const EC = require("echarts/lib/echarts");
  require("echarts/lib/chart/line");
  require("echarts/lib/component/tooltip");
  require("echarts/lib/component/legend");

  export default {
    name: "HomeShow",
    components: {
      CountTo,
      ItemTitle
    },
    computed: {
      homChar() {
        return this.$store.state.homChar;
      },
      homData() {
        return this.$store.state.homData;
      }
    },
    watch: {
      homData: {
        deep: true,
        handler: function (newVal) {
          let { value, time } = newVal;
          this.option.series.forEach(item => {
            item.data.shift();
            item.data.push(item.data[0] + value);
          });
          this.option.xAxis.data.shift();
          this.option.xAxis.data.push(time);
          this.homChar.setOption(this.option);

          this.startVal.total = this.endVal.total;
          this.startVal.update = this.endVal.update;
          this.startVal.share = this.endVal.share;
          this.endVal.total += value;
          this.endVal.update += value;
          this.endVal.share += value;
        }
      }
    },
    data() {
      return {
        startVal: {
          total: 0,
          update: 0,
          share: 0
        },
        endVal: {
          total: 1261255,
          update: 12233,
          share: 152452
        },
        option: {
          tooltip: {
            trigger: "axis"
          },
          grid: {
            left: "3%",
            right: "3%",
            bottom: "3%",
            top: "10%",
            containLabel: true
          },
          legend: {
            y: "top",
            textStyle: {
              color: "#999"  // 图例文字颜色
            },
            // itemGap设置各个item之间的间隔，单位px，默认为10，横向布局时为水平间隔，纵向布局时为纵向间隔
            itemGap: 30,
            data: ["数据总量", "更新数量", "共享次数"]
          },
          color: ["#1CC840", "#43BBFB", "#EB5690"],
          // x轴
          xAxis: {
            type: "category",
            boundaryGap: false,
            //  改变x轴字体颜色和大小
            axisLabel: {
              textStyle: {
                color: "#aaa",
                fontSize: 12
              }
            },
            //  改变x轴颜色
            axisLine: {
              lineStyle: {
                color: "#555"
              }
            },
            data: ["13:45:41", "13:45:42", "13:45:43", "13:45:44", "13:45:45", "13:45:46", "13:45:47", "13:46:41", "13:46:42", "13:46:43", "13:46:44", "13:46:46", "13:46:46", "13:46:47"]
          },
          // y轴
          yAxis: {
            type: "value",
            //  改变y轴字体颜色和大小
            axisLabel: {
              textStyle: {
                color: "#aaa",
                fontSize: 12
              }
            },
            // 控制网格线颜色
            splitLine: {
              lineStyle: {
                color: "#444"
              }
            }
          },
          // 数据
          series: [
            {
              name: "数据总量",
              type: "line",
              data: [161855, 161455, 161255, 171255, 161275, 161251, 161255, 161855, 161455, 161255, 171255, 161275, 161251, 161255],
              smooth: true,
              symbol: "none",
              itemStyle: {
                normal: {
                  areaStyle: {
                    type: "default",
                    //渐变色实现
                    color: new EC.graphic.LinearGradient(0, 0, 0, 1,//变化度
                      //三种由深及浅的颜色
                      [{
                        offset: 0,
                        color: "rgba(28,200,64,0.5)"
                      }, {
                        offset: 1,
                        color: "rgba(255,255,255,0)"
                      }])
                  }
                }
              }
            },
            {
              name: "更新数量",
              type: "line",
              data: [12293, 14133, 10283, 11273, 11213, 12234, 11233, 12293, 14133, 10283, 11273, 11213, 12234, 11233],
              smooth: true,
              symbol: "none",
              itemStyle: {
                normal: {
                  areaStyle: {
                    type: "default",
                    //渐变色实现
                    color: new EC.graphic.LinearGradient(0, 0, 0, 1,//变化度
                      //三种由深及浅的颜色
                      [{
                        offset: 0,
                        color: "rgba(67,187,251,0.5)"
                      }, {
                        offset: 1,
                        color: "rgba(255,255,255,0)"
                      }])
                  }
                }
              }
            },
            {
              name: "共享次数",
              type: "line",
              data: [112482, 121452, 143452, 112452, 124452, 132752, 152352, 112482, 121452, 143452, 112452, 124452, 132752, 152352],
              smooth: true,
              symbol: "none",
              itemStyle: {
                normal: {
                  areaStyle: {
                    type: "default",
                    //渐变色实现
                    color: new EC.graphic.LinearGradient(0, 0, 0, 1,//变化度
                      //三种由深及浅的颜色
                      [{
                        offset: 0,
                        color: "rgba(235,86,144,0.5)"
                      }, {
                        offset: 1,
                        color: "rgba(255,255,255,0)"
                      }])
                  }
                }
              }
            }
          ]
        }
      };
    },
    mounted() {
      this.$store.commit("SET_HOM_CHAR", EC.init(document.getElementById("hom-char"), {}));
      this.homChar.setOption(this.option);
    }
  };
</script>

<style lang="less" scoped>
  .home-show {
    width: 100%;
    height: ~"calc(100% - 64px)";
    .desc {
      color: #ccc;
      display: flex;
      justify-content: space-between;
      border: 1px solid #093552;
      background: #111F44;
      margin-bottom: 5px;
      .item {
        width: 33.33%;
        text-align: center;
        padding: 13px 0;
        .total {
          color: #1CC840;
        }
        .update {
          color: #43BBFB;
        }
        .share {
          color: #EB5690;
        }
      }
    }
    #hom-char {
      width: 100%;
      height: ~"calc(100% - 94px)";
    }
  }
</style>