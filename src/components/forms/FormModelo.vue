<template>
  <b-form ref="form" @submit.stop.prevent="submit">
      <b-row>
          <b-col cols="6">

              <b-form-group
                  id="input-g-name"
                  class="form-group"
                  label="Nome do Modelo"
                  label-for="input-name"
              >
                  <b-form-input
                      class="form-control-white-bg"
                      id="input-name"
                      v-model="form['nome']"
                      type="text"
                      required
                  ></b-form-input>

              </b-form-group>

          </b-col>
          <b-col cols="4">

              <b-form-group
                  id="input-g-codigo"
                  class="form-group"
                  label="Código"
                  label-for="input-codigo"
              >
                  <b-form-input
                      class="form-control-white-bg"
                      id="input-codigo"
                      v-model="form['codigo']"
                      type="text"
                      required
                  ></b-form-input>

              </b-form-group>

          </b-col>

          <b-col cols="2">

              <b-form-group
                  id="input-g-iso"
                  class="form-group"
                  label="Iso-value"
                  label-for="input-iso"
              >
                  <b-form-input
                      class="form-control-white-bg"
                      id="input-iso"
                      v-model="form['iso']"
                      type="number"
                      required
                  ></b-form-input>

              </b-form-group>

              <b-tooltip target="input-g-iso" triggers="hover">apenas usado na conversão de .dcm para .stl</b-tooltip>

          </b-col>

          <b-col cols="12" class="file">
              <b-form-file
                  id="input-file"
                  v-model="files"
                  :state="Boolean(files)"
                  placeholder="Clique ou arraste um ou mais arquivos .stl ou .dcm"
                  drop-placeholder="Clique ou arraste um ou mais arquivos arquivo .stl ou .dcm"
                  multiple
                  accept=".stl,.dcm"
                  required
              ></b-form-file>
          </b-col>

      </b-row>
      <b-row v-if="loading" class="mt-3 d-flex justify-content-center">
        <b-spinner variant="primary" label="Spinning"></b-spinner>
      </b-row>
  </b-form>
</template>

<script>

import { request } from '@/services'
import { toast } from '@/utils'

export default {
  data: () => ({
    form: { iso: 128 },
    files: null,
    loading: false
  }),
  methods: {
    reset () {
      this.form = {}
      this.files = null
    },
    submit () {
      if (this.loading) return

      if (!this.$refs.form.checkValidity()) {
        toast(this, 'info', 'Formulário incompleto', 'Preencha os campos corretamente')
        return
      }

      const form = new FormData()

      form.append('nome', this.form.nome)
      form.append('codigo', this.form.codigo)

      this.files.forEach((file, index) => {
        form.append('document[' + index + ']', file)
      })

      this.loading = true

      request.post('modelo/create', form,
        response => {
          this.$store.dispatch('sistemas/add', response.data.erps)
          this.$emit('submitted')
          this.loading = false
        },
        error => {
          toast(this, 'danger', 'Modelo não foi criado', error)
          this.loading = false
          return Promise.reject(error)
        },
        true // multipart
      )
    }
  }
}

</script>
