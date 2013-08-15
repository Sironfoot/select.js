'use strict';

var assert = require('assert');
var data = require('./_data');
require('../');

var customers = data.customers;
var scores = data.scores;
var people = data.people;

describe('#skip()', function() {
    it('should skip the correct amount', function() {
        var result = scores.$_skip(5);
        
        assert.ok(Array.isArray(result));
        assert.equal(result.length, 5);
        
        for (var i = 0; i < result.length; i++) {
            assert.equal(result[i], scores[i + 5]);
        }
    });
});

describe('#take()', function() {
    it('should take the correct amount', function() {
        var result = scores.$_take(5);
        
        assert.ok(Array.isArray(result));
        assert.equal(result.length, 5);
        
        for (var i = 0; i < result.length; i++) {
            assert.equal(result[i], scores[i]);
        }
    });
});