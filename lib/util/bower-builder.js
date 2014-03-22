'use strict';
var config = require('./config')();
var _ = require('lodash');
var fs = require('fs');
var path = require('path');
var moment = require('moment');
var bower = require('bower');
var mkdirp = require('mkdirp');
var async = require('async');

var bowerBuilder = {
    /**
     * Read from the source JSON file.
     * @param  {Function} cb [description]
     * @return {[type]}      [description]
     */

    /**
     * Queries Bower info and saves .bower-info.json for it.
     * @param  {string}   name          Name of the bower component.
     * @param  {string}   bowerInfoPath Path of the .bower-info.json of the bower component
     * @param  {Function} cb            callback(error, results)
     * @return {[type]}                 [description]
     */
    info: function(name, bowerInfoPath, cb) {
        console.log('Querying ' + name);
        bower
            .commands
            .info(name)
            .on('end', function(results) {
                mkdirp(path.dirname(bowerInfoPath), function(err) {
                    if (err) console.error(err);
                    else {
                        fs.writeFile(bowerInfoPath, JSON.stringify(results, null, 4), {
                            encoding: 'utf8'
                        }, function() {
                            cb(null, results);
                        });
                    }
                });
            });
    },
    install: function(name, bowerInstallPath, cb) {
        bower
            .commands
            .install([name])
            .on('end', function(results) {
                cb(null, results);
            });
    },
    isBowerVersionEmpty: function(name, version) {
        var filenames = fs.readdirSync(path.join(path.resolve(config.get('cachePath')), name, version));
        return _(filenames).without('.bower-info.json').isEmpty();
    },
    versionsInfo: function(bowerInfoLatest, cb) {
        var componentDir = path.join(path.resolve(config.get('cachePath')), bowerInfoLatest.name);
        async.eachLimit(bowerInfoLatest.versions, 1, function(version, cb) {
            var componentVersionedPath = path.join(componentDir, version, '.bower-info.json');
            bowerBuilder.info(bowerInfoLatest.name + '#' + version, componentVersionedPath, function(err, data) {

                // This is broken, will look into this.
                if (false && bowerBuilder.isBowerVersionEmpty(bowerInfoLatest.name, version)) {
                    bowerBuilder.install(bowerInfoLatest.name + '#' + version, function(err, data) {
                    });
                }
                console.log(bowerBuilder.isBowerVersionEmpty(bowerInfoLatest.name, version));
                cb(null, data);
            });
        }, function(err) {
            if (err) throw err;
            cb(null);
        });
    },
};

module.exports = bowerBuilder;
