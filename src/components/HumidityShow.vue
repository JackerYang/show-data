<template>
  <div class="humidity-show">
    <item-title :title="'空气湿度（ '+ dataArr[dataArr.length - 1] +'% ）'"></item-title>
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
      }
    },
    data() {
      return {
        timeArr: ["10:31:12", "10:32:45", "10:33:12", "10:34:08", "10:35:10", "10:36:10", "10:37:30", "10:38:12"],
        dataArr: [53, 45, 78, 62, 87, 84, 12, 45],
        timer: null
      };
    },
    mounted() {
      this.$store.commit("SET_HUM_CHAR", EC.init(document.getElementById("hum-char"), {}));
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
        color: ["#805BCE", "#FFCA29", "#FF4B8A"],
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
          data: this.dataArr,
          smooth: true
        }
      };
      this.humChar.setOption(option);
      this.timer = setInterval(() => {
        let num = Math.random() * 100;
        let date = new Date();
        let time = date.getHours();
        let min = date.getMinutes();
        let sec = date.getSeconds();
        let timeRes = (time < 10 ? "0" + time : time) + ":" + (min < 10 ? "0" + min : min) + ":" + (sec < 10 ? "0" + sec : sec);
        this.dataArr.shift();
        this.timeArr.shift();
        this.dataArr.push(Math.floor(num));
        this.timeArr.push(timeRes);
        this.humChar.setOption(option);
      }, 3000);
    },
    beforeDestroy() {
      clearInterval(this.timer);
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