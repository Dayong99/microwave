import axios from '@/utils/axioz'
export default {
  data() {
    return {
      wStore: []
    }
  },
  destroyed() {

  },
  computed: {
    weiboChange() {
      return this.$store.state.system.weibostationNumber
    }
  },
  watch: {
    weiboChange: function(e, v) {
      if (e != v) {
        // this.isshowDialog = true
        // this.$refs.dg.isshow = true
        // this.$refs.dg.init(2);
        window.earth.entities.removeAll();
        this.addEntities(e.id, e.zhanhao, '', e.lon, e.lat, '', 'RADAR');
        this.wStore.push(e);
        this.stationData = [e];
      }
    }
  },
  methods: {
  }
}
