<template>
  <div>
    <!-- sidebar aluno -->
  <div v-if="$route.name === 'Conversation' && $store.state.user.name !== 'Super Admin'" class="wrapper">
    <div id="sidebar" :class="'sidebar' + ($store.state.menuMobile ? ' sidebar-forced' : '')">
      <ChatList :isLoading="isLoading" @chat_updated="updateChatList" :chats="$store.state.apiChatList"/>
    </div>
  </div>
<!-- sidebar admin -->
    <div v-if="$store.state.user.name ==='Super Admin'">
    <div id="sidebar" :class="'sidebar' + ($store.state.menuMobile ? ' sidebar-forced' : '')">
          <ul>
        <router-link
          :to="{ name: 'Home' }"
          active-class="current-page"
          exact
          custom
          v-slot="{ navigate }"
        >
          <li @click="navigate">
            <i class="material-icons-outlined">home</i
            ><span>Home</span>
          </li>
        </router-link>

        <router-link
          :to="{ name: 'Alunos' }"
          active-class="current-page"
          :exact="true"
          custom
          v-slot="{ navigate }"
        >
          <li @click="navigate">
            <i class="material-icons-outlined"> groups </i
            ><span>Alunos</span>
          </li>
        </router-link>

      <!--  <router-link
          :to="{ name: 'Curso' }"
          active-class="current-page"
          :exact="true"
          custom
          v-slot="{ navigate }"
        >
          <li @click="navigate">
            <i class="material-icons-outlined"> description </i><span>Formulários</span>
          </li>
        </router-link>

        <router-link
          :to="{ name: 'Context' }"
          active-class="current-page"
          :exact="true"
          custom
          v-slot="{ navigate }"
        >
          <li @click="navigate">
            <i class="material-icons-outlined"> widgets </i
            ><span>Ferramentas</span>
          </li>
        </router-link> -->
      </ul>
    </div>
  </div>
  </div>
</template>
<script>
import ChatList from '@/components/chat/ChatList.vue'
import { api } from '@/services'
import { toast } from '@/utils'
export default {
  components: { ChatList },
  data () {
    return {
      chats: [],
      isLoading: true
    }
  },
  mounted () {
    api.get('/chat/chatlist/' + this.$store.state.user.id).then(response => {
      if (response.data.chats === 'Nenhum chat para este usuário') {
        this.isLoading = false
        toast(this, 'info', 'Ops!', 'Nenhum chat para este usuário')
        this.chats = []
      }
      this.$store.dispatch('updateApiList', response.data.chats)
    })
    setTimeout(() => {
      this.chats = this.$store.state.apiChatList
      this.isLoading = false
    }, 1000)
  },
  methods: {
    updateChatList (newList) {
      this.$store.dispatch('updateApiList', newList)
      setTimeout(() => {
        this.chats = this.$store.state.apiChatList
        this.isLoading = false
      }, 1000)
    }
  }
}
</script>

<style lang="stylus" scoped>

@import '../../style/colors.styl';
@import '../../style/dimens.styl';
//@import '../../style/fonts.styl';
@import '../../style/mixins.styl';

// ----------------------------------
// Dimensions
// ----------------------------------
sidebar-width = 64px // 20%

// ----------------------------------
// Sidebar
// ----------------------------------
.sidebar
    background-color primary
    color content
    // display flex
    // justify-content space-between
    // align-items center
    position sticky
    width 150px
    top topbar-height
    height: calc(100vh * 1.2)
    overflow-y: scroll
    z-index 10
    filter: drop-shadow(2px 0px 1px rgba(0, 0, 0, 0.2));
    transition 0.2s ease-in-out

    @media (max-width: md)
        top topbar-height * topbar-sm-resize
        display none

    &:hover
        width 200px

        ul li
            justify-content left
            padding-left 20px // (64 - 24) / 2
            transition 0s

            span
                opacity 1
                width auto
                height auto
                visibility visible
                left 20px
                top 18px

@media (max-width: md)
    .sidebar-forced
        display flex !important
        width 192px

        ul li
            justify-content left
            padding-left 20px // (64 - 24) / 2
            transition 0s
            width 192px

            span
                opacity 1
                width auto
                height auto
                visibility visible
                left 20px
                top 18px

.wrapper
    width sidebar-width
    // min-width sidebar-width
    flex-shrink: 0
    min-height: 100%

    @media (max-width: md)
      width 0

// ----------------------------------
// Items
// ----------------------------------
ul
    list-style none
    padding 0
    margin 0

    li
        position relative
        width 100%
        height 64px
        display flex
        align-items center
        justify-content center
        transition 0.2s ease-in-out
        cursor pointer
        nowrap()
        no-select()

        &:hover
            background-color #075172
            color secondary

        i
            position absolute
            left 20px
            font-size 24px
            height 24px

        span
            opacity 0
            width 0
            height 0
            visibility hidden
            left 0
            top 18px
            transition 0.2s ease-in-out
            position absolute
            margin 3px 0 0 36px
            font-weight bold

 /*  ul#menuSistemas
    display none */
</style>
