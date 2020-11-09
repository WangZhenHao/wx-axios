(function (factory) {
	typeof define === 'function' && define.amd ? define(factory) :
	factory();
}((function () { 'use strict';

	const cancelToken = require('./cancel/cancelToken.js');

	const wxAios = require('./core/wxAxios.js');

	wxAios.cancelToken = cancelToken;
	module.exports = wxAios;

})));
