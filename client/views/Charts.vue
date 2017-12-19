<template>

  <div>

    <div class = 'row'>

      <wqHeader></wqHeader>

    </div>

    <div class = 'row'>
      
      <div id = 'charts'></div>

    </div>

  </div>

</template>

<script>

import wqHeader from '../components/Header'

import plotly from 'plotly'

// PLOTLY API KEY | p9IkfYcPNC1SELCOpZDk
// PLOTYLY U-NAME | capecodcommission

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
    // wQData () {
    //   return this.$store.state.wqStation
    // }
  },

  mounted () {
    // this.$store.dispatch('something')
  },

  methods: {

    wqStation () {
      return this.$store.state.wqStation
    },

    loadWqStationData () {

      var data = [{x:[0,1,2], y:[3,2,1], type: 'bar'}];
      var layout = {fileopt : "overwrite", filename : "simple-node-example"};

      plotly.plot(data, layout, function (err, msg) {
        if (err) return console.log(err);
        console.log(msg);
      });

    },

},

  watch: {

    wqStation: function(x) {
      console.log('noahexes logged: ', x)
    }
  }
}

</script>

<style>
#interventionButton {
  z-index: 2;
  position: absolute;
}
</style>
