<template>
<!-- eslint-disable -->
  <div>
    <div class="charts">
      <div ref="myChart" id="myChart" :style="{ width: '500px', height: '500px' }"></div>
      <el-button @click="getData">探空雷达数据</el-button>
      <el-button @click="closeChart">关闭</el-button>
    </div>
    <!-- <div class="menu_list">
      <div class="block">
        <span class="demonstration">日期</span>
        <el-date-picker v-model="dateValue" type="datetime" placeholder="选择日期时间"></el-date-picker>
      </div>
    </div> -->
  </div>
</template>
<script>
/* eslint-disable */
export default {
  name: "hello",
  data() {
    return {
      dateValue: ''
    };
  },
  mounted() {
    this.drawLine();
  },
  computed: {
    // !站号变化 传入
    activeSearchSkyStationNumber() {
      return this.$store.state.searchSkyRadar.activeSearchSkyStation;
    }
  },
  watch: {
    // !监测探空雷达中选择的站号是否变化
    activeSearchSkyStationNumber(val) {
      console.log("选中的站号变化" + val);
      this.getData(val);
    }
  },
  methods: {
    // !画图标
    drawLine(searchSkyArray, stationNumber) {
      // !通过ref获取到DOM节点
      if (myChart) {
        const myChart = this.$refs.myChart;
        // !利用原型调取Echarts的初始化方法
        const thisChart = this.$echarts.init(myChart);
        // !图表配置项
        const option = {
          tooltip: {
            trigger: "axis",
            formatter: "{c}"
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true
          },
          xAxis: {
            type: "value",
            axisLabel: {
              formatter: "{value} °C"
            }
          },
          yAxis: {
            type: "value",
            axisLabel: {
              formatter: "{value} m"
            }
          },
          series: [
            // !探空雷达
            {
              name: "探空雷达",
              type: "line",
              smooth: true,
              lineStyle: {
                width: 1,
                shadowColor: "rgba(0,0,0,0.4)",
                shadowBlur: 10,
                shadowOffsetY: 10
              },
              data: searchSkyArray
            }
          ],
          title: [
            {
              show: true,
              textAlign: "center",
              x: "right",
              y: "top",
              text:
                "探空雷达 日期:2016-06-24 08:15:05 站号:" + stationNumber ||
                "未选择站点",
              textStyle: {
                fontSize: 14,
                fontWeight: "bolder",
                color: "#333"
              }
            }
          ]
        };
        // !清空数据 重新挂载
        thisChart.clear();
        // !将配置项挂载到Echarts
        thisChart.setOption(option);
        // !页面大小变化后Echarts也更改大小
        window.addEventListener("resize", function() {
          thisChart.resize();
        });
      }
    },
    // !获取表格数据
    getData(stationNumber) {
      // !获取数据
      this.$get(this.$store.state.searchSkyRadar.searchSkyRadarStationDate, {
        time: "2016-06-24 08:15:05",
        zhanhao: stationNumber
      }).then(res => {
        // !将请求到的数据进行处理
        let _a = JSON.parse(res.data.data.data).data;
        // console.log(_a)
        // !筛选温度
        const _s_H = [],
          _s_T = [];
        _a.TEMP.forEach((item, index) => {
          if (item > -100 && item < 1000) {
            // !有效温度
            _s_T.push(item);
            // !温度对应高度
            _s_H.push(_a.HEIGHT[index]);
          }
        });
        // !筛选高度
        const s_T = [],
          s_H = [];
        _s_H.forEach((item, index) => {
          if (item > 100) {
            // !筛选高度
            s_H.push(item);
            // !高度对应温度
            s_T.push(_s_T[index]);
          }
        });
        // !构造表格使用的二维数组 0 温度 1 高度
        const searchSkyArray = [];
        for (var i = 0; i < s_T.length; i++) {
          searchSkyArray[i] = [s_T[i], s_H[i]];
        }
        // !画图
        console.log(searchSkyArray);
        this.drawLine(searchSkyArray, stationNumber);
      });
    },
    // !关闭图表
    closeChart() {
      this.$store.commit("Charts/setIsEchartsSearchSkyShow", false);
    }
  }
};
</script>
<style scoped>
.charts {
  position: fixed;
  top: 100px;
  left: 1300px;
  background: white;
  opacity: 0.8;
}
.menu_list {
  position: fixed;
  top: 150px;
  left: 1700px;
  background: white;
  opacity: 0.8;
}
</style>