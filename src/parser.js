'use strict';

var https = require('https');
var cheerio = require('cheerio');
var Promise = require('bluebird');
var utils = require('./utils');

/**
 * Download specific URL contents
 * @param url
 */
function downloadPage(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            var data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on("end", () => {
                resolve(data);
            });
        }).on("error", () => {
            reject();
        });
    });
}

/**
 * Parse one post item
 * @param elem
 * @returns {{title: (XMLList|*|jQuery), uri: jQuery, author: (XMLList|*|jQuery), points: number, comments: number, rank: number}}
 */
function parseOneItem (elem) {
    var $ = cheerio.load(elem);

    if ($('.athing').length <= 0) {
        // Not a post element
        return;
    }

    var title = $('.title > .storylink').text();
    var author = $('.hnuser').text();
    var uri = $('.title > .storylink').attr('href');

    if (title.length > 256) {
        title = title.slice(0, 256);
    }

    if (author.length > 256) {
        author = author.slice(0, 256);
    }

    if ( ! utils.isValidURI(uri)) {
        // Wrong URI
        return;
    }

    return {
        title,
        uri,
        author,
        points: utils.toInteger($('.score').text()),
        comments: utils.toInteger($('.subtext A:contains("comments")').text()),
        rank: utils.toInteger($('.title > .rank').text())
    };
}

/**
 * Split posts into chunks
 * @param $elems
 * @param limit
 */
function splitPost($elems, limit) {
    var plainPosts = $elems.html();
    limit = limit || 1;

    // Spacer is posts separator
    plainPosts = plainPosts.split('<tr class="spacer" style="height:5px"></tr>');

    // Limit posts
    plainPosts = plainPosts.slice(0, limit);

    return plainPosts;
}

/**
 * Parse all posts items on page
 * @param contents
 * @param limit
 */
function parseItems (contents, limit) {
    return new Promise((resolve, reject) => {
        var $ = cheerio.load(contents);
        var $posts = $('BODY .itemlist');

        if ($posts.length <= 0) {
            reject('empty $posts');
            return;
        }

        var htmlPosts = splitPost($posts, limit);

        // Convert to detailed objects
        var results = htmlPosts.map((elem) => {
            return parseOneItem(elem);
        });

        // Filter empty values
        results = results.filter((elem) => {
            return elem;
        });

        resolve(results);
    });
}

/**
 * Download page and parse content
 * @param url
 * @param limit
 */
function getData (url, limit) {
    return new Promise((resolve, reject) => {
        return downloadPage(url).then((contents) => {
            if ( ! contents) {
                reject('empty contents');
                return;
            }

            return parseItems(contents, limit);
        })
        .then((items) => {
            if ( ! items) {
                reject('empty items');
                return;
            }

            resolve(items);
        });
    })
}

module.exports = {
    parseOneItem,

    downloadPage,
    parseItems,

    getData
};