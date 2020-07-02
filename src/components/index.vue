<template>
  <!-- eslint-disable -->
  <div id="app">
    <earth></earth>
    <time-line />
    <parameter-heading></parameter-heading>

    <longitude-latitude></longitude-latitude>
    <logo-global />
    <menus />
    <alerted ref="alt" />
    <layer-manager />
    <parameter-display />
    <interface-toolbar />
  </div>
</template>

<script>
/* eslint-disable */

import Menus from "@/components/reconfiguration/menu/index.vue";
import Alerted from "@/components/reconfiguration/warningPrediction";
import interfaceToolbar from "@/components/reconfiguration/interfaceToolbar/index.vue";
import LogoGlobal from "@/components/reconfiguration/logoGlobal";
import longitudeLatitude from "@/components/reconfiguration/displayLongitudeLatitude";
import parameterHeading from "@/components/reconfiguration/parameterHeading";
import parameterDisplay from "@/components/reconfiguration/parameterDisplay";
import layerManager from "@/components/reconfiguration/layerManager/index.vue";
import timeLine from "@/components/reconfiguration/timeline/index.vue";
import earth from "@/components/reconfiguration/earth/index.vue";
export default {
  name: "App",
  components: {
    // !左侧菜单模块按钮
    Menus,
    // !系统信息标题
    LogoGlobal,
    // !预警预报
    Alerted,
    // !显示鼠标位置经纬度信息
    longitudeLatitude,
    // !页面参数标题
    parameterHeading,
    // !地球
    earth,
    // !时间播放轴
    timeLine,
    // !图层管理器
    layerManager,
    // !参数显示
    parameterDisplay,
    // !界面工具栏
    interfaceToolbar
  },
  methods: {}
};
</script>
<style lang="scss">
html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: relative;
}
</style>
