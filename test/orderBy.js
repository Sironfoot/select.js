'use strict';

var assert = require('assert');
var data = require('./_data');
require('../');

var customers = data.customers;
var scores = data.scores;
var people = data.people;

function checkScoresAreInOrder(result, ascending) {

    if (ascending) {
        assert.ok(
            result[0].score === 1 &&
            result[1].score === 2 &&
            result[2].score === 3 &&
            result[3].score === 4 &&
            result[4].score === 5 &&
            result[5].score === 6 &&
            result[6].score === 7 &&
            result[7].score === 8 &&
            result[8].score === 9 &&
            result[9].score === 10
        );
    }
    else {
        assert.ok(
            result[0].score === 10 &&
            result[1].score === 9 &&
            result[2].score === 8 &&
            result[3].score === 7 &&
            result[4].score === 6 &&
            result[5].score === 5 &&
            result[6].score === 4 &&
            result[7].score === 3 &&
            result[8].score === 2 &&
            result[9].score === 1
        );
    }
}

describe('#orderby()', function() {
    it('should return by ascending', function() {
        var result1 = scores.$_orderBy({ score: 1 });
        var result2 = scores.$_orderBy({ score: 'asc' });
        var result3 = scores.$_orderBy({ score: 'ascending' });
        
        assert.ok(Array.isArray(result1));
        assert.equal(result1.length, 10);
        checkScoresAreInOrder(result1, true);
        
        assert.ok(Array.isArray(result1));
        assert.equal(result1.length, 10);
        checkScoresAreInOrder(result1, true);
        
        assert.ok(Array.isArray(result1));
        assert.equal(result1.length, 10);
        checkScoresAreInOrder(result1, true);
    });
    
    it('should return by descending', function() {
        var result1 = scores.$_orderBy({ score: -1 });
        var result2 = scores.$_orderBy({ score: 'desc' });
        var result3 = scores.$_orderBy({ score: 'descending' });
        
        assert.ok(Array.isArray(result1));
        assert.equal(result1.length, 10);
        checkScoresAreInOrder(result1, false);
        
        assert.ok(Array.isArray(result1));
        assert.equal(result1.length, 10);
        checkScoresAreInOrder(result1, false);
        
        assert.ok(Array.isArray(result1));
        assert.equal(result1.length, 10);
        checkScoresAreInOrder(result1, false);
    });
    
    it('should allow sorting by multiple properties', function() {
        var result = people.$_orderBy({ age: 'asc', name: 'desc' });
        
        assert.ok(Array.isArray(result));
        assert.equal(result.length, 5);

        assert.equal(result[0].name, 'CC');
        assert.equal(result[0].age, 1);
        
        assert.equal(result[1].name, 'BB');
        assert.equal(result[1].age, 1);
        
        assert.equal(result[2].name, 'AA');
        assert.equal(result[2].age, 1);
        
        assert.equal(result[3].name, 'DD');
        assert.equal(resulr[3].age, 2);
        
        assert.equal(result[4].name, 'EE');
        assert.equal(result[4].age, 3);
    });
});