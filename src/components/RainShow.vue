<template>
  <div class="rain-show">
    <item-title title="近7天降雨量"></item-title>
    <div id="rai-char"></div>
  </div>
</template>

<script>
  import ItemTitle from "./common/ItemTitle";

  const EC = require("echarts/lib/echarts");
  require("echarts/lib/chart/bar");
  require("echarts/lib/component/tooltip");

  export default {
    name: "RainShow",
    components: {
      ItemTitle
    },
    computed: {
      raiChar() {
        return this.$store.state.raiChar;
      }
    },
    data() {
      return {
        timer: null,
        timeArr: ["21号", "22号", "23号", "24号", "25号", "26号", "27号"],
        dataArr: [10, 20, 25, 10, 12, 14, 13]
      };
    },
    mounted() {
      this.$store.commit("SET_RAI_CHAR", EC.init(document.getElementById("rai-char"), {}));
      let option = {
        backgroundColor: "#24273E",
        tooltip: {
          trigger: "axis"
        },
        grid: {
          left: "4%",
          right: "7%",
          bottom: "8%",
          top: "8%",
          containLabel: true
        },
        color: [],
        // x轴
        xAxis: {
          type: "category",
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
          data: this.timeArr
        },
        // y轴
        yAxis: {
          type: "value",
          min: 0,
          max: 50,
          //  改变y轴字体颜色和大小
          axisLabel: {
            textStyle: {
              color: "#aaa",
              fontSize: 12
            },
            formatter: "{value} mm"
          },
          // 控制网格线颜色
          splitLine: {
            lineStyle: {
              color: "#444"
            }
          }
        },
        // 数据
        series: {
          name: "降雨量",
          type: "bar",
          data: this.dataArr,
          itemStyle: {
            normal: {
              // 定制显示（按顺序）
              color: params => {
                let colorList = ["#FFCA29", "#FF4B8A", "#805BCE", "#EE9201", "#29AAE3", "#B74AE5", "#0AAF9F", "#E89589", "#16A085", "#4A235A", "#C39BD3 ", "#F9E79F", "#BA4A00", "#ECF0F1", "#616A6B", "#EAF2F8", "#4A235A", "#3498DB"];
                return colorList[params.dataIndex];
              }
            }
          }
        }
      };
      this.raiChar.setOption(option);
      this.timer = setInterval(() => {
        let arr = [];
        for (let i = 0; i < 7; i++) {
          arr.push(Math.round(Math.random() * 50));
        }
        option.series.data = arr;
        this.raiChar.setOption(option);
      }, 5000);
    },
    beforeDestroy() {
      clearInterval(this.timer);
    }
  };
</script>

<style lang="less" scoped>
  .rain-show {
    width: 100%;
    height: 100%;
    #rai-char {
      width: 100%;
      height: ~"calc(100% - 34px)";
    }
  }
</style>