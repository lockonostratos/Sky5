(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                    //
// packages\directcollection\tests.coffee.js                                                          //
//                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                      //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
Tinytest.add('directcollection - basic', function(test) {
  var correctOrder, document1, document1Id, document2, document2Id, removed, testCollection, updates;
  testCollection = new DirectCollection('direct');
  testCollection.remove({});
  test.equal(testCollection.count({}), 0);
  document1 = {
    foo: 'bar1',
    faa: 'zar'
  };
  document1Id = testCollection.insert(document1);
  test.isFalse(document1._id);
  document1._id = document1Id;
  test.isTrue(_.isString(document1._id));
  test.equal(testCollection.findOne({
    _id: document1._id
  }), document1);
  test.equal(testCollection.findOne(document1), document1);
  document2 = {
    _id: 'test',
    foo: 'bar2',
    faa: 'zar'
  };
  document2Id = testCollection.insert(document2);
  test.equal(document2._id, 'test');
  test.equal(document2Id, 'test');
  test.equal(testCollection.findOne({
    _id: document2._id
  }), document2);
  test.equal(testCollection.findOne(document2), document2);
  test.equal(testCollection.count({}), 2);
  test.equal(testCollection.count({
    foo: 'bar2'
  }), 1);
  test.equal(testCollection.count({
    faa: 'zar'
  }), 2);
  test.equal(testCollection.findToArray({}), [document1, document2]);
  correctOrder = 0;
  testCollection.findEach({}, function(document) {
    Meteor._nodeCodeMustBeInFiber();
    correctOrder++;
    if (correctOrder === 1) {
      return test.equal(document1, document);
    } else if (correctOrder === 2) {
      return test.equal(document2, document);
    } else {
      return test.fail({
        type: 'fail',
        message: "Invalid correctOrder: " + correctOrder
      });
    }
  });
  test.equal(correctOrder, 2);
  test.throws(function() {
    return testCollection.findEach({}, function(document) {
      throw new Error('test');
    });
  }, /test/);
  updates = testCollection.update({}, {
    $set: {
      foo: 'bar1a'
    }
  });
  document1.foo = 'bar1a';
  test.equal(updates, 1);
  test.equal(testCollection.findToArray({}), [document1, document2]);
  updates = testCollection.update({}, {
    $set: {
      faa: 'zar2'
    }
  }, {
    multi: true
  });
  document1.faa = 'zar2';
  document2.faa = 'zar2';
  test.equal(updates, 2);
  test.equal(testCollection.findToArray({}), [document1, document2]);
  removed = testCollection.remove({
    foo: 'bar2'
  });
  test.equal(removed, 1);
  test.equal(testCollection.count({}), 1);
  removed = testCollection.remove({});
  test.equal(removed, 1);
  return test.equal(testCollection.count({}), 0);
});
////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);
