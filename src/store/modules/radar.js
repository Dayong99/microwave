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
    // !雷达列表数据
    radarMenuList: [
      {
        title: "0.5KM",
        datatype: "CombinedReflectivity",
        show: true
      },
      {
        title: "1.0KM",
        datatype: "CombinedReflectivity",
        show: true
      },
      {
        title: "1.5KM",
        datatype: "CombinedReflectivity",
        show: true
      },
      {
        title: "2.0KM",
        datatype: "CombinedReflectivity",
        show: true
      },
      {
        title: "2.5KM",
        datatype: "CombinedReflectivity",
        show: true
      },
      {
        title: "3.0KM",
        datatype: "CombinedReflectivity",
        show: true
      },
      {
        title: "3.5KM",
        datatype: "CombinedReflectivity",
        show: true
      },
      {
        title: "4.0KM",
        datatype: "CombinedReflectivity",
        show: true
      },
      {
        title: "4.5KM",
        datatype: "CombinedReflectivity",
        show: true
      },
      {
        title: "5.0KM",
        datatype: "CombinedReflectivity",
        show: true
      },
      {
        title: "5.5KM",
        datatype: "CombinedReflectivity",
        show: true
      },
      {
        title: "6.0KM",
        datatype: "CombinedReflectivity",
        show: true
      },
      {
        title: "7.0KM",
        datatype: "CombinedReflectivity",
        show: true
      },
      {
        title: "8.0KM",
        datatype: "CombinedReflectivity",
        show: true
      },
      {
        title: "9.0KM",
        datatype: "CombinedReflectivity",
        show: true
      },
      {
        title: "10.0KM",
        datatype: "CombinedReflectivity",
        show: true
      },
      {
        title: "12.0KM",
        datatype: "CombinedReflectivity",
        show: true
      },
      {
        title: "14.0KM",
        datatype: "CombinedReflectivity",
        show: true
      },
      {
        title: "15.5KM",
        datatype: "CombinedReflectivity",
        show: true
      },
      {
        title: "17.0KM",
        datatype: "CombinedReflectivity",
        show: true
      },
      {
        title: "19.0KM",
        datatype: "CombinedReflectivity",
        show: true
      },
      {
        title: "30min",
        datatype: "QPE",
        show: false
      },
      {
        title: "1h",
        datatype: "QPE",
        show: false
      }
    ],
    // !雷达组合反射率图片接口地址
    combineUrl: "rada/tdimg",
    // !雷达降水估计图片接口地址
    QPEUrl: "rada/image?type=QPE",
    // !雷达获取时间列表
    radarTimeUrl: "rada/time"
  },
  // !执行事件 同步
  mutations: {

  },
  // !执行时间 异步
};