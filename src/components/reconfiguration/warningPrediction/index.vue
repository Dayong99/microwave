<template>
  <!-- eslint-disable -->
  <div class="alerted" v-show="show">
    <ul>
      <li>
        <unit-item :headSrc="alerted.flowIndicator">
          <div slot="alerted-content" class="alerted-content">
            <div class="alerted-a">
              <span class="alerted-a-b alerted-a-bz">最近：</span>
              <span class="alerted-a-b">最新</span>
              <span class="alerted-a-b">3h</span>
              <span class="alerted-a-b">6h</span>
              <span class="alerted-a-b">9h</span>
            </div>
            <div class="alerted-b">
              <ul>
                <li class="active">对流初生识别</li>
                <li>云相态</li>
                <li>强对流监测</li>
                <li>云顶高度</li>

                <li>闪电频数</li>
                <li>云顶温度</li>
                <li>降水估计</li>
                <li>云类型</li>
              </ul>
            </div>
          </div>
        </unit-item>
      </li>
      <li>
        <unit-item :headSrc="alerted.cloudsPull">
          <div slot="alerted-content" class="alerted-content">
            <div class="alerted-a">
              <span class="alerted-a-b alerted-a-bz">外推：</span>
              <span class="alerted-a-b">0.5h</span>
              <span class="alerted-a-b">1h</span>
              <span class="alerted-a-b">2h</span>
              <span class="alerted-a-b">3h</span>
            </div>
            <div class="alerted-b">
              <ul>
                <li>云图外推</li>
                <li>强对流云外推</li>
              </ul>
            </div>
          </div>
        </unit-item>
      </li>
      <li>
        <unit-item :headSrc="alerted.forcast"></unit-item>
      </li>
    </ul>
  </div>
</template>
<script>
/* eslint-disable */
//预警
import UnitItem from "./unitItem";
export default {
  data() {
    return {
      show: false,
      alerted: {
        flowIndicator: "flowIndicator",
        cloudsPull: "cloudsPull",
        forcast: "forcast"
      }
    };
  },
  components: {
    UnitItem
  }
};
</script>
<style scoped lang="scss" scoped>
/* eslint-disable */
@import "@/styles/static.scss";
.alerted {
  position: $posRule0;
  width: 293px;
  min-height: 30px;
  background: transparent;
  top: 150px;
  left: 24px;
  font-size: 14px;
  > ul > li {
    margin-bottom: 14px;
  }
  .alerted-a {
    overflow: hidden;
    padding: 7px 0;
    .alerted-a-b {
      float: left;
      width: 41px;
      height: 19px;
      line-height: 19px;
      border-radius: 4px;
      background-color: #b8c6c7;
      margin-right: 15px;
      cursor: pointer;
    }
    .alerted-a-b.active {
      background-color: #00f0ff;
    }
    .alerted-a-bz {
      margin-left: 11px;
      width: auto;
      background: none;
      cursor: default;
    }
  }
  .alerted-b {
    li {
      position: $posRule1;
      width: 50%;
      float: left;
      height: 24px;
      text-align: left;
      text-indent: 32px;
      line-height: 24px;
      cursor: pointer;
      &:before {
        position: $posRule2;
        content: "";
        width: 9px;
        height: 9px;
        border-radius: 10px;
        border: 1px solid #fff;
        left: 13px;
        top: 7px;
      }
      &.active:before {
        background-color: #00f0ff;
        border: 1px solid #00f0ff;
      }
    }
  }
}
</style>