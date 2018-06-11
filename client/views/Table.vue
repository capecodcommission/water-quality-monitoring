<template>

  <div>

    <div class = 'row'>

    	<wqHeader></wqHeader>

    </div>

    <div class = 'row'>
      
      <clientTable></clientTable>

    </div>

  </div>

</template>

<script>
import * as esriLoader from 'esri-loader'
import { createMapTable } from '../components/esrimap'
import wqHeader from '../components/Header'
import clientTable from '../components/clientTable'
import router from '../router'

export default {

  computed: {

    embayNames() {

      return this.$store.state.embaymentNames
    },

    wqStation() {

      return this.$store.state.wqStation
    },

    wqStations() {

      return this.$store.state.stationNames
    }
  },

  components: {

    wqHeader,
    clientTable
  },

  mounted() {

    // Load station data using station id from route
    this.$store.dispatch('loadEmbaymentNames')
    this.$store.dispatch('loadEmbayName', this.$route.params.embayName)

    esriLoader.bootstrap((err) => { 
      
      createMapTable(esriLoader, $('#embaymentSelect').val(), this.$route, this.$store)}, { url: 'https://js.arcgis.com/4.6/'})

    
  },

  watch: {

    embayNames: function(x) {

      this.$store.dispatch('loadStations', this.$route.params.embayName)
    },

    wqStations: function(x) {

      this.$store.dispatch('loadStationId', this.$route.params.id)
      this.$store.dispatch('getStation', this.$route.params.id)
    }
  }
}
</script>

<style lang = 'scss'>

	
</style>