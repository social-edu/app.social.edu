<template>
    <div class="wrapper">
        <Title class="title" :route="route" :hasBack="hasBack" :noBtn="!hasBtn" :btnLabel="btnLabel" :btnIcon="btnIcon" :title="title"
            @event="$emit('event', action)">
            <template slot="slot-components">
              <slot name="selects"></slot>
            </template>
        </Title>
        <div class="component">
          <slot></slot>
        </div>
    </div>
</template>

<style lang="stylus" scoped>

    @import '../../style/colors.styl'

    .wrapper
        // padding 16px
        padding-top 16px
        flex-grow 1
        // background-color content-base-theme()
        background-color: #f2f2f2;

      .title
        padding 0 16px
        background-color: #fff;
        height: 120px;
        z-index 7
        top: 12vh;

    .component
        background-color content-theme()
        padding 16px
        // border-radius 8px
        min-height 80vh

</style>

<script>
import Title from './Title'
// import api from '@/services'

export default {
  components: { Title },
  props: {
    title: {
      type: String,
      default: 'Title'
    },
    action: {
      type: Object,
      required: false
    },
    route: {
      type: String,
      required: false
    }
  },
  computed: {
    hasBtn () {
      return !!this.action
    },
    btnLabel () {
      return this.action?.options.label
    },
    btnIcon () {
      return this.action?.options.icon
    },
    hasBack () {
      return this.action?.options.backButton
    }
  }
}
</script>
