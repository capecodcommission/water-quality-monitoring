<template>

  <div id="app">

    <router-view></router-view>
    
  </div>

</template>

<style lang = 'scss'>

#app {

  margin-top: 0;
}
.row {
  width: 100%;
  margin-right: 0 !important;
  margin-left: 0 !important;
  padding-bottom: 0px;
}

.col-md-12 {
  width: 100% !important;
  margin-right: 0 !important;
  margin-left: 0 !important;
  padding-left: 0px !important;
  padding-right: 0px !important;
}

@import url('https://js.arcgis.com/4.6/esri/css/main.css');
@import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

</style>
