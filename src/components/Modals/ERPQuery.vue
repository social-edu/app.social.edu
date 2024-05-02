<template>
<div>
    <b-row>
      <b-col v-if="$route.name === 'CadastrarModulos'" style="place-self: center;" cols="3" >
            <h3 class="title">
              <slot name="user">
                {{ modaltitle }}
            </slot>
            </h3>
            <span></span>
      </b-col>
    <b-col :cols="$route.name === 'CadastrarModulos'?'2':'3'">
        <b-form-group>
            <label class="title">
              <slot name="user">
                {{ usertitle }}
            </slot>
            </label>
            <span></span>
          <div
            class="d-flex flex-row justify-content-around align-items-center"
          >
            <b-form-select :options="allUsers" v-model="userSelected">
              <template #first>
                <b-form-select-option :value="undefined" disabled
                  >Selecione um cliente</b-form-select-option
                >
              </template>
            </b-form-select>
          </div>
        </b-form-group>
      </b-col>
      <b-col :cols="$route.name === 'CadastrarModulos'?'2':'3'">
        <b-form-group>
            <label class="title">
              <slot name="user">
                {{ enterprisetitle }}
            </slot>
            </label>
            <span></span>
          <div
            class="d-flex flex-row justify-content-around align-items-center"
          >
            <b-form-select :options="allEnterprises" v-model="enterpriseSelected">
              <template #first>
                <b-form-select-option :value="undefined" disabled
                  >Selecione uma empresa</b-form-select-option
                >
              </template>
            </b-form-select>
          </div>
        </b-form-group>
      </b-col>
      <b-col :cols="$route.name === 'CadastrarModulos'?'2':'3'">
        <b-form-group>
            <label class="title">
              <slot name="system">
                {{ systemtitle }}
            </slot>
          </label>
            <span></span>
          <div
            class="d-flex flex-row justify-content-around align-items-center"
          >
            <b-form-select :options="allSystems" v-model="systemSelected">
              <template #first>
                <b-form-select-option :value="undefined" disabled
                  >Selecione um sistema</b-form-select-option
                >
              </template>
            </b-form-select>
          </div>
        </b-form-group>
      </b-col>
      <b-col :cols="$route.name === 'CadastrarModulos'?'2':'3'">
        <b-form-group>
            <label class="title">
              <slot name="route">
                {{ routetitle }}
            </slot>
            </label>
            <span></span>
          <div
            class="d-flex flex-row justify-content-around align-items-center"
          >
            <b-form-select :options="allRoutes" v-model="routeSelected">
              <template #first>
                <b-form-select-option :value="undefined" disabled
                  >Selecione uma rota</b-form-select-option
                >
              </template>
            </b-form-select>
          </div>
        </b-form-group>
      </b-col>
      <b-col style="place-self: center;" cols="3">
      <!--   <b-button class="btn-turquesa" @click="sendRequest()">
        Testar
      </b-button> -->
      <LoadingButton :isLoading="loopAllRoutes" :button-class="'btn-turquesa'" @event="sendRequest">Testar</LoadingButton>
      </b-col>
  </b-row>

<div v-if="testResponse">
  <h3 class="title">Requisição</h3>
<b-row>
  <b-col>
   <codemirror style="overflow: scroll; height: 100px;" class="card px-2 py-2 rounded" :options="reqOptions" :value="JSON.stringify(config.baseURL + config.url + ' -d:' + config.data)"></codemirror>
  </b-col>
 </b-row>

 <h3 class="title">Status</h3>
  <b-row>
  <b-col>
    <code class="card px-2 py-2 border-0 rounded" :style="testResponse.status === 200 || testResponse.status ===  201 || testResponse.status === 300 ? 'background-color: #87e1c0; color: darkgreen; overflow: scroll;':'background-color: #f19797; color: red; overflow: scroll;' ">
    {{ testResponse.statusText }},{{ testResponse.status }}
   </code>
  </b-col>
  </b-row>

<h3 class="title">Corpo</h3>
  <b-row>
   <b-col>
    <codemirror style="overflow: scroll;" class="card px-2 py-2 rounded"  :options="bodyOptions" :value="JSON.stringify(testResponse.data, null, '\t')"></codemirror>
   </b-col>
  </b-row>
</div>
  <b-row>
  </b-row>
</div>
</template>

