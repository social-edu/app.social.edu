<template>
  <div>
    <div class="interface-header">
      <!-- Button Action -->
      <template v-if="!noBtn">
        <template v-if="!buttonDisabled">
          <div
            v-if="btnAsEvent"
            @click="$emit('action', $event)"
            class="title-btn"
          >
            <i class="icon-btn material-icons">{{ btnIcon }}</i>
            <span>{{ btnLabel }}</span>
          </div>
          <router-link v-else :to="btnLinkTo" tag="div" class="title-btn">
            <i class="icon-btn material-icons">{{ btnIcon }}</i>
            <span>{{ btnLabel }}</span>
          </router-link>
        </template>
        <template v-else>
          <div class="title-btn btn-loading">
            <i class="icon-btn material-icons">loop</i>
            <span>Carregando...</span>
          </div>
        </template>
      </template>
    </div>
    <div class="interface-body">
      <div v-if="!noTitle" class="submenu-title">
        <span>{{ title }}</span>
      </div>
      <!-- Interface Header -->
      <div class="interface-header" v-if="!noHeader">
        <div
          class="interface-header-wrapper"
          style="border-radius: 1rem 1rem 0 0;"
        >
          <span
            @click="filterSwitch"
            :class="'filter' + (filter ? ' actived' : '')"
            ><i class="material-icons-outlined">filter_alt</i>Filtrar</span
          >
          <span class="v-separator"></span>
          <span>Ordenar por</span>
          <b-form-select
            id="sort-by-select"
            @change="$emit('sort', $event, direction)"
            :options="sortOptions"
            v-model="sortBy"
            class="select"
            size="sm"
          >
            <template #first>
              <b-form-select-option :value="undefined" disabled
                >Selecione</b-form-select-option
              >
            </template>
          </b-form-select>
          <div class="direction" @click="toggleDirection">
            <transition name="rotate">
              <i v-bind:key="direction" class="material-icons-outlined">{{
                direction ? "arrow_upward" : "arrow_downward"
              }}</i>
            </transition>
          </div>
          <div v-if="!!perPage">
            <span class="v-separator ml-3"></span>
            <span class="filter ml-1">Items por página</span>
            <b-form-select
              id="sort-by-select"
              @change="$emit('perPageChanged', $event)"
              :options="[{value: 10, text: '10'}, {value: 50, text: '50'}, {value: 4294967296, text: 'Todos'}]"
              :value="perPage"
              class="select"
            ></b-form-select>
          </div>
        </div>
      </div>

      <div
        class="h-separator"
        v-if="separator"
        :style="noHeader ? 'border-radius: 1rem; padding-top: 16px' : ''"
      >
        <span></span>
        <template v-if="paths">
          <template :v-for="p in paths">
            <router-link
              :to="{ name: p.route }"
              custom
              v-slot="{ navigate, isActive }"
              :key="p.name"
            >
              <span
                :class="'title ' + (isActive ? 'active-title' : '')"
                @click="isAbleContinue(navigate, $event)"
                >{{ p.name }}
                <p v-html="validate(p)"></p
              ></span>
            </router-link>
            <span :key="p.name + '-separator'"></span>
          </template>
        </template>
        <template v-else>
          <span class="title">{{ title }}</span>
          <span></span>
        </template>
      </div>

      <div class="slot-content">
        <slot></slot>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    sortBy: undefined,
    filter: false,
    direction: true, // up true = asc, down false = desc
    form: {}
  }),
  methods: {
    filterSwitch () {
      this.filter = !this.filter
      this.$emit('filter', this.filter)
    },
    firstSelect () {
      this.$emit('firstSelect')
    },
    isAbleContinue (go, e) {
      go(e)
    },
    validate (p) {
      const item = this.$store.state.packageSave[p.route.split('.')[1]]
      return item ? '&check;' : '' // "&#10005;";
    },
    toggleDirection () {
      this.direction = !this.direction
      if (this.sortBy) {
        this.$emit('sort', this.sortBy, this.direction)
      }
    }
  },
  props: {
    // Main Title
    title: { type: String, required: false },
    paths: { type: Array, required: false },

    // Button
    noBtn: { type: Boolean, default: false },
    noTitle: { type: Boolean, default: false },
    buttonDisabled: { type: Boolean, default: false },
    btnLabel: String,
    btnIcon: String,
    btnAsEvent: { type: Boolean, default: false }, // if true btnLinkTo is not used
    btnLinkTo: Object,

    // Interface Header
    noHeader: { type: Boolean, default: false }, // true for not display header, filter and order by will not be trigger
    noModal: { type: Boolean, default: false },
    separator: { type: Boolean, default: false },
    sortOptions: Array,

    // Tab
    /*     hasTabs: { type: Boolean, default: false },
    tab1: { type: Object, default: () => ({}) },
    tab2: { type: Object, default: () => ({}) }, */

    perPage: { type: Number, required: false }
  },
  computed: {
    currentRouteName () {
      return this.$route.name
    }
  }
}
</script>

