<template>

  <div class="row">

    <!-- <SideBar></SideBar> -->
    <div id = 'viewDiv' class="balt-theme">
      <SideBar></SideBar>
    </div>

  </div>
</template>

<script>
import * as esriLoader from 'esri-loader'
import { createMap } from '../components/esrimap'
import SideBar from '../components/SideBar'

export default {
  components: {
    SideBar
  },

  mounted() {

    esriLoader.bootstrap((err) => { createMap(esriLoader)}, { url: 'https://js.arcgis.com/4.6/'})
  }
}
</script>

<style lang = 'scss'>

  .esri-ui-bottom-left {
    bottom: 15% !important;
  }

  .esri-legend {
    background: #28536c;
    color: #f0ead6;
    border-radius: 25px;
    border: 5px solid grey;
  }

  #viewDiv {
    position: fixed !important;
    height: 100%;
    width: 100%;
  }
</style>