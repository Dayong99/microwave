<template>
  <!-- eslint-disable -->
  <div class="alertedUnit">
    <div class="alertedUnitWrap">
      <div class="alert"></div>
      <el-container class="con">
        <el-header>
          <unit-head :headSrcInner="headSrc"></unit-head>
        </el-header>
        <el-main>
          <slot name="alerted-content"></slot>
        </el-main>
      </el-container>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import UnitHead from "./unitHead";
export default {
  data() {
    return {};
  },
  props: ["headSrc"],
  components: {
    UnitHead
  }
};
</script>
<style scoped lang="scss">
/* eslint-disable */
.alertedUnit {
  position: relative;
  width: 293px;
  .alertedUnitWrap {
    width: 100%;
    height: 187px;
    font-size: 14px;
    color: #fff;
    .alert {
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: #7a888b;
      opacity: 0.59;
      border-radius: 4px;
    }
    .con {
      position: relative;
    }
  }
}

.el-header {
  padding: 0px !important;
  height: auto !important;
}
.el-main {
  padding: 0 !important;
  height: 142px !important;
}
</style>