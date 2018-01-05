import Vue from 'vue'
import Vuex from 'vuex'
import $ from 'jquery'

Vue.use(Vuex)

const state = {
  embaymentNames: [],
  wqStation: []
}

const mutations = {

  // Load station data into state
  LOAD_STATION (state, station) {

    state.wqStation = station.recordsets[0]
  },

  // Load embayment names into state
  LOAD_EMBAYMENTNAMES (state, names) {

    state.embaymentNames = names.recordsets[0]
  }
}

const actions = {

  // Get station data from API, pass data to mutation
  getStation ( {commit}, id ) {

    $.getJSON("http://sql-connect.api.capecodcommission.org/api/getStation/" + id, function (result) {

      commit("LOAD_STATION", result)
    })

  },


  // Get embayment names from API, pass data to mutation
  loadEmbaymentNames ({commit}) {

    $.getJSON("http://sql-connect.api.capecodcommission.org/api/getEmbayments", function (result) {

      commit("LOAD_EMBAYMENTNAMES", result)
    })
  }
}

const store = new Vuex.Store({
  state,
  mutations,
  actions
})

export default store
