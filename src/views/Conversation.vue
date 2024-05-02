<!-- Chat.vue -->
<template>
  <Content :style="windowWidth > 768 ? { position: 'relative', margin: '5% 2% 5% 7%' } : { position: 'relative', margin: 'auto' }" :title="'Conversation'" :action="action" @event="goTo">
    <template #selects>
        <div :class="windowWidth > 768 ? 'row': 'col'" :style="windowWidth > 768 ? {flexDirection: 'row', justifyContent: 'space-between', marginTop:' 1%', placeContent: 'center' } : null">
          <b-form-group class="mb-0">
            <h5>selecionar voz</h5>
      <b-form-select
        v-model="selected"
        @input="onVoiceSelected">
      >
      <b-form-select-option v-for="(option, index) in options" :key="index" :value="option.key">{{ option.text }}</b-form-select-option>
      </b-form-select>
    </b-form-group>
    <microphone-selector />
    </div>
      </template>
      <div id="chat" class="chat-container">
        <div :v-if="messages.length" class="chat-messages" v-for="(message, index) in messages" :key="index">
          <div class="message-row" :class="{ 'user-message': message.isUser }">
            <!-- Message Column -->
            <div class="message-column" :class="{ 'message-column-reverse': message.isUser }">
              <div :id="'message-'+index" class="message-content">
                {{ message.text }}
                <br>
                <br>
                <div class="traduct-ia" v-if="translations[message.text] && message.isUser === false">
                  <span>{{ traduct[0] }}</span>
                </div>
              </div>
            </div>

            <!-- Icons Column -->
            <div v-if="!message.isUser" class="icons-column" :class="{ 'icons-column-reverse': message.isUser }">
              <div class="message-icons">
                <i v-if="message.isLoadingTranslate == false" role="button" class="icon-translate" @click="toggleTranslation(message.text)"></i>
                <div v-else class="text-center text-dark my-2">
                  <b-spinner style="color: #115f63;" type="grow" label="Spinning" class="align-middle"></b-spinner>
                </div>
                <i v-if="message.isLoadingAudio == false" role="button" class="material-icons" style="color: #115f63;cursor: pointer;" @click="toggleAudio(message, selected)">
                {{ message.isSpeaking === true ? 'pause_circle': 'play_circle' }}
                </i>
                <div v-if="message.isLoadingAudio == true" class="text-center text-dark my-2">
                  <b-spinner style="color: #115f63;" type="grow" label="Spinning" class="align-middle"></b-spinner>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="chat-container-generic" v-if="!messages.length">
          <div class="chat-messages">
            <div id="" class="message-row">
            <!-- Message Column -->
            <div  class="message-column">
              <div class="message-content">
                {{ genericMessage.text }}
                <br>
                <br>
                <div class="traduct-ia" v-if="translations[genericMessage.text] && genericMessage.isUser === false">
                  <span>{{ traduct[0] }}</span>
                </div>
              </div>
            </div>
            <!-- Icons Column -->
            <div v-if="!genericMessage.isUser" class="icons-column" :class="{ 'icons-column-reverse': genericMessage.isUser }">
              <div class="message-icons">
                <i v-if="genericMessage.isLoadingTranslate == false" role="button" class="icon-translate" @click="toggleTranslation(genericMessage.text)"></i>
                <div v-else class="text-center text-dark my-2">
                  <b-spinner style="color: #115f63;" type="grow" label="Spinning" class="align-middle"></b-spinner>
                </div>
                <i v-if="genericMessage.isLoadingAudio == false" role="button" class="material-icons" style="color: #115f63;cursor: pointer;" @click="toggleAudio(genericMessage, selected)">
                {{ genericMessage.isSpeaking === true ? 'pause_circle': 'play_circle' }}
                </i>
                <div v-if="genericMessage.isLoadingAudio == true" class="text-center text-dark my-2">
                  <b-spinner style="color: #115f63;" type="grow" label="Spinning" class="align-middle"></b-spinner>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>

        <div  class="chat-input" :style="{ zIndex: showSuggestionsModal === false  ? '1' : '999999' }">
          <div class="icons-container">
            <Microphone v-if="isLoading == false" :isListening="isListening" :toggleListening="toggleListening" />
            <div v-else class="text-center text-dark my-2">
              <b-spinner style="color: #115f63;" type="grow" label="Spinning"></b-spinner>
              <b-spinner style="color: #115f63;" type="grow" label="Spinning"></b-spinner>
              <b-spinner style="color: #115f63;" type="grow" label="Spinning"></b-spinner>
            </div>
            <i role="button" ref="button-suggest" v-b-modal.modal-suggestion class="lightbulb" @click="openSuggestionsModal"></i>
            <b-tooltip v-if="!showSuggestionsModal" :target="() => $refs['button-suggest']" title="Abrir funcionalidades especiais"></b-tooltip>
          </div>
        </div>
    <!-- Suggestions Modal -->
        <SuggestionsModal :messages="messages" :showModal="showSuggestionsModal"  @close-modal="closeSuggestionsModal"/>
      </div>
  </Content>
