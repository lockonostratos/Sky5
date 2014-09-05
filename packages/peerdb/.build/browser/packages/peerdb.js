(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages\peerdb\lib.coffee.js                                                                                      //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var INVALID_TARGET, MAX_RETRIES, RESERVED_FIELDS, codeMinimizedTest, deepExtend, getCollection, globals, isPlainObject, removePrefix, removeUndefined, startsWith,          
  __slice = [].slice,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

globals = this;

RESERVED_FIELDS = ['document', 'parent', 'schema', 'migrations'];

INVALID_TARGET = "Invalid target document";

MAX_RETRIES = 1000;

codeMinimizedTest = (function() {
  function codeMinimizedTest() {}

  return codeMinimizedTest;

})();

this.CODE_MINIMIZED = codeMinimizedTest.name && codeMinimizedTest.name !== 'codeMinimizedTest';

isPlainObject = function(obj) {
  if (!_.isObject(obj) || _.isArray(obj) || _.isFunction(obj)) {
    return false;
  }
  if (obj.constructor !== Object) {
    return false;
  }
  return true;
};

deepExtend = function() {
  var args, obj;
  obj = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
  _.each(args, function(source) {
    return _.each(source, function(value, key) {
      if (obj[key] && value && isPlainObject(obj[key]) && isPlainObject(value)) {
        return obj[key] = deepExtend(obj[key], value);
      } else {
        return obj[key] = value;
      }
    });
  });
  return obj;
};

removeUndefined = function(obj) {
  var key, res, value;
  assert(isPlainObject(obj));
  res = {};
  for (key in obj) {
    value = obj[key];
    if (_.isUndefined(value)) {
      continue;
    } else if (isPlainObject(value)) {
      res[key] = removeUndefined(value);
    } else {
      res[key] = value;
    }
  }
  return res;
};

startsWith = function(string, start) {
  return string.lastIndexOf(start, 0) === 0;
};

removePrefix = function(string, prefix) {
  return string.substring(prefix.length);
};

getCollection = function(name, document, replaceParent) {
  var collection, method, methodHandlers, transform;
  transform = (function(_this) {
    return function(doc) {
      return new document(doc);
    };
  })(this);
  if (_.isString(name)) {
    if (Document._collections[name]) {
      methodHandlers = Document._collections[name]._connection.method_handlers || Document._collections[name]._connection._methodHandlers;
      for (method in methodHandlers) {
        if (startsWith(method, Document._collections[name]._prefix)) {
          if (replaceParent) {
            delete methodHandlers[method];
          } else {
            throw new Error("Reuse of a collection without replaceParent set");
          }
        }
      }
      if (Document._collections[name]._connection.registerStore) {
        if (replaceParent) {
          delete Document._collections[name]._connection._stores[name];
        } else {
          throw new Error("Reuse of a collection without replaceParent set");
        }
      }
    }
    collection = new Meteor.Collection(name, {
      transform: transform
    });
    Document._collections[name] = collection;
  } else if (name === null) {
    collection = new Meteor.Collection(name, {
      transform: transform
    });
  } else {
    collection = name;
    if (collection._peerdb && !replaceParent) {
      throw new Error("Reuse of a collection without replaceParent set");
    }
    collection._transform = LocalCollection.wrapTransform(transform);
    collection._peerdb = true;
  }
  return collection;
};

globals.Document = (function() {
  Document.objectify = function(parent, ancestorArray, obj, fields) {
    var field, name, path;
    if (!isPlainObject(obj)) {
      throw new Error("Document does not match schema, not a plain object");
    }
    for (name in fields) {
      field = fields[name];
      if (!obj[name]) {
        continue;
      }
      path = parent ? "" + parent + "." + name : name;
      if (field instanceof globals.Document._ReferenceField) {
        if (field.sourcePath !== path) {
          throw new Error("Document does not match schema, sourcePath does not match: " + field.sourcePath + " vs. " + path);
        }
        if (field.isArray) {
          if (!_.isArray(obj[name])) {
            throw new Error("Document does not match schema, not an array");
          }
          obj[name] = _.map(obj[name], (function(_this) {
            return function(o) {
              return new field.targetDocument(o);
            };
          })(this));
        } else {
          if (field.ancestorArray !== ancestorArray) {
            throw new Error("Document does not match schema, ancestorArray does not match: " + field.ancestorArray + " vs. " + ancestorArray);
          }
          if (!isPlainObject(obj[name])) {
            throw new Error("Document does not match schema, not a plain object");
          }
          obj[name] = new field.targetDocument(obj[name]);
        }
      } else if (isPlainObject(field)) {
        if (_.isArray(obj[name])) {
          if (!_.some(field, (function(_this) {
            return function(f) {
              return f.ancestorArray === path;
            };
          })(this))) {
            throw new Error("Document does not match schema, an unexpected array");
          }
          if (ancestorArray) {
            throw new Error("Document does not match schema, nested arrays are not supported");
          }
          obj[name] = _.map(obj[name], (function(_this) {
            return function(o) {
              return _this.objectify(path, path, o, field);
            };
          })(this));
        } else {
          if (_.some(field, (function(_this) {
            return function(f) {
              return f.ancestorArray === path;
            };
          })(this))) {
            throw new Error("Document does not match schema, expected an array");
          }
          obj[name] = this.objectify(path, ancestorArray, obj[name], field);
        }
      }
    }
    return obj;
  };

  function Document(doc) {
    var _ref, _ref1;
    _.extend(this, this.constructor.objectify('', null, doc || {}, ((_ref = this.constructor) != null ? (_ref1 = _ref.Meta) != null ? _ref1.fields : void 0 : void 0) || {}));
  }

  Document._Trigger = (function() {
    function _Class(fields, trigger) {
      this.fields = fields;
      this.trigger = trigger;
      this.validate = __bind(this.validate, this);
      this.contributeToClass = __bind(this.contributeToClass, this);
      if (this.fields == null) {
        this.fields = [];
      }
    }

    _Class.prototype.contributeToClass = function(document, name) {
      this.document = document;
      this.name = name;
      this._metaLocation = this.document.Meta._location;
      return this.collection = this.document.Meta.collection;
    };

    _Class.prototype.validate = function() {
      if (!this._metaLocation) {
        throw new Error("Missing meta location");
      }
      if (!this.name) {
        throw new Error("Missing name (from " + this._metaLocation + ")");
      }
      if (!this.document) {
        throw new Error("Missing document (for " + this.name + " trigger from " + this._metaLocation + ")");
      }
      if (!this.collection) {
        throw new Error("Missing collection (for " + this.name + " trigger from " + this._metaLocation + ")");
      }
      if (this.document.Meta._listIndex == null) {
        throw new Error("Document not defined (for " + this.name + " trigger from " + this._metaLocation + ")");
      }
      assert(!this.document.Meta._replaced);
      assert(this.document.Meta._delayIndex == null);
      assert.equal(this.document.Meta.document, this.document);
      return assert.equal(this.document.Meta.document.Meta, this.document.Meta);
    };

    return _Class;

  })();

  Document.Trigger = function() {
    var args;
    args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    return (function(func, args, ctor) {
      ctor.prototype = func.prototype;
      var child = new ctor, result = func.apply(child, args);
      return Object(result) === result ? result : child;
    })(this._Trigger, args, function(){});
  };

  Document._Field = (function() {
    function _Class() {
      this.validate = __bind(this.validate, this);
      this.contributeToClass = __bind(this.contributeToClass, this);
    }

    _Class.prototype.contributeToClass = function(sourceDocument, sourcePath, ancestorArray) {
      this.sourceDocument = sourceDocument;
      this.sourcePath = sourcePath;
      this.ancestorArray = ancestorArray;
      this._metaLocation = this.sourceDocument.Meta._location;
      return this.sourceCollection = this.sourceDocument.Meta.collection;
    };

    _Class.prototype.validate = function() {
      if (!this._metaLocation) {
        throw new Error("Missing meta location");
      }
      if (!this.sourcePath) {
        throw new Error("Missing source path (from " + this._metaLocation + ")");
      }
      if (!this.sourceDocument) {
        throw new Error("Missing source document (for " + this.sourcePath + " from " + this._metaLocation + ")");
      }
      if (!this.sourceCollection) {
        throw new Error("Missing source collection (for " + this.sourcePath + " from " + this._metaLocation + ")");
      }
      if (this.sourceDocument.Meta._listIndex == null) {
        throw new Error("Source document not defined (for " + this.sourcePath + " from " + this._metaLocation + ")");
      }
      assert(!this.sourceDocument.Meta._replaced);
      assert(this.sourceDocument.Meta._delayIndex == null);
      assert.equal(this.sourceDocument.Meta.document, this.sourceDocument);
      return assert.equal(this.sourceDocument.Meta.document.Meta, this.sourceDocument.Meta);
    };

    return _Class;

  })();

  Document._ObservingField = (function(_super) {
    __extends(_Class, _super);

    function _Class() {
      return _Class.__super__.constructor.apply(this, arguments);
    }

    return _Class;

  })(Document._Field);

  Document._TargetedFieldsObservingField = (function(_super) {
    __extends(_Class, _super);

    function _Class(targetDocument, fields) {
      this.fields = fields;
      this.validate = __bind(this.validate, this);
      this.contributeToClass = __bind(this.contributeToClass, this);
      _Class.__super__.constructor.call(this);
      if (this.fields == null) {
        this.fields = [];
      }
      if (targetDocument === 'self') {
        this.targetDocument = 'self';
        this.targetCollection = null;
      } else if (_.isFunction(targetDocument) && targetDocument.prototype instanceof globals.Document) {
        this.targetDocument = targetDocument;
        this.targetCollection = targetDocument.Meta.collection;
      } else {
        throw new Error(INVALID_TARGET);
      }
    }

    _Class.prototype.contributeToClass = function(sourceDocument, sourcePath, ancestorArray) {
      _Class.__super__.contributeToClass.call(this, sourceDocument, sourcePath, ancestorArray);
      if (this.targetDocument === 'self') {
        this.targetDocument = this.sourceDocument;
        this.targetCollection = this.sourceCollection;
      }
      this.inArray = this.ancestorArray && startsWith(this.sourcePath, this.ancestorArray);
      this.isArray = this.ancestorArray && this.sourcePath === this.ancestorArray;
      if (this.inArray) {
        return this.arraySuffix = removePrefix(this.sourcePath, this.ancestorArray);
      }
    };

    _Class.prototype.validate = function() {
      _Class.__super__.validate.call(this);
      if (!this.targetDocument) {
        throw new Error("Missing target document (for " + this.sourcePath + " from " + this._metaLocation + ")");
      }
      if (!this.targetCollection) {
        throw new Error("Missing target collection (for " + this.sourcePath + " from " + this._metaLocation + ")");
      }
      if (this.targetDocument.Meta._listIndex == null) {
        throw new Error("Target document not defined (for " + this.sourcePath + " from " + this._metaLocation + ")");
      }
      assert(!this.targetDocument.Meta._replaced);
      assert(this.targetDocument.Meta._delayIndex == null);
      assert.equal(this.targetDocument.Meta.document, this.targetDocument);
      return assert.equal(this.targetDocument.Meta.document.Meta, this.targetDocument.Meta);
    };

    return _Class;

  })(Document._ObservingField);

  Document._ReferenceField = (function(_super) {
    __extends(_Class, _super);

    function _Class(targetDocument, fields, required, reverseName, reverseFields) {
      this.required = required;
      this.reverseName = reverseName;
      this.reverseFields = reverseFields;
      this.contributeToClass = __bind(this.contributeToClass, this);
      _Class.__super__.constructor.call(this, targetDocument, fields);
      if (this.required == null) {
        this.required = true;
      }
      if (this.reverseName == null) {
        this.reverseName = null;
      }
      if (this.reverseFields == null) {
        this.reverseFields = [];
      }
    }

    _Class.prototype.contributeToClass = function(sourceDocument, sourcePath, ancestorArray) {
      var doc, i, reverse, _i, _j, _len, _len1, _ref, _ref1;
      _Class.__super__.contributeToClass.call(this, sourceDocument, sourcePath, ancestorArray);
      if (this.ancestorArray && this.sourcePath === this.ancestorArray && !this.required) {
        throw new Error("Reference field directly in an array cannot be optional (for " + this.sourcePath + " from " + this._metaLocation + ")");
      }
      if (!this.reverseName) {
        return;
      }
      if (this.targetDocument.Meta._replaced) {
        return;
      }
      _ref = this.targetDocument.Meta._reverseFields;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        reverse = _ref[_i];
        if (_.isEqual(reverse.reverseName, this.reverseName) && _.isEqual(reverse.reverseFields, this.reverseFields) && reverse.sourceDocument === this.sourceDocument) {
          return;
        }
      }
      this.targetDocument.Meta._reverseFields.push(this);
      if (this.targetDocument.Meta._listIndex != null) {
        globals.Document.list.splice(this.targetDocument.Meta._listIndex, 1);
        delete this.targetDocument.Meta._replaced;
        delete this.targetDocument.Meta._listIndex;
        _ref1 = globals.Document.list;
        for (i = _j = 0, _len1 = _ref1.length; _j < _len1; i = ++_j) {
          doc = _ref1[i];
          doc.Meta._listIndex = i;
        }
        return globals.Document._addDelayed(this.targetDocument);
      }
    };

    return _Class;

  })(Document._TargetedFieldsObservingField);

  Document.ReferenceField = function() {
    var args;
    args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    return (function(func, args, ctor) {
      ctor.prototype = func.prototype;
      var child = new ctor, result = func.apply(child, args);
      return Object(result) === result ? result : child;
    })(this._ReferenceField, args, function(){});
  };

  Document._GeneratedField = (function(_super) {
    __extends(_Class, _super);

    function _Class(targetDocument, fields, generator) {
      this.generator = generator;
      _Class.__super__.constructor.call(this, targetDocument, fields);
    }

    return _Class;

  })(Document._TargetedFieldsObservingField);

  Document.GeneratedField = function() {
    var args;
    args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    return (function(func, args, ctor) {
      ctor.prototype = func.prototype;
      var child = new ctor, result = func.apply(child, args);
      return Object(result) === result ? result : child;
    })(this._GeneratedField, args, function(){});
  };

  Document._Manager = (function() {
    function _Class(meta) {
      this.meta = meta;
      this.exists = __bind(this.exists, this);
      this.remove = __bind(this.remove, this);
      this.upsert = __bind(this.upsert, this);
      this.update = __bind(this.update, this);
      this.insert = __bind(this.insert, this);
      this.findOne = __bind(this.findOne, this);
      this.find = __bind(this.find, this);
    }

    _Class.prototype.find = function() {
      var args, _ref;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return (_ref = this.meta.collection).find.apply(_ref, args);
    };

    _Class.prototype.findOne = function() {
      var args, _ref;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return (_ref = this.meta.collection).findOne.apply(_ref, args);
    };

    _Class.prototype.insert = function() {
      var args, _ref;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return (_ref = this.meta.collection).insert.apply(_ref, args);
    };

    _Class.prototype.update = function() {
      var args, _ref;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return (_ref = this.meta.collection).update.apply(_ref, args);
    };

    _Class.prototype.upsert = function() {
      var args, _ref;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return (_ref = this.meta.collection).upsert.apply(_ref, args);
    };

    _Class.prototype.remove = function() {
      var args, _ref;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return (_ref = this.meta.collection).remove.apply(_ref, args);
    };

    _Class.prototype.exists = function(query) {
      return !!this.meta.collection.findOne(query, {
        fields: {
          _id: 1
        },
        transform: null
      });
    };

    return _Class;

  })();

  Document._setDelayedCheck = function() {
    if (!globals.Document._delayed.length) {
      return;
    }
    this._clearDelayedCheck();
    return globals.Document._delayedCheckTimeout = Meteor.setTimeout(function() {
      var delayed, document, _i, _len, _ref;
      if (globals.Document._delayed.length) {
        delayed = [];
        _ref = globals.Document._delayed;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          document = _ref[_i];
          delayed.push("" + document.Meta._name + " from " + document.Meta._location);
        }
        return Log.error("Not all delayed document definitions were successfully retried:\n" + (delayed.join('\n')));
      }
    }, 1000);
  };

  Document._clearDelayedCheck = function() {
    if (globals.Document._delayedCheckTimeout) {
      return Meteor.clearTimeout(globals.Document._delayedCheckTimeout);
    }
  };

  Document._processTriggers = function(triggers) {
    var name, trigger;
    assert(triggers);
    assert(isPlainObject(triggers));
    for (name in triggers) {
      trigger = triggers[name];
      if (name.indexOf('.') !== -1) {
        throw new Error("Trigger names cannot contain '.' (for " + name + " trigger from " + this.Meta._location + ")");
      }
      if (trigger instanceof globals.Document._Trigger) {
        trigger.contributeToClass(this, name);
      } else {
        throw new Error("Invalid value for trigger (for " + name + " trigger from " + this.Meta._location + ")");
      }
    }
    return triggers;
  };

  Document._processFields = function(fields, parent, ancestorArray) {
    var array, field, name, path, res;
    assert(fields);
    assert(isPlainObject(fields));
    ancestorArray = ancestorArray || null;
    res = {};
    for (name in fields) {
      field = fields[name];
      if (name.indexOf('.') !== -1) {
        throw new Error("Field names cannot contain '.' (for " + name + " from " + this.Meta._location + ")");
      }
      path = parent ? "" + parent + "." + name : name;
      array = ancestorArray;
      if (_.isArray(field)) {
        if (field.length !== 1) {
          throw new Error("Array field has to contain exactly one element, not " + field.length + " (for " + path + " from " + this.Meta._location + ")");
        }
        field = field[0];
        if (array) {
          throw new Error("Field cannot be in a nested array (for " + path + " from " + this.Meta._location + ")");
        }
        array = path;
      }
      if (field instanceof globals.Document._Field) {
        field.contributeToClass(this, path, array);
        res[name] = field;
      } else if (_.isObject(field)) {
        res[name] = this._processFields(field, path, array);
      } else {
        throw new Error("Invalid value for field (for " + path + " from " + this.Meta._location + ")");
      }
    }
    return res;
  };

  Document._fieldsUseDocument = function(fields, document) {
    var field, name;
    assert(fields);
    assert(isPlainObject(fields));
    for (name in fields) {
      field = fields[name];
      if (field instanceof globals.Document._TargetedFieldsObservingField) {
        if (field.sourceDocument === document) {
          return true;
        }
        if (field.targetDocument === document) {
          return true;
        }
      } else if (field instanceof globals.Document._Field) {
        if (field.sourceDocument === document) {
          return true;
        }
      } else {
        assert(isPlainObject(field));
        if (this._fieldsUseDocument(field, document)) {
          return true;
        }
      }
    }
    return false;
  };

  Document._retryAllUsing = function(document) {
    var doc, documents, _i, _len, _results;
    documents = globals.Document.list;
    globals.Document.list = [];
    _results = [];
    for (_i = 0, _len = documents.length; _i < _len; _i++) {
      doc = documents[_i];
      if (this._fieldsUseDocument(doc.Meta.fields, document)) {
        delete doc.Meta._replaced;
        delete doc.Meta._listIndex;
        _results.push(this._addDelayed(doc));
      } else {
        globals.Document.list.push(doc);
        _results.push(doc.Meta._listIndex = globals.Document.list.length - 1);
      }
    }
    return _results;
  };

  Document._retryDelayed = function(throwErrors) {
    var delayed, doc, document, e, fields, i, processedCount, reverse, reverseFields, triggers, _i, _j, _k, _l, _len, _len1, _len2, _len3, _len4, _m, _ref, _ref1, _ref2, _ref3;
    this._clearDelayedCheck();
    delayed = globals.Document._delayed;
    globals.Document._delayed = [];
    for (_i = 0, _len = delayed.length; _i < _len; _i++) {
      document = delayed[_i];
      delete document.Meta._delayIndex;
    }
    processedCount = 0;
    for (_j = 0, _len1 = delayed.length; _j < _len1; _j++) {
      document = delayed[_j];
      assert(document.Meta._listIndex == null);
      if (document.Meta._replaced) {
        continue;
      }
      try {
        triggers = document.Meta._triggers.call(document, {});
        if (triggers && isPlainObject(triggers)) {
          document.Meta.triggers = document._processTriggers(triggers);
        }
      } catch (_error) {
        e = _error;
        if (!throwErrors && (e.message === INVALID_TARGET || e instanceof ReferenceError)) {
          this._addDelayed(document);
          continue;
        } else {
          throw new Error("Invalid triggers (from " + document.Meta._location + "): " + ((typeof e.stringOf === "function" ? e.stringOf() : void 0) || e) + "\n---" + (e.stack ? "" + e.stack + "\n---" : ''));
        }
      }
      if (!triggers) {
        throw new Error("No triggers returned (from " + document.Meta._location + ")");
      }
      if (!isPlainObject(triggers)) {
        throw new Error("Returned triggers should be a plain object (from " + document.Meta._location + ")");
      }
      try {
        fields = document.Meta._fields.call(document, {});
        if (fields && isPlainObject(fields)) {
          document._processFields(fields);
          reverseFields = {};
          _ref = document.Meta._reverseFields;
          for (_k = 0, _len2 = _ref.length; _k < _len2; _k++) {
            reverse = _ref[_k];
            reverseFields[reverse.reverseName] = [globals.Document.ReferenceField(reverse.sourceDocument, reverse.reverseFields)];
          }
          document.Meta.fields = document._processFields(_.extend(fields, reverseFields));
        }
      } catch (_error) {
        e = _error;
        if (!throwErrors && (e.message === INVALID_TARGET || e instanceof ReferenceError)) {
          this._addDelayed(document);
          continue;
        } else {
          throw new Error("Invalid fields (from " + document.Meta._location + "): " + ((typeof e.stringOf === "function" ? e.stringOf() : void 0) || e) + "\n---" + (e.stack ? "" + e.stack + "\n---" : ''));
        }
      }
      if (!fields) {
        throw new Error("No fields returned (from " + document.Meta._location + ")");
      }
      if (!isPlainObject(fields)) {
        throw new Error("Returned fields should be a plain object (from " + document.Meta._location + ")");
      }
      if (document.Meta.replaceParent && !((_ref1 = document.Meta.parent) != null ? _ref1._replaced : void 0)) {
        if (!document.Meta.parent) {
          throw new Error("Replace parent set, but no parent known (from " + document.Meta._location + ")");
        }
        document.Meta.parent._replaced = true;
        if (document.Meta.parent._listIndex != null) {
          globals.Document.list.splice(document.Meta.parent._listIndex, 1);
          delete document.Meta.parent._listIndex;
          _ref2 = globals.Document.list;
          for (i = _l = 0, _len3 = _ref2.length; _l < _len3; i = ++_l) {
            doc = _ref2[i];
            doc.Meta._listIndex = i;
          }
        } else if (document.Meta.parent._delayIndex != null) {
          globals.Document._delayed.splice(document.Meta.parent._delayIndex, 1);
          delete document.Meta.parent._delayIndex;
          _ref3 = globals.Document._delayed;
          for (i = _m = 0, _len4 = _ref3.length; _m < _len4; i = ++_m) {
            doc = _ref3[i];
            doc.Meta._delayIndex = i;
          }
        }
        this._retryAllUsing(document.Meta.parent.document);
      }
      globals.Document.list.push(document);
      document.Meta._listIndex = globals.Document.list.length - 1;
      delete document.Meta._delayIndex;
      assert(!document.Meta._replaced);
      processedCount++;
    }
    this._setDelayedCheck();
    return processedCount;
  };

  Document._addDelayed = function(document) {
    this._clearDelayedCheck();
    assert(!document.Meta._replaced);
    assert(document.Meta._listIndex == null);
    globals.Document._delayed.push(document);
    document.Meta._delayIndex = globals.Document._delayed.length - 1;
    return this._setDelayedCheck();
  };

  Document._validateTriggers = function(document) {
    var name, trigger, _ref, _results;
    _ref = document.Meta.triggers;
    _results = [];
    for (name in _ref) {
      trigger = _ref[name];
      if (trigger instanceof globals.Document._Trigger) {
        _results.push(trigger.validate());
      } else {
        throw new Error("Invalid trigger (for " + name + " trigger from " + document.Meta._location + ")");
      }
    }
    return _results;
  };

  Document._validateFields = function(obj) {
    var field, name, _results;
    _results = [];
    for (name in obj) {
      field = obj[name];
      if (field instanceof globals.Document._Field) {
        _results.push(field.validate());
      } else {
        _results.push(this._validateFields(field));
      }
    }
    return _results;
  };

  Document.Meta = function(meta) {
    var clonedParentMeta, currentFields, currentTriggers, field, fields, filteredParentMeta, name, parentMeta, triggers, _i, _len, _ref, _ref1;
    _ref = RESERVED_FIELDS || startsWith(field, '_');
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      field = _ref[_i];
      if (field in meta) {
        throw "Reserved meta field name: " + field;
      }
    }
    if (meta.abstract) {
      if (meta.name) {
        throw new Error("name cannot be set in abstract document");
      }
      if (meta.replaceParent) {
        throw new Error("replaceParent cannot be set in abstract document");
      }
      if (this.Meta._name) {
        throw new Error("Abstract document with a parent");
      }
    } else {
      if (!meta.name) {
        throw new Error("Missing document name");
      }
      if (!CODE_MINIMIZED && this.name && this.name !== meta.name) {
        throw new Error("Document name does not match class name");
      }
      if (meta.replaceParent && !this.Meta._name) {
        throw new Error("replaceParent set without a parent");
      }
    }
    name = meta.name;
    currentTriggers = meta.triggers || function(ts) {
      return ts;
    };
    currentFields = meta.fields || function(fs) {
      return fs;
    };
    meta = _.omit(meta, 'name', 'triggers', 'fields');
    parentMeta = this.Meta;
    if (parentMeta._triggers) {
      triggers = function(ts) {
        var newTs;
        newTs = parentMeta._triggers(ts);
        return removeUndefined(_.extend(ts, newTs, currentTriggers(newTs)));
      };
    } else {
      triggers = currentTriggers;
    }
    meta._triggers = triggers;
    if (parentMeta._fields) {
      fields = function(fs) {
        var newFs;
        newFs = parentMeta._fields(fs);
        return removeUndefined(deepExtend(fs, newFs, currentFields(newFs)));
      };
    } else {
      fields = currentFields;
    }
    meta._fields = fields;
    if (!meta.abstract) {
      meta._name = name;
      meta._location = CODE_MINIMIZED ? '<code_minimized>' : StackTrace.getCaller();
      meta.document = this;
      if (meta.collection === null || meta.collection) {
        meta.collection = getCollection(meta.collection, this, meta.replaceParent);
      } else if ((_ref1 = parentMeta.collection) != null ? _ref1._peerdb : void 0) {
        meta.collection = getCollection(parentMeta.collection, this, meta.replaceParent);
      } else {
        meta.collection = getCollection("" + name + "s", this, meta.replaceParent);
      }
      if (this.Meta._name) {
        meta.parent = parentMeta;
      }
      if (!meta.replaceParent) {
        meta._reverseFields = [];
      } else {
        meta._reverseFields = _.clone(parentMeta._reverseFields);
      }
      if (!meta.replaceParent) {
        meta.migrations = [];
      }
    }
    clonedParentMeta = function() {
      return parentMeta.apply(this, arguments);
    };
    filteredParentMeta = _.omit(parentMeta, '_listIndex', '_delayIndex', '_replaced', 'parent', 'replaceParent', 'abstract');
    this.Meta = _.extend(clonedParentMeta, filteredParentMeta, meta);
    if (!meta.abstract) {
      assert(this.Meta._reverseFields);
      this.documents = new this._Manager(this.Meta);
      this._addDelayed(this);
      return this._retryDelayed();
    }
  };

  Document.list = [];

  Document._delayed = [];

  Document._delayedCheckTimeout = null;

  Document._collections = {};

  Document.validateAll = function() {
    var document, _i, _len, _ref, _results;
    _ref = globals.Document.list;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      document = _ref[_i];
      if (!document.Meta.fields) {
        throw new Error("Missing fields (from " + document.Meta._location + ")");
      }
      this._validateTriggers(document);
      _results.push(this._validateFields(document.Meta.fields));
    }
    return _results;
  };

  Document.defineAll = function(dontThrowDelayedErrors) {
    var i, _i;
    for (i = _i = 0; 0 <= MAX_RETRIES ? _i <= MAX_RETRIES : _i >= MAX_RETRIES; i = 0 <= MAX_RETRIES ? ++_i : --_i) {
      if (i === MAX_RETRIES) {
        if (!dontThrowDelayedErrors) {
          throw new Error("Possible infinite loop");
        }
        break;
      }
      globals.Document._retryDelayed(!dontThrowDelayedErrors);
      if (!globals.Document._delayed.length) {
        break;
      }
    }
    globals.Document.validateAll();
    return assert(dontThrowDelayedErrors || globals.Document._delayed.length === 0);
  };

  return Document;

})();

Document = globals.Document;

assert(globals.Document._ReferenceField.prototype instanceof globals.Document._TargetedFieldsObservingField);

assert(globals.Document._GeneratedField.prototype instanceof globals.Document._TargetedFieldsObservingField);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);
