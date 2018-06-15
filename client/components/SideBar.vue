<template>

  <div class = 'selectEmbayment text-center'>

    <!-- WARNING: Cannot update route to use https until routed server uses https -->
    <img src="http://www.capecodcommission.org/gfx/home-logo.jpg" class = 'img-rounded'><br><br>

    <h5>
      
      <p>The Section 208 Areawide Plan Update (208 Plan) provides nitrogen-removal target goals for the Cape’s impaired waters. These targets are based on extensive monitoring and analysis that was completed as part of the Massachusetts Estuaries Project (MEP).</p>
      <p>Since the publication of these estuary-specific MEP Reports, most Cape towns have continued to collect water quality data and conduct additional studies for many of their estuaries. This has resulted in a substantial number of embayment-specific water quality data sets that span over fifteen years.</p>
      <p>Going forward, the 208 Plan recommends extensive monitoring of watershed solutions to ensure water quality goals are being met. The Water Quality Monitoring application aims to provide an analysis of Cape Cod estuaries' vital nutrients.</p>
      <p>
        <button @click = 'downloadExcel'  class = 'btn btn-success'>Download Blank Template</button>
      </p>
      <p>Zoom to an embayment from the dropdown below</p>
    </h5>

    <select id = 'embaySelect'>

      <option :value = '0'>Select an Embayment</option>
      <option :key = 'name.EMBAYMENT' v-for = 'name in embaymentNames' :value = 'name.EMBAYMENT'>{{name.EMBAYMENT}}</option>
    </select><br>

    <button id = 'home' style = 'margin-top: 5% !important'  class = 'btn btn-primary'>Home</button>

  </div>

</template>

<script>
import * as esriLoader from 'esri-loader'

export default {

  data() {

    return {

      thisHome: false
    }
  },

  computed: {

    // use embayment names to feed dropdown selection above
    embaymentNames() {

      return this.$store.state.embaymentNames
    }
  },

  components: {
    
  },

  mounted() {

    // load embayment names on page load
    this.$store.dispatch('loadEmbaymentNames')

    // Load station names based on the embayment name
    // this.$store.dispatch('loadStations', this.$route.params.embayName)
  },

  methods: {

    downloadExcel() {

      window.location.href = 'https://2014.watershedmvp.org/waterqualitymonitoring/Content/Files/BlankTemplate.xlsx'
    }
  }
}
</script>

<style lang = 'scss'>

  .selectEmbayment {
    top: 5px;
    position: absolute;
    z-index: 3;
    width: 25%;
    float: left;
    background: #8cb8ff;
    border-radius: 25px;
    padding: 1.5em;
    border: 2px solid black;
    opacity: 0.9;
    color: black;
  }
</style>