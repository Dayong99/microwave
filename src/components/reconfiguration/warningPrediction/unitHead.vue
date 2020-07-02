<template>
<!-- eslint-disable -->
  <div class="alertedHead">
    <div class="alertedHeadWrap">
      <div class="alert style"></div>
      <el-container class="a">
        <template v-if="headSrcInner == 'flowIndicator'">
          <img class="flowIndicator" src="@/assets/images/alerted/head/flowIndicator.png" />
          <span>对流判识</span>
          <el-switch class="sch" v-model="flowIndicatorSwitch"></el-switch>
        </template>
        <template v-else-if="headSrcInner == 'cloudsPull'">
          <img class="cloudsPull" src="@/assets/images/alerted/head/cloudsPull.png" />
          <span>云图外推</span>
          <el-switch class="sch" v-model="flowIndicatorSwitch"></el-switch>
        </template>
        <template v-else-if="headSrcInner == 'forcast'">
          <img class="forcast" src="@/assets/images/alerted/head/forcast.png" />
          <span>降水短时预报</span>
          <el-switch class="sch" v-model="flowIndicatorSwitch"></el-switch>
        </template>
      </el-container>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
export default {
  data() {
    return {
      flowIndicatorSwitch: false
    };
  },
  props: ["headSrcInner"]
};
</script>
<style scoped lang="scss">
/* eslint-disable */
.alertedHead {
  position: relative;
  .alertedHeadWrap {
    width: 293px;
    height: 45px;
    .alert {
      position: absolute;
      width: 100%;
      height: 100%;
    }
    .a {
      height: 100%;
      line-height: 45px;
      span {
        font-size: 22px;
      }
      img {
        margin: 13px 19px 0 17px;
      }
      .sch {
        float: right;
        position: absolute;
        right: 14px;
        top: 13px;
      }
    }
    .style {
      background-color: #b8c6c7;
      opacity: 0.6;
      border-radius: 4px;
    }
    .flowIndicator {
      width: 21px;
      height: 18px;
    }
    .cloudsPull {
      width: 21px;
      height: 15px;
    }
    .forcast {
      width: 19px;
      height: 22px;
    }
  }
}
</style>