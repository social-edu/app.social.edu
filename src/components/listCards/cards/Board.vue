<template>
    <Builder v-bind="$props" v-slot="props" :row="3" noStyle>
        <div @dragover.prevent @drop.stop.prevent="dropProject(props.values.name)" class="board">
            <b-card-title class="header">
                <div>
                    <span>{{ props.values.title }}</span>
                </div>
            </b-card-title>

            <div v-if="!props.values.items.length">Nenhum Projeto</div>

            <div class="board-card d-flex flex-column justify-content-between align-items-start text-left" v-for="(item, index) in props.values.items" :key="'prop-item-' + index">
                <div @dragstart="selectProject(item)" class="d-flex flex-column" draggable="true">
                    <span>Paciente: {{ item.paciente }}</span>
                    <span>{{ $store.state.user.name }}</span>
                    <!-- <span>{{ item.medico }}</span> -->
                    <span>Entrega {{ item.entrega }}</span>
                    <div class="button">Construtor</div>
                </div>
            </div>
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

div
    font-family Rubik

.board
    overflow-y scroll
    overflow-x hidden
    height 235px

    span
        nowrap()
        text-overflow ellipsis
        overflow hidden

    div
        span
            padding 4px 0

    .button
        color white
        background-color secondary
        padding 8px 4px
        border-radius 8px
        cursor pointer
        margin 16px auto 0px
        text-align center
        width 50%
        no-select()

        &:hover
            background-color alpha(secondary, 0.8)

    .board-card
        background-color white
        border-radius 16px
        border 1px solid rgba(0,0,0,.125)
        box-shadow 0 4px 4px rgba(0,0,0,.25)
        margin 16px 0
        padding 16px
        font-size 0.85em

        > div
            width 100%

</style>

<script>

import Builder from './Builder'
import { request } from '@/services'
import { toast } from '@/utils'

export default {
  components: { Builder },
  props: ['items', 'fields', 'actions', 'label'],
  methods: {
    selectProject (project) {
      this.$store.dispatch('projetos/selected', project)
    },
    dropProject (board) {
      console.log(board)
      const p = this.$store.state.projetos.selected

      if (p && p.status !== board) {
        request.post('projeto/update', { id: p.id, status: board },
          response => {
            toast(this, 'success', 'Projeto Atualizado', 'Projeto atualizado com sucesso')
            this.$store.dispatch('projetos/edit', response.data.projetos)
          },
          error => {
            toast(this, 'danger', 'Projeto não atualizado', error)
            return Promise.reject(error)
          }
        )
      }
    }
  }
}
</script>
