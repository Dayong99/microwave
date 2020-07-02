
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-mixed-spaces-and-tabs */
<template>
  <!-- eslint-disable -->
  <!-- 探测仪对应的三级菜单 -->
  <div class="right-container FY-detector" style="left: 115px;">
    <ul class="right-wrap" style="width: 176px;">
      <li class="right-menu">
        <span class="menuCont">大气垂直温度探测(2D)</span>
      </li>
      <li class="right-menu">
        <span class="menuCont">大气垂直温度探测(3D)</span>
      </li>
    </ul>
  </div>
</template>

<script>
/* eslint-disable */
import {
  getCodeImage,
  drawMap,
  removeImgArray,
  clearChannel,
  clearStation
} from "@/utils/requestImg";
import axios from "@/utils/axioz";
// !工具函数
import { deleteImageLayers } from "@/utils/tools";
import "@/styles/leftMenuTab.scss";

export default {
  data() {
    return {
      is2DlistShow: false,
      clicked: -1,
      showDataType: "2D",
      // !探测仪子菜单列表
      detectorList: this.$store.state.FY4.detectorMenuList,
      // !探测仪有数据的气压值
      pressureList: [],
      // !点击的经纬度 第一个经度 第二个纬度
      leftClickPosition: [],
      // !当前点击的列表中的气压值
      pressureValue: 0
    };
  },
  props: {
    imgPlay: {
      type: Function,
      default: null
    }
  },
  watch: {
    // !监测时间轴激活时间变化
    currentTimeValue(val) {
      // !如果当前是风云四号成像仪模块 请求数据
      if (this.$store.state.system.currentModuleFlag == 2) {
        console.log("点击的探测仪2");
      }
    }
  },
  computed: {
    // !监测时间轴激活时间变化
    currentTimeValue() {
      return this.$store.state.timeLine.currentDayTimeList[
        this.$store.state.timeLine.activeIndex
      ];
    }
  },
  filters: {
    reservedDecimal(number) {
      return parseFloat(number).toFixed(2);
    }
  },
  mounted() {
    // !取当天所有气压层级
    this.getRatioList();
    // !获取鼠标点击经纬度事件
    this.getLeftClickMouseEvent();
  },
  methods: {
    // !获取当天所有气压层级
    getRatioList() {
      this.$get(this.$store.state.FY4.fyProbeRatioList, {
        time: "2020-02-04 04:00:00",
        type: "探空",
        lon: 98.33448,
        lat: 52.334446
      }).then(res => {
        // !探测仪有数据的气压值
        this.pressureList = res.data.data.FY.PRESSURE;
        console.log(this.pressureList);
      });
    },
    imgPlayOn(countIndex) {
      if (this.imgPlay) {
        //  todo 1代表风云四号成像仪 待修改
        this.imgPlay(countIndex, 2);
        this.$store.commit("system/setCurrentModuleFlag", 2);
      }
    },
    getMenu(index, con) {
      console.log(index, con, "index");
      // !点击的为所有高度探测
      if (index == 10) {
        console.log("所有高度探测");
        this.is2DlistShow = !this.is2DlistShow;
      }
      //默认选中1000hpa
      if (index == 0) {
        console.log("任意点");
        this.$store.commit("Charts/setIsEchartsProbeSingleShow", true);
      }
      if (index >= 2 && index <= 5) {
        console.log("点击探测仪2D");
        // !根据选择的气压值 计算气压列表中与之最接近的气压值
        this.pressureValue = this.getPresssureValue(index);
        console.log(this.pressureValue);
        // !获取2D数据
        this.getDetectorData(this.pressureValue);
      } else if (index >= 6 && index <= 9) {
        console.log("点击探测仪3D");
        // !根据选择的气压值 计算气压列表中与之最接近的气压值
        const index1 = index - 3;
        this.pressureValue = this.getPresssureValue(index - 3);
        // !获取3D数据
        this.getDetectorData3D(this.pressureValue);
      }
      this.clicked = index;
      this.imgPlayOn(index);

      // console.log(index, con, "index");
      // this.clicked = index;
      // this.imgPlayOn(index);
      // // !改变状态管理器flag
      // this.$store.commit("system/setCurrentModuleFlag", 1)
      // !获取探测仪当天有数据的时间点
      this.getTimeLineData(index);
    },
    // !探测仪2D数据获取
    getDetectorData(pressureValue) {
      // !删除其他模块图层
      deleteImageLayers(1);
      // !删除填值以及其他数据
      clearStation();
      clearChannel();
      // !删除window.earth.scene.primitives.removeAll();
      window.earth.scene.primitives.removeAll();
      // !根据不同值区间 赋予不同颜色
      this.$get(this.$store.state.FY4.fyProbe2DUrl, {
        time: "2020-02-04 04:00:00",
        pressure: pressureValue
      }).then(res => {
        let data = [];
        data = res.data.data;
        let pointlist = new Cesium.PointPrimitiveCollection(); // 1
        data.forEach(i => {
          if (i.data > 330) {
            // console.log("300");
            pointlist.add({
              // 1 pointlist   2 points
              pixelSize: 6,
              position: new Cesium.Cartesian3.fromDegrees(i.lon, i.lat),
              color: new Cesium.Color(179 / 255, 33 / 255, 36 / 255, 1)
            });
          } else if (i.data > 310 && i.data <= 330) {
            // console.log("310-330");
            pointlist.add({
              // 1 pointlist   2 points
              pixelSize: 10,
              position: new Cesium.Cartesian3.fromDegrees(i.lon, i.lat),
              // color: new Cesium.Color(206 / 255, 24 / 255, 52 / 255, 1)
              color: new Cesium.Color(0.8, 0.09, 0.2, 1)
            });
          } else if (i.data > 290 && i.data <= 310) {
            // console.log("290-310");
            pointlist.add({
              // 1 pointlist   2 points
              pixelSize: 10,
              position: new Cesium.Cartesian3.fromDegrees(i.lon, i.lat),
              color: new Cesium.Color(0.9, 0.34, 0.15, 1)
            });
          } else if (i.data > 270 && i.data <= 290) {
            // console.log("270-290");
            pointlist.add({
              // 1 pointlist   2 points
              pixelSize: 10,
              position: new Cesium.Cartesian3.fromDegrees(i.lon, i.lat),
              color: new Cesium.Color(0.92, 0.91, 0.047, 1)
            });
          } else if (i.data > 250 && i.data <= 270) {
            // console.log("250-270");
            pointlist.add({
              // 1 pointlist   2 points
              pixelSize: 10,
              position: new Cesium.Cartesian3.fromDegrees(i.lon, i.lat),
              color: new Cesium.Color(0.34, 0.96, 0.46, 1)
            });
          } else if (i.data > 230 && i.data <= 250) {
            // console.log("230-250");
            pointlist.add({
              // 1 pointlist   2 points
              pixelSize: 10,
              position: new Cesium.Cartesian3.fromDegrees(i.lon, i.lat),
              color: new Cesium.Color(0, 0.65, 0.81, 1)
            });
          } else if (i.data > 210 && i.data <= 230) {
            // console.log("210-230");
            pointlist.add({
              // 1 pointlist   2 points
              pixelSize: 10,
              position: new Cesium.Cartesian3.fromDegrees(i.lon, i.lat),
              color: new Cesium.Color(0.02, 0.004, 0.99, 1)
            });
          } else if (i.data > 190 && i.data <= 210) {
            // console.log("190-210");
            pointlist.add({
              // 1 pointlist   2 points
              pixelSize: 10,
              position: new Cesium.Cartesian3.fromDegrees(i.lon, i.lat),
              color: new Cesium.Color(0.28, 0.15, 0.98, 1)
            });
          }
          // else if (i.data <= 190) {
          //   console.log("190");
          //   pointlist.add({
          //     // 1 pointlist   2 points
          //     pixelSize: 10,
          //     position: new Cesium.Cartesian3.fromDegrees(i.lon, i.lat),
          //     color: new Cesium.Color(108 / 255, 4 / 255, 244 / 255, 1)
          //   });
          // }
        });
        window.earth.scene.primitives.add(pointlist); // 1
        // console.log(data)
      });
    },
    // !根据点击的气压列表值 返回列表中最接近的一个气压值
    getPresssureValue(index) {
      //  3456 500 700 850 1000
      const arrayList = [500, 700, 850, 1000];
      const a = this.pressureList;
      // !选择的气压值
      // console.log(arrayList[index - 3]);
      // !将选择的气压值放到气压列表中
      var newArr = [];
      a.map(function(x) {
        //! 对数组各个数值求差值
        newArr.push(Math.abs(x - arrayList[index - 3]));
      });
      // !求最小值的索引
      var index = newArr.indexOf(Math.min.apply(null, newArr));
      // console.log(a[index])
      return a[index];
    },
    // !获取鼠标点击事件
    getLeftClickMouseEvent() {
      const ellipsoid = window.earth.scene.globe.ellipsoid;
      new Cesium.ScreenSpaceEventHandler(
        window.earth.scene.canvas
      ).setInputAction(evt => {
        console.log(evt);
        // console.log(event)
        // // !捕获椭球体，将笛卡尔二维平面坐标转为椭球体的笛卡尔三维坐标，返回球体表面的点
        // const cartesian = window.earth.camera.pickEllipsoid(
        //   movement.position,
        //   ellipsoid
        // );
        // if (cartesian) {
        //   // !将笛卡尔三维坐标转为地图坐标（弧度）
        //   const cartographic = ellipsoid.cartesianToCartographic(cartesian);
        //   // !将地图坐标（弧度）转为十进制的度数
        //   const lat_String = Cesium.Math.toDegrees(
        //     cartographic.latitude
        //   ).toFixed(4);
        //   const log_String = Cesium.Math.toDegrees(
        //     cartographic.longitude
        //   ).toFixed(4);
        //   // !点击的经度
        //   this.leftClickPosition[0] = log_String;
        //   // !点击的纬度
        //   this.leftClickPosition[1] = lat_String;
        //   console.log("经度:", this.leftClickPosition[1]);
        //   console.log("纬度:", this.leftClickPosition[1]);
        //   this.$store.commit(
        //     "FY4/setFyProbeMouseLeftClickPosition",
        //     this.leftClickPosition
        //   );
        //   // console.log(window.earth._selectedEntity)
        //   // !点击的地球位置距离左边的距离
        //   console.log(movement.position.x);
        //   // !点击的地球位置距离顶部的距离
        //   console.log(movement.position.y);
        //   // !设置弹出信息框的位置
        //   // this.$store.commit(
        //   //   "earth/setInfoLeft",
        //   //   movement.position.x - 70 + "px"
        //   // );
        //   // this.$store.commit(
        //   //   "earth/setInfoTop",
        //   //   movement.position.y - 50 + "px"
        //   // );
        //   this.$store.commit("earth/setInfoLeft", movement.position.x + "px");
        //   this.$store.commit("earth/setInfoTop", movement.position.y + "px");
        //   // !请求数据
        //   // this.$get(this.$store.state.FY4.fyProbe2DUrl, {
        //   //   time: "2020-02-04 04:00:00",
        //   //   pressure: this.pressureValue
        //   // }).then(res => {
        //   //   console.log(res);
        //   // });
        // }
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    },
    // !3D
    getDetectorData3D(pressureValue) {
      // !删除其他模块图层
      deleteImageLayers(1);
      // !删除填值以及其他数据
      clearStation();
      clearChannel();
      // !删除window.earth.scene.primitives.removeAll();
      // window.earth.scene.primitives.removeAll();
      // !根据不同值区间 赋予不同颜色
      this.$get(this.$store.state.FY4.fyProbe2DUrl, {
        time: "2020-02-04 04:00:00",
        pressure: pressureValue
      }).then(res => {
        let highValue = 0;
        if (pressureValue < 1100 && pressureValue > 900) {
          highValue = 0;
        } else if (pressureValue < 900 && pressureValue > 800) {
          highValue = 1400;
        } else if (pressureValue < 800 && pressureValue > 650) {
          highValue = 3000;
        } else if (pressureValue < 600 && pressureValue > 450) {
          highValue = 5400;
        }
        console.log(highValue);
        let data = [];
        data = res.data.data;
        let pointlist = new Cesium.PointPrimitiveCollection(); // 1
        data.forEach(i => {
          if (i.data > 330) {
            // console.log("300");
            pointlist.add({
              // 1 pointlist   2 points
              pixelSize: 6,
              position: new Cesium.Cartesian3.fromDegrees(
                i.lon,
                i.lat,
                highValue * 5000
              ),
              color: new Cesium.Color(179 / 255, 33 / 255, 36 / 255, 1)
            });
          } else if (i.data > 310 && i.data <= 330) {
            // console.log("310-330");
            pointlist.add({
              // 1 pointlist   2 points
              pixelSize: 10,
              position: new Cesium.Cartesian3.fromDegrees(
                i.lon,
                i.lat,
                highValue * 5000
              ),
              // color: new Cesium.Color(206 / 255, 24 / 255, 52 / 255, 1)
              color: new Cesium.Color(0.8, 0.09, 0.2, 1)
            });
          } else if (i.data > 290 && i.data <= 310) {
            // console.log("290-310");
            pointlist.add({
              // 1 pointlist   2 points
              pixelSize: 10,
              position: new Cesium.Cartesian3.fromDegrees(
                i.lon,
                i.lat,
                highValue * 5000
              ),
              color: new Cesium.Color(0.9, 0.34, 0.15, 1)
            });
          } else if (i.data > 270 && i.data <= 290) {
            // console.log("270-290");
            pointlist.add({
              // 1 pointlist   2 points
              pixelSize: 10,
              position: new Cesium.Cartesian3.fromDegrees(
                i.lon,
                i.lat,
                highValue * 5000
              ),
              color: new Cesium.Color(0.92, 0.91, 0.047, 1)
            });
          } else if (i.data > 250 && i.data <= 270) {
            // console.log("250-270");
            pointlist.add({
              // 1 pointlist   2 points
              pixelSize: 10,
              position: new Cesium.Cartesian3.fromDegrees(
                i.lon,
                i.lat,
                highValue * 5000
              ),
              color: new Cesium.Color(0.34, 0.96, 0.46, 1)
            });
          } else if (i.data > 230 && i.data <= 250) {
            // console.log("230-250");
            pointlist.add({
              // 1 pointlist   2 points
              pixelSize: 10,
              position: new Cesium.Cartesian3.fromDegrees(
                i.lon,
                i.lat,
                highValue * 5000
              ),
              color: new Cesium.Color(0, 0.65, 0.81, 1)
            });
          } else if (i.data > 210 && i.data <= 230) {
            // console.log("210-230");
            pointlist.add({
              // 1 pointlist   2 points
              pixelSize: 10,
              position: new Cesium.Cartesian3.fromDegrees(
                i.lon,
                i.lat,
                highValue * 5000
              ),
              color: new Cesium.Color(0.02, 0.004, 0.99, 1)
            });
          } else if (i.data > 190 && i.data <= 210) {
            // console.log("190-210");
            pointlist.add({
              // 1 pointlist   2 points
              pixelSize: 10,
              position: new Cesium.Cartesian3.fromDegrees(
                i.lon,
                i.lat,
                highValue * 5000
              ),
              color: new Cesium.Color(0.28, 0.15, 0.98, 1)
            });
          }
          // else if (i.data <= 190) {
          //   console.log("190");
          //   pointlist.add({
          //     // 1 pointlist   2 points
          //     pixelSize: 10,
          //     position: new Cesium.Cartesian3.fromDegrees(i.lon, i.lat),
          //     color: new Cesium.Color(108 / 255, 4 / 255, 244 / 255, 1)
          //   });
          // }
        });
        window.earth.scene.primitives.add(pointlist); // 1
        // console.log(data)
      });
    },
    // !获取当天有数据的时间列表
    getTimeLineData(index) {
      const _currentTime = this.$moment().format("YYYY-MM-DD HH:mm:ss");
      console.log(_currentTime);
      // !成像仪请求时间列表
      this.$get(this.$store.state.FY4.fyProbeTimeUrl, {
        time: _currentTime
      }).then(res => {
        console.log(res.data.data);
        // !时间列表去T
        const _currentDayTimeList = res.data.data.map(i => {
          return i.replace("T", " ");
        });
        console.log(_currentDayTimeList);
        const _activeIndex = _currentDayTimeList.length - 1;
        // !将风云四号探测仪的时间列表传给时间轴显示
        this.$store.commit(
          "timeLine/setCurrentDayTimeList",
          _currentDayTimeList
        );
        // !将风云四号探测仪当前激活的时间点传给时间轴
        this.$store.commit("timeLine/setActiveIndex", _activeIndex);
        // !请求图片的时间
        const _currentTime = _currentDayTimeList[_activeIndex];
      });
    }
  }
};
</script>