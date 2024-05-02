// THIS MODULE IS JUST FOR SAVE GROUPS EXTRA FIELDS, INSTEAD OF SEND REQUESTS OVER ALL PLACES
// API REQUEST IS CALL ONLY ONCE IN views/Dashboard/index.vue
export default {
  namespaced: true,
  state: {
    keys: ['Client', 'Client_CNPJ', 'Company'],
    type: 'ERP',
    groups: {}
  },
  mutations: {
    set: (state, payload) => {
      state.groups = { ...state.groups, [payload.group]: payload.extrafields }
    }
  },
  actions: {
    init: (context, payload) => {
      context.commit('set', payload)
    }
  }
}
