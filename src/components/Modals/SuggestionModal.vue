<template>
  <div v-if="showModal" class="suggestions-modal">
    <div class="modal-content">
      <i class="material-icons modal-close" @click="closeModal">close</i>
      <i v-show="selectedView" class="material-icons modal-back" @click="closeSelectedView">arrow_back</i>

      <!-- Initial view with two buttons -->
      <div v-if="selectedView === null">
        <h4>O que você quer fazer?</h4>
        <!-- Button section -->
        <div class="button-section">
          <button class="button-option" @click="showSuggestions">Gerar resposta automática</button>
          <span style="font-size: 12px; padding: 10px;">Será gerada uma sugestão de resposta em inglês para você usar na conversa</span>
          <button class="button-option" @click="showTalkSection">Tradução inteligente</button>
          <span style="font-size: 12px; padding: 10px;">Escreva em português a frase que gostaria de dizer em inglês e uma tradução inteligente será gerada em inglês.</span>
        </div>
      </div>

      <!-- Selected view (Suggestions or Talk and Translate) -->
      <div v-if="selectedView === 'suggestions'" class="justify-content-around">
        <div class="d-flex justify-content-around">
          <h4>Sugestão de resposta:</h4>
          <!-- Lightbulb icon at the right corner -->
          <i class="lightbulb-modal"></i>
        </div>
        <div class="row suggestion" v-for="(suggestionText, index) in suggestionTexts" :key="index">
          <div class="row">
            <!-- Add click event to suggestion text -->
          <p :class="windowWidth >= 768 ? 'col-12': 'col-10'" style="cursor: pointer; text-align: justify;">
            {{ suggestionText.text }}
          </p>
          <!-- Display translation below with smaller font -->
          <p v-if="isTranslationVisible === true" class="col-12 traduct-small" :style="windowWidth < 768 ? {cursor: 'pointer', textAlign: 'justify', padding: '2%', margin: '0 10%'}: null">
           <span :style="windowWidth >= 768 ? { padding:'2%', display: 'flex' } : { padding: '5%' }">
            {{ translationsModal[suggestionText.text][0] }}
           </span>
          </p>
          </div>
          <!-- Icons for translation and playback -->
          <div class="col-3">
            <!-- Add click event to translate icon -->
            <i role="button" class="icon-translate" @click="toggleTranslationModal(suggestionText.text)"></i>
            <i v-if="isLoadingAudio == false" role="button" class="material-icons" style="color: #115f63;cursor: pointer !important" @click="toggleAudio(suggestionText)">
              {{ suggestionText.isSpeaking ? 'pause_circle' : 'play_circle' }}
            </i>
            <div v-else class="text-center text-dark my-2">
            <b-spinner style="color: #115f63;" type="grow" label="Spinning" class="align-middle"></b-spinner>
          </div>
          </div>
        </div>
        <div v-if="!suggestionTexts.length">
          <div class="text-center text-dark my-2">
            <b-spinner style="color: #115f63;" type="grow" label="Spinning" class="align-middle"></b-spinner>
        </div>
      </div>
      <div class="modal-footer" style="background-color: #17a2b8;">
        <span class="text-white" style="font-size: 12px;">Mantenha essa janela aberta, clique no botão de microfone abaixo para ler em voz alta a mensagem gerada em inglês e envia-la para continuar a conversa</span>
      </div>
      </div>

      <div v-if="selectedView === 'talkAndTranslate'">
    <!-- Talk and Translate content -->
    <h4>Como falar isso em inglês?:</h4>
    <br>
    <div class="google-translate-container">
            <input class="google-translate-input" type="text" name="translation" v-model="inputText" @keyup.enter="translateAndSpeak(inputText)" placeholder="Digite aqui sua frase em português" />
            <button style="margin: 5% auto;" class="button-option" @click="translateAndSpeak(inputText)">Gerar tradução inteligente</button>
        <br>
        <div v-if="translation" class="google-translate-output">
            <strong>Translation:</strong> {{ translation }}
            <i v-if="isLoadingAudio == false" role="button" @click="getAudio(translation)" class="material-icons" :style="{ color: '#115f63', cursor: 'pointer' }">
                {{ isSpeaking ? 'pause_circle' : 'play_circle' }}
            </i>
            <div v-else class="text-center text-dark my-2">
            <b-spinner style="color: #115f63;" type="grow" label="Spinning" class="align-middle"></b-spinner>
          </div>
        </div>
    </div>
    <div class="modal-footer" style="background-color: #17a2b8;">
        <span class="text-white" style="font-size: 12px;">Mantenha essa janela aberta, clique no botão de microfone abaixo para ler em voz alta a mensagem gerada em inglês e envia-la para continuar a conversa</span>
      </div>
</div>

    </div>
  </div>
</template>

<script>
import audioMixin from '@/mixins/audioMixin'
import translationMixin from '@/mixins/translationMixin'
import messageMixin from '@/mixins/messageMixin'
import { api } from '@/services'
import { toast } from '@/utils'
import translate from 'translate'

