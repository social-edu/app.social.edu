<template>
     <div class="modal-content">
      <div class="d-flex justify-content-around">
        <h4>Suggestion:</h4>
      <!-- Lightbulb icon at the right corner -->
      <i class="lightbulb-modal"></i>
      </div>
      <div class="suggestion" v-for="(suggestionText, index) in suggestionTexts" :key="index">
        <!-- Add click event to suggestion text -->
        <p style="cursor: pointer;" @click="addSuggestionToMessages(suggestionText.message)">
          {{ suggestionText.message }}
        </p>
        <!-- Display translation below with smaller font -->
        <span v-if="translationsModal[suggestionText.message]" class="traduct-small">
          {{ translationsModal[suggestionText.message] }}
        </span>
        <!-- Icons for translation and playback -->
        <div>
          <!-- Add click event to translate icon -->
          <i class="icon-translate" @click="toggleTranslationModal(suggestionText.message)"></i>
          <i class="material-icons" style="color: #115f63;cursor: pointer;" @click="transcribeToAudio(suggestionText.message)">
            {{ isSpeaking === true ? 'pause_circle': 'play_circle' }}</i>
        </div>
      </div>
      <!-- Close button for the modal -->
      <i class="material-icons modal-close" @click="closeModal">close</i>
    </div>
</template>
<script>
import audioMixin from '@/mixins/audioMixin'
import translationMixin from '@/mixins/translationMixin'
import messageMixin from '@/mixins/messageMixin'
import { api } from '@/services'

export default {
  mixins: [audioMixin, translationMixin, messageMixin],
  props: {
    suggestionTexts: Array,
    messages: Array
    // Outras props necessárias para o modal de sugestões
  },
  data: () => ({
    translationsModal: {},
    showModalData: true
  }),
  methods: {
    // Adiciona uma sugestão do modal às mensagens
    addSuggestionToMessages (suggestionText) {
    // Traduz a sugestão antes de adicioná-la às mensagens
      this.translateAndAddSuggestionToMessages(suggestionText)
    },
    closeModal () {
      this.$emit('close-modal') // Emite um evento para indicar que o modal deve ser fechado
    },

    // Traduz uma sugestão do modal e a adiciona às mensagens
    translateAndAddSuggestionToMessages (suggestionText) {
    // Fecha o modal de sugestões
      this.showSuggestionsModal = false

      // Adiciona a sugestão como se fosse uma mensagem do usuário
      this.sendMessage(suggestionText)

      // Realiza a tradução da sugestão antes de adicioná-la às mensagens
      this.doSystemMessageTranslation(suggestionText)
        .then(translation => {
        // Adiciona a tradução às mensagens
          this.messages.push({
            text: translation,
            isUser: false
          })
        })
        .catch(error => {
          console.error('Erro ao traduzir sugestão:', error)
        })
    },
    toggleTranslationModal (message) {
      // Verifica se a mensagem existe no array de sugestões
      const foundSuggestion = this.suggestionTexts.find((s) => s === message)

      if (foundSuggestion) {
        // Verifica se a tradução está ativada para esta sugestão
        this.$set(this.translationsModal, message, !this.translationsModal[message])

        // Se a tradução estiver ativada, execute a tradução apenas para a sugestão clicada
        if (this.translationsModal[message]) {
          this.doSystemMessageTranslationModal(message)
        } else {
          // Se a tradução for desativada, limpe a tradução apenas para a sugestão clicada
          this.$set(this.translationsModal, message, null)
        }
      }
    },
    // ... Seu código existente ...
    doSystemMessageTranslationModal (message) {
      // Implemente a tradução de sugestões do modal aqui, se necessário
      api.post('chat/translate', { message }).then((response) => {
        this.$set(this.translationsModal, message, response.data)
      })
    }
  }
}
</script>

  <style scoped>
  /* Estilos específicos para o modal de sugestões, se necessário */
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
  max-width: 50%; /* Adjust max-width as needed */
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
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
    flex-wrap: wrap;
    flex-direction: row;
    gap: 25%;
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

  </style>
