'use strict';
const TARGET_URL = 'https://news.ycombinator.com/';

var parser = require('./src/parser');
var commandline = require('./src/commandline');

parser.getData(TARGET_URL, commandline.postsLimit()).then((items) => {
    // Output to STDOUT
    // Pretty-printified
    console.log(JSON.stringify(items, null, 4));
});