<template>
    <div>
        <template v-if="!isBusy && !empty">

            <!-- Card -->
            <b-row :md="row" :cols="Math.floor(row/2)" class="mb-4">
                <b-col v-for="item in items" :key="item.id" class="card-column" :md="12 / row" :cols="12 / Math.floor(row/2)">
                    <b-card :class="noStyle ? 'card-unset' : 'card-slot'">
                        <slot :item="item" :values="itemValues(item)"></slot>
                    </b-card>
                </b-col>
            </b-row>

        </template>

        <template v-else-if="empty">
            <div class="text-center my-2">Não há registros até o momento.</div>
        </template>

        <template v-else>
            <!--<Loading></Loading>-->
            Carregando ...
        </template>
    </div>
</template>

<style lang="stylus" scoped>

@import '../../../style/colors.styl';

.card-slot
    background-color light !important
    color black
    border-radius 16px
    box-shadow 0 4px 4px rgba(0,0,0,.5)

.card-unset
    border none
    background-color #212121

.card-column
    padding 10px 15px

.filters
    display flex // not use .d-flex cause !important override v-show

</style>

<script>

import Behavior from '../Behavior'

export default {
  mixins: [Behavior],
  props: {
    // Number of cards in a row
    row: {
      type: Number,
      default: 2
    },
    noStyle: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    itemValues (item) {
      return this.fields.reduce((obj, value) => Object.assign(obj, { [value.slot]: typeof value.key === 'function' ? value.key(item) : item[value.key] }), {})
    }
  }
}
</script>
