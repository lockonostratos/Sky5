(function () {

////////////////////////////////////////////////////////////////////////
//                                                                    //
// packages\util\tests.js                                             //
//                                                                    //
////////////////////////////////////////////////////////////////////////
                                                                      //
Tinytest.add('util', function (test) {                                // 1
  var isDefined = false;                                              // 2
  try {                                                               // 3
    util;                                                             // 4
    isDefined = true;                                                 // 5
  }                                                                   // 6
  catch (e) {                                                         // 7
  }                                                                   // 8
  test.isTrue(isDefined, "util is not defined");                      // 9
  test.isTrue(Package.util.util, "Package.util.util is not defined"); // 10
                                                                      // 11
  test.equal(util.inspect({}), "{}");                                 // 12
});                                                                   // 13
                                                                      // 14
////////////////////////////////////////////////////////////////////////

}).call(this);
