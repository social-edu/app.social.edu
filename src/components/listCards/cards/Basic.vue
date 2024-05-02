<template>
    <Builder v-bind="$props" v-slot="props">
        <b-card-title class="header">
            <div>
                <span>{{ props.values.name }}</span>
            </div>
        </b-card-title>

        <div class="d-flex justify-content-between align-items-start flex-column">
            <div class="d-flex flex-column mb-2">
                <div v-for="f in fieldsCol" :key="f.key" class="d-flex justify-items-between">
                    <span class="col-th">{{ f.key }}:</span>
                    <span class="col-td ml-2">{{props.item[f.key]}}</span>
                </div>
            </div>

            <!-- Events -->
            <Buttons style="align-self: center;" :actions="fieldsAction" @event="action => $emit(action.key, props.item)"></Buttons>
        </div>
    </Builder>
</template>

<style lang="stylus" scoped>

@import '../../../style/*'

.header
    vertical-align middle

.header p
    text-overflow: ellipsis

.btn-show
    float right
    margin-top -15px
    border-radius 32px
    background-color primary
    padding 8px 16px
    color #ffffff
    cursor pointer

.text-modulos
    font-size 1.3em

div
    font-family Rubik

.col-th
    font-size: 20px
    color: #212529;
    font-weight: 700

.col-td
    font-size: 20px

</style>

<script>

import Builder from './Builder'

import Buttons from '@/components/button/Action'

const actionsData = {
  GoToRotas: {
    icon: 'link'
  },
  GoToModulosHome: {
    icon: 'extension'
  },
  GoToModulos: {
    icon: 'terminal'
  },
  Empresas: {
    icon: 'room_preferences'
  },
  Editar: {
    icon: 'edit',
    theme: 'warning'
  },
  EditarModulo: {
    icon: 'edit',
    theme: 'warning'
  },
  EditarIntegracao: {
    icon: 'edit',
    theme: 'warning'
  },
  DatalakeStatus: {
    icon: 'list'
  },
  Excluir: {
    icon: 'delete',
    theme: 'danger'
  },
  Refresh: {
    icon: 'refresh'
  },
  Integrar: {
    icon: 'refresh'
  },
  Settings: {
    icon: 'settings'
  },
  Copy: {
    icon: 'content_copy'
  }
}

const actionsKey = Object.keys(actionsData)

export default {
  components: { Builder, Buttons },
  props: ['items', 'fields', 'actions', 'actionsModulo', 'label'],
  computed: {
    fieldsCol () {
      return this.fields.filter(f => !actionsKey.includes(f.key))
    },
    fieldsAction () {
      return this.fields.filter(f => actionsKey.includes(f.key))
        .map(f => ({ ...f, options: (actionsData[f.key] || {}) }))
    }
  }
}
</script>
