<template>
    <b-button :disabled="isLoading" :class="buttonClass" @click="$emit('event')">
      <span v-if="isLoading">
        <b-spinner small></b-spinner> Carregando...
      </span>
      <slot v-else></slot>
    </b-button>
  </template>

<script>
export default {
  props: {
    buttonClass: {
      type: String,
      default: ''
    },
    isLoading: {
      type: Boolean,
      required: true
    }
  }
}
</script>
