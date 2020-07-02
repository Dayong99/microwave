<template>
  <!-- eslint-disable -->
  <!-- 成像仪对应的三级菜单 -->
  <div class="right-container">
    <ul class="right-wrap" style="width: 238px;">
      <li
        v-for="(item,index) in childrenMenuList"
        :key="index"
        class="right-menu"
        :class="{'menuBg':clicked == index || index == defaultIndex && showDefault}"
        @click="getMenu(index, item.title)"
      >
        <span class="menuCont" style="width:224px;">{{ item.title }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
/* eslint-disable */
import { removeImgArray, deleteImageLayers } from "@/utils/tools";
export default {
  data() {
    return {
      defaultIndex: this.$store.state.FY4.defaultIndex,
      clicked: 11,
      showDefault: this.$store.state.FY4.showDefault,
      childrenMenuList: this.$store.state.FY4.imageMakerMenuList
    };
  },
  computed: {
    // !监测时间轴激活时间变化
    currentTimeValue() {}
  },
  watch: {
    // !监测时间轴激活时间变化
    /* currentTimeValue(val) {
      console.log(val)
      console.log('状态管理器flag', this.$store.state.system.currentModuleFlag)
      // !如果当前是风云四号成像仪模块 请求数据
      if (this.$store.state.system.currentModuleFlag == 1) {
        console.log(val)
        const start = 5,end = 244
        this.getFYImagerData(this.clicked, val, start, end)
      }
    } */
  },
  mounted() {
    // !获取风云四号成像仪十二通道卫星贴图 请求有数据的时间列表
    /* this.getTimeLineData(0) */
  },
  methods: {
    // !点击的FY4成像仪菜单index
    getMenu(index, title) {
      const _ = this;
      _.$store.commit("titleAndParameter/setTitle_text", title); // 标题
      _.clicked = index; // 高亮
      _.showDefault = false; // 取消默认高亮
      const requestIndex = "";
      if (index < 9) {
        requestIndex = index;
      }
    },

    // !请求有数据的时间段
    getTimeLineData(index) {
      console.log("getTimeLineData -> index", index);
      const _currentTime = this.$moment().format("YYYY-MM-DD HH:mm:ss");
      console.log(_currentTime);
      // !成像仪请求时间列表
      this.$get(this.$store.state.FY4.imagerTimeUrl, {
        time: _currentTime
      }).then(res => {
        // !时间列表去T
        const _currentDayTimeList = res.data.data.map(i => {
          return i.replace("T", " ");
          console.log(
            "getTimeLineData -> _currentDayTimeList",
            _currentDayTimeList
          );
        });
        console.log(
          "getTimeLineData -> _currentDayTimeList",
          _currentDayTimeList
        );
        const _activeIndex = _currentDayTimeList.length - 1;
        // !将风云四号成像仪的时间列表传给时间轴显示
        this.$store.commit(
          "timeLine/setCurrentDayTimeList",
          _currentDayTimeList
        );
        // !将风云四号成像仪当前激活的时间点传给时间轴
        this.$store.commit("timeLine/setActiveIndex", _activeIndex);
        // !请求图片的时间
        const _currentTime = _currentDayTimeList[_activeIndex];
        // ! 请求图片贴图
        const start = 5,
          end = 244;
        this.getFYImagerData(index, _currentTime, start, end);
      });
    },
    /*
      请求图片数据
      @param index -- 点击的index  time -- 当前时间轴时间
    */
    getFYImagerData(index, time, start, end) {
      // !风云四成像仪前端切图展示
      const image = new Cesium.UrlTemplateImageryProvider({
        url:
          this.$store.state.FY4.imagerUrl +
          "/" +
          time +
          "/" +
          index +
          "/0/" +
          start +
          "/" +
          end +
          "/{z}/{x}/{y}",
        // !引用了简单的 GeographicProjection 的几何图形平铺方案，其中经度和纬度直接映射到X和Y。这种投影通常是被称为地理，等矩形，等距圆柱或板状
        tilingScheme: new Cesium.GeographicTilingScheme(),
        credit: ""
      });
      window.earth.scene.imageryLayers.addImageryProvider(image);
      // !当前加载的图层 当前图层层数
      // !如果图层层数大于4删除
      removeImgArray(4);
    }
  }
};
</script>
<style scoped>
</style>
