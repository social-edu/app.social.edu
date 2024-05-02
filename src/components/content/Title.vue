<template>
    <div :class="$route.name === 'Conversation' ? 'title-conversate' : 'title'">
        <!-- Title -->
        <slot>
            <h2 class="text-title">{{ title }}</h2>
        </slot>
        <slot name="slot-components"></slot>
        <template v-if="!noBtn">
           <div class="btns">
            <div @click="$router.back()" id="voltar" class="title-btn">
                <i class="icon-btn material-icons">{{ hasBack }}</i>
                <span class="label">voltar</span>
            </div>
            <div @click="$emit('event')" class="title-btn">
                <i class="icon-btn material-icons">{{ btnIcon }}</i>
                <span v-if="btnLabel" class="label">{{ btnLabel }}</span>
            </div>
           </div>
        </template>
    </div>
</template>

<style lang="stylus" scoped>

    @import '../../style/*'

    .title
        display flex
        margin-bottom 12px
        align-items center
        justify-content space-between
        font-family: Rubik
    .title-conversate
          width: -webkit-fill-available
          width: -moz-available
          background-color: #fff
          display flex
          margin-bottom 12px
          align-items center
          justify-content space-between
          font-family: Rubik
          position: fixed !important

    @media (max-width: md)
        max-height height-sm

        .title
            height: auto
        .title-conversate
            display: flex;
            flex-direction: column;
            flex-wrap: nowrap;
            align-content: center;
            justify-content: center;
            align-items: center;

        .text-title
            font-size 1.4em

    .btns
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 25px;
        align-content: center;
        .title-btn
            margin-left auto
            background-color primary
            color white
            border-radius 8px
            padding 10px 12px
            cursor pointer
            transition 0.2s

            &:hover
                background-color alpha(primary, 0.8)

            .label
                margin-left 5px

            span, .icon-btn
                vertical-align middle
                no-select()

    div#voltar
        background-color: #f2f2f2
        color: #1b1a1a
.title-btn
    background-color primary
    color white
    border-radius 8px
    padding 10px 12px
    cursor pointer
    transition 0.2s

      &:hover
      background-color alpha(primary, 0.8)

      .label
        margin-left 5px

      span, .icon-btn
        vertical-align middle
        no-select()

</style>

<script>
export default {
  props: {
    title: { type: String, default: 'No Title' },
    noBtn: { type: Boolean, default: false },
    btnLabel: { type: String, default: '' },
    btnIcon: { type: String, default: 'add' },
    hasBack: { type: String, default: 'arrow_back' },
    route: { type: String, default: '' }
  }
}
</script>
