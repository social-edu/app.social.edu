import { baseMutations, baseActions } from '../funcs'

export default {

  namespaced: true,
  state: {
    // Info
    items: [],
    name: 'Configurações da Rotas',
    title: 'rotas',
    loading: true,
    extraFields: JSON.parse(localStorage.getItem('extraFields')) || [],

    // API Get index
    get: {
      urn: 'object/show/'
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
  getters: {
    extraFields (state) {
      return state.extraFields
    }
  },
  mutations: Object.assign({}, baseMutations, {

    setExtraFields (state, fields) {
      state.extraFields = fields
      localStorage.setItem('extraFields', JSON.stringify(fields))
    },
    selected (state, payload) {
      state.selected = payload
    }

  }),
  actions: Object.assign({}, baseActions, {

    updateExtraFields ({ commit, state }, field) {
      const updatedFields = [...state.extraFields]
      const existingIndex = updatedFields.findIndex(item => item.key === field.key)

      if (existingIndex === -1) {
        updatedFields.push(field)
      } else {
        updatedFields[existingIndex] = field
      }

      commit('setExtraFields', updatedFields)
    },
    selected (context, payload) {
      context.commit('selected', payload)
    }

  })
}
