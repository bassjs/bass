'use strict';
var assert = require('assert');
var _ = require('lodash');
var source = require('../lib/util/source');
var moment = require('moment');

describe('Source', function() {
    describe('.read()', function() {
        it('should return the set', function(done) {
            source.read(function(err, data) {
                assert(data.length >= 0);
                done();
            });
        });
    });

    describe('.latest()', function() {
        it('should return the latest set after since, and nothing else', function(done) {
            var since = '2014-03-22';
            source.latest(since, function(err, data) {
                if (err) throw err;
                var momentSince = moment(since);
                var before = _.filter(data, function(value) {
                    return moment(value.updated).diff(momentSince) <= 0;
                });
                assert(before.length === 0);
                done();
            });
        });
    });

});
