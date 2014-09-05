(function () {

/////////////////////////////////////////////////////////////////////////////////
//                                                                             //
// packages\blocking\server.js                                                 //
//                                                                             //
/////////////////////////////////////////////////////////////////////////////////
                                                                               //
(function () {                                                                 // 1
  // Inside blocking context functions should not be throwing exceptions but   // 2
  // call callback with first argument an error. Exceptions will not propagate // 3
  // and will only be printed to the console.                                  // 4
  blocking = function (obj, fun) {                                             // 5
    if (!fun) {                                                                // 6
      fun = obj;                                                               // 7
      obj = undefined;                                                         // 8
    }                                                                          // 9
    var wrapped = Meteor._wrapAsync(fun);                                      // 10
    var f = function () {                                                      // 11
      if (typeof obj === 'undefined') {                                        // 12
        obj = this;                                                            // 13
      }                                                                        // 14
      return wrapped.apply(obj, arguments);                                    // 15
    };                                                                         // 16
    f._blocking = true;                                                        // 17
    return f;                                                                  // 18
  };                                                                           // 19
})();                                                                          // 20
                                                                               // 21
/////////////////////////////////////////////////////////////////////////////////

}).call(this);
