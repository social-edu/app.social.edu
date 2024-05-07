<template>
  <div class="wrapper">
    <div class="topbar">
      <i @click="$store.dispatch('menuMobile')" class="menu-mobile-icon material-icons">menu</i>
      <div role="button" class="icon" @click="$router.push({ path: '/' })">
        <!-- <i @click="toggleMenu" class= "menu-mobile-icon material-icons">menu</i> -->
        <!--<img v-if="!$store.getters.isLogged" src="@/assets/images/logo-menu.png"/>-->
        <div class="iconndiv">
          <!--@/assets/images/logo-ema.png -->
          <img class="bi4p" src=""/>
        </div>
      </div>
      <div class="profile" v-if="hasUser">
        <div>
          <div @click="openModal" class="img"></div>
        </div>
        <div>
          <span class="name">{{ user.name }}</span>
          <span class="group">{{
            user.name === "Super Admin" ? "Super Admin" : "Sem Grupo"
          }}</span>
        </div>
      </div>
      <!-- <div style="color: white; padding-right: 16px" v-if="$route.name === 'Login'">
        Desenvolvido por: <a href="https://midiah.com.br/englishtechsolutions" target="_blank">English Tech Solutions</a>
      </div> -->
      <div class="button" v-if="hasButton">
        <div @click="buttonEmit">{{ btnLabel }}</div>
      </div>
    </div>
    <b-modal id="profile" v-model="modal" size="md" centered>
      <template #modal-header></template>
      <div
        class="d-flex flex-column justify-content-center align-items-center mb-2"
      >
        <span class="m-name">{{ $store.state.user.name }}</span>
        <span class="m-email">{{ $store.state.user.email }}</span>
      </div>
      <div class="d-flex flex-column justify-content-center options">
        <span style="cursor: pointer;" @click="openModalUser"
          ><i class="material-icons-outlined">edit</i>Editar Perfil</span
        >
        <hr />
        <span style="cursor: pointer;" @click="changePassword"
          ><i class="material-icons-outlined">vpn_key</i>Alterar a senha</span
        >
        <hr />
        <span style="cursor: pointer;"
          ><i class="material-icons-outlined">settings</i>Configurações</span
        >
        <hr />
        <span style="cursor: pointer;" @click="logout"
          ><i class="material-icons-outlined">logout</i>Sair</span
        >
      </div>
      <template #modal-footer>
        <span></span>
      </template>
    </b-modal>

    <b-modal id="edit-user" v-model="modalUser" size="md" centered>
      <template #modal-header></template>
      <EditUser></EditUser>
      <template #modal-footer>
        <span></span>
      </template>
    </b-modal>
  </div>
</template>

<style lang="stylus" scoped>

@import '../../style/colors.styl';
@import '../../style/dimens.styl';
//@import '../../style/fonts.styl';
@import '../../style/mixins.styl';

// ----------------------------------
// Dimensions
// ----------------------------------
logoPadding = 0px
logoPadding-sm = logoPadding * topbar-sm-resize
height-sm = topbar-height * topbar-sm-resize

// ----------------------------------
// Topbar
// ----------------------------------
.topbar
    background-color primary
    display flex
    justify-content space-between
    align-items center
    position fixed
    width 100%
    top 0
    z-index 12
    height topbar-height
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));

    @media (max-width: md)
        max-height height-sm

.wrapper
    height topbar-height

    @media (max-width: md)
        height height-sm

// ----------------------------------
// Icon (Logo)
// ----------------------------------
.icon
    padding logoPadding
    cursor pointer

    @media (max-width: md)
        padding logoPadding-sm

    img
        max-height topbar-height - 2*logoPadding
        no-select()

        @media (max-width: md)
            max-height (topbar-height - 2*logoPadding) * topbar-sm-resize

.menu-mobile-icon
    font-size 36px
    padding 10px
    // display none
    vertical-align middle
    color white
    cursor pointer
    display flex
    align-items center
    transition .2s
    no-select()
    display none

    @media (max-width md)
      display flex

    &:hover
      background-color lighten(primary, 10%)

// ----------------------------------
// Profile (User logged)
// ----------------------------------
.profile
    margin 0 20px 0 auto
    display flex
    cursor pointer

    & > div
        display flex
        flex-direction column
        text-align left
        padding 0px 8px

    .img
        background-color content
        border-radius 8px
        width 48px
        height 48px

        @media (max-width md)
            width 32px
            height 32px

        @media (max-width md)
            width 24px
            height 24px

    .name
        font-weight bold
        font-size 1em
        color content-base

        @media (max-width md)
            font-size 0.8em

        @media (max-width sm)
            font-size 0.65em

    .group
        font-size 0.75em
        color light

        @media (max-width md)
            font-size 0.6em

        @media (max-width sm)
            font-size 0.45em

// ----------------------------------
// Button event
// ----------------------------------

.button
    margin-right 2.5%

    & > div
        background-color color-theme(true)
        color color-theme()
        border-radius 8px
        padding 8px 24px
        cursor pointer

        @media (max-width md)
            font-size 14px
            padding 5px 15px

#edit-user {
  cursor pointer
}

.bi4p
  padding 4%

  @media (max-width md)
    padding 2%

.bi4p
  @media (max-width sm)
    max-width 35vw

a
  color blue
  &:hover
    text-decoration: underline

</style>

<script>
import EditUser from '../Modals/EditUser.vue'
export default {
  data () {
    return {
      show: false,
      modal: false,
      modalUser: false
    }
  },
  components: {
    EditUser
  },
  props: {
    user: {
      type: Object,
      required: false
    },
    btnLabel: {
      type: String,
      required: false
    }
  },
  computed: {
    hasUser () {
      return !!this.user
    },
    hasButton () {
      return !!this.btnLabel
    },
    isHovered () {
      return JSON.parse(localStorage.getItem('isHovered'))
    }
  },
  methods: {
    openModalUser () {
      this.modal = false
      this.modalUser = true
    },
    openModal () {
      this.modal = true
    },
    changePassword () {
      this.$router.push({ path: '/new-password' })
    },
    buttonEmit () {
      this.$emit('button')
    },
    logout () {
      this.$router.options.routes[0].children[1].meta.hasViewedModal = false
      this.$store.dispatch('logout')
      this.$router.push({ path: '/login' })
    }
  }
}
</script>
