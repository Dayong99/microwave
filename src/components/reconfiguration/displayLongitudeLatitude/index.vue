<template>
  <!-- eslint-disable -->
  <div id="latlng_show">
    <img :src="require('@/assets/images/menus/position.png')"  style="width:28px;float:left;" />
    <div style="width:100px;height:30px;float:left;">
      <font size="3" color="white">
        <span id="longitude_show">{{longitudeDate || "----"}}</span>
      </font>
    </div>
    <div style="width:100px;height:30px;float:left;">
      <font size="3" color="white">
        <span id="latitude_show">{{latitudeData || "----"}}</span>
      </font>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
export default {
  data() {
    return {
      // 经度绑定值
      longitudeDate: "",
      // 纬度绑定值
      latitudeData: ""
    };
  },
  mounted() {
    const _ = this;
    setTimeout(function() {
      _.displayLongitudeLatitude();
    }, 1000);
  },
  methods: {
    displayLongitudeLatitude() {
      var ellipsoid = window.earth.scene.globe.ellipsoid;
      var handler = new Cesium.ScreenSpaceEventHandler(
        window.earth.scene.canvas
      );
      handler.setInputAction(movement => {
        var cartesian = window.earth.camera.pickEllipsoid(
          movement.endPosition,
          ellipsoid
        );
        if (cartesian) {
          var cartographic = window.earth.scene.globe.ellipsoid.cartesianToCartographic(
            cartesian
          );
          var lat = Cesium.Math.toDegrees(cartographic.latitude).toFixed(6);
          var lng = Cesium.Math.toDegrees(cartographic.longitude).toFixed(6);
          // 经纬度格式化
          var latdegree = Math.abs(parseInt(lat));
          var latminute = parseInt((Math.abs(lat) - latdegree) * 60);
          var latsecond = parseInt(
            ((Math.abs(lat) - latdegree) * 60 - latminute) * 60
          );
          lat =
            lat < 0
              ? latdegree + "°" + latminute + "′" + latsecond + "″" + "S"
              : latdegree + "°" + latminute + "′" + latsecond + "″" + "N";
          // console.log(lat)
          var lngdegree = Math.abs(parseInt(lng));
          var lngminute = parseInt((Math.abs(lng) - lngdegree) * 60);
          var lngsecond = parseInt(
            ((Math.abs(lng) - lngdegree) * 60 - lngminute) * 60
          );
          lng =
            lng < 0
              ? lngdegree + "°" + lngminute + "′" + lngsecond + "″" + "W"
              : lngdegree + "°" + lngminute + "′" + lngsecond + "″" + "E";
          this.longitudeDate = lng;
          this.latitudeData = lat;
          this.$store.commit("titleAndParameter/setLongitudeDateLatitudeData", [
            lng,
            lat
          ]);
        }
      }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
    }
  }
};
</script>

<style lang="scss" scoped>
#latlng_show {
  height: 30px;
  position: absolute;
  left: 30px;
  bottom: 60px;
  line-height: 30px;
  color: #ffffff;
  border-radius: 5px;
  font-size: 12px;
}
</style>