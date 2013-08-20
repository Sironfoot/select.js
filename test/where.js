'use strict';

var assert = require('assert');
var data = require('./_data');
require('../');

var customers = data.customers;
var scores = data.scores;

describe('#where()', function() {
    it('should find a simple match', function() {
        var result = customers.$_where({ name: 'John Smith' });
        
        assert.ok(Array.isArray(result));
        assert.ok(result.length > 0);
        
        result.forEach(function(customer) {
            assert.equal(customer.name, 'John Smith');
        });
    });
    
    it('should support Greater Than searches', function() {
        var result = scores.$_where({ score: { $gt: 5 }});
        
        assert.ok(Array.isArray(result));
        assert.equal(result.length, 5);
        
        result.forEach(function(score) {
            assert.ok(score.score > 5);
        });
    });
    
    it('should support Greater Than Equal searches', function() {
        var result = scores.$_where({ score: { $gte: 5 }});
        
        assert.ok(Array.isArray(result));
        assert.equal(result.length, 6);
        
        result.forEach(function(score) {
            assert.ok(score.score >= 5);
        });
    });
    
    it('should support Less Than searches', function() {
        var result = scores.$_where({ score: { $lt: 6 }});
        
        assert.ok(Array.isArray(result));
        assert.equal(result.length, 5);
        
        result.forEach(function(score) {
            assert.ok(score.score < 6);
        });
    });
    
    it('should support Less Than Equal searches', function() {
        var result = scores.$_where({ score: { $lte: 6 }});
        
        assert.ok(Array.isArray(result));
        assert.equal(result.length, 6);
        
        result.forEach(function(score) {
            assert.ok(score.score <= 6);
        });
    });
    
    it('should support Range searches', function() {
        var result = scores.$_where({ score: { $gt: 4, $lt: 8 }});
        
        assert.ok(Array.isArray(result));
        assert.equal(result.length, 3);
        
        result.forEach(function(score) {
            assert.ok(score.score > 4);
            assert.ok(score.score < 8);
        });
    });
    
    it('should support multiple query selectors', function() {
        var result = scores.$_where({
            score: {
                $in: [ 3, 4, 5, 7, 8, 9 ],
                $gt: 5,
                $lt: 8
            }
        });
        
        assert.ok(Array.isArray(result));
        assert.equal(result.length, 1);
        assert.equal(result[0].score, 7);
    });
    
    it('should support In searches', function() {
        var result = scores.$_where({ score: { $in: [ 1, 3, 5, 7, 9 ] }});
        
        assert.ok(Array.isArray(result));
        assert.equal(result.length, 5);
        
        result.forEach(function(score) {
            assert.ok(
                score.score === 1 ||
                score.score === 3 ||
                score.score === 5 ||
                score.score === 7 ||
                score.score === 9);
        });
    });
    
    it('should support custom function searches', function() {
        var result = scores.$_where(function(score) {
            return score.name === 'Number 1';
        });
        
        assert.ok(Array.isArray(result));
        assert.equal(result.length, 1)
        assert.equal(result[0].name, 'Number 1');
    });
    
    it('should allow searching simple arrays', function() {
        var items = [ 1, 2, 4, 5, 7, 8, 10 ];
        
        var result = items.$_where(7);
        assert.ok(Array.isArray(result));
        assert.equal(result.length, 1);
        assert.equal(result[0], 7);
        
        var stringItems = [ '1', '2', '4', '5', '7', '8', '10' ];
        
        var stringResult = items.$_where('7');
        assert.ok(Array.isArray(stringResult));
        assert.equal(stringResult.length, 1);
        assert.equal(stringResult[0], '7');
    });
});