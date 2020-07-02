<template>
<!-- eslint-disable -->
  <!-- 自动站菜单 -->
  <div class="right-container KFeight" style="left:113px;">
    <ul class="right-wrap" style="width: 176px;">
      <li><span class="menuCont">地面图</span></li>
      <li><span class="menuCont">温度</span></li>
      <li><span class="menuCont">气压</span></li>
      <li><span class="menuCont">相对湿度</span></li>
      <li><span class="menuCont">风向风速</span></li>
      <li><span class="menuCont">能见度</span></li>
    </ul>
  </div>
</template>

<script>
/* eslint-disable */
import {
  getCodeImage,
  drawMap,
  removeImgArray,
  clearChannel,
  clearStation
} from "@/utils/requestImg";
import axios from "@/utils/axioz";
// !工具函数
import { deleteImageLayers } from "@/utils/tools";
import $ from "jquery";
import "@/styles/tabText.scss";
// !色斑图 颜色
var colorList = [];
// colorList.push(new Cesium.Color(0, 104, 55, 255));
// colorList.push(new Cesium.Color(26, 152, 80, 255));
// colorList.push(new Cesium.Color(102, 189, 99, 255));
// colorList.push(new Cesium.Color(166, 217, 106, 255));
// colorList.push(new Cesium.Color(217, 239, 139, 255));
// colorList.push(new Cesium.Color(255, 255, 191, 255));
// colorList.push(new Cesium.Color(254, 225, 139, 255));
// colorList.push(new Cesium.Color(253, 104, 55, 255));
// colorList.push(new Cesium.Color(253, 174, 97, 255));
// colorList.push(new Cesium.Color(244, 109, 67, 255));
// colorList.push(new Cesium.Color(215, 48, 39, 255));
// colorList.push(new Cesium.Color(165, 0, 38, 255));

// colorList.push(new Cesium.Color(0 / 255, 104 / 255, 55 / 255, 1));
// colorList.push(new Cesium.Color(26 / 255, 152 / 255, 80 / 255, 1));
// colorList.push(new Cesium.Color(102 / 255, 189 / 255, 99 / 255, 1));
// colorList.push(new Cesium.Color(166 / 255, 217 / 255, 106 / 255, 1));
// colorList.push(new Cesium.Color(217 / 255, 239 / 255, 139 / 255, 1));
// colorList.push(new Cesium.Color(255 / 255, 255 / 255, 191 / 255, 1));
// colorList.push(new Cesium.Color(254 / 255, 225 / 255, 139 / 255, 1));
// colorList.push(new Cesium.Color(253 / 255, 104 / 255, 55 / 255, 1));
// colorList.push(new Cesium.Color(253 / 255, 174 / 255, 97 / 255, 1));
// colorList.push(new Cesium.Color(244 / 255, 109 / 255, 67 / 255, 1));
// colorList.push(new Cesium.Color(215 / 255, 48 / 255, 39 / 255, 1));
// colorList.push(new Cesium.Color(165 / 255, 0 / 255, 38 / 255, 1));