<script>
import { codemirror } from 'vue-codemirror-lite'
import { api } from '@/services'
import { toast } from '@/utils'
import LoadingButton from '../Shared/LoadingButton.vue'
export default {
  data () {
    return {
      userSelected: null,
      systemSelected: null,
      routeSelected: null,
      testResponse: null,
      enterpriseSelected: null,
      config: null,
      loopAllRoutes: false,
      bodyOptions: {
        mode: { name: 'javascript', json: true },
        smartIndent: true,
        indentWithTabs: true,
        readOnly: true,
        lineWrapping: true
      },
      reqOptions: {
        mode: { name: 'javascript', json: true },
        smartIndent: true,
        indentWithTabs: true,
        readOnly: true,
        lineWrapping: true
      }
    }
  },
  components: {
    codemirror, LoadingButton
  },
  props: {
    routetitle: { type: String, default: '' },
    systemtitle: { type: String, default: '' },
    enterprisetitle: { type: String, default: '' },
    usertitle: { type: String, default: '' },
    modaltitle: { type: String, default: '' },
    routekey: { type: String, default: '' },
    systemkey: { type: String, default: '' },
    entrepriseName: { type: String, default: '' }
  },
  computed: {
    allUsers () {
      if (this.$store.state.clientes.items.length !== 0) {
        return this.$store.state.clientes.items.users
          .map((u) => ({
            value: u.id,
            text: u.name
          }))
      }
      return []
    },
    allEnterprises () {
      if (this.$store.state.empresas.items.length !== 0) {
        return this.$store.state.empresas.items.users
          .map((u) => (u.name))
      }
      return []
    },
    allRoutes () {
      if (this.$store.state.rotas.items.objects) {
        const item = this.$store.state.rotas.items.objects.map((a) => a)
        const value = item.map((a) => ({ value: a.id, text: a.key }))
        return ['Todas as rotas', ...value.map((v) => v.text)]
      }
      return []
    },
    allSystems () {
      if (this.$store.state.sistemas.items && this.$store.state.sistemas.items.groups) {
        const item = Object.entries(this.$store.state.sistemas.items.groups).map((a) => a[1])
        const value = item.map((a) => ({ value: a.id, text: a.key }))
        return value.map((v) => v.text)
      }
      return []
    }
  },
  created () {
    this.$store.dispatch('rotas/init', { self: this })
    this.$store.dispatch('sistemas/init', { self: this })
    this.$store.dispatch('usuarios/init', { self: this })
    this.$store.dispatch('empresas/init', { self: this })
    this.userSelected = this.$store.state.user.id
    this.systemSelected = this.systemkey
    this.routeSelected = this.routekey
    this.enterpriseSelected = this.entrepriseName
  },
  methods: {
    sendRequest () {
      if (this.loopAllRoutes) {
        this.routeSelected = this.allRoutes?.[this.allRoutes.indexOf(this.routeSelected) + 1] || 0
        if (!this.routeSelected) {
          this.loopAllRoutes = false
          return
        }
      }
      if (this.routeSelected === 'Todas as rotas') {
        this.loopAllRoutes = true
        this.sendRequest()
        return
      }
      const nomeModulo = this.routeSelected
      const [erp, modulo] = nomeModulo.split('_')
      console.log(erp, nomeModulo)
      const objectModule = this.$store.state.rotas.items.objects.filter(r => r.key === this.routeSelected).map((g) => g.extra_fields[6].value[0])
      const reqObj = {
        user_id: this.$store.state.empresas.items.users
          .filter((u) => u.id === this.enterpriseSelected).map((u) => u.id)[0],
        erp: this.systemSelected,
        call: modulo,
        module: objectModule[0]
      }
      console.log(reqObj)
      console.log(this.systemSelected)
      api.post('erp/testroute', reqObj).then(
        (response) => {
          this.testResponse = response
          this.config = response.config
          toast(this, 'success', 'Consulta', 'Consulta realizada com sucesso')
        },
        (error) => {
          toast(this, 'danger', 'Erro', error.response.data.message)
          this.testResponse = error.response
          this.config = error.response.config
          return Promise.reject(error)
        })
      if (this.loopAllRoutes) this.sendRequest()
    }
  }
}
</script>

<style lang="stylus" scoped>
.btn-turquesa
    color black
    background-color primary-variant
    border solid 1px primary-variant
</style>