</template>

<script>
import Content from '../components/content/index'
import Microphone from '@/components/forms/Microphone.vue'
import MicrophoneSelector from '@/components/Modals/MicrophoneSettings.vue'
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
      windowWidth: window.innerWidth,
      isLoading: false,
      isLoadingTranslate: false,
      apiChatList: [],
      messages: [],
      selectedChat: null,
      isListening: false,
      isRecording: false,
      showSuggestionsModal: false,
      recognition: null,
      transcriptParts: null,
      fullTranscript: null,
      traduct: {},
      selected: null,
      currentMessage: null,
      translations: {},
      traductModal: null,
      /* suggestionTexts: [], */
      showTranslation: false,
      mediaRecorder: null,
      recordedChunks: [],
      options: [
        { key: 'fable', text: 'William' },
        { key: 'alloy', text: 'Michael' },
        { key: 'onyx', text: 'James' },
        { key: 'nova', text: 'Emma' },
        { key: 'shimmer', text: 'Zoe' },
        { key: 'echo', text: 'Paul' }
      ],
      genericMessage: {
        text: 'Hello! What would you like to talk about today?',
        audio: null,
        isUser: false,
        isPlaying: false,
        isSpeaking: false,
        isLoadingTranslate: false,
        isLoadingAudio: false
      },
      suggestionId: null
    }
  },
  mounted () {
    if ('speechSynthesis' in window) {
      console.log('Speech recognition supported 😊')
    } else {
      toast(this, 'danger', 'Speech recognition not supported 😢')
    }
    this.scrollToTop()
    this.getChatList()
    const keyValue = this.$route.query.key
    var loadChat = document.getElementById('chat')
    if (!localStorage.getItem('selectedVoice')) {
      this.selected = this.options[0].key
      localStorage.setItem('selectedVoice', JSON.stringify(this.options[0].key))
    }
    this.messages.push(this.genericMessage)
    loadChat.addEventListener('load', this.handleChatSelected(keyValue, this.selectedId), this.setDefaultVoice(keyValue))
  },
  components: {
    Content, Microphone, SuggestionsModal, MicrophoneSelector
  },
  computed: {
    action () {
      return { options: { label: 'Página inicial', icon: 'home' } }
    }
  },
  watch: {
    selected: {
      handler (newValue) {
        this.selected = newValue
      },
      immediate: true,
      deep: true
    },
    lastMessage: {
      handler (newValue) {
        this.lastMessage = newValue
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    getChatList () {
      const userId = this.$store.state.user.id

      api.get('/chat/chatlist/' + userId).then(response => {
        if (userId === this.$store.state.user.id) {
          setTimeout(() => {
            this.$store.state.apiChatList = response.data.chats !== 'Nenhum chat para este usuário' ? response.data.chats : []
          }, 100)
        } else {
          setTimeout(() => {
            this.$store.state.apiChatList = []
          }, 1000)
        }
      }).catch(error => {
        if (error.message === 'Request failed with status code 401') {
          this.$router.push({ name: 'Home' })
          setTimeout(() => {
            toast(this, 'danger', 'Você não tem permissão para acessar este recurso, por favor contate um administrador', error.message)
          }, 100)
        }
        toast(this, 'danger', 'Erro ao obter lista de chats:', error.message)
        console.error('Erro ao obter lista de chats:', error.message, error.data)
        this.$store.state.apiChatList = []
      })
    },
    scrollToTop () {
      document.getElementById('sidebar').scrollTop = 0
      document.body.scrollTop = 0 // For Safari
      document.documentElement.scrollTop = 0 // For Chrome, Firefox, IE and Opera
    },
    onVoiceSelected () {
      // Salvar a voz selecionada no armazenamento local
      localStorage.setItem('selectedVoice', JSON.stringify(this.selected))
      // Restaurar a voz persistida ao selecionar uma voz
      this.setDefaultVoice()
    },
    setDefaultVoice (chatKey) {
      // Obter a voz persistida do armazenamento local
      const persistedVoice = localStorage.getItem('selectedVoice')

      if (persistedVoice !== null) {
        const selectedVoice = JSON.parse(persistedVoice)
        this.selected = selectedVoice
      } else {
        // Se não houver voz persistida, definir a primeira voz como padrão
        this.selected = this.options[0].key
      }

      if (this.selectedId) {
        this.handleChatSelected(chatKey, this.selected)
      }
    },
    handleChatSelected (chat, voice) {
      this.selectedChat = chat
      api.post('/chat/getChat', {
        chat_key: chat,
        voice: JSON.parse(localStorage.getItem('selectedVoice')).key
      }).then(response => {
        // Verifica se a chat_key está presente na apiChatList
        if (JSON.parse(response.config.data).chat_key === chat) {
          localStorage.setItem('suggestionId', response.data.chat_info.extra_field_id)
          // Esvazia o array de messages
          this.messages = []
          const messageContents = typeof response.data.chat.json !== 'object' ? JSON.parse(response.data.chat.json) : []
          this.messages.unshift(this.genericMessage)
          return messageContents.map(m => {
            const isIaMsg = m.user === 'IA'
            const isNotIAMsg = m.user !== 'IA'
            const newMessage = {
              id: m.id,
              text: m.message,
              isUser: isNotIAMsg ?? isIaMsg,
              audio: m.audio,
              isPlaying: false,
              isSpeaking: false,
              isLoadingTranslate: false,
              isLoadingAudio: false
            }

            // Adiciona a mensagem à array de messages
            this.messages.push(newMessage)
          }) ?? null
        } else {
          // Esvazia o array de messages se a chat_key não corresponder
          this.messages = []
        }
      })
    },
    scrollToBottom () {
      if (this.messages.length === 3) {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
      }
    },
    toggleTranslation (message) {
      this.traduct = {}
      // Verifica se a tradução atual está sendo fechada
      if (this.translations[message]) {
        this.$set(this.translations, message, false)
        this.traduct = {}
        this.isLoadingTranslate = false
        return
      }

      // Fecha todas as outras traduções antes de abrir a nova
      Object.keys(this.translations).forEach((key) => {
        this.$set(this.translations, key, false)
      })

      const foundMessage = this.messages.find(m => m.text === message)

      if (foundMessage) {
        this.$set(this.translations, message, !this.translations[message])
        if (this.translations[message]) {
          this.isLoadingTranslate = true
          if (foundMessage.isUser) {
            this.doTranslation(message)
          } else {
            this.doSystemMessageTranslation(message)
          }
        } else {
          this.traduct = {}
          this.isLoadingTranslate = false
        }
      }
    },
    goTo () {
      this.$router.push({ name: 'Home' })
    },
    toggleListening () {
      if (!this.isListening) {
        this.startRecording()
      } else {
        this.pauseRecording()
      }
    },
    startRecording () {
      navigator.mediaDevices.getUserMedia({ audio: true, sampleRate: 44100 })
        .then((stream) => {
          this.mediaRecorder = new MediaRecorder(stream)

          this.mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
              this.recordedChunks.push(event.data)
            }
          }

          this.mediaRecorder.onstop = () => {
            /*  const audioBlob = new Blob(this.recordedChunks, { type: 'audio/wav', bitsPerSecond: 128000 }) */
            if (window.location.search.length !== 0) {
              const audioBlob = new Blob(this.recordedChunks, { type: 'audio/wav', bitsPerSecond: 128000 })
              this.sendAudioToApi(audioBlob)
            } else {
              const audioBlob = new Blob(this.recordedChunks, { type: 'audio/wav', bitsPerSecond: 128000 })
              // Converter o Blob em uma string usando FileReader
              const reader = new FileReader()
              reader.onload = (event) => {
                const blobAsText = event.target.result
                localStorage.setItem('audioBlob', blobAsText) // Armazenar no localStorage
                this.openNewChat() // Chamar openNewChat após armazenar o Blob
              }
              reader.readAsDataURL(audioBlob) // Leitura do Blob como uma URL de dados
            }
            this.recordedChunks = []
          }
          this.mediaRecorder.start()
          this.isListening = true
        })
        .catch((error) => {
          console.error('Erro ao acessar o microfone:', error)
          toast(this, 'danger', 'Erro ao acessar o microfone:', error)
        })
    },
    pauseRecording () {
      this.mediaRecorder.stop()
      this.isListening = false
      this.showSuggestionsModal = false
    },
    dataURLtoBlob (dataURL) {
      const byteString = atob(dataURL.split(',')[1])
      const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0]
      const ab = new ArrayBuffer(byteString.length)
      const ia = new Uint8Array(ab)
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i)
      }
      return new Blob([ab], { type: mimeString })
    },
    openNewChat () {
      // Assumindo que você tenha um user_id disponível
      const userId = this.$store.state.user.id
      const blobAsText = localStorage.getItem('audioBlob') // Recuperar a string do localStorage

      // Converter a string de volta para um Blob
      const audioBlob = this.dataURLtoBlob(blobAsText)

      // Faz a requisição para criar um novo chat
      api.post('chat/newchat', { user_id: userId })
        .then(response => {
          const newChat = response.data.ExtraField.key
          const currentQuery = { ...this.$route.query }
          currentQuery.key = newChat

          const newUrl = `${window.location.pathname}?${new URLSearchParams(currentQuery).toString()}`

          // Use history.replaceState para alterar a URL sem recarregar o componente
          window.history.replaceState({}, '', newUrl)
          this.$route.query.key = newChat
          this.$emit('chat_updated', [...this.$store.state.apiChatList, { key: newChat, name: newChat, update: new Date().toISOString() }])
          this.sendAudioToApi(audioBlob)
          this.handleChatSelected(window.location.search.split('=')[1], JSON.parse(localStorage.getItem('selectedVoice')))
          setTimeout(() => this.editName(window.location.search.split('=')[1], this.messages[0].text), 7000)
        })
        .catch(error => {
          console.error('Erro ao criar novo chat:', error.message)
          // toast(this, 'error', 'Erro', 'não foi possível cadastrar um novo chat')
        })
    },
    sendAudioToApi (audioBlob) {
      this.showSuggestionsModal = false
      this.isLoading = true
      const formData = new FormData()
      formData.append('audio', audioBlob, 'recording.wav')
      formData.append('chat_key', window.location.search.split('=')[1])
      formData.append('voice', JSON.parse(localStorage.getItem('selectedVoice')))

      api.post('chat/userConversation', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then((response) => {
          this.handleChatSelected(this.selectedChat, JSON.parse(localStorage.getItem('selectedVoice')))
          const data = JSON.parse(response.data)
          const isIaMsg = Object.keys(data).map(d => d === 'ia')[0]
          const isNotIAMsg = Object.keys(data).map(d => d === 'user')[0]
          const lastTwoMessages = this.messages.slice(-2) // Get the last two messages
          if (lastTwoMessages.length > 1) {
            const audio = lastTwoMessages[1].audio // Access audio property if available
            const id = lastTwoMessages[1].message_id
            if (audio) {
              var isIAMessage = {
                id: id,
                audio: audio,
                text: data.ia,
                isUser: isIaMsg,
                isPlaying: false,
                isSpeaking: false,
                isLoadingTranslate: false,
                isLoadingAudio: false
              }
            } else {
              // Handle the case where audio is undefined or not present
              console.error('Audio property is undefined or not present in the second last message.')
            }
            this.messages = [...this.messages, isIAMessage]
          } else {
            // Handle the case where there are not enough messages in the array
            console.error('There are not enough messages in the array to access the second last message.')
          }
          const isUserMsg = {
            id: data.message_id,
            text: data.user,
            isUser: isNotIAMsg,
            isPlaying: false,
            isSpeaking: false,
            isLoadingTranslate: false,
            isLoadingAudio: false
          }

          this.messages.filter((value, index, self) => {
            return self.indexOf(value) === index
          })
          // Array original de objetos
          const array = this.$store.state.apiChatList

          // Valor da query que vamos usar para filtrar
          const queryKey = this.$route.query.key || window.location.search.split('=')[1]

          // Encontrar o índice do objeto com a chave especificada
          const indexToRemove = array.findIndex(obj => obj.key === queryKey)

          // Verificar se o objeto com a chave especificada foi encontrado
          if (indexToRemove !== -1) {
            // Remover o objeto do array
            const removedObject = array.splice(indexToRemove, 1)[0]

            // Adicionar a propriedade "update" com a data atual
            removedObject.update = new Date().toISOString()

            // Adicionar o objeto modificado na primeira posição do array
            array.unshift(removedObject)
          } else {
            // toast(this, 'danger', 'Ops!', 'Objeto com a chave especificada não encontrado no array.')
            console.error('Objeto com a chave especificada não encontrado no array.')
          }

          this.$store.dispatch('updateApiList', array)
          this.handleChatSelected(this.selectedChat, JSON.parse(localStorage.getItem('selectedVoice')))
          setTimeout(() => {
            this.scrollToBottom()
          }, 200)

          this.isLoading = false
          setTimeout(() => {
            this.playLastMessage()
          }, 2000)
          this.messages = [...this.messages, isUserMsg, isIAMessage]
          if (this.messages.length === 3) {
            this.editName(window.location.search.split('=')[1], this.messages[1].text)
          }
        })
        .catch((error) => {
          toast(this, 'danger', 'Erro ao enviar para a API', error)
          this.isLoading = false
          console.error('Erro ao enviar áudio para a API:', error)
        })
    },
    playLastMessage () {
      const lastMessageIndex = this.messages.length - 1
      if (lastMessageIndex >= 0) {
        this.lastMessage = this.messages[lastMessageIndex]
        // Verifica se a mensagem é a última
        if (this.messages.indexOf(this.lastMessage) === lastMessageIndex) {
          // É a última mensagem
          this.playAudio(this.lastMessage, JSON.parse(localStorage.getItem('selectedVoice')))
        } else {
          toast(this, 'danger', 'Ops!', 'Esta não é a última mensagem.')
          console.log('Esta não é a última mensagem.')
        }
      } else {
        toast(this, 'danger', 'Ops!', 'Nenhuma mensagem encontrada para reprodução.')
        console.log('Nenhuma mensagem encontrada para reprodução.')
      }
    },
    editName (key, name) {
      api.put('chat/editChatName', { chat_key: key, chat_name: name })
        .then((response) => {
          this.$emit('chat_updated', [...this.$store.state.apiChatList, { key: key, name: name, update: new Date().toISOString() }])
          this.$store.dispatch('updateApiList', [...this.$store.state.apiChatList, { key: key, name: name, update: new Date().toISOString() }])
        })
        .catch(error => {
          console.error('Erro ao criar novo chat:', error)
        })
    },
    openSuggestionsModal () {
      this.showSuggestionsModal = true
    },
    closeSuggestionsModal () {
      this.showSuggestionsModal = false
    }
  },
  updated () {
  // Redefine a última mensagem para null toda vez que o componente for atualizado
    this.lastMessage = null
  }

}
</script>

<style scoped>
/* Estilos aprimorados para o componente de chat */
.chat-container {
  max-width: 90vw;
 /*  margin: 5% auto; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;
}

@media screen and (max-width: 640px) {
  .chat-container {
  max-width: 90vw;
  margin: 50% auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;
}
}

.chat-container-generic {
  width: 80vw;
  margin: 2% auto;
  display: flex;
  flex-direction: column;
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
  max-width: 70%;
  padding: 1.5%;
  border-radius: 30px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

.message-column-reverse {
    max-width: 70%;
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
   background-color: #115f63;
   color: #fff;
   padding: 2%;
   border-radius: 10px;
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
