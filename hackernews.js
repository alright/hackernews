'use strict';

var parser = require('./src/parser');
const TARGET_URL = 'https://news.ycombinator.com/';

function postsLimit() {
    var found = false;
    var resultLimit = 10;

    process.argv.forEach(function (val) {
        if ( !! found) {
            // Next value after --posts
            resultLimit = val;
            return;
        }

        if (val.indexOf('--posts') !== -1) {
            // Found key, get next value
            found = true;
        }
    });

    return resultLimit;
}

parser.getData(TARGET_URL, postsLimit()).then(function(items) {
    // Output to STDOUT
    console.log(items);
});