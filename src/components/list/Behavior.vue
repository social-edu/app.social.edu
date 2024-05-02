<script>
export default {
  model: {
    prop: 'values',
    event: 'change'
  },
  props: {
    values: {
      type: Array,
      default: () => [{}]
    },
    fields: {
      // type: [Array, String],
      type: Array,
      required: true
    }
  },
  methods: {
    add () {
      this.$emit('change', [...this.values, {}])
    },
    del (index) {
      this.$emit(
        'change',
        this.values.filter((e, i) => index !== i)
      )
    },
    input (e, key, index) {
      const clone = [...this.values]
      clone[index][key] = e

      this.$emit('change', clone)
    },
    get (obj, str) {
      return str.split('.').reduce((q, v) => q?.[v], obj)
    }
  }
}
</script>
