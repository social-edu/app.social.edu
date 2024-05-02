<template>
    <div class="d-flex justify-content-between align-items-center">
        <template v-if="actions.length > 0">
            <div class="d-flex flex-column" v-for="action in actions" :key="action.key">
                <div
                    :class="'material-icons btn-action-' + (action.options.theme || 'turquesa')"
                    @click="$emit('event', action)"
                >{{ action.options.icon || "extension" }}</div>
                <div class="info" v-if="action.options.text">{{ action.options.text }}</div>
            </div>
        </template>
    </div>
</template>

<script>

export default {
  props: {
    actions: { type: Array, default: () => [] }
  }
}
</script>

<style lang="stylus" scoped>

    @import '../../style/colors.styl';

    btn-action()
        border-radius 50%
        width 48px
        height 48px
        margin 4px 10px
        cursor pointer
        transition .25s
        display flex
        justify-content center
        align-items center
        color white

    .info
        text-align center
        color black
        font-size 16px
        font-weight normal

    .btn-action-turquesa
        btn-action()
        // background-color v
        color rgb(128, 128, 128)
        border solid 1px rgb(128, 128, 128)

        &:hover
            color light
            border solid 1px primary-variant

    .btn-action-warning
        btn-action()
        // background-color v
        color rgb(128, 128, 128)
        border solid 1px rgb(128, 128, 128)

        &:hover
            color rgb(255, 193, 7)
            border solid 1px rgb(255, 193, 7)

    .btn-action-danger
        btn-action()
        // background-color v
        color rgb(128, 128, 128)
        border solid 1px rgb(128, 128, 128)

        &:hover
            color rgb(219, 35, 35)
            border solid 1px rgb(219, 35, 35)

    /*
    colors = { success: primary, warning: warning, danger: danger, info: primary-variant }

    for name, v in colors
        .btn-action-{name}
            btn-action()
            background-color v

            &:hover
                background-color darken(v, 20%)
    */

</style>
