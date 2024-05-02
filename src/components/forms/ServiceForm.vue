<template>
  <div class="main">
    <b-row style="margin: 2%;">
      <h2 class="title">Integrações</h2>
    </b-row>
   <b-row style="margin: 0.5%;">
    <b-col>
      <b-form ref="form">
      <b-row v-for="(row, index) in ranges" :key="index">
        <b-col cols="3">
          <b-form-group>
              <label for="input-add-product" class="title">Sistema *</label>
              <span></span>
            <b-form-select
              class="col-12"
              :options="allSystemsAsOptions"
              v-model="ranges[index].system"
              @change="getSelection"
              required
            >
              <template #first>
                <b-form-select-option :value="null" disabled
                  >Por favor, selecione um sistema</b-form-select-option
                >
              </template>
            </b-form-select>
          </b-form-group>
        </b-col>
        <template v-if="row.system && getAuthType(row.system)">
          <!-- Api Key -->
          <b-col cols="7" v-if="isApiKey(getAuthType(row.system))">
            <b-form-group>
                <label class="title"
                  >{{ getExtrafield(row.system, 'api_key') }} *</label
                >
                <span></span>
              <b-form-input
                v-model="ranges[index][getExtrafield(row.system, 'api_key', 1)]"
                :placeholder="getExtrafield(row.system, 'api_key')"
              ></b-form-input>
            </b-form-group>
          </b-col>

          <!-- App Key -->
          <b-col
            v-if="isBasic(getAuthType(row.system)) || isBearer(getAuthType(row.system))"
            :cols="isBasic(getAuthType(row.system)) ? 4 : 3"
          >
            <b-form-group>
                <label class="title"
                  >{{ getExtrafield(row.system, 'app_key') }} *</label
                >
                <span></span>
              <b-form-input
                v-model="ranges[index][getExtrafield(row.system, 'app_key', 1)]"
                :placeholder="getExtrafield(row.system, 'app_key')"
              ></b-form-input>
            </b-form-group>
          </b-col>

          <!-- App Secret -->
          <b-col
            v-if="isBasic(getAuthType(row.system)) || isBearer(getAuthType(row.system))"
            :cols="isBasic(getAuthType(row.system)) ? 4 : 3"
          >
            <b-form-group>
                <label class="title">{{ getExtrafield(row.system, 'app_secret') }} *</label>
                <span></span>

              <b-form-input
                v-model="ranges[index][getExtrafield(row.system, 'app_secret', 1)]"
                :placeholder="getExtrafield(row.system, 'app_secret')"
              ></b-form-input>
            </b-form-group>
          </b-col>

          <!-- App Group -->
          <b-col cols="2" v-if="isBearer(getAuthType(row.system))">
            <b-form-group>
                <label class="title"
                  >{{ getExtrafield(row.system, 'app_group') }} *</label
                >
                <span></span>

              <b-form-input
                v-model="ranges[index][getExtrafield(row.system, 'app_group', 1)]"
                :placeholder="getExtrafield(row.system, 'app_group')"
              ></b-form-input>
            </b-form-group>
          </b-col>
        </template>
        <template v-else>
          <b-col cols="8" class="d-flex align-items-center">
            <span v-if="!row.system">Selecione um sistema para continuar</span>
            <span v-else>Auth Type não encontrado para esse sistema, tente editá-lo e escolha um tipo de autenticação</span>
          </b-col>
        </template>
        <b-col cols="1" class="d-flex align-items-center">
          <div class="d-flex flex-column align-items-center justify-content-center">
            <i @click="removeRange(index)" class="material-icons btn-icon btn-danger">delete</i>
            <span>Remover</span>
          </div>
        </b-col>
      </b-row>
      <div class="d-flex flex-column align-items-center justify-content-center">
        <i @click="addRange" class="material-icons btn-icon btn-success">add</i>
        <span>Adicionar</span>
      </div>
     <!-- Módulos -->
     <b-row>
      <b-row class="card" id="rotas">
        <h3 class="title text-justify">Módulos</h3>
        <b-row style="width:100vw">
          <b-col cols="6">
          <b-form-group id="select-title" style="top:0">
                <b-form-select
                    id="sort-by-select"
                    :options="allModulesRoute"
                    v-model="selectedModule"
                    @change="getItems"
                    class="select"
                >
                   <template #first>
                    <b-form-select-option :value="undefined"
                        >Selecionar módulo</b-form-select-option
                    >
                   </template>
                </b-form-select>
                </b-form-group>
        </b-col>
        <b-col cols="3">
                <div @click="selectAll()" class="title-btn" style="background-color: #095579; margin: auto;">
                <span class="label">Todas</span>
            </div>
          </b-col>
        </b-row>
      <b-row>
        <b-col cols="6">
          <b-form-tags
        size="lg"
        class="mb-2 modulo_tag text-dark bg-white"
        tag-class="modulo_tag"
        tag-variant="outline-light"
        separator=" "
        :placeholder="!value.length ? 'Escreva para adicionar ou selecione': ''"
        add-on-change
        no-outer-focus
        v-model="value"></b-form-tags>
        </b-col>
      </b-row>
     </b-row>
     </b-row>
    </b-form>
    </b-col>
   </b-row>
  </div>
</template>
<script>

