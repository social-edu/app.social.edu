<template>
  <b-input-group>
    <b-form-input
      :type="type"
      @input="handleInput"
      class="form-control"
      :placeholder="placeholder"
      :value="password"
    ></b-form-input>
    <b-input-group-append style="height: 38px">
      <b-button @click="generate()"
        ><span class="material-icons">cached</span></b-button
      >
    </b-input-group-append>
  </b-input-group>
</template>
<script>
export default {
  props: {
    type: {
      type: String,
      default: 'text'
    },
    size: {
      type: String,
      default: '32'
    },
    characters: {
      type: String,
      default: 'a-z,A-Z,0-9,#'
    },
    placeholder: {
      type: String,
      default: 'Password'
    },
    auto: [String, Boolean],
    value: {
      default: ''
    }
  },
  data () {
    return {
      password: this.value
    }
  },
  mounted () {
    if (this.auto === 'true' || this.auto === 1) {
      this.generate()
    }
  },
  methods: {
    generate () {
      const charactersArray = this.characters.split(',')
      let CharacterSet = ''
      let password = ''

      if (charactersArray.indexOf('a-z') >= 0) {
        CharacterSet += 'abcdefghijklmnopqrstuvwxyz'
      }
      if (charactersArray.indexOf('A-Z') >= 0) {
        CharacterSet += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
      }
      if (charactersArray.indexOf('0-9') >= 0) {
        CharacterSet += '0123456789'
      }
      if (charactersArray.indexOf('#') >= 0) {
        CharacterSet += '![]{}()%&*$#^<>~@|'
      }

      for (let i = 0; i < this.size; i++) {
        password += CharacterSet.charAt(
          Math.floor(Math.random() * CharacterSet.length)
        )
      }
      this.password = password
      this.$emit('input', password)
    },
    handleInput (e) {
      this.$emit('input', e)
    }
  }
}
</script>

<style></style>
