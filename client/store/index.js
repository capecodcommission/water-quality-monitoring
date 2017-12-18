import Vue from 'vue'
import Vuex from 'vuex'
import $ from 'jquery'

Vue.use(Vuex)

const state = {

  count: 0,
  intvPoly: [],
  intvHexes: [],
  wqStation: []
}

const mutations = {

  GET_STATION (state, station) {
    state.wqStation = station
  },

  LOAD_POLY (state, poly) {

    state.intvPoly = poly
  },

  LOAD_HEXES (state, hexes) {

    state.intvHexes = hexes
  }
}

const actions = {

  getStation ( {commit}, id ) {

    $.getJSON("http://sql-connect.api.capecodcommission.org/api/getEmbayment/WMO36", function (result) {
    // $.getJSON("http://sql-connect.api.capecodcommission.org/api/getEmbayment/ + $wqStationId", function (result) {

      commit("GET_STATION", result)

    })

  },

  loadIntv ({commit}) {

    $.getJSON("https://opendata.arcgis.com/datasets/2f919d05a2a1447db4ebcaf80f553288_1.geojson", function (result) {

      commit("LOAD_POLY", result)
    })
  },

  loadHexes ({commit}) {

    $.getJSON("http://gis-cccommission.opendata.arcgis.com/datasets/49c80ec6e88544b5a9d6775670a70067_0.geojson", function (result) {

      commit("LOAD_HEXES", result)
    })
  }
}

const store = new Vuex.Store({
  state,
  mutations,
  actions
})

export default store
