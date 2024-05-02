<template>
      <b-form-group class="mb-0">
        <b-form-select
          :options="routes"
          v-model="selected"
          @change="onRouteSelected"
        >
          <template #first>
            <b-form-select-option :value="null">Selecionar Rota</b-form-select-option>
          </template>
        </b-form-select>
      </b-form-group>
  </template>

<script>
export default {
  props: {
    routes: {
      type: Array,
      default: () => [], // O valor default é um array vazio
      required: true
    },
    selectedRoute: {
      type: String,
      required: false
    }
  },
  data () {
    return {
      selected: this.selectedRoute
    }
  },
  watch: {
    selectedRoute (newValue) {
      this.selected = newValue
    }
  },
  methods: {
    onRouteSelected (routeId) {
      this.$emit('route-selected', routeId) // Emitir o evento com o ID da rota selecionada
    }
  }
}
</script>
<!--
<style lang="stylus" scoped>
.select
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    position: relative;
    top: 6vh;
    width: min-content
    align-content: center;
</style>
 -->
