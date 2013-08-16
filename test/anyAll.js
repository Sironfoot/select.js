'use strict';

var assert = require('assert');
var data = require('./_data');
require('../');

var customers = data.customers;
var scores = data.scores;
var people = data.people;

describe('#any()', function() {
    it('should return true on match', function() {
        var hasCustomer = customers.$_any({ name: 'John Smith' });
        assert.ok(hasCustomer);
        
        var hasScore = scores.$_any({ score: { $gt: 5 }});
        assert.ok(hasScore);
        
        var hasPerson = people.$_any(function(person) {
            return person.name === 'AA';
        });
        assert.ok(hasPerson);
    });
    
    it('should return false when no match', function() {
        var hasCustomer = customers.$_any({ name: 'George Bush' });
        assert.ok(!hasCustomer, 'AA');
        
        var hasScore = scores.$_any({ score: { $gt: 100 }});
        assert.ok(!hasScore, 'BB');
        
        var hasPerson = people.$_any(function(person) {
            return person.name === 'XX';
        });
        assert.ok(!hasPerson, 'CC');
    });
    
    it('should return true/false with no query, depending on whether collection contains any items', function() {
        var hasCustomers = customers.$_any();
        assert.ok(hasCustomers);
        
        var emptyArray = [];
        var hasItems = emptyArray.$_any();
        assert.ok(!hasItems);
    });
});

describe('#all()', function() {
    it('should return true on all match', function() {
        var allScoresMoreThanZero = scores.$_all({ score: { $gt: 0 }});

        assert.ok(allScoresMoreThanZero);
    });
    
    it('should return false on not all matching query', function() {
        var allScoresLessThanNine = scores.$_all({ score: { $lt: 9 }});
        assert.ok(!allScoresLessThanNine);
    });
    
    it('should return true/false with no query, depending on whether collection contains any items', function() {
        var hasCustomers = customers.$_all();
        assert.ok(hasCustomers);
        
        var emptyArray = [];
        var hasItems = emptyArray.$_all();
        assert.ok(!hasItems);
    });
});