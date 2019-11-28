<template>
  <div class="temperature-show">
    <item-title :title="'空气温度（ '+ currentTem +'°C ）'" />
    <div id="tem-char" ref="tem-char"></div>
  </div>
</template>

<script>
  import ItemTitle from "./common/ItemTitle";

  const EC = require("echarts/lib/echarts");
  require("echarts/lib/chart/line");
  require("echarts/lib/component/tooltip");

  export default {
    name: "TemperatureShow",
    components: {
      ItemTitle
    },
    computed: {
      temChar() {
        return this.$store.state.temChar;
      },
      temData() {
        return this.$store.state.temData;
      }
    },
    watch: {
      temData: {
        deep: true,
        handler: function (newVal) {
          let { value, time } = newVal;
          this.currentTem = value;
          this.option.series.data.shift();
          this.option.series.data.push(value);
          this.option.xAxis.data.shift();
          this.option.xAxis.data.push(time);
          this.temChar.setOption(this.option);
        }
      }
    },
    data() {
      return {
        currentTem: 5,
        option: {
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
          color: ["#FFCA29", "#FF4B8A", "#805BCE"],
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
            data: ["10:31:12", "10:32:45", "10:33:12", "10:34:08", "10:35:10", "10:36:10", "10:37:30", "10:38:12"]
          },
          // y轴
          yAxis: {
            type: "value",
            min: -10,
            max: 10,
            //  改变y轴字体颜色和大小
            axisLabel: {
              textStyle: {
                color: "#aaa",
                fontSize: 12
              },
              formatter: "{value} °C"
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
            name: "温度",
            type: "line",
            data: [-5, -4, -4, -2, 1, 0, -2, 5]
          }
        }
      };
    },
    mounted() {
      this.$store.commit("SET_TEM_CHAR", EC.init(document.getElementById("tem-char"), {}));
      this.temChar.setOption(this.option);
    }

  };
</script>

<style lang="less" scoped>
  .temperature-show {
    width: 100%;
    height: 100%;
    #tem-char {
      width: 100%;
      height: ~"calc(100% - 34px)";
    }
  }
</style>