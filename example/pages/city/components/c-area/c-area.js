import areaList from './areaList.js'

Component({
  properties: {

  },
  data: {
    areaList: areaList,
    show: true,
    valueArr: [0, 0, 0]
  },
  ready() {
    this.setValues();
  },
  methods: {
    bindChange(e) {
      console.log(e)
      let detail = this.calChangeIndex(e.detail.value, this.data.valueArr)

      this.code = detail.value.code
      this.setValues();
    },
    calChangeIndex(newVal, oldVal) {
      let detail = {}
      for(let i = 0; i < oldVal.length; i++) {
        if(newVal[i] !== oldVal[i]) {
          this.data.valueArr = newVal;
          detail = {
            index: i,
            value: this.data.province[newVal[i]]
          }
          break;
        }
      }

      return detail;
    },
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
      code = city[0].code
      county = this.getList('county', code.slice(0, 4))
      
      this.setData({
        province: province,
        city: city,
        county: county
      })
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