'use strict';

var assert = require('assert');
var data = require('./_data');
require('../');

var customers = data.customers;
var scores = data.scores;
var people = data.people;

describe('#sum()', function() {
    it('should correct sum all values', function() {
        var totalScores = scores.$_sum('score');
        assert.equal(totalScores, 55);
    });
    
    it('should allow function', function() {
        var totalScores = scores.$_sum(function(score) {
            return score.score;
        });
        assert.equal(totalScores, 55);
    });
    
    it('should return null for empty array', function() {
        var emptyArray = [];
        var total = emptyArray.$_sum('test');
        assert.equal(total, null);
    });
    
    it('should sum simple number arrays', function() {
        var simpleArray = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];
        var total = simpleArray.$_sum();
        assert.equal(total, 55);
    });
});

describe('#min()', function() {
    it('should return the smallest value', function() {
        var minScore = scores.$_min('score');
        assert.equal(minScore, 1);
    });
    
    it('should allow a function', function() {
        var minScore = scores.$_min(function(score) {
            return score.score;
        });
        assert.equal(minScore, 1);
    });
    
    it('should return null for empty Array', function() {
        var emptyArray = [];
        var min = emptyArray.$_min('test');
        assert.equal(min, null);
    });
    
    it('should find smallest value in simple numeric array', function() {
        var simpleArray = [ 3, 6, 2, 8, 4, 5 ];
        var min = simpleArray.$_min();
        assert.equal(min, 2);
    });
});

describe('#max()', function() {
    it('should return the highest value', function() {
        var maxScore = scores.$_max('score');
        assert.equal(maxScore, 10);
    });
    
    it('should allow a function', function() {
        var maxScore = scores.$_max(function(score) {
            return score.score;
        });
        assert.equal(maxScore, 10);
    });
    
    it('should return null for empty Array', function() {
        var emptyArray = [];
        var max = emptyArray.$_max('test');
        assert.equal(max, null);
    });
    
    it('should find largest value in simple numeric array', function() {
        var simpleArray = [ 3, 6, 2, 8, 4, 5 ];
        var min = simpleArray.$_max();
        assert.equal(min, 8);
    });
});

describe('#average()', function() {
    it('should return the correct average', function() {
        var average = scores.$_average('score');
        assert.equal(average, 5.5);
    });
    
    it('should allow a function', function() {
        var average = scores.$_average(function(score) {
            return score.score;
        });
        assert.equal(average, 5.5);
    });
    
    it('should return null for empty Array', function() {
        var emptyArray = [];
        var average = emptyArray.$_average('test');
        assert.equal(average, null);
    });
    
    it('should find the average in a simple numeric array', function() {
        var simpleArray = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];
        var average = simpleArray.$_average();
        assert.equal(average, 5.5);
    });
});


