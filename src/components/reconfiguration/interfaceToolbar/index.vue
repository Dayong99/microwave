<template>
<!-- eslint-disable -->
  <div class="wrapper">
    <tool />
  </div>
</template>
<script>
/* eslint-disable */
import tool from "./components/tool.vue"
export default {
  components: {
    tool
  }
}
</script>
<style lang="scss" scoped>
.wrapper {
  position: fixed;
  right: 0px;
  top: 0px;
}
</style>