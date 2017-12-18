<template>
  <div class="counter-wrapper">
    <div class="counter">
      <!-- {{ count }} -->
      {{ intvPoly }}
      <br /> <br />
      <!-- {{ intvHexes }} -->
      <br /> <br />
      {{ wqStation }}
    </div>
  </div>
</template>

<script>
export default {
  computed: {

    intvPoly() {

      return this.$store.state.intvPoly
    },

    intvHexes() {
      return this.$store.state.intvHexes
    },

    wqStation() {
      return this.$store.state.wqStation
    }
  },

  mounted() {

    this.$store.dispatch('loadIntv')
    this.$store.dispatch('loadHexes')
    this.$store.dispatch('getStation')
  },

  methods: {

    makeMap() {


    }
  }
}
</script>

<style>

.counter {

}
</style>
