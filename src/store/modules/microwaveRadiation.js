/* eslint-disable */
/* jshint esversion: 6 */
/* 
综合监测-微波辐射
*/
export default {
  // !每个文件形成独立命名空间
  namespaced: true,
  // !初始值
  state: { 
    // !微波辐射子菜单
    childrenMenuList: [{ 
      title: "站点分布",
      showStationList: false,
      showBg: false
    },
    {
      title: "",
      showStationList: true,
      showBg: true
      }],
    // !获取微波辐射站点列表接口
    microwaveRadiationListUrl: "/weibostation/zhan",
    // !微波辐射计站点数据
    searchSkyRadarStationList: [],
    // !获取点击的站点数据 http://192.168.1.2:8301/convection/api/weibostation/shows?time=2018-06-25%2003:36:03&zhanhao=58238
    microwaveStationDate: "weibostation/shows",
    // !当前点击的站点信息
    activeMicStation: 58238,
    // !微波辐射时间列表获取
    micTimeUrl: "weibostation/time"
  },
  // !执行事件 同步
  mutations: {
    setActiveMicStation(state, val) {
      state.activeMicStation = val;
      console.log(val);
    },
  },
  // !执行时间 异步
};
