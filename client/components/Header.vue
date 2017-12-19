<template>

  <div>

    <div class = 'col-md-12 text-center'>

      <button class = 'btn btn-primary'>{{stationId}}</button><br>
      <button @click = "goTo('home')" class = 'btn btn-success pull-right'>Restart</button>
    </div>

    <div class = 'col-md-12'>

      <div class = 'btn-group btn-group-justified' role="group">

        <a href="#" class="btn btn-primary">Nutrient Table</a>
        <a href="#" class="btn btn-primary">Nutrient Charts</a>
      </div>
    </div>

  </div>

</template>

<script>
import router from '../router'

export default {

  computed: {

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

    goTo(x) {

      router.push({name: x})
    }
  }
}
</script>

<style lang = 'scss'>


</style>