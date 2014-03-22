'use strict';

var bowerSearch = require('../util/bowerSearch');
var async = require('async');
var path = require('path');
var mkdirp = require('mkdirp');
var fs = require('fs');

var CACHE_DIR = path.join(path.resolve('.'), '.cache');

module.exports = function (config, argv) {
    async.waterfall([

        function (cb) {
            cb(null, config);
        },
        bowerSearch.index,
        function (config, body, cb) {

            fs.writeFile(path.join(CACHE_DIR, 'everything.json'), JSON.stringify(body), {
                encoding: 'utf8'
            }, function () {
                cb(null);
            });
        }
    ], function (err, results) {});
};
