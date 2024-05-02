<template>
  <div
    id="chat-sidebar"
    class="chat-sidebar"
  >
    <div role="button" :style="orderChats.length !== 0 ? 'margin: auto auto 25px': 'margin: 25px auto'" class="chat-header" @click="!showSidebar ? openNewChat() : toggleSidebar()">
      <i role="button" class="material-icons">add</i>
      <span style="vertical-align: middle;">Nova conversa</span>
    </div>
    <div v-if="!isLoading" class="chat-list">
      <div
        v-for="chat in orderChats"
        :key="chat.key"
        @click="selectChat(chat.key)"
        :class="{ 'active': selectedChat === chat.key }"
        class="chat-item"
      >
      <span v-if="!editChatName[chat.key]" v-b-tooltip :title="chat.name" class="truncated-text dropdown-item">{{ truncatedTex(chat.name) }}</span>
        <input v-else class="input-edit-chatname" v-model="newName[chat.key]" />
        <i role="button" v-if="!editChatName[chat.key]" @click="editChatName[chat.key] = true" class="material-icons edit-btn-chat">edit</i>
        <i role="button" v-else @click="editName(chat.key)" class="material-icons edit-btn-chat">save</i>
      </div>
    </div>
  </div>
</template>

<script>
import { api } from '@/services'
/* import { toast } from '@/utils' */
export default {
  props: {
    chats: {
      type: Array,
      default: () => []
    },
    isLoading: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      selectedChat: null,
      showSidebar: false,
      editChatName: {},
      newName: {}
      /*  editChatName: [],
      newName: '' */
    }
  },
  created () {
    this.chats.forEach(chat => {
      this.$set(this.editChatName, chat.key, false)
      this.$set(this.newName, chat.key, chat.name)
    })
  },
  mounted () {
    this.scrollToTop()
  },
  destroyed () {
    this.scrollToTop()
  },
  computed: {
    orderChats () {
      const chatsCopy = [...(this.chats || [])]

      // Verifica se this.chats é um array
      if (!Array.isArray(chatsCopy)) {
        // Se não for um array, retorna um array vazio para evitar erros
        return []
      }
      // Ordena os chats pelo critério fornecido
      return chatsCopy.sort((a, b) => { return this.returnDate(a.update) < this.returnDate(b.update) ? 1 : this.returnDate(a.update) > this.returnDate(b.update) ? -1 : 0 })
    }
  },
  methods: {
    returnDate (date) {
      return new Date(date).toISOString()
    },
    scrollToTop () {
      document.getElementById('sidebar').scrollTop = 0
      document.body.scrollTop = 0 // For Safari
      document.documentElement.scrollTop = 0 // For Chrome, Firefox, IE and Opera
    },
    truncatedTex (text) {
      const maxLength = 23 // Define o número máximo de caracteres
      if ((text || '').length > maxLength) {
        return text.substring(0, maxLength - 3) + '...'
      }
      return text
    },
    selectChat (chat) {
      this.selectedChat = chat
      this.$router.push('/conversation?key=' + chat)
    },
    openNewChat () {
      const userId = this.$store.state.user.id

      // Faz a requisição para criar um novo chat
      api.post('chat/newchat', { user_id: userId })
        .then(response => {
          const newChat = response.data.ExtraField.key
          this.$router.push('/conversation?key=' + newChat)
          this.newName = newChat
          this.editName(newChat)
          this.$emit('chat_updated', [...this.chats, { key: newChat, name: newChat, update: new Date().toISOString() }])
        })
        .catch(error => {
          // toast(this, 'danger', 'Erro ao criar novo chat:', error.message)
          console.error('Erro ao criar novo chat:', error.message)
        })
    },
    editName (key) {
      api.put('chat/editChatName', { chat_key: key, chat_name: this.newName[key] })
        .then((response) => {
          this.editChatName[key] = false
          this.editChatName = { ...this.editChatName }
          const updatedChat = this.chats.map(c => c.key === key ? { ...c, name: this.newName[key] } : c)
          this.$emit('chat_updated', updatedChat)
        })
        .catch(error => {
          // toast(this, 'danger', 'Erro ao criar novo chat:', error.message)
          console.error('Erro ao criar novo chat:', error.message)
        })
    },

    toggleSidebar () {
      this.showSidebar = !this.showSidebar
    }
  }
}
</script>

<style scoped>
/* Adicione este estilo para o ícone */
.material-icons {
  vertical-align: middle;
  margin-right: 5px;
}

.chat-sidebar {
  height: 100vh;
  margin: 3% auto;
  border-right: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  /* position: fixed; */
  transition: width 0.3s; /* Adiciona uma transição suave para a largura */
  overflow: hidden; /* Oculta qualquer conteúdo além da largura especificada */
}

.chat-header {
  width: max-content;
  border-radius: 10px;
  padding: 5px;
  margin: auto auto 25px;
  background-color: #3498db;
  color: #fff;
  text-align: center;
  cursor: pointer;
}

.chat-list {
  flex: 1;
  overflow-y: auto;
  max-width: 180px;
  /* white-space: nowrap; */
  overflow: hidden;
  text-overflow: ellipsis;
}

.chat-item {
  cursor: pointer;
  transition: background-color 0.3s;
  padding-left: 10px;
  text-align: left;
}

.edit-btn-chat{
    display: inline;
    visibility: hidden;
    background-color: #ddd;
    color: #fff;
    float: left;
    position: relative;
    left: 138px;
    top: -25px;
    background-color: #112b64;
    padding-left: 10px;
}

.chat-item:hover .edit-btn-chat{
    visibility:visible;
}

.chat-item.active {
  background-color: #112b64;
  color: #fff;
}

.truncated-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.dropdown-item {
  color: #fff;
}

.dropdown-item:hover {
  background-color: #112b64;
}

</style>
