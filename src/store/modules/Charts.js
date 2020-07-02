/* eslint-disable */
/* jshint esversion: 6 */
/* 
控制图表状态
*/
export default {
  // !每个文件形成独立命名空间
  namespaced: true,
  // !初始值
  state: {
    // !探测仪对比图表
    isEchartsProbeShow: false,
    // !探空雷达图表显示
    isEchartsSearchSkyShow: false,
    // !微波辐射图表显示
    isEchartsMicrowaveShow: false,
    // !探测仪垂直温度图表
    isEchartsProbeSingleShow: false
  },
  // !执行事件 同步
  mutations: {
    // !探测仪对比图表
    setIsEchartsProbeShow(state, val) {
      console.log(val);
      state.isEchartsProbeShow = val;
    },
    // !探空雷达图表显示
    setIsEchartsSearchSkyShow(state, val) {
      state.isEchartsSearchSkyShow = val;
    },
    // !微波辐射图表显示
    setIsEchartsMicrowaveShow(state, val) {
      state.isEchartsMicrowaveShow = val;
    },
    // !探测仪垂直温度图表
    setIsEchartsProbeSingleShow(state, val) {
      state.isEchartsProbeSingleShow = val;
    }
  },
  // !执行时间 异步
};
