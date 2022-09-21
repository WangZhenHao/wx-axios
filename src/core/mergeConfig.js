function mergeConfig(config1, config2) {
  // return Object.assign(config1, config2)
  const conf = deepCopy(config1);
  config2 = config2 || {}

  return Object.assign(conf, config2)
}
function deepCopy(object) {
      var newObj = object.constructor == Array ? [] : {};
      if (typeof object != 'object') {
        return;
      } else if (JSON) {
        newObj = JSON.parse(JSON.stringify(object));
      } else {
        for (var i in object) {
          newObj[i] = typeof object[i] == 'object' ? this.deepCopy(object[i]) : object[i];
        }
      }
      return newObj;
}

module.exports = mergeConfig