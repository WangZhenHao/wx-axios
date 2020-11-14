import areaList from './areaList.js'

function getCtx (selector, p) {
  let ctx;
  if(p) {
      ctx = p;
  } else {
      let pages = getCurrentPages();
      ctx = pages[pages.length - 1];
  }
  debugger
  const componentCtx = ctx.selectComponent(selector);

  if (!componentCtx) {
      console.error('无法找到对应的组件，请按文档说明使用组件');
      return null;
  }
  return componentCtx;
}

function refs(id, pages) {
  let component = getCtx(id, pages);

  return component;
}

Component({
  properties: {

  },
  data: {
    areaList: areaList,
    show: true,
    valueArr: [0, 0, 0],
    columns: [[1,2,3,4]]
  },
  ready() {
    this.setValues();
  },
  methods: {
    pickerChangeHandle(e) {
      console.log(e)
      const {
        index,
        detail
      } = e.detail

      this.code = detail[index].code;
      this.setValues();
    },
    // bindChange(e) {
    //   console.log(e)
    //   let detail = this.calChangeIndex(e.detail.value, this.data.valueArr)

    //   this.code = detail.value.code
    //   this.setValues();
    // },
    // calChangeIndex(newVal, oldVal) {
    //   let detail = {}
    //   for(let i = 0; i < oldVal.length; i++) {
    //     if(newVal[i] !== oldVal[i]) {
    //       this.data.valueArr = newVal;
    //       detail = {
    //         index: i,
    //         value: this.data.province[newVal[i]]
    //       }
    //       break;
    //     }
    //   }

    //   return detail;
    // },
    setValues() {
      var county = this.getConfig('county');

      var code = this.code;
      if (!code) {
        if (Object.keys(county)[0]) {
          code = Object.keys(county)[0];
        } else {
          code = '';
        }
      } 
      var province = this.getList('province');
      var city = this.getList('city', code.slice(0, 2));
      
      if (city.length && code.slice(2, 4) === '00') {
        code = city[0].code;
      }
      county = this.getList('county', code.slice(0, 4))
      
      this.selectComponent('#c-picker').setPickerData([province, city, county])
      // this.setData({
      //   columns: [province, city, county]
      // })
    },
    getConfig(type) {
      var areaList = this.data.areaList;
      return (areaList && areaList[type + '_list']) || {};
    },
    getList: function (type, code) {
      var typeToColumnsPlaceholder = this.data.typeToColumnsPlaceholder;
      var result = [];
      if (type !== 'province' && !code) {
        return result;
      }
      var list = this.getConfig(type);
      result = Object.keys(list).map(function (code) {
        return {
          code: code,
          name: list[code],
        };
      });
      if (code) {
        // oversea code
        if (code[0] === '9' && type === 'city') {
          code = '9';
        }
        result = result.filter(function (item) {
          return item.code.indexOf(code) === 0;
        });
      }
      // if (typeToColumnsPlaceholder[type] && result.length) {
      //   // set columns placeholder
      //   var codeFill =
      //     type === 'province'
      //       ? ''
      //       : type === 'city'
      //       ? COLUMNSPLACEHOLDERCODE.slice(2, 4)
      //       : COLUMNSPLACEHOLDERCODE.slice(4, 6);
      //   result.unshift({
      //     code: '' + code + codeFill,
      //     name: typeToColumnsPlaceholder[type],
      //   });
      // }
      return result;
    },
  }
})