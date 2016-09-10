'use strict';

var expect = require('chai').expect;
var parser = require('../src/parser');

describe('parsing part', () => {
    it('should return proper object for one item', () => {
        var parsedItem = parser.parseOneItem(`<tr class="athing" id="12459755">
      <td align="right" valign="top" class="title"><span class="rank">2.</span></td>      <td valign="top" class="votelinks"><center><a id="up_12459755" href="vote?id=12459755&amp;how=up&amp;goto=news"><div class="votearrow" title="upvote"></div></a></center></td><td class="title"><a href="http://ohshitgit.com/" class="storylink">Git – Some bad situations and how I got myself out of them in plain english</a><span class="sitebit comhead"> (<a href="from?site=ohshitgit.com"><span class="sitestr">ohshitgit.com</span></a>)</span></td></tr><tr><td colspan="2"></td><td class="subtext">
        <span class="score" id="score_12459755">468 points</span> by <a href="user?id=emilong" class="hnuser">emilong</a> <span class="age"><a href="item?id=12459755">9 hours ago</a></span> <span id="unv_12459755"></span> | <a href="hide?id=12459755&amp;goto=news">hide</a> | <a href="item?id=12459755">209&nbsp;comments</a>              </td></tr>`);

        expect(parsedItem.title).to.equal("Git – Some bad situations and how I got myself out of them in plain english");
        expect(parsedItem.uri).to.equal("http://ohshitgit.com/");
        expect(parsedItem.author).to.equal("emilong");
        expect(parsedItem.points).to.equal(468);
        expect(parsedItem.comments).to.equal(209);
        expect(parsedItem.rank).to.equal(2);
    });

    it('should fail on wrong input', () => {
        var parsedItem = parser.parseOneItem(`<tr class="athing" id="12459755"><td align="right")</span></td></tr>`);

        expect(parsedItem).to.be.empty;
    });

    it('should limit long title', () => {
        var parsedItem = parser.parseOneItem(`<tr class="athing" id="12459755">
      <td align="right" valign="top" class="title"><span class="rank">2.</span></td>      <td valign="top" class="votelinks"><center><a id="up_12459755" href="vote?id=12459755&amp;how=up&amp;goto=news"><div class="votearrow" title="upvote"></div></a></center></td><td class="title"><a href="http://ohshitgit.com/" class="storylink">Git – Some bad situations and how I got myself out of them in plain english Git – Some bad situations and how I got myself out of them in plain english Git – Some bad situations and how I got myself out of them in plain english Git – Some bad situations and how I got myself out of them in plain english</a><span class="sitebit comhead"> (<a href="from?site=ohshitgit.com"><span class="sitestr">ohshitgit.com</span></a>)</span></td></tr>`);

        expect(parsedItem.title).to.have.lengthOf(256);
    });

    it('should limit long title', () => {
        var parsedItem = parser.parseOneItem(`<tr class="athing" id="12459755">
      <td align="right" valign="top" class="title"><span class="rank">2.</span></td>      <td valign="top" class="votelinks"><center><a id="up_12459755" href="vote?id=12459755&amp;how=up&amp;goto=news"><div class="votearrow" title="upvote"></div></a></center></td><td class="title"><a href="http://ohshitgit.com/" class="storylink">Git – Some bad situations and how I got myself out of them in plain english Git – Some bad situations and how I got myself out of them in plain english Git – Some bad situations and how I got myself out of them in plain english Git – Some bad situations and how I got myself out of them in plain english</a><span class="sitebit comhead"> (<a href="from?site=ohshitgit.com"><span class="sitestr">ohshitgit.com</span></a>)</span></td></tr>`);

        expect(parsedItem.title).to.have.lengthOf(256);
    });

    it('should limit long author field', () => {
        var parsedItem = parser.parseOneItem(`<tr class="athing" id="12459755">
      <td align="right" valign="top" class="title"><span class="rank">2.</span></td>      <td valign="top" class="votelinks"><center><a id="up_12459755" href="vote?id=12459755&amp;how=up&amp;goto=news"><div class="votearrow" title="upvote"></div></a></center></td><td class="title"><a href="http://ohshitgit.com/" class="storylink">Git – Some bad situations and how I got myself out of them in plain english</a><span class="sitebit comhead"> (<a href="from?site=ohshitgit.com"><span class="sitestr">ohshitgit.com</span></a>)</span></td></tr><tr><td colspan="2"></td><td class="subtext">
        <span class="score" id="score_12459755">468 points</span> by <a href="user?id=emilong" class="hnuser">emilong emilong emilong emilong emilong emilong emilong emilong emilong emilong emilong emilong emilong emilong emilong emilong emilong emilong emilong emilong emilong emilong emilong emilong emilong emilong emilong emilong emilong emilong emilong emilong emilong emilong emilong emilong emilong emilong emilong emilong emilong emilong emilong emilong emilong emilong emilong emilong emilong emilong emilong emilong emilong emilong emilong emilong emilong emilong emilong emilong emilong emilong emilong emilong emilong emilong emilong emilong emilong emilong emilong emilong emilong emilong </a> <span class="age"><a href="item?id=12459755">9 hours ago</a></span> <span id="unv_12459755"></span> | <a href="hide?id=12459755&amp;goto=news">hide</a> | <a href="item?id=12459755">209&nbsp;comments</a>              </td></tr>`);

        expect(parsedItem.author).to.have.lengthOf(256);
    });

    it('should fail on wrong URI', () => {
        var parsedItem = parser.parseOneItem(`<tr class="athing" id="12459755">
      <td align="right" valign="top" class="title"><span class="rank">2.</span></td>      <td valign="top" class="votelinks"><center><a id="up_12459755" href="vote?id=12459755&amp;how=up&amp;goto=news"><div class="votearrow" title="upvote"></div></a></center></td><td class="title"><a href="httprps://ohshitgit.com/" class="storylink">Git – Some bad situations and how I got myself out of them in plain english Git – Some bad situations and how I got myself out of them in plain english Git – Some bad situations and how I got myself out of them in plain english Git – Some bad situations and how I got myself out of them in plain english</a><span class="sitebit comhead"> (<a href="from?site=ohshitgit.com"><span class="sitestr">ohshitgit.com</span></a>)</span></td></tr>`);

        expect(parsedItem).to.be.empty;
    });
});