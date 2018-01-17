<template>

  <v-client-table :data = 'wqStation' :columns = 'columns' :options = 'options'></v-client-table>

</template>

<script>

import moment from 'moment'

export default {

  data() {

    return {

      // Columns visualized in data table above
      columns: ['date','salinity','disolvedoxygen','nitrogen','water_temp','precipitation','depth','nitrate_nitrite','ammonium','orthophosphate','chlorophyll','phaeophytin'],
      options: {
        // filterByColumn: true,
        headings: {
          date: 'Date',
          salinity: 'Salinity (ppt)',
          disolvedoxygen: 'Disolved Oxygen (mg/L)',
          nitrogen: 'Nitrogen (μm)',
          water_temp: 'Water Temperature (°C)',
          precipitation: 'Precipitation (in)',
          depth: 'Depth (ft)',
          nitrate_nitrite: 'Nitrate-Nitrite (μm)',
          ammonium: 'Ammonium (μm)',
          orthophosphate: 'Orthophosphate (μm)',
          chlorophyll: 'Chlorophyll (μm)',
          phaeophytin: 'Phaeophytin (μg/L)'
        },
        sortIcon: { 
          base:'fa', 
          up:'fa-sort-asc', 
          down:'fa-sort-desc',
          is: 'fa-sort'
        },
        // toMomentFormat: true,
        dateFormat: 'YYYY/MM/DD',
        dateColumns: ['date']
      }
    }
  },

  computed: {

    // Load station data from store, use as table data above 
    wqStation() {

      var data = this.$store.state.wqStation

      var dataFixed =  data.map(function(x) {

        if (!!x.date) {

          x.date = x.date.slice(0, x.date.indexOf('T'))

          x.date = moment(x.date).format("YYYY/MM/DD")
        }

        if (!!x.ammonium) {
          x.ammonium = x.ammonium.toFixed(2)
        }

        if (!!x.chlorophyll) {
          x.chlorophyll = x.chlorophyll.toFixed(2)
        }

        if (!!x.depth) {
          x.depth = x.depth.toFixed(2)
        }

        if (!!x.disolvedoxygen) {
          x.disolvedoxygen = x.disolvedoxygen.toFixed(2)
        }

        if (!!x.nitrate_nitrite) {
          
          if (x.nitrate_nitrite.slice(-3) === 'E-2') {

            x.nitrate_nitrite = parseFloat(x.nitrate_nitrite.slice(0,-3))

            x.nitrate_nitrite = x.nitrate_nitrite.toFixed(2)
          } else {

            x.nitrate_nitrite = parseFloat(x.nitrate_nitrite).toFixed(2)
          }
        }

        if (!!x.nitrogen) {
          x.nitrogen = x.nitrogen.toFixed(2)
        }

        if (!!x.orthophosphate) {
          x.orthophosphate = x.orthophosphate.toFixed(2)
        }

        if (!!x.phaeophytin) {
          x.phaeophytin = x.phaeophytin.toFixed(2)
        }

        if (!!x.precipitation) {
          x.precipitation = x.precipitation.toFixed(2)
        }

        if (!!x.salinity) {
          x.salinity = x.salinity.toFixed(2)
        }

        if (!!x.water_temp) {
          x.water_temp = x.water_temp.toFixed(2)
        }

        return x
      })

      return dataFixed
    }
  },

  components: {

  },

  mounted() {


  },

  methods: {

  },

  watch: {

    wqStation: function(x) {

      $('#embaymentSelect').val(this.$store.state.embayName)
    }

  }
}
</script>

<style lang = 'scss'>

/*.VueTables__sort-icon {

  margin-right: 50%
}*/

</style>
