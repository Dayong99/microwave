<template>
  <!-- eslint-disable -->
  <!-- 成像仪对应的三级菜单 -->
  <div class="right-container">
    <div class="dta">
      <div class="dta-wrap">
        <div class="dta-wrap-pane"></div>
        <div class="dta-wrap-pane-wrap">
          <div class="dta-title">
            <div class="dta-title-pane"></div>
            <img class="dta-cloud" style="margin:0 6px 0 10px" src="~@/assets/images/cloud.png" />
            <span>短时预报</span>
            <span class="d-b"></span>
            <span>INCA</span>
          </div>
          <div class="d-text">范围选择</div>
          <el-container class="dta-item">
            <el-aside style="width:80px;    line-height: 120px;">
              <div>地面要素</div>
            </el-aside>
            <el-container class="dta-item-wrap">
              <div class="dta-item-a">2米气温</div>
              <div class="dta-item-a">2米零点</div>
              <div class="dta-item-a">海平面气压</div>
              <div class="dta-item-a">10米风</div>
              <div class="dta-item-a">总云量</div>
              <div class="dta-item-a">低云量</div>
              <div class="dta-item-a">总降水量</div>
              <div class="dta-item-a">100米风</div>
              <div class="dta-item-a">总降雪</div>
              <div class="dta-item-a">能见度</div>
            </el-container>
          </el-container>
          <el-container class="dta-item">
            <el-aside style="width:80px;    line-height: 60px;">降水</el-aside>
            <el-container class="dta-item-wrap">
              <div class="dta-item-a">3小时</div>
              <div class="dta-item-a">6小时</div>
              <div class="dta-item-a">12小时</div>
              <div class="dta-item-a">24小时</div>
            </el-container>
          </el-container>
          <el-container class="dta-item">
            <el-aside class="aside" width="80px">
              <div>高度</div>
              <div>风</div>
              <div>温度</div>
              <div>湿度</div>
              <div>涡度</div>
              <div>散度</div>
              <div>W</div>
            </el-aside>
            <el-container class="dta-item-wrap">
              <div class="dta-s1">
                <div class="data-squre"></div>
                <div class="data-squre"></div>
                <div class="data-squre"></div>
                <div class="data-squre"></div>
                <div class="data-squre"></div>
                <div class="data-squre"></div>
                <div class="data-squre"></div>
                <div class="data-squre"></div>

                <div class="data-squre"></div>
                <div class="data-squre"></div>
                <div class="data-squre"></div>
                <div class="data-squre"></div>
                <div class="data-squre"></div>
                <div class="data-squre"></div>
                <div class="data-squre"></div>
                <div class="data-squre"></div>

                <div class="data-squre"></div>
                <div class="data-squre"></div>
                <div class="data-squre"></div>
                <div class="data-squre"></div>
                <div class="data-squre"></div>
                <div class="data-squre"></div>
                <div class="data-squre"></div>
                <div class="data-squre"></div>

                <div class="data-squre"></div>
                <div class="data-squre"></div>
                <div class="data-squre"></div>
                <div class="data-squre"></div>
                <div class="data-squre"></div>
                <div class="data-squre"></div>
                <div class="data-squre"></div>
                <div class="data-squre"></div>

                <div class="data-squre"></div>
                <div class="data-squre"></div>
                <div class="data-squre"></div>
                <div class="data-squre"></div>
                <div class="data-squre"></div>
                <div class="data-squre"></div>
                <div class="data-squre"></div>
                <div class="data-squre"></div>

                <div class="data-squre"></div>
                <div class="data-squre"></div>
                <div class="data-squre"></div>
                <div class="data-squre"></div>
                <div class="data-squre"></div>
                <div class="data-squre"></div>
                <div class="data-squre"></div>
                <div class="data-squre"></div>

                <div class="data-squre"></div>
                <div class="data-squre"></div>
                <div class="data-squre"></div>
                <div class="data-squre"></div>
                <div class="data-squre"></div>
                <div class="data-squre"></div>
                <div class="data-squre"></div>
                <div class="data-squre"></div>

                <div class="data-squre db">200</div>
                <div class="data-squre db">300</div>
                <div class="data-squre db">400</div>
                <div class="data-squre db">500</div>
                <div class="data-squre db">600</div>
                <div class="data-squre db">700</div>
                <div class="data-squre db">850</div>
                <div class="data-squre db">925</div>
              </div>
            </el-container>
          </el-container>
          <el-container class="dta-item">
            <el-aside style="width:80px;    line-height: 60px;">形势场</el-aside>
            <el-container class="dta-item-wrap">
              <div class="dta-item-a">500高度+风</div>
              <div class="dta-item-a">700高度+风</div>
              <div class="dta-item-a">850高度+风</div>
              <div class="dta-item-a">气压+10米风</div>
            </el-container>
          </el-container>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import "@/styles/dataMode.scss";
/* import DataMode from "./mixin/dataMode.js"; */
export default {
  name: "vdatayMody",
  data() {
    return {
      clicked: -1,
      // 成像仪的内容清单
      imagerList: [{ title: 1 }]
    };
  },
  /* mixins: [DataMode], */
  methods: {
    getMenu(index, con) {
      return;
      console.log(index, con, "index");
      this.clicked = index;
    }
  }
};
</script>

<style scoped>
</style>