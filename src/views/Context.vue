<template>
    <Content title="Context" :action="action">
  <Interface
    noBtn
    :noTitle="true"
    :noFilter="true"
    :noHeader="true"
  >
   <div class="input-group w-50">
              <input v-model="promptMessage" type="search" placeholder="Tell me the next context..." aria-describedby="button-context" class="form-control border-0 bg-light">
              <div class="input-group-append">
                <button @click="contextConversation(promptMessage)" id="button-addon1" type="submit" class="btn btn-link text-primary">
                  <i class="material-icons-outlined search-icon">search</i>
                </button>
              </div>
            </div>
            <div id="chat" class="chat-container">
        <div class="chat-messages" v-for="(message, index) in messages" :key="index">
          <div class="message-row" :class="{ 'user-message': message.isUser }">
            <div class="message-column" :class="{ 'message-column-reverse': message.isUser }">
              <div class="message-content">
                {{ message.text }}
                <br>
                <span class="traduct" v-if="translations[message.text] && message.isUser">{{ traduct }}</span>
                <span class="traduct-ia" v-else-if="translations[message.text] && message.isUser === false">{{ traduct }}</span>
              </div>
            </div>

            <div class="icons-column" :class="{ 'icons-column-reverse': message.isUser }">
              <div class="message-icons">
                <i role="button" class="icon-translate" @click="toggleTranslation(message.text)"></i>
                <i role="button" class="material-icons" style="color: #115f63;cursor: pointer;" @click="toggleAudio(message.text)">
                {{ isSpeaking === true ? 'pause_circle': 'play_circle' }}
                </i>
              </div>
            </div>
          </div>
        </div>

        <div class="chat-input" :style="{ zIndex: showSuggestionsModal === false  ? '1' : '999999' }">
          <div class="icons-container">
            <Microphone  :isListening="isListening" :toggleListening="toggleListening" />
            <i role="button" ref="button-suggest" v-b-modal.modal-suggestion class="lightbulb" @click="openSuggestionsModal"></i>
            <b-tooltip :target="() => $refs['button-suggest']" title="Click here for suggestions!"></b-tooltip>
          </div>
        </div>
        <SuggestionsModal :messages="messages" :showModal="showSuggestionsModal" :suggestionTexts="suggestionTexts" @close-modal="closeSuggestionsModal"/>
      </div>
        </Interface>
</Content>
</template>

<script>
import Interface from '@/components/Dashboard/Interface'
import Content from '../components/content/index'
import Microphone from '@/components/forms/Microphone.vue'
import SuggestionsModal from '@/components/Modals/SuggestionModal.vue'
import { api } from '@/services'
import { toast } from '@/utils'
import audioMixin from '../mixins/audioMixin'
import translationMixin from '../mixins/translationMixin'
import messageMixin from '../mixins/messageMixin'

