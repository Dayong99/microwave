/* jshint esversion: 6 */
/* eslint-disable */
/* 
界面-地球
*/
export default {
  // !每个文件形成独立命名空间
  namespaced: true,
  // !初始值
  state: {
    // !cesium参数
    baseViewer: {
      // !地球表面覆盖 彩色
      /* imageryProvider: new Cesium.ArcGisMapServerImageryProvider({
        url: 'http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer/'
      }), */
      // !地球表面覆盖 蓝色
      imageryProvider: new Cesium.UrlTemplateImageryProvider({
        url: 'http://192.168.1.2:8301/map/server/GeoQ_purplishBlue/{z}/{y}/{x}',
        credit: '',
        minimumLevel: 0
      }),
      // !选择框显示
      selectionIndicator: true,
      // 是否创建动画小器件，左下角仪表
      animation: false,
      // 是否显示时间轴
      timeline: false,
      // 是否显示3D/2D选择器
      sceneModePicker: false,
      // 是否显示图层选择器
      baseLayerPicker: false,
      // 是否显示geocoder小器件，右上角查询按钮
      geocoder: false,
      // 如果设置为true，则所有几何图形以3D模式绘制以节约GPU资源
      scene3DOnly: false,
      // 是否显示右上角的帮助按钮
      navigationHelpButton: false,
      // 是否显示Home按钮
      homeButton: false,
      // 是否显示信息框
      infoBox: false,
      // 如果设为true，将在一个HTML面板中显示错误信息
      showRenderLoopErrors: false,
      // 传递给Scene对象的上下文参数（scene.options）
      contextOptions: {
        webgl: {
          preserveDrawingBuffer: true,
          alpha: true
        }
      },
      orderIndependentTranslucency: false,
      // 描述地图如何在2D模式下运行
      mapMode2D: Cesium.MapMode2D.ROTATE
    },
    // !信息框距离左边 px
    infoLeft: "50%",
    // !信息框距离上边 px
    infoTop: "50%"
  },
  // !执行事件 同步
  mutations: {
    setInfoLeft(state, val) {
      console.log(val);
      state.infoLeft = val;
    },
    setInfoTop(state, val) {
      console.log(val);
      state.infoTop = val;
    }
  },
  // !执行时间 异步
};
