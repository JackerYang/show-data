<template>
  <div class="home-info">
    <div class="title">大数据可视化平台</div>
    <div class="info">
      <div class="time">{{ time.split(" ")[1] }}</div>
      <span class="date">{{ time.split(" ")[0] }}</span>
      <span class="week">{{ week }}</span>
    </div>
    <!--<div class="top">-->
    <!--  <div class="log">-->
    <!--    <img src="" alt="">-->
    <!--  </div>-->
    <!--  <div class="info">-->
    <!--    <span>{{ time }} </span>-->
    <!--    <span>{{ week }}</span>-->
    <!--    <span>{{ weather }}</span>-->
    <!--  </div>-->
    <!--</div>-->

  </div>
</template>

<script>
  import { getTime, getWeek, getWeather } from "../libs/utils";

  export default {
    name: "HomeInfo",
    data() {
      return {
        time: "",
        week: "",
        weather: "",

        timer: null
      };
    },
    created() {
      this.time = getTime();
      this.weather = getWeather();
      this.week = getWeek();
      this.timer = setInterval(() => {
        this.time = getTime();
      }, 1000);
    }
  };
</script>

<style lang="less" scoped>
  .home-info {
    width: 100%;
    height: 100%;
    .title {
      width: 300px;
      transform: perspective(2em) rotateX(-10deg);
      font-size: 30px;
      color: #fff;
      text-align: center;
      background: #24273E;
      padding: 0 50px 15px;
      margin: 0 auto;
    }
    .info {
      color: #fff;
      .time {
        font-size: 36px;
      }
      .date {
        font-size: 16px;
        margin-right: 10px;
      }
      .week {
        font-size: 16px;
      }
    }
  }
</style>