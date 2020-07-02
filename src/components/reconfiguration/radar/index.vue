
<template>
  <!-- eslint-disable -->
  <!-- 探测仪对应的三级菜单 -->
  <div class="right-container FY-detector" style="left: 115px;">
    <ul class="right-wrap" style="width: 176px;">
      <li class="right-menu">
        <span class="menuCont">组合反射率因子</span>
      </li>
      <li class="right-menu">
        <span class="menuCont">CAPPI</span>
      </li>
      <li class="right-menu">
        <span class="menuCont">回波顶高</span>
      </li>
      <li class="right-menu">
        <span class="menuCont">雷达估测降水量(30min)</span>
      </li>
      <li class="right-menu">
        <span class="menuCont">雷达估测降水量(1h)</span>
      </li>
    </ul>
  </div>
</template>

<script>
/* eslint-disable */
import $ from "jquery";
import "@/styles/leftMenuTab.scss";
/* import radar from "./mixin/radar"; */

// !工具函数
import { deleteImageLayers, removeImgArray, getCodeImage } from "@/utils/tools";
export default {
  data() {
    return {
      // !雷达列表数据
      radarMenuList: this.$store.state.radar.radarMenuList,
      // !当前高亮的index
      clicked: -1
    };
  },
  computed: {
    // !监测时间轴激活时间变化
    currentTimeValue() {
      return this.$store.state.timeLine.currentDayTimeList[
        this.$store.state.timeLine.activeIndex
      ];
    }
  },
  watch: {
    // !监测时间轴激活时间变化
    currentTimeValue(val) {
      console.log(val);
      console.log("状态管理器flag", this.$store.state.system.currentModuleFlag);
      // !如果当前是风云四号成像仪模块 请求数据
      if (
        this.$store.state.system.currentModuleFlag == 7 &&
        this.clicked < 21
      ) {
        console.log("雷达组合反射率", val);
        // this.getFYImagerData(this.clicked,val)
        // !雷达组合反射率画图
        this.getCombinedReflectivityImg(this.clicked, val);
      } else if (
        this.$store.state.system.currentModuleFlag == 7 &&
        this.clicked == 20
      ) {
        // !雷达QPE画图
        this.getRadarQPE(this.clicked, val);
      }
    }
  },
  /* mixins: [radar], */
  props: {
    imgPlay: {
      type: Function,
      default: null
    }
  },

  mounted() {
    this.$nextTick(() => {
      $(".txt-tab").click(function() {
        $(this)
          .parent()
          .find(".txt-tab")
          .removeClass("active");
        $(this).addClass("active");
      });
    });
  },
  methods: {
    imgPlayOn(countIndex, type) {
      // !countIndex 点击的index type 点击的模块
      if (this.imgPlay) {
        this.imgPlay(countIndex, 7);
      }
    },
    // !获取点击的菜单列表信息
    getMenu(index, item) {
      console.log(index);
      // !选取的组合反射率高度 0-20为组合反射率 21 22 为QPE
      // console.log(index, item.datatype);
      // !切换高亮index
      this.clicked = index;
      // todo 将值传给父组件
      this.imgPlayOn(index, item.datatype);
      // !判断点击的是雷达组合反射率还是降水估计
      if (index < 21) {
        // !获取雷达组合反射率图片数据
        this.getCombinedReflectivityImg(
          index,
          this.$store.state.system.currentAxisDate
        );
      } else {
        // !index21 QPE 30 index22 QPE 60
        // !获取雷达降水估计图片数据
        this.getRadarQPE(index, this.$store.state.system.currentAxisDate);
      }
      // !改变状态管理器flag
      this.$store.commit("system/setCurrentModuleFlag", 7);
      // !雷达时间列表请求
      this.getTimeLineData(index);
    },
    // !获取雷达降水估计数据
    getRadarQPE(index, date) {
      deleteImageLayers(1);
      console.log("雷达降水估计:" + index);
      const array = [30, 60];
      // !请求接口地址
      const URL =
        this.$store.state.radar.QPEUrl + array[index - 21] + "&time=" + date;
      console.log(URL);
      getCodeImage(URL, "arraybuffer").then(res => {
        this.drawQPEMap(res);
      });
    },
    // !获取雷达组合反射率图片数据
    getCombinedReflectivityImg(index, date) {
      console.log("雷达组合反射率:" + index);
      // !保留的图层数量
      deleteImageLayers(1);
      // !请求接口地址
      const URL =
        this.$store.state.radar.combineUrl + "?" + date + "&type=" + index;
      getCodeImage(URL, "arraybuffer").then(res => {
        this.drawQPEMap(res);
      });
    },
    // !绘制前端贴图
    drawQPEMap(resUrl) {
      // console.log(resUrl)
      // !清除所有实体
      window.earth.entities.removeAll();
      // !如果没有图片直接返回
      if (!resUrl) return;
      // !贴图
      var imageryProvider = new Cesium.SingleTileImageryProvider({
        // !图片url
        url: resUrl,
        // !显示区域
        // rectangle: new Cesium.Rectangle.fromDegrees(70, 5, 140, 54)
        // 根据经纬度贴图
        rectangle: new Cesium.Rectangle.fromDegrees(114.0, 29.0, 123.0, 36.0)
      });
      window.earth.scene.imageryLayers.addImageryProvider(imageryProvider);
      console.log("当前图层层数" + window.earth.imageryLayers._layers.length);
    },
    // !获取雷达时间列表
    getTimeLineData(index) {
      // !根据点击的index不同请求不同的数据
      let _index = 0;
      if (index < 21) {
        _index = index;
      } else if (index == 21) {
        _index = "QPE30";
      } else if (index == 22) {
        _index = "QPE60";
      }
      console.log(_index);
      const _currentTime = this.$moment().format("YYYY-MM-DD HH:mm:ss");
      // !雷达请求时间列表
      this.$get(this.$store.state.radar.radarTimeUrl, {
        time: _currentTime,
        type: _index
      }).then(res => {
        console.log(res);
        // !时间列表去T
        const _currentDayTimeList = res.data.data.map(i => {
          return i.replace("T", " ");
        });
        console.log(_currentDayTimeList);
        const _activeIndex = _currentDayTimeList.length - 1;
        // !将风云四号成像仪的时间列表传给时间轴显示
        this.$store.commit(
          "timeLine/setCurrentDayTimeList",
          _currentDayTimeList
        );
        // !将风云四号成像仪当前激活的时间点传给时间轴
        this.$store.commit("timeLine/setActiveIndex", _activeIndex);
      });
    }
  }
};
</script>

<style scoped>
</style>