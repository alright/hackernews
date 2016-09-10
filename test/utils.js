var expect = require('chai').expect;
var utils = require('../src/utils');

describe('toInteger function', function () {
    it('should convert anything to integer', function () {
        expect(utils.toInteger("1")).to.equal(1);
        expect(utils.toInteger("150aasdas")).to.equal(150);
        expect(utils.toInteger("150 aasdas")).to.equal(150);
    });
});

describe('isValidURI function', function () {
    it('should detect real URI', function () {
        expect(utils.isValidURI('http://google.com')).to.be.true;
    });

    it('should fail on non-URI', function () {
        expect(utils.isValidURI("150aasdas")).to.be.false;
    });
});