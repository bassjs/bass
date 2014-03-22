'use strict';

var config = require('../util/config')();
var source = require('../util/source');
var async = require('async');
var bower = require('bower');
var path = require('path');
var mkdirp = require('mkdirp');
var fs = require('fs');


module.exports = function(argv) {
    async.waterfall([

        function(cb) {
            source.latest('2014-03-22', function(err, data) {
                if (err) throw err;
                cb(null, data);
            });
        },
        function(latest, cb) {
            async.eachLimit(latest, 30, function(value, cb) {
                console.log('Querying ' + value.name);
                bower.commands
                    .info(value.name)
                    .on('end', function(results) {
                        var dir = path.join(path.resolve(config.get('cachePath')), value.name);
                        mkdirp(dir, function(err) {
                            if (err) console.error(err);
                            else {
                                fs.writeFile(path.join(dir, '.bower-info.json'), JSON.stringify(results, null, 4), {
                                    encoding: 'utf8'
                                }, function() {
                                    cb(null);
                                });
                            }
                        });
                    });
            });
        }
    ], function(err, results) {});
};
