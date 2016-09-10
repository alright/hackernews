'use strict';

const DEFAULT_POSTS_LIMIT = 10;

function postsLimit(argv) {
    argv = argv || process.argv;
    var resultLimit = DEFAULT_POSTS_LIMIT;
    var found = false;
    var finished = false;

    // --posts n converted into ['--posts', 'n']
    // So we need to find where "--posts" parameter is, and then get next parameter
    argv.forEach((val) => {
        if ( !! finished) {
            return;
        }

        if ( !! found) {
            // Next parameter after "--posts"
            resultLimit = val;
            finished = true;
            return;
        }

        if (val.indexOf('--posts') !== -1) {
            // Found key, get next parameter
            found = true;
        }
    });

    return resultLimit;
}

module.exports = {
    postsLimit
};