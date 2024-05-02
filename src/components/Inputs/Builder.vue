<template>
  <div>
    <b-row :cols="12" class="mb-4">
      <b-col :cols="12" v-for="(value, index) in values" :key="index">
        <slot :value="value" :index="index"></slot>
      </b-col>
    </b-row>
    <slot name="footer">
      <div @click="add" class="button">
        <i class="menu-icon material-icons-outlined">add</i>
      </div>
    </slot>
  </div>
</template>

<style lang="stylus" scoped>

@import '../../style/colors.styl';
@import '../../style/fonts.styl';

.button
    display inline-flex
    cursor pointer
    padding 10px
    border-radius 50%
    text-align center
    color #ffffff
    transition .25s
    background-color green
    min-width 40px
    min-height 40px
    margin-bottom 16px

    i
        font-size 20px

    &:hover
        background-color darken(green, 20%)
</style>
<script>
export default {
  props: {
    values: {
      type: Array,
      required: true
    }
  },
  methods: {
    add () {
      this.$emit('add')
    }
  }
}
</script>
