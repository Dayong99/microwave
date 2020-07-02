<template>
  <!-- eslint-disable -->
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
      // !探空雷达子菜单
      childrenMenuList: this.$store.state.searchSkyRadar.childrenMenuList,
      // 显示曲线数据表格
      showTable: false,
      clicked: -1,
      clicked2: -1,
      // !站点列表数据
      stationList: this.$store.state.searchSkyRadar.searchSkyRadarStationList,
      // 当前点击的站点信息
      stationValueInfo: ""
    };
  },
  components: {},
  created() {
    // !获取探空雷达站点数据
    this.getSearchSkyRadarStationDate();
  },
  props: {
    imgPlay: {
      type: Function,
      default: null
    }
  },
  mounted() {
    this.getLeftClickMouseEvent();
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
  watch: {},
  methods: {
    // 获取探空雷达站点数据
    getSearchSkyRadarStationDate() {
      // !探空雷达站点列表接口
      const url = this.$store.state.searchSkyRadar.searchSkyRadarStationListUrl;
      axios({
        method: "GET",
        url: url,
        responseType: "json"
      })
        .then(res => {
          // console.log(res)
          res.data.data.forEach(e => {
            this.stationList.push({
              id: e.iid,
              zhanhao: e.zhanhao,
              lon: e.lon,
              lat: e.lat,
              stationname: e.stationname
            });
          });
        })
        .catch(() => {
          // console.log("获取站点数据失败")
        });
    },
    imgPlayOn(countIndex) {
      if (this.imgPlay) {
        this.imgPlay(countIndex, 4);
      }
    },
    // !点击了二级菜单
    getMenu(index, con) {
      // !当点击的为站点分布
      console.log("探空雷达中点击的index" + index);
      if (index != 0) {
        return;
      }
      // !点击的菜单高亮
      this.clicked = index;
      // !将点击的index传给父组件
      this.imgPlayOn(index);
      // !改变状态管理器flag
      this.$store.commit("system/setCurrentModuleFlag", 4);

      // // !获取时间列表
      // this.getTimelineData()
    },
    // 点击了站点列表中的第几项
    getMenu2(index, con) {
      // !站点列表高亮项
      this.clicked2 = index;
      // ?点击的站点信息获取
      this.stationValueInfo = con;
      // !站点信息
      // this.$store.commit("system/setSkyRadiator", con);
      // !站点号
      // this.$store.commit("system/setSearchSkyStationNumber", con.zhanhao);
      this.getSkyRadarTime(con.zhanhao);
      // !将激活的站点信息传给vuex
      this.$store.commit(
        "searchSkyRadar/setActiveSearchSkyStation",
        con.zhanhao
      );
      // !探空雷达表格显示
      this.$store.commit("Charts/setIsEchartsSearchSkyShow", true);

      // !获取时间列表
      this.getTimelineData();
    },
    // ?获取探空站数据
    getSkyRadarTime(zhanhao) {
      const requestModule =
        "lbostation/time?time=2020-05-26%2013:34:18&zhanhao=" + zhanhao;
      axios
        .get(requestModule)
        .then(res => {
          // !去日期T
          // console.log(res)
          return res.data.data.map(i => {
            return i.replace("T", " ");
          })[0];
        })
        .then(res => {
          // console.log(res);
          this.$store.commit("system/setSearchSkyStationNumberDate", res);
          // console.log(this.$store.state.system.searchSkyStationNumberDate)
        })
        .catch(function(error) {
          // console.log(error);
        });
    },
    // !获取鼠标点击事件
    getLeftClickMouseEvent() {
      const ellipsoid = window.earth.scene.globe.ellipsoid;
      var handler = new Cesium.ScreenSpaceEventHandler(
        window.earth.scene.canvas
      );
      handler.setInputAction(evt => {
        // !添加单击监听事件
        var pick = window.earth.scene.pick(evt.position);
        // if(pick) {

        // }
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    },
    // !获取时间列表
    getTimeLineData() {
      const _currentTime = this.$moment().format("YYYY-MM-DD HH:mm:ss");
      // !探空雷达请求时间列表
      this.$get(this.$store.state.radar.radarTimeUrl, {
        time: _currentTime,
        zhanhao: "58238"
      }).then(res => {
        console.log(res);
        // // !时间列表去T
        // const _currentDayTimeList = res.data.data.map(i => {
        //   return i.replace("T", " ");
        // });
        // console.log(_currentDayTimeList)
        // const _activeIndex = _currentDayTimeList.length - 1
        // // !将风云四号成像仪的时间列表传给时间轴显示
        // this.$store.commit('timeLine/setCurrentDayTimeList', _currentDayTimeList)
        // // !将风云四号成像仪当前激活的时间点传给时间轴
        // this.$store.commit('timeLine/setActiveIndex', _activeIndex)
      });
    }
  }
};
</script>

<style scoped>
</style>