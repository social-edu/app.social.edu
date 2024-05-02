<template>
  <Builder :values="values" v-slot="props" @add="add">
    <b-row>
      <!-- Tipo -->
      <b-col :cols="isBasic(props.value) || isBearer(props.value) ? 2 : 3">
        <b-form-group>
            <label for="input-add-product" class="title"
              >{{ type.label }} *</label
            >
            <span></span>

          <b-form-select
            :options="field"
            :value="get(props.value, type.key)"
            @change="input($event, type.key, props.index)"
            required
          >
            <template #first>
              <b-form-select-option :value="undefined" disabled
                >Tipo de autenticação</b-form-select-option
              >
            </template>
          </b-form-select>
        </b-form-group>
      </b-col>

      <!-- Api Key -->
      <b-col cols="7" v-if="isApiKey(props.value)">
        <b-form-group>
            <label class="title"
              >{{ apiKey.label }} *</label
            >
            <span></span>

          <b-form-input
            :value="get(props.value, apiKey.key)"
            @input="input($event, apiKey.key, props.index)"
            :placeholder="apiKey.label"
          ></b-form-input>
        </b-form-group>
      </b-col>

      <!-- App Key -->
      <b-col
        v-if="isBasic(props.value) || isBearer(props.value)"
        :cols="isBasic(props.value) ? 4 : 3"
      >
        <b-form-group>
            <label class="title"
              >{{ appKey.label }} *</label
            >
            <span></span>

          <b-form-input
            :value="get(props.value, appKey.key)"
            @input="input($event, appKey.key, props.index)"
            :placeholder="appKey.label"
          ></b-form-input>
        </b-form-group>
      </b-col>

      <!-- App Secret -->
      <b-col
        v-if="isBasic(props.value) || isBearer(props.value)"
        :cols="isBasic(props.value) ? 4 : 3"
      >
        <b-form-group>
            <label class="title">{{ appSecret.label }} *</label>
            <span></span>

          <b-form-input
            :value="get(props.value, appSecret.key)"
            @input="input($event, appSecret.key, props.index)"
            :placeholder="appSecret.label"
          ></b-form-input>
        </b-form-group>
      </b-col>

       <!-- App Group -->
       <b-col cols="2" v-if="isBearer(props.value)">
        <b-form-group>
            <label class="title"
              >{{ appGroup.label }} *</label
            >
            <span></span>

          <b-form-input
            :value="get(props.value, appGroup.key)"
            @input="input($event, appGroup.key, props.index)"
            :placeholder="appGroup.label"
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
import Behavior from './Behavior'

export default {
  components: { Builder },
  mixins: [Behavior],
  data: () => ({
    field: [
      { value: 'basic', text: 'basic' },
      { value: 'api_key', text: 'api key' },
      { value: 'bearer_token', text: 'bearer token' }
    ]
  }),
  computed: {
    type () {
      return this.fields[0]
    },
    apiKey () {
      return this.fields[1]
    },
    appKey () {
      return this.fields[2]
    },
    appSecret () {
      return this.fields[3]
    },
    appGroup () {
      return this.fields[4]
    }
  },
  methods: {
    isBasic (o) {
      return (this.get(o, this.type.key) || '') === 'basic'
    },
    isBearer (o) {
      return (this.get(o, this.type.key) || '') === 'bearer_token'
    },
    isApiKey (o) {
      return (this.get(o, this.type.key) || '') === 'api_key'
    }
  }
}
</script>
