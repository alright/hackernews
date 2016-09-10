'use strict';

var expect = require('chai').expect;
var utils = require('../src/utils');

describe('toInteger function', () => {
    it('should convert anything to integer', () => {
        expect(utils.toInteger("1")).to.equal(1);
        expect(utils.toInteger("150aasdas")).to.equal(150);
        expect(utils.toInteger("150 aasdas")).to.equal(150);
    });
});

describe('isValidURI function',  () => {
    it('should detect real URI', () => {
        expect(utils.isValidURI('http://google.com')).to.be.true;
    });

    it('should fail on non-URI', () => {
        expect(utils.isValidURI("150aasdas")).to.be.false;
    });
});