<template>

  <div class="row">
    <MapHome></MapHome>
    <SideBar></SideBar>
  </div>

</template>

<script>
import SideBar from '../components/SideBar'
import MapHome from '../components/MapHome'
import router from '../router'

export default {
  components: {
    SideBar,
    MapHome
  },

  mounted() {
    
  }
}
</script>

<style lang = 'scss'>

</style>