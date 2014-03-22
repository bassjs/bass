'use strict';

var nconf = require('nconf');
var config = function() {
    // This file refers to the point of execution.
    return nconf.argv()
        .env()
        .file({
            file: './config.json'
        });
};
module.exports = config;
