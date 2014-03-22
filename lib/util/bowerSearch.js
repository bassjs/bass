'use strict';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
var request = require('request');
var _ = require('lodash');

var bowerSearch = {
    baseUrl: 'bower-component-list.herokuapp.com',
    request: function(urlAppend, cb) {
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
            cb(null, res.body);
        });
    },
    index: function(cb) {
        bowerSearch.request('', cb);
    },
    keyword: function(cb) {
        bowerSearch.request('/keyword/moment', cb);
    }
};

module.exports = bowerSearch;
