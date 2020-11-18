/*
 * @Descriptions: Picker选择器
 * @Autho: WangZhenHao
 * @Date: 2020-11-16 10:33:12
 * @LastEditTime: 2020-11-16 15:37:17
 
用法：

<c-picker
  title="标题"
  id="c-picker"
  bindpickerChange="pickerChangeHandle"
  columns="{{ columns }}"
  bindpickerComfirm="bindpickerComfirmHandle"
  bindpickerCancel="bindpickerCancelHandle"
></c-picker>

props参数：
title                 string                    中间标题 默认：空
columns               array                     需要展示的数据列表,
                                               一维数组[1,3,4,5]或者二位数组[[1,2,3], [4,5,6]] 默认：[]
valueKey              string                    显示列表的字段 默认：name
defaultValue          array                     默认选中的值 默认: [0,0,0..]


事件回调函数
pickerComfirm        function                返回参数为：{
                                                      index: 最后触发的几列,
                                                      value: 每一项选中的索引,
                                                      detail: 每一项选中的值
                                                    }
pickerCancel         function               返回参数为：{
                                                      index: 最后触发的几列,
                                                      value: 每一项选中的索引,
                                                      detail: 每一项选中的值
                                                    }
pickerChange         function               返回参数为：{
                                                      index: 最后触发的几列,
                                                      value: 每一项选中的索引,
                                                      detail: 每一项选中的值
                                                    }
内置方法
setPickerData               ['ref'].setPickerData([[1,2,3], [1,2,3])                       传入数组可以重新触发列表渲染
setColumnValues             ['ref'].setColumnValues(1, [1,3,4])                           指定某一列重新渲染列表数据
*/

Component({
  properties: {
    title: {
      type: String,
      value: ''
    },
    valueKey: {
      type: String,
      value: 'name'
    },
    columns: {
      type: Array,
      value: [],
      observer(columns = []) {
        // this.setSelectValue(columns)
        this.setPickerData(columns)
      }
    },
    defaultValue: {
      type: Array,
      value: [],
      observer(newValue = []) {
        this.setDefaultValue(newValue);
      }
    }
  },
  data: {
    list: [],
    detailOldValue: [],
    detailNewValue: []
  },
  methods: {
    pickTitleClickHandel(e) {
      const target = e.target.dataset.type;

      switch(target) {
        case 'comfirm': 
          this._comfirmHandel();
        break;
        case 'cancel':
          this._canelHandel()
        break;

      }
    },
    _comfirmHandel() {
      this.triggerEvent('pickerComfirm', this.getValues())
    },
    _canelHandel() {
      this.triggerEvent('pickerCancel', this.getValues())
    },
    bindChangeHandel(e) {
      // console.log(e)
      this.data.detailNewValue = e.detail.value
      this.calChangeIndex()
      
      this.triggerEvent('pickerChange', this.getValues())
    },
    setDefaultValue(value) {
      this.setData({ detailOldValue: value })
    },
    setPickerData(columns) {
      if(!Array.isArray(columns[0])) {
        columns = [columns]
      }
      
      const { detailOldValue, defaultValue } = this.data;
      
      columns.forEach((item, index) => {
        this.setColumnValues(index, item)
        // 如果没有设置默认值，默认就选择0
        if(typeof detailOldValue[index] !== 'number') {
          detailOldValue[index] = defaultValue[index] || 0
        }
      })

      this.setData({ detailOldValue })
    },
    getValues() {
      const { detailOldValue, list } = this.data;
      const detailArr = []

      detailOldValue.forEach((item, index) => {
        detailArr.push(list[index][item])
      })

      let detail = {
        index: this.selectIndex || 0,
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
      const len = detailNewValue.length
      
      // console.log(detailOldValue, detailNewValue)
      for(let i = 0; i < len; i++) {
        if(detailNewValue[i] !== detailOldValue[i]) {
          detailOldValue = detailNewValue;
          this.selectIndex = i;
          break;
        }
      }
      
      // this.setDetailOldValue();
      // 如果触发了联动，需要对下一个联动列表变成选中的纸
      for(let i = this.selectIndex + 1; i < len; i++) {
        detailOldValue[i] = 0;
      }

      // if(JSON.stringify(detailNewValue) !== JSON.stringify(detailOldValue)) {
        
      // }
      // console.log(detailNewValue, detailOldValue)
      this.setData({
        detailOldValue: detailOldValue
      })
      
    },
    setColumnValues(index, options) {
      if(JSON.stringify(this.data.list[index]) === JSON.stringify(options)) return;

      this.setData({
        [`list[${index}]`]: options
      })
    }
  }
})