<template>

  <v-client-table :data = 'wqStation' :columns = 'columns'></v-client-table>

</template>

<script>


export default {

  data() {

    return {

      // Columns visualized in data table above
      columns: ['date','salinity','disolvedoxygen','nitrogen','water_temp','precipitation','depth','nitrate_nitrite','ammonium','orthophosphate','chlorophyll','phaeophytin']
    }
  },

  computed: {

    // Load station data from store, use as table data above 
    wqStation() {

      return this.$store.state.wqStation
    }
  },

  components: {

  },

  mounted() {


  },

  methods: {

  },

  watch: {


  }
}
</script>

<style lang = 'scss'>


</style>
