var customers = require('./data').customers;

function equalityTest(item) {
    var numKeys = this.keys.length;
    
    for (var i = 0; i < numKeys; i++) {
        var key = this.keys[i];
        
        var value = this.query[key];
        
        if (value.$gt) {
            if (value.$gt >= item[key]) return false;
        }
        else if (value.$lt) {
            if (value.$lt <= item[key]) return false;
        }
        else {
            if (item[key] !== value) return false;
        }
    }
    
    return true;
}

Array.prototype.$_where = function(query) {
    return this.filter(equalityTest, {
        keys: Object.keys(query),
        query: query
    });
};

Array.prototype.$_orderBy = function(orderByKeys) {

    var keys = Object.keys(orderByKeys);
    var numKeys = keys.length;
    
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

Array.prototype.$_first = function(query) {

    var items = this;

    if (query) {
        items = this.filter(equalityTest, {
            keys: Object.keys(query),
            query: query
        });
    }
    
    return items.length > 0 ? items[0] : null;
};

Array.prototype.$_last = function(query) {

    var items = this;

    if (query) {
        items = this.filter(equalityTest, {
            keys: Object.keys(query),
            query: query
        });
    }
    
    return items.length > 0 ? items[items.length - 1] : null;
};

Array.prototype.$_any = function(query) {
    return this.some(equalityTest, {
        keys: Object.keys(query),
        query: query
    });
};

Array.prototype.$_all = function(query) {
    return this.every(equalityTest, {
        keys: Object.keys(query),
        query: query
    });
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

Array.prototype.$_count = function(query) {

    if (query) {
        return this.filter(equalityTest, {
            keys: Object.keys(query),
            query: query
        }).length;
    }
    else {
        return this.length;
    }
};

/*
Array.prototype.$_sum = function(property) {
    
};
*/


var filtered = [];

for (var x = 0; x < 3; x++) {
    
    console.time('Array');
    
    for (var i = 0; i < 10000; i++) {


        filtered = customers
            .$_where({ age: { $gt: 11 } })
            .$_orderBy({ age: 1 })
            .$_select({ name: 1, age: 1 })
            .$_skip(2)
            .$_take(6);


            
/*
        filtered = customers
            .filter(function(customer) {
                return customer.age > 11;
            })
            .sort(function(cust1, cust2) {
                return cust1.age - cust2.age;
            })
            .map(function(customer) {
                return {
                    name: customer.name,
                    age: customer.age
                };
            });
*/
    }
    
    console.timeEnd('Array');
}

console.log(filtered);