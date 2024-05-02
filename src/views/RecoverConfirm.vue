<template>
  <div class="interface">
    <b-card class="login-card">
      <div class="logo">
        <!-- <img src="../assets/images/logo-ema.png" /> -->
      </div>
      <div>
        <span
          >Um código de confirmação foi enviado para o seu email, entre com ele
          para recuperar a conta</span
        >
        <b-form @submit.prevent="requestCode">
          <div class="h-separator">
            <label for="cod" class="title">Código de confirmação *</label>
            <span></span>
          </div>
          <b-form-input
            id="cod"
            v-model="cod"
            type="text"
            placeholder="Ex: 123456"
            required
          ></b-form-input>
          <b-button type="submit">Entrar</b-button>
        </b-form>
      </div>
    </b-card>
  </div>
</template>

<style lang="stylus" scoped>
@import '../style/colors.styl';
@import '../style/fonts.styl';

.interface
  min-height 100%
  min-height 100vh
  display flex
  align-items center
  background 50%/cover no-repeat url('../assets/images/university-students-doing-group-study-2022-02-02-05-05-15-utc 1.png')
  background-size     cover
  background-repeat   no-repeat
  background-position right
  background-color info
  height 100%

.login-card
  position absolute
  right 5%
  width 350px
  min-height 52% // old support
  min-height 52vh
  border-radius 0.5rem
  margin 0 auto
  display flex
  background light

@media (max-width: 556px)
    .login-card
        position unset
        margin 0 auto
        width: 90%
        min-height 75vh

.card-body, .card-body > div
  display grid
  justify-content space-around

.logo
  background-color #112b64
  border-radius: 10px
  padding 5%
  margin-bottom 30px
  margin-bottom: 30px;
  align-content: center;
  align-self: center;
  justify-items: center;

  img
    width: 50%

.h-separator
    display flex
    .title
        padding 0px 10px
        font-size 14px
        color light
        font-weight bold
        border-radius 1rem
        background primary
    span
        align-self center
    span:last-child
        border 1px dashed primary
        height 1px
    span:last-child
        flex-grow 1

form
  width 100%

  *
    font-family Manrope

  .title
    text-align center
    color primary

  label
    color light
    padding 0 0.5rem
    margin 8px 0
    border-radius 1rem
    font-weight bold
    background primary

  input, button
    height calc(1.5em + 0.75rem + 2px)
    padding 0.4rem 1rem

  input
    margin-bottom 18px
    border-radius 0.5rem
    background white
    color secondary

  button
    width 100%
    margin 10px 0 0 0
    background secondary
</style>

<script>
import { request } from '@/services'
import { toast, errorFormater } from '@/utils'

export default {
  data: () => ({
    cod: ''
  }),
  props: ['cpf'],
  methods: {
    requestCode: function () {
      request.post('/recover/confirm', { cpf: this.cpf, code: this.cod },
        (response) => {
          if (response.status >= 200 && response.status < 300) {
            this.$store.dispatch('login', response.data)
            this.$router.push({ path: '/new-password' })
          }
        },
        (error) => {
          toast(this, 'danger', 'Erro', errorFormater(error))
          return Promise.reject(error)
        })
    }
  }
}
</script>
