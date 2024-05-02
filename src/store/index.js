import Vue from 'vue'
import Vuex from 'vuex'

import { api } from '@/services'

import Alunos from './modules/usuarios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: JSON.parse(localStorage.user || '{}'),
    token: localStorage.token || undefined,
    transcript: localStorage.transcript || undefined,
    transcriptions: [],
    messages: [],
    apiChatList: [],
    menuMobile: false
  },
  getters: {
    userName: state => state.user.name === undefined ? '' : state.user.name,
    isLogged: state => Object.keys(state.user).length !== 0 && state.token !== undefined,
    getTranscript: (state) => state.transcript,
    getTranscriptions: (state) => state.transcriptions,
    getmessages: state => state.messages
  },
  mutations: {
    login: (state, payload) => {
      state.user = payload.user
      state.token = payload.token
    },
    logout: state => {
      state.user = {}
      state.token = undefined
    },
    toggleMenuMobile: state => {
      state.menuMobile = !state.menuMobile
    },
    SAVE_TRANSCRIPT (state, transcript) {
      state.transcript = localStorage.transcript
    },
    SAVE_TRANSCRIPTIONS (state, transcriptions) {
      state.transcriptions = transcriptions
    },
    pushMessages: (state, payload) => {
      state.messages = payload
    },
    updateApiList: (state, payload) => {
      state.apiChatList = payload
    }
  },
  actions: {
    login: (context, payload) => {
      localStorage.user = JSON.stringify(payload.user)
      localStorage.token = payload.token
      api.defaults.headers.common.Authorization = `Bearer ${payload.token}`
      context.commit('login', payload)
    },
    logout: context => {
      localStorage.clear()
      delete api.defaults.headers.common.Authorization
      context.commit('logout')
    },
    menuMobile: context => {
      context.commit('toggleMenuMobile')
    },
    pushMessages: (context, payload) => {
      context.commit('pushMessages', payload)
    },
    updateApiList: (context, payload) => {
      context.commit('updateApiList', payload)
    }
  },
  modules: {
    alunos: Alunos
  }
})
