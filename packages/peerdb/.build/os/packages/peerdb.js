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






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages\peerdb\server.coffee.js                                                                                   //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var Future, INSTANCE, INSTANCES, PREFIX, UNMISTAKABLE_CHARS, extractValue, fieldsToProjection, globals, migrations, observerCallback, range, semver, setupMigrations, setupObservers, _ref, _ref1,          
  __slice = [].slice,
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

semver = Npm.require('semver');

Future = Npm.require('fibers/future');

globals = this;

UNMISTAKABLE_CHARS = '23456789ABCDEFGHJKLMNPQRSTWXYZabcdefghijkmnopqrstuvwxyz';

INSTANCES = parseInt((_ref = process.env.PEERDB_INSTANCES) != null ? _ref : 1);

INSTANCE = parseInt((_ref1 = process.env.PEERDB_INSTANCE) != null ? _ref1 : 0);

if (!((0 <= INSTANCES && INSTANCES <= UNMISTAKABLE_CHARS.length))) {
  throw new Error("Invalid number of instances: " + INSTANCES);
}

if (!((INSTANCES === 0 && INSTANCE === 0) || (0 <= INSTANCE && INSTANCE < INSTANCES))) {
  throw new Error("Invalid instance index: " + INSTANCE);
}

PREFIX = UNMISTAKABLE_CHARS.split('');

if (INSTANCES > 1) {
  range = UNMISTAKABLE_CHARS.length / INSTANCES;
  PREFIX = PREFIX.slice(Math.round(INSTANCE * range), Math.round((INSTANCE + 1) * range));
}

globals.Document.Migrations = new Meteor.Collection('migrations');

fieldsToProjection = function(fields) {
  var field, projection, _i, _len;
  projection = {
    _id: 1
  };
  for (_i = 0, _len = fields.length; _i < _len; _i++) {
    field = fields[_i];
    if (_.isString(field)) {
      projection[field] = 1;
    } else {
      _.extend(projection, field);
    }
  }
  return projection;
};

observerCallback = function(f) {
  return function() {
    var args, e, id, obj, _ref2;
    obj = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    try {
      id = _.isObject(obj) ? obj._id : obj;
      if (_ref2 = id[0], __indexOf.call(PREFIX, _ref2) >= 0) {
        return f.apply(null, [obj].concat(__slice.call(args)));
      }
    } catch (_error) {
      e = _error;
      Log.error("PeerDB exception: " + e + ": " + (util.inspect(args, {
        depth: 10
      })));
      return Log.error(e.stack);
    }
  };
};

extractValue = function(obj, path) {
  while (path.length) {
    obj = obj[path[0]];
    path = path.slice(1);
  }
  return obj;
};

globals.Document._TargetedFieldsObservingField.prototype._setupTargetObservers = function(updateAll) {
  var handle, index, initializing, observers, referenceFields;
  if (!updateAll && this instanceof globals.Document._ReferenceField) {
    index = {};
    index["" + this.sourcePath + "._id"] = 1;
    this.sourceCollection._ensureIndex(index);
    if (this.reverseName) {
      index = {};
      index["" + this.reverseName + "._id"] = 1;
      this.targetCollection._ensureIndex(index);
    }
  }
  initializing = true;
  observers = {
    added: observerCallback((function(_this) {
      return function(id, fields) {
        if (updateAll || !initializing) {
          return _this.updateSource(id, fields);
        }
      };
    })(this))
  };
  if (!updateAll) {
    observers.changed = observerCallback((function(_this) {
      return function(id, fields) {
        return _this.updateSource(id, fields);
      };
    })(this));
    observers.removed = observerCallback((function(_this) {
      return function(id) {
        return _this.removeSource(id);
      };
    })(this));
  }
  referenceFields = fieldsToProjection(this.fields);
  handle = this.targetCollection.find({}, {
    fields: referenceFields
  }).observeChanges(observers);
  initializing = false;
  if (updateAll) {
    return handle.stop();
  }
};

globals.Document._Trigger.prototype._setupObservers = function() {
  var initializing, queryFields;
  initializing = true;
  queryFields = fieldsToProjection(this.fields);
  this.collection.find({}, {
    fields: queryFields
  }).observe({
    added: observerCallback((function(_this) {
      return function(document) {
        if (!initializing) {
          return _this.trigger(document, {});
        }
      };
    })(this)),
    changed: observerCallback((function(_this) {
      return function(newDocument, oldDocument) {
        return _this.trigger(newDocument, oldDocument);
      };
    })(this)),
    removed: observerCallback((function(_this) {
      return function(oldDocument) {
        return _this.trigger({}, oldDocument);
      };
    })(this))
  });
  return initializing = false;
};

globals.Document._Trigger = (function(_super) {
  __extends(_Trigger, _super);

  function _Trigger() {
    this.trigger = __bind(this.trigger, this);
    return _Trigger.__super__.constructor.apply(this, arguments);
  }

  _Trigger.prototype.trigger = function(newDocument, oldDocument) {
    return this.generator(newDocument, oldDocument);
  };

  return _Trigger;

})(globals.Document._Trigger);

