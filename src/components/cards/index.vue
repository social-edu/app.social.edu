<template>
  <div class="d-flex" style="flex-direction: row;
    flex-wrap: wrap;">
    <div v-for="(card, index) in cards" :key="index" class="card">
      <div class="card-body" style="width: 35vw;
    display: flex;">
        <b-col cols="4">
          <b-form-group>
          <label for="select1">{{ selectOptions1.table }}</label>
          <b-form-select id="select1" v-model="card[cardKey?.table1]">
            <template #first>
                    <b-form-select-option :value="undefined" disabled
                        >Selecionar sistema</b-form-select-option
                    >
                    </template>
            <b-form-select-option v-for="option in selectOptions1.table" :value="option.value" :key="option.value">
              {{ option.label }}
            </b-form-select-option>
          </b-form-select>
        </b-form-group>
        </b-col>
        <b-col cols="4">
          <b-form-group>
          <label for="select2">{{ selectOptions2.table }}</label>
          <b-form-select id="select2" v-model="card[cardKey?.table2]">
            <template #first>
                    <b-form-select-option :value="undefined" disabled
                        >Selecionar sistema</b-form-select-option
                    >
                    </template>
            <b-form-select-option v-for="option in selectOptions2.table" :value="option.value" :key="option.value">
              {{ option.label }}
            </b-form-select-option>
          </b-form-select>
        </b-form-group>
        </b-col>
        <div class="btn-actions" @click="addCard">
      <i
            @click="deleteCard(index)"
            class="material-icons btn-icon btn-danger"
            >delete</i
          >
      Deletar</div>
      </div>
    </div>
    <div class="btn-actions" @click="addCard">
      <i
            class="material-icons btn-icon btn-turquesa"
            >add</i
          >
      Novo</div>
  </div>
</template>
<script>
export default {
  props: {
    selectOptions1: {
      type: Array,
      required: true
    },
    selectOptions2: {
      type: Array,
      required: true
    },
    cardKey: {
      required: true
    }
  },
  data () {
    return {
      cards: [] // Array para armazenar os cards
    }
  },
  methods: {
    deleteCard (index) {
      this.cards.splice(index, 1) // Remove o card do array pelo índice
    },
    addCard () {
      this.cards.push({ [this.cardKey?.table1]: '', [this.cardKey?.table2]: '' }) // Adiciona um novo card ao array
    }
  }
}
</script>

<style lang="stylus" scoped>

@import '../../style/colors.styl';
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
        background-color white
        border solid 1px primary-variant
</style>
