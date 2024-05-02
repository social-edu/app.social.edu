// messageMixin.js
/* import { api } from '@/services' */
export default {
  methods: {
    data () {
      return {
        messages: []
      }
    },
    returnResponse (text) {
      this.messages.push({
        text: text,
        isUser: true
      })

      setTimeout(() => {
        this.scrollToBottom()
      }, 200)
    }
  }
}
