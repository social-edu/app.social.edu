<template>
    <Builder :values="values" v-slot="props" @add="add">
      <b-row>
        <!-- Tipo -->
        <b-col cols="3">
          <b-form-group>
            <div class="h-separator">
              <label for="input-add-product" class="title"
                >Sistema *</label
              >
              <span></span>
            </div>

            <b-form-select
              :options="field"
              :value="get(props.value, type.key)"
              @change="input($event, type.key, props.index)"
              required
            >
              <template #first>
                <b-form-select-option :value="undefined" disabled
                  >Coluna 1</b-form-select-option
                >
              </template>
            </b-form-select>
          </b-form-group>
        </b-col>

        <!-- Mínimo -->
        <b-col cols="3">
          <b-form-group>
            <div class="h-separator">
              <label for="input-add-product" class="title"
                >Banco de Dados *</label
              >
              <span></span>
            </div>

            <b-form-select
              :options="field"
              :value="get(props.value, type.key)"
              @change="input($event, type.key, props.index)"
              required
            >
              <template #first>
                <b-form-select-option :value="undefined" disabled
                  >Coluna 2</b-form-select-option
                >
              </template>
            </b-form-select>
          </b-form-group>
        </b-col>

        <!-- Valor -->
        <b-col
          :cols="isPerfumeOrBattery(props.value) ? 8 : isTo(props.value) ? 3 : 4"
        >
          <b-form-group>
            <div class="h-separator">
              <label for="input-add-product" class="title">{{ v.label }} *</label>
              <span></span>
            </div>

            <b-form-input
              :value="get(props.value, v.key)"
              @input="input($event, v.key, props.index)"
              placeholder="Valor"
            ></b-form-input>
          </b-form-group>
        </b-col>

        <b-col cols="1" class="d-flex align-items-center">
          <div
            class="button mx-2"
            style="background-color: #bd1b24"
            @click="del(props.index)"
          ></div>
        </b-col>
      </b-row>
    </Builder>
  </template>
<script>
import Builder from './Builder'
import Behavior from '../Behavior'
export default {
  components: { Builder },
  mixins: [Behavior]
}
</script>
