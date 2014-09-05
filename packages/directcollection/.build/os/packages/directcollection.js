(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages\directcollection\direct.coffee.js                                                                        //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var Future,                  
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Future = Npm.require('fibers/future');

DirectCollection = (function() {
  function DirectCollection(name, _makeNewID) {
    this.name = name;
    this._makeNewID = _makeNewID;
    this.remove = __bind(this.remove, this);
    this.update = __bind(this.update, this);
    this.insert = __bind(this.insert, this);
    this.findOne = __bind(this.findOne, this);
    this.count = __bind(this.count, this);
    this.findEach = __bind(this.findEach, this);
    this.findToArray = __bind(this.findToArray, this);
    if (!this._makeNewID) {
      this._makeNewID = function() {
        return Random.id();
      };
    }
  }

  DirectCollection.prototype.findToArray = function(selector, options) {
    var cursor;
    if (!options) {
      options = {};
    }
    cursor = MongoInternals.defaultRemoteCollectionDriver().mongo._getCollection(this.name).find(selector, options);
    return blocking(cursor, cursor.toArray)();
  };

  DirectCollection.prototype.findEach = function(selector, options, eachCallback) {
    var callback, errorHandler, future;
    if (_.isFunction(options)) {
      eachCallback = options;
      options = {};
    }
    if (!options) {
      options = {};
    }
    future = new Future();
    callback = (function(_this) {
      return function(error, document) {
        if (future.isResolved()) {
          return;
        }
        if (error) {
          return future["throw"](error);
        } else if (document) {
          return eachCallback(document);
        } else {
          return future["return"]();
        }
      };
    })(this);
    errorHandler = (function(_this) {
      return function(error) {
        if (error && !future.isResolved()) {
          return future["throw"](error);
        }
      };
    })(this);
    callback = Meteor.bindEnvironment(callback, errorHandler, this);
    MongoInternals.defaultRemoteCollectionDriver().mongo._getCollection(this.name).find(selector, options).each(callback);
    future.wait();
  };

  DirectCollection.prototype.count = function(selector, options) {
    var collection;
    if (!options) {
      options = {};
    }
    collection = MongoInternals.defaultRemoteCollectionDriver().mongo._getCollection(this.name);
    return blocking(collection, collection.count)(selector, options);
  };

  DirectCollection.prototype.findOne = function(selector, options) {
    var collection;
    if (!options) {
      options = {};
    }
    collection = MongoInternals.defaultRemoteCollectionDriver().mongo._getCollection(this.name);
    return blocking(collection, collection.findOne)(selector, options);
  };

  DirectCollection.prototype.insert = function(document) {
    var collection;
    if (!('_id' in document)) {
      document = EJSON.clone(document);
      document._id = this._makeNewID();
    }
    collection = MongoInternals.defaultRemoteCollectionDriver().mongo._getCollection(this.name);
    blocking(collection, collection.insert)(document, {
      w: 1
    });
    return document._id;
  };

  DirectCollection.prototype.update = function(selector, modifier, options) {
    var collection;
    if (!options) {
      options = {};
    }
    options.w = 1;
    collection = MongoInternals.defaultRemoteCollectionDriver().mongo._getCollection(this.name);
    return blocking(collection, collection.update)(selector, modifier, options);
  };

  DirectCollection.prototype.remove = function(selector) {
    var collection;
    collection = MongoInternals.defaultRemoteCollectionDriver().mongo._getCollection(this.name);
    return blocking(collection, collection.remove)(selector, {
      w: 1
    });
  };

  return DirectCollection;

})();
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);
