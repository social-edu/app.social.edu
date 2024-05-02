<template>
  <Content
    :title="'Cadastrar ' + nameModule"
    :action="action"
    @event="submit"
    :route="validateRoute"
  >
    <b-form ref="form">
      <b-row>
        <b-col v-for="field in fieldsExtra" :key="field.key" :cols="field.col">
          <b-form-group :id="'input-add-group' + field.key">
         <!--    <div class="h-separator"> -->
              <label :for="'input-add-' + field.key" class="title"
                >{{ field.label }}{{ field.required ? " *" : "" }}</label
              >
              <span></span>
              <b-form-input
              v-if="['text', 'email', 'tel', 'number'].includes(field.type)"
              :id="'input-add-' + field.key"
              v-model="form[field.key]"
              :type="field.type"
              v-maska="field.mask"
              :placeholder="field.label"
              :required="field.required"
            ></b-form-input>

              <b-form-select
                v-if="field.type === 'select'"
                :id="'input-add-' + field.key"
                :placeholder="field.label"
                v-model="form[field.key]"
                :options="field.options"
                :required="field.required"
              >
                <template #first>
                  <b-form-select-option :value="undefined" disabled
                    >Por favor, selecione uma opção</b-form-select-option
                  >
                </template>
              </b-form-select>
          </b-form-group>
        </b-col>
        <template v-if="route === '/cadastrar_usuarios'  || route === '/cadastrar_empresas' || route === '/cadastrar_clientes' ">
          <b-col cols="6">
            <b-form-group>
                <label for="password" class="title">Senha *</label>
                <span></span>
              <PasswordGenerator @input="updatePassword" auto="true" />
            </b-form-group>
          </b-col>
        </template>
        <template v-if="route === '/cadastrar_clientes'">
         <b-row style="margin: 0.5%;">
          <b-row style="margin: 0.5%;">
            <Title :noBtn="true" title="Endereço">
          </Title>
          </b-row>
          <!-- fields endereço -->
        <b-row style="margin: 0.5%;">
          <b-col v-for="field in fieldEndereco" :key="field.key" :cols="field.col">
            <b-form-group :id="'input-add-group' + field.key">
              <label :for="'input-add-' + field.key" class="title"
                >{{ field.label }}{{ field.required ? " *" : "" }}</label
              >
              <span></span>
              <b-form-input
                v-if="['text', 'email', 'tel', 'number'].includes(field.type)"
                :id="'input-add-' + field.key"
                v-model="form[field.key]"
                :type="field.type"
                v-maska="field.mask"
                :placeholder="field.label"
                :required="field.required"
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
         </b-row>
        <!--  fim fields endereço -->
        <b-row style="margin: 0.5%;">
            <Title :noBtn="true" title="Contato">
          </Title>
          </b-row>
        <b-row style="margin: 0.5%;">
          <b-col v-for="field in fieldContato" :key="field.key" :cols="field.col">
            <b-form-group :id="'input-add-group' + field.key">
              <label :for="'input-add-' + field.key" class="title"
                >{{ field.label }}{{ field.required ? " *" : "" }}</label
              >
              <span></span>
              <b-form-input
                v-if="['text', 'email', 'tel', 'number'].includes(field.type)"
                :id="'input-add-' + field.key"
                v-model="form[field.key]"
                :type="field.type"
                v-maska="field.mask"
                :placeholder="field.label"
                :required="field.required"
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        </template>
      <template v-if="route === '/cadastrar_empresas'">
       <ServiceForm ref="systemsRanges" :systems="groups" :modules="empresaModules" :extrafields="empresaExtrafields"></ServiceForm>
      </template>
      </b-row>
      <template v-if="route === '/cadastrar_sistemas'">
        <div v-if="loadingExtrafields" class="text-center text-dark my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong class="pl-2">Carregando...</strong>
        </div>
        <b-row v-else>
          <!-- Tipo -->
          <b-col :cols="isBasic || isBearer ? 2 : 3">
            <b-form-group>
                <label for="input-add-product" class="title"
                  >Tipo *</label
                >
                <span></span>

              <b-form-select
                :options="[{ value: 'basic', text: 'Basic' }, { value: 'bearer_token', text: 'Bearer' }, { value: 'api_key', text: 'Api Key' }]"
                v-model="form.auth_type"
                required
              >
                <template #first>
                  <b-form-select-option :value="undefined" disabled
                    >Tipo de autenticação</b-form-select-option
                  >
                </template>
              </b-form-select>
            </b-form-group>
          </b-col>

          <!-- Api Key -->
          <b-col cols="7" v-if="isApiKey">
            <b-form-group>
                <label class="title"
                  >Api Key *</label
                >
                <span></span>

              <b-form-input
                v-model="form.api_key"
                placeholder="Api Key"
              ></b-form-input>
            </b-form-group>
          </b-col>

          <!-- App Key -->
          <b-col
            v-if="isBasic || isBearer"
            :cols="isBasic ? 4 : 3"
          >
            <b-form-group>
                <label class="title"
                  >App Key *</label
                >
                <span></span>

              <b-form-input
                v-model="form.app_key"
                placeholder="App Key"
              ></b-form-input>
            </b-form-group>
          </b-col>

          <!-- App Secret -->
          <b-col
            v-if="isBasic || isBearer"
            :cols="isBasic ? 4 : 3"
          >
            <b-form-group>
                <label class="title">App Secret *</label>
                <span></span>

              <b-form-input
                v-model="form.app_secret"
                placeholder="App Secret"
              ></b-form-input>
            </b-form-group>
          </b-col>

          <!-- App Group -->
          <b-col cols="2" v-if="isBearer">
            <b-form-group>
                <label class="title"
                  >App Group *</label
                >
                <span></span>

              <b-form-input
                v-model="form.app_group"
                placeholder="App Group"
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
      </template>
    </b-form>
  </Content>
