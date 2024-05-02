<template>
  <div>
    <div v-if="isLoading" class="text-center text-dark my-2">
      <b-spinner class="align-middle"></b-spinner>
      <strong class="pl-2">Carregando...</strong>
    </div>
    <div v-else>

    <Basic v-if="768 > windowWidth"
      :items="items"
      :fields="fields.filter(f => f.key !== 'actions')"
      @GoToRotas="goTo('Rotas', $event)"
      @GoToModulosHome="goTo('Modulos', $event)"
      @GoToModulos="goTo('Dicionarios', item)"
      @Empresas="goTo('Empresas')"
      @Editar="onEdit($event)"
      @EditarModulo="editModule($event)"
      @Excluir="remove($event)"
      @Refresh="testar($event.id, $event)"
      @Integrar="integrar(id, item)"
      @Settings="configure($route.name ==='Rotas' ? 'Configurar' : 'ConfigurarSistemas', $event)"
      @Copy="copyRoute($event.id)"
      @EditarIntegracao="getIntegracaoToUpdate($event.id, $event)"
      @DatalakeStatus="$emit('datalakeStatus', $event)"
    ></Basic>
    <b-table
      ref="table"
      responsive
      sticky-header="100vh"
      style="padding-bottom: 16px; text-align: left;"
      :items="items"
      :fields="fields.filter(f => f.key !== 'actions')"
      :current-page="currentPage"
      :busy="isLoading"
      :filter="filterData"
      :filter-function="filter"
      :per-page="perPage"
      selectable
      @row-clicked="onRowClicked"
      show-empty
      :sort-by.sync="sortBy"
      :sort-desc="!sortDirection"
    >
    <template v-slot:cell(active)="{ item: item }">
          <b-form-checkbox @change="changeActiveStatus(item)" v-model="item.active" name="check-button" size="lg"
          switch>
        </b-form-checkbox>
        </template>
    <template v-slot:cell()="{ value, item, field: { key } }">
          <template v-if="edit != item.id">{{ value }}</template>
            <template v-else>
              <b-form-input  v-model="item[key]" />
            </template>
        </template>
        <template v-slot:cell(Editar)="{ item: { id }, item }">
        <div
          class="btn-icons btn-actions"
        >
          <i v-if="edit !== id"
            @click="onEdit(id)"
            class="material-icons btn-icon btn-warning"
            >edit</i
          >
          <i
            v-else
            @click="onSave(item, id)"
            class="material-icons btn-icon btn-success"
            >check</i
          >
        </div>
      </template>
      <template v-slot:cell(Excluir)="{ item: item }">
          <i
            @click.stop="remove(item)"
            class="material-icons btn-icon btn-danger"
            >delete</i
          >
        </template>

        <template #head()="key">
        <!-- Selecionar tudo -->
        <template v-if="key.field.key == 'selected'">
          <div class="d-flex flex-row align-items-center">
            <div
              @click="switchSelection"
              class="checkbox"
            >
            <div
              :class="(isAllRowsSelected ? 'active ' : '') + 'fill-selected'"
            ></div>
            </div>
          </div>
        </template>
        <template v-else-if="![
          'active',
          'Editar',
          'Excluir'].includes(key.field.key)">
          <div>{{ key.label }}</div>
          <input
            v-if="isFiltering"
            type="text"
            class="form-control"
            :id="'filter-' + key.field.key"
            v-model="filterData[key.field.key]"
          />
        </template>
      </template>
    </b-table>
    </div>
    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      size="md"
      align="right"
      class="my-0"
    ></b-pagination>
  </div>
</template>