export default {
  mixins: [audioMixin, translationMixin, messageMixin],
  data () {
    return {
      promptMessage: null,
      messages: [],
      isListening: false,
      isRecording: false,
      showSuggestionsModal: false,
      recognition: null,
      transcriptParts: null,
      fullTranscript: null,
      traduct: null,
      currentMessage: null,
      translations: {},
      traductModal: null,
      suggestionTexts: [
        { message: "I'd like to improve my vocabulary." },
        { message: 'Can you recommend a good English book?' },
        { message: 'Will you please correct my pronunciation?' }
      ],
      showTranslation: false
    }
  },
  mounted () {
    if ('speechSynthesis' in window) {
      console.log('Speech recognition supported 😊')
    } else {
      console.log('Speech recognition not supported 😢')
      toast(this, 'danger', 'Speech recognition not supported 😢')
    }
    api.get('getIaChat').then(response => {
      response.data.map(res => {
        const isIaMsg = res.user === 'IA'
        const isNotIAMsg = res.user !== 'IA'
        this.messages.push({
          text: res.message,
          isUser: isNotIAMsg ?? isIaMsg,
          isPlaying: false
        })
      })
      setTimeout(() => { this.scrollToBottom() }, 500)
    })
  },
  components: {
    Interface, Content, Microphone, SuggestionsModal
  },
  computed: {
    action () {
      return { options: { label: 'Home', icon: 'home' } }
    }
  },
  methods: {
    scrollToBottom () {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
    },
    contextConversation (promptMessage) {
      this.promptMessage = promptMessage
      api.post('chat/handleConversation', { prompt: this.promptMessage }).then(response => {
        this.messages.push({
          text: response.message, // this.promptMessage,
          isUser: true
        })
        console.log(this.messages)
      })
    },
    goTo () {
      this.$router.push({ name: 'Home' })
    },
    toggleListening () {
      if (!this.isListening && !this.isRecording) {
        this.startListening()
      } else {
        this.stopListening()
      }
    },

    startListening () {
      if (!this.isListening && !this.isRecording) {
        this.isRecording = true
        this.isListening = true

        if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window || 'speechSynthesis' in window) {
          this.recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)()
          console.log('has recognition', this.recognition)
          this.recognition.lang = 'en-US'

          this.transcriptParts = []

          this.recognition.onresult = (event) => {
            console.log('deu resultado de evento', event.results)
            let transcript = null
            for (let i = 0; i < event.results.length; i++) {
              transcript = event.results[i][0].transcript
              this.transcriptParts.push(transcript)
              console.log('transcrição em partes', this.transcriptParts)
              const fullTranscript = this.transcriptParts.join(' ')

              console.log('fulltranscript var value', fullTranscript)
              // Salva o áudio no localStorage
              this.updateFullTranscript(fullTranscript)
              console.log('salvou no localStorage')
            }
            console.log('saiu do for', transcript)
          }
          console.log('saiu do onresult')

          this.recognition.onerror = () => {
            this.isListening = false
            // Pare de escutar em caso de erro
            this.stopListening()
            toast(this, 'danger', 'Ops! Something went wrong, sorry!')
            console.log('caiu no error')
          }
          console.log('começou a mensagem')
          this.recognition.start()
        }
      } else {
        console.log('caiu na falta de suporte')
        alert('O navegador não suporta a API de Reconhecimento de Fala. Para uma melhor experiência, utilize o Chrome.')
      }
    },
    updateFullTranscript (newTranscript) {
      console.log('new transcript', newTranscript)
      this.fullTranscript = newTranscript
      console.log('fulltranscript', this.fullTranscript)
      // aqui salvo o áudio no formato wav para mandar p/ a api
      const base64Audio = this.convertAudioToBase64(newTranscript)
      localStorage.setItem('audioFile', base64Audio)
      // aqui continuo a tranascrição pra texto
      localStorage.setItem('audioTranscript', this.fullTranscript)
    },
    convertAudioToBase64 (audio) {
    // Função para converter o áudio para base64
      const blob = new Blob([audio], { type: 'audio/wav' })
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result.split(',')[1])
        reader.onerror = reject
        reader.readAsDataURL(blob)
      })
    },
    stopListening () {
      console.log('chegou no stopListening')
      if (this.isListening && this.isRecording) {
        console.log('entrou no if do stopListening')
        this.isListening = false
        this.isRecording = false
        if (this.recognition) {
          console.log('chegou no if do recognition')
          this.recognition.stop()
          console.log('parou o reconhecimento de Fala', this.fullTranscript)
        }
        console.log('saiu do if')
        setTimeout(() => {
          this.sendMessage(this.fullTranscript)
          console.log('enviou a mensagem de Fala', this.fullTranscript)
        }, 500)
      }
    },
    // Adiciona esta função para dar autoplay ao adicionar uma nova mensagem
    playAudioForNewMessage (text) {
      this.transcribeToAudio(text).then(() => {
        console.log('Playback complete', text)
      })
    },

    openSuggestionsModal () {
      this.showSuggestionsModal = true
      // toast(this, 'info', 'Atenção', 'Em desenvolvimento')
    },
    closeSuggestionsModal () {
      this.showSuggestionsModal = false
    }
  }
}
</script>

