<template>
  <!-- eslint-disable -->
  <div class="timeline_content">
    <div class="control_button el-icon-arrow-left" @click="backWard"></div>
    <div
      class="control_button"
      :class="{'el-icon-video-play': !playing, 'el-icon-video-pause': playing}"
      @click="play"
    ></div>
    <div class="control_button el-icon-arrow-right" @click="forward"></div>
    <div class="control_button el-icon-d-arrow-right" @click="jumpLatest"></div>
    <div class="control_options">
      <select
        style="height: 25px; width:70px;
            cursor: pointer;"
        @change="changeInterval"
        v-model="activeIntervalValue"
      >
        <option
          :value="item"
          :key="index"
          :value-key="index"
          v-for="(item,index) in timeInterval"
        >{{item}}</option>
      </select>
    </div>
    <div class="control_options">
      <select
        style="height: 25px; width:70px;
            cursor: pointer;"
        v-model="activeSpeedValue"
        @change="changeSpeed"
      >
        <option
          :value="item"
          :key="index"
          :value-key="index"
          v-for="(item,index) in timeSpeed"
        >{{item}}</option>
      </select>
    </div>
    <div class="control_date_single">
      <span class="el-icon-arrow-left" @click="lastAxis"></span>
      <el-date-picker
        v-model="singleDateValue"
        type="datetime"
        placeholder="选择日期"
        size="mini"
        style="width:200px;height:25px"
        @change="changeDatePick"
      ></el-date-picker>
      <!-- <input type="date" :value="singleDateValue" /> -->
      <span class="el-icon-arrow-right" @click="nextAxis"></span>
    </div>
    <!-- <div class="control_date_double">
      <span>
        <img src="@/assets/images/time_line/interval_date.png" />
      </span>
    </div>-->
    <div class="line_axis">
      <div class="axis"></div>
      <div class="scale_vernier" :style="{left: vernierMove }">
        <img src="@/assets/images/time_line/vernier.png" />
      </div>
      <div class="scale" v-for="(item,index) in currentTimeAxisScaleY.length" :key="index"></div>
      <ul class="label_content">
        <li
          v-for="(item, index) in currentTimeAxisScaleY"
          :key="index"
          class="label"
          @click="clickScale(index)"
        >{{item | HourMin}}</li>
      </ul>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
