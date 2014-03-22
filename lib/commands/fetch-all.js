'use strict';

var config = require('../util/config')();
var source = require('../util/source');
var bowerBuilder = require('../util/bower-builder');
var async = require('async');
var path = require('path');

module.exports = function(argv) {
    async.waterfall([

        function(cb) {
            source.latest('2014-03-22', function(err, data) {
                if (err) throw err;
                cb(null, data);
            });
        },
        function(latest, cb) {
            async.eachLimit(latest, 30, function(bowerInfoLatest, callback) {
                var dir = path.join(path.resolve(config.get('cachePath')), bowerInfoLatest.name);
                async.waterfall([

                    function(cb) {
                        var componentPath = path.join(dir, '.bower-info.json');
                        cb(null, bowerInfoLatest.name, componentPath);
                    },
                    bowerBuilder.info,
                    bowerBuilder.versionsInfo,
                    function(data, cb) {


                    }
                ]);
            }, function(err) {

            });
        }
    ], function(err, results) {});
};
