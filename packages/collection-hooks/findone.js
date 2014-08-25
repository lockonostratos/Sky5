CollectionHooks.defineAdvice("findOne", function (userId, _super, instance, aspects, getTransform, args) {
  var self = this;
  var ctx = {context: self, _super: _super, args: args};
  var ret, abort;

  // args[0] : selector
  // args[1] : options

  // before
  _.each(aspects.before, function (o) {
    var r = o.aspect.call(ctx, userId, args[0], args[1]);
    if (r === false) abort = true;
  });

  if (abort) return false;

  function after(doc) {
    _.each(aspects.after, function (o) {
      o.aspect.call(ctx, userId, args[0], args[1], doc);
    });
  }

  ret = _super.apply(self, args);
  after(ret);

  return ret;
});