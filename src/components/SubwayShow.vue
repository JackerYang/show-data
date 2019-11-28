<template>
  <div class="subway-show">
    <item-title title="地铁人数占比"></item-title>
    <div id="exa-char"></div>
  </div>
</template>

<script>
  import ItemTitle from "./common/ItemTitle";

  const EC = require("echarts/lib/echarts");
  require("echarts/lib/chart/pie");
  require("echarts/lib/component/tooltip");
  require("echarts/lib/component/legend");

  export default {
    name: "ExamShow",
    components: {
      ItemTitle
    },
    computed: {
      subChar() {
        return this.$store.state.subChar;
      },
      subData() {
        return this.$store.state.subData;
      }
    },
    watch: {
      subData: {
        deep: true,
        handler: function (newVal) {
          let { value } = newVal;
          this.option.series.data.forEach(item => {
            item.value += value;
          });
          this.subChar.setOption(this.option);
        }
      }
    },
    data() {
      return {
        option: {
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
            itemGap: 20,
            data: ["5号线", "10号线", "15号线", "1号线"]
          },
          color: ["#805BCE", "#FFCA29", "#43BBFB", "#FF4B8A"],
          series: {
            name: "地铁人数",
            type: "pie",
            radius: "60%",  // 设置环形饼状图， 第一个百分数设置内圈大小，第二个百分数设置外圈大小
            center: ["50%", "40%"],  // 设置饼状图位置，第一个百分数调水平位置，第二个百分数调垂直位置
            data: [
              { value: 545, name: "5号线" },
              { value: 454, name: "10号线" },
              { value: 246, name: "15号线" },
              { value: 654, name: "1号线" }
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

        }
      };
    },
    mounted() {
      this.$store.commit("SET_SUB_CHAR", EC.init(document.getElementById("exa-char"), {}));
      this.subChar.setOption(this.option);
    }
  };
</script>

<style lang="less" scoped>
  .subway-show {
    width: 100%;
    height: 100%;
    #exa-char {
      width: 100%;
      height: ~"calc(100% - 50px)";
    }
  }
</style>