<script>
import Basic from '@/components/listCards/cards/Basic'
import { request } from '@/services'
import { toast } from '@/utils'
export default {
  data: () => ({
    currentPage: 1,
    perPage: 5,
    selected: [],
    checked: false,
    edit: null,
    windowWidth: window.innerWidth
  }),
  beforeCreate () {
  },
  computed: {
    rows () {
      return this.items.length
    }
  },
  mounted () {
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize)
    })
  },
  props: {
    items: {
      type: Array,
      default: () => [],
      required: true
    },
    fields: {
      type: Array,
      required: true
    },
    module: {
      type: Object,
      required: true
    },
    sortBy: {
      type: String,
      default: undefined
    },
    sortDirection: {
      type: Boolean,
      default: true
    },
    isLoading: {
      type: Boolean,
      default: true
    },
    isFiltering: {
      type: Boolean,
      default: false
    },
    filterData: {
      type: Object,
      required: true
    },
    primaryFieldKey: {
      type: String,
      default: 'id'
    },
    checkboxs: {
      type: Boolean,
      default: false
    },
    radios: {
      type: Boolean,
      default: false
    }
  },
  components: { Basic },
  methods: {
    itemSelectedIndex (item) {
      return this.selected.findIndex(
        (o) => o[this.primaryFieldKey] === item[this.primaryFieldKey]
      )
    },
    isItemSelected (item) {
      return !!(this.itemSelectedIndex(item) + 1)
    },
    changeActiveStatus (item) {
      request.post('user/blockedEdit', { user_id: item.id, blocked: item.active ? 0 : 1 },
        (response) => {
          toast(this, 'success', 'Atualizado', 'Atualizado com sucesso')
          this.$store.dispatch('alunos/edit', response.data)
          response.data.blocked === 0 ? item.active = true : item.active = false
        },
        (error) => {
          toast(this, 'danger', 'Registro inválido', error)
          return Promise.reject(error)
        })
    },
    filter (item, filters) {
      if (!this.isFiltering || !filters) {
        return true
      }

      for (const key of Object.keys(filters)) {
        if (
          item[key] !== undefined &&
          item[key].toString().includes(
            filters[key]
          )
        ) {
          return true
        }
      }
      return false
    },
    emitSelection (v) {
      this.selected = [...v]
    },
    onRowClicked () {
    },
    getGroup (item) {
      this.$store.dispatch('getGroupObj', item.item)
      this.$store.dispatch('getGroupObjId', item.item.id)
    },
    goTo (route, item) {
      if (item !== undefined) {
        if (route === 'Configurar') {
          return this.$router.push({ name: route, query: { id: item.id, key: item.key } })
        }
        this.$router.push({ name: route, query: { group: item.key } })
      } else {
        this.$router.push({ name: route, params: { group: this.$store.getters.getGroupObjId } })
      }
    },
    onEdit (item) {
      this.edit = this.edit !== item ? item : null
    },
    onSave (item, id) {
      this.edit = this.edit !== item ? item : null

      for (const [key, value] of Object.entries(item)) {
        item[key] = !value ? null : value
      }

      const form = item
      request.post('auth/edit', { ...form, user_id: item.id },
        (response) => {
          toast(this, 'success', 'Atualizado', 'Atualizado com sucesso')
          this.$store.dispatch('alunos/edit', response.data)
        },
        (error) => {
          toast(this, 'danger', 'Registro inválido', error)
          return Promise.reject(error)
        })
    },
    remove (item) {
      if (
        !confirm(
          'Tem certeza que deseja deletar? ATENÇÃO: deletar um dado pode resultar na perda de outros que dependem dele'
        )
      ) {
        return
      }

      request.delete('user/delete/' + item.id,
        (response) => {
          // this.$store.dispatch(this.module.title + '/delete', response.data)
          this.isLoading = true
          window.setTimeout(() => {
            this.isLoading = false
            this.$store.dispatch(this.module.title + '/init', { self: this })
            return this.items
          }, 2000)
          toast(this, 'success', 'Excluir', 'Deletado com sucesso')
        },
        (error) => {
          toast(this, 'danger', 'Registro inválido', error)
          return Promise.reject(error)
        })
    },
    onResize () {
      this.windowWidth = window.innerWidth
    },
    getIntegracaoToUpdate (id, item) {
      this.$store.dispatch('updateIntegracao', { id, item })
      this.$bvModal.show('modal-2')
    }
  }
}
</script>

<style scoped lang="stylus">
@import '../../style/colors';
@import '../../style/fonts.styl';
@import '../../style/mixins.styl';

.table {
  color: greyLight !important;
  border-collapse: separate;
  border-spacing: 0 1em;
}

.table.b-table > thead > tr > .table-b-table-default, .table.b-table > tbody > tr > .table-b-table-default, .table.b-table > tfoot > tr > .table-b-table-default {
  background-color: light !important;
  color: black;
}

.table td, .table th, .table thead th {
  border: none;
  white-space: nowrap;
}

.table thead th {
  padding: 0 0.75rem;
  font-size: 20px;
}

.table tr {
  // background-color content-base-theme()
  background-color: primary;
  transition: 0.4s;

  &:focus {
    outline: none;
  }
}

