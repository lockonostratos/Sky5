(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages\easy-search\tests\easy-search-tests.js                                                                  //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
var collection1 = new Meteor.Collection('estestCollection');                                                        // 1
                                                                                                                    // 2
collection1.allow({                                                                                                 // 3
    'insert' : function () { return true; },                                                                        // 4
    'remove' : function () { return true; }                                                                         // 5
});                                                                                                                 // 6
                                                                                                                    // 7
if (Meteor.isServer) {                                                                                              // 8
    collection1.remove({ });                                                                                        // 9
                                                                                                                    // 10
    // fixture data                                                                                                 // 11
    collection1.insert({ 'name' : 'Super Pomodoro' });                                                              // 12
    collection1.insert({ 'name' : 'Awesome Testsauce' });                                                           // 13
    collection1.insert({ 'name' : 'David Rails' });                                                                 // 14
                                                                                                                    // 15
    Meteor.publish('testCollection', function () { return collection1.find(); });                                   // 16
} else if (Meteor.isClient) {                                                                                       // 17
    Meteor.subscribe('testCollection');                                                                             // 18
}                                                                                                                   // 19
                                                                                                                    // 20
collection1.initEasySearch('name', {                                                                                // 21
    'permission' : function (string) {                                                                              // 22
        return string !== 'Testsauce';                                                                              // 23
    }                                                                                                               // 24
});                                                                                                                 // 25
                                                                                                                    // 26
// Tests                                                                                                            // 27
Tinytest.add('EasySearch - createSearchIndex, getIndex, getIndexes', function (test) {                              // 28
    test.throws(function () { EasySearch.createSearchIndex({}, {}); });                                             // 29
    test.throws(function () { EasySearch.createSearchIndex(10, {}); });                                             // 30
    test.throws(function () { EasySearch.createSearchIndex('validName', 10); });                                    // 31
    test.throws(function () { EasySearch.createSearchIndex(function () { }, {}); });                                // 32
                                                                                                                    // 33
    if (Meteor.isServer) {                                                                                          // 34
        test.expect_fail(function () { EasySearch.createSearchIndex('test', { 'field' : 'a', 'use' : 'doesntExist' }); });
    }                                                                                                               // 36
                                                                                                                    // 37
    EasySearch.createSearchIndex('testIndex', {                                                                     // 38
        'field' : 'testField',                                                                                      // 39
        'customField' : [0, 1, 2]                                                                                   // 40
    });                                                                                                             // 41
                                                                                                                    // 42
    test.equal(EasySearch.getIndex('testIndex').customField, [0, 1, 2]);                                            // 43
    test.equal(EasySearch.getIndex('testIndex').field, ['testField']);                                              // 44
                                                                                                                    // 45
    test.instanceOf(EasySearch.getIndexes(), Object);                                                               // 46
    test.equal(EasySearch.getIndexes()['testIndex'].field, ['testField']);                                          // 47
    test.isUndefined(EasySearch.getIndexes()['indexThatDoesntExist']);                                              // 48
});                                                                                                                 // 49
                                                                                                                    // 50
if (Meteor.isClient) {                                                                                              // 51
    Tinytest.add('EasySearch - Client - changeProperty', function (test) {                                          // 52
        EasySearch.createSearchIndex('testIndex2', {                                                                // 53
            'field' : 'testField',                                                                                  // 54
            'customField' : 'isAString'                                                                             // 55
        });                                                                                                         // 56
                                                                                                                    // 57
        test.throws(function () { EasySearch.changeProperty('testIndex2', {}, {}); });                              // 58
        test.throws(function () { EasySearch.changeProperty({}, 'validKey', {}); });                                // 59
                                                                                                                    // 60
        test.equal(EasySearch.getIndex('testIndex2').customField, 'isAString');                                     // 61
        EasySearch.changeProperty('testIndex2', 'customField', 'isAnotherString');                                  // 62
        test.equal(EasySearch.getIndex('testIndex2').customField, 'isAnotherString');                               // 63
    });                                                                                                             // 64
                                                                                                                    // 65
    Tinytest.addAsync('EasySearch - Client - search #1', function (test, completed) {                               // 66
        EasySearch.search('estestCollection', 'er Po', function (err, data) {                                       // 67
            test.equal(data.total, 1);                                                                              // 68
            test.equal(data.results[0].name, "Super Pomodoro");                                                     // 69
            completed();                                                                                            // 70
        });                                                                                                         // 71
    });                                                                                                             // 72
                                                                                                                    // 73
    Tinytest.addAsync('EasySearch - Client - search #2', function (test, completed) {                               // 74
        EasySearch.searchMultiple(['estestCollection'], 'id R', function (err, data) {                              // 75
            test.equal(data.total, 1);                                                                              // 76
            test.equal(data.results[0].name, "David Rails");                                                        // 77
            completed();                                                                                            // 78
        });                                                                                                         // 79
    });                                                                                                             // 80
} else if (Meteor.isServer) {                                                                                       // 81
    Tinytest.add('EasySearch - Server - config', function (test) {                                                  // 82
        EasySearch.config({                                                                                         // 83
            'host' : 'localhost:8000'                                                                               // 84
        });                                                                                                         // 85
                                                                                                                    // 86
        test.equal(EasySearch.config().host, 'localhost:8000');                                                     // 87
    });                                                                                                             // 88
                                                                                                                    // 89
    Tinytest.add('EasySearch - Server - search #1', function (test) {                                               // 90
        var data = EasySearch.search('estestCollection', 'sauCE', { 'limit' : 10 });                                // 91
        test.equal(data.results[0].name, "Awesome Testsauce");                                                      // 92
    });                                                                                                             // 93
                                                                                                                    // 94
    Tinytest.add('EasySearch - Server - search #2', function (test) {                                               // 95
        var data = EasySearch.search('estestCollection', 'Super duper', { });                                       // 96
        test.equal(data.results.length, 0);                                                                         // 97
    });                                                                                                             // 98
                                                                                                                    // 99
    Tinytest.add('EasySearch - Server - search #3 (no permission to search)', function (test) {                     // 100
        var data = EasySearch.search('estestCollection', 'Testsauce', { });                                         // 101
        test.equal(data.results.length, 0);                                                                         // 102
    })                                                                                                              // 103
                                                                                                                    // 104
    Tinytest.add('EasySearch - Server - extendSearch', function (test) {                                            // 105
        // No solr implementation                                                                                   // 106
        test.expect_fail(function () { EasySearch.createSearchIndex('test', { 'field' : 'a', 'use' : 'solr' }); }); // 107
                                                                                                                    // 108
        EasySearch.extendSearch('solr', {                                                                           // 109
            'createSearchIndex' : function () {},                                                                   // 110
            'search' : function () {}                                                                               // 111
        });                                                                                                         // 112
                                                                                                                    // 113
        // Now it has one                                                                                           // 114
        test.isUndefined(EasySearch.createSearchIndex('test', { 'field' : 'a', 'use' : 'solr' }));                  // 115
                                                                                                                    // 116
        test.expect_fail(function () {                                                                              // 117
            EasySearch.extendSearch(10, {                                                                           // 118
                'createSearchIndex' : function () {},                                                               // 119
                'search' : function () {}                                                                           // 120
            });                                                                                                     // 121
        });                                                                                                         // 122
                                                                                                                    // 123
        test.expect_fail(function () {                                                                              // 124
            EasySearch.extendSearch('lucene', {});                                                                  // 125
        });                                                                                                         // 126
    });                                                                                                             // 127
}                                                                                                                   // 128
                                                                                                                    // 129
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);
