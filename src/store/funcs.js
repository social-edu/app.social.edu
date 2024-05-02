import { request } from '@/services'
import { toast, replaceParams } from '@/utils'

// Base Mutations for modules
export const baseMutations = {
  set: (state, payload) => {
    state.items = payload
    state.loading = false
  },
  unshift: (state, payload) => {
    state.items.unshift(payload)
  },
  swap: (state, payload) => {
    state.items.forEach((element, index) => {
      if (element.id === payload.id) {
        state.items.splice(index, 1, payload)
      }
    })
  },
  remove: (state, payload) => {
    state.items = state.items.filter(o => o.id !== payload)
  },
  reloading: state => { state.loading = true }
}

// Base Actions for modules
export const baseActions = {
  init: (context, payload) => {
    context.commit('reloading')
    const info = context.state.get

    let uriParams = null
    if (payload.uriParams !== null || payload.uriParams !== undefined) {
      if (Array.isArray(payload.uriParams)) {
        uriParams = [payload.uriParams]
      } else {
        uriParams = payload.uriParams
      }
    }

    request.get(payload.uriParams === null || payload.uriParams === undefined ? replaceParams(info.urn, payload.params) : replaceParams(info.urn + `${uriParams}`, payload.params),
      response => {
        context.commit('set', (info.response ? response.data[info.response] : response.data) || [])
      },
      error => {
        toast(payload.self, 'danger', 'Erro ao obter ' + context.state.name, error)
        context.commit('set', [])
      }
    )
  },
  add: (context, payload) => {
    context.commit('unshift', payload)
  },
  edit: (context, payload) => {
    context.commit('swap', payload)
  },
  delete: (context, payload) => {
    const r = payload.request;
    ({ get: request.get, delete: request.delete })[r.method](replaceParams(r.urn, payload.item),
      response => {
        context.commit('remove', payload.item.id) // payload.item[payload.id]
        toast(payload.self, 'success', 'Deletar ' + context.state.name, context.state.name + ' deletado com sucesso')
      },
      error => {
        toast(payload.self, 'danger', 'Erro ao deletar ' + context.state.name, error)
      }
    )
  }
}
