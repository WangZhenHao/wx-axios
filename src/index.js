const cancelToken = require('./cancel/cancelToken.js')
const wxAios = require('./core/wxAxios.js');
const defaults = require('./defaults.js');
const { extend } = require('./helpers/utils')
const mergeConfig = require('./core/mergeConfig.js')

// wxAios.cancelToken = cancelToken

function createInstance(config) {
  const context = new wxAios(config);
  const instance = wxAios.prototype.request.bind(context);

  extend(instance, context)

  return context;
}

const axios = createInstance(defaults);

axios.create = function create(config) {
  return createInstance(mergeConfig(defaults, config))
}

axios.cancelToken = cancelToken
// console.log(createInstance())


module.exports = axios;