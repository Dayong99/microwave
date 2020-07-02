<template>
<!-- eslint-disable -->
  <div class="charts">
    <div
      ref="myChart"
      id="myChart"
      :style="{ width: '500px', height: '500px' }"
    ></div>
    <el-button @click="getData">微波辐射</el-button>
    <el-button @click="closeChart">关闭</el-button>
  </div>
</template>
<script>
export default {
  /* eslint-disable */
  name: "hello",
  data() {
    return {};
  },
  mounted() {
    this.drawLine();
  },
  computed: {
    // !站号变化 传入
    activeMicStation() {
      return this.$store.state.microwaveRadiation.activeMicStation;
    }
  },
  watch: {
    // !监测探空雷达中选择的站号是否变化
    activeMicStation: {
      handler(val) {
        console.log(val);
      },
      immediate: true
    }
  },
  methods: {
    // !画图标
    drawLine(micArray, stationNumber) {
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
            // !微波辐射
            {
              name: "微波辐射",
              type: "line",
              smooth: true,
              lineStyle: {
                width: 1,
                shadowColor: "rgba(0,0,0,0.4)",
                shadowBlur: 10,
                shadowOffsetY: 10
              },
              data: micArray
            }
          ],
          title: [
            {
              show: true,
              textAlign: "center",
              x: "right",
              y: "top",
              text: "微波辐射 日期:2016-06-24 08:15:05 站号:" + stationNumber,
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
      this.$get(this.$store.state.microwaveRadiation.microwaveStationDate, {
        time: "2018-06-25 03:36:03",
        zhanhao: (stationNumber || 58238)
      }).then(res => {
        console.log(res.data.data);
        // !原始温度
        const _a = res.data.data.data.split(",");
        // !原始高度
        const _b = res.data.data.heightList.split(",");
        // !筛选温度
        const _m_H = [],
          _m_T = [];
        _a.forEach((item, index) => {
          if (item > 173 && item < 1000) {
            // !有效温度
            _m_T.push(item - 273.15);
            // !温度对应高度
            _m_H.push(_b[index] * 1000);
          }
        });
        // !筛选高度
        console.log(_m_T);
        console.log(_m_H);
        // !构造表格使用的二维数组 0 温度 1 高度
        const micArray = [];
        for (var i = 0; i < _m_T.length; i++) {
          micArray[i] = [_m_T[i], _m_H[i]];
        }
        this.drawLine(micArray, stationNumber);
      });
    },
    // !关闭表格
    closeChart() {
      this.$store.commit("Charts/setIsEchartsMicrowaveShow", false);
    }
  }
};
</script>
<style scoped>
.charts {
  position: fixed;
  top: 150px;
  left: 1400px;
  background: white;
  opacity: 0.8;
}
</style>
