import axios from '@/utils/axioz'
export default {
  data() {
    return {
      skrStore: []
    }
  },
  destroyed() {

  },
  computed: { 
    skyRadiatorChange() {
      return this.$store.state.system.searchSkyStationNumber
    }
  },
  watch: {
    skyRadiatorChange: function(e, v) {
      if (e != v) {
        // this.$refs.dr.isshow = true
        // this.isshowDialog = true
        // this.$refs.dg.isshow = true
        // this.$refs.dg.init(1)
        window.earth.entities.removeAll()
        this.addEntities(e.id, e.zhanhao, '', e.lon, e.lat, '', 'RADAR')
        this.skrStore.push(e)
        this.stationData = [e]
      }
    }
  },
  methods: {

  }
}
