import { baseMutations, baseActions } from '../funcs'

export default {

  namespaced: true,
  state: {
    // Info
    items: [],
    name: 'Rotas',
    title: 'rotas',
    loading: true,
    path: '/rotas',

    // API Get index
    get: {
      urn: 'object/index'
    },
    show: 'object/show/',
    update: 'object/update',
    delete: 'object/delete',
    hasExtraField: true,
    formFields: [
      //  key: 'key', label: 'Chave', type: 'text', col: '3', required: true, placeholder: 'Chave' },
      { key: 'object_name', label: 'Nome', type: 'text', col: '3', placeholder: 'Nome' },
      { key: 'description', label: 'Descrição', type: 'text', col: '3', placeholder: 'Descrição' },
      {
        key: 'type',
        label: 'Tipo',
        type: 'select',
        col: '3',
        required: true,
        placeholder: 'Tipo (GET, POST, etc)',
        options: [
          { text: 'GET', value: 'GET' },
          { text: 'POST', value: 'POST' }
        ]
      },
      { key: 'object_uri', label: 'URI', type: 'url', col: '3', placeholder: 'URI' }
      // Adicione mais objetos de campo conforme necessário
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
    },
    test: (context, payload) => {
      context.commit('test', payload)
    }

  })
}