<style>
.search-icon {
  color: #115f63;
  font-weight: 900;
}
/* Estilos aprimorados para o componente de chat */
.chat-container {
  max-width: 90vw;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;
}

.chat-messages {
  padding: 10px;
  width: 100%;
  background-color: #f5f5f5;
  margin: auto;
  display: flex;
  flex-direction: column;
}

.message-row {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 10px;
}

.message-row.user-message {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 5vh;
}

.message-column {
  max-width: 40%;
  padding: 1.5%;
  border-radius: 30px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

.message-column-reverse {
    width: 30%;
    display: flex;
    padding: 1.5%;
    border-radius: 30px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-color: #115f63;
    color: white;
    justify-content: flex-end;
    flex-wrap: wrap;
}

.user-score {
  position: relative;
    top: 10vh;
    right: 0;
    font-size: 1rem;
    margin: 5px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    gap: 1vw;
    align-items: center;
}
/* Adicione estas regras ao seu estilo CSS */

.traduct {
  color: #fff; /* Cor opcional */
}

/* Adicione estas regras ao seu estilo CSS */
.traduct-small {
  color: #115f63; /* Cor opcional */
}

.traduct-ia{
   color: #115f63;
 /* Cor opcional */
}

.spinner {
  font-size: 1rem;
  color: #115f63;
  content: url(../assets/custom-icons//circle-point.svg);
}

.icons-column {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.icons-column-reverse {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  right: calc(100vw - 75%);
}

.message-icons {
  display: flex;
  align-items: center;
  margin-top: 10px;
  left: 10%;
  position: relative;
}

.message-icons i {
  font-size: 18px;
  color: #757575;
  margin-right: 8px;
  cursor: pointer;
}

.icon-translate {
  cursor: pointer;
  width: 25px;
  height: 25px;
  content: url(../assets/custom-icons/tradutor.svg);
}

.icon-play {
  width: 25px;
  height: 25px;
  content: url(../assets/custom-icons/play.svg);
}

.icons-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chat-input {
    position: fixed;
    display: flex;
    justify-content: space-between;
    bottom: 20px;
    gap: 5%;
    text-align: center;
  }

.lightbulb {
  width: 4rem;
  height: 4rem;
  content: url(../assets/custom-icons/bulb.svg);
  cursor: pointer;
  position: relative;
  left: 30vw;
  z-index: 888;
  border-radius: 50%;
  background-color: white;
  padding: 5%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
}

@media only screen and (max-width: 1200px) {
  .icons-column-reverse[data-v-79f85786] {
    right: calc(0vw);
  }
}

/* New styles for responsiveness */
@media only screen and (max-width: 600px) {
  .message-column,
  .message-column-reverse {
    max-width: 100%;
    padding: 3%;
  }
  .icons-column-reverse[data-v-79f85786] {
    right: calc(0vw);
  }

  .icons-container {
    flex-direction: row;
    gap: 25px;
  }
  .lightbulb {
    left: 0;
  }

  .suggestions-modal .modal-content {
    width: 100vw;
  }
}

@media only screen and (max-width: 400px) {

  .suggestions-modal .modal-content {
    width: 100vw;
  }

  .icons-column-reverse[data-v-79f85786] {
    right: calc(0vw);
  }
  .message-icons i {
    font-size: 16px;
  }

  .icon-translate,
  .icon-play {
    width: 20px;
    height: 20px;
  }

  .lightbulb {
    width: 4rem;
    height: 4rem;
  }

  .chat-input {
    position: fixed;
    bottom: 20px;
    left: 0;
    display: flex;
    right: 0;
    text-align: center;
    align-items: center;
    justify-content: center;;
  }

  .message-icons,
  .icons-container {
    justify-content: center;
  }

  .lightbulb {
    left: 50%;
    transform: translateX(-50%);
  }

  .icons-container {
    flex-direction: row;
    gap: 25px;
  }
}
</style>
