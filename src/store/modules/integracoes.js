import { baseMutations, baseActions } from '../funcs'

export default {

  namespaced: true,
  state: {
    // Info
    items: [],
    name: 'Integrações',
    title: 'integracoes',
    loading: true,
    path: '/integracoes',

    // API Get index
    get: {
      urn: 'integracao/index'
    },
    request: 'integracao/store',
    update: 'integracao/update',
    delete: 'integracao/delete',
    groups: '',
    hasExtraField: true

  },
  mutations: Object.assign({}, baseMutations, {

    selected (state, payload) {
      state.selected = payload
    }

  }),
  actions: Object.assign({}, baseActions, {

    selected (context, payload) {
      context.commit('selected', payload)
    }

  })
}
