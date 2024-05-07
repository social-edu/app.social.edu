<template>
    <div>
        <Topbar></Topbar>
        <div class="background">
            <div class="forms">
              <div class="register">
                    <b-form ref="formRegister" @submit.stop.prevent="submitRegister">
                        <h1>Criar uma conta</h1>
                        <b-row>
                            <b-col
                                v-for="field in fieldsRegister" :key="field.key"
                                :cols="field.col"
                            >
                                <!-- Normal fields -->
                                <b-form-group v-if="field.type !== 'view'"
                                    :id="'input-group-' + field.key"
                                    :label="field.label + ' *'"
                                    :label-for="'input-' + field.key"
                                >
                                    <b-form-input v-if="['text', 'number', 'email', 'password'].includes(field.type)"
                                    :id="'input-' + field.key"
                                    v-model="formRegister[field.key]"
                                    :type="field.type === 'password' ? (registerEye ? 'password' : 'text') : field.type"
                                    :min="field.min"
                                    v-maska="field.mask"
                                    :class="field.type === 'password' ? 'input-eye' : ''"
                                    required
                                    ></b-form-input>

                                    <i v-if="field.type === 'password'" @click="registerEye = !registerEye" class="eye material-icons-outlined">{{ registerEye ? 'visibility' : 'visibility_off' }}</i>
                                </b-form-group>
                            </b-col>
                        </b-row>
                        <button type="submit">Entrar</button>
                    </b-form>
                </div>
                <div class="login">
                    <b-form ref="formLogin" @submit.stop.prevent="submitLogin">
                        <h1>Já tenho uma conta</h1>
                        <b-row>
                            <b-col
                                v-for="field in fieldsLogin" :key="field.key"
                                :cols="field.col"
                            >
                                <b-form-group v-if="field.type !== 'view'"
                                    :id="'input-login-group-' + field.key"
                                    :label="field.label + ' *'"
                                    :label-for="'input-login-' + field.key"
                                >
                                    <b-form-input v-if="['text', 'number', 'email', 'password'].includes(field.type)"
                                    :id="'input-login-' + field.key"
                                    v-model="formLogin[field.key]"
                                    :type="field.type === 'password' ? (loginEye ? 'password' : 'text') : field.type"
                                    :min="field.min"
                                    v-maska="field.mask"
                                    :class="field.type === 'password' ? 'input-eye' : ''"
                                    required
                                    ></b-form-input>

                                    <i v-if="field.type === 'password'" @click="loginEye = !loginEye" class="eye material-icons-outlined">{{ loginEye ? 'visibility' : 'visibility_off' }}</i>

                                </b-form-group>
                            </b-col>
                        </b-row>
                        <button type="submit">Entrar</button>
                        <span @click="forgetP" class="forget-p">Esqueceu sua senha?</span>
                    </b-form>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="stylus">

    @import '../style/colors.styl';
    @import '../style/mixins.styl';
    @import '../style/dimens.styl';

    .background
        gold-background()

        .forms
            display flex
            justify-content space-between

            @media (max-width md)
                flex-direction column

            & > div
                border-radius: 8px
                background-color content-base
                padding 4%

                @media (max-width md)
                    width 95% !important
                    margin 24px auto

                @media (max-width sm)
                    width 100% !important
                    margin 16px auto

            h1
                color color-theme(true)
                margin-bottom 20px
                font-size 2.1em

            button
                background-color primary-variant
                border-radius 8px
                border none
                color color-theme()
                width: 50%
                min-width: 200px
                padding 10px 16px
                margin-top 12px

            .register
                width 55%

            .login
                display flex
                align-items center
                width 35%

    .form-group
        position relative

        .input-eye
            padding-right 2.5rem

        .eye
            position absolute
            right: 6px
            bottom: 2px
            font-size 32px
            color primary
            cursor pointer
            no-select()
      .forget-p
        color dark
        cursor pointer
        text-align center
        font-size 1.1em
        display inline-block
        width 100%
        margin-top 15px

        &:hover
          text-decoration underline

</style>

<script>
import Topbar from '@/components/Topbar'
import { request } from '@/services'
import { toast } from '@/utils'

export default {
  name: 'Login',
  components: { Topbar },
  data: () => ({
    fieldsLogin: [
      { key: 'email', label: 'Email', type: 'text', col: 12 },
      { key: 'password', label: 'Senha', type: 'password', col: 12 }
    ],
    fieldsRegister: [
      { key: 'name', label: 'Nome', type: 'text', col: 12 },
      { key: 'email', label: 'Email', type: 'email', col: 12 },
      { key: 'telephone', mask: '(##) #####-####', label: 'Telefone', type: 'text', col: 6 },
      { key: 'password', label: 'Senha', type: 'password', col: 6 }
    ],
    formRegister: {},
    formLogin: {},
    loginEye: true,
    registerEye: true
  }),
  mounted () {
    this.formRegister = { plan: this.$route.query.plan || undefined }
  },
  methods: {
    forgetP () {
      this.$router.push({ path: 'recover-password/' })
    },
    submitLogin () {
      if (!this.$refs.formLogin.checkValidity()) {
        this.$emit('invalid', 'Preencha os campos corretamente')
        return
      }

      const loginData = {
        email: this.formLogin.email,
        password: this.formLogin.password
      }

      request.post('login', loginData,
        (response) => {
          this.$store.dispatch('login', response.data)
          this.$router.push({ path: '/' })
        },
        (error) => {
          toast(this, 'danger', 'Login inválido', error)
          return Promise.reject(error)
        }
      )
    },
    submitRegister () {
      if (!this.$refs.formRegister.checkValidity()) {
        this.$emit('invalid', 'Preencha os campos corretamente')
        return
      }

      // Clone for avoid mutation in formatting
      let f = { ...this.formRegister }

      // Add password confirmation
      f = { ...f, password_confirmation: f.password }

      f = { ...f, group_key: 'Aluno' }

      // Submit
      request.post('register', f,
        (response) => {
          this.$store.dispatch('login', response.data)
          this.$router.replace({ path: '/' })
        },
        (error) => {
          toast('error', 'Registro inválido', error)
          return Promise.reject(error)
        }
      )
    }
  }
}
</script>
