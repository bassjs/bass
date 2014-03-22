'use strict';

var bowerSearch = require('../util/bowerSearch');
var async = require('async');
var bower = require('bower');
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
            async.eachLimit(body, 30, function (value, cb) {
                console.log('Querying ' + value.name);
                bower.commands
                    .info(value.name)
                    .on('end', function (results) {
                        var dir = path.join(CACHE_DIR, value.name);
                        mkdirp(dir, function (err) {
                            if (err) console.error(err);
                            else {
                                fs.writeFile(path.join(dir, '.bower-info.json'), JSON.stringify(results, null, 4), {
                                    encoding: 'utf8'
                                }, function () {
                                    cb(null);
                                });
                            }
                        });
                    });
            });
        }
    ], function (err, results) {});
};
