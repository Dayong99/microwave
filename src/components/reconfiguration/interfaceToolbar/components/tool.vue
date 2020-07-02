
<template>
  <!-- eslint-disable -->
  <div class="right-top-container">
    <el-button class="login-logo" @click.native.prevent="logout"/>
    <el-container>
      <div class="bar-list bar-size">
        <div class="bar-inner-pane" />
        <el-menu mode="horizontal">
          <div class="bar-sub">
            <div :class="{ zoomUp_active:isZoomUpVisible}" class="bar-item zoomUp" @click="zoomUp" />
            <div :class="{ zoomDown_active:isZoomDownVisible}" class="bar-item zoomDown" @click="zoomDown" />
            <div :class="{ screenAll_active :isScreenAllVisible}" class="bar-item screenAll"  @click="screenAll" />
            <div :class="{ lonG_active :isLonGVisible}" class="bar-item lonG" @click="lonG" />
            <div :class="{ z2D_active:is2DVisible }" class="bar-item z2D" @click="z2D" />
            <div :class="{ size_active :isSizeVisible}" class="bar-item size" @click="size" />
            <div :class="{ position_active :isPositionVisible}" class="bar-item position" @click="position" />
            <div :class="{ fresh_active :isFreshVisible}" class="bar-item fresh" @click="fresh" />
          </div>
        </el-menu>
      </div>
    </el-container>
  </div>
</template>
<script>
/* eslint-disable */
export default {
  data() {
    return {
      isPositionVisible: false,
      isScreenVisible: false, // 截图
      isZoomUpVisible: false, // 放大
      isZoomDownVisible: false, // 缩小
      isScreenAllVisible: false, // 全屏
      isLonGVisible: false, // 显示经纬度网格线
      is2DVisible: false, // 2D 3D切换
      isSizeVisible: false, // 测量两地距离
      isSimpleVisible: false, // 是否简易模式
      isFreshVisible: false, // 刷新
      isLayerVisible: false // 图层管理器显示隐藏
    };
  },
  methods: {
    zoomUp() {
      this.isZoomUpVisible = !this.isZoomUpVisible
    },
    zoomDown() {
      this.isZoomDownVisible = !this.isZoomDownVisible
    },
    layer() {
      this.isLayerVisible = !this.isLayerVisible
    },
    screenAll() {
      this.isScreenAllVisible = !this.isScreenAllVisible
    },
    lonG() {
      this.isLonGVisible = !this.isLonGVisible
    },
    z2D() {
      this.is2DVisible = !this.is2DVisible
    },
    size() {
      this.isSizeVisible = !this.isSizeVisible
    },
    screenshots() {
      this.isScreenVisible = !this.isScreenVisible
    },
    simple() {
      this.isSimpleVisible = !this.isSimpleVisible
    },
    position() {
      this.isPositionVisible = !this.isPositionVisible
    },
    fresh() {
      this.isFreshVisible = !this.isFreshVisible
    },
    logout(){
      this.$confirm("此操作将退出系统，确定登出吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$store.dispatch("LogOut").then(() => {
              location.reload(); // 为了重新实例化vue-router对象 避免bug
            });
          })
          .catch(() => {});
    }



  }
};
</script>
<style scoped lang="scss">
.right-top-container {
  position: absolute;
  right: 63px;
  top: 22px;
}
.right-top-container .bar-list {
  position: relative;
}
.bar-size {
  width: 300px;
  height: 28px;
}
.bar-inner-pane {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #7a888b;
  opacity: 0.5;
  border-radius: 22px;
}
.bar-list .bar-sub {
  position: relative;
  margin: 0;
  padding: 0;
  height: 100%;
  display:flex;
  justify-content: space-around;
}
.bar-list .bar-sub .bar-item {
  width: 26px;
  height: 100%;
  line-height: 28px;
  cursor: pointer;
  margin:0 5px;
}
.layer {
  background: url("~@/assets/images/icons/layer.png") no-repeat center center;
}
.layer_active {
  background: url("~@/assets/images/icons/layer_blue.png") no-repeat center
    center;
}
.screenshots {
  background: url("~@/assets/images/icons/screenshots.png") no-repeat center
    center;
}
.screenshots_active {
  background: url("~@/assets/images/icons/screenshots_blue.png") no-repeat
    center center;
}
.zoomUp {
  background: url("~@/assets/images/icons/zoomUp.png") no-repeat center center;
}
.zoomUp_active {
  background: url("~@/assets/images/icons/zoomUp_blue.png") no-repeat center
    center;
}

.zoomDown {
  background: url("~@/assets/images/icons/zoomDown.png") no-repeat center center;
}
.zoomDown_active {
  background: url("~@/assets/images/icons/zoomDown_blue.png") no-repeat center
    center;
}

.position {
  background: url("~@/assets/images/icons/position.png") no-repeat center center;
}
.position_active {
  background: url("~@/assets/images/icons/position_blue.png") no-repeat center
    center;
}
.screenAll {
  background: url("~@/assets/images/icons/screenAll.png") no-repeat center
    center;
}
.screenAll_active {
  background: url("~@/assets/images/icons/screenAll_blue.png") no-repeat center
    center;
}
.lonG {
  background: url("~@/assets/images/icons/lonG.png") no-repeat center center;
}
.lonG_active {
  background: url("~@/assets/images/icons/lonG_blue.png") no-repeat center
    center;
}
.z2D {
  background: url("~@/assets/images/icons/2D.png") no-repeat center center;
}
.z2D_active {
  background: url("~@/assets/images/icons/2D_blue.png") no-repeat center center;
}
.size {
  background: url("~@/assets/images/icons/size.png") no-repeat center center;
}
.size_active {
  background: url("~@/assets/images/icons/size_blue.png") no-repeat center
    center;
}
.simple {
  background: url("~@/assets/images/icons/simple.png") no-repeat center center;
}
.simple_active {
  background: url("~@/assets/images/icons/simple_blue.png") no-repeat center
    center;
}
.fresh {
  background: url("~@/assets/images/icons/fresh.png") no-repeat center center;
}
.fresh_active {
  background: url("~@/assets/images/icons/fresh_blue.png") no-repeat center
    center;
}
.el-menu {
  height: 100%;
  background-color: transparent;
  border: none;
}
.login-logo:hover,
.login-logo:visited,
.login-logo:focus {
  background-color: transparent;
  border: none;
}
.login-logo {
  position: absolute;
  right: -52px;
  top: 0;
  width: 25px;
  height: 30px;
  background-color: transparent;
  border: none;
  background: url("~@/assets/images/icons/login.png") no-repeat center center;
}
.login-logo-active {
  background: url("~@/assets/images/icons/login_active.png") no-repeat center
    center;
}
.el-menu.el-menu--horizontal {
  border: none !important;
}
</style>
