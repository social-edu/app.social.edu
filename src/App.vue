<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="stylus">

@import 'style/*.styl';

.skiptranslate, .goog-te-gadget{
    display: none;
}

#google_translate_element {
    display: none;
}
.goog-te-banner-frame {
    display: none !important;
}
#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center

.custom-control-label::before
    color: #fff;
    border-color: red;
    background-color: red

.custom-control-input:checked~.custom-control-label::before
    color: #fff;
    border-color: green;
    background-color: green

.select
    width auto
    background-color rgba(0,0,0,0)
    font-family Rubik
    color #2c3e50
    font-size 21px
    border none

    &:focus
        box-shadow none !important

.form-group
    text-align left

    label
        color primaryDark
        padding 0 0.5rem
        margin 8px 0
        border-radius 1rem
        font-weight bold
        background transparent
        display inline-block !important

    .form-control, .form-control:focus, .custom-select
        background-color #F4F4F4
        color secondary
        border-color #adb5bd

    .form-control-white-bg
        background-color #FFFFFF

.form-control:focus, .custom-select:focus
    box-shadow 0 0 0 0.2rem alpha(secondary, .25)

.custom-switch .custom-control-label::after
    background-color: #fff

.file
    text-align left

    label
        background-color #FFFFFF

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}

#app
    color color-theme(true)

.btn-outline-primary
    color: primary
    border-color: primary

.btn-outline-primary:hover, .btn-outline-primary:not(:disabled):not(.disabled):active
    background-color primary
    border-color primary

.btn-outline-primary:focus
    box-shadow 0 0 0 0.15rem alpha(primary, 0.5)

.form-group
    label
        color primaryDark
        padding 0 0.5rem
        margin 8px 0
        border-radius 1rem
        font-weight bold
        background transparent
        display inline-block !important

    .form-control, .form-control:focus
        background-color content
        color primary
        border-color #adb5bd
    .custom-select
      background-color content
      color primary
/*.form-control, .form-control:focus, .custom-select, .custom-select:focus
    background-color content-theme()
    color color-theme(true)
    border-color secondary*/

.form-control:focus, .custom-select:focus
    box-shadow 0 0 0 0.2rem alpha(secondary, .25)

a:hover
    text-decoration none

table
    width 100%
    font-weight bold

.btn-icon
    border-radius: 50%
    background-color primary
    color white
    padding 5px
    cursor pointer
    no-select()
    transition .3s
    margin 0 8px

    &:hover
        background-color primary

.btn-icons
    display flex
    justify-content center

// Paginator

.page-item
    background-color #115F63
    border-color content-theme()
    margin-left .5rem
    border-radius 8px !important

.page-link, .page-item.disabled .page-link {
    color #000 !important
    background-color #115F63 !important
    border none !important
    border-radius 8px !important
    box-shadow: 0px 3px 6px 0px rgba(0,0,0,0.3);

}

.page-item:first-child .page-link, .page-item:last-child .page-link {
    border-radius 8px
}

.page-link:hover
    color #FFF
    background-color content-base-theme() !important
    border-color content-base-theme() !important

.page-item.active .page-link
    background-color #FFF // darken(primary, 40%)

.b-toaster-top-center {
  .b-toaster, .b-toaster-top-center, .b-toaster-slot, .b-toast, .toast {
    max-width 800px !important
  }
}

.toast-btn {
  .toast-body {
    display flex !important
    flex-direction row
    align-items center
    justify-content space-between
  }
}

// Scroll

::-webkit-scrollbar
    width 6px
    height 6px

::-webkit-scrollbar, ::-webkit-scrollbar-corner
    background light

::-webkit-scrollbar-track
    // box-shadow inset 0 0 5px #ff0000
    border-radius 8px
    background grey
    background-clip content-box
    border 4px solid transparent

::-webkit-scrollbar-thumb
    background lightBlue
    //border-radius 8px

    &:hover
        background darken(primary, 15%)
</style>

<!--Custom icons-->
<style>
    @font-face {
        font-family: 'custom icons';
        src: url('assets/custom-icons/custom-icons.eot');
        src: url('assets/custom-icons/custom-icons.eot?#iefix') format('embedded-opentype'),
            url('assets/custom-icons/custom-icons.woff') format('woff'),
            url('assets/custom-icons/custom-icons.ttf') format('truetype'),
            url('assets/custom-icons/custom-icons.svg#custom-icons') format('svg');
        font-weight: normal;
        font-style: normal;
    }
    [class*='icon-custom-']:before{
        display: inline-block;
        font-family: 'custom icons';
        font-style: normal;
        font-weight: normal;
        line-height: 1;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        letter-spacing: normal;
        white-space: nowrap;
    }
    .icon-custom-group:before{content:'\0041';}
    .icon-custom-home:before{content:'\0042';}
    .icon-custom-maintenance:before{content:'\0043';}
    .icon-custom-system:before{content:'\0044';}
    .icon-custom-user:before{content:'\0045';}
</style>
