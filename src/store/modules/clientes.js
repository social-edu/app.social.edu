import { baseMutations, baseActions } from '../funcs'

export default {

  namespaced: true,
  state: {
    // Info
    items: [],
    title: 'clientes',
    name: 'Clientes',
    loading: true,
    selected: null, // for drag drop
    path: '/clientes',

    // API Get index
    get: {
      urn: 'user/index?group_key="Client"'
      // response: 'users'
    },
    show: 'user/show/',
    update: 'auth/edit',
    group: 'Client',
    request: 'register',
    delete: 'user/delete/',
    hasExtraField: true,
    formFields: [
      {
        key: 'document',
        label: 'CNPJ',
        type: 'text',
        col: '5',
        mask: '##.###.###/####-##',
        required: true
      },
      { key: 'name', label: 'Nome Fantasia', type: 'text', col: '7', required: true },
      { key: 'empresa', label: 'Razão Social', type: 'text', col: '12', required: true }
    ],
    // Empresa, Website, CEP, UF, Cidade, Endereço, Complemento, Referência
    formEndereco: [
      // Campos adicionais
      { key: 'cep', label: 'CEP', type: 'text', col: '3', mask: '#####-###', required: true },
      { key: 'endereco', label: 'Endereço', type: 'text', col: '5', required: true },
      { key: 'complemento', label: 'Complemento', type: 'text', col: '4' },
      { key: 'bairro', label: 'Bairro', type: 'text', col: '4', required: true },
      { key: 'cidade', label: 'Cidade', type: 'text', col: '4', required: true },
      { key: 'uf', label: 'Estado', type: 'text', col: '4', required: true },
      { key: 'referencia', label: 'Referencia', type: 'text', col: '9' }
    ],
    formContato: [
      { key: 'nomeContato', label: 'Nome do Contato', type: 'text', col: '5' },
      { key: 'funcaoCargo', label: 'Função/Cargo', type: 'text', col: '4' },
      {
        key: 'telefoneContato',
        label: 'Telefone do Contato',
        type: 'text',
        col: '3',
        mask: [
          '(###) ##-##-##',
          '(##) #####-####',
          '(##) ####-####',
          '##-###-####'
        ]
      },
      { key: 'emailContato', label: 'Email do Contato', type: 'email', col: '4' },
      { key: 'emailFaturamento', label: 'Email de Faturamento', type: 'email', col: '4' }
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
