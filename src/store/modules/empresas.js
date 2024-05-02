import { baseMutations, baseActions } from '../funcs'

export default {

  namespaced: true,
  state: {
    // Info
    items: [],
    title: 'empresas',
    name: 'Empresas',
    loading: true,
    selected: null, // for drag drop
    path: '/empresas',
    // API Get index
    get: {
      urn: 'user/index?group_key="Client_CNPJ"'
      // response: 'users'
    },
    show: 'user/show/',
    update: 'auth/edit',
    group: 'Client_CNPJ',
    delete: 'user/delete/',
    request: 'register',
    hasExtraField: true,
    formFields: [
      {
        key: 'document',
        label: 'Documento',
        type: 'text',
        col: '3',
        mask: ['###.###.###-##', '##.###.###/####-##'],
        required: true
      },
      { key: 'name', label: 'Nome Fantasia', type: 'email', col: '4' },
      { key: 'razao_social', label: 'Razão Social', type: 'text', col: '5', required: true },
      { key: 'email', label: 'Email', type: 'email', col: '4' }
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
