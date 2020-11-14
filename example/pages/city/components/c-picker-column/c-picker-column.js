
Component({
  properties: {
    valueKey: {
      type: String,
      value: 'name'
    },
    initialOptions: {
      type: Array,
      value: [],
    }
  },
  data: {

  },
  ready() {
    console.log(this.data)
  },
  methods: {
    setColumns() {

    },
    setColumnValues(index, options) {
      
    }
  }
})