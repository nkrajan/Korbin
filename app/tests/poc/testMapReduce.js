var mmrd = require('mmrd');

function map() {
    var words = this.text.split(' ');
    words.forEach(function(word) {
        mmrd.emit(word, 1);
    });
}

function reduce(key, values) {
    var result = 0;
    values.forEach(function(v) {
        result += v;
    });
    return result;
}


// map test
(function() {
    console.log("Word count / Map test");
    var doc = { text: "foo bar baz" };
    mmrd.loadMap('map.js');
    mmrd.map(doc, function(key, value) {
        console.log(key, ":", value);
    });
})();

// reduce test
(function() {
    console.log("Word count / Reduce test");
    mmrd.loadReduce('reduce.js');
    var key = "foo";
    var values = [1, 1];
    var reduced = mmrd.reduce(key, values);
    console.log(key, ":", reduced);
})();

// integration test
(function() {
    console.log("Word count / Integration test");
    var docs = [
        { text: "foo bar baz" },
        { text: "foo baz baz"}
    ];
    mmrd.loadMap('map.js');
    mmrd.loadReduce('reduce.js');
    var result = mmrd.mapReduce(docs);
    console.log(result);
})();