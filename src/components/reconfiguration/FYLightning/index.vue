<template>
  <!-- eslint-disable -->
  <!-- 闪电仪对应的三级菜单 -->
  <div class="right-container FY-lightning">
    <ul class="right-wrap" >
      <li><span class="menuCont">闪电事件</span></li>
      <li><span class="menuCont">闪电组</span></li>
      <li><span class="menuCont">对比分析-闪电事件</span></li>
      <li><span class="menuCont">对比分析-闪电组</span></li>
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
import "@/styles/leftMenuTab.scss";
/* import siblings from "../../../public/js/sibling.js"; //  用于接收需要传递给兄弟组件的参数 */
/* import Tab from "./mixin/tab"; */
export default {
  /* mixins: [Tab], */
  data() {
    return {
      clicked: -1,
      // !闪电仪子菜单列表
      lightningList: this.$store.state.FY4.lightingMenuList
    };
  },
  methods: {
    // con菜单名称
    getMenu(index, con) {
      console.log(index, con);
      this.flightningCont = con;
      this.clicked = index;
      con = "风云四号" + con;
      this.$emit("ToLightning", con); // 兄弟组件传参  用不到 可删除
      /* siblings.$emit("productCont", con); // 将参数传给兄弟组件 */
      if (index < 4) {
        // !闪电仪数据获取
        console.log("闪电仪");
        this.getLightData(index);
      } else if (index > 3 && index < 8) {
        console.log("地基对比");
        // !地基对比
        this.getGroundData(index);
      }

      // !改变状态管理器flag 8闪电仪
      this.$store.commit("system/setCurrentModuleFlag", 8);
      // !闪电仪时间列表数据获取
      this.getTimeLineData();
    },
    // !获取数据
    getLightData(index) {
      let _Type = "10分钟";
      if (index == 0) {
        _Type = "10分钟";
      } else if (index == 1) {
        _Type = "1小时";
      } else if (index == 2) {
        _Type = "6小时";
      } else if (index == 3) {
        _Type = "24小时";
      }
      // !删除填值以及其他数据
      clearStation();
      clearChannel();
      // !删除window.earth.scene.primitives.removeAll();
      window.earth.scene.primitives.removeAll();
      // !根据不同值区间 赋予不同颜色
      this.$get("/fylighting/getData", {
        time: "2020-02-04 06:32:10",
        type: "LMIE",
        timeType: _Type
      }).then(res => {
        console.log(res);
        // ! 位置 打闪次数
        let positionArray = [],
          ligntValue = [];
        var obj = res.data.data;
        var result = Object.keys(obj).map(el => {
          return { [el]: obj[el] };
        });
        for (var i of result) {
          for (var k in i) {
            positionArray.push(k);
            ligntValue.push(i[k]);
          }
        }
        this.drawLight(positionArray, ligntValue);
      });
    },
    // !绘制闪电产品图
    drawLight(positionArray, ligntValue) {
      var instances = [];
      positionArray.map((i, index) => {
        const _i = i.split(",");
        // console.log(ligntValue[index])
        if (ligntValue[index] < 5) {
          instances.push(
            new Cesium.GeometryInstance({
              geometry: new Cesium.RectangleGeometry({
                rectangle: Cesium.Rectangle.fromDegrees(
                  _i[0],
                  _i[1],
                  _i[2],
                  _i[3]
                ),
                vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT
              }),
              attributes: {
                color: Cesium.ColorGeometryInstanceAttribute.fromColor(
                  new Cesium.Color(47 / 255, 59 / 255, 139 / 255, 1)
                )
              }
            })
          );
        } else if (ligntValue[index] > 5 && ligntValue[index] < 10) {
          instances.push(
            new Cesium.GeometryInstance({
              geometry: new Cesium.RectangleGeometry({
                rectangle: Cesium.Rectangle.fromDegrees(
                  _i[0],
                  _i[1],
                  _i[2],
                  _i[3]
                ),
                vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT
              }),
              attributes: {
                color: Cesium.ColorGeometryInstanceAttribute.fromColor(
                  new Cesium.Color(67 / 255, 33 / 255, 198 / 255, 1)
                )
              }
            })
          );
        } else if (ligntValue[index] > 10 && ligntValue[index] < 20) {
          instances.push(
            new Cesium.GeometryInstance({
              geometry: new Cesium.RectangleGeometry({
                rectangle: Cesium.Rectangle.fromDegrees(
                  _i[0],
                  _i[1],
                  _i[2],
                  _i[3]
                ),
                vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT
              }),
              attributes: {
                color: Cesium.ColorGeometryInstanceAttribute.fromColor(
                  new Cesium.Color(105 / 255, 200 / 255, 192 / 255, 1)
                )
              }
            })
          );
        } else if (ligntValue[index] > 20 && ligntValue[index] < 30) {
          instances.push(
            new Cesium.GeometryInstance({
              geometry: new Cesium.RectangleGeometry({
                rectangle: Cesium.Rectangle.fromDegrees(
                  _i[0],
                  _i[1],
                  _i[2],
                  _i[3]
                ),
                vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT
              }),
              attributes: {
                color: Cesium.ColorGeometryInstanceAttribute.fromColor(
                  new Cesium.Color(230 / 255, 229 / 255, 32 / 255, 1)
                )
              }
            })
          );
        } else {
          instances.push(
            new Cesium.GeometryInstance({
              geometry: new Cesium.RectangleGeometry({
                rectangle: Cesium.Rectangle.fromDegrees(
                  _i[0],
                  _i[1],
                  _i[2],
                  _i[3]
                ),
                vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT
              }),
              attributes: {
                color: Cesium.ColorGeometryInstanceAttribute.fromColor(
                  new Cesium.Color(245 / 255, 120 / 255, 30 / 255, 1)
                )
              }
            })
          );
        }
      });

      window.earth.scene.primitives.add(
        new Cesium.Primitive({
          geometryInstances: instances,
          appearance: new Cesium.PerInstanceColorAppearance()
        })
      );
    },
    // !获取闪电仪有数据的时间列表
    getTimeLineData(index) {
      const _timeType = "10分钟";
      if (index == 0) {
        _timeType = "10分钟";
      } else if (index == 1) {
        _timeType = "1小时";
      } else if (index == 2) {
        _timeType = "6小时";
      } else if (index == 3) {
        _timeType = "24小时";
      }
      const _currentTime = this.$moment().format("YYYY-MM-DD HH:mm:ss");
      // !闪电仪请求时间列表
      this.$get(this.$store.state.FY4.lightingTimeUrl, {
        time: "2020-02-04 04:00:00",
        type: "LMIE",
        timeType: _timeType
      }).then(res => {
        console.log(res);
        // !时间列表去T
        const _currentDayTimeList = res.data.data.map(i => {
          return i.replace("T", " ");
        });
        console.log(_currentDayTimeList);
        const _activeIndex = _currentDayTimeList.length - 1;
        // !将风云四号成像仪的时间列表传给时间轴显示
        this.$store.commit(
          "timeLine/setCurrentDayTimeList",
          _currentDayTimeList
        );
        // !将风云四号成像仪当前激活的时间点传给时间轴
        this.$store.commit("timeLine/setActiveIndex", _activeIndex);
      });
    },
    getGroundData(index) {
      const _index = index - 4;
      let _Type = "10分钟";
      if (_index == 0) {
        _Type = "10分钟";
      } else if (_index == 1) {
        _Type = "1小时";
      } else if (_index == 2) {
        _Type = "6小时";
      } else if (_index == 3) {
        _Type = "24小时";
      }
      // !删除填值以及其他数据
      clearStation();
      clearChannel();
      // !删除window.earth.scene.primitives.removeAll();
      window.earth.scene.primitives.removeAll();
      // !根据不同值区间 赋予不同颜色
      this.$get("groundligthing/data", {
        time: "2020-01-10 09:20:00",
        type: _Type
      })
        .then(res => {
          // !地基对比
          console.log("地基对比", res.data.data);
          // ! 位置 打闪次数
          let positionArray = [],
            groundValue = [];
          var obj = res.data.data;
          var result = Object.keys(obj).map(el => {
            return { [el]: obj[el] };
          });
          for (var i of result) {
            for (var k in i) {
              positionArray.push(k);
              groundValue.push(i[k]);
            }
          }
          console.log("getGroundData -> positionArray", positionArray);
          console.log("getGroundData -> groundValue", groundValue);
          this.drawGround(positionArray, groundValue);
        })
        .catch(error => {
          console.log(error);
        });
    },
    // !绘制地基对比图
    drawGround(positionArray, groundValue) {
      var instances = [];
      positionArray.map((i, index) => {
        const _i = i.split(",");
        if (groundValue[index] < 5) {
          instances.push(
            new Cesium.GeometryInstance({
              geometry: new Cesium.RectangleGeometry({
                rectangle: Cesium.Rectangle.fromDegrees(
                  _i[1],
                  _i[0],
                  _i[3],
                  _i[2]
                ),
                vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT
              }),
              attributes: {
                color: Cesium.ColorGeometryInstanceAttribute.fromColor(
                  new Cesium.Color(47 / 255, 59 / 255, 139 / 255, 1)
                )
              }
            })
          );
        } else if (groundValue[index] > 5 && groundValue[index] < 10) {
          instances.push(
            new Cesium.GeometryInstance({
              geometry: new Cesium.RectangleGeometry({
                rectangle: Cesium.Rectangle.fromDegrees(
                  _i[1],
                  _i[0],
                  _i[3],
                  _i[2]
                ),
                vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT
              }),
              attributes: {
                color: Cesium.ColorGeometryInstanceAttribute.fromColor(
                  new Cesium.Color(67 / 255, 33 / 255, 198 / 255, 1)
                )
              }
            })
          );
        } else if (groundValue[index] > 10 && groundValue[index] < 20) {
          instances.push(
            new Cesium.GeometryInstance({
              geometry: new Cesium.RectangleGeometry({
                rectangle: Cesium.Rectangle.fromDegrees(
                  _i[1],
                  _i[0],
                  _i[3],
                  _i[2]
                ),
                vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT
              }),
              attributes: {
                color: Cesium.ColorGeometryInstanceAttribute.fromColor(
                  new Cesium.Color(105 / 255, 200 / 255, 192 / 255, 1)
                )
              }
            })
          );
        } else if (groundValue[index] > 20 && groundValue[index] < 30) {
          instances.push(
            new Cesium.GeometryInstance({
              geometry: new Cesium.RectangleGeometry({
                rectangle: Cesium.Rectangle.fromDegrees(
                  _i[1],
                  _i[0],
                  _i[3],
                  _i[2]
                ),
                vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT
              }),
              attributes: {
                color: Cesium.ColorGeometryInstanceAttribute.fromColor(
                  new Cesium.Color(230 / 255, 229 / 255, 32 / 255, 1)
                )
              }
            })
          );
        } else {
          instances.push(
            new Cesium.GeometryInstance({
              geometry: new Cesium.RectangleGeometry({
                rectangle: Cesium.Rectangle.fromDegrees(
                  _i[1],
                  _i[0],
                  _i[3],
                  _i[2]
                ),
                vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT
              }),
              attributes: {
                color: Cesium.ColorGeometryInstanceAttribute.fromColor(
                  new Cesium.Color(245 / 255, 120 / 255, 30 / 255, 1)
                )
              }
            })
          );
        }
      });

      window.earth.scene.primitives.add(
        new Cesium.Primitive({
          geometryInstances: instances,
          appearance: new Cesium.PerInstanceColorAppearance()
        })
      );
    }
  }
};
</script>
<style scoped lang="scss">
.right-container {
  .right-wrap {
    .el-divider__text.is-center {
      background: #496069;
      color: #ffffff;
    }
  }
}
</style>
