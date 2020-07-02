/* eslint-disable */
/* jshint esversion: 6 */
/* 
综合监测-雷达模块
*/
export default {
  // !每个文件形成独立命名空间 
  namespaced: true,
  // !初始值
  state: {
    // !探空雷达子菜单
    childrenMenuList: [
      {
        title: "站点分布",
        showStationList: false,
        showBg: false
      },
      {
        title: "",
        showStationList: true,
        showBg: true
      }
    ],
    // !站点列表数据
    searchSkyRadarStationList: [],
    // !获取探空雷达站点列表接口
    searchSkyRadarStationListUrl: "/instand/lboinstan",
    // !当前点击的站点信息
    activeSearchSkyStation: 58238,
    // !获取点击的站点数据 http://192.168.1.2:8301/convection/api/lbostation/getdata?time=2016-06-24%2008:15:05&zhanhao=58847
    searchSkyRadarStationDate: "/lbostation/getdata",
    // !探空雷达获取时间列表
    searchSkyRadarTimeData: "/lbostation/time"
  },
  // !执行事件 同步
  mutations: {
    setActiveSearchSkyStation(state, val) {
      state.activeSearchSkyStation = val;
      console.log("当前状态管理器储存的激活的探空雷达站点站号:", val);
    },
  },
  // !执行时间 异步
  actions: {
    
  }
};
