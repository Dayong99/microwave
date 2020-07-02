import axios from '@/utils/axioz'
// 将获取到的图片转为base64 url图片URL dataType请求的数据类型
export function getCodeImage(url, dataType) {
  return axios({
    method: 'GET',
    url: url,
    responseType: dataType
  }).then(res => {
    return 'data:image/png;base64,' + btoa(
      // 8 位无符号整数值的类型化数组。内容将初始化为 0。如果无法分配请求数目的字节，则将引发异常。
      new Uint8Array(res.data)
      // fromCharCode 将 Unicode 编码转为一个字符:
        .reduce((data, byte) => data + String.fromCharCode(byte), '')
    )
  }).then((res) => {
    // 将转化后的base64字符返回
    return res
  }).catch((e) => {
    return null
  })
}
// resUrl 绘制的图片 layerIndex 图层位置 currentLayers 现有图层对象 viewer 构造器对象
export function drawMap(resUrl) {
  // 清除所有实体
  window.earth.entities.removeAll()
  // 如果resUrl没有值 则返回
  if (!resUrl) return
  // 添加影像图
  var imageryProvider = new Cesium.SingleTileImageryProvider({
    // 图片url
    url: resUrl,
    // 显示区域
    rectangle: new Cesium.Rectangle.fromDegrees(70, 5, 140, 54)
    // rectangle: new Cesium.Rectangle.fromDegrees(114.0, 29.0, 123.0, 36.0)
  })
  window.currentLayerName = window.earth.scene.imageryLayers.addImageryProvider(imageryProvider)
  // 透明度
  window.currentLayerName.alpha = Cesium.defaultValue(0.7, 0.5)
  // 是否显示
  window.currentLayerName.show = true
  // 显示
  Cesium.knockout.track(window.currentLayerName, ['alpha', 'show', 'name'])
  removeImgArray()
}
export function removeImgArray() {
  console.log(window.earth.imageryLayers._layers.length)
  if (window.earth.imageryLayers._layers.length == 4) {
    const arr = []
    window.earth.imageryLayers._layers.forEach(v => {
      arr.push(v)
    })
    console.log(window.earth.imageryLayers._layers)
    window.earth.imageryLayers.remove(arr[1])
  }
}

export function clearChannel() {
  if (window.earth.imageryLayers._layers) {
    window.earth.imageryLayers._layers.forEach(ele => {
      window.earth.imageryLayers.lowerToBottom(ele)
    })
    // this.currentLayers = []
  }
}
export function clearStation() {
  window.earth.entities.removeAll();
}
