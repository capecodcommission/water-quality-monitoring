<template>

  <div class = 'selectEmbayment text-center'>

    <!-- WARNING: Cannot update route to use https until routed server uses https -->
    <img src="http://www.capecodcommission.org/gfx/home-logo.jpg" class = 'img-rounded'><br><br>

    <h5>
      
      <p>The Cape Cod Area-Wide Water Quality Management Plan (208 Plan) provides a framework for achieving nitrogen removal targets in Cape Cod’s impaired coastal waters.  These targets are based on analyses completed by the Massachusetts Estuaries Project (MEP).</p>
      <p>Since publication of estuary-specific MEP reports, many communities, organizations and agencies have continued to estuarine water quality data and conduct additional studies.  The result is historic embayment-specific water quality data sets dating back 15 years.  The 208 Plan recommends a regional monitoring program that supports collection and analysis of data to inform local decisions and investments in water quality infrastructure. </p>
      <p>This regional water quality monitoring application includes data collected and analyzed by various organizations, agencies and institutions, including the Buzzards Bay Coalition, Center for Coastal Studies, the School for Marine Science and Technology at UMass-Dartmouth, Cape Cod towns, and others.  Data from these entities has been compiled by the Cape Cod Commission into this regional database.</p>
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