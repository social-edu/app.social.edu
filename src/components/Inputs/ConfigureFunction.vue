<template>
  <Builder :values="values" v-slot="props" @add="add">
    <b-row>
      <!-- uri -->
      <b-col
        :cols="3"
      >
        <b-form-group>
            <label for="input-add-product" class="title"
              >{{ uri.label }} *</label
            >
            <span></span>

          <b-form-input
            :value="get(props.value, uri.key)"
            @change="inputObjExt($event, uri.key, props.index)"
            placeholder="Chave"
          ></b-form-input>
        </b-form-group>
      </b-col>

       <!-- name -->
       <b-col
        :cols="3"
      >
        <b-form-group>
            <label for="input-add-product" class="title"
              >{{ name.label }} *</label
            >
            <span></span>
          <b-form-input
            :value="get(props.value, name.key)"
            @change="inputObjExt($event, name.key, props.index)"
            placeholder="Descrição"
          ></b-form-input>
        </b-form-group>
      </b-col>

      <!-- module -->
      <b-col
        :cols="3"
      >
        <b-form-group>
            <label for="input-add-product" class="title"
              >{{ objModule.label }} *</label
            >
            <span></span>
          <b-form-input
            :value="get(props.value, objModule.key)"
            @change="inputObjExt($event, objModule.key, props.index)"
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
    uri () {
      return this.fields[0]
    },
    name () {
      return this.fields[1]
    },
    objModule () {
      return this.fields[2]
    }
  }
}
</script>
