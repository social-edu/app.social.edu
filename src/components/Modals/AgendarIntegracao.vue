<template>
    <div>
      <b-form ref="form" @change="updateForm">
        <!--
        <b-row style="width: 100%">
            <b-col cols="6">
            <b-form-group label="Frequência:" label-for="frequencia">
          <b-form-select v-model="form.frequencia" id="frequencia">
            <option v-for="option in form.frequenciaOptions" :value="option" :key="option">{{ option }}</option>
          </b-form-select>
        </b-form-group>
        </b-col>
        </b-row>
        -->
        <b-row>
            <b-col cols="6">
            <b-form-group label="Cliente:" label-for="sistema">
          <b-form-select v-model="form.cliente" id="sistema" :options="clientesOptions"></b-form-select>
        </b-form-group>
        </b-col>
        </b-row>
        <b-row>
            <b-col cols="6">
            <b-form-group label="Empresa:" label-for="sistema">
          <b-form-select v-model="form.empresa" id="sistema" :options="empresasOptions"></b-form-select>
        </b-form-group>
        </b-col>
        </b-row>

        <b-row>
            <b-col cols="6">
            <b-form-group label="Módulo:" label-for="sistema">
          <b-form-select v-model="form.sistema" id="sistema" :options="sistemasOptions"></b-form-select>
        </b-form-group>
        </b-col>
        </b-row>

        <b-row>
            <b-col cols="6">
            <b-form-group label="Periodicidade:" label-for="periodicidade">
          <b-form-select v-model="form.periodicidade" id="periodicidade" :options="form.periodicidadeOptions"></b-form-select>
        </b-form-group>
        </b-col>
        </b-row>
        <!--
        <b-col v-if="form.frequencia === 'Semanal'" cols="4">
          <label v-for="(dia, index) in form.diasSemana" :key="index">
            <input type="checkbox" :value="index" v-model="form.diasSelecionados">{{ dia }}
          </label>
       </b-col>
       -->

       <b-row v-if="!form.periodicidade">
        <b-col cols="6">
        <b-form-group label="Hora Fixa:" label-for="hora">
          <b-form-input v-model="form.hora" type="time" id="hora" step="1800"></b-form-input>
        </b-form-group>
       </b-col>
       </b-row>
      </b-form>
    </div>
  </template>
<script>
export default {
  props: {
    form: {
      type: Object,
      required: true
    },
    sistemas: {
      type: Array,
      default: () => ([])
    },
    empresas: {
      type: Array,
      default: () => ([])
    },
    clientes: {
      type: Array,
      default: () => ([])
    }
  },
  /*
  watch: {
    diasSelecionados () {
      this.$emit('update-dias', this.diasSelecionados)
    }
  },
  */
  computed: {
    sistemasOptions () {
      return this.sistemas.map(a => ({ value: a.id, text: a.key }))
    },
    clientesOptions () {
      return this.clientes.map(a => ({ value: a.id, text: a.name }))
    },
    empresasOptions () {
      return this.empresas.map(a => ({ value: a.id, text: a.name }))
    }
  },
  mounted () {
    if (this.$store.getters.updateIntegracao) {
      const integracao = this.$store.getters.updateIntegracao.item
      this.form.sistema = integracao.group_id
      this.form.periodicidade = integracao.periodicity
      this.form.hora = integracao.hour.join(',')
      this.form.start = integracao.start.toString()
      this.form.end = integracao.end.toString()
      this.form.active = integracao.active
      this.form.frequency = integracao.frequency
      this.form.cliente = integracao.user_id
      this.form.empresa = integracao.company_id
      this.$store.dispatch('updateIntegracao', {
        group_id: this.form.sistema,
        periodicity: this.form.periodicidade,
        hour: this.form.hora.toString(),
        start: this.form.start,
        end: this.form.end,
        active: true,
        frequency: this.form.frequency,
        user_id: this.form.cliente,
        company_id: this.form.empresa
      })
      this.$store.dispatch('getIntegracaoId', integracao.id)
    }
  },
  beforeDestroy () {
    this.$store.dispatch('updateIntegracao', null)
  },
  methods: {
    updateForm () {
      this.$emit('update-form', this.form)
    },
    updateDiasSemana (diasSelecionados) {
      this.form.diasSemana = diasSelecionados
      this.updateForm()
      localStorage.setItem('diasSelecionados', this.form.diasSemana)
      this.$store.dispatch('diasSelecionados', this.form.diasSemana)
    }
  }
}
</script>
