import Vue from 'vue'
import Vuex from 'vuex'
import $ from 'jquery'

Vue.use(Vuex)

const state = {
  embaymentNames: [],
  wqStation: [],
  stationNames: [],
  stationId: '',
  embayName: ''
}

const mutations = {

  // Load station data into state
  LOAD_STATION (state, station) {

    state.wqStation = station.recordsets[0]
  },

  // Load embayment names into state
  LOAD_EMBAYMENTNAMES (state, names) {

    state.embaymentNames = names.recordsets[0]
  },

  // Load station names into state
  LOAD_STATIONS (state, name) {

    state.stationNames = name.recordsets[0]
  },

  LOAD_STATIONID (state, id) {

    state.stationId = id
  },

  LOAD_EMBAYNAME (state, name) {

    state.embayName = name
  },

  CLEAR_ALL (state) {

    state.embaymentNames = []
    state.wqStation = []
    state.stationNames = []
    state.stationId = []
    state.embayName = []
  }
}

const actions = {

  // Get station data from API, pass data to mutation
  getStation ( {commit}, id ) {

    // WARNING: Cannot update route to use https until api server uses https
    $.getJSON("http://sql-connect.api.capecodcommission.org/api/getStation/" + id, function (result) {

      commit("LOAD_STATION", result)
    })

  },


  // Get embayment names from API, pass data to mutation
  loadEmbaymentNames ({commit}) {

    // WARNING: Cannot update route to use https until api server uses https
    $.getJSON("http://sql-connect.api.capecodcommission.org/api/getEmbayments", function (result) {

      commit("LOAD_EMBAYMENTNAMES", result)
    })
  },

  // Get station names from API based on embayment name, pass data to mutation
  loadStations ({commit}, name) {

    // WARNING: Cannot update route to use https until api server uses https
    $.getJSON("http://sql-connect.api.capecodcommission.org/api/getStations/" + name, function (result) {

      commit("LOAD_STATIONS", result)
    })
  },

  loadStationId ({commit}, id) {

    commit("LOAD_STATIONID", id)
  },

  loadEmbayName ({commit}, name) {

    commit("LOAD_EMBAYNAME", name)
  },

  clearAll ({commit}) {

    commit("CLEAR_ALL")
  }
}

const store = new Vuex.Store({
  state,
  mutations,
  actions
})

export default store
