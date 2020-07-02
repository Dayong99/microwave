<template>
  <!-- eslint-disable -->
  <div class="wrapper">
    {{parameter_data}}
  </div>
</template>
<script>
export default {
  /* eslint-disable */
  computed: {
    parameter_data() {
      return this.$store.state.titleAndParameter.setParameter_data;
    }
  }
};
</script>
<style lang="scss" scoped>
/* eslint-disable */
.wrapper {
  padding-left: 5px;
  padding-right: 5px;
  width: auto;
  height: 30px;
  position: absolute;
  left: 30px;
  bottom: 83px;
  line-height: 30px;
  color: #ffffff;
  font-size: 16px;
}
</style>
