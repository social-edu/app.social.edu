import { baseMutations, baseActions } from '../funcs'

export default {

  namespaced: true,
  state: {
    // Info
    items: [],
    name: 'Dicionários',
    title: 'dicionarios',
    loading: true,
    path: '/dicionarios',

    // API Get index
    get: {
      urn: 'object/index?group_keys='
    },
    get2: {
      urn: 'erp/get'
    },
    update: 'object/update',
    hasExtraField: true,
    formFields: [
      { key: 'name', label: 'Nome', type: 'text', col: '5', required: true },
      { key: 'email', label: 'Email', type: 'email', col: '4' },
      {
        key: 'telephone',
        label: 'Telefone',
        type: 'text',
        col: '3',
        mask: [
          '+# (###) ##-##-##',
          '+## (##) #####-####',
          '+## (##) ####-####',
          '+# ###-###-####'
        ],
        required: true
      },
      {
        key: 'document',
        label: 'Documento',
        type: 'text',
        col: '3',
        mask: ['###.###.###-##', '##.###.###/####-##'],
        required: true
      }
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
