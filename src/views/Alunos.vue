<template>
  <Content :route="'/alunos'" :action="action" title="Alunos" @event="goTo">
    <Interface
    noBtn
    :noTitle="true"
    :sortOptions="[{ value: 'name', text: 'Nome' }, { value: 'email', text: 'Email' }, { value: 'telephone', text: 'Telefone' }, { value: 'document', text: 'CPF' }]"
    @sort="sort"
    @filter="filterSwitch"
  >
  <Table :is-filtering="isFiltering" :filter-data="filterData" :is-loading="isLoading" :module="routeModule" :items="items" :fields="fields" :edit="edit" :sortBy="sortBy" :sortDirection="sortDirection"></Table>
  </Interface>
</Content>
</template>

<script>
import Interface from '@/components/Dashboard/Interface'
import Content from '../components/content/index'
import Table from '../components/Dashboard/Table.vue'
export default {
  components: {
    Interface, Content, Table
  },
  data: () => ({
    sortBy: undefined,
    sortDirection: true,
    edit: null,
    isFiltering: false,
    filterData: {},
    fields: [
      { key: 'active', label: 'Habilitado' },
      { key: 'name', label: 'Nome' },
      { key: 'email', label: 'Email' },
      { key: 'telephone', label: 'Telefone' },
      { key: 'document', label: 'CPF' },
      { key: 'Editar', label: 'Editar' },
      { key: 'Excluir', label: 'Excluir' }
    ]

  }),
  created () {
    this.$store.dispatch('alunos/init', { self: this })
    this.isLoading = false
  },
  computed: {
    action () {
      return { options: { label: 'Novo', icon: 'add' } }
    },
    items () {
      if (this.$store.state.alunos.items.length !== 0) {
        // eslint-disable-next-line no-return-assign
        return this.$store.state.alunos.items.users.map(a => ({ ...a, document: a.document ?? a.cpf, active: a.blocked === 0 ? a.active = true : a.active = false }))
      } else {
        return this.$store.state.alunos.items
      }
    },
    isLoading () {
      return this.$store.state.alunos.loading
    },
    routeModule () {
      return this.$store.state.alunos
    }
  },
  watch: {
    filterData: {
      handler (value) {
        Object.keys(value).forEach((key) => {
          if (value[key] === '') {
            delete value[key]
          }
        })
      },
      deep: true
    }
  },
  methods: {
    filterSwitch (value) {
      this.isFiltering = value
      if (!value) this.filterData = {}
    },
    goTo () {
      this.$router.push({ name: 'Cadastro', params: { module: this.$store.state.alunos.title } })
    },
    onEdit (id) {
      this.edit = this.edit !== id ? id : null
    },
    onSave (item, id) {
      this.edit = this.edit !== item ? item : null

      for (const [key, value] of Object.entries(item)) {
        item[key] = !value ? null : value
      }

      let form = item

      form = Object.assign({}, form, {
        // group_id: form.groups[0].id,
        user_id: form.id
      })

        // eslint-disable-next-line no-unexpected-multiline
        [
          // eslint-disable-next-line no-sequences
          'remember_token',
          'tenant_id',
          'deleted_at',
          'updated_at',
          'created_at'
        ].forEach((e) => delete form[e])

      console.log(form)
    },
    sort (e, z) {
      this.sortBy = e
      this.sortDirection = z
    }
  }
}
</script>
<style scoped lang="stylus">
@import '../style/colors';
@import '../style/fonts.styl';
@import '../style/mixins.styl';

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
    opacity: 0;
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
        opacity 0
        transition .3s
        background-color green

    &:hover
        i
            opacity 1

</style>
