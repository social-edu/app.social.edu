<template>
    <div>
        <span></span>
        <span class="title">{{ label }}</span>
        <span></span>
    </div>
</template>

<style lang="stylus" scoped>
    div
        display flex
        // margin-bottom 16px

        .title
            padding 0 8px
            font-size 14px
            text-transform uppercase
            font-weight bold
            font-size 1.1em

        span
            align-self center

            &:first-child, &:last-child
                border 1px dashed #C4C4C4
                height 1px

            &:first-child
                width 20px

            &:last-child
                flex-grow 1
</style>

<script>

export default {
  props: {
    label: {
      type: String,
      default: 'no label'
    }
  }
}

</script>
