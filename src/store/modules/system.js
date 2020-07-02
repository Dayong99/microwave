/* eslint-disable */
/* jshint esversion: 6
*/
/* 
公共变量
*/
export default {
  namespaced: true,
  state: {
    simple: false,
    sysState: 'zhjc', // zhjc,yjyb,dbjc,cxtj
    stationActionStore: null,
    stationActionColor: 0,
    stationActionWriteValue: 0,
    skyRadiator: '',
    wei: '',
    skyRadarTableShow: true,
    // !当前选择的探空雷达站号
    searchSkyStationNumber: 0,
    // !当前时间轴日期
    currentAxisDate: '',
    // !点击的模块
    currentModuleFlag: 1,
    // !点击的模块中详细index
    setCurrentModuleIndex: 11,
    // !探空雷达站号日期
    searchSkyStationNumberDate: '',
    // !微波辐射站号
    weibostationNumber: ''
  },
  mutations: {
    setSimple(state, val) {
      state.simple = val;
    },
    setSys(state, val) {
      state.sysState = val;
    },
    // !自动站数据
    setStationActionStore(state, val) {
      state.stationActionStore = val;
    },
    setStationActionColor(state, val) {
      state.stationActionColor = val;
    },
    setStationActionWriteValue(state, val) {
      state.stationActionWriteValue = val;
    },
    setSkyRadiator(state, val) {
      console.log('skyRadiator', val);
      state.skyRadiator = val;
    },
    setWei(state, val) {
      state.wei = val;
    },
    setSkyRadarTableShow(state, val) {
      state.skyRadarTableShow = val;
    },
    // !当前时间轴日期
    setCurrentAxisDate(state, val) {
      console.log("状态管理器时间轴时间 " + val);
      state.currentAxisDate = val;
    },
    // !设置探空雷达站号
    setSearchSkyStationNumber(state, val) {
      state.searchSkyStationNumber = val;
      console.log(val);
    },
    // !设置探空雷达站号日期
    setSearchSkyStationNumberDate(state, val) {
      state.searchSkyStationNumberDate = val;
      console.log(val);
    },
    // !点击的模块 flag
    setCurrentModuleFlag(state, val) {
      console.log(val);
      state.currentModuleFlag = val;
    },
    // !点击的模块中详细index
    setCurrentModuleIndex(state, val) {
      state.currentModuleIndex = val;
    },
    // !微波辐射站号
    setWeibostationNumber(state, val) {
      state.weibostationNumber = val;
    },
    // !微波辐射站号日期
    setWeibostationNumberDate(state, val) {
      state.weibostationNumberDate = val;
    }
  }
};