export default {
  data() {
    return {
      singleDateValue: "",
      vernierMove: "1879px",
      vernierPositionArray: [
        "781px",
        "903px",
        "1025px",
        "1147px",
        "1269px",
        "1391px",
        "1513px",
        "1635px",
        "1757px",
        "1879px"
      ],
      timeSpeed: ["0.5s", "1s", "2s", "4s"],
      timeInterval: ["5min", "30min", "60min", "180min"],
      activeIntervalValue: "5min",
      activeSpeedValue: "2s",
      intervalTimer: null,
      activeIndex: 9,
      playing: false,
      currentTimeRoundDownMin: "",
      currentTimeAxisScaleY: []
    };
  },
  watch: {
    playing: {
      handler: function(o, n) {
        const _ = this;
        // console.log(this.playing);
        if (this.playing) {
          _.intervalTimer = setInterval(() => {
            _.activeIndex = _.activeIndex + 1;
            _.vernierMove = _.vernierPositionArray[_.activeIndex];
            if (_.activeIndex > 9) {
              _.forward();
            }
            // console.log(_.currentTimeAxisScaleY[_.activeIndex]);
          }, parseInt(_.activeSpeedValue) * 1000);
          _.singleDateValue = _.currentTimeAxisScaleY[_.activeIndex];
          // 停止
        } else {
          if (_.intervalTimer) {
            clearInterval(_.intervalTimer);
            _.intervalTimer = null;
          }
        }
      },
      immediate: true
    },
    activeIndex(newval,oldval){
      this.$store.commit('timeLine/setActiveIndex',newval)
      // console.log(newval)
    },
    currentTimeAxisScaleY(newval,oldval){
      this.$store.commit('timeLine/setCurrentDayTimeList',newval)
    }
    /* playing() {
      const _ = this;
      if (this.playing) {
        _.intervalTimer = setInterval(() => {
          _.activeIndex = _.activeIndex + 1;
          _.vernierMove = _.vernierPositionArray[_.activeIndex];
          if (_.activeIndex > 9) {
            _.forward();
          }
        }, parseInt(_.activeSpeedValue) * 1000);
        // 停止
      } else {
        if (_.intervalTimer) {
          clearInterval(_.intervalTimer);
          _.intervalTimer = null;
        }
      }
    }, */
  },
  mounted() {
    const currentTimeDate = this.$moment().format("YYYY-MM-DD HH:mm:ss");
    this.renderTimeline(currentTimeDate);
  },
  methods: {
    clickScale(index) {
      const _ = this;
      _.activeIndex = index;
      _.vernierMove = _.vernierPositionArray[_.activeIndex];
      _.singleDateValue = _.currentTimeAxisScaleY[_.activeIndex];
    },
    transferTimeStamp(dateArray) {
      return dateArray.map(i => {
        return this.$moment(i).unix();
      });
    },
    clearDateT(dateArray) {
      return (dateArray = dateArray.map(i => {
        return i.replace("T", " ");
      }));
    },
    getCurrentTimeRoundDownMin(dateValue) {
      const roundDownTimeMin =
        Math.floor(this.$moment(dateValue).format("mm") / 10) * 10;
      const currentTimeDate = this.$moment(dateValue).format("YYYY-MM-DD HH");
      return currentTimeDate + ":" + roundDownTimeMin;
    },
    getCurrentTimeAxisScale(time) {
      const DateArray = [];
      for (let i = 0; i < 10; i++) {
        DateArray[i] = i;
      }
      const timeArray = DateArray.map(sweetItem => {
        return this.$moment(time)
          .subtract(parseInt(this.activeIntervalValue) * sweetItem, "minutes")
          .format("YYYY-MM-DD HH:mm");
      });
      return timeArray.reverse();
    },
    renderTimeline(dateTime) {
      this.currentTimeRoundDownMin = this.getCurrentTimeRoundDownMin(dateTime);
      this.currentTimeAxisScaleY = this.getCurrentTimeAxisScale(
        this.currentTimeRoundDownMin
      );
      this.singleDateValue = this.currentTimeAxisScaleY[this.activeIndex];
    },
    // 上一个
    backWard() {
      const _ = this;
      if (_.activeIndex > 0) {
        _.activeIndex = _.activeIndex - 1;
        _.vernierMove = _.vernierPositionArray[_.activeIndex];
      } else {
        const _time = _.$moment(_.currentTimeAxisScaleY[0])
          .subtract(parseInt(_.activeIntervalValue), "minutes")
          .format("YYYY-MM-DD HH:mm");
        _.renderTimeline(_time);
        _.activeIndex = 9;
        _.vernierMove = _.vernierPositionArray[_.activeIndex];
      }
      _.singleDateValue = _.currentTimeAxisScaleY[_.activeIndex];
      // console.log(_.currentTimeAxisScaleY[_.activeIndex]);
    },
    play() {
      this.playing = !this.playing;
      // console.log(_.currentTimeAxisScaleY[_.activeIndex]);
    },
    // 下一个
    forward() {
      const _ = this;
      if (_.activeIndex < 9) {
        _.activeIndex = _.activeIndex + 1;
        _.vernierMove = _.vernierPositionArray[_.activeIndex];
      } else {
        const _time = _.$moment(_.currentTimeAxisScaleY[9])
          .add(10 * parseInt(_.activeIntervalValue), "minutes")
          .format("YYYY-MM-DD HH:mm");
        _.renderTimeline(_time);
        _.activeIndex = 0;
        _.vernierMove = _.vernierPositionArray[_.activeIndex];
      }
      _.singleDateValue = _.currentTimeAxisScaleY[_.activeIndex];
      // console.log(_.currentTimeAxisScaleY[_.activeIndex]);
    },
    jumpLatest() {
      const _ = this;
      const _time = this.$moment().format("YYYY-MM-DD HH:mm:ss");
      _.renderTimeline(_time);
      _.activeIndex = 9;
      _.vernierMove = _.vernierPositionArray[_.activeIndex];
      _.singleDateValue = _.currentTimeAxisScaleY[_.activeIndex];
      // console.log(_.currentTimeAxisScaleY[_.activeIndex]);
    },
    changeInterval() {
      const _ = this;
      const _time = _.currentTimeAxisScaleY[9];
      _.renderTimeline(_time);

      this.playing = false;

      _.activeIndex = 9;
      _.vernierMove = _.vernierPositionArray[_.activeIndex];
      _.singleDateValue = _.currentTimeAxisScaleY[_.activeIndex];
      // console.log(_.currentTimeAxisScaleY[_.activeIndex]);
    },
    changeSpeed() {
      const _ = this;
      const _time = _.currentTimeAxisScaleY[9];
      this.playing = false;

      _.activeIndex = 9;
      _.vernierMove = _.vernierPositionArray[_.activeIndex];
      _.singleDateValue = _.currentTimeAxisScaleY[_.activeIndex];
      // console.log(_.currentTimeAxisScaleY[_.activeIndex]);
    },
    lastAxis() {
      const _ = this;
      const _time = _.$moment(_.currentTimeAxisScaleY[0])
        .subtract(parseInt(_.activeIntervalValue), "minutes")
        .format("YYYY-MM-DD HH:mm");
      _.renderTimeline(_time);
      _.singleDateValue = _.currentTimeAxisScaleY[_.activeIndex];
      // console.log(_.currentTimeAxisScaleY[_.activeIndex]);
    },
    nextAxis() {
      const _ = this;
      const _time = _.$moment(_.currentTimeAxisScaleY[9])
        .add(10 * parseInt(_.activeIntervalValue), "minutes")
        .format("YYYY-MM-DD HH:mm");
      _.renderTimeline(_time);
      _.singleDateValue = _.currentTimeAxisScaleY[_.activeIndex];
      // console.log(_.currentTimeAxisScaleY[_.activeIndex]);
    },
    changeDatePick(date) {
      const _ = this;
      const _time = _.$moment(date).format("YYYY-MM-DD HH:mm:ss");
      _.renderTimeline(_time);
      _.singleDateValue = _.currentTimeAxisScaleY[_.activeIndex];
      // console.log(_.currentTimeAxisScaleY[_.activeIndex]);
    }
  },
  filters: {
    HourMin(item) {
      return item.split(" ")[1];
    }
  }
};
</script>
<style lang="scss" scoped>
.timeline_content {
  position: fixed;
  bottom: 0px;
  width: 100%;
  height: 45px;
  background: #021f3f;
  color: #ffffff;
  line-height: 48px;
  text-align: center;
  .control_button {
    float: left;
    height: 100%;
    width: 50px;
    background: #183d67;
    border-left: 0.5px solid #3b3939;
    font-size: 26px;
    padding-top: 8px;
    cursor: pointer;
  }
  .control_options {
    float: left;
    height: 100%;
    width: 90px;
    background: #183d67;
    border-left: 0.5px solid #3b3939;
    border-right: 0.5px solid #3b3939;
    cursor: pointer;
  }
  .control_date_single {
    float: left;
    height: 100%;
    width: 280px;
    background: #183d67;
    border-right: 0.5px solid #3b3939;
    cursor: pointer;
    z-index: 100;
  }
  .control_date_double {
    float: left;
    height: 100%;
    width: 90px;
    border-right: 0.5px solid #3b3939;
    cursor: pointer;
    background: #183d67;
    padding-top: 6px;
    img {
      height: 34px;
      width: 34px;
    }
  }
  .line_axis {
    position: relative;
    float: right;
    height: 100%;
    width: 1240px;
    background: #01203f;
    margin-right: 10px;
    .axis {
      height: 5px;
      background: #377fa4;
      width: 100%;
      margin-top: 10px;
      border-radius: 2px;
    }
    .scale_vernier {
      position: fixed;
      bottom: 35px;
      height: 20px;
      left: 1879px;
      img {
        width: 20px;
        height: 16px;
      }
    }
    .scale {
      float: left;
      height: 14px;
      width: 2px;
      margin-left: 120px;
      background: #377fa4;
      cursor: pointer;
    }
    .label_content {
      position: absolute;
      left: 17px;
      width: 100%;
      cursor: pointer;
      .label {
        float: left;
        height: 20px;
        margin-left: 84.5px;
        font-size: 15px;
      }
    }
  }
}
</style>