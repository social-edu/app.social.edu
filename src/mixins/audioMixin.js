// audioMixin.js
import { v4 as uuidv4 } from 'uuid'
import { api } from '@/services'
import { toast } from '@/utils'
export default {
  data () {
    return {
      isSpeaking: false,
      audioPlayer: null,
      isLoadingAudio: false,
      audioUrl: new Audio(),
      msgId: null,
      voiceId: null
    }
  },
  watch: {
    audioPlayer: {
      handler (newValue) {
        this.audioPlayer = newValue
      },
      deep: true
    }
  },
  methods: {
    toggleAudio (message, voice) {
      if (!message.isSpeaking) {
        this.playAudio(message, voice)
      } else {
        this.pauseAudio(message)
      }
    },
    playAudio (message, voice) {
      message.isLoadingAudio = true
      // pega o id
      if (message?.audio?.audio) {
        this.msgId = message.audio.audio.slice(36).replace('/', '')
      } else {
        this.msgId = message.message_id
      }

      if (voice !== undefined) {
        this.voiceId = voice
      } else {
        this.voiceId = JSON.parse(localStorage.getItem('selectedVoice'))
      }

      // string que passa o user, id, voice, id de novo
      if (this.msgId) {
        this.audioUrl = `${this.$store.state.user.name}/${this.msgId}/${this.voiceId}/${this.msgId}`
      } else {
        this.msgId = uuidv4()
        this.audioUrl = `${this.$store.state.user.name}/${this.msgId}/${voice}/${this.msgId}`
      }
      // validação da falha de conversa
      if (message.text === JSON.stringify({ Conversate: 'Conversation failed' })) {
        message.isLoadingAudio = false
        message.isSpeaking = false
        toast(this, 'danger', 'Erro carregar a resposta')
      }

      // constrói o obj da requisição
      const sendMessage = {
        message_id: this.msgId,
        message: message.text,
        voice: this.voiceId
      }

      // chama o tts
      api.post('/chat/texttospeech', sendMessage).then((response) => {
        // chama do s3
        this.audioPlayer = new Audio(`https://api-ema.s3.amazonaws.com/${this.audioUrl}`)
        message.isLoadingAudio = false
        this.audioPlayer.play()
        message.isSpeaking = true

        // continua a função de play
        this.audioPlayer.addEventListener('ended', () => {
          message.isSpeaking = false
          this.audioPlayer = new Audio()
          this.audioUrl = null
        })
        this.audioPlayer.addEventListener('error', () => {
          message.isLoadingAudio = false
          message.isSpeaking = false
          toast(this, 'danger', 'Erro ao enviar para a API', 'Erro ao carregar recurso')
        })
      }).catch((error) => {
        message.isSpeaking = false
        message.isLoadingAudio = false
        console.error('Erro ao acessar o microfone:', error)
        toast(this, 'danger', 'Erro ao enviar para a API', error)
      })
    },
    pauseAudio (message) {
      message.isSpeaking = false
      message.isLoadingAudio = false
      this.audioPlayer.pause()
    }
  }
}
