<template>
  <!-- eslint-disable -->
  <div class="wrapper" v-if="layerManagerShow">
    <div class="title">
      <div class="title_content">图层管理</div>
      <div class="title_control" @click="layerManagerShow = false">关闭</div>
      <div class="title_control" @click="currentLayerShow = true">++</div>
    </div>
    <div class="content_wrapper">
      <div class="content animated fadeIn" v-if="currentLayerShow">
        <div class="control_region">
          <div
            class="info_contents"
            style="font-size:12px;"
          >风四成像仪 13.5um长波红外(增强) (%) 2020-06-15 11:24:05</div>
          <span class="control_button">
            <a class="control_item">
              <img src="@/assets/images/layerManager/Nviewer.png" />
            </a>
            <a class="control_item">
              <img src="@/assets/images/layerManager/info.png" />
            </a>
            <a class="control_item">
              <img src="@/assets/images/layerManager/editor.png" />
            </a>
            <a class="control_item" @click="currentLayerShow = false">
              <img src="@/assets/images/layerManager/close.png" />
            </a>
          </span>
        </div>
        <div class="legend_content">
          <div class="contourfLegend">
            <div class="contourfLegend_p">
              <span
                :style="{'background':item}"
                v-for="(item, index) in colors"
                :key="index"
                class="contourfLegend_color"
              ></span>
            </div>
            <div class="contourfLegend_p">
              <span
                :style="{'background':item}"
                v-for="(item, index) in colors"
                :key="index"
                class="contourfLegend_color"
              ></span>
            </div>
            <div class="contourfLegend_p" style="margin-top:5px;">
              <span v-for="(item, index) in grades" :key="index">{{item}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  /* eslint-disable */
  data() {
    return {
      layerManagerShow: true,
      currentLayerShow: true,
      value2: true,
      // !图例颜色
      colors: [
        "#00ACA4",
        "#C0C0FE",
        "#7A72EE",
        "#1E26D0",
        "#A6FCA8",
        "#00EA00",
        "#10921A",
        "#FCF464",
        "#C8C802",
        "#8C8C00",
        "#FEACAC",
        "#FE645C",
        "#EE0230",
        "#D48EFE",
        "#AA24FA"
      ],
      // !图例对应文字
      grades: [
        "0",
        "5",
        "10",
        "15",
        "20",
        "25",
        "30",
        "35",
        "40",
        "45",
        "50",
        "55",
        "60",
        "65",
        "70"
      ]
    };
  },
  methods: {
    addLegend() {
      this.legend = !this.legend;
    }
  }
};
</script>
<style lang="scss" scoped>
/* eslint-disable */
.wrapper {
  position: fixed;
  right: 5px;
  bottom: 52px;
  max-height: 700px;
  width: 565px;
  background: #ededed;
  border-radius: 5px;
  .title {
    height: 30px;
    width: 100%;
    background: #021f3f;
    color: #ffffff;
    line-height: 30px;
    padding-left: 10px;
    font-size: 14px;
    border-radius: 5px;
    .title_content {
      float: left;
    }
    .title_control {
      float: right;
      padding-right: 20px;
      cursor: pointer;
    }
  }
  .content_wrapper {
    overflow-y: auto;
    max-height: 660px;
    .content {
      padding: 2px;
      margin: 10px;
      width: 530px;
      height: 78px;
      background: #ffffff;
      border-radius: 5px;
      box-shadow: 0px 0px 10px #021f3f;
      .control_region {
        position: relative;
        width: 100%;
        height: 25px;
        font-size: 14px;
        border-bottom: 1px solid #ededed;
        padding-bottom: 2px;
        .info_contents {
          width: 400px;
          height: 15px;
          text-align: left;
          padding-left: 5px;
          line-height: 25px;
        }
        .control_button {
          position: absolute;
          right: 2px;
          bottom: -4px;
          .control_item {
            padding-right: 4px;
            line-height: 25px;
            height: 20px;
            width: 20px;
            img {
              height: 20px;
              width: 20px;
            }
          }
        }
      }
      .legend_content {
        padding: 8px 0 0 8px;
        position: relative;
        .contourfLegend {
          display: flex;
          flex-direction: column;
          height: 40px;
          width: 510px;
        }
        .contourfLegend_p {
          flex: 1;
          display: flex;
          height: 50px;
        }
        .contourfLegend_p span {
          margin-top: 1px;
          margin-bottom: 0.5px;
          // margin-left: 3px;
          flex: 1;
          align-items: center;
          justify-content: center;
          font-size: 6px;
        }
        .slider_item_start {
          position: absolute;
          top: 0px;
          left: 0px;
          img {
          }
        }
        .slider_item_end {
          position: absolute;
          top: 2px;
          right: 0px;
        }
      }
    }
  }
}
</style>
