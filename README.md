Requirements
=============
- node.js 5.9.1 or above


Installation
=============

`npm install`


Run application:
=============

`node ./hackernews.js --posts n`

__n__ is number of posts you want to see in output. It is optional.


Run tests
=============
`npm test`


Libraries used
=============
- __bluebird__ is for Promises
- __cheerio__ is for jQuery-like parsing of HTML
- __mocha__ is for unit-tests


Output format
=============
```
[
    {
        "title": "Web Scraping in 2016",
        "uri": "https://franciskim.co/2016/08/24/dont-need-no-stinking-api-web-scraping-2016-beyond/",
        "author": "franciskim",
        "points": 133,
        "comments": 80,
        "rank": 1
    },
    {
        "title": "Instapaper is joining Pinterest",
        "uri": "http://blog.instapaper.com/post/149374303661",
        "author": "ropiku",
        "points": 182,
        "comments": 99,
        "rank": 2
    }
]
```