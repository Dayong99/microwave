<template>
  <!-- eslint-disable -->
  <div class="nav-center">
    <!-- <span>{{moduleType[flag]}}&ensp;{{detailedParameters[flag][index]}}&ensp;{{currentDataTime}}</span> -->
    <span>{{title_text}}&ensp;{{title_date}}</span>
  </div>
</template>
<script>
/* eslint-disable */
export default {
  computed: {
    title_text() {
      return this.$store.state.titleAndParameter.title_text
    },
    title_date() {
      return this.$store.state.titleAndParameter.title_date
    }
  }
}
</script>
<style lang="scss" scoped>
.nav-center {
  position: fixed;
  top: 10px;
  left: 50%;
  font-size: 26px;
  font-family: FZLTZHK--GBK1-0, FZLTZHK--GBK1;
  font-weight: 600;
  color: #fff;
  line-height: 25px;
  transform: translateX(-50%);
  padding: 15px;
  border-radius: 5px;
  -webkit-transform: translateX(-50%);
  -moz-transform: translateX(-50%);
  -ms-transform: translateX(-50%);
  -o-transform: translateX(-50%);
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  -ms-border-radius: 5px;
  -o-border-radius: 5px;
}
</style>