'use strict';

var assert = require('assert');
var data = require('./_data');
require('../');

var customers = data.customers;
var scores = data.scores;
var people = data.people;

describe('#first()', function() {
    it('should return the first item in an array', function() {
        var firstScore = scores.$_first();
        
        assert.ok(firstScore);
        assert.equal(firstScore, scores[0]);
    });
    
    it('should return null if the array is empty', function() {
        var emptyArray = [];
        var firstItem = emptyArray.$_first();
        
        assert.ok(firstItem === null);
    });
    
    it('should allow searches', function() {
        var score = scores.$_first({ score: 1 });
        
        assert.ok(score);
        assert.equal(score.score, 1);
    });
});

describe('#last()', function() {
    it('should return the last item in an array', function() {
        var lastScore = scores.$_last();
        
        assert.ok(lastScore);
        assert.equal(lastScore, scores[scores.length - 1]);
    });
    
    it('should return null if the array is empty', function() {
        var emptyArray = [];
        var lastItem = emptyArray.$_last();
        
        assert.ok(lastItem === null);
    });
    
    it('should allow searches', function() {
        var score = scores.$_last({ score: 1 });
        
        assert.ok(score);
        assert.equal(score.score, 1);
    });
});