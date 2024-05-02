<template>
    <div class="main">
      <b-form @submit="onSubmit" ref="form">
        <!--Nome; Email; CPF; Telefone; Número; Endereço; Complemento; Cidade; UF; CEP; Pais-->

        <!-- Nome -->
        <b-form-group id="input-add-group-name">
          <div class="h-separator">
            <label for="input-add-name" class="title">Nome *</label>
            <span></span>
          </div>

          <b-form-input
            id="input-add-name"
            v-model="form.name"
            type="text"
            placeholder="Nome"
            required
          ></b-form-input>
        </b-form-group>

        <!-- Email -->
        <b-form-group id="input-add-group-email">
          <div class="h-separator">
            <label for="input-add-email" class="title">Email *</label>
            <span></span>
          </div>

          <b-form-input
            id="input-add-email"
            v-model="form.email"
            type="text"
            placeholder="Email"
            required
          ></b-form-input>
        </b-form-group>

        <!-- CPF -->
        <b-form-group id="input-add-group-cpf">
          <div class="h-separator">
            <label for="input-add-cpf" class="title">CPF *</label>
            <span></span>
          </div>

          <b-form-input
            id="input-add-cpf"
            v-model="form.document"
            type="text"
            placeholder="CPF"
            required
          ></b-form-input>
        </b-form-group>

        <!-- Telefone -->
        <b-form-group id="input-add-group-telefone">
          <div class="h-separator">
            <label for="input-add-telefone" class="title">Telefone *</label>
            <span></span>
          </div>

          <b-form-input
            id="input-add-telefone"
            v-model="form.telephone"
            type="text"
            placeholder="Telefone"
            required
          ></b-form-input>
        </b-form-group>

        <div class="d-flex flex-column align-items-end">
          <b-button style="background-color: #00A676;" class="btnsave" type="submit"
            >Salvar</b-button
          >
        </div>
      </b-form>
    </div>
</template>
<script>
import { api } from '@/services'
import { toast, errorFormater, userToExtraFields } from '@/utils'

export default {
  data: () => ({
    form: {}
  }),
  created () {
    this.form = userToExtraFields(this.$store.state.user)
  },
  methods: {
    onSubmit (event) {
      event.preventDefault()

      api.post('auth/update/' + this.$store.state.user.id, this.form).then(
        (response) => {
          if ([200, 201, 204].includes(response.status)) {
            // this.$store.dispatch;

            toast(
              this,
              'success',
              'Dados atualizado com sucesso',
              'Dados atualizado com sucesso'
            )

            this.$bvModal.hide('edit-user')
            this.$store.dispatch('login', {
              user: response.data.user,
              token: this.$store.state.token
            })
          }
        },
        (error) => {
          toast(this, 'danger', 'Erro', errorFormater(error))
          return Promise.reject(error)
        }
      )
    }
  }
}
</script>

<style lang="stylus">
  @import '../../style/colors.styl'

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

  .btnsave
      width 100px
      background-color #4472C4
      font-size 14px

</style>
