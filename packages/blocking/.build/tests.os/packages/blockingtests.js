(function () {

////////////////////////////////////////////////////////////////////////////////////////
//                                                                                    //
// packages\blocking\tests.js                                                         //
//                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////
                                                                                      //
Tinytest.add('blocking', function (test) {                                            // 1
  var isDefined = false;                                                              // 2
  try {                                                                               // 3
    blocking;                                                                         // 4
    isDefined = true;                                                                 // 5
  }                                                                                   // 6
  catch (e) {                                                                         // 7
  }                                                                                   // 8
  test.isTrue(isDefined, "blocking is not defined");                                  // 9
  test.isTrue(Package.blocking.blocking, "Package.blocking.blocking is not defined"); // 10
                                                                                      // 11
  test.equal(blocking(function (a, b, cb) { cb(null, a + b) })(1, 2), 3);             // 12
                                                                                      // 13
  test.throws(function () {                                                           // 14
    blocking(function (a, b, cb) { cb("test error") })(1, 2)                          // 15
  }, /^test error$/);                                                                 // 16
});                                                                                   // 17
                                                                                      // 18
////////////////////////////////////////////////////////////////////////////////////////

}).call(this);
