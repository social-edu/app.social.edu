import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { api } from './services'
import Maska from 'maska'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'

Vue.component('v-select', vSelect)
Vue.use(Maska)

Vue.config.productionTip = false

if (store.state.token !== undefined) {
  api.defaults.headers.common.Authorization = `Bearer ${store.state.token}`
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
