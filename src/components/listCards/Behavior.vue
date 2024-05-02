<script>

export default {
  data: () => ({
    currentPage: 1,
    perPage: 8,
    sortBy: '',
    isFiltering: false,
    filterData: {},
    totalRows: 1
  }),
  model: {
    prop: 'selected',
    event: 'onChange'
  },
  props: {
    items: {
      type: Array,
      required: true
    },
    fields: {
      type: Array,
      required: true
    },
    actions: {
      type: Array,
      default: () => []
    },
    selectable: {
      type: Boolean,
      default: false
    },
    selected: {
      type: Array,
      default: () => []
    },
    isBusy: {
      type: Boolean,
      default: false
    },
    // need when selectable is true
    primaryFieldKey: {
      type: String,
      default: 'id'
    },
    label: {
      type: String,
      required: false
    }
  },
  created () {
    this.totalRows = this.items.length
    // if (!this.selected.length) this.emitSelection([]) // avoid conflict in v-model
  },
  computed: {
    fieldsWithEvents () {
      const f = this.fields.slice()

      // Add events column if has any action for view
      if (this.actions.length > 0) f.push({ key: 'events', label: 'Ações' })

      // Checkbox
      if (this.selectable) f.unshift({ key: 'selected', label: ' ' })

      return f
    },
    sortOptions () {
      return this.fields.map(f => ({ value: f.key || f, text: f.label || f }))
    },
    empty () {
      return !(this.items.length || this.isBusy)
    },
    isAllRowsSelected () {
      return this.items.length === this.selected.length
    }
  },
  methods: {
    sort (key) {
      this.sortBy = key
    },
    filterSwitch (value) {
      this.isFiltering = value
      if (!value) this.filterData = {} // clear inputs when filter close
    },
    filter (row, filters) {
      if (
        !this.isFiltering ||
        // Search for any "true value" on filters
        !Object.keys(filters).reduce((result, value) => result || !!filters[value], false)
      ) { return true }

      // One match verification by includes
      for (const key in filters) {
        if (row[key]?.toString().includes(filters[key]) && !!filters[key]) {
          return true
        }
      }

      return false
    },
    onFiltered (filteredItems) {
      // console.log('filtered')
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    itemSelectedIndex (item) {
      return this.selected.findIndex(o => o[this.primaryFieldKey] === item[this.primaryFieldKey])
    },
    isItemSelected (item) {
      return !!(this.itemSelectedIndex(item) + 1)
    },
    onRowClicked (item) {
      const i = this.itemSelectedIndex(item)

      this.emitSelection(i === -1
        ? [...this.selected, item] // Insert
        : this.selected.filter((v, i2) => i - i2) // Remove
      )
    },
    switchSelection () {
      this.emitSelection(this.isAllRowsSelected ? [] : this.items.slice())
    },
    emitSelection (v) {
      this.$emit('onChange', v)
    }
  }
}
</script>
