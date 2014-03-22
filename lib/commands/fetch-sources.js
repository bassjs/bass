'use strict';

var bowerSearch = require('../util/bowerSearch');
var async = require('async');
var path = require('path');
var mkdirp = require('mkdirp');
var fs = require('fs');
var config = require('../util/config')();

module.exports = function(nconf, argv) {
    async.waterfall([
        bowerSearch.index,
        function(body, cb) {
            var cachePath = path.resolve(config.get('cachePath'));
            mkdirp(cachePath, function(err) {
                if (err) console.error(err);

                fs.writeFile(path.join(cachePath, 'everything.json'), JSON.stringify(body), {
                    encoding: 'utf8'
                }, function() {
                    cb(null);
                });
            });
        }
    ], function(err, results) {});
};
