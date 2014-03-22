'use strict';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
var request = require('request');
var _ = require('lodash');

var bowerSearch = {
	baseUrl: 'bower-component-list.herokuapp.com',
	request: function(config, urlAppend, cb) {
		if (!urlAppend) {
			urlAppend = '';
		}
		var defaultRequestOptions = {
			json: true
		};
		var options = _.extend({}, defaultRequestOptions, {
			url: 'http://' + bowerSearch.baseUrl + urlAppend
		});
		request.get(options, function(req, res) {
			cb(null, config, res.body);
		});
	},
	index: function(config, cb) {
		bowerSearch.request(config, '', cb);
	},
	keyword: function(config, cb) {
		bowerSearch.request(config, '/keyword/moment', cb);
	}
}

module.exports = bowerSearch;