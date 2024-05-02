<template>
    <Builder v-bind="$props" v-slot="props" :row="1">

        <div class="d-flex justify-content-between align-items-center">

            <!--<img src="@/assets/images/UserStatic.png"/>-->
            <div class="img-holder"></div>

            <b-card-text class="block">
                <span><span class="title">{{ props.values.title }}</span> <span class="ml-4">{{ props.values.titleExtra }}</span></span>
                <span class="subtitle">{{ props.values.subtitle }}</span>
            </b-card-text>

            <b-card-text class="block">
                <span>{{ props.values.data1 }}</span>
                <span>{{ props.values.data2 }}</span>
            </b-card-text>

            <b-card-text class="block">
                <span>{{ props.values.data3 }}</span>
                <span>{{ props.values.data4 }}</span>
            </b-card-text>

            <Buttons :actions="actions" @event="action => $emit('event', action, props.item)"></Buttons>

        </div>

    </Builder>
</template>

<style lang="stylus" scoped>

@import '../../../style/colors.styl';
@import '../../../style/mixins.styl';

.btn-show
    float right
    margin-top -15px
    border-radius 32px
    background-color content-theme()
    padding 8px 16px
    color #ffffff
    cursor pointer

.block
    display flex
    text-align left
    // align-items center
    flex-direction column
    margin 0
    min-width 20%

.img-holder
    width 50px
    height 50px
    border-radius 50%
    background-color #bbb

.title
    font-weight bold
    font-size 1.2em
    color #0095AD

.subtitle
    text-decoration underline

</style>

<script>

import Builder from './Builder'

import Buttons from '@/components/button/Action'

export default {
  components: { Builder, Buttons },
  props: ['items', 'fields', 'actions', 'label']
}
</script>
