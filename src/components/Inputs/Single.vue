<template>
  <Builder :values="values" v-slot="props" @add="add">
    <div class="d-flex flex-row align-items-baseline">
      <b-form-group :label="field.label">
        <b-form-input
          :value="get(props.value, field.key)"
          @input="input($event, field.key, props.index)"
          placeholder="Número da Proposta"
        ></b-form-input>
      </b-form-group>

      <div
        class="button mx-2"
        style="background-color: #bd1b24"
        @click="del(props.index)"
      ></div>
    </div>
  </Builder>
</template>

<script>
import Builder from './Builder'
import Behavior from './Behavior'

export default {
  components: { Builder },
  mixins: [Behavior],
  computed: {
    field () {
      return this.fields[0]
    },
  },
};
</script>
