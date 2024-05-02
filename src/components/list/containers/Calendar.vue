<template>
    <div class="interface-content">

        <!-- Interface Header -->
        <div class="interface-header" v-if="!noHeader">

            <!-- Filter -->
            <span v-if="!noFilter" @click="filterSwitch" :class="'filter' + (filter ? ' actived' : '')">
                <i class="material-icons-outlined">filter_alt</i>
                Filtro<!--
            --></span>

            <!-- if Filter && OrderBy -->
            <span v-if="!noFilter" class="v-separator"></span>

            <!-- Order By -->
            <b-form-select
                id="sort-by-select"
                @change="orderByChange"
                :options="sortOptions"
                v-model="sortBy"
                class="select"
            >
                <template #first>
                    <option value="">Ordenar por</option>
                </template>
            </b-form-select>

            <!-- Line Separator -->
            <HLine :label="lineLabel" class="mt-4"></HLine>

        </div>

        <!-- Slot Content -->
        <div class="slot-content">
            <slot></slot>
        </div>

    </div>
</template>

<script>

import HLine from '@/components/layout/HLine'

export default {
  components: { HLine },
  data: () => ({
    actionsScope: 'Interface',
    sortBy: '',
    filter: false
  }),
  props: {
    noHeader: { type: Boolean, default: false },
    noFilter: { type: Boolean, default: false, required: false },
    sortOptions: { type: Array, required: false },
    lineLabel: { type: String, required: false }
  },
  methods: {
    filterSwitch () {
      this.filter = !this.filter
      this.$emit('filter', this.filter)
    },
    orderByChange (e) {
      this.$emit('sort', e)
    }
  }
}
</script>

<style lang="stylus" scoped>

    @import '../../../style/colors.styl';

    .title-btn
        float right
        background-color primary
        color white
        border-radius 8px
        padding 6px 12px
        cursor pointer
        transition 0.2s
        // margin-top -10px

    .interface-content

        .interface-header
            padding-top 16px
            text-align left

            span
                font-size 21px
                vertical-align middle

            .filter
                cursor pointer

                &:hover
                    color primary

            .actived
                color primary

            i
                font-size 28px
                vertical-align sub

            .v-separator
                //border 1px solid secondary
                background-color color-theme(true)
                display inline-block
                width 1px
                height 25px
                margin 0 8px
                cursor default

        .slot-content
            padding 0 8px 16px 8px

        .select
            width auto

</style>
