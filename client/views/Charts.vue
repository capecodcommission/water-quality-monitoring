<template>

  <div>
    <div class = 'row'>
      <wqHeader></wqHeader>
    </div>

    <div class = 'row'>
      <div id = 'chart'></div>
    </div>
  </div>

</template>

<script>

import wqHeader from '../components/Header'

var plotly = require('plotly')("capecodcommission", "p9IkfYcPNC1SELCOpZDk")


export default {

  components: {
    wqHeader
  },

  data () {
    return {
      something: 'somethingElse'
    }
  },

  computed: {

  },

  mounted () {
    this.makeChart()
    console.log('test')
  },

  methods: {

    returnWqStationMock () {
      return this.$store.state.wqStationMock
    },

    makeChart () {

      var data = this.$store.state.wqStationMock;
      console.log(data)
      var layout = {fileopt : "overwrite", filename : "simple-node-example"};

      var chart = document.getElementById('chart');
      Plotly.newPlot('chart', data);
    }

},

  watch: {
    wqStationMock: function(x) {
      console.log('data: ', x)
    }
  }
}

</script>

<style>
</style>
