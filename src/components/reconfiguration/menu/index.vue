<template>
  <!-- eslint-disable -->
  <div class="menus_box">
    <ul class="menus_list">
      <li
        v-for="(item,index) in menuList"
        :key="index"
        class="menus_item"
        :class="{'active':item.active}"
        @click="showBg(index)"
      >
        <dl>
          <div>
            <img :src="item.img" />
          </div>
          <div>{{item.title}}</div>
        </dl>
      </li>
    </ul>

    <ul class="menus_panel" v-show="panelShow">
      <li
        v-for="(item,index) in list"
        :key="index"
        :class="{'itemActive':item.active}"
        @click="showItem(index)"
      >
        <div class="panel_title" :style="{width:width+'px'}">{{item.title}}</div>
        <span>{{item.name}}</span>
      </li>
    </ul>
  </div>
</template>
<script>
/* eslint-disable */

import "@/styles/menu.scss";
import { removeImgArray } from "@/utils/tools";

export default {
  props: {
    imgPlay: {
      type: Function,
      default: null
    }
  },
  data() {
    return {
      width: 0,
      panelShow: false,
      menuList: [
        {
          img: require("@/assets/images/menus/channel.png"),
          title: "通道图",
          active: false
        },
        {
          img: require("@/assets/images/menus/compose.png"),
          title: "合成图",
          active: false
        },
        {
          img: require("@/assets/images/menus/product.png"),
          title: "云产品",
          active: false
        }
      ],
      list: [],
      panelList: this.$store.state.menuData.list
    };
  },
  computed: { 
    nowTime() {
      return this.$store.state.timeLine.currentDayTimeList[this.$store.state.timeLine.activeIndex]
    }
  },
  watch: {
    // !监测时间轴激活时间变化
     nowTime: {
      handler(val) {
        console.log('当前时间轴时间'+val);
      },
      immediate: true
    }
  },
  mounted(){
    console.log(this.$store.state.timeLine.currentDayTimeList)
  },
  methods: {
    showBg(index) {
      if (index === 0) {
        this.width = 70;
      } else {
        this.width = 120;
      }
      this.menuList.forEach((item, index1) => {
        if (index1 !== index) {
          item.active = false;
        }
      });
      this.panelList.forEach((item, index) => {
        item.forEach((item1, index1) => {
          item1.active = false;
        });
      });
      this.list = this.panelList[index];

      if (this.menuList[index].active) {
        this.panelShow = false;
        this.menuList[index].active = false;
        this.clearImg();
      } else {
        this.panelShow = true;
        this.menuList[index].active = true;
      }
    },
    showItem(index) {
      this.list.forEach((item, index1) => {
        if (index1 !== index) {
          item.active = false;
        }
      });
      if (this.list[index].active) {
        this.list[index].active = false;
        this.clearImg();
      } else {
        this.list[index].active = true;

        // !切换参数 重新贴图
        // !获取葵花八号成像仪点击index图片数据
        this.getImageData(index, this.$store.state.system.currentAxisDate);

        // !获取葵花八号成像仪有数据的时间列表
        this.getTimeLineData(index);

        console.log(window.earth.scene.imageryLayers);
      }
    },
    // 清除当前图片
    clearImg() {
      let layer =
        window.earth.imageryLayers._layers[
          window.earth.imageryLayers._layers.length - 1
        ];
      window.earth.imageryLayers.remove(layer);
    },
    /*
      请求图片数据 
      @param index -- 点击的index  time -- 当前时间轴时间
    */
    getImageData(index, time) {
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
      console.log(this.$store.state.H8.imagerUrl +
          "/" +
          time +
          "/" +
          index +
          "/{z}/{x}/{y}")
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
      console.log('当前时间'+_currentTime);
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
        this.getImageData(index, _currentTime);
      });
    }
  }
};
</script>