radius = 10px;

.table tr td:first-child {
  border-top-left-radius: radius;
  border-bottom-left-radius: radius;
  width: 8%;
}

.table tr td:last-child {
  border-top-right-radius: radius;
  border-bottom-right-radius: radius;
}

.table th div {
  nowrap();
}

.table.b-table > tbody > .table-active, .table.b-table > tbody > .table-active > th, .table.b-table > tbody > .table-active > td {
  background-color: secondary !important;
}

.table.b-table tr {
  .btn-actions {
    min-width: 64px;
    display: inline;
  }

  i {
    transition: 0.3s;
    background-color: green;
  }

  .loading-btn {
    opacity: 0;
    transition: 0.3s;
    position relative

    span {
      position absolute
      right 10px
      bottom -1px
    }
  }

  &:hover {
    i {
      opacity: 1;
    }

    .loading-btn {
      opacity: 1;
    }
  }
}

.ec {
  align-self: flex-end;
}

.btn {
  justify-content: space-between;
  margin-left: 10px;
  float: left;
}

.btn-service {
  display: inline;
  margin-left: 0px;
}

.checkbox, .radio {
  display: block;
  width: 25px;
  height: 25px;
  background-color: light;
  // padding 20px
  border: 1px solid black;
  cursor: pointer;
  margin-top: 4px;

  .fill-selected {
    min-height: 100%;
    // border-radius: 4px
    transition: 0.2s;
    transform: scale(0.2);
  }

  .active {
    background-color: green;
    width: auto;
    height: auto;
    transform: scale(1);
  }
}

.radio {
  &, .fill-selected {
    border-radius: 50%;
  }
}

#remessa___BV_modal_header_, #remessa___BV_modal_footer_ {
  display: none;
}

#remessa___BV_modal_content_ {
  background-color: light;
  border-radius: 8px;
}

.title-btn-2 {
  background-color: blue;
  color: white;
  border-radius: 5px;
  padding: 6px 30px;
  cursor: pointer;
  margin-top: -4.5rem;
  position: absolute;
  top: -166px;
  right: 179px;
  font-family: Calibri;
  height: 38px;
  display: flex;
  align-items: center;

  .spinner-border {
    width: 1.25rem !important;
    height: 1.25rem !important;
  }

  &:hover {
    background-color: alpha(primary, 0.8);
    transition: 0.2s;
  }

  span, .icon-btn {
    vertical-align: middle;
    no-select();
  }
}

.btn-icon
    border-radius: 50%
    background-color primary
    color white
    padding 5px
    cursor pointer
    no-select()
    transition .3s
    margin 0 8px

    &:hover
        background-color primary

.btn-icons
    display flex
    justify-content center

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
.btn
  justify-content space-between
  margin-left 10px
  float left

.btn-service
  float left
  margin-left 1px
  border-radius 50%
  margin-top 20px

.service
  width 50%
  float right

.btn-icon-red
    background-color red !important

.table
    color greyLight !important
    border-collapse separate
    border-spacing 0 1em

.table.b-table > thead > tr > .table-b-table-default, .table.b-table > tbody > tr > .table-b-table-default, .table.b-table > tfoot > tr > .table-b-table-default
    background-color light !important
    color black

.table td, .table th, .table thead th
    border none
    white-space nowrap

.table thead th
    padding 0 .75rem
    font-size 20px

.table tr
    //background-color content-base-theme()
    background-color primary
    transition .4s

radius = 10px

.table tr td:first-child
    border-top-left-radius radius
    border-bottom-left-radius radius
    width 8%

.table tr td:last-child
    border-top-right-radius radius
    border-bottom-right-radius radius

.table th div
    nowrap()

.table.b-table > tbody > .table-active, .table.b-table > tbody > .table-active > th, .table.b-table > tbody > .table-active > td
    background-color secondary !important

.table.b-table tr
    .btn-actions
        min-width 64px
    i
        transition .3s
        background-color white
        color gray
        border solid 1px gray

    .btn-turquesa
      &:hover
        color secondary
        border solid 1px secondary

    .btn-danger
      &:hover
        color #DB2323
        border solid 1px #DB2323

    .btn-warning
      &:hover
        color #FFC107
        border solid 1px #FFC107
    .btn-success
      &:hover
        color #28A745
        border solid 1px #28A745

    &:hover
        i
            opacity 1

</style>
