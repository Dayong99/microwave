/* eslint-disable */
/* jshint esversion: 6 */
import axios from '@/utils/axioz';
/*
  当前图层大于指定层数删除顶层
*/
export function removeImgArray(num) {
  // console.log(window.earth.imageryLayers._layers.length)
  if (window.earth.imageryLayers._layers.length == num) {
    const arr = [];
    window.earth.imageryLayers._layers.forEach(v => {
      arr.push(v);
    });
    console.log(window.earth.imageryLayers._layers);
    window.earth.imageryLayers.remove(arr[1]);
  }
}
/* 
  删除当前图层 传参为保留的图层数量
*/
export function deleteImageLayers(num) {
  if (window.earth.imageryLayers._layers.length > num) {
    const arr = [];
    window.earth.imageryLayers._layers.forEach(v => {
      arr.push(v);
    });
    arr.shift();
    for (let i = 0; i < arr.length; i++) {
      window.earth.imageryLayers.remove(arr[i]);
    }
  }
}
/* 
  将获取到的图片转为base64 url图片URL dataType请求的数据类型
*/
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
    return res;
  }).catch((e) => {
    return null;
  });
}

// 删除图层 index 删除的图层编号
export function removeLayer(index) {
  // console.log('当前删除的是'+index)

  window.earth.imageryLayers.remove(this.layers[index]);
}
