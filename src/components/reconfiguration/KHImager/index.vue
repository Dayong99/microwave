<template>
  <!-- eslint-disable -->
  <!-- 成像仪对应的三级菜单 -->
  <div class="right-container KFeight">
    <ul class="right-wrap" style="width: 238px;">
      <li
        v-for="(item,index) in childrenMenuList"
        :key="index"
        class="right-menu"
        :class="{'menuBg':clicked == index || index == 11 && showDefault}"
        @click="getMenu(index, item.title)"
        style="width: 220px;"
      >
        <span class="menuCont" style="width:224px;">{{ item.title }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
/* eslint-disable */
import { removeImgArray } from "@/utils/tools";
export default {
  props: {
    imgPlay: {
      type: Function,
      default: null
    }
  },
  computed: {},
  watch: {},
  data() {
    return {
      // !成像仪是否开启默认激活子菜单
      showDefault: this.$store.state.H8.showDefault,
      // !风云四号成像仪子菜单
      childrenMenuList: this.$store.state.H8.childrenMenuList,
      // 当前激活的index
      clicked: -1,
      // !成像仪默认激活的子菜单index
      defaultIndex: this.$store.state.H8.defaultIndex
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
      // !如果当前是葵花成像仪模块 请求数据
      if (this.$store.state.system.currentModuleFlag == 6) {
        console.log(val);
        this.getKHImagerData(this.clicked, val);
      }
    }
  },
  methods: {
    imgPlayOn(countIndex) {
      if (this.imgPlay) {
        // 6代表葵花
        this.imgPlay(countIndex, 6);
      }
    },
    getMenu(index, con) {
      // console.log(index, con, "index");
      // !切换高亮index
      this.clicked = index;
      // !取消默认值显示
      this.showDefault = false;
      // 将点击的参数传递出去
      this.imgPlayOn(index);

      this.$store.commit("system/setCurrentModuleFlag", 6);
      // !切换参数 重新贴图
      // !获取葵花八号成像仪点击index图片数据
      this.getKHImagerData(index, this.$store.state.system.currentAxisDate);

      // !获取葵花八号成像仪有数据的时间列表
      this.getTimeLineData(index);
    },
    /*
      请求图片数据 
      @param index -- 点击的index  time -- 当前时间轴时间
    */
    getKHImagerData(index, time) {
      console.log("葵花", index, time);
      // !风云四成像仪前端切图展示
      const image = new Cesium.UrlTemplateImageryProvider({
        url:
          this.$store.state.H8.imagerUrl +
          "/" +
          time +
          "/" +
          index +
          "/{z}/{x}/{y}",
        tilingScheme: new Cesium.GeographicTilingScheme(),
        credit: ""
      });
      window.earth.scene.imageryLayers.addImageryProvider(image);
      // !当前加载的图层
      console.log(window.earth.scene.imageryLayers);
      // !当前图层层数
      console.log("当前图层层数" + window.earth.imageryLayers._layers.length);
      // !如果图层层数大于4删除
      removeImgArray(4);
    },
    // !获取当天有数据的时间列表
    getTimeLineData(index) {
      const _currentTime = this.$moment().format("YYYY-MM-DD HH:mm:ss");
      console.log(_currentTime);
      // !葵花八号请求时间列表
      this.$get(this.$store.state.H8.H8TimeUrl, {
        time: _currentTime
      }).then(res => {
        console.log(res);
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
        // ! 请求图片贴图
        this.getKHImagerData(index, _currentTime);
      });
    }
  }
};
</script>

<style scoped>
</style>
