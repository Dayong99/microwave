<template>
  <!-- eslint-disable -->
  <div class="left-container" :class="{ special:!getSimple }">
    <div class="op" />
    <el-row class="tac">
      <el-col :span="24">
        <el-menu class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
          <el-submenu index="1">
            <template slot="title" class="hoverShow" selected>
              <i class="iconfont iconweixingtu" />
              <span>风云四号</span>
            </template>
            <el-menu-item class="second-menu FY" index="1-1">
              <i class="iconfont iconweixing icon-rotate" />
              <span class="second-menu-span">成像仪</span>
              <fy-imager :imgPlay="imgPlay" class="commonThird" />
            </el-menu-item>
            <el-menu-item class="second-menu FY" index="1-2">
              <span class="second-menu-span">探测仪</span>
              <fy-detector :imgPlay="imgPlay" class="commonThird" />
            </el-menu-item>
            <el-menu-item class="second-menu FY" index="1-3">
              <span class="second-menu-span">闪电仪</span>
              <fy-lightning class="commonThird" @ToLightning="getLightning" />
            </el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title" class="hoverShow" selected>
              <i class="iconfont iconweixingtu2" />
              <span>葵花八号</span>
            </template>
            <el-menu-item class="second-menu FY" index="1-1">
              <i class="iconfont iconweixing icon-rotate" />
              <span class="second-menu-span">成像仪</span>
              <k-h-eight class="commonThird" :img-play="imgPlay" />
            </el-menu-item>
          </el-submenu>
          <el-menu-item index="3" class="hoverShow">
            <i class="iconfont iconleida" />
            <span slot="title">雷&emsp;&emsp;达</span>
            <radar :imgPlay="imgPlay" class="commonThird" />
          </el-menu-item>
          <el-menu-item index="5" class="hoverShow">
            <i class="iconfont iconzhandian" />
            <span slot="title">自&ensp;动&ensp;站</span>
            <auto-station :imgPlayAuto="imgPlay" class="commonThird" />
          </el-menu-item>
          <el-menu-item index="6" class="hoverShow">
            <i class="iconfont iconleida3" />
            <span slot="title">探空雷达</span>
            <search-sky-radar :imgPlay="imgPlay" class="commonThird" />
          </el-menu-item>
          <el-menu-item index="7" class="hoverShow">
            <i class="iconfont iconweibofushe" />
            <span slot="title">微波辐射</span>
            <weibo-radiation :imgPlay="imgPlay" class="commonThird" />
          </el-menu-item>
          <el-menu-item index="4" class="hoverShow">
            <i class="iconfont el-icon-s-data" />
            <span slot="title">数值模式</span>
            <vdatay-mody class="commonThird" />
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
/* eslint-disable */
import fyImager from "@/components/reconfiguration/FYImager";
import fyDetector from "@/components/reconfiguration/FYDetector";
import fyLightning from "@/components/reconfiguration/FYLightning";
import AutoStation from "@/components/reconfiguration/autoStation";
import SearchSkyRadar from "@/components/reconfiguration/searchSkyRadar";
import VdatayMody from "@/components/reconfiguration/vdatayMody";
import WeiboRadiation from "@/components/reconfiguration/weiboRadiation";
import KHEight from "@/components/reconfiguration/KHImager";
import Radar from "@/components/reconfiguration/radar";
import "@/styles/layer.scss";
import "@/assets/font_icon/iconfont.css";
export default {
  components: {
    fyImager, // 成像仪列表
    fyDetector,
    fyLightning,
    KHEight,
    SearchSkyRadar,
    AutoStation,
    Radar,
    VdatayMody,
    WeiboRadiation
  },
  mounted() {
    this.$nextTick(() => {
      $(".el-menu-vertical-demo")
        .find(">li")
        .hover(
          function() {
            if ($(this).find(".second-menu").length) {
              return;
            }
            var topfromScreen = $(this).offset().top;
            if ($(this).find(".commonThird").length) {
              $(this)
                .find(".commonThird")
                .css({
                  top: topfromScreen + "px"
                });
            }
          },
          function() {}
        );

      $(".el-menu-vertical-demo .second-menu").hover(
        function() {
          var topfromScreen = $(this).offset().top;
          if ($(this).find(".commonThird").length) {
            $(this)
              .find(".commonThird")
              .css({
                top: topfromScreen + "px"
              });
          }
        },
        function() {}
      );

      $(".second-menu").hover(
        function() {
          $(this)
            .parent()
            .prev()
            .addClass("active");
        },
        function() {
          $(this)
            .parent()
            .prev()
            .removeClass("active");
        }
      );

      $(".right-menu").click(function(e) {
        //console.log($('div').data("parent"),'juqery��ֵ')
        $(this)
          .parents(".commonThird")
          .show();
        e.stopPropagation();
      });

      $(".left-container .second-menu.FY").hover(
        function() {
          $(".commonThird").hide();
          $(this)
            .find(".commonThird")
            .show();
        },
        function() {}
      );
      $(".left-container .second-menu.FY .second-menu-span").hover(
        function() {
          //console.log('second-menu-span hovered')
          $(this)
            .parent()
            .find(".commonThird")
            .show();
        },
        function() {}
      );
      $(".left-container .hoverShow").hover(
        function() {
          $(".commonThird").hide();
          $(this)
            .find(".commonThird")
            .show();
        },
        function() {}
      );
      $(".el-submenu").hover(
        function() {
          //console.log('zzz')

          var c = $("div").data("ctd");
          if (c == 1) {
            $("div").data("ctd", 0);
          } else {
            $(".commonThird").hide();
          }
        },
        function() {}
      );
      $(".commonThird").hover(
        function() {
          //console.log('zzz')

          $("div").data("ctd", 1);
        },
        function() {}
      );
      $(".left-container").click(function() {
        $("div").data("parentBy", 1);
      });
      $("body").click(function(e) {
        //console.log('e',e)
        //$('div').data("parent",123)
        var a = $("div").data("parentBy");
        if (a == 1) {
          $("div").data("parentBy", 0);
        } else {
          $(".commonThird").hide();
        }
        e.preventDefault();
      });
    });
  },
  props: {
    // 接收界面传过来的值
    imgPlayRoot: {
      type: Function,
      default: null
    }
  },
  data() {
    return {
      lightningCont: null // 接收子组件闪点仪的三级菜单传过来的内容
    };
  },
  computed: {
    getSimple() {
      return this.$store.state.system.simple;
    }
  },
  methods: {
    // 子组件传过来的信息
    imgPlay(countIndex, flag) {
      // console.log("子组件传过来的信息")
      // console.log("点击的index" + countIndex, "点击的模块" + flag)
      if (this.imgPlayRoot) {
        this.imgPlayRoot(countIndex, flag);
      }
    },
    handleOpen(key, keyPath) {},
    handleClose(key, keyPath) {},
    getLightning: function(data) {
      this.lightningCont = data;
      console.log(data, "闪点仪点击后传过来的参数");
      this.$emit("toNavShow", data);
    }
  }
};
</script>

<style scoped>
/*
  #app .left-container .right-container{
    position: absolute !important;
  }*/
#app .left-container .el-menu {
  background-color: transparent !important;
  text-indent: 6px;
}
#app .left-container .el-menu {
  width: 125px;
}
.op {
  background-color: #7a888b !important;
  opacity: 0.6 !important;
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 8px;
}
#app .left-container .el-submenu .el-submenu__title {
  height: 50px !important;
  line-height: 56px !important;
}
</style>