export default {
  mixins: [audioMixin, translationMixin, messageMixin],
  props: {
    showModal: Boolean,
    messages: Array
  },
  data () {
    return {
      windowWidth: window.innerWidth,
      haspadding: 2,
      translationsModal: {},
      inputText: '',
      translation: '',
      activeButton: '',
      selectedView: null,
      isTranslationVisible: false,
      isLoadingAudio: false,
      isSpeaking: false,
      talkAndTranslate: false,
      suggestionTexts: []
    }
  },
  mounted () {
    this.selectedView = null
  },
  updated () {
    if (this.selectedView === null) {
      this.inputText = ''
      this.translation = ''
    }
    if (this.showModal === false) {
      this.selectedView = null
      this.suggestionTexts.pop()
    }
  },
  destroyed () {
    if (this.selectedView === 'talkAndTranslate' || this.selectedView === 'suggestions') {
      this.selectedView = null
    }
  },
  computed: {
    translateEnabled () {
      if (this.isTranslationVisible === true) {
        return {
          padding: this.haspadding + '%'
        }
      } else {
        return { padding: 'unset !important' }
      }
    }
  },
  watch: {
    translation: {
      handler (newValue) {
        this.translation = newValue
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    callSuggestions () {
      var id = localStorage.getItem('suggestionId')
      api.post('/sugestions', { extra_field_id: id }).then(response => {
        response.data.map((a) => {
          this.suggestionTexts.push({
            text: a, // colocar id e text de volta depois
            message_id: id,
            audio: null,
            isUser: false,
            isPlaying: false,
            isSpeaking: false,
            isLoadingTranslate: false,
            isLoadingAudio: false
          })
        })
      }).catch(error => {
        toast(this, 'danger', 'Erro ao carregar sugestões', error)
      })
    },
    showSuggestions () {
      this.closeAllTranslations()
      this.callSuggestions()
      this.selectedView = 'suggestions'
    },
    showTalkSection () {
      this.closeAllTranslations()
      this.selectedView = 'talkAndTranslate'
    },
    closeSelectedView () {
      this.selectedView = null // Reset selected view
    },
    closeAllTranslations () {
      // Close all translations
      this.translationsModal = {}
      this.isTranslationVisible = false
    },
    async translateAndSpeak (input) {
      try {
        this.translation = await translate(input, { from: 'pt', to: 'en' })
      } catch (error) {
        console.error('Error translating or playing audio:', error)
      }
    },
    getAudio (translation) {
      this.isLoadingAudio = true
      this.talkAndTranslate = {
        text: translation,
        message_id: '',
        audio: '',
        isPlaying: false,
        isSpeaking: false,
        isLoadingTranslate: false
      }
      this.playAudio(this.talkAndTranslate, JSON.parse(localStorage.getItem('selectedVoice')))
      this.isSpeaking = true
      setTimeout(() => {
        this.isLoadingAudio = false
        setTimeout(() => {
          this.isSpeaking = false
        }, 3000)
      }, 1000)
    },
    closeModal () {
      this.selectedView = null
      this.$emit('close-modal')
    },
    toggleTranslationModal (message) {
      // Verifica se a mensagem existe no array de sugestões
      const foundSuggestion = this.suggestionTexts.find(s => s.text === message)

      if (foundSuggestion) {
        // Verifica se a tradução está ativada para esta sugestão
        const isTranslationActivated = !this.translationsModal[message]
        /* this.$set(this.translationsModal, message, !this.translationsModal[message]) */

        // Se a tradução estiver ativada, execute a tradução apenas para a sugestão clicada
        if (isTranslationActivated) {
          this.doSystemMessageTranslationModal(message)
        } else {
          // Se a tradução for desativada, limpe a tradução apenas para a sugestão clicada
          this.$set(this.translationsModal, message, null)
        }
      }
    },
    doSystemMessageTranslationModal (message) {
      api.post('chat/translate', { message })
        .then(response => {
          if (response.data !== undefined && response.data !== null && response.data !== '') {
            this.$set(this.translationsModal, message, response.data)
            this.isTranslationVisible = true
          } else {
            this.isTranslationVisible = false
          }
        })
        .catch(error => {
          console.error('Error translating suggestion:', error)
        })
    }
  }
}
</script>

<style scoped>
  /* Suggestions Modal Styles */
  .suggestions-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  }

  .modal-content {
    width: 100%;
    max-width: 50%;
    background-color: #fff;
    padding: 25px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  }

  @media screen and (max-width: 767px){
  .modal-content{
    max-width: 90%; /* Adjust max-width as needed */
    padding: 15px;
  }
}

  .lightbulb-modal {
    width: 25px;
    color: #115F63;
    cursor: pointer;
    content: url(../../assets/custom-icons/bulb.svg);
  }

  .suggestion {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    align-content: center;
    flex-wrap: nowrap;
    flex-direction: row;
    /* gap: 25%; */
    padding: 2%;
  }

  .suggestion-text {
    display: flex;
    padding: 1%;
    align-items: center;
    justify-content: flex-start;
    align-content: center;
    flex-wrap: nowrap;
    flex-direction: row;
    gap: 10%;
    text-align: justify;
  }

  .modal-close {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
  }

  .modal-back {
    position: absolute;
    top: 20px;
    right: 90%;
    cursor: pointer;
  }

  .icon-translate {
    cursor: pointer;
    width: 25px;
    height: 25px;
    content: url(../../assets/custom-icons/tradutor.svg);
  }

  .icon-play {
    width: 25px;
    height: 25px;
    content: url(../../assets/custom-icons/play.svg);
  }

  .icons-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 999999;
  }

  .button-section {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-content: center;
    justify-content: center;
    align-items: center;
  }

  .button-option {
    display: flex;
    padding: 1.5%;
    border-radius: 10px;
    border: unset;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-color: #115f63;
    color: white;
    flex-wrap: wrap;
    margin: 1%;
  }

  .traduct-small {
    cursor:auto;
    text-align: justify;
    background-color: #115f63;
    color: #fff;
    border-radius: 10px;
  }

  /*translate*/
  .google-translate-container {
    max-width: 400px;
    margin: 0 auto;
}

.google-translate-input {
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 8px;
}

.google-translate-output {
    margin-top: 10px;
}

.material-icons {
    font-size: 24px;
}

</style>