</template>

<script>
import Content from '@/components/content'
import Title from '@/components/content/Title'
import ServiceForm from '@/components/forms/ServiceForm'
import PasswordGenerator from '@/components/Shared/PasswordGenerator'
import { request, api } from '@/services'
import { toast } from '@/utils'

export default {
  components: { Content, PasswordGenerator, Title, ServiceForm },
  data () {
    return {
      form: {},
      servicesOptions: [],
      selectedSystem: null,
      data: {},
      groups: [], // sistemas de empresa,
      empresaExtrafields: [],
      extrafieldForUpdate: {},
      loadingExtrafields: true,
      empresaModules: []
    }
  },
  props: ['module'],
  created () {
    this.$store.dispatch('sistemas/init', { self: this })
    if (this.$route.query.item) {
      if (this.route.includes('/cadastrar_sistemas') && this.$route.query.item) {
        api.get(this.$store.state.sistemas.show + this.$route.query.item).then(response => {
          this.data = { ...response.data.group }
          const editedModule = this.data
          for (const field of this.fieldsExtra) {
            if (editedModule[field.key]) {
              this.form[field.key] = editedModule[field.key]
              this.form.base_url = editedModule.extra_fields.filter(field => field.key === 'base_url')[0].value[0]
            }
          }
          this.form.auth_type = this.data.extra_fields?.find(e => e.key === 'auth_type')?.value?.[0]
          this.form.api_key = this.data.extra_fields?.find(e => e.key === 'api_key')?.value?.[0] // ?.split('_')?.slice(1)?.join('_')
          this.form.app_key = this.data.extra_fields?.find(e => e.key === 'app_key')?.value?.[0] // ?.split('_')?.slice(1)?.join('_')
          this.form.app_group = this.data.extra_fields?.find(e => e.key === 'app_group')?.value?.[0] // ?.split('_')?.slice(1)?.join('_')
          this.form.app_secret = this.data.extra_fields?.find(e => e.key === 'app_secret')?.value?.[0] // ?.split('_')?.slice(1)?.join('_')
          this.form = { ...this.form }

          const keysExtrafields = ['api_key', 'app_key', 'app_group', 'app_secret'].filter(k => !!this.form[k])
          this.loadingExtrafields = keysExtrafields.length

          keysExtrafields.forEach(k => {
            request.post('extra_field/index', {
              wheres: [
                {
                  type: 'where',
                  field: 'key',
                  condition: '=',
                  value: this.form.key + '_' + this.form[k]
                }
              ]
            }, res => {
              this.extrafieldForUpdate[k] = res.data.extrafields?.[0] || undefined
              this.loadingExtrafields = this.loadingExtrafields - 1
            }, error => {
              this.loadingExtrafields = this.loadingExtrafields - 1
              return Promise.reject(error)
            })
          })

          console.log(this.form)
        })
      }
      if (this.route.includes('/cadastrar_usuarios') && this.$route.query.item) {
        api.get(this.$store.state.usuarios.show + this.$route.query.item).then(response => {
          this.data = { ...response.data.user }
          const editedModule = this.data
          for (const field of this.fieldsExtra) {
            if (editedModule[field.key]) {
              this.form[field.key] = editedModule[field.key]
            }
          }
          this.form = { ...this.form }
          console.log(this.form)
        })
      }
      if (this.route.includes('/cadastrar_empresas') && this.$route.query.item) {
        api.get(this.$store.state.empresas.show + this.$route.query.item).then(response => {
          this.data = { ...response.data.user }
          const editedModule = this.data
          for (const field of this.fieldsExtra) {
            if (editedModule[field.key]) {
              this.form[field.key] = editedModule[field.key]
            }
          }
          // this.$refs.systemsRanges.ranges
          this.groups = this.data.groups?.filter(g => g.type.toLowerCase() === 'erp')?.map(g => g.id)
          this.empresaExtrafields = this.data.extra_fields
          this.empresaModules = this.data.groups?.filter(g => g.type.toLowerCase() === 'module')?.map(g => g.key)
          this.form = { ...this.form }
          console.log(this.form)
        })
      }
      if (this.route.includes('/cadastrar_clientes') && this.$route.query.item) {
        api.get(this.$store.state.clientes.show + this.$route.query.item).then(response => {
          this.data = response.data.user
          const editedModule = this.data
          /*  const editedExtFields = this.data.extra_fields.map(field => ({ key: field.key, value: field.value[0] })) */
          for (const field of this.fieldsExtra) {
            if (editedModule[field.key]) {
              this.form[field.key] = editedModule[field.key]
              this.form.cep = this.data.extra_fields.filter(field => field.key === 'cep')[0].value[0]
              this.form.endereco = this.data.extra_fields.filter(field => field.key === 'endereco')[0].value[0]
              this.form.uf = this.data.extra_fields.filter(field => field.key === 'uf')[0].value[0]
            }
          }
          this.form = { ...this.form }
          console.log(this.form)
        })
      }
    } else {
      this.loadingExtrafields = false
    }
  },
  beforeDestroy () {
    localStorage.removeItem('reloaded')
  },
  computed: {
    /* getEditedModule () {
      return this.$store.getters.getEditedModule
    }, */
    action () {
      return { options: { label: 'Salvar', icon: 'save' } }
    },
    nameModule () {
      return this.module
    },
    fieldsExtra () {
      return this.$store.state[this.nameModule].formFields
    },
    fieldEndereco () {
      return this.$store.state[this.nameModule].formEndereco
    },
    fieldContato () {
      return this.$store.state[this.nameModule].formContato
    },
    formIntegracoes () {
      return this.$store.state[this.nameModule].formIntegracoes
    },
    identifyGroup () {
      return this.$store.state[this.nameModule].group
    },
    route () {
      return this.$route.path
    },
    validateRoute () {
      if (this.route.includes('/cadastrar_clientes')) {
        return '/clientes'
      } else if (this.route.includes('/cadastrar_usuarios')) {
        return '/usuarios'
      } else if (this.route.includes('/cadastrar_empresas')) {
        return '/empresas'
      } else if (this.route.includes('/cadastrar_sistemas')) {
        return '/'
      } else {
        return '/'
      }
    },
    isBearer () {
      return this.form.auth_type === 'bearer_token'
    },
    isBasic () {
      return this.form.auth_type === 'basic'
    },
    isApiKey () {
      return this.form.auth_type === 'api_key'
    }
  },
  methods: {
    updatePassword (e) {
      this.form.password = e
      this.form.password_confirmation = e
    },
    submit () {
      const routesUsers = [
        '/cadastrar_usuarios',
        '/cadastrar_clientes',
        '/cadastrar_empresas'
      ]

      // verifica se as rotas tem a ver com cadastro de usuários
      if (routesUsers.includes(this.route)) {
        // cadastro de usuários e clientes
        if (this.route === routesUsers[0] || this.route === routesUsers[1]) {
          if (this.$route.query.item) {
            request.post(
              this.$store.state[this.nameModule].update,
              this.module === 'clientes' ? {
                ...this.form,
                user_id: this.$route.query.item,
                group_key: this.identifyGroup
              } : {
                user_id: this.$route.query.item,
                ...this.form,
                group_key: this.identifyGroup
              },
              (response) => {
                toast(this, 'success', this.nameModule, this.nameModule + ' cadastrado com sucesso')
                this.$store.dispatch(this.$store.state[this.nameModule].title + '/add', response.data[this.$store.state[this.nameModule].get.response])
                this.$router.push({ path: this.$store.state[this.nameModule].path })
              },
              (error) => {
                toast(this, 'danger', 'Registro não foi criado', error)
                return Promise.reject(error)
              }
            )
          } else {
            request.post(
              this.$store.state[this.nameModule].request,
              this.module === 'clientes' ? {
                ...this.form,
                group_key: this.identifyGroup
              } : {
                ...this.form,
                group_key: this.identifyGroup
              },
              (response) => {
                toast(this, 'success', this.nameModule, this.nameModule + ' cadastrado com sucesso')
                this.$store.dispatch(this.$store.state[this.nameModule].title + '/add', response.data[this.$store.state[this.nameModule].get.response])
                this.$router.push({ path: this.$store.state[this.nameModule].path })
              },
              (error) => {
                toast(this, 'danger', 'Registro não foi criado', error)
                return Promise.reject(error)
              }
            )
          }
          // cadastro de empresas
        } else if (this.route === routesUsers[2]) {
          const ranges = this.$refs.systemsRanges.ranges
          console.log(ranges)
          const systems = Object.values(this.$store.state.sistemas.items?.groups || {})

          const form = {
            ...this.form,
            password_confirmation: this.form.password,
            group_keys: [...ranges.map(r => systems.find(s => s.id === r.system)?.key).filter(a => !!a), 'Client_CNPJ', ...this.$refs.systemsRanges.value],
            ...ranges.reduce((acc, obj) => ({
              ...acc, ...Object.keys(obj).reduce((o, v) => v === 'system' ? { ...o } : { ...o, [systems.find(s => s.id === obj.system)?.key + '_' + v]: obj[v] }, {})
            }), {}),
            tenant_id: this.$route.query.tenancy,
            user_id: this.$route.query.item || undefined
          }

          request.post(this.$route.query.item ? 'auth/edit' : 'register', form, res => {
            toast(this, 'success', 'Empresa', 'Empresa cadastrada com sucesso')
            this.$router.push({ name: 'Empresas', query: { params: this.$route.query.tenancy } })
          },
          error => {
            toast(this, 'danger', 'Registro não foi criado', error)
            return Promise.reject(error)
          })
          /*
          const groupKeyAuth = localStorage.getItem('groupSelection')
          const authValues = this.$store.getters.selectedValues
          console.log(groupKeyAuth, authValues)
          // pega os valores selecionados no input de integrações
          authValues.forEach(objValues => {
            const appKeySecret = Object.keys(objValues).map(a => a.toLowerCase()).filter(f => {
              return ({
                bearer_token: ['app_key', 'app_secret', 'app_group'],
                basic: ['app_key', 'app_secret'],
                api_key: ['api_key']
              })[objValues.type].includes(f)
            })
            console.log(appKeySecret)
            const newForm = {
              ...this.form,
              ...appKeySecret.reduce((obj, key) => ({
                ...obj,
                [groupKeyAuth.toLowerCase() + '_' + key]: objValues[key]
              }), {}),
              group_keys: [this.identifyGroup, groupKeyAuth, ...(this.$store.getters.getModuleItems || []).filter(a => !!a)],
              auth_type: objValues.type,
              tenant_id: this.$route.query.tenancy,
              user_id: this.$route.query.item || undefined
            }
            console.log(newForm)
            // update
            if (this.$route.query.item) {
              delete newForm.group_keys
              console.log(newForm)
              request.post(
                this.$store.state[this.nameModule].update,
                newForm,
                (response) => {
                  toast(this, 'success', this.nameModule, this.nameModule + ' cadastrado com sucesso')
                  // this.$store.dispatch(this.$store.state[this.nameModule].title + '/add', response.data[this.$store.state[this.nameModule].get.response])
                  this.$router.push({ name: 'Empresas', query: { params: this.$route.query.tenancy } })
                },
                (error) => {
                  toast(this, 'danger', 'Registro não foi criado', error)
                  return Promise.reject(error)
                }
              )
            // register
            } else {
              request.post(
                this.$store.state[this.nameModule].request,
                newForm,
                (response) => {
                  toast(this, 'success', this.nameModule, this.nameModule + ' cadastrado com sucesso')
                  // this.$store.dispatch(this.$store.state[this.nameModule].title + '/add', response.data[this.$store.state[this.nameModule].get.response])
                  this.$router.push({ name: 'Empresas', query: { params: this.$route.query.tenancy } })
                },
                (error) => {
                  toast(this, 'danger', 'Registro não foi criado', error)
                  return Promise.reject(error)
                }
              )
            }
          })
          */
        }
      } else if (this.route === '/cadastrar_sistemas') {
        // cadastro de sistemas
        console.log(this.$route.query.item, this.form)
        const groupId = this.$route.query.item
        console.log(groupId)
        if (this.form.auth_type === 'bearer_token') {
          delete this.form.api_key
        }
        if (this.form.auth_type === 'basic') {
          delete this.form.api_key
          delete this.form.app_group
        }
        if (this.form.auth_type === 'api_key') {
          delete this.form.app_key
          delete this.form.app_secret
          delete this.form.app_group
        }
        if (this.$route.query.item) {
          request.put(
            this.$store.state[this.nameModule].update,
            {
              ...this.form,
              group_id: groupId,
              type: 'ERP',
              public: 1,
              master_group_id: '9d4a2a29-5032-4ec6-acff-6bd6777bf7b8'
            },
            (response) => {
              toast(this, 'success', this.nameModule, this.nameModule + ' cadastrado com sucesso')
              // this.$store.dispatch(this.$store.state[this.nameModule].title + '/add', response.data[this.$store.state[this.nameModule].get.response])

              // Extrafield Code
              const keysExtrafields = ['api_key', 'app_group', 'app_key', 'app_secret']
              keysExtrafields.map(v => ({ key: v, value: this.form[v] })).filter(v => !!v.value).map(v => ({
                key: response.data.group.key + '_' + v.value,
                name: response.data.group.key + '_' + v.value,
                description: response.data.group.key + '_' + v.value,
                type_value: 'text',
                type: 'user',
                group_id: response.data.group.id,
                ext_key: v.key
              })).forEach(body => {
                request.post('extra_field/' + (Object.values(this.data).length && this.extrafieldForUpdate[body.ext_key] ? ('update/' + this.extrafieldForUpdate[body.ext_key]?.id) : 'create'), { ...body, ext_key: undefined },
                  res => {
                    console.log('extrafield criado', res.data)
                  },
                  error => {
                    toast(this, 'danger', 'Extrafield não foi criado', error)
                    return Promise.reject(error)
                  }
                )
              })

              this.$router.push({ path: '/' })
            },
            (error) => {
              toast(this, 'danger', 'Registro não foi criado', error)
              return Promise.reject(error)
            }
          )
        } else {
          request.post(
            this.$store.state[this.nameModule].request,
            {
              ...this.form,
              type: 'ERP',
              group_id: this.identifyGroup,
              public: 1,
              master_group_id: '9d4a2a29-5032-4ec6-acff-6bd6777bf7b8'
            },
            (response) => {
              toast(this, 'success', this.nameModule, this.nameModule + ' cadastrado com sucesso')
              // this.$store.dispatch(this.$store.state[this.nameModule].title + '/add', response.data[this.$store.state[this.nameModule].get.response])

              // Extrafield Code
              const keysExtrafields = ['api_key', 'app_group', 'app_key', 'app_secret']
              keysExtrafields.map(v => ({ key: v, value: this.form[v] })).filter(v => !!v.value).map(v => ({
                key: response.data.group.key + '_' + v.value,
                name: response.data.group.key + '_' + v.value,
                description: response.data.group.key + '_' + v.value,
                type_value: 'text',
                type: 'user',
                group_id: response.data.group.id,
                ext_key: v.key
              })).forEach(body => {
                request.post('extra_field/' + (Object.values(this.data).length && this.extrafieldForUpdate[body.ext_key] ? ('update/' + this.extrafieldForUpdate[body.ext_key]?.id) : 'create'), { ...body, ext_key: undefined },
                  res => {
                    console.log('extrafield criado', res.data)
                  },
                  error => {
                    toast(this, 'danger', 'Extrafield não foi criado', error)
                    return Promise.reject(error)
                  }
                )
              })

              this.$router.push({ path: '/' })
            },
            (error) => {
              toast(this, 'danger', 'Registro não foi criado', error)
              return Promise.reject(error)
            }
          )
        }
      }
    }
  }
}
</script>
