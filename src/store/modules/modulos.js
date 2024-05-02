import { baseMutations, baseActions } from '../funcs'

export default {

  namespaced: true,
  state: {
    // Info
    items: [],
    name: 'Módulos',
    title: 'modulos',
    loading: true,
    path: 'modulos',

    // API Get index
    get: {
      urn: 'group/public/index?type=Module'
    },
    update: 'group/update',
    delete: 'group/delete',
    hasExtraField: true,
    formFields: [
      { key: 'key', label: 'Nome', type: 'text', col: '3', required: true },
      { key: 'description', label: 'Descrição', type: 'text', col: '3' }
      // { key: 'type', label: 'Categoria', type: 'text', col: '3', required: true }
    ]

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
