<template>
<!-- eslint-disable -->
  <!-- 成像仪对应的三级菜单 -->
  <div class="right-container KFeight">
    <ul class="right-wrap">
      <li
        class="right-menu ttz"
        v-for="(item,index) in childrenMenuList"
        :key="index"
        :class="{'menuBg':clicked == index,'menu2':item.showBg}"
        @click="getMenu(index, item.title)"
      >
        <span class="menuCont" :class="{'menuCount2':item.showBg}">
          <div :class="{'imgRadar':!item.showStationList,'imgRadar-a':!item.showStationList}"></div>
          {{item.title}}
          <div v-if="item.showStationList" class="stl">
            <span class="stl-title active">
              <div class="imgRadar imgRadar-b"></div>&nbsp;&nbsp;站点列表
            </span>
            <ul>
              <li
                v-for="(item2,index2) in stationList"
                :key="index2"
                :class="{'active':clicked2 == index2}"
                @click="getMenu2(index2, item2)"
              >{{item2.stationname}} - {{item2.zhanhao}}</li>
            </ul>
          </div>
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
/* eslint-disable */
import axios from "@/utils/axioz";
import "@/styles/radar.scss";
export default {
  data() {
    return {
      // !微波辐射子菜单
      childrenMenuList: this.$store.state.microwaveRadiation.childrenMenuList,
      clicked: -1,
      clicked2: -1,
      stationList: []
    };
  },
  created() {
    // 获取微波辐射计站点数据
    this.getWeiBOStationData();
  },
  props: {
    imgPlay: {
      type: Function,
      default: null
    }
  },
  mounted() {
    //this.imgPlayOn(6)
    this.$nextTick(() => {
      // $(".stl ul li").click(function(){
      //     $(this).parent().find("li").removeClass("active")
      //     $(this).addClass("active")
      //     $(this).parent().parent().find(".stl-title").addClass("active")
      //     $(this).parents(".right-menu").parent().find(">li").removeClass("menuBg")
      // });
      $(".ttz").click(function() {
        if ($(this).find(".stl").length) {
        } else {
          $(this)
            .parent()
            .find(">li")
            .removeClass("menuBg");
          $(this).addClass("menuBg");
          $(this)
            .parent()
            .find(".stl-title")
            .removeClass("active");
          $(this)
            .parent()
            .find("li")
            .removeClass("active");
        }
      });
    });
  },
  methods: {
    // 获取微波辐射站点数据
    getWeiBOStationData() {
      const url = this.$store.state.microwaveRadiation
        .microwaveRadiationListUrl;
      axios({
        method: "GET",
        url: url,
        responseType: "json"
      })
        .then(result => {
          result.data.data.forEach(e => {
            this.stationList.push({
              id: e.iid,
              zhanhao: e.zhanhao,
              lon: e.lon,
              lat: e.lat,
              stationname: e.stationname
            });
          });
        })
        .catch(() => {});
    },
    imgPlayOn(countIndex) {
      if (this.imgPlay) {
        this.imgPlay(countIndex, 5);
      }
    },
    getMenu(index, con) {
      if (index == 1) {
        return;
      }
      this.clicked = index;
      this.imgPlayOn(index);
    },
    getMenu2(index, con) {
      this.clicked2 = index;
      this.$store.commit("system/setWei", con);
      console.log("微波辐射", con);
      this.$store.commit("system/setWeibostationNumber", con.zhanhao);
      console.log(this.$store.state.system.weibostationNumber);
      this.getSkyRadarTime(con.zhanhao);

      // !显示微波辐射表格
      this.$store.commit("Charts/setIsEchartsMicrowaveShow", true);
      // !将激活的站点信息传给vuex
      this.$store.commit("microwaveRadiation/setActiveMicStation", con.zhanhao);

      // !获取时间列表数据
      this.getTimelineData();
    },
    // !获取微波辐射站数据
    getSkyRadarTime(zhanhao) {
      const requestModule =
        "weibostation/time?time=2020-05-26%2013:34:18&zhanhao=" + zhanhao;
      axios
        .get(requestModule)
        .then(res => {
          // !去日期T
          return res.data.data.map(i => {
            return i.replace("T", " ");
          })[0];
        })
        .then(res => {
          console.log(res);
          this.$store.commit("system/setWeibostationNumberDate", res);
          console.log(this.$store.state.system.weibostationNumberDate);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // !获取时间列表数据
    getTimelineData() {
      const _currentTime = this.$moment().format("YYYY-MM-DD HH:mm:ss");
      // !微波辐射请求时间列表
      this.$get(this.$store.state.microwaveRadiation.micTimeUrl, {
        time: _currentTime,
        zhanhao: zhanhao
      }).then(res => {
        console.log(res);
      });
    }
  }
};
</script>

<style scoped>
</style>