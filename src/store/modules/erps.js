import { baseMutations, baseActions } from '../funcs'

export default {

  namespaced: true,
  state: {
    // Info
    items: [],
    name: 'Sistemas',
    title: 'sistemas',
    loading: true,
    path: '/sistemas',

    // API Get index
    get: {
      urn: 'group/public/index?type=ERP'
    },
    show: 'group/show?group_id=',
    request: 'group/create',
    update: 'group/update',
    delete: 'group/delete',
    groups: '',
    hasExtraField: true,
    formFields: [
      { key: 'key', label: 'Nome', type: 'text', col: '5', required: true },
      // { key: 'type', label: 'Categoria', type: 'text', col: '3' },
      { key: 'description', label: 'Descrição', type: 'text', col: '5' },

      // { key: 'app_key', label: 'app key', type: 'text', col: '3' },
      // { key: 'app_secret', label: 'app secret', type: 'text', col: '3' },
      { key: 'base_url', label: 'Base URL', type: 'text', col: '10', required: true }
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
