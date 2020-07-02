/* jshint esversion: 6 */
/* eslint-disable */
/* 
综合监测-葵花八号模块
*/
export default {
  // !每个文件形成独立命名空间
  namespaced: true,
  // !初始值
  state: {
    // !成像仪子菜单列表
    childrenMenuList: [
      {
        title: '通道01：0.43-0.48um RGB'
      },
      {
        title: '通道02：0.50-0.52um RGB'
      },
      {
        title: '通道03：0.63-0.66um RGB'
      },
      {
        title: '通道04：0.85-0.87um'
      },
      {
        title: '通道05：1.60-1.62um'
      },
      {
        title: '通道06：2.25-2.27um'
      },
      {
        title: '通道07：3.74-3.96um'
      },
      {
        title: '通道08：6.06-6.43um 水汽'
      },
      {
        title: '通道08：6.06-6.43um 水汽(增强)'
      },
      {
        title: '通道09：6.89-7.01um 水汽'
      },
      {
        title: '通道09：6.89-7.01um 水汽(增强)'
      },
      {
        title: '通道10：7.26-7.43um 水汽'
      },
      {
        title: '通道10：7.26-7.43um 水汽(增强)'
      },
      {
        title: '通道11：8.44-8.76um SO2'
      },
      {
        title: '通道11：8.44-8.76um SO2(增强)'
      },
      {
        title: '通道12：9.54-9.72um O3'
      },
      {
        title: '通道12：9.54-9.72um O3(增强)'
      },
      {
        title: '通道13：10.3-10.6  大气窗区'
      },
      {
        title: '通道13：10.3-10.6  大气窗区(增强)'
      },
      {
        title: '通道14：11.1-11.3  大气窗区'
      },
      {
        title: '通道14：11.1-11.3  大气窗区(增强)'
      },
      {
        title: '通道15：12.2-12.5  大气窗区'
      },
      {
        title: '通道15：12.2-12.5  大气窗区(增强)'
      },
      {
        title: '通道16：13.2-13.4 CO2'
      },
      {
        title: '通道16：13.2-13.4 CO2(增强)'
      },
      {
        title: '真彩色'
      },
      {
        title: '自然色'
      },
      {
        title: '雾/雪'
      },
      {
        title: '强风暴'
      },
      {
        title: '对流云'
      },
      {
        title: '沙尘'
      },
      {
        title: '气团'
      },
      {
        title: '火山灰'
      },
      {
        title: '白天微物理特征'
      },
      {
        title: '夜间微物理特征'
      },
      {
        title: '白天对流风暴'
      }
    ],
    // !成像仪是否开启默认激活子菜单
    showDefault: true,
    // !成像仪默认激活的子菜单index
    defaultIndex: 11,
    // !成像仪获取切图接口地址 http://192.168.1.2:8301/convection/api/himawari/{time}/{type}/{z}/{x}/{y}
    imagerUrl: "http://192.168.1.2:8301/convection/api/himawari",
    // !葵花获取当天有数据的时间列表
    H8TimeUrl: "himawari/time"
  },
  // !执行事件 同步
  mutations: {
  },
  // !执行时间 异步
};
