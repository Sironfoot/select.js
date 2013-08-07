var customers = require('./data').customers;

function equalityTest(item) {
    for (var i = 0; i < this.keys.length; i++) {
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

var Query = function(items) {
    this.items = items;
};

Query.prototype.where = function(query) {
    this.items = this.items.filter(equalityTest, {
        keys: Object.keys(query),
        query: query
    });
    
    return this;
};

Query.prototype.orderBy = function(orderByKeys) {

    var keys = Object.keys(orderByKeys);
    
    this.items = this.items.sort(function(item1, item2) {
    
        for (var i = 0; i < keys.length; i++) {
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

    return this;
};

Query.prototype.select = function(selectList) {

    var keys = Object.keys(selectList || {});

    if (keys.length > 0) {
        return this.items.map(function(item) { 
            var obj = {};
            
            keys.forEach(function(key) {
                obj[key] = item[key];
            });
            
            return obj;
        });
    }
    else {
        return this.items;
    }
};

Query.prototype.first = function(query) {
    if (query) {
        this.items = items.filter(equalityTest, {
            keys: Object.keys(query),
            query: query
        });
    }
    
    return this.items.length > 0 ? this.items[0] : null;
};

Query.prototype.last = function(query) {
    if (query) {
        this.items = items.filter(equalityTest, {
            keys: Object.keys(query),
            query: query
        });
    }
    
    return this.items.length > 0 ? this.items[this.items.length - 1] : null;
};

Query.prototype.any = function(query) {
    return items.some(equalityTest, {
        keys: Object.keys(query),
        query: query
    });
};

Query.prototype.all = function(query) {
    return items.every(equalityTest, {
        keys: Object.keys(query),
        query: query
    });
};



Array.prototype.$ = function() {
    return new Query(this);
};

var filtered = [];

for (var x = 0; x < 3; x++) {
    
    console.time('Array');
    
    for (var i = 0; i < 10000; i++) {
        filtered = customers.$()
            .where({ age: { $gt: 11 } })
            .orderBy({ age: 1, name: 1 })
            .select({ name: 1, age: 1 });
    }
    
    console.timeEnd('Array');

}

console.log(filtered);