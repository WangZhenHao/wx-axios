
Component({
  properties: {
    valueKey: {
      type: String,
      value: 'name'
    },
    columns: {
      type: Array,
      value: [],
      observer(columns = []) {
        // columns.forEach((item, index) => {
        //   this.setColumnValues(index, item)
        // })
        this.setPickerData(columns)
      }
    }
  },
  data: {
    list: [],
    detailOldValue: [0, 0, 0],
    detailNewValue: []
  },
  methods: {
    bindChange(e) {
      // console.log(e)
      this.data.detailNewValue = e.detail.value
      this.calChangeIndex()
      
      this.triggerEvent('pickerChange', this.getValues())
    },
    setPickerData(columns) {
      columns.forEach((item, index) => {
        this.setColumnValues(index, item)
      })
    },
    getValues() {
      const { detailOldValue, list } = this.data;
      const detailArr = []

      detailOldValue.forEach((item, index) => {
        detailArr.push(list[index][item])
      })

      let detail = {
        index: this.selectIndex,
        value: detailOldValue,
        detail: detailArr
      }

      return detail;
      // this.triggerEvent('myevent', myEventDetail, myEventOption)
    },
    calChangeIndex() {
      let {
        detailOldValue,
        detailNewValue
      } = this.data;

      let detail = {}
      for(let i = 0; i < detailOldValue.length; i++) {
        if(detailNewValue[i] !== detailOldValue[i]) {
          this.data.detailOldValue = detailNewValue;
          this.selectIndex = i;
          break;
        }
      }
    },
    setColumnValues(index, options) {
      if(JSON.stringify(this.data.list[index]) === JSON.stringify(options)) return;

      this.setData({
        [`list[${index}]`]: options
      })
    }
  }
})