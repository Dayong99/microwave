// 点击的模块类型
const moduleType = [
  // 1风云四号 成像仪
  "卫星FY4A",
  // 2葵花八号 成像仪
  "卫星H8",
  // 3 雷达组合反射率
  "雷达组合反射率",
  // 4 雷达降水估计
  "雷达降水估计",
  // 5 风云四号探测仪2D
  "卫星FY4A探测仪2D"
];
// 点击的详细参数
const detailedParameters = [
  // 1风云四号成像仪详细参数
  [
    '可见光',
    '可见光',
    '近红外',
    '短波红外',
    '短波红外',
    '短波红外',
    '中波红外(高)',
    '中波红外(低)',
    '高层水汽',
    '中层水汽',
    '长波红外',
    '长波红外',
    '长波红外',
    '长波红外',
    '真彩色',
    '自然色',
    '雾/雪',
    '强风暴',
    '对流云',
    '沙尘',
    '气团',
    '火山灰',
    '白天微物理特征',
    '夜间微物理特征',
    '白天对流风暴'
  ],
  // 2葵花八号详细参数
  [
    '可见光',
    '可见光',
    '可见光',
    '近红外',
    '短波红外',
    '短波红外',
    '中波红外',
    '水汽',
    '水汽',
    '水汽',
    'SO2',
    'O3',
    '大气窗区',
    '大气窗区',
    '大气窗区',
    'CO2',
    '真彩色',
    '自然色',
    '雾/雪',
    '强风暴',
    '对流云',
    '沙尘',
    '气团',
    '火山灰',
    '白天微物理特征',
    '夜间微物理特征',
    '白天对流风暴'
  ],
  // 3雷达组合反射率
  [
    "0.5KM",
    "1.0KM",
    "1.5KM",
    "2.0KM",
    "2.5KM",
    "3.0KM",
    "3.5KM",
    "4.0KM",
    "4.5KM",
    "5.0KM",
    "5.5KM",
    "6.0KM",
    "7.0KM",
    "8.0KM",
    "9.0KM",
    "10.0KM",
    "12.0KM",
    "14.0KM",
    "15.5KM",
    "17.0KM",
    "19.0KM"
  ],
  // 4 雷达降水估计
  [
    "30min",
    "1h"
  ],
  // 5 风云四号探测仪 2D
  [
    "大气垂直温度探测(500hPa)",
    "大气垂直温度探测(700hPa)",
    "大气垂直温度探测(850hPa)",
    "大气垂直温度探测(1000hPa)"
  ]
];

export {
  moduleType,
  detailedParameters
};