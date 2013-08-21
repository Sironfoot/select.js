'use strict';

exports.performSearch = function(searchFunction, query) {

    if (isString(query) || isNumber(query)) {
        return searchFunction(function(item) {
            return item === query;
        });
    }
    else {
        return searchFunction(equalityTest, {
            keys: Object.keys(query),
            query: query
        });
    }
};

function equalityTest(item) {
    var numKeys = this.keys.length;
    
    for (var i = 0; i < numKeys; i++) {
        var key = this.keys[i];
        
        var value = this.query[key];
        
        var usesSpecialSearch = false;
        
        if (typeof value.$gt !== 'undefined') {
            if (!(item[key] > value.$gt)) return false;
            usesSpecialSearch = true;
        }
        
        if (typeof value.$lt !== 'undefined') {
            if (!(item[key] < value.$lt)) return false;
            usesSpecialSearch = true;
        }
        
        if (typeof value.$gte !== 'undefined') {
            if (!(item[key] >= value.$gte)) return false;
            usesSpecialSearch = true;
        }
        
        if (typeof value.$lte !== 'undefined') {
            if (!(item[key] <= value.$lte)) return false;
            usesSpecialSearch = true;
        }
        
        if (Array.isArray(value.$in)) {
            var foundAtLeastOneMatch = false;
        
            for (var j = 0; j < value.$in.length; j++) {
                var inValue = value.$in[j];
                if (item[key] === inValue) {
                    foundAtLeastOneMatch = true;
                    break;
                }
            }
            
            if (!foundAtLeastOneMatch) return false;
            usesSpecialSearch = true;
        }
        
        if (!usesSpecialSearch) {
            if (item[key] !== value) return false;
        }
    }

    return true;
}

exports.getAggregateValues = function(array, keyOrFunction) {
    
    var values = [];
    var numItems = array.length;
    
    if (!keyOrFunction) {
        return array;
    }
    
    if (isFunction(keyOrFunction)) {
        
        for (var i = 0; i < numItems; i++) {
            var value = keyOrFunction(array[i]);
            values.push(value ? value : 0);
        }
    }
    else {
        for (var i = 0; i < numItems; i++) {
            var item = array[i];
            var value = item[keyOrFunction];
            values.push(value ? value : 0);
        }
    }
    
    return values;
};


function isFunction(func) {
    return typeof(func) == 'function';
};

exports.isFunction = isFunction;


function isString(stringVar) {
    return typeof stringVar == 'string' || stringVar instanceof String;
};

exports.isString = isString;


function isNumber(obj) {
    return toString.call(obj) == '[object Number]';
};

exports.isNumber = isNumber;