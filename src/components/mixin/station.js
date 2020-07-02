import axios from '@/utils/axioz'
import {
  getCodeImage,
  drawMap,
  removeImgArray,
  clearChannel,
  clearStation
} from '@/utils/requestImg'
export default {
  data() {
    return {
      tempStation: {
        colorBlock: {},
        writeValue: {},
        prevType: {
          index: '',
          sub: ''
        },
        nextType: {
          index: '',
          sub: ''
        }
      }
    }
  },
  destroyed() {
    this.tempStation = {
      colorBlock: {},
      writeValue: {}
    }
  },
  computed: {
    colorChange() {
      return this.$store.state.system.stationActionColor
    },
    // 当前点击的探空雷达站点项变化
    // ValueChange() {
    //   // 左侧菜单点击的列表站点信息变化
    //   return this.$store.state.system.stationActionWriteValue
    // }
  },
  watch: {
    colorChange: function(newV, v) {
      this.colorBlockSingleAction()
    },
    ValueChange: function(newV, v) {
      this.writeValueSingleAction();
    }
  },
  methods: {
    clearMapOfStation() {
      window.earth.scene.primitives.removeAll()
      console.log('map clear')
    },
    writeValueSingleAction() {
      
      const hasStation = this.$store.state.system.stationActionStore
      console.log(hasStation)
      this.getAutoStationDataByType(hasStation.colorBlockType, hasStation.indexT, hasStation.isCloseActive);
    },
    // 左侧菜单站点信息变化
    colorBlockSingleAction() {
      console.log("老方法色斑")
      const hasStation = this.$store.state.system.stationActionStore;
      // 获取自动站渲染图片数据
      this.getAutoStationDataByType(hasStation.colorBlockType, hasStation.indexT, hasStation.isCloseActive)
    },
    // 获取自动站渲染图片数据
    getAutoStationDataByType(getType, WValIndex, cl) { // 色斑、填值
      // 清除点击其他模块的底图信息
      clearStation()
      clearChannel()
      console.log(getType, WValIndex, cl)
      if (WValIndex == 0) {
        const staticUrl = 'autostation/show?type=温度&time=2020-01-02 13:30:00&basic=1&encrypt=0'
        axios({
          method: 'GET',
          url: staticUrl,
          responseType: 'json'
        }).then(res => {
          if (res.data && res.data.data) {
            // this.loading = false
            this.getAutoStationDataByValue(res.data.data, getType, WValIndex, cl)
          } else {
            var lv = this.tempStation.writeValue[getType]
            if (window.earth.scene.primitives.contains(lv)) {
              window.earth.scene.primitives.remove(lv)
            }
          }
        }).catch((e) => {
          var lv = this.tempStation.writeValue[getType]
          if (window.earth.scene.primitives.contains(lv)) {
            window.earth.scene.primitives.remove(lv)
          }
        })
      } else {
        const staticUrl = 'autostation/polygons?type=温度&time=2020-01-02 13:30:00&basic=1&encrypt=0'
        axios({
          method: 'GET',
          url: staticUrl,
          responseType: 'json'
        }).then(res => {
          if (res.data && res.data.data) {
            // this.loading = false
            // 如果请求的数组有色斑图数据 则绘制色斑图
            this.getStationColorBlock(res.data.data, getType, WValIndex, cl)
          } else {
            var lv = this.tempStation.colorBlock[getType]
            if (window.earth.scene.primitives.contains(lv)) {
              window.earth.scene.primitives.remove(lv)
            }
          }
        }).catch((e) => {
          var lv = this.tempStation.colorBlock[getType]
          if (window.earth.scene.primitives.contains(lv)) {
            window.earth.scene.primitives.remove(lv)
          }
        })
      }
    },

    getKrigWeight() {
      return {
        '温度': 'tempreture',
        '气压': 'perssure',
        '相对湿度': '',
        '风向风速': 'speedwind',
        '能见度': 'visibility'
      }
    },
    getTempratureColorList() {
      const tempList = []
      tempList.push(new Cesium.Color(2 / 255, 12 / 255, 100 / 255, 1))
      tempList.push(new Cesium.Color(7 / 255, 30 / 255, 120 / 255, 1))
      tempList.push(new Cesium.Color(17 / 255, 49 / 255, 130 / 255, 1))
      tempList.push(new Cesium.Color(27 / 255, 68 / 255, 159 / 255, 1))
      tempList.push(new Cesium.Color(38 / 255, 87 / 255, 179 / 255, 1))
      tempList.push(new Cesium.Color(48 / 255, 106 / 255, 199 / 255, 1))
      tempList.push(new Cesium.Color(59 / 255, 126 / 255, 219 / 255, 1))
      tempList.push(new Cesium.Color(78 / 255, 138 / 255, 221 / 255, 1))
      tempList.push(new Cesium.Color(97 / 255, 150 / 255, 224 / 255, 1))
      tempList.push(new Cesium.Color(116 / 255, 163 / 255, 226 / 255, 1))
      tempList.push(new Cesium.Color(135 / 255, 175 / 255, 229 / 255, 1))
      tempList.push(new Cesium.Color(155 / 255, 188 / 255, 232 / 255, 1))
      tempList.push(new Cesium.Color(154 / 255, 196 / 255, 220 / 255, 1))
      tempList.push(new Cesium.Color(153 / 255, 205 / 255, 208 / 255, 1))
      tempList.push(new Cesium.Color(152 / 255, 214 / 255, 196 / 255, 1))
      tempList.push(new Cesium.Color(151 / 255, 232 / 255, 173 / 255, 1))
      tempList.push(new Cesium.Color(215 / 255, 222 / 255, 126 / 255, 1))
      tempList.push(new Cesium.Color(234 / 255, 219 / 255, 112 / 255, 1))
      tempList.push(new Cesium.Color(244 / 255, 217 / 255, 99 / 255, 1))
      tempList.push(new Cesium.Color(250 / 255, 204 / 255, 79 / 255, 1))
      tempList.push(new Cesium.Color(247 / 255, 180 / 255, 45 / 255, 1))
      tempList.push(new Cesium.Color(242 / 255, 155 / 255, 0 / 255, 1))
      tempList.push(new Cesium.Color(241 / 255, 147 / 255, 3 / 255, 1))
      tempList.push(new Cesium.Color(240 / 255, 132 / 255, 10 / 255, 1))
      tempList.push(new Cesium.Color(239 / 255, 117 / 255, 17 / 255, 1))
      tempList.push(new Cesium.Color(238 / 255, 102 / 255, 24 / 255, 1))
      tempList.push(new Cesium.Color(238 / 255, 88 / 255, 31 / 255, 1))
      tempList.push(new Cesium.Color(231 / 255, 75 / 255, 26 / 255, 1))
      tempList.push(new Cesium.Color(224 / 255, 63 / 255, 22 / 255, 1))
      tempList.push(new Cesium.Color(217 / 255, 51 / 255, 18 / 255, 1))
      tempList.push(new Cesium.Color(208 / 255, 36 / 255, 14 / 255, 1))
      tempList.push(new Cesium.Color(194 / 255, 0 / 255, 3 / 255, 1))
      tempList.push(new Cesium.Color(181 / 255, 1 / 255, 9 / 255, 1))

      return tempList
    },
    getPressColorList() {
      const tempList = []
      tempList.push(new Cesium.Color(84 / 255, 64 / 255, 182 / 255, 1))
      tempList.push(new Cesium.Color(67 / 255, 73 / 255, 201 / 255, 1))
      tempList.push(new Cesium.Color(77 / 255, 102 / 255, 210 / 255, 1))
      tempList.push(new Cesium.Color(87 / 255, 117 / 255, 213 / 255, 1))
      tempList.push(new Cesium.Color(79 / 255, 151 / 255, 225 / 255, 1))
      tempList.push(new Cesium.Color(132 / 255, 185 / 255, 251 / 255, 1))
      tempList.push(new Cesium.Color(115 / 255, 225 / 255, 231 / 255, 1))
      tempList.push(new Cesium.Color(171 / 255, 247 / 255, 235 / 255, 1))
      tempList.push(new Cesium.Color(203 / 255, 251 / 255, 218 / 255, 1))
      tempList.push(new Cesium.Color(238 / 255, 253 / 255, 202 / 255, 1))
      tempList.push(new Cesium.Color(249 / 255, 250 / 255, 213 / 255, 1))
      tempList.push(new Cesium.Color(252 / 255, 242 / 255, 172 / 255, 1))
      tempList.push(new Cesium.Color(253 / 255, 227 / 255, 125 / 255, 1))
      tempList.push(new Cesium.Color(252 / 255, 200 / 255, 101 / 255, 1))
      tempList.push(new Cesium.Color(250 / 255, 166 / 255, 68 / 255, 1))
      tempList.push(new Cesium.Color(250 / 255, 146 / 255, 0 / 255, 1))

      return tempList
    },
    getRelativeWetColorList() {
      const tempList = []
      tempList.push(new Cesium.Color(151 / 255, 232 / 255, 173 / 255, 1))
      tempList.push(new Cesium.Color(153 / 255, 210 / 255, 202 / 255, 1))
      tempList.push(new Cesium.Color(155 / 255, 188 / 255, 232 / 255, 1))
      tempList.push(new Cesium.Color(107 / 255, 157 / 255, 225 / 255, 1))
      tempList.push(new Cesium.Color(59 / 255, 126 / 255, 219 / 255, 1))
      tempList.push(new Cesium.Color(43 / 255, 92 / 255, 194 / 255, 1))
      tempList.push(new Cesium.Color(28 / 255, 59 / 255, 169 / 255, 1))
      tempList.push(new Cesium.Color(17 / 255, 44 / 255, 144 / 255, 1))
      tempList.push(new Cesium.Color(7 / 255, 30 / 255, 120 / 255, 1))
      tempList.push(new Cesium.Color(0 / 255, 15 / 255, 80 / 255, 1))

      return tempList
    },
    getWindColorList() {
      const tempList = []
      tempList.push(new Cesium.Color(151 / 255, 232 / 255, 173 / 255, 1))
      tempList.push(new Cesium.Color(153 / 255, 210 / 255, 202 / 255, 1))
      tempList.push(new Cesium.Color(155 / 255, 188 / 255, 232 / 255, 1))
      tempList.push(new Cesium.Color(107 / 255, 157 / 255, 225 / 255, 1))
      tempList.push(new Cesium.Color(59 / 255, 126 / 255, 219 / 255, 1))
      tempList.push(new Cesium.Color(43 / 255, 92 / 255, 194 / 255, 1))
      tempList.push(new Cesium.Color(28 / 255, 59 / 255, 169 / 255, 1))
      tempList.push(new Cesium.Color(17 / 255, 44 / 255, 144 / 255, 1))
      tempList.push(new Cesium.Color(7 / 255, 30 / 255, 120 / 255, 1))
      tempList.push(new Cesium.Color(70 / 255, 25 / 255, 129 / 255, 1))
      tempList.push(new Cesium.Color(134 / 255, 21 / 255, 138 / 255, 1))
      tempList.push(new Cesium.Color(200 / 255, 17 / 255, 169 / 255, 1))

      return tempList
    },
    getVisibleColorList() {
      const tempList = []
      tempList.push(new Cesium.Color(108 / 255, 390 / 255, 0 / 255, 1))
      tempList.push(new Cesium.Color(147 / 255, 4 / 255, 244 / 255, 1))
      tempList.push(new Cesium.Color(252 / 255, 0 / 255, 0 / 255, 1))
      tempList.push(new Cesium.Color(255 / 255, 91 / 255, 0 / 255, 1))
      tempList.push(new Cesium.Color(255 / 255, 175 / 255, 62 / 255, 1))
      tempList.push(new Cesium.Color(255 / 255, 251 / 255, 0 / 255, 1))
      tempList.push(new Cesium.Color(109 / 255, 255 / 255, 48 / 255, 1))
      tempList.push(new Cesium.Color(149 / 255, 216 / 255, 255 / 255, 1))
      tempList.push(new Cesium.Color(196 / 255, 239 / 255, 255 / 255, 1))
      tempList.push(new Cesium.Color(255 / 255, 255 / 255, 255 / 255, 1))

      return tempList
    },
    // 绘制色斑图
    getStationColorBlock(blockData, colorSwitch, WValIndex, cl) { // 色斑
      // 删除其他站点数据
      this.delStationothers(colorSwitch)
      if (this.tempStation.prevType.sub != '' && this.tempStation.prevType.sub == colorSwitch) {
        if (this.tempStation.prevType.index == WValIndex) { return }
      }
      // 根据选择的参数为color赋值
      var colors = []
      if (colorSwitch == '温度') {
        colors = this.getTempratureColorList()
      } else if (colorSwitch == '气压') {
        colors = this.getPressColorList()
      } else if (colorSwitch == '相对湿度') {
        colors = this.getRelativeWetColorList()
      } else if (colorSwitch == '风向风速') {
        colors = this.getWindColorList()
      } else if (colorSwitch == '能见度') {
        colors = this.getVisibleColorList()
      }
      // 创建一个有多个Primitive的集合
      var primitivelist = new Cesium.PrimitiveCollection()
      // 遍历返回数据的polygons
      blockData.polygons.forEach(pl => {
        const value = pl.OutLine.Value
        let num = 0
        for (let index = 0; index < blockData.intervals.length; index++) {
          const element = blockData.intervals[index]
          if (element > value) {
            num = index
            break
          }
        }

        const color = colors[num] // Cesium.Color.fromCssColorString(colors[num])
        const pos = []
        pl.OutLine.PointList.forEach(p => {
          pos.push(p.X)
          pos.push(p.Y)
        })
        // 创建多边形
        var polygon = new Cesium.PolygonGeometry({
          polygonHierarchy: new Cesium.PolygonHierarchy(
            Cesium.Cartesian3.fromDegreesArray(pos)
          )
        })
        var geometry = Cesium.PolygonGeometry.createGeometry(polygon)
        const primitive = new Cesium.Primitive({
          geometryInstances: new Cesium.GeometryInstance({
            geometry: geometry,
            attributes: {
              color: Cesium.ColorGeometryInstanceAttribute.fromColor(colors[num])
            }
          }),
          appearance: new Cesium.PolylineColorAppearance({
            translucent: false
          })
        })
        primitivelist.add(primitive)
      })
      console.log(primitivelist)
      primitivelist._zIndex = 1001
      if (this.tempStation.colorBlock[colorSwitch]) {

      } else {
        this.tempStation.colorBlock[colorSwitch] = primitivelist
      }
      if (cl) {
        window.earth.scene.primitives.remove(this.tempStation.colorBlock[colorSwitch])
      } else {
        window.earth.scene.primitives.add(primitivelist)
      }

      console.log(window.earth.scene.primitives, '11100111')
      this.tempStation.prevType.index = WValIndex
      this.tempStation.prevType.sub = colorSwitch
    },
    getAutoStationDataByValue(valueData, valueType, WValIndex, cl) { // 填值
      // window.earth.entities.add({
      //     position: Cesium.Cartesian3.fromDegrees(118, 32),
      //     label: {
      //       text: "35.2",
      //       font: "12px Helvetica",
      //       fillColor: Cesium.Color.BLACK ,
      //       outlineColor: Cesium.Color.BLACK,
      //       outlineWidth: 2,
      //       style: Cesium.LabelStyle.FILL_AND_OUTLINE,
      //       scale:1.0
      //     },
      //   });
      this.delStationothers(valueType)
      var labels = new Cesium.LabelCollection()
      valueData.forEach((e, i, arr) => {
        const v = e[this.getKrigWeight()[valueType]]
        labels.add({
          position: Cesium.Cartesian3.fromDegrees(e.lon, e.lat),
          text: v + '',
          font: '12px Helvetica',
          fillColor: Cesium.Color.BLACK,
          outlineColor: Cesium.Color.BLACK,
          outlineWidth: 2,
          style: Cesium.LabelStyle.FILL_AND_OUTLINE,
          scale: 1.0
        })
      })
      labels._zIndex = 10000
      if (this.tempStation.writeValue[valueType]) {

      } else {
        this.tempStation.writeValue[valueType] = labels
      }
      if (cl) {
        window.earth.scene.primitives.add(labels)
      } else {
        window.earth.scene.primitives.remove(this.tempStation.writeValue[valueType])
      }
      console.log(window.earth.scene.primitives, '11100112')
    },
    delStationothersdelStationothers(type) {
      // 删除其它填值
      for (const i in this.tempStation.writeValue) {
        if (i == type) {} else {
          window.earth.scene.primitives.remove(this.tempStation.writeValue[i])
          this.tempStation.writeValue[i] = null
        }
      }

      // 删除其它色斑图
      for (const j in this.tempStation.colorBlock) {
        if (j == type) {} else {
          window.earth.scene.primitives.remove(this.tempStation.colorBlock[j])
          this.tempStation.colorBlock[j] = null
        }
      }
    }
  }
}