colorList.push(new Cesium.Color(2 / 255, 12 / 255, 100 / 255, 1))
colorList.push(new Cesium.Color(7 / 255, 30 / 255, 120 / 255, 1))
colorList.push(new Cesium.Color(17 / 255, 49 / 255, 130 / 255, 1))
colorList.push(new Cesium.Color(27 / 255, 68 / 255, 159 / 255, 1))
colorList.push(new Cesium.Color(38 / 255, 87 / 255, 179 / 255, 1))
colorList.push(new Cesium.Color(48 / 255, 106 / 255, 199 / 255, 1))
colorList.push(new Cesium.Color(59 / 255, 126 / 255, 219 / 255, 1))
colorList.push(new Cesium.Color(78 / 255, 138 / 255, 221 / 255, 1))
colorList.push(new Cesium.Color(97 / 255, 150 / 255, 224 / 255, 1))
colorList.push(new Cesium.Color(116 / 255, 163 / 255, 226 / 255, 1))
colorList.push(new Cesium.Color(135 / 255, 175 / 255, 229 / 255, 1))
colorList.push(new Cesium.Color(155 / 255, 188 / 255, 232 / 255, 1))
colorList.push(new Cesium.Color(154 / 255, 196 / 255, 220 / 255, 1))
colorList.push(new Cesium.Color(153 / 255, 205 / 255, 208 / 255, 1))
colorList.push(new Cesium.Color(152 / 255, 214 / 255, 196 / 255, 1))
colorList.push(new Cesium.Color(151 / 255, 232 / 255, 173 / 255, 1))
colorList.push(new Cesium.Color(215 / 255, 222 / 255, 126 / 255, 1))
colorList.push(new Cesium.Color(234 / 255, 219 / 255, 112 / 255, 1))
colorList.push(new Cesium.Color(244 / 255, 217 / 255, 99 / 255, 1))
colorList.push(new Cesium.Color(250 / 255, 204 / 255, 79 / 255, 1))
colorList.push(new Cesium.Color(247 / 255, 180 / 255, 45 / 255, 1))
colorList.push(new Cesium.Color(242 / 255, 155 / 255, 0 / 255, 1))
colorList.push(new Cesium.Color(241 / 255, 147 / 255, 3 / 255, 1))
colorList.push(new Cesium.Color(240 / 255, 132 / 255, 10 / 255, 1))
colorList.push(new Cesium.Color(239 / 255, 117 / 255, 17 / 255, 1))
colorList.push(new Cesium.Color(238 / 255, 102 / 255, 24 / 255, 1))
colorList.push(new Cesium.Color(238 / 255, 88 / 255, 31 / 255, 1))
colorList.push(new Cesium.Color(231 / 255, 75 / 255, 26 / 255, 1))
colorList.push(new Cesium.Color(224 / 255, 63 / 255, 22 / 255, 1))
colorList.push(new Cesium.Color(217 / 255, 51 / 255, 18 / 255, 1))
colorList.push(new Cesium.Color(208 / 255, 36 / 255, 14 / 255, 1))
colorList.push(new Cesium.Color(194 / 255, 0 / 255, 3 / 255, 1))
colorList.push(new Cesium.Color(181 / 255, 1 / 255, 9 / 255, 1))
colorList.push(new Cesium.Color(169 / 255, 2 / 255, 16 / 255, 1))
colorList.push(new Cesium.Color(138 / 255, 5 / 255, 25 / 255, 1))
colorList.push(new Cesium.Color(111 / 255, 0 / 255, 21 / 255, 1))
colorList.push(new Cesium.Color(80 / 255, 0 / 255, 15 / 255, 1))
export default {
  props: {
    imgPlayAuto: {
      type: Function,
      default: null
    },
    writeValueSingle: {
      type: Function,
      default: null
    },
    colorBlockSingle: {
      type: Function,
      default: null
    }
  },
  data() {
    return {
      // !自动站菜单列表
      KFList: this.$store.state.autoStation.autoStationMenuList,
      clicked: -1,
      KFListIndex: -1,
      cur: {
        value: "",
        color: ""
      }
    };
  },
  mounted() {
    // this.imgPlayOn(6)
    this.$nextTick(() => {
      // $(".txt-tab").click(function(){
      //   var hasIndex = []
      //   $(this).parent().find(".txt-tab").each(function(){
      //     if($(this).hasClass("active")){
      //       hasIndex.push($(this).attr("data-value"))
      //     }
      //   })
      //   var that = this
      //   var clearStationSelection = function(){
      //       $(that).parents(".right-wrap").find(".txt-tab").removeClass("active")
      //   }
      //   clearStationSelection()
      //   for(var i=0;i<hasIndex.length;i++){
      //       $(that).parent().find(".txt-tab").eq(hasIndex[i]).addClass("active")
      //   }
      //   $(this).addClass("active")
      // });
    });
  },
  destroyed() {
    window.earth.entities.removeAll();
  },
  methods: {
    cList(index) {
      this.KFList.forEach((e, i, arr) => {
        if (i == 0) return;
        if (index != i) {
          e["wActiveShow"] = false;
          e["cActiveShow"] = false;
        } else {
          e["wActiveShow"] = this.cur.value;
          e["cActiveShow"] = this.cur.color;
        }
      });
    },
    // !点击菜单左边 填值 || 基本站
    clickLeft(countIndex, colorBlockType, indexT) {
      let isCloseActive = false;
      // !激活点击参数 如果已激活 则关闭
      if (this.KFList[countIndex].wActiveShow) {
        this.KFList[countIndex].wActiveShow = false;
        this.cur.value = false;
        isCloseActive = true;
      } else {
        this.KFList[countIndex].wActiveShow = true;
        this.cur.value = true;
        isCloseActive = false;
      }
      this.KFListIndex = countIndex;
      // !将点击的参数传给store保存
      setTimeout(() => {
        this.$store.commit("system/setStationActionStore", {
          colorBlockType: colorBlockType,
          indexT: indexT,
          isCloseActive: isCloseActive
        });
        this.$store.commit("system/setStationActionWriteValue", Math.random());
      }, 0);
      // !获取填值数据
      // !填值 colorBlockType 类别 isCloseActive 是否激活
      this.getAutoStationDataByType(colorBlockType, isCloseActive);
      this.cList(countIndex);
      // !点击的为站点类型选择
      if (countIndex == 0) {
        console.log("基本站");
        if (this.$store.state.autoStation.encrypt == 0) {
          this.$store.commit("autoStation/setEncrypt", 1);
        } else {
          this.$store.commit("autoStation/setEncrypt", 0);
        }
        console.log(this.$store.state.autoStation.encrypt);
      }
    },
    // !点击菜单右边 色斑 || 加密站
    clickRight(countIndex, colorBlockType, indexT) {
      console.log(countIndex);
      let isCloseActive = false;
      // !激活选择的参数 如果已激活 则取消激活
      if (this.KFList[countIndex].cActiveShow) {
        this.KFList[countIndex].cActiveShow = false;
        this.cur.color = false;
        isCloseActive = true;
      } else {
        this.KFList[countIndex].cActiveShow = true;
        this.cur.color = true;
        isCloseActive = false;
      }
      this.KFListIndex = countIndex;
      // !将数据传给store
      setTimeout(() => {
        this.$store.commit("system/setStationActionStore", {
          colorBlockType: colorBlockType,
          indexT: indexT,
          isCloseActive: isCloseActive
        });
        // 讲点击的色斑图信息传给状态管理器
        this.$store.commit("system/setStationActionColor", Math.random());
      }, 0);
      // !获取色斑图数据
      this.getSplashMapDate();
      this.imgPlayAuto(countIndex, 3);
      // this.colorBlockSingle()
      this.cList(countIndex);
      // !点击的为站点类型选择
      if (countIndex == 0) {
        console.log("加密站");
        if (this.$store.state.autoStation.basic == 0) {
          this.$store.commit("autoStation/setBasic", 1);
        } else {
          this.$store.commit("autoStation/setBasic", 0);
        }
        console.log(this.$store.state.autoStation.basic);
      }
    },
    imgPlayOn(countIndex) {
      if (this.imgPlayAuto) {
        this.imgPlayAuto(countIndex, 3);
      }
    },
    getMenu(index, con) {
      if ((index = 1)) {
        console.log("点击了地面填图");
        // !获取地面填图数据
        this.getAutoStationDataByValueAll();
        return;
      }
      // console.log(index, con);
      this.clicked = index;
      this.imgPlayOn(index);
    },
    // !获取地面填图数据
    getAutoStationDataByValueAll() {
      console.log("获取地面填图数据");
      clearStation();
      clearChannel();
      // deleteImageLayers(1);
      axios({
        method: "GET",
        url:
          "instand/intype?basic=" +
          this.$store.state.autoStation.basic +
          "&encrypt=" +
          this.$store.state.autoStation.encrypt,
        responseType: "json"
      })
        .then(res => {
          // console.log(res);
          if (res.data && res.data.data.length) {
            // console.log(res.data.data);
            // !将获取到的站点数据添加到地球
            res.data.data.forEach(e => {
              // console.log(e);
              // ! iid: id zhanhao: 站号 stationname: 站名 lon 经度 lat 纬度
              // const codeUrl =
              //   "autostation/show?type=温度&time=2020-01-02 13:30:00&basic=1&encrypt=0";
              this.addEntities(e.iid, e.zhanhao, "", e.lon, e.lat, null);
              // this.addEntities(e.iid, e.zhanhao, "", e.lon, e.lat, null);
            });
          }
        })
        .catch(error => {
          this.$notify.error({
            title: "请求数据失败",
            message: "自动站填值数据获取失败",
            duration: 1500
          });
        });
    },
    // !根据传入的参数在地球上画点
    addEntities(id, shi, qu, lon, lat, imgCode, menuType) {
      window.earth.entities.add({
        position: Cesium.Cartesian3.fromDegrees(lon, lat),
        point: {
          pixelSize: 5,
          color: Cesium.Color.RED
        }
      });
    },
    // !填值接收数据
    getAutoStationDataByType(getType, cl) {
      clearStation();
      clearChannel();
      // !getType 获取的参数类型 cl 是否显示
      // console.log(getType, cl);
      // !填值接口地址
      const staticUrl =
        "autostation/show?time=2020-01-02 13:30:00&basic=1&encrypt=0";
      axios({
        method: "GET",
        url: staticUrl,
        responseType: "json"
      }).then(res => {
        if (res.data && res.data.data) {
          // !有数据 填值
          this.getAutoStationDataByValue(res.data.data, getType, cl);
        } else {
          this.$notify.error({
            title: "error",
            message: "数据请求成功 暂无填值数据",
            duration: 1500
          });
        }
      });
    },
    // !填值 地球画点
    getAutoStationDataByValue(valueData, valueType, cl) {
      // 删除其他填值
      // this.delStationothers(valueType)
      var labels = new Cesium.LabelCollection();
      // 循环填值
      console.log(valueData);
      // 温度
      valueData.forEach(e => {
        console.log(e);
        labels.add({
          position: Cesium.Cartesian3.fromDegrees(e.lon - 0.1, e.lat - 0.1),
          text: "12",
          font: "20px Helvetica",
          fillColor: Cesium.Color.RED,
          outlineColor: Cesium.Color.RED,
          outlineWidth: 0.1,
          style: Cesium.LabelStyle.FILL_AND_OUTLINE,
          scale: 1.0
        });
        console.log(labels);
      });
      // 风压
      valueData.forEach(e => {
        console.log(e);
        labels.add({
          position: Cesium.Cartesian3.fromDegrees(e.lon + 0.1, e.lat + 0.1),
          text: "16",
          font: "20px Helvetica",
          fillColor: Cesium.Color.GREEN,
          outlineColor: Cesium.Color.GREEN,
          outlineWidth: 0.1,
          style: Cesium.LabelStyle.FILL_AND_OUTLINE,
          scale: 1.0
        });
        console.log(labels);
      });
      // 能见度
      valueData.forEach(e => {
        console.log(e);
        labels.add({
          position: Cesium.Cartesian3.fromDegrees(e.lon - 0.1, e.lat + 0.1),
          text: "16",
          font: "20px Helvetica",
          fillColor: Cesium.Color.BLUE,
          outlineColor: Cesium.Color.BLUE,
          outlineWidth: 0.1,
          style: Cesium.LabelStyle.FILL_AND_OUTLINE,
          scale: 1.0
        });
        console.log(labels);
      });
      // 气压
      valueData.forEach(e => {
        console.log(e);
        labels.add({
          position: Cesium.Cartesian3.fromDegrees(e.lon + 0.1, e.lat - 0.1),
          text: "16",
          font: "20px Helvetica",
          fillColor: Cesium.Color.WHITE,
          outlineColor: Cesium.Color.WHITE,
          outlineWidth: 0.1,
          style: Cesium.LabelStyle.FILL_AND_OUTLINE,
          scale: 1.0
        });
        console.log(labels);
      });

      labels._zIndex = 10000;
      window.earth.scene.primitives.add(labels);
      console.log("p", window.earth.scene.primitives);
    },
    // !色斑图数据获取
    getSplashMapDate() {
      console.log("获取色斑图数据");
      // !绘制色斑图
      this.drawSplashMapImg();
    },
    // !绘制色斑图数据整理
    drawSplashMapImg() {
      // !删除其他模块图层
      deleteImageLayers(1);
      // !删除填值以及其他数据
      clearStation();
      clearChannel();
      console.log("绘制色斑图数据");
      // !获取数据 this.$store.state.autoStation.splashMapUrl 色斑图接口地址 
      this.$get(this.$store.state.autoStation.splashMapUrl, {
        type: "温度",
        basic: 1,
        encrypt: 0,
        time: "2020-01-02 13:30:00"
      })
        .then(res => {
          console.log(res);
          // !移除其他所有贴图
          window.earth.scene.primitives.removeAll();
          // !色斑图容器定义
          const primitivelist = new Cesium.PrimitiveCollection();
          console.log(res.data.data.polygons);
          // !取出border
          let data = res.data.data.polygons
          // let data = res.data.data.polygons.filter(item => {
          //   return item.OutLine.Type === "Border";
          // });
          // !取出最后一个的LowValue
          let lowLevel = data[data.length - 1].LowValue
          // !取出间隔
          let intervals = res.data.data.intervals
          console.log(data)
          console.log(lowLevel)
          console.log(intervals)
          let nowLevel = 0
          for (let i = 0; i < intervals.length; i++) {
            nowLevel = i;
            if (intervals[i] > lowLevel) break;
          }
          // !设置对应颜色
          data.forEach((pl, index) => {
            // 对应设置颜色
            let value = pl.LowValue
            let num = 0
            let intervals = res.data.data.intervals
            for (let i = 0; i < intervals.length; i++) {
              num = i;
              if (intervals[i] > value) break;
            }
            let color = colorList[num]
            console.log(color)
            // 确定中心
            let level = Math.abs((num - nowLevel / 2) > 0 ? (num - nowLevel / 2) + 1 : (num - nowLevel / 2))
            let pos = []
            pl.OutLine.PointList.forEach(p => {
              // console.log(p.X && p.Y)
              if (p.X && p.Y) {
                pos.push(p.X)
                p.Y >= 90 ? pos.push(90 - p.Y) : pos.push(p.Y)
              }
            })
            let primitive = this.createPolygon(pos, color, level)
            primitivelist.add(primitive);
          })
          console.log(primitivelist);
          // !贴图
          window.earth.scene.primitives.add(primitivelist);
        })
        .catch(error => {
          this.$notify.error({
            title: "请求数据失败",
            message: error,
            duration: 1500
          });
          console.log("请求色斑图数据失败")
        });
    },
    // !绘制色斑图
    createPolygon(position, color, i) {
      i *= 500.0
      var polyOutLine = new Cesium.GeometryInstance({
        geometry: new Cesium.PolygonOutlineGeometry({
          // var polygon = new Cesium.PolygonOutlineGeometry({
          polygonHierarchy: {
            positions: Cesium.Cartesian3.fromDegreesArray(position),
          }
        }),
        attributes: {
          color: Cesium.ColorGeometryInstanceAttribute.fromColor(color),
        }
      })
      var polygon = new Cesium.GeometryInstance({
        geometry: new Cesium.PolygonGeometry({
          polygonHierarchy: {
            positions: Cesium.Cartesian3.fromDegreesArray(position),
          },
          // height: i,
          extrudedHeight: i
        }),
        attributes: {
          color: Cesium.ColorGeometryInstanceAttribute.fromColor(color),
        }
      })
      return new Cesium.Primitive({
        geometryInstances: [polygon, polyOutLine],
        // geometryInstances: [polygon],
        // geometryInstances: [polyOutLine],
        appearance: new Cesium.PerInstanceColorAppearance({
          flat: true,
          translucent: false
        })
      })
    },
  }
};
</script>
