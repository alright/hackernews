'use strict';

var expect = require('chai').expect;
var commandline = require('../src/commandline');

describe('postsLimit function', function () {
    it('should properly parse arguments', function () {
        let argv = ['--posts', 1];
        expect(commandline.postsLimit(argv)).to.equal(1);
    });

    it('should return default value', function () {
        let argv = [];
        expect(commandline.postsLimit(argv)).to.be.a('number');
        expect(commandline.postsLimit(argv)).to.be.above(0);
    });

    it('should parse mixed parameters', function () {
        let argv = ['--help', '--posts', 1];
        expect(commandline.postsLimit(argv)).to.equal(1);

        argv = ['--posts', 1, '--'];
        expect(commandline.postsLimit(argv)).to.equal(1);
    });
});