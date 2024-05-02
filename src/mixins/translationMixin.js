// translationMixin.js
import { api } from '@/services'
export default {
  methods: {
    doSystemMessageTranslation (message) {
      return api.post('chat/translate', { message }).then((response) => {
        this.traduct = response.data
        message.isLoadingTranslate = false
      })
    },

    doTranslation (message) {
      return api.post('chat/translate', { message }).then((response) => {
        this.traduct[message] = response.data
        message.isLoadingTranslate = false
      })
    }
  }
}
