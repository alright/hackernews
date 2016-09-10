'use strict';

var parser = require('./src/parser');
var commandline = require('./src/commandline');
const TARGET_URL = 'https://news.ycombinator.com/';

parser.getData(TARGET_URL, commandline.postsLimit()).then(function(items) {
    // Output to STDOUT
    console.log(items);
});