<style lang="stylus" scoped>

@import '../../style/colors.styl';
@import '../../style/fonts.styl';
@import '../../style/mixins.styl';

#sort-by-select{
  border: solid 1px #9A9A9A
}

.rotate-enter
    transform rotate(-180deg)

.rotate-leave-to, .rotate-leave-active
    display none

.rotate-enter-active
    transition all 0.3s ease-in-out
    //transform rotate(180deg)

.btn-success
    border-radius 50%
    padding 5px 6px
    margin-right 30px

.interface-header
    //margin-bottom 16px
    background-color #f2f2f2

    h2
        font-family OpenSans

    span
        font-family Calibri

    h2, div
      display: flex;
      vertical-align: middle;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      align-content: center;
      flex-wrap: nowrap;

    .interface-header-wrapper
        background-color light
        border-radius 0 1rem 0 0
        width 100%
        padding 16px

.tab
    > div
        padding 12px 78px
        font-size 1.2em
        cursor pointer
        transition 0.25s
        color rgba(0,0,0,.70)
        background-color alpha(light, 70%)

        &:hover
            color rgba(0,0,0,.9)
            background-color alpha(light, 90%)

    .tab-actived
        color rgba(0,0,0,1)
        background-color: light

    background-color: darkBlue

.interface-body
    background-color content-theme()
    //padding 4px
    border-radius 8px
    color color-theme(true)

    .submenu-title
        position absolute
        margin-top -3.5rem
        color lightBlue
        font-size 24px
        font-weight bold

    .interface-header

        span
            font-size 21px
            vertical-align middle
            cursor pointer

            &:hover
                color primary

        .actived
            color primary

        i
            font-size 28px
            vertical-align sub

        .direction
            vertical-align middle
            background-color primary
            border-radius 4px
            padding 4px
            cursor pointer
            margin-left 8px
            no-select()

            i
                vertical-align middle
                //font-size 1em
                color alpha(grey, 70%)

            &:hover
                i
                    color grey

        .v-separator
            //border 1px solid secondary
            background-color color-theme(true)
            display inline-block
            width 1px
            height 25px
            margin 0 8px
            cursor default

    .slot-content
        border-radius 0 0 1rem 1rem
        background-color light
        padding 0 16px 16px 16px
        position relative

    .select
        width auto
        margin-left 8px
        font-size 16px
        border-radius 0.45rem

      .custom-select
        // background-color content
        color rgba(0, 0, 0, 0.3)
        border-color rgba(0, 0, 0, 0.3)

.h-separator

    background-color light
    display flex
    padding-bottom 16px

    .title
        padding 3px 10px
        font-size 14px
        text-transform uppercase
        color alpha(grey, 70%)
        font-weight bold
        border-radius 1rem
        background primary
        cursor pointer

        + span
            border 1px dashed greyDark
            height 1px
            width 50px

    .active-title
        color lightBlue // lighten(lightBlue, 25%)

    span
        align-self center

    span:first-child, span:last-child
        border 1px dashed greyDark
        height 1px

    span:first-child
        width 20px

    span:last-child
        flex-grow 1

.title-btn
    float right
    background-color blue
    color white
    border-radius 5px
    padding 6px 30px
    cursor pointer
    transition 0.2s
    margin-top -4.5rem
    height 38px

    &:hover
        background-color alpha(primary, 0.8)

    span, .icon-btn
        vertical-align middle
        no-select()

.btn-loading
    background-color alpha(blue, 0.75)
    color alpha(white, 0.75)

.icon-btn
    font-size 1.25em
    padding-right 4px
    margin-left -4px

p
    margin unset
    display inline
</style>
