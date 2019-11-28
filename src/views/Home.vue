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
        <!--地铁-->
        <subway-show></subway-show>
      </div>
      <div class="item">
        <!--降雨量-->
        <rain-list></rain-list>
      </div>
    </div>
  </div>
</template>

<script>
  import TemperatureShow from "../components/TemperatureShow";
  import HumidityShow from "../components/HumidityShow";
  import TravelShow from "../components/TravelShow";
  import SubwayShow from "../components/SubwayShow";
  import RainShow from "../components/RainShow";
  import RainList from "../components/RainList";
  import HomeInfo from "../components/HomeInfo";
  import HomeShow from "../components/HomeShow";
  import MapShow from "../components/MapShow";

  export default {
    name: "Home",
    components: {
      TemperatureShow,
      HumidityShow,
      TravelShow,
      SubwayShow,
      RainShow,
      RainList,
      HomeInfo,
      HomeShow,
      MapShow
    },
    computed: {
      subChar() {
        return this.$store.state.subChar;
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
        this.subChar.resize();
        this.raiChar.resize();
        this.temChar.resize();
        this.humChar.resize();
        this.traChar.resize();
        this.homChar.resize();
        this.mapChar.resize();
      };
    },
    created() {
      this.$store.dispatch("init_websocket");
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
