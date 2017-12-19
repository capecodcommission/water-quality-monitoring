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
import wqHeader from '../components/Header'
import clientTable from '../components/clientTable'

export default {
  components: {

    wqHeader,
    clientTable
  },

  mounted() {

    // Load station data using station id from route
  	this.$store.dispatch('getStation', this.$route.params.id)
  }
}
</script>

<style lang = 'scss'>

	
</style>