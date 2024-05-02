<template>
    <b-form-group class="mb-0">
      <b-form-select
        :options="options"
        v-model="selected"
        @change="updateVoices"
      >
        <template #first>
          <b-form-select-option :value="null">Selecionar voz</b-form-select-option>
        </template>
      </b-form-select>
    </b-form-group>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      required: true
    },
    selectedSystem: {
      type: String,
      required: false
    }
  },
  data () {
    return {
      selected: this.selectedSystem
    }
  },
  watch: {
    selectedSystem (newValue) {
      this.selected = newValue
    }
  },
  methods: {
    updateVoices () {
      if (this.selected !== null) {
        this.$emit('voice-selected', this.selected)
      }
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
