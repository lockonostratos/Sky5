(function () {

////////////////////////////////////////////////////////////////////////////////
//                                                                            //
// packages\assert\tests.js                                                   //
//                                                                            //
////////////////////////////////////////////////////////////////////////////////
                                                                              //
Tinytest.add('assert', function (test) {                                      // 1
  var isDefined = false;                                                      // 2
  try {                                                                       // 3
    assert;                                                                   // 4
    isDefined = true;                                                         // 5
  }                                                                           // 6
  catch (e) {                                                                 // 7
  }                                                                           // 8
  test.isTrue(isDefined, "assert is not defined");                            // 9
  test.isTrue(Package.assert.assert, "Package.assert.assert is not defined"); // 10
                                                                              // 11
  test.throws(function () {                                                   // 12
    assert.equal('a', 'b', 'message');                                        // 13
  }, /message/);                                                              // 14
});                                                                           // 15
                                                                              // 16
////////////////////////////////////////////////////////////////////////////////

}).call(this);
