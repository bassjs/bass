// Bad naming.
// Needs to be changed.

var _ = require('lodash');
var fs = require('fs');
var path = require('path');
var config = require('./config')();
var moment = require('moment');

var source = {
    /**
     * Read from the source JSON file.
     * @param  {Function} cb [description]
     * @return {[type]}      [description]
     */
    read: function(cb) {
        var cacheFullPath = path.resolve(config.get('cachePath'));
        fs.readFile(path.join(cacheFullPath, 'everything.json'), {
            encoding: 'utf8'
        }, function(err, data) {
            cb(null, JSON.parse(data));
        });
    },
    /**
     * [latest description]
     * @param  {string}   since Moment-style string
     * @param  {Function} cb    [description]
     * @return {[type]}         [description]
     */
    latest: function(since, cb) {
        var momentSince = moment(since);
        source.read(function(err, data) {
            var latest = _.filter(data, function(value) {
                return moment(value.updated).diff(momentSince) > 0;
            });
            cb(null, latest);
        });
    }
};

module.exports = source;
