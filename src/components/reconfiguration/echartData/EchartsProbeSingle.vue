<template>
  <div class="charts" v-drag>
    <div ref="myChart" id="myChart" :style="{ width: '500px', height: '500px' }"></div>
    <el-button @click="getSearchSkyData">大气垂直温度探测</el-button>
    <el-button @click="closeChart">关闭</el-button>
  </div>
</template>
<script>
export default {
  name: "hello",
  data() {
    return {};
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    // !画图表
    drawLine(probeArray) {
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
            // !大气垂直温度
            {
              name: "大气垂直温度",
              type: "line",
              smooth: true,
              lineStyle: {
                width: 1,
                shadowColor: "rgba(0,0,0,0.4)",
                shadowBlur: 10,
                shadowOffsetY: 10
              },
              data: probeArray
            }
          ],
          title: [
            {
              show: true,
              textAlign: "center",
              x: "right",
              y: "top",
              text: "垂直温度 日期:2016-06-24 08:15:05",
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
    // !探测仪与探空数据对比
    getSearchSkyData() {
      // !获取数据
      this.$get(this.$store.state.FY4.fyProbeRatioList, {
        time: "2020-02-04 04:00:00",
        type: "探空",
        lon: 98.33448,
        // lon: this.$store.state.FY4.fyProbeMouseLeftClickPosition[0],
        // lat: this.$store.state.FY4.fyProbeMouseLeftClickPosition[1]
        lat: 52.334446
      })
        .then(res => {
          // !探测仪二维数组 0 为x轴(温度) 1 为 y轴(高度)
          const probeArray = [];
          // !为探测仪二维数组赋值
          let a2 = [],
            b2 = [];
          // !对温度进行筛选 保留大于200 小于1000的温度
          res.data.data.FY.data.forEach((item, index) => {
            if (item > -200 && item < 1000) {
              // !有效温度
              a2.push(item);
              // !温度对应高度
              b2.push(res.data.data.FY.PRESSURE[index]);
            }
          });
          // !对高度进行筛选 删除40以下
          const p_T = [],
            p_H = [];
          b2.forEach((item, index) => {
            if (item > 0.1) {
              // !筛选高度
              p_H.push(item * 1000);
              // !高度对应温度
              p_T.push(a2[index] - 273);
            }
          });
          for (var i = 0; i < p_T.length; i++) {
            probeArray[i] = [p_T[i], p_H[i]];
          }
          // !画图 SearchSkyHeight  探空高度  SearchSkyTemp 探空温度  probeHeight 探测仪高度 probeTEMP 探测仪温度
          this.drawLine(probeArray);
        })
        .catch(res => {
          this.$notify.error({
            title: "error",
            message: "数据请求失败",
            duration: 1500
          });
        });
    },
    // !探测仪与微波数据对比
    getMicwareData() {
      this.$get(this.$store.state.FY4.fyProbeRatioList, {
        time: "2020-02-04 04:00:00",
        type: "微波",
        lon: 98.33448,
        // lon: this.$store.state.FY4.fyProbeMouseLeftClickPosition[0],
        // lat: this.$store.state.FY4.fyProbeMouseLeftClickPosition[1]
        lat: 52.334446
      }).then(res => {
        // !对温度进行筛选 保留大于200 小于1000的温度
        const _m_H = [],
          _m_T = [];
        // !筛选温度
        res.data.data.微波.data.forEach((item, index) => {
          if (item > 173 && item < 1000) {
            // !有效温度
            _m_T.push(item - 273.15);
            // !温度对应高度
            _m_H.push(res.data.data.微波.height[index] * 1000);
          }
        });
        // !构造表格使用的二维数组 0 温度 1 高度
        const micArray = [];
        for (var i = 0; i < _m_T.length; i++) {
          micArray[i] = [_m_T[i], _m_H[i]];
        }
        // !探测仪二维数组 0 为x轴(温度) 1 为 y轴(高度)
        const probeArray = [];
        // !为探测仪二维数组赋值
        let a2 = [],
          b2 = [];
        // !对温度进行筛选 保留大于200 小于1000的温度
        res.data.data.FY.data.forEach((item, index) => {
          if (item > -200 && item < 1000) {
            // !有效温度
            a2.push(item);
            // !温度对应高度
            b2.push(res.data.data.FY.PRESSURE[index]);
          }
        });
        // !对高度进行筛选 删除40m以下 10km以上 使用微波有数据的高度点
        const p_T = [],
          p_H = [];
        b2.forEach((item, index) => {
          // if (item > 0.1 && item < 30) {
          if (item > 0.1 && item < 10) {
            // !筛选高度
            p_H.push(item * 1000);
            // !高度对应温度
            p_T.push(a2[index] - 273);
          }
        });
        for (var i = 0; i < p_T.length; i++) {
          probeArray[i] = [p_T[i], p_H[i]];
        }
        this.drawLine(null,micArray,probeArray);
      });
    },
    closeChart() {
      this.$store.commit('Charts/setIsEchartsProbeSingleShow', false)
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