export default {
  data () {
    return {
      servicesFields: [
        // values for Service Input
        { label: 'Tipo', key: 'type' },
        { label: 'API_KEY', key: 'api_key' },
        { label: 'APP_KEY', key: 'app_key' },
        { label: 'APP_SECRET', key: 'app_secret' },
        { label: 'APP_GROUP', key: 'app_group' }
      ],
      servicesOptions: [],
      ranges: [{ system: undefined }], // service_ranges
      selected: null, // service select value
      selectedModule: null,
      value: [] // modules
    }
  },
  props: ['user', 'systems', 'extrafields', 'modules'],
  created () {
    this.$store.dispatch('sistemas/init', { self: this })
    this.$store.dispatch('modulos/init', { self: this })
  },
  // mounted () {
  //  setTimeout(() => this.updateRanges(), 5000)
  // },
  computed: {
    allSystems () {
      return Object.values(this.$store.state.sistemas.items?.groups || {})
    },
    allSystemsAsOptions () {
      return this.allSystems.map(a => ({ value: a.id, text: a.key }))
    },
    allModules () {
      return Object.values(this.$store.state.modulos.items?.groups)
    },
    allModulesRoute () {
      return this.allModules
        .filter(m => this.ranges.map(s => s.system).includes(m.master_group_id))
        .map(m => ({ value: m.id, text: m.key }))
    }
  },
  watch: {
    value: {
      handler (v) {
        // console.log(v)
        this.$store.dispatch('moduleItems', v)
      }
    },
    systems: {
      handler (v) {
        // console.log('watch systems')
        this.updateRanges()
      },
      immediate: true
    },
    extrafields: {
      handler (v) {
        // console.log('watch extrafields')
        this.updateRanges()
      },
      immediate: true
    },
    '$store.state.sistemas.items': {
      handler (v) {
        // console.log('watch store')
        this.updateRanges()
      },
      immediate: true
    }
  },
  methods: {
    updateRanges () {
      const authTypeKeys = {
        basic: ['app_key', 'app_secret'],
        bearer_token: ['app_key', 'app_secret', 'app_group'],
        api_key: ['api_key']
      }
      this.ranges = this.allSystems.filter(s => this.systems.includes(s.id)).map(s => ({
        system: s.id,
        ...authTypeKeys[this.normalizeAuthType(this.getAuthType(s.id))].reduce((obj, key) => ({ ...obj, [this.getExtrafield(s.id, key, 1)]: this.extrafields.find(e => e.key === this.getExtrafield(s.id, key))?.value?.[0] }), {})
      }))
      this.value = this.modules
    },
    normalizeAuthType (v) {
      return (this.isBearer(v) && 'bearer_token') || (this.isBasic(v) && 'basic') || (this.isApiKey(v) && 'api_key')
    },
    getAuthType (system) {
      return this.allSystems.find(s => s.id === system)?.extra_fields?.find(e => e.key === 'auth_type')?.value?.[0]
    },
    getExtrafield (system, extrafield, removePrefix) {
      return this.allSystems.find(s => s.id === system)?.extra_fields?.find(e => e.key === extrafield)?.value?.[0]?.split('_')?.slice(+removePrefix)?.join('_')
    },
    isBearer (v) {
      return v.includes('bearer')
    },
    isBasic (v) {
      return v.includes('basic')
    },
    isApiKey (v) {
      return v.includes('api')
    },
    addRange () {
      this.ranges = [...this.ranges, { system: undefined }]
    },
    removeRange (index) {
      this.ranges = this.ranges.filter((e, i) => index !== i)
    },
    getSelection (event) {
      this.$store.dispatch('groupSelection', event)
    },
    getItems () {
      this.value = [...this.value, this.allModules.find(s => s.id === this.selectedModule).key]
    },
    selectAll () {
      // this.selectedModule =
      this.value = this.allModules.map(s => s.key)
    }
  }
}
</script>
<style lang="stylus">
@import "../../style/colors.styl";
@import "../../style/fonts.styl";

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

#rotas {
    justify-content: center;
    padding: 1%;
    margin: auto;
    border-radius: 15px
}

.select
  border-width: 0.1px
  opacity 0.7
  border-color: info
  border-style: solid

.modulo_tag{
    height: 2rem;
    font-size: 1.5rem;
}
.title-btn
    margin-left auto
    background-color primary
    color white
    border-radius 8px
    padding 10px 12px
    cursor pointer
    transition 0.2s

      &:hover
      background-color alpha(primary, 0.8)

      .label
        margin-left 5px

      span, .icon-btn
        vertical-align middle
        no-select()

.btn-icon
  border-radius: 50%
  padding 5px
  cursor pointer
  no-select()
  transition .3s
  margin 0 8px
  // background-color #f2f2f2
  color #f2f2f2
  border solid 1px gray
  &:hover
    background-color #f2f2f2 !important

.btn-turquesa
  &:hover
    color light
    border solid 1px secondary

.btn-danger
  background-color #DB2323
  &:hover
    color #DB2323
    border solid 1px #DB2323

.btn-warning
  &:hover
    color #FFC107
    border solid 1px #FFC107

.btn-success
  background-color #28A745
  &:hover
    color #28A745
    border solid 1px #28A745

</style>
