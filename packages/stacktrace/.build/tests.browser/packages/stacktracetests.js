(function () {

////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                            //
// packages\stacktrace\tests.js                                                               //
//                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                              //
Tinytest.add('stacktrace', function (test) {                                                  // 1
  var isDefined = false;                                                                      // 2
  try {                                                                                       // 3
    StackTrace;                                                                               // 4
    isDefined = true;                                                                         // 5
  }                                                                                           // 6
  catch (e) {                                                                                 // 7
  }                                                                                           // 8
  test.isTrue(isDefined, "StackTrace is not defined");                                        // 9
  test.isTrue(Package.stacktrace.StackTrace, "Package.stacktrace.StackTrace is not defined"); // 10
                                                                                              // 11
  test.isTrue(_.isArray(StackTrace.printStackTrace()));                                       // 12
                                                                                              // 13
  test.isTrue(StackTrace.getCaller());                                                        // 14
});                                                                                           // 15
                                                                                              // 16
////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);
