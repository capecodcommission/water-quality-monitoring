<template>

  <div>

    <div class = 'col-md-12 text-center'>

      <div class = 'col-md-4'>
        <select v-model = 'selectedEmbay' id = 'embaymentSelect' class = 'pull-left btn btn-primary dropdown-toggle'>
          <option>Select an Embayment</option>
          <option v-for = 'name in embaymentNames' :value = 'name.EMBAYMENT'>{{name.EMBAYMENT}}</option>
        </select>
      </div>

      <div class = 'col-md-4 btn-group text-center'>
        <button v-for = 'name in stationNames' @click = "loadStation(name.Uid)" :class = "[name.Uid === stationId ? 'btn btn-primary text-center' : '', 'btn btn-secondary text-center']">{{name.Uid}}</button>
      </div>

      <div class = 'col-md-4'>
        <button @click = "goTo('home')" class = 'btn btn-success pull-right'>Restart</button>
      </div>

    </div>

    <br><br>

    <div class = 'col-md-12'>

      <div class = 'btn-group btn-group-justified' role="group">

        <a @click = "goTo('table')" href="#" class="btn btn-primary">Nutrient Table</a>
        <a @click = "goTo('charts')" href="#" class="btn btn-primary">Nutrient Charts</a>
      </div>
    </div>

  </div>

</template>

<script>
import router from '../router'

export default {

  data() {

    return {

      selectedEmbay: 'Select an Embayment'
    }
  },

  computed: {

    // Show station id passed from route
    stationId() {

      return this.$store.state.stationId
    },

    // Show station id passed from route
    stationNames() {

      return this.$store.state.stationNames
    },

    embaymentNames() {

      return this.$store.state.embaymentNames
    },

    embayName() {

      return this.$store.state.embayName
    }
  },

  components: {
    
  },

  mounted() {

  },

  methods: {

    loadStation(x) {

      this.$route.params.id = x

      this.$store.dispatch('loadStationId', x)

      this.$store.dispatch('getStation', x)
    },

    downloadExcel() {

      window.location.href = 'http://2014.watershedmvp.org/waterqualitymonitoring/Content/Files/BlankTemplate.xlsx'
    },

    // Navigate to a particular page, passing the station id if necessary
    goTo(x) {

      var y = this.$route.params.id
      var z = this.$route.params.embayName

      if (x === 'home') {

        this.$store.dispatch('clearAll')
        router.push({name: x})
      } else {

        router.push({name: x, params: {id: y, embayName: z}})
      }
    }
  },

  watch: {

    selectedEmbay: function(x) {

      this.$route.params.embayName = x

      this.$store.dispatch('loadEmbayName', x)

      this.$store.dispatch('loadStations', x)
    },

    stationId: function(x) {

    }
  }
}
</script>

<style lang = 'scss'>


</style>