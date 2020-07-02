
<template>
  <!-- eslint-disable -->
  <div class="logo-global">
    <img src="@/assets/images/logo/logo.png" />
    <span>{{logoName}}</span>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  data() {
    return {
      logoName: "气象海洋环境卫星遥感反演显示系统"
    };
  },
  created() {},
  methods: {}
};
</script>

<style scoped lang="scss">
.logo-global {
  position: fixed;
  top: 12.5px;
  left: 20px;
  font-size: 22px;
  letter-spacing: 2px;
  font-family: FZLTZHK--GBK1-0, FZLTZHK--GBK1;
  font-weight: 400;
  color: #ffffff;
  padding: 10px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  -ms-border-radius: 5px;
  -o-border-radius: 5px;
}

.logo-global img {
  width: 46px;
  vertical-align: middle;
  margin-right: 5px;
  color: #FFFFFF;
}
</style>