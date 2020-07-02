/* eslint-disable */
/* jshint esversion: 6*/
/* 
时间轴模块
*/


export default {
  // !每个文件形成独立命名空间
  namespaced: true,
  // !初始值
  state: {
    // !当天有数据的时刻
    currentDayTimeList: [],
    // !当前激活的时间点
    // !当前时间轴上激活的时间点index
    activeIndex: 10
  },
  // !执行事件 同步
  mutations: {
    // !设置当前激活的时间点
    setActiveIndex(state, val) {
      console.log(val);
      state.activeIndex = val;
    },
    // !设置当前时间轴时间列表
    setCurrentDayTimeList(state, val) {
      console.log(val);
      state.currentDayTimeList = val;
    }
  },
  // !执行时间 异步
};
