<template>
  <div class="temperature-show">
    <item-title :title="'空气温度（ '+ dataArr[dataArr.length - 1] +'°C ）'"></item-title>
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
      }
    },
    data() {
      return {
        timeArr: ["10:31:12", "10:32:45", "10:33:12", "10:34:08", "10:35:10", "10:36:10", "10:37:30", "10:38:12"],
        dataArr: [-5, -4, -4, -2, 1, 0, -2, 5],
        timer: null
      };
    },
    mounted() {
      this.$store.commit("SET_TEM_CHAR", EC.init(document.getElementById("tem-char"), {}));
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
        color: ["#FFCA29", "#FF4B8A", "#805BCE",],
        // x轴
        xAxis: [{
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
        }],
        // y轴
        yAxis: {
          type: "value",
          min: -6,
          max: 9,
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
          data: this.dataArr
        }
      };
      this.temChar.setOption(option);
      this.timer = setInterval(() => {
        let num = (Math.random() - 0.5) * 10;
        let date = new Date();
        let time = date.getHours();
        let min = date.getMinutes();
        let sec = date.getSeconds();
        let timeRes = (time < 10 ? "0" + time : time) + ":" + (min < 10 ? "0" + min : min) + ":" + (sec < 10 ? "0" + sec : sec);
        this.dataArr.shift();
        this.timeArr.shift();
        this.dataArr.push(Math.floor(num));
        this.timeArr.push(timeRes);
        this.temChar.setOption(option);
      }, 4000);
    },
    beforeDestroy() {
      clearInterval(this.timer)
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