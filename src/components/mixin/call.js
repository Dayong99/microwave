import {
  Sdt
} from './microwave_chart.js'
var a = new Sdt({
  'IP': ''
})

export default {
  methods: {
    // 更新数据
    updateChart(skyRadaTime, weiboTime) {
      console.log(skyRadaTime, weiboTime)
      a.init_chart({
        el: '#chart-container',
        top: 5, // !default as 75
        left: 0, // !default as 1400
        zIndex: undefined, // !default as 10
        width: 600, // !default as 450
        height: 450 // !default as 300
      });
      console.log("111")
      a.update_data({
        // !微波
        timeMW: null,
        stationMW: null,
        // !探空
        timeLC: skyRadaTime,
        stationLC: this.$store.state.system.searchSkyStationNumber
        // timeMW: undefined,
        // timeLC: this.$store.state.system.currentAxisDate,
        // stationMW: undefined,
        // stationLC: this.$store.state.system.skyRadiator.zhanhao
      });
    }
  }
}
