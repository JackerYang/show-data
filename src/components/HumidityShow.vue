<template>
  <div class="humidity-show">
    <item-title :title="'空气湿度（ '+ currentHum + '% ）'" />
    <div id="hum-char"></div>
  </div>
</template>

<script>
  import ItemTitle from "./common/ItemTitle";

  const EC = require("echarts/lib/echarts");
  require("echarts/lib/chart/line");
  require("echarts/lib/component/tooltip");

  export default {
    name: "HumidityShow",
    components: {
      ItemTitle
    },
    computed: {
      humChar() {
        return this.$store.state.humChar;
      },
      humData() {
        return this.$store.state.humData;
      }
    },
    watch: {
      humData: {
        deep: true,
        handler: function (newVal) {
          let { value, time } = newVal;
          this.currentHum = value;
          this.option.series.data.shift();
          this.option.series.data.push(value);
          this.option.xAxis.data.shift();
          this.option.xAxis.data.push(time);
          this.humChar.setOption(this.option);
        }
      }
    },
    data() {
      return {
        currentHum: 0,
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
          color: ["#805BCE", "#FFCA29", "#FF4B8A"],
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
            min: 0,
            max: 100,
            //  改变y轴字体颜色和大小
            axisLabel: {
              textStyle: {
                color: "#aaa",
                fontSize: 12
              },
              formatter: "{value} %"
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
            name: "湿度",
            type: "line",
            data: [53, 45, 78, 62, 87, 84, 12, 45],
            smooth: true
          }
        }
      };
    },
    mounted() {
      this.$store.commit("SET_HUM_CHAR", EC.init(document.getElementById("hum-char"), {}));
      this.humChar.setOption(this.option);
    }
  };
</script>

<style lang="less" scoped>
  .humidity-show {
    width: 100%;
    height: 100%;
    #hum-char {
      width: 100%;
      height: ~"calc(100% - 34px)";
    }
  }
</style>