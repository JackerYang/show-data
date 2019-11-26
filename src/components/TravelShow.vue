<template>
  <div class="travel-show">
    <item-title title="出行占比"></item-title>
    <div id="tra-char"></div>
  </div>
</template>

<script>
  import ItemTitle from "./common/ItemTitle";

  const EC = require("echarts/lib/echarts");
  require("echarts/lib/chart/pie");
  require("echarts/lib/component/tooltip");
  require("echarts/lib/component/legend");

  export default {
    name: "TravelShow",
    components: {
      ItemTitle
    },
    computed: {
      traChar() {
        return this.$store.state.traChar;
      }
    },
    data() {
      return {
        timer: null
      };
    },
    mounted() {
      this.$store.commit("SET_TRA_CHAR", EC.init(document.getElementById("tra-char"), {}));
      let option = {
        backgroundColor: "#24273E",
        tooltip: {
          trigger: "axis"
        },
        legend: {
          y: "bottom",
          textStyle: {
            color: "#999"  // 图例文字颜色
          },
          // itemGap设置各个item之间的间隔，单位px，默认为10，横向布局时为水平间隔，纵向布局时为纵向间隔
          itemGap: 30,
          data: ["公交", "单车", "驾车"]
        },
        color: ["#FFCA29", "#FF4B8A", "#805BCE"],
        series: {
          name: "出行方式",
          type: "pie",
          // radius: '50%',  // 设置饼状图大小，100%时，最大直径=整个图形的min(宽，高)
          radius: ["30%", "60%"],  // 设置环形饼状图， 第一个百分数设置内圈大小，第二个百分数设置外圈大小
          center: ["50%", "40%"],  // 设置饼状图位置，第一个百分数调水平位置，第二个百分数调垂直位置
          data: [
            { value: 335, name: "公交" },
            { value: 310, name: "单车" },
            { value: 234, name: "驾车" }
          ],
          // itemStyle 设置饼状图扇形区域样式
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(30, 144, 255，0.5)"
            }
          },
          // 设置值域的那指向线
          labelLine: {
            normal: {
              show: true   // show设置线是否显示，默认为true，可选值：true ¦ false
            }
          },
          // 设置值域的标签
          label: {
            normal: {
              position: "outer",  // 设置标签位置，默认在饼状图外 可选值：'outer' ¦ 'inner（饼状图上）'
              formatter: "{b}: {c}\n({d}%)"   //设置标签显示内容 ，默认显示{b}
            }
          }
        }

      };
      this.traChar.setOption(option);
      this.timer = setInterval(() => {
        let data = option.series.data;
        data.forEach(item => {
          item.value = item.value + Math.round(Math.random() * 10);
        });
        this.traChar.setOption(option);
      }, 2000);
    },
    beforeDestroy() {
      clearInterval(this.timer);
    }
  };
</script>

<style lang="less" scoped>
  .travel-show {
    width: 100%;
    height: 100%;
    #tra-char {
      width: 100%;
      height: ~"calc(100% - 50px)";
    }
  }
</style>