globals.Document._ReferenceField = (function(_super) {
  __extends(_ReferenceField, _super);

  function _ReferenceField() {
    this.updatedWithValue = __bind(this.updatedWithValue, this);
    this.removeSource = __bind(this.removeSource, this);
    this.updateSource = __bind(this.updateSource, this);
    return _ReferenceField.__super__.constructor.apply(this, arguments);
  }

  _ReferenceField.prototype.updateSource = function(id, fields) {
    var field, path, s, selector, update, value, _base, _name, _results;
    if (_.isEmpty(fields)) {
      return;
    }
    selector = {};
    selector["" + this.sourcePath + "._id"] = id;
    update = {};
    if (this.inArray) {
      for (field in fields) {
        value = fields[field];
        path = "" + this.ancestorArray + ".$" + this.arraySuffix + "." + field;
        if (_.isUndefined(value)) {
          if (update.$unset == null) {
            update.$unset = {};
          }
          update.$unset[path] = '';
        } else {
          if (update.$set == null) {
            update.$set = {};
          }
          update.$set[path] = value;
        }
        if (selector[_name = this.ancestorArray] == null) {
          selector[_name] = {};
        }
        if ((_base = selector[this.ancestorArray]).$elemMatch == null) {
          _base.$elemMatch = {
            $or: []
          };
        }
        s = {};
        s[("" + this.arraySuffix + "._id").substring(1)] = id;
        if (_.isUndefined(value)) {
          s[("" + this.arraySuffix + "." + field).substring(1)] = {
            $exists: true
          };
        } else {
          s[("" + this.arraySuffix + "." + field).substring(1)] = {
            $ne: value
          };
        }
        selector[this.ancestorArray].$elemMatch.$or.push(s);
      }
      _results = [];
      while (true) {
        if (!this.sourceCollection.update(selector, update, {
          multi: true
        })) {
          break;
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    } else {
      for (field in fields) {
        value = fields[field];
        path = "" + this.sourcePath + "." + field;
        s = {};
        if (_.isUndefined(value)) {
          if (update.$unset == null) {
            update.$unset = {};
          }
          update.$unset[path] = '';
          s[path] = {
            $exists: true
          };
        } else {
          if (update.$set == null) {
            update.$set = {};
          }
          update.$set[path] = value;
          s[path] = {
            $ne: value
          };
        }
        if (selector.$or == null) {
          selector.$or = [];
        }
        selector.$or.push(s);
      }
      return this.sourceCollection.update(selector, update, {
        multi: true
      });
    }
  };

  _ReferenceField.prototype.removeSource = function(id) {
    var path, selector, update, _results;
    selector = {};
    selector["" + this.sourcePath + "._id"] = id;
    if (this.isArray || (this.required && this.inArray)) {
      update = {
        $pull: {}
      };
      update.$pull[this.ancestorArray] = {};
      update.$pull[this.ancestorArray][("" + (this.arraySuffix || '') + "._id").substring(1)] = id;
      return this.sourceCollection.update(selector, update, {
        multi: true
      });
    } else if (!this.required && this.inArray) {
      path = "" + this.ancestorArray + ".$" + this.arraySuffix;
      update = {
        $set: {}
      };
      update.$set[path] = null;
      _results = [];
      while (true) {
        if (!this.sourceCollection.update(selector, update, {
          multi: true
        })) {
          break;
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    } else if (!this.required) {
      update = {
        $set: {}
      };
      update.$set[this.sourcePath] = null;
      return this.sourceCollection.update(selector, update, {
        multi: true
      });
    } else {
      return this.sourceCollection.remove(selector);
    }
  };

  _ReferenceField.prototype.updatedWithValue = function(id, value) {
    var referenceFields, reverseFields, selector, source, target, update;
    if (!(_.isObject(value) && _.isString(value._id))) {
      if (_.isNull(value) && !this.required) {
        return;
      }
      Log.error("Document's '" + id + "' field '" + this.sourcePath + "' was updated with an invalid value: " + (util.inspect(value)));
      return;
    }
    if (!_.isEmpty(this.fields)) {
      referenceFields = fieldsToProjection(this.fields);
      target = this.targetCollection.findOne(value._id, {
        fields: referenceFields,
        transform: null
      });
      if (!target) {
        Log.error("Document's '" + id + "' field '" + this.sourcePath + "' is referencing a nonexistent document '" + value._id + "'");
        return;
      }
      this.updateSource(target._id, _.omit(target, '_id'));
    }
    if (!this.reverseName) {
      return;
    }
    reverseFields = fieldsToProjection(this.reverseFields);
    source = this.sourceCollection.findOne(id, {
      fields: reverseFields,
      transform: null
    });
    selector = {
      _id: value._id
    };
    selector["" + this.reverseName + "._id"] = {
      $ne: id
    };
    update = {};
    update[this.reverseName] = source;
    return this.targetCollection.update(selector, {
      $addToSet: update
    });
  };

  return _ReferenceField;

})(globals.Document._ReferenceField);

globals.Document._GeneratedField = (function(_super) {
  __extends(_GeneratedField, _super);

  function _GeneratedField() {
    this.updatedWithValue = __bind(this.updatedWithValue, this);
    this.removeSource = __bind(this.removeSource, this);
    this.updateSource = __bind(this.updateSource, this);
    this._updateSourceNestedArray = __bind(this._updateSourceNestedArray, this);
    this._updateSourceField = __bind(this._updateSourceField, this);
    return _GeneratedField.__super__.constructor.apply(this, arguments);
  }

  _GeneratedField.prototype._updateSourceField = function(id, fields) {
    var selector, sourceValue, update, _ref2;
    _ref2 = this.generator(fields), selector = _ref2[0], sourceValue = _ref2[1];
    if (!selector) {
      return;
    }
    if (this.isArray && !_.isArray(sourceValue)) {
      Log.error("Generated field '" + this.sourcePath + "' defined as an array with selector '" + selector + "' was updated with a non-array value: " + (util.inspect(sourceValue)));
      return;
    }
    if (!this.isArray && _.isArray(sourceValue)) {
      Log.error("Generated field '" + this.sourcePath + "' not defined as an array with selector '" + selector + "' was updated with an array value: " + (util.inspect(sourceValue)));
      return;
    }
    update = {};
    if (_.isUndefined(sourceValue)) {
      update.$unset = {};
      update.$unset[this.sourcePath] = '';
    } else {
      update.$set = {};
      update.$set[this.sourcePath] = sourceValue;
    }
    return this.sourceCollection.update(selector, update, {
      multi: true
    });
  };

  _GeneratedField.prototype._updateSourceNestedArray = function(id, fields) {
    var i, path, selector, sourceValue, update, values, _i, _len, _ref2, _results;
    assert(this.arraySuffix);
    values = this.generator(fields);
    if (!_.isArray(values)) {
      Log.error("Value returned from the generator for field '" + this.sourcePath + "' is not a nested array despite field being nested in an array: " + (util.inspect(values)));
      return;
    }
    _results = [];
    for (i = _i = 0, _len = values.length; _i < _len; i = ++_i) {
      _ref2 = values[i], selector = _ref2[0], sourceValue = _ref2[1];
      if (!selector) {
        continue;
      }
      if (_.isArray(sourceValue)) {
        Log.error("Generated field '" + this.sourcePath + "' not defined as an array with selector '" + selector + "' was updated with an array value: " + (util.inspect(sourceValue)));
        continue;
      }
      path = "" + this.ancestorArray + "." + i + this.arraySuffix;
      update = {};
      if (_.isUndefined(sourceValue)) {
        update.$unset = {};
        update.$unset[path] = '';
      } else {
        update.$set = {};
        update.$set[path] = sourceValue;
      }
      if (!this.sourceCollection.update(selector, update, {
        multi: true
      })) {
        break;
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  };

  _GeneratedField.prototype.updateSource = function(id, fields) {
    var targetFields;
    if (_.isEmpty(fields)) {
      fields._id = id;
    } else if (_.size(fields) !== this.fields.length) {
      targetFields = fieldsToProjection(this.fields);
      fields = this.targetCollection.findOne(id, {
        fields: targetFields,
        transform: null
      });
      if (!fields) {
        fields = {
          _id: id
        };
      }
    } else {
      fields._id = id;
    }
    if (this.inArray && !this.isArray) {
      return this._updateSourceNestedArray(id, fields);
    } else {
      return this._updateSourceField(id, fields);
    }
  };

  _GeneratedField.prototype.removeSource = function(id) {
    return this.updateSource(id, {});
  };

  _GeneratedField.prototype.updatedWithValue = function(id, value) {};

  return _GeneratedField;

})(globals.Document._GeneratedField);

globals.Document = (function(_super) {
  __extends(Document, _super);

  function Document() {
    return Document.__super__.constructor.apply(this, arguments);
  }

  Document._sourceFieldProcessDeleted = function(field, id, ancestorSegments, pathSegments, value) {
    var ids, update, v;
    if (ancestorSegments.length) {
      assert(ancestorSegments[0] === pathSegments[0]);
      return this._sourceFieldProcessDeleted(field, id, ancestorSegments.slice(1), pathSegments.slice(1), value[ancestorSegments[0]]);
    } else {
      if (!_.isArray(value)) {
        value = [value];
      }
      ids = (function() {
        var _i, _len, _ref2, _results;
        _results = [];
        for (_i = 0, _len = value.length; _i < _len; _i++) {
          v = value[_i];
          if ((_ref2 = extractValue(v, pathSegments)) != null ? _ref2._id : void 0) {
            _results.push(extractValue(v, pathSegments)._id);
          }
        }
        return _results;
      })();
      assert(field.reverseName);
      update = {};
      update[field.reverseName] = {
        _id: id
      };
      return field.targetCollection.update({
        _id: {
          $nin: ids
        }
      }, {
        $pull: update
      }, {
        multi: true
      });
    }
  };

  Document._sourceFieldUpdated = function(id, name, value, field, originalValue) {
    var ancestorSegments, f, n, pathSegments, v, _i, _j, _len, _len1, _results;
    if (_.isUndefined(value)) {
      if (field != null ? field.reverseName : void 0) {
        this._sourceFieldProcessDeleted(field, id, [], name.split('.').slice(1), originalValue);
      }
      return;
    }
    field = field || this.Meta.fields[name];
    assert(field);
    originalValue = originalValue || value;
    if (field instanceof globals.Document._ObservingField) {
      if (field.ancestorArray && name === field.ancestorArray) {
        if (!_.isArray(value)) {
          Log.error("Document's '" + id + "' field '" + name + "' was updated with a non-array value: " + (util.inspect(value)));
          return;
        }
      } else {
        value = [value];
      }
      for (_i = 0, _len = value.length; _i < _len; _i++) {
        v = value[_i];
        field.updatedWithValue(id, v);
      }
      if (field.reverseName) {
        pathSegments = name.split('.');
        if (field.ancestorArray) {
          ancestorSegments = field.ancestorArray.split('.');
          assert(ancestorSegments[0] === pathSegments[0]);
          return this._sourceFieldProcessDeleted(field, id, ancestorSegments.slice(1), pathSegments.slice(1), originalValue);
        } else {
          return this._sourceFieldProcessDeleted(field, id, [], pathSegments.slice(1), originalValue);
        }
      }
    } else if (!(field instanceof globals.Document._Field)) {
      if (!_.isArray(value)) {
        value = [value];
      }
      _results = [];
      for (_j = 0, _len1 = value.length; _j < _len1; _j++) {
        v = value[_j];
        _results.push((function() {
          var _results1;
          _results1 = [];
          for (n in field) {
            f = field[n];
            _results1.push(this._sourceFieldUpdated(id, "" + name + "." + n, v[n], f, originalValue));
          }
          return _results1;
        }).call(this));
      }
      return _results;
    }
  };

  Document._sourceUpdated = function(id, fields) {
    var name, value, _results;
    _results = [];
    for (name in fields) {
      value = fields[name];
      _results.push(this._sourceFieldUpdated(id, name, value));
    }
    return _results;
  };

  Document._setupSourceObservers = function(updateAll) {
    var handle, index, indexes, initializing, observers, sourceFields, sourceFieldsWalker, _i, _len;
    if (_.isEmpty(this.Meta.fields)) {
      return;
    }
    indexes = [];
    sourceFields = {
      _id: 1
    };
    sourceFieldsWalker = function(obj) {
      var field, index, name, _results;
      _results = [];
      for (name in obj) {
        field = obj[name];
        if (field instanceof globals.Document._ObservingField) {
          sourceFields[field.sourcePath] = 1;
          if (field instanceof globals.Document._ReferenceField) {
            index = {};
            index["" + field.sourcePath + "._id"] = 1;
            _results.push(indexes.push(index));
          } else {
            _results.push(void 0);
          }
        } else if (!(field instanceof globals.Document._Field)) {
          _results.push(sourceFieldsWalker(field));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };
    sourceFieldsWalker(this.Meta.fields);
    if (!updateAll) {
      for (_i = 0, _len = indexes.length; _i < _len; _i++) {
        index = indexes[_i];
        this.Meta.collection._ensureIndex(index);
      }
    }
    initializing = true;
    observers = {
      added: observerCallback((function(_this) {
        return function(id, fields) {
          if (updateAll || !initializing) {
            return _this._sourceUpdated(id, fields);
          }
        };
      })(this))
    };
    if (!updateAll) {
      observers.changed = observerCallback((function(_this) {
        return function(id, fields) {
          return _this._sourceUpdated(id, fields);
        };
      })(this));
    }
    handle = this.Meta.collection.find({}, {
      fields: sourceFields
    }).observeChanges(observers);
    initializing = false;
    if (updateAll) {
      return handle.stop();
    }
  };

  Document._Migration = (function() {
    function _Class() {
      this.backward = __bind(this.backward, this);
      this.forward = __bind(this.forward, this);
      this.updateAll = __bind(this.updateAll, this);
    }

    _Class.prototype.updateAll = function(document, collection, currentSchema, intoSchema) {
      return this._updateAll = true;
    };

    _Class.prototype.forward = function(document, collection, currentSchema, newSchema) {
      return {
        migrated: 0,
        all: collection.update({
          _schema: currentSchema
        }, {
          $set: {
            _schema: newSchema
          }
        }, {
          multi: true
        })
      };
    };

    _Class.prototype.backward = function(document, collection, currentSchema, oldSchema) {
      return {
        migrated: 0,
        all: collection.update({
          _schema: currentSchema
        }, {
          $set: {
            _schema: oldSchema
          }
        }, {
          multi: true
        })
      };
    };

    return _Class;

  })();

  Document.PatchMigration = (function(_super1) {
    __extends(_Class, _super1);

    function _Class() {
      return _Class.__super__.constructor.apply(this, arguments);
    }

    return _Class;

  })(Document._Migration);

  Document.MinorMigration = (function(_super1) {
    __extends(_Class, _super1);

    function _Class() {
      return _Class.__super__.constructor.apply(this, arguments);
    }

    return _Class;

  })(Document._Migration);

  Document.MajorMigration = (function(_super1) {
    __extends(_Class, _super1);

    function _Class() {
      return _Class.__super__.constructor.apply(this, arguments);
    }

    return _Class;

  })(Document._Migration);

  Document.AddSyncedFieldsMigration = (function(_super1) {
    __extends(_Class, _super1);

    function _Class() {
      this.backward = __bind(this.backward, this);
      this.forward = __bind(this.forward, this);
      return _Class.__super__.constructor.apply(this, arguments);
    }

    _Class.prototype.forward = function(document, collection, currentSchema, newSchema) {
      var counts;
      this.updateAll(document, collection, currentSchema, newSchema);
      counts = _Class.__super__.forward.apply(this, arguments);
      counts.migrated = counts.all;
      return counts;
    };

    _Class.prototype.backward = function(document, collection, currentSchema, oldSchema) {
      var counts;
      this.updateAll(document, collection, currentSchema, oldSchema);
      counts = _Class.__super__.backward.apply(this, arguments);
      counts.migrated = counts.all;
      return counts;
    };

    return _Class;

  })(Document.MinorMigration);

  Document.RemoveSyncedFieldsMigration = (function(_super1) {
    __extends(_Class, _super1);

    function _Class() {
      this.backward = __bind(this.backward, this);
      this.forward = __bind(this.forward, this);
      return _Class.__super__.constructor.apply(this, arguments);
    }

    _Class.prototype.forward = function(document, collection, currentSchema, newSchema) {
      var counts;
      this.updateAll(document, collection, currentSchema, newSchema);
      counts = _Class.__super__.forward.apply(this, arguments);
      counts.migrated = counts.all;
      return counts;
    };

    _Class.prototype.backward = function(document, collection, currentSchema, oldSchema) {
      var counts;
      this.updateAll(document, collection, currentSchema, oldSchema);
      counts = _Class.__super__.backward.apply(this, arguments);
      counts.migrated = counts.all;
      return counts;
    };

    return _Class;

  })(Document.MajorMigration);

  Document.AddAutoFieldsMigration = (function(_super1) {
    __extends(_Class, _super1);

    function _Class(fields) {
      this.backward = __bind(this.backward, this);
      this.forward = __bind(this.forward, this);
      if (fields) {
        this.fields = fields;
      }
      _Class.__super__.constructor.apply(this, arguments);
    }

    _Class.prototype.forward = function(document, collection, currentSchema, newSchema) {
      var counts;
      assert(this.fields);
      this.updateAll(document, collection, currentSchema, newSchema);
      counts = _Class.__super__.forward.apply(this, arguments);
      counts.migrated = counts.all;
      return counts;
    };

    _Class.prototype.backward = function(document, collection, currentSchema, oldSchema) {
      var count, counts, field, update, _i, _len, _ref2;
      update = {
        $unset: {},
        $set: {
          _schema: oldSchema
        }
      };
      _ref2 = this.fields;
      for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
        field = _ref2[_i];
        update.$unset[field] = '';
      }
      count = collection.update({
        _schema: currentSchema
      }, update, {
        multi: true
      });
      counts = _Class.__super__.backward.apply(this, arguments);
      counts.migrated += count;
      counts.all += count;
      return counts;
    };

    return _Class;

  })(Document.MinorMigration);

  Document.ModifyAutoFieldsMigration = (function(_super1) {
    __extends(_Class, _super1);

    function _Class(fields) {
      this.backward = __bind(this.backward, this);
      this.forward = __bind(this.forward, this);
      if (fields) {
        this.fields = fields;
      }
      _Class.__super__.constructor.apply(this, arguments);
    }

    _Class.prototype.forward = function(document, collection, currentSchema, newSchema) {
      var counts;
      assert(this.fields);
      this.updateAll(document, collection, currentSchema, newSchema);
      counts = _Class.__super__.forward.apply(this, arguments);
      counts.migrated = counts.all;
      return counts;
    };

    _Class.prototype.backward = function(document, collection, currentSchema, oldSchema) {
      var counts;
      assert(this.fields);
      this.updateAll(document, collection, currentSchema, oldSchema);
      counts = _Class.__super__.backward.apply(this, arguments);
      counts.migrated = counts.all;
      return counts;
    };

    return _Class;

  })(Document.MinorMigration);

  Document.RemoveAutoFieldsMigration = (function(_super1) {
    __extends(_Class, _super1);

    function _Class(fields) {
      this.backward = __bind(this.backward, this);
      this.forward = __bind(this.forward, this);
      if (fields) {
        this.fields = fields;
      }
      _Class.__super__.constructor.apply(this, arguments);
    }

    _Class.prototype.forward = function(document, collection, currentSchema, newSchema) {
      var count, counts, field, update, _i, _len, _ref2;
      update = {
        $unset: {},
        $set: {
          _schema: newSchema
        }
      };
      _ref2 = this.fields;
      for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
        field = _ref2[_i];
        update.$unset[field] = '';
      }
      count = collection.update({
        _schema: currentSchema
      }, update, {
        multi: true
      });
      counts = _Class.__super__.forward.apply(this, arguments);
      counts.migrated += count;
      counts.all += count;
      return counts;
    };

    _Class.prototype.backward = function(document, collection, currentSchema, oldSchema) {
      var counts;
      assert(this.fields);
      this.updateAll(document, collection, currentSchema, oldSchema);
      counts = _Class.__super__.backward.apply(this, arguments);
      counts.migrated = counts.all;
      return counts;
    };

    return _Class;

  })(Document.MajorMigration);

  Document.AddOptionalFieldsMigration = (function(_super1) {
    __extends(_Class, _super1);

    function _Class(fields) {
      this.backward = __bind(this.backward, this);
      this.forward = __bind(this.forward, this);
      if (fields) {
        this.fields = fields;
      }
      _Class.__super__.constructor.apply(this, arguments);
    }

    _Class.prototype.forward = function(document, collection, currentSchema, newSchema) {
      assert(this.fields);
      return _Class.__super__.forward.apply(this, arguments);
    };

    _Class.prototype.backward = function(document, collection, currentSchema, oldSchema) {
      var count, counts, field, update, _i, _len, _ref2;
      update = {
        $unset: {},
        $set: {
          _schema: oldSchema
        }
      };
      _ref2 = this.fields;
      for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
        field = _ref2[_i];
        update.$unset[field] = '';
      }
      count = collection.update({
        _schema: currentSchema
      }, update, {
        multi: true
      });
      counts = _Class.__super__.backward.apply(this, arguments);
      counts.migrated += count;
      counts.all += count;
      return counts;
    };

    return _Class;

  })(Document.MinorMigration);

  Document.AddRequiredFieldsMigration = (function(_super1) {
    __extends(_Class, _super1);

    function _Class(fields) {
      this.backward = __bind(this.backward, this);
      this.forward = __bind(this.forward, this);
      if (fields) {
        this.fields = fields;
      }
      _Class.__super__.constructor.apply(this, arguments);
    }

    _Class.prototype.forward = function(document, collection, currentSchema, newSchema) {
      var count, counts, field, selector, update, value, _ref2, _ref3;
      selector = {
        _schema: currentSchema
      };
      _ref2 = this.fields;
      for (field in _ref2) {
        value = _ref2[field];
        selector[field] = {
          $exists: false
        };
      }
      update = {
        $set: {
          _schema: newSchema
        }
      };
      _ref3 = this.fields;
      for (field in _ref3) {
        value = _ref3[field];
        if (_.isFunction(value)) {
          update.$set[field] = value();
        } else {
          update.$set[field] = value;
        }
      }
      count = collection.update(selector, update, {
        multi: true
      });
      counts = _Class.__super__.forward.apply(this, arguments);
      counts.migrated += count;
      counts.all += count;
      return counts;
    };

    _Class.prototype.backward = function(document, collection, currentSchema, oldSchema) {
      var count, counts, field, update, value, _ref2;
      update = {
        $unset: {},
        $set: {
          _schema: oldSchema
        }
      };
      _ref2 = this.fields;
      for (field in _ref2) {
        value = _ref2[field];
        update.$unset[field] = '';
      }
      count = collection.update({
        _schema: currentSchema
      }, update, {
        multi: true
      });
      counts = _Class.__super__.backward.apply(this, arguments);
      counts.migrated += count;
      counts.all += count;
      return counts;
    };

    return _Class;

  })(Document.MinorMigration);

  Document.RemoveFieldsMigration = (function(_super1) {
    __extends(_Class, _super1);

    function _Class(fields) {
      this.backward = __bind(this.backward, this);
      this.forward = __bind(this.forward, this);
      if (fields) {
        this.fields = fields;
      }
      _Class.__super__.constructor.apply(this, arguments);
    }

    _Class.prototype.forward = function(document, collection, currentSchema, newSchema) {
      var count, counts, field, update, value, _ref2;
      update = {
        $unset: {},
        $set: {
          _schema: newSchema
        }
      };
      _ref2 = this.fields;
      for (field in _ref2) {
        value = _ref2[field];
        update.$unset[field] = '';
      }
      count = collection.update({
        _schema: currentSchema
      }, update, {
        multi: true
      });
      counts = _Class.__super__.forward.apply(this, arguments);
      counts.migrated += count;
      counts.all += count;
      return counts;
    };

    _Class.prototype.backward = function(document, collection, currentSchema, oldSchema) {
      var count, counts, field, selector, update, v, value, _ref2, _ref3;
      selector = {
        _schema: currentSchema
      };
      _ref2 = this.fields;
      for (field in _ref2) {
        value = _ref2[field];
        selector[field] = {
          $exists: false
        };
      }
      update = {
        $set: {
          _schema: oldSchema
        }
      };
      _ref3 = this.fields;
      for (field in _ref3) {
        value = _ref3[field];
        if (_.isFunction(value)) {
          v = value();
        } else {
          v = value;
        }
        if (!_.isUndefined(v)) {
          update.$set[field] = v;
        }
      }
      count = collection.update(selector, update, {
        multi: true
      });
      counts = _Class.__super__.backward.apply(this, arguments);
      counts.migrated += count;
      counts.all += count;
      return counts;
    };

    return _Class;

  })(Document.MajorMigration);

  Document.RenameFieldsMigration = (function(_super1) {
    __extends(_Class, _super1);

    function _Class(fields) {
      this.backward = __bind(this.backward, this);
      this.forward = __bind(this.forward, this);
      if (fields) {
        this.fields = fields;
      }
      _Class.__super__.constructor.apply(this, arguments);
    }

    _Class.prototype.forward = function(document, collection, currentSchema, newSchema) {
      var count, counts, from, to, update, _ref2;
      update = {
        $set: {
          _schema: newSchema
        },
        $rename: {}
      };
      _ref2 = this.fields;
      for (from in _ref2) {
        to = _ref2[from];
        update.$rename[from] = to;
      }
      count = collection.update({
        _schema: currentSchema
      }, update, {
        multi: true
      });
      counts = _Class.__super__.forward.apply(this, arguments);
      counts.migrated += count;
      counts.all += count;
      return counts;
    };

    _Class.prototype.backward = function(document, collection, currentSchema, oldSchema) {
      var count, counts, from, to, update, _ref2;
      update = {
        $set: {
          _schema: oldSchema
        },
        $rename: {}
      };
      _ref2 = this.fields;
      for (from in _ref2) {
        to = _ref2[from];
        update.$rename[to] = from;
      }
      count = collection.update({
        _schema: currentSchema
      }, update, {
        multi: true
      });
      counts = _Class.__super__.backward.apply(this, arguments);
      counts.migrated += count;
      counts.all += count;
      return counts;
    };

    return _Class;

  })(Document.MajorMigration);

  Document._RenameCollectionMigration = (function(_super1) {
    __extends(_Class, _super1);

    function _Class(oldName, newName) {
      this.oldName = oldName;
      this.newName = newName;
      this.backward = __bind(this.backward, this);
      this.forward = __bind(this.forward, this);
      this._rename = __bind(this._rename, this);
      this.name = "Renaming collection from '" + this.oldName + "' to '" + this.newName + "'";
    }

    _Class.prototype._rename = function(mongoCollection, to, callback) {
      return mongoCollection.rename(to, (function(_this) {
        return function(error, collection) {
          if (error) {
            if (!/source namespace does not exist/.test("" + error)) {
              return callback(error);
            }
          }
          return callback(null);
        };
      })(this));
    };

    _Class.prototype.forward = function(document, collection, currentSchema, newSchema) {
      var counts, future, mongoCollection;
      assert.equal(collection.name, this.oldName);
      mongoCollection = MongoInternals.defaultRemoteCollectionDriver().mongo._getCollection(this.oldName);
      future = new Future();
      this._rename(mongoCollection, this.newName, future.resolver());
      future.wait();
      collection.name = this.newName;
      counts = _Class.__super__.forward.apply(this, arguments);
      counts.migrated = counts.all;
      return counts;
    };

    _Class.prototype.backward = function(document, collection, currentSchema, newSchema) {
      var counts, future, mongoCollection;
      assert.equal(collection.name, this.newName);
      mongoCollection = MongoInternals.defaultRemoteCollectionDriver().mongo._getCollection(this.newName);
      future = new Future();
      this._rename(mongoCollection, this.oldName, future.resolver());
      future.wait();
      collection.name = this.oldName;
      counts = _Class.__super__.backward.apply(this, arguments);
      counts.migrated = counts.all;
      return counts;
    };

    return _Class;

  })(Document.MajorMigration);

  Document.addMigration = function(migration) {
    var _ref2;
    if (!migration.name) {
      throw new Error("Migration is missing a name");
    }
    if (!(migration instanceof this._Migration)) {
      throw new Error("Migration is not a migration instance");
    }
    if (_ref2 = migration.name, __indexOf.call(_.pluck(this.Meta.migrations, 'name'), _ref2) >= 0) {
      throw new Error("Migration with the name '" + migration.name + "' already exists");
    }
    return this.Meta.migrations.push(migration);
  };

  Document.renameCollectionMigration = function(oldName, newName) {
    return this.addMigration(new this._RenameCollectionMigration(oldName, newName));
  };

  Document.migrateForward = function(untilName) {
    throw new Error("Not implemented yet");
  };

  Document.migrateBackward = function(untilName) {
    throw new Error("Not implemented yet");
  };

  Document.migrate = function() {
    var count, counts, currentName, currentSchema, currentSerial, i, initialName, migration, migrations, migrationsPending, newName, newSchema, notMigrated, schemas, unknownSchema, updateAll, _i, _j, _k, _len, _len1, _ref2, _ref3, _ref4;
    schemas = ['1.0.0'];
    currentSchema = '1.0.0';
    currentSerial = 0;
    initialName = this.Meta.collection._name;
    _ref2 = this.Meta.migrations;
    for (_i = _ref2.length - 1; _i >= 0; _i += -1) {
      migration = _ref2[_i];
      if (!(migration instanceof this._RenameCollectionMigration)) {
        continue;
      }
      if (migration.newName !== initialName) {
        throw new Error("Incosistent document renaming, renaming from '" + migration.oldName + "' to '" + migration.newName + "', but current name is '" + initialName + "' (new name and current name should match)");
      }
      initialName = migration.oldName;
    }
    migrationsPending = Number.POSITIVE_INFINITY;
    currentName = initialName;
    _ref3 = this.Meta.migrations;
    for (i = _j = 0, _len = _ref3.length; _j < _len; i = ++_j) {
      migration = _ref3[i];
      if (migration instanceof this.PatchMigration) {
        newSchema = semver.inc(currentSchema, 'patch');
      } else if (migration instanceof this.MinorMigration) {
        newSchema = semver.inc(currentSchema, 'minor');
      } else if (migration instanceof this.MajorMigration) {
        newSchema = semver.inc(currentSchema, 'major');
      }
      if (migration instanceof this._RenameCollectionMigration) {
        newName = migration.newName;
      } else {
        newName = currentName;
      }
      migrations = globals.Document.Migrations.find({
        serial: {
          $gt: currentSerial
        },
        oldCollectionName: {
          $in: [currentName, newName]
        }
      }, {
        sort: [['serial', 'asc']]
      }).fetch();
      if (migrations[0]) {
        if (migrationsPending < Number.POSITIVE_INFINITY) {
          throw new Error("Unexpected migration recorded: " + (util.inspect(migrations[0], {
            depth: 10
          })));
        }
        if (migrations[0].migrationName === migration.name && migrations[0].oldCollectionName === currentName && migrations[0].newCollectionName === newName && migrations[0].oldVersion === currentSchema && migrations[0].newVersion === newSchema) {
          currentSerial = migrations[0].serial;
        } else {
          throw new Error("Incosistent migration recorded, expected migrationName='" + migration.name + "', oldCollectionName='" + currentName + "', newCollectionName='" + newName + "', oldVersion='" + currentSchema + "', newVersion='" + newSchema + "', got: " + (util.inspect(migrations[0], {
            depth: 10
          })));
        }
      } else if (migrationsPending === Number.POSITIVE_INFINITY) {
        initialName = currentName;
        migrationsPending = i;
      }
      currentSchema = newSchema;
      schemas.push(currentSchema);
      currentName = newName;
    }
    unknownSchema = _.pluck(this.Meta.collection.find({
      _schema: {
        $nin: schemas,
        $exists: true
      }
    }, {
      fields: {
        _id: 1
      }
    }).fetch(), '_id');
    if (unknownSchema.length) {
      throw new Error("Documents with unknown schema version: " + unknownSchema);
    }
    updateAll = false;
    currentSchema = '1.0.0';
    currentSerial = 0;
    currentName = initialName;
    _ref4 = this.Meta.migrations;
    for (i = _k = 0, _len1 = _ref4.length; _k < _len1; i = ++_k) {
      migration = _ref4[i];
      if (migration instanceof this.PatchMigration) {
        newSchema = semver.inc(currentSchema, 'patch');
      } else if (migration instanceof this.MinorMigration) {
        newSchema = semver.inc(currentSchema, 'minor');
      } else if (migration instanceof this.MajorMigration) {
        newSchema = semver.inc(currentSchema, 'major');
      }
      if (i < migrationsPending && migration instanceof this._RenameCollectionMigration) {
        currentSchema = newSchema;
        currentName = migration.newName;
        continue;
      }
      if (migration instanceof this._RenameCollectionMigration) {
        newName = migration.newName;
      } else {
        newName = currentName;
      }
      if (globals.Document.migrationsDisabled) {
        currentSchema = newSchema;
        currentName = newName;
        continue;
      }
      migration._updateAll = false;
      counts = migration.forward(this, new DirectCollection(currentName), currentSchema, newSchema);
      if (!('migrated' in counts && 'all' in counts)) {
        throw new Error("Invalid return value from migration: " + (util.inspect(counts)));
      }
      if (counts.migrated && migration._updateAll) {
        updateAll = true;
      }
      if (i < migrationsPending) {
        count = globals.Document.Migrations.update({
          migrationName: migration.name,
          oldCollectionName: currentName,
          newCollectionName: newName,
          oldVersion: currentSchema,
          newVersion: newSchema
        }, {
          $inc: {
            migrated: counts.migrated,
            all: counts.all
          }
        }, {
          multi: true
        });
        if (count !== 1) {
          throw new Error("Incosistent migration record state, missing migrationName='" + migration.name + "', oldCollectionName='" + currentName + "', newCollectionName='" + newName + "', oldVersion='" + currentSchema + "', newVersion='" + newSchema + "'");
        }
      } else {
        count = globals.Document.Migrations.find({
          migrationName: migration.name,
          oldCollectionName: currentName,
          newCollectionName: newName,
          oldVersion: currentSchema,
          newVersion: newSchema
        }).count();
        if (count !== 0) {
          throw new Error("Incosistent migration record state, unexpected migrationName='" + migration.name + "', oldCollectionName='" + currentName + "', newCollectionName='" + newName + "', oldVersion='" + currentSchema + "', newVersion='" + newSchema + "'");
        }
        globals.Document.Migrations.insert({
          serial: globals.Document.Migrations.findOne({}, {
            sort: [['serial', 'desc']]
          }).serial + 1,
          migrationName: migration.name,
          oldCollectionName: currentName,
          newCollectionName: newName,
          oldVersion: currentSchema,
          newVersion: newSchema,
          migrated: counts.migrated,
          all: counts.all,
          timestamp: moment.utc().toDate()
        });
      }
      if (migration instanceof this._RenameCollectionMigration) {
        Log.info("Renamed collection '" + currentName + "' to '" + newName + "'");
        if (counts.all) {
          Log.info("Migrated " + counts.migrated + "/" + counts.all + " document(s) (from " + currentSchema + " to " + newSchema + "): " + migration.name);
        }
      } else {
        if (counts.all) {
          Log.info("Migrated " + counts.migrated + "/" + counts.all + " document(s) in '" + currentName + "' collection (from " + currentSchema + " to " + newSchema + "): " + migration.name);
        }
      }
      currentSchema = newSchema;
      currentName = newName;
    }
    if (!globals.Document.migrationsDisabled) {
      this.Meta.collection.update({
        _schema: {
          $exists: false
        }
      }, {
        $set: {
          _schema: currentSchema
        }
      }, {
        multi: true
      });
      notMigrated = _.pluck(this.Meta.collection.find({
        _schema: {
          $ne: currentSchema
        }
      }, {
        fields: {
          _id: 1
        }
      }).fetch(), '_id');
      if (notMigrated.length) {
        throw new Error("Not all documents migrated to the latest schema version (" + currentSchema + "): " + notMigrated);
      }
    }
    this.Meta.schema = currentSchema;
    return updateAll;
  };

  Document._setupMigrations = function() {
    var updateAll;
    updateAll = this.migrate();
    if (!globals.Document.instanceDisabled) {
      this.Meta.collection.find({
        _schema: {
          $exists: false
        }
      }, {
        fields: {
          _id: 1,
          _schema: 1
        }
      }).observeChanges({
        added: observerCallback((function(_this) {
          return function(id, fields) {
            if (fields._schema) {
              return;
            }
            return _this.Meta.collection.update(id, {
              $set: {
                _schema: _this.Meta.schema
              }
            });
          };
        })(this))
      });
    }
    return updateAll;
  };

  Document.updateAll = function() {
    if (!globals.Document.instanceDisabled) {
      return setupObservers(true);
    }
  };

  return Document;

})(globals.Document);

setupObservers = function(updateAll) {
  var document, setupTargetObservers, setupTriggerObserves, _i, _len, _ref2, _results;
  setupTriggerObserves = function(triggers) {
    var name, trigger, _results;
    _results = [];
    for (name in triggers) {
      trigger = triggers[name];
      _results.push(trigger._setupObservers());
    }
    return _results;
  };
  setupTargetObservers = function(fields) {
    var field, name, _results;
    _results = [];
    for (name in fields) {
      field = fields[name];
      if (field instanceof globals.Document._TargetedFieldsObservingField) {
        _results.push(field._setupTargetObservers(updateAll));
      } else if (!(field instanceof globals.Document._Field)) {
        _results.push(setupTargetObservers(field));
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  };
  _ref2 = globals.Document.list;
  _results = [];
  for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
    document = _ref2[_i];
    if (!updateAll) {
      setupTriggerObserves(document.Meta.triggers);
    }
    setupTargetObservers(document.Meta.fields);
    _results.push(document._setupSourceObservers(updateAll));
  }
  return _results;
};

setupMigrations = function() {
  var document, updateAll, _i, _len, _ref2;
  updateAll = false;
  _ref2 = globals.Document.list;
  for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
    document = _ref2[_i];
    if (document.Meta.collection._name !== null) {
      updateAll = document._setupMigrations() || updateAll;
    }
  }
  if (updateAll) {
    Log.info("Migrations requested updating all references...");
    globals.Document.updateAll();
    return Log.info("Done");
  }
};

migrations = function() {
  if (globals.Document.Migrations.find({}, {
    limit: 1
  }).count() === 0) {
    globals.Document.Migrations.insert({
      serial: 1,
      migrationName: null,
      oldCollectionName: null,
      newCollectionName: null,
      oldVersion: null,
      newVersion: null,
      timestamp: moment.utc().toDate(),
      migrated: 0,
      all: 0
    });
  }
  return setupMigrations();
};

globals.Document.migrationsDisabled = !!process.env.PEERDB_MIGRATIONS_DISABLED;

globals.Document.instanceDisabled = INSTANCES === 0;

globals.Document.instances = INSTANCES;

Meteor.startup(function() {
  globals.Document.defineAll();
  if (globals.Document.migrationsDisabled) {
    Log.info("Skipped migrations");
  }
  migrations();
  if (globals.Document.instanceDisabled) {
    Log.info("Skipped observers");
    return PREFIX = [];
  } else {
    if (globals.Document.instances === 1) {
      Log.info("Enabling observers...");
    } else {
      Log.info("Enabling observers, instance " + INSTANCE + "/" + globals.Document.instances + ", matching ID prefix: " + (PREFIX.join('')));
    }
    setupObservers();
    return Log.info("Done");
  }
});

Document = globals.Document;

assert(globals.Document._ReferenceField.prototype instanceof globals.Document._TargetedFieldsObservingField);

assert(globals.Document._GeneratedField.prototype instanceof globals.Document._TargetedFieldsObservingField);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);
