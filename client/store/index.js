import Vue from 'vue'
import Vuex from 'vuex'
import $ from 'jquery'

Vue.use(Vuex)

const state = {

  embaymentNames: [],
  wqStation: []
}

const mutations = {

  LOAD_STATION (state, station) {
    state.wqStation = station.recordsets[0]
  },

  LOAD_EMBAYMENTNAMES (state, names) {

    state.embaymentNames = names.recordsets[0]
  }
}

const actions = {

  getStation ( {commit}, id ) {

    $.getJSON("http://sql-connect.api.capecodcommission.org/api/getStation/" + id, function (result) {

      commit("LOAD_STATION", result)
    })

  },

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
