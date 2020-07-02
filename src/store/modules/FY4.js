/* eslint-disable */
/* jshint esversion: 6 */
/* 
综合监测-风云四号模块
*/
export default {
  // !每个文件形成独立命名空间
  namespaced: true,
  // !初始值
  state: {
    // !成像仪子菜单列表
    imageMakerMenuList: [
      {
        title: '通道01：0.47um可见光'
      },
      {
        title: '通道02：0.65um可见光'
      },
      {
        title: '通道03：0.83um近红外'
      },
      {
        title: '通道04：0.37um短波红外'
      },
      {
        title: '通道05：1.61um短波红外'
      },
      {
        title: '通道06：2.22um短波红外'
      },
      {
        title: '通道07：3.72um中波红外 | 高'
      },
      {
        title: '通道08：3.72um中波红外 | 低'
      },
      {
        title: '通道09：6.25um高层水汽'
      },
      {
        title: '通道09：6.25um高层水汽(增强)'
      },
      {
        title: '通道10：9.1um中层水汽'
      },
      {
        title: '通道10：9.1um中层水汽(增强)'
      },
      {
        title: '通道11：8.5um长波红外'
      },
      {
        title: '通道11：8.5um长波红外(增强)'
      },
      {
        title: '通道12：10.8um长波红外'
      },
      {
        title: '通道12：10.8um长波红外(增强)'
      },
      {
        title: '通道13：12um长波红外'
      },
      {
        title: '通道13：12um长波红外(增强)'
      },
      {
        title: '通道14：13.5um长波红外'
      },
      {
        title: '通道14：13.5um长波红外(增强)'
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
        title: '白天微物理特征'
      },
      {
        title: '沙尘'
      },
      {
        title: '强风暴'
      },
      {
        title: '气团'
      },
      {
        title: '火山灰'
      },
      {
        title: '对流云'
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
    // !成像仪获取切图接口地址 http://192.168.1.2:8301/convection/api/fypacket/{time}/{type}/{z}/{x}/{y}
    imagerUrl: "http://192.168.1.2:8301/convection/api/fypacket",
    // !风云四号成像仪当天时间列表
    imagerTimeUrl: "/fypacket/show",
    // !探测仪子菜单列表
    detectorMenuList: [
      {
        title: "任意点选择",
        datatype: "V",
        show: false
      },
      {
        title: "对比选择",
        datatype: "V",
        show: false
      },
      {
        title: "大气垂直温度探测 (500hpa)",
        datatype: "2D",
        show: true
      },
      {
        title: "大气垂直温度探测 (700hpa)",
        datatype: "2D",
        show: true
      },
      {
        title: "大气垂直温度探测 (850hpa)",
        datatype: "2D",
        show: true
      },
      {
        title: "大气垂直温度探测 (1000hpa)",
        datatype: "2D",
        show: true
      },
      {
        title: "大气垂直温度探测 (500hpa)",
        datatype: "3D",
        show: false
      },
      {
        title: "大气垂直温度探测 (700hpa)",
        datatype: "3D",
        show: false
      },
      {
        title: "大气垂直温度探测 (850hpa)",
        datatype: "3D",
        show: false
      },
      {
        title: "大气垂直温度探测 (1000hpa)",
        datatype: "3D",
        show: false
      },
      {
        title: "所有高度层数据",
        datatype: "2D",
        show: true
      }

    ],
    // !探测仪2D数据请求接口地址  http://192.168.1.2:8301/convection/api/fyprobe/data
    fyProbe2DUrl: "fyprobe/data",
    // !探测仪气压层级列表 http://192.168.1.2:8301/convection/api/fyprobe/ratio?time=2020-02-04%2004:00:00&lon=98.33448&lat=52.334446&type=%E6%8E%A2%E7%A9%BA
    fyProbeRatioList: "fyprobe/ratio",
    // !探测仪鼠标点击的位置
    fyProbeMouseLeftClickPosition: [],
    // !风云四号探测仪当天时间列表
    fyProbeTimeUrl: "/fyprobe/time",
    // !闪电仪子菜单列表
    lightingMenuList: [
      {
        title: '10分钟',
        datatype: 'flash',
        show: true
      },
      {
        title: '1小时',
        datatype: 'flash',
        show: true
      },
      {
        title: '6小时',
        datatype: 'flash',
        show: true
      },
      {
        title: '24小时',
        datatype: 'flash',
        show: true
      },
      {
        title: '10分钟',
        datatype: 'ground',
        show: false
      },
      {
        title: '1小时',
        datatype: 'ground',
        show: false
      },
      {
        title: '6小时',
        datatype: 'ground',
        show: false
      },
      {
        title: '24小时',
        datatype: 'ground',
        show: false
      }
    ],
    // !闪电仪时间列表
    lightingTimeUrl: "fylighting/time",
  },
  // !执行事件 同步
  mutations: {
    // !获取探测仪鼠标左键点击的位置
    setFyProbeMouseLeftClickPosition(state, val) {
      console.log(val);
      state.fyProbeMouseLeftClickPosition = val;
    },
  },
  // !执行时间 异步
};
