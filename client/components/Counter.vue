<template>
  <div class="counter-wrapper">
    <div class="counter">
      <!-- {{ count }} -->
      {{ intvPoly }}
      <br><br>
      {{ intvHexes }}
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
    }
  },

  mounted() {

    this.$store.dispatch('loadIntv')
    this.$store.dispatch('loadHexes')
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
