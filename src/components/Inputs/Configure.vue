<template>
  <Builder :values="values" v-slot="props" @add="add">
    <b-row>
      <!-- key -->
      <b-col :cols="3">
        <b-form-group>
            <label for="input-add-product" class="title"
              >{{ objKey.label }} *</label
            >
            <span></span>

            <b-form-input
            :value="get(props.value, objKey.key)"
            @change="inputObj($event, objKey.key, props.index)"
            placeholder="Key"
          ></b-form-input>
        </b-form-group>
      </b-col>

      <!-- type -->
      <b-col cols="3">
        <b-form-group>
            <label for="input-add-product" class="title"
              >{{ type.label }} *</label
            >
            <span></span>

          <b-form-input
            :value="get(props.value, type.key)"
            @change="inputObj($event, type.key, props.index)"
            placeholder="Tipo (GET, POST...)"
          ></b-form-input>
        </b-form-group>
      </b-col>

      <!-- description -->
      <b-col
        :cols="3"
      >
        <b-form-group>
            <label for="input-add-product" class="title"
              >{{ description.label }} *</label
            >
            <span></span>

          <b-form-input
            :value="get(props.value, description.key)"
            @change="inputObj($event, description.key, props.index)"
            placeholder="Descrição"
          ></b-form-input>
        </b-form-group>
      </b-col>

      <b-col
        :cols="2"
      >
        <b-form-group>
            <label for="input-add-product" class="title"
              >{{ name.label }} *</label
            >
            <span></span>

          <b-form-input
            :value="get(props.value, name.key)"
            @change="inputObj($event, name.key, props.index)"
            placeholder="Nome"
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
  computed: {
    objKey () {
      return this.fields[0]
    },
    type () {
      return this.fields[1]
    },
    description () {
      return this.fields[2]
    },
    name () {
      return this.fields[3]
    }
  }
}
</script>
