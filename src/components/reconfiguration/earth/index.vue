<template>
  <!-- eslint-disable -->
  <div>
    <div id="cesiumContainer" />
  </div>
</template>
<script>
/* eslint-disable */
export default {
  data() {
    return {
      // !是否显示信息窗口
      infoShow: true,
      // !绑定值
      radio: "探空雷达"
    };
  },
  methods: {
    initCesium() {
      Cesium.Ion.defaultAccessToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIwODc0NzJkOS1jNTJkLTRmZjAtOTRiOC02MzliZDdhYWE3MDgiLCJpZCI6MjM3NDcsInNjb3BlcyI6WyJhc3IiLCJhc3ciLCJnYyJdLCJpYXQiOjE1ODM5MzgzMDB9.43324p5Q5zhfHpfrt8bHeZmmoK2stZAVgPB8d1WO8Iw";
      window.earth = new Cesium.Viewer(
        "cesiumContainer",
        this.$store.state.earth.baseViewer
      );
      // !fps
      window.earth.scene.debugShowFramesPerSecond = true;
      // !边界
      // window.earth.dataSources.add(
      //   Cesium.GeoJsonDataSource.load(
      //     "../../../public/geojson/china-geo.json",
      //     {
      //       stroke: Cesium.Color.YELLOW.withAlpha(1),
      //       strokeWidth: 6.0,
      //       fill: Cesium.Color.RED.withAlpha(0)
      //     }
      //   )
      // );
      // !全球国界
      // window.earth.scene.imageryLayers.addImageryProvider(
      //   new Cesium.WebMapTileServiceImageryProvider({
      //     url:
      //       "http://t0.tianditu.gov.cn/ibo_w/wmts?service=wmts&request=GetTile&version=1.0.0" +
      //       "&LAYER=ibo&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}" +
      //       "&style=default&format=tiles&tk=c77ff55fbeec6f05de4685b93f816b9a"
      //   })
      // ),
      // geojson国界
      window.earth.dataSources.add(
        Cesium.GeoJsonDataSource.load("./geojson/japan.geojson", {
          stroke: Cesium.Color.YELLOW.withAlpha(1),
          strokeWidth: 6.0,
          fill: Cesium.Color.RED.withAlpha(0)
        })
      );
      window.earth.dataSources.add(
        Cesium.GeoJsonDataSource.load("./geojson/china.geojson", {
          stroke: Cesium.Color.YELLOW.withAlpha(1),
          strokeWidth: 6.0,
          fill: Cesium.Color.RED.withAlpha(0)
        })
      );
      window.earth.dataSources.add(
        Cesium.GeoJsonDataSource.load("./geojson/KOR.geojson", {
          stroke: Cesium.Color.YELLOW.withAlpha(1),
          strokeWidth: 6.0,
          fill: Cesium.Color.RED.withAlpha(0)
        })
      );
      window.earth.dataSources.add(
        Cesium.GeoJsonDataSource.load("./geojson/PRK.geojson", {
          stroke: Cesium.Color.YELLOW.withAlpha(1),
          strokeWidth: 6.0,
          fill: Cesium.Color.RED.withAlpha(0)
        })
      );
      // !场景天空盒
      window.earth.scene.skyBox.show = true;
      // !背景颜色
      // window.earth.scene.backgroundColor = new Cesium.Color(0.0, 0.0, 0.0, 0.0)
      // !隐藏左下角logo
      window.earth._cesiumWidget._creditContainer.style.display = "none";
      // !摄像头位置 3D下
      // window.earth.camera.setView({
      //   destination: Cesium.Cartesian3.fromDegrees(111.07, 39.05, 10000),
      //   orientation: {
      //     heading: Cesium.Math.toRadians(0),
      //     pitch: Cesium.Math.toRadians(-90),
      //     roll: Cesium.Math.toRadians(0)
      //   }
      // });

      window.earth.camera.setView({
        destination: Cesium.Cartesian3.fromDegrees(
          127.5,
          38,
         10000000.0
        ) // 定位坐标点，建议使用谷歌地球坐标位置无偏差
      });
      // !2D显示
      window.earth.scene.morphTo2D(0);
      // !关闭光源于阴影
      window.earth.scene.globe.enableLighting = false;
      // !关闭阴影
      window.earth.shadows = false;
      // // !初始化的镜头、视角 鼠标监听
      // var handler = new Cesium.ScreenSpaceEventHandler(window.earth.scene.canvas)
      // todo 站点分布
      /* handler.setInputAction((evt) => {
        // !添加单击监听事件
        var pick = window.earth.scene.pick(evt.position)
        if (this.stationData.length) {
          const setData = this.stationData
          for (let i = 0; i < setData.length; i++) {
            if (Cesium.defined(pick) && pick.id.comments == 'event' + setData[i].id) {
              this.stationPop(pick.id.menuType, pick.id.img)
            }
          }
        }
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK) */
      // ? 蓝黑  地球表面覆盖
      /* window.earth.scene.imageryLayers.addImageryProvider(new Cesium.UrlTemplateImageryProvider({
        url: 'http://192.168.1.2:8301/map/server/GeoQ_purplishBlue/{z}/{y}/{x}',
        credit: '',
        minimumLevel: 0
      })); */
      /* // ? 彩色  地球表面覆盖
      window.earth.scene.imageryLayers.addImageryProvider(new Cesium.UrlTemplateImageryProvider({
        url: 'http://192.168.1.2:8301/map/server/GeoQ_colors/{z}/{y}/{x}',
        credit: '',
        minimumLevel: 0
      })); */
      // !储存当前图层
      var layers = window.earth.scene.imageryLayers;
      // !获取当前镜头位置的笛卡尔坐标
      const cameraPos = window.earth.camera.position;

      // !获取当前坐标系标准
      const ellipsoid = window.earth.scene.globe.ellipsoid;
      // !根据坐标系标准，将笛卡尔坐标转换为地理坐标
      this.cartographic = ellipsoid.cartesianToCartographic(cameraPos);

      // !获取镜头的高度 滚轮
      this.cameraHeight = this.cartographic.height;
    }
  },
  mounted() {
    // !初始化地球
    this.initCesium();
  },
  watch: {
    infoLeft() {
      console.log("距离左边变化");
    }
  },
  computed: {}
};
</script>
<style lang="scss" scoped>
html,
body,
#cesiumContainer {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
</style>