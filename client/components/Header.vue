<template>

  <div>

    <div class = 'col-md-12 text-center'>

      <button class = 'btn btn-primary'>{{stationId}}</button><br>
      <button @click = "goTo('home')" class = 'btn btn-success pull-right'>Restart</button>
    </div>

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

  computed: {

    // Show station id passed from route
    stationId() {

      return this.$route.params.id
    }
  },

  components: {
    
  },

  mounted() {

    
  },

  methods: {

    downloadExcel() {

      window.location.href = 'http://2014.watershedmvp.org/waterqualitymonitoring/Content/Files/BlankTemplate.xlsx'
    },

    // Navigate to a particular page, passing the station id if necessary
    goTo(x) {

      var y = this.$route.params.id

      if (x === 'home') {

        router.push({name: x})
      } else {

        router.push({name: x, params: {id: y}})
      }
    }
  }
}
</script>

<style lang = 'scss'>


</style>