const cancelToken = require('./cancel/cancelToken.js')
const wxAios = require('./core/wxAxios.js')

wxAios.cancelToken = cancelToken


module.exports = wxAios;