var customers = require('./data').customers;

var Query = function(items) {
    this.items = items;
};

Query.prototype.where = function(query) {

    var keys = Object.keys(query);
    
    if (keys.length === 0) {
        this.items = this.items.filter(function(item) {

        
    }
    else {
        this.items = this.items.filter(function(item) {
        
            for (var i = 0; i < keys.length; i++) {
                var key = keys[i];
                
                var value = query[key];
                
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
        });
    }
    
    return this;
};

Query.prototype.orderBy = function(orderByKeys) {

    var keys = Object.keys(orderByKeys);
    
    this.items = this.items.sort(function(item1, item2) {
    
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            var direction = orderByKeys[key];
            
            if (item1[key] === item2[key]) {
                return 0;
            }
            else if (item1[key] > item2[key]) {
                return direction < 0 ? -1 : 1;
            }
            else if (item1[key] < item2[key]) {
                return direction < 0 ? 1 : -1;
            }
        }
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



Array.prototype.$ = function() {
    return new Query(this);
};

var filtered = [];

for (var x = 0; x < 3; x++) {
    
    console.time('Array');
    
    for (var i = 0; i < 10000; i++) {
        filtered = customers.$()
            .where({ age: { $gt: 10 } })
            .orderBy({ age: 1 })
            .select({ name: 1, age: 1 });
    }
    
    console.timeEnd('Array');

}

console.log(filtered);