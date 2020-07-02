// 时间轴
// 计算数组
const computationalDateArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
// 时间轴时间间隔
const timeInterval = 5
// 时间轴刻度数量
const timeAxisTicksNumber = 8
// 播放速度
const playSpeed = 1500
// 播放速度选项
const speedOptions = [
  { name: '200ms', value: '200' },
  { name: '500ms', value: '500' },
  { name: '1s', value: '1000' },
  { name: '4s', value: '4000' }
]
// 默认速度值
const speedValue = '1s'
// 时间间隔列表
const itemTags = [
  { name: '5min', value: '5' },
  { name: '30min', value: '30' },
  { name: '60min', value: '60' },
  { name: '180min', value: '180' }
]
// 当前时间间隔
const currentItemTags = '5'
export {
  computationalDateArray,
  timeInterval,
  timeAxisTicksNumber,
  playSpeed,
  speedOptions,
  speedValue,
  itemTags,
  currentItemTags
}
