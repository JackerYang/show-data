<template>
  <div class="home">
    <div class="side">
      <div class="item">
        <!--温度-->
        <temperature-show></temperature-show>
      </div>
      <div class="item">
        <!--出行方式-->
        <travel-show></travel-show>
      </div>
      <div class="item">
        <!--降雨量-->
        <rain-show></rain-show>
      </div>
    </div>
    <div class="center">
      <div class="info">
        <home-info></home-info>
        <home-show></home-show>
      </div>
      <div class="show">
        <map-show></map-show>
      </div>
    </div>
    <div class="side">
      <div class="item">
        <!--湿度-->
        <humidity-show></humidity-show>
      </div>
      <div class="item">
        <!--考试合格-->
        <exam-show></exam-show>
      </div>
      <div class="item">
        <!--实时销量-->
        <sale-list></sale-list>
      </div>
    </div>
  </div>
</template>

<script>
  import TemperatureShow from "../components/TemperatureShow";
  import HumidityShow from "../components/HumidityShow";
  import TravelShow from "../components/TravelShow";
  import ExamShow from "../components/ExamShow";
  import RainShow from "../components/RainShow";
  import SaleList from "../components/SaleList";
  import HomeInfo from "../components/HomeInfo";
  import HomeShow from "../components/HomeShow";
  import MapShow from "../components/MapShow";

  export default {
    name: "Home",
    components: {
      TemperatureShow,
      HumidityShow,
      TravelShow,
      ExamShow,
      RainShow,
      SaleList,
      HomeInfo,
      HomeShow,
      MapShow
    },
    computed: {
      exmChar() {
        return this.$store.state.exmChar;
      },
      raiChar() {
        return this.$store.state.raiChar;
      },
      temChar() {
        return this.$store.state.temChar;
      },
      humChar() {
        return this.$store.state.humChar;
      },
      traChar() {
        return this.$store.state.traChar;
      },
      homChar() {
        return this.$store.state.homChar;
      },
      mapChar() {
        return this.$store.state.mapChar;
      }
    },
    mounted() {
      window.onresize = () => {
        this.exmChar.resize();
        this.raiChar.resize();
        this.temChar.resize();
        this.humChar.resize();
        this.traChar.resize();
        this.homChar.resize();
        this.mapChar.resize();
      };
    },
    created() {
      this.$store.dispatch("connectWebsocket");
    }
  };
</script>

<style lang="less" scoped>
  .home {
    width: 100vw;
    height: 100vh;
    padding: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    background: rgb(25, 25, 44);
    overflow: hidden;
    .side {
      width: 20%;
      height: 100%;
      .item {
        width: 100%;
        height: ~"calc(33.33% - 10px)";
        background: rgb(36, 39, 62);
        &:nth-child(2) {
          margin: 15px 0;
        }
      }
    }
    .center {
      width: 60%;
      height: 100%;
      padding: 0 15px;
      .info {
        width: 100%;
        height: 45%;
      }
      .show {
        width: 100%;
        height: 55%;
        background: rgb(36, 39, 62);
      }
    }
  }
</style>
