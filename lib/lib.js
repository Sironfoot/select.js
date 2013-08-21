'use strict';

var utils = require('./utils');

Array.prototype.$_where = function(queryOrFunction) {

    if (utils.isFunction(queryOrFunction)) {
        return this.filter(queryOrFunction);
    }
    else {
        return utils.performSearch(Array.prototype.filter.bind(this), queryOrFunction);
    }
};

Array.prototype.$_orderBy = function(orderByKeys) {

    var keys = Object.keys(orderByKeys);
    var numKeys = keys.length;
    
    // convert asc/desc strings into 1/-1
    for (var i = 0; i < numKeys; i++) {
        var key = keys[i];
        var direction = orderByKeys[key];
        
        if (direction === 'asc' || direction === 'ascending') {
            orderByKeys[key] = 1;
        }
        else if (direction === 'desc' || direction === 'descending') {
            orderByKeys[key] = -1;
        }
    }
    
    return this.sort(function(item1, item2) {
    
        for (var i = 0; i < numKeys; i++) {
            var key = keys[i];
            var direction = orderByKeys[key];
            
            if (item1[key] === item2[key]) {
                continue;
            }
            else if (item1[key] > item2[key]) {
                return direction < 0 ? -1 : 1;
            }
            else if (item1[key] < item2[key]) {
                return direction < 0 ? 1 : -1;
            }
        }
        
        return 0;
    });
};

Array.prototype.$_select = function(selectList) {

    var keys = Object.keys(selectList || {});
    var numKeys = keys.length;

    return this.map(function(item) { 
        var obj = {};
        
        for (var i = 0; i < numKeys; i++) {
            var key = keys[i];
            obj[key] = item[key];
        }
        
        return obj;
    });
};

Array.prototype.$_first = function(queryOrFunction) {

    var items = this;

    if (queryOrFunction) {
        items = items.$_where(queryOrFunction);
    }
    
    return items.length > 0 ? items[0] : null;
};

Array.prototype.$_last = function(queryOrFunction) {

    var items = this;

    if (queryOrFunction) {
        items = items.$_where(queryOrFunction);
    }
    
    return items.length > 0 ? items[items.length - 1] : null;
};

Array.prototype.$_any = function(queryOrFunction) {

    if (queryOrFunction) {
        if (utils.isFunction(queryOrFunction)) {
            return this.some(queryOrFunction)
        }
        else {
            return utils.performSearch(Array.prototype.some.bind(this), queryOrFunction);
        }
    }
    else {
        return this.length > 0;
    }
};

Array.prototype.$_all = function(queryOrFunction) {

    if (queryOrFunction) {
        if (utils.isFunction(queryOrFunction)) {
            return this.every(queryOrFunction);
        }
        else {
            return utils.performSearch(Array.prototype.every.bind(this), queryOrFunction);
        }
    }
    else {
        return this.length > 0;
    }
};

Array.prototype.$_skip = function(skipCount) {

    if (this.length > skipCount) {
        return this.slice(skipCount);
    }
    else {
        return [];
    }
};

Array.prototype.$_take = function(takeAmount) {

    if (this.length > takeAmount) {
        return this.slice(0, takeAmount);
    }
    else {
        return this;
    }
};

Array.prototype.$_count = function(queryOrFunction) {

    if (queryOrFunction) {
        return this.$_where(queryOrFunction).length;
    }
    else {
        return this.length;
    }
};


Array.prototype.$_sum = function(keyOrFunction) {

    var numItems = this.length;
    if (numItems === 0) return null;

    if (utils.isFunction(keyOrFunction)) {
        var total = 0;
        
        for (var i = 0; i < numItems; i++) {
            var value = keyOrFunction(this[i]);
            total += value ? value : 0;
        }
        
        return total;
    }
    else {
        var total = 0;
        
        for (var i = 0; i < numItems; i++) {
            var item = this[i];
            var value = item[keyOrFunction];
            total += value ? value : 0;
        }
        
        return total;
    }
};

Array.prototype.$_min = function(keyOrFunction) {
    var numItems = this.length;
    if (numItems === 0) return null;
    
    var values = utils.getAggregateValues(this, keyOrFunction);
    
    var min = values[0];
    var numValues = values.length;
    
    for (var i = 0; i < numValues; i++) {
        var value = values[i];
        if (value < min) {
            min = value;
        }
    }
    
    return min;
};

Array.prototype.$_max = function(keyOrFunction) {
    var numItems = this.length;
    if (numItems === 0) return null;
    
    var values = utils.getAggregateValues(this, keyOrFunction);
    
    var max = values[0];
    var numValues = values.length;
        
    for (var i = 0; i < numValues; i++) {
        var value = values[i];
        if (value > max) {
            max = value;
        }
    }
    
    return max;
};

Array.prototype.$_average = function(key) {
    if (this.length === 0) return null;
    
    var total = this.$_sum(key);
    return total / this.length;
};