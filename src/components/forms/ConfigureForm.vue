<template>
  <div class="main">
    <b-row style="margin: 2%;">
      <h2 class="title">Campos das rotas</h2>
    </b-row>
   <b-row style="margin: 0.5%;">
    <b-col cols="12">
      <b-form ref="form">
        <b-row>
          <b-col cols="12">
            <b-form-group id="select-title">
              <label for="">Selecione um sistema:</label>
                <b-form-select
                    id="sort-by-select"
                    :options="options"
                    v-model="selected"
                    @change="sendRanges"
                    class="select"
                >
                   <template #first>
                    <b-form-select-option :value="'selecionar'"
                        >Selecionar sistema</b-form-select-option
                    >
                   </template>
                </b-form-select>
                </b-form-group>
          </b-col>
          <b-col cols="12">
            <Configure v-model="ranges" :fields="servicesFields"></Configure>
          </b-col>
        </b-row>

    </b-form>
    </b-col>
   </b-row>
   <b-row style="margin: 2%;">
      <h2 class="title">Funções</h2>
    </b-row>
   <b-row style="margin: 0.5%;">
    <b-col cols="12">
      <b-form ref="form">
      <ConfigureFunction v-model="ranges2" :fields="servicesFields2"></ConfigureFunction>
    </b-form>
    </b-col>
   </b-row>
  </div>
</template>
<script>
import Configure from '@/components/Inputs/Configure'
import ConfigureFunction from '@/components/Inputs/ConfigureFunction'
import { api } from '@/services'
import { toast } from '@/utils'
export default {
  components: { Configure, ConfigureFunction },
  data () {
    return {
      servicesFields: [
        // values for Service Input
        { label: 'chave', key: 'key' },
        { label: 'Tipo', key: 'type' },
        { label: 'descrição', key: 'description' },
        { label: 'Nome', key: 'name' }
      ],
      servicesFields2: [
        // values for Service Input
        { label: 'Chave', key: 'key' },
        { label: 'Descrição', key: 'description' },
        { label: 'Nome', key: 'name' }
      ],
      servicesOptions: [],
      ranges: undefined, // service_ranges
      ranges2: undefined,
      selected: null // service select value
    }
  },
  props: ['user'],
  beforeCreate () {
    this.$store.dispatch('sistemas/init', { self: this })
  },
  created () {
    if (this.$store.state.sistemas.items.groups) {
      const item = Object.entries(this.$store.state.sistemas.items.groups).map((a) => a[1])
      this.servicesOptions = item.map((a) => ({ value: a.key, text: a.key }))
      if (this.$route.query.group !== undefined) {
        this.selected = this.selected = this.$route.query.group
      }
    }
    if (this.$route.query.group) {
      console.log(Object.entries(this.$store.state.sistemas.items.groups).filter((a) => a[1].key === this.$route.query.group)[0].map(a => a.id)[1])
      api.get('extra_field/index?group_key=' + this.$route.query.group, {
        group_id: this.$route.query.group,
        wheres: [
          {
            type: 'where',
            field: 'type',
            condition: '=',
            value: 'object'
          }
        ]
      }).then(
        (res) => {
          this.ranges2 = res.data.extrafields.filter(a => a.type === 'object' && a.type_value === 'script')
          this.ranges = res.data.extrafields.filter(a => a.type === 'object' && a.type_value !== 'script')
          toast(this, 'success', 'Consulta', 'Consulta realizada com sucesso')
        },
        (error) => {
          toast(this, 'danger', 'Erro', error.response.data.message)
          this.testResponse = error.response
          this.config = error.response.config
          return Promise.reject(error)
        })
    } else {
      toast(this, 'info', 'Cadastrar Rotas', 'Selecione um sistema para começar')
    }
  },
  computed: {
    options () {
      if (this.$store.state.sistemas.items && this.$store.state.sistemas.items.groups) {
        const item = Object.entries(this.$store.state.sistemas.items.groups).map((a) => a[1])
        const value = item.map((a) => ({ value: a.id, text: a.key }))
        return value.map((v) => v.text)
      }
      return []
    }
  },
  methods: {
    sendRanges () {
      api.get('extra_field/index?group_key=' + this.selected, {
        group_id: this.$route.query.group,
        wheres: [
          {
            type: 'where',
            field: 'type',
            condition: '=',
            value: 'object'
          }
        ]
      }).then(
        (res) => {
          this.ranges2 = res.data.extrafields.filter(a => a.type === 'object' && a.type_value === 'script')
          this.ranges = res.data.extrafields.filter(a => a.type === 'object' && a.type_value !== 'script')
          toast(this, 'success', 'Consulta', 'Consulta realizada com sucesso')
        },
        (error) => {
          toast(this, 'danger', 'Erro', error.response.data.message)
          this.testResponse = error.response
          this.config = error.response.config
          return Promise.reject(error)
        })
      this.$store.dispatch('getRanges', this.selected)
    }
  }
}
</script>
<style lang="stylus">
@import "../../style/colors.styl";

.h-separator {
  display: flex;

  .title {
    padding: 0px 10px;
    font-size: 14px;
    color: dark;
    font-weight: bold;
    border-radius: 1rem;
    background: transparent;
  }

  span {
    align-self: center;
  }

  span:last-child {
    height: 1px;
  }

  span:last-child {
    flex-grow: 1;
  }
}

.btnsave {
  width: 100px;
  background-color: #4472C4;
  font-size: 14px;
}
</style>
