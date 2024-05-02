<template>
  <div class="d-flex" style="flex-direction: row; flex-wrap: wrap;">
    <div v-for="(card, index) in cards" :key="index" class="card">
      <div class="card-body" style="width: 40vw; display: flex;">
        <b-col cols="5">
          <v-select taggable push-tags :options="optionsSystem" v-model="cards[index].systems" />
        </b-col>
        <b-col cols="5">
          <v-select taggable push-tags :options="optionsDatalake" v-model="cards[index].datalake" />
        </b-col>
        <div class="btn-actions" @click="addCard">
          <i @click="deleteCard(index)" class="material-icons btn-icon btn-danger">delete</i>
          <span>Deletar</span>
        </div>
      </div>
    </div>
    <div class="btn-actions" @click="addCard">
      <i class="material-icons btn-icon btn-turquesa">add</i>
      <span>Novo</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    optionsSystem: {
      required: true
    },
    optionsDatalake: {
      required: true
    }
  },
  data: () => ({
    cards: []
  }),
  computed: {
    generatePHP () {
      return '$data = []; foreach ($valores as $valor) { $data[] = [' +
        this.cards.reduce((str, item) => str + `'${item.datalake}' => $valor->${item.systems} ?? "",`, '') +
        '];}; return $data;'
    }
  },
  methods: {
    deleteCard (index) {
      this.cards.splice(index, 1)
    },
    setValues (data) {
      this.cards = Object.entries(data).map(a => ({ systems: a[1], datalake: a[0] }))
    },
    addCard () {
      this.cards = [...this.cards, {
        systems: '',
        datalake: ''
      }]
    }
  }
}
</script>

<style lang="stylus" scoped>
.card-body {
  flex-wrap: wrap;
    align-content: center;
    justify-content: center;
    align-items: center;
}
.btn-actions
        min-width 53px
        display: flex
        flex-direction: column
    i
        transition .3s
        background-color white
        color gray
        border solid 1px gray

    .btn-danger
      &:hover
        color #DB2323
        background-color white
        border solid 1px #DB2323
    .btn-turquesa
      &:hover
        color light
        background-color secondary
        border solid 1px secondary
</style>
<style>
.vs__selected-options, .vs__selected {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
