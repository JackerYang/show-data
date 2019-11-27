<template>
  <div class="home-info">
    <div class="info">
      <p class="time">{{ time.split(" ")[1] }}</p>
      <div>
        <p class="date">{{ time.split(" ")[0] }}</p>
        <span class="week">{{ week }}</span>
        <span class="weather">{{ weather }}</span>
      </div>
    </div>
    <div class="title">大数据可视化平台</div>
    <div class="msg">
      <p>
        <img class="notice" src="../assets/img/notice.png">
        <span>【寒潮预警】北京市朝阳区寒潮预警。</span>

      </p>
      <p>
        <img class="msg" src="../assets/img/msg.png">
        <span>您有一个新的消息，请注意查收。</span>
      </p>
    </div>
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
    height: 64px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .info {
      width: ~"calc(50% - 180px)";
      height: 64px;
      color: #ccc;
      display: flex;
      align-items: center;
      align-content: center;
      justify-content: flex-end;
      .time {
        width: 150px;
        font-size: 36px;
        margin: 0 20px 0 0;
      }
      .date {
        font-size: 18px;
        margin: 0;
      }
      .week {
        font-size: 18px;
        margin-right: 20px;
      }
      .weather {
        font-size: 18px;
      }
    }
    .title {
      width: 300px;
      height: 100%;
      line-height: 64px;
      transform: perspective(2em) rotateX(-10deg);
      font-size: 30px;
      color: #1BB4F9;
      text-align: center;
      overflow: hidden;
      border: 1px solid #093552;
      background: #111F44;
    }
    .msg {
      width: ~"calc(50% - 180px)";
      height: 64px;
      color: #ccc;
      p {
        height: 32px;
        line-height: 32px;
        font-size: 16px;
        margin: 0;
        width: 100%;
        img {
          position: relative;
          top: -6px;
        }
        .notice {
          width: 18px;
          height: 18px;
        }
        .msg {
          left: -2px;
          width: 20px;
          height: 20px;
          margin-right: 5px;
        }
        span {
          display: inline-block;
          width: ~"calc(100% - 25px)";
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
</style>