/* eslint-disable */
/* jshint esversion: 6 */
/* 
综合监测-自动站模块
*/
export default {
  // !每个文件形成独立命名空间
  namespaced: true,
  // !初始值
  state: {
    // !自动站菜单列表
    autoStationMenuList: [{
        title: '筛选',
        showTab: true,
        wActiveShow: false,
        cActiveShow: false,
        left: '基本站',
        right: '加密站'
      },
      {
        title: '地面填图',
        showTab: false
      },
      {
        title: '温度',
        showTab: true,
        wActiveShow: false,
        cActiveShow: false,
        left: '填值',
        right: '色斑'
      },
      {
        title: '气压',
        showTab: true,
        wActiveShow: false,
        cActiveShow: false,
        left: '填值',
        right: '色斑'
      },
      {
        title: '相对湿度',
        showTab: true,
        wActiveShow: false,
        cActiveShow: false,
        left: '填值',
        right: '色斑'
      },
      {
        title: '风向风速',
        showTab: true,
        wActiveShow: false,
        cActiveShow: false,
        left: '填值',
        right: '色斑'
      },
      {
        title: '能见度',
        showTab: true,
        wActiveShow: false,
        cActiveShow: false,
        left: '填值',
        right: '色斑'
      }
    ],
    // !当前选择的站的类别 0基本站 1加密站
    // stationType: 0,
    // // !基本站 0 未选中 1 选中 
    // stationType: 0
    basic: 0,
    // // !自动站 0 未选中 1 选中
    encrypt: 0,
    // !自动站色斑接口地址 type 类型 basic 0 1 基本站 encrypt 0 1 加密站 time 时间
    splashMapUrl : "autostation/polygons"
  },
  // !执行事件 同步
  mutations: {
    setStationType(state, val) {
      state.stationType = val;
    },
    // !是否选择基本站 0 未选择 1选择
    setBasic(state, val) {
      console.log("状态管理器中的basic", val)
      state.basic = val;
    },
    // !是否选择加密站 0 未选择 1选择
    setEncrypt(state, val) {
      console.log("状态管理器中的basic", val);
      state.encrypt = val;
    },
  },
  // !执行时间 异步
};
