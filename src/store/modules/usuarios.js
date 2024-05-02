import { baseMutations, baseActions } from '../funcs'

export default {

  namespaced: true,
  state: {
    // Info
    items: [],
    title: 'alunos',
    name: 'Alunos',
    loading: true,
    selected: null, // for drag drop
    path: '/alunos',

    // API Get index
    get: {
      urn: 'user/index?group_key="Aluno"'
      // response: 'users'
    },
    show: 'user/show/',
    update: 'auth/edit',
    group: 'Aluno',
    request: 'auth/create',
    delete: 'user/delete/',
    hasExtraField: true,
    formFields: [
      { key: 'Name', label: 'Nome', type: 'text', col: '5', required: true },
      { key: 'Email', label: 'Email', type: 'email', col: '4' },
      {
        key: 'Telephone',
        label: 'Telefone',
        type: 'text',
        col: '3',
        mask: [
          '(###) ##-##-##',
          '(##) #####-####',
          '(##) ####-####',
          '###-###-####'
        ],
        required: true
      },
      {
        key: 'Document',
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
