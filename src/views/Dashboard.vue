<template>
    <div>
        <Topbar :user="user"></Topbar>
        <div class="frame">
            <Sidebar></Sidebar>
            <div class="content">
                <transition name="page-transition" mode="out-in">
                  <router-view :key="$route.fullPath"></router-view>
              </transition>
            </div>
        </div>
    </div>
</template>

<style scoped lang="stylus">

    @import '../style/colors.styl';
    @import '../style/mixins.styl';
    @import '../style/dimens.styl';

    .frame
        display flex

        .content
          /* display flex */
          flex-grow 1

    // Animation Transition for router-view
    .page-transition-enter, .page-transition-leave-to
        //transform translateX(-30px)
        opacity 0

    .page-transition-enter-active, .page-transition-leave-active
        transition all 0.2s

</style>

<script>
import Topbar from '@/components/Topbar'
import Sidebar from '@/components/Sidebar'

export default {
  name: 'Dashboard',
  components: { Topbar, Sidebar },
  computed: {
    user () {
      return this.$store.state.user
    }
  }
}
</script>
