(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages\peerdb\tests_defined.js                                                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
Tinytest.add('peerdb - defined', function (test) {                                                                     // 1
  var isDefined = false;                                                                                               // 2
  try {                                                                                                                // 3
    Document;                                                                                                          // 4
    isDefined = true;                                                                                                  // 5
  }                                                                                                                    // 6
  catch (e) {                                                                                                          // 7
  }                                                                                                                    // 8
  test.isTrue(isDefined, "Document is not defined");                                                                   // 9
  test.isTrue(Package.peerdb.Document, "Package.peerdb.Document is not defined");                                      // 10
});                                                                                                                    // 11
                                                                                                                       // 12
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages\peerdb\tests.coffee.js                                                                                     //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var ALL, CircularFirst, CircularSecond, IdentityGenerator, Person, Post, PostLink, Recursive, RecursiveBase, SpecialPerson, SpecialPost, User, UserLink, WAIT_TIME, globalTestTriggerCounters, intersectionObjects, plainObject, testDefinition, testDocumentList, testSetEqual, _TestCircularFirst, _TestPerson, _TestPost, _TestPost2, _TestPostLink, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  __slice = [].slice;

if (Meteor.isServer) {
  __meteor_runtime_config__.WAIT_TIME = WAIT_TIME = (typeof process !== "undefined" && process !== null ? (_ref = process.env) != null ? _ref.WAIT_TIME : void 0 : void 0) || 1000;
} else {
  WAIT_TIME = (typeof __meteor_runtime_config__ !== "undefined" && __meteor_runtime_config__ !== null ? __meteor_runtime_config__.WAIT_TIME : void 0) || 1000;
}

assert.equal(Document._delayed.length, 0);

assert(_.isEqual(Document.list, []));

assert(_.isEqual(Document._collections, {}));

if (Meteor.isServer) {
  globalTestTriggerCounters = {};
}

Post = (function(_super) {
  __extends(Post, _super);

  function Post() {
    return Post.__super__.constructor.apply(this, arguments);
  }

  Post.Meta({
    name: 'Post',
    fields: function() {
      return {
        author: Post.ReferenceField(Person, ['username', 'displayName', 'field1', 'field2'], true, 'posts', ['body', 'subdocument.body', 'nested.body']),
        subscribers: [Post.ReferenceField(Person)],
        reviewers: [
          Post.ReferenceField(Person, [
            {
              username: 1
            }
          ])
        ],
        subdocument: {
          person: Post.ReferenceField(Person, ['username', 'displayName', 'field1', 'field2'], false, 'subdocumentPosts', ['body', 'subdocument.body', 'nested.body']),
          slug: Post.GeneratedField('self', ['body', 'subdocument.body'], function(fields) {
            var _ref1;
            if (_.isUndefined(fields.body) || _.isUndefined((_ref1 = fields.subdocument) != null ? _ref1.body : void 0)) {
              return [fields._id, void 0];
            } else if (_.isNull(fields.body) || _.isNull(fields.subdocument.body)) {
              return [fields._id, null];
            } else {
              return [fields._id, "subdocument-prefix-" + (fields.body.toLowerCase()) + "-" + (fields.subdocument.body.toLowerCase()) + "-suffix"];
            }
          })
        },
        nested: [
          {
            required: Post.ReferenceField(Person, ['username', 'displayName', 'field1', 'field2'], true, 'nestedPosts', ['body', 'subdocument.body', 'nested.body']),
            optional: Post.ReferenceField(Person, ['username'], false),
            slug: Post.GeneratedField('self', ['body', 'nested.body'], function(fields) {
              var nested, _i, _len, _ref1, _results;
              _ref1 = fields.nested || [];
              _results = [];
              for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
                nested = _ref1[_i];
                if (_.isUndefined(fields.body) || _.isUndefined(nested.body)) {
                  _results.push([fields._id, void 0]);
                } else if (_.isNull(fields.body) || _.isNull(nested.body)) {
                  _results.push([fields._id, null]);
                } else {
                  _results.push([fields._id, "nested-prefix-" + (fields.body.toLowerCase()) + "-" + (nested.body.toLowerCase()) + "-suffix"]);
                }
              }
              return _results;
            })
          }
        ],
        slug: Post.GeneratedField('self', ['body', 'subdocument.body'], function(fields) {
          var _ref1;
          if (_.isUndefined(fields.body) || _.isUndefined((_ref1 = fields.subdocument) != null ? _ref1.body : void 0)) {
            return [fields._id, void 0];
          } else if (_.isNull(fields.body) || _.isNull(fields.subdocument.body)) {
            return [fields._id, null];
          } else {
            return [fields._id, "prefix-" + (fields.body.toLowerCase()) + "-" + (fields.subdocument.body.toLowerCase()) + "-suffix"];
          }
        }),
        tags: [
          Post.GeneratedField('self', ['body', 'subdocument.body', 'nested.body'], function(fields) {
            var nested, tags, _i, _len, _ref1, _ref2;
            tags = [];
            if (fields.body && ((_ref1 = fields.subdocument) != null ? _ref1.body : void 0)) {
              tags.push("tag-" + tags.length + "-prefix-" + (fields.body.toLowerCase()) + "-" + (fields.subdocument.body.toLowerCase()) + "-suffix");
            }
            if (fields.body && fields.nested && _.isArray(fields.nested)) {
              _ref2 = fields.nested;
              for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
                nested = _ref2[_i];
                if (nested.body) {
                  tags.push("tag-" + tags.length + "-prefix-" + (fields.body.toLowerCase()) + "-" + (nested.body.toLowerCase()) + "-suffix");
                }
              }
            }
            return [fields._id, tags];
          })
        ]
      };
    },
    triggers: function() {
      return {
        testTrigger: Post.Trigger(['body'], function(newDocument, oldDocument) {
          if (!newDocument._id) {
            return;
          }
          return globalTestTriggerCounters[newDocument._id] = (globalTestTriggerCounters[newDocument._id] || 0) + 1;
        })
      };
    }
  });

  return Post;

})(Document);

_TestPost = Post;

Post = (function(_super) {
  __extends(Post, _super);

  function Post() {
    return Post.__super__.constructor.apply(this, arguments);
  }

  Post.Meta({
    name: 'Post',
    replaceParent: true,
    fields: function(fields) {
      fields.subdocument.persons = [Post.ReferenceField(Person, ['username', 'displayName', 'field1', 'field2'], true, 'subdocumentsPosts', ['body', 'subdocument.body', 'nested.body'])];
      return fields;
    }
  });

  return Post;

})(Post);

_TestPost2 = Post;

User = (function(_super) {
  __extends(User, _super);

  function User() {
    return User.__super__.constructor.apply(this, arguments);
  }

  User.Meta({
    name: 'User',
    collection: Meteor.users
  });

  return User;

})(Document);

UserLink = (function(_super) {
  __extends(UserLink, _super);

  function UserLink() {
    return UserLink.__super__.constructor.apply(this, arguments);
  }

  UserLink.Meta({
    name: 'UserLink',
    fields: function() {
      return {
        user: UserLink.ReferenceField(User, ['username'], false)
      };
    }
  });

  return UserLink;

})(Document);

PostLink = (function(_super) {
  __extends(PostLink, _super);

  function PostLink() {
    return PostLink.__super__.constructor.apply(this, arguments);
  }

  PostLink.Meta({
    name: 'PostLink'
  });

  return PostLink;

})(Document);

_TestPostLink = PostLink;

PostLink = (function(_super) {
  __extends(PostLink, _super);

  function PostLink() {
    return PostLink.__super__.constructor.apply(this, arguments);
  }

  PostLink.Meta({
    name: 'PostLink',
    replaceParent: true,
    fields: function() {
      return {
        post: PostLink.ReferenceField(Post, ['subdocument.person', 'subdocument.persons'])
      };
    }
  });

  return PostLink;

})(PostLink);

CircularFirst = (function(_super) {
  __extends(CircularFirst, _super);

  function CircularFirst() {
    return CircularFirst.__super__.constructor.apply(this, arguments);
  }

  CircularFirst.Meta({
    name: 'CircularFirst'
  });

  return CircularFirst;

})(Document);

_TestCircularFirst = CircularFirst;

CircularFirst = (function(_super) {
  __extends(CircularFirst, _super);

  function CircularFirst() {
    return CircularFirst.__super__.constructor.apply(this, arguments);
  }

  CircularFirst.Meta({
    name: 'CircularFirst',
    replaceParent: true,
    fields: function(fields) {
      fields.second = CircularFirst.ReferenceField(CircularSecond, ['content'], true, 'reverseFirsts', ['content']);
      return fields;
    }
  });

  return CircularFirst;

})(CircularFirst);

CircularSecond = (function(_super) {
  __extends(CircularSecond, _super);

  function CircularSecond() {
    return CircularSecond.__super__.constructor.apply(this, arguments);
  }

  CircularSecond.Meta({
    name: 'CircularSecond',
    fields: function() {
      return {
        first: CircularSecond.ReferenceField(CircularFirst, ['content'], false, 'reverseSeconds', ['content'])
      };
    }
  });

  return CircularSecond;

})(Document);

Person = (function(_super) {
  __extends(Person, _super);

  function Person() {
    return Person.__super__.constructor.apply(this, arguments);
  }

  Person.Meta({
    name: 'Person',
    fields: function() {
      return {
        count: Person.GeneratedField('self', ['posts', 'subdocumentPosts', 'subdocumentsPosts', 'nestedPosts'], function(fields) {
          var _ref1, _ref2, _ref3, _ref4;
          return [fields._id, (((_ref1 = fields.posts) != null ? _ref1.length : void 0) || 0) + (((_ref2 = fields.nestedPosts) != null ? _ref2.length : void 0) || 0) + (((_ref3 = fields.subdocumentPosts) != null ? _ref3.length : void 0) || 0) + (((_ref4 = fields.subdocumentsPosts) != null ? _ref4.length : void 0) || 0)];
        })
      };
    }
  });

  return Person;

})(Document);

_TestPerson = Person;

Person = (function(_super) {
  __extends(Person, _super);

  function Person() {
    return Person.__super__.constructor.apply(this, arguments);
  }

  Person.Meta({
    name: 'Person',
    replaceParent: true
  });

  Person.prototype.formatName = function() {
    return "" + this.username + "-" + (this.displayName || "none");
  };

  return Person;

})(Person);

SpecialPerson = (function(_super) {
  __extends(SpecialPerson, _super);

  function SpecialPerson() {
    return SpecialPerson.__super__.constructor.apply(this, arguments);
  }

  SpecialPerson.Meta({
    name: 'SpecialPerson',
    fields: function() {
      return {
        count: void 0
      };
    }
  });

  return SpecialPerson;

})(Person);

RecursiveBase = (function(_super) {
  __extends(RecursiveBase, _super);

  function RecursiveBase() {
    return RecursiveBase.__super__.constructor.apply(this, arguments);
  }

  RecursiveBase.Meta({
    abstract: true,
    fields: function() {
      return {
        other: RecursiveBase.ReferenceField('self', ['content'], false, 'reverse', ['content'])
      };
    }
  });

  return RecursiveBase;

})(Document);

Recursive = (function(_super) {
  __extends(Recursive, _super);

  function Recursive() {
    return Recursive.__super__.constructor.apply(this, arguments);
  }

  Recursive.Meta({
    name: 'Recursive'
  });

  return Recursive;

})(RecursiveBase);

IdentityGenerator = (function(_super) {
  __extends(IdentityGenerator, _super);

  function IdentityGenerator() {
    return IdentityGenerator.__super__.constructor.apply(this, arguments);
  }

  IdentityGenerator.Meta({
    name: 'IdentityGenerator',
    fields: function() {
      return {
        result: IdentityGenerator.GeneratedField('self', ['source'], function(fields) {
          if (fields.source === 'exception') {
            throw new Error("Test exception");
          }
          return [fields._id, fields.source];
        }),
        results: [
          IdentityGenerator.GeneratedField('self', ['source'], function(fields) {
            return [fields._id, fields.source];
          })
        ]
      };
    }
  });

  return IdentityGenerator;

})(Document);

SpecialPost = (function(_super) {
  __extends(SpecialPost, _super);

  function SpecialPost() {
    return SpecialPost.__super__.constructor.apply(this, arguments);
  }

  SpecialPost.Meta({
    name: 'SpecialPost',
    fields: function() {
      return {
        special: SpecialPost.ReferenceField(Person)
      };
    }
  });

  return SpecialPost;

})(Post);

Post = (function(_super) {
  __extends(Post, _super);

  function Post() {
    return Post.__super__.constructor.apply(this, arguments);
  }

  Post.Meta({
    name: 'Post',
    replaceParent: true
  });

  return Post;

})(Post);

Document.defineAll();

assert.equal(Document._delayed.length, 0);

if (Meteor.isServer) {
  Post.documents.remove({});
  User.documents.remove({});
  UserLink.documents.remove({});
  PostLink.documents.remove({});
  CircularFirst.documents.remove({});
  CircularSecond.documents.remove({});
  Person.documents.remove({});
  Recursive.documents.remove({});
  IdentityGenerator.documents.remove({});
  SpecialPost.documents.remove({});
  Meteor.publish(null, function() {
    return Post.documents.find();
  });
  Meteor.publish(null, function() {
    return UserLink.documents.find();
  });
  Meteor.publish(null, function() {
    return PostLink.documents.find();
  });
  Meteor.publish(null, function() {
    return CircularFirst.documents.find();
  });
  Meteor.publish(null, function() {
    return CircularSecond.documents.find();
  });
  Meteor.publish(null, function() {
    return Person.documents.find();
  });
  Meteor.publish(null, function() {
    return Recursive.documents.find();
  });
  Meteor.publish(null, function() {
    return IdentityGenerator.documents.find();
  });
  Meteor.publish(null, function() {
    return SpecialPost.documents.find();
  });
}

ALL = this.ALL = [User, UserLink, CircularFirst, CircularSecond, SpecialPerson, Recursive, IdentityGenerator, SpecialPost, Post, Person, PostLink];

testDocumentList = function(test, list) {
  var d;
  return test.equal(Document.list, list, "expected: " + ((function() {
    var _i, _len, _results;
    _results = [];
    for (_i = 0, _len = list.length; _i < _len; _i++) {
      d = list[_i];
      _results.push(d.Meta._name);
    }
    return _results;
  })()) + " vs. actual: " + ((function() {
    var _i, _len, _ref1, _results;
    _ref1 = Document.list;
    _results = [];
    for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
      d = _ref1[_i];
      _results.push(d.Meta._name);
    }
    return _results;
  })()));
};

intersectionObjects = function() {
  var array, rest;
  array = arguments[0], rest = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
  return _.filter(_.uniq(array), function(item) {
    return _.every(rest, function(other) {
      return _.any(other, function(element) {
        return _.isEqual(element, item);
      });
    });
  });
};

testSetEqual = function(test, a, b) {
  a || (a = []);
  b || (b = []);
  if (a.length === b.length && intersectionObjects(a, b).length === a.length) {
    return test.ok();
  } else {
    return test.fail({
      type: 'assert_set_equal',
      actual: JSON.stringify(a),
      expected: JSON.stringify(b)
    });
  }
};

testDefinition = function(test) {
  test.equal(Post.Meta._name, 'Post');
  test.equal(Post.Meta.parent, _TestPost2.Meta);
  test.equal(Post.Meta.document, Post);
  test.equal(Post.Meta.collection._name, 'Posts');
  if (Meteor.isServer) {
    test.equal(Post.Meta.schema, '1.0.0');
  }
  if (Meteor.isServer) {
    test.equal(Post.Meta.migrations, []);
  }
  test.equal(_.size(Post.Meta.triggers), 1);
  test.instanceOf(Post.Meta.triggers.testTrigger, Post._Trigger);
  test.equal(Post.Meta.triggers.testTrigger.name, 'testTrigger');
  test.equal(Post.Meta.triggers.testTrigger.document, Post);
  test.equal(Post.Meta.triggers.testTrigger.collection._name, 'Posts');
  test.equal(Post.Meta.triggers.testTrigger.fields, ['body']);
  test.equal(_.size(Post.Meta.fields), 7);
  test.instanceOf(Post.Meta.fields.author, Post._ReferenceField);
  test.isNull(Post.Meta.fields.author.ancestorArray, Post.Meta.fields.author.ancestorArray);
  test.isTrue(Post.Meta.fields.author.required);
  test.equal(Post.Meta.fields.author.sourcePath, 'author');
  test.equal(Post.Meta.fields.author.sourceDocument, Post);
  test.equal(Post.Meta.fields.author.targetDocument, Person);
  test.equal(Post.Meta.fields.author.sourceCollection._name, 'Posts');
  test.equal(Post.Meta.fields.author.targetCollection._name, 'Persons');
  test.equal(Post.Meta.fields.author.sourceDocument.Meta.collection._name, 'Posts');
  test.equal(Post.Meta.fields.author.targetDocument.Meta.collection._name, 'Persons');
  test.equal(Post.Meta.fields.author.fields, ['username', 'displayName', 'field1', 'field2']);
  test.equal(Post.Meta.fields.author.reverseName, 'posts');
  test.equal(Post.Meta.fields.author.reverseFields, ['body', 'subdocument.body', 'nested.body']);
  test.instanceOf(Post.Meta.fields.subscribers, Post._ReferenceField);
  test.equal(Post.Meta.fields.subscribers.ancestorArray, 'subscribers');
  test.isTrue(Post.Meta.fields.subscribers.required);
  test.equal(Post.Meta.fields.subscribers.sourcePath, 'subscribers');
  test.equal(Post.Meta.fields.subscribers.sourceDocument, Post);
  test.equal(Post.Meta.fields.subscribers.targetDocument, Person);
  test.equal(Post.Meta.fields.subscribers.sourceCollection._name, 'Posts');
  test.equal(Post.Meta.fields.subscribers.targetCollection._name, 'Persons');
  test.equal(Post.Meta.fields.subscribers.sourceDocument.Meta.collection._name, 'Posts');
  test.equal(Post.Meta.fields.subscribers.targetDocument.Meta.collection._name, 'Persons');
  test.equal(Post.Meta.fields.subscribers.fields, []);
  test.isNull(Post.Meta.fields.subscribers.reverseName);
  test.equal(Post.Meta.fields.subscribers.reverseFields, []);
  test.instanceOf(Post.Meta.fields.reviewers, Post._ReferenceField);
  test.equal(Post.Meta.fields.reviewers.ancestorArray, 'reviewers');
  test.isTrue(Post.Meta.fields.reviewers.required);
  test.equal(Post.Meta.fields.reviewers.sourcePath, 'reviewers');
  test.equal(Post.Meta.fields.reviewers.sourceDocument, Post);
  test.equal(Post.Meta.fields.reviewers.targetDocument, Person);
  test.equal(Post.Meta.fields.reviewers.sourceCollection._name, 'Posts');
  test.equal(Post.Meta.fields.reviewers.targetCollection._name, 'Persons');
  test.equal(Post.Meta.fields.reviewers.sourceDocument.Meta.collection._name, 'Posts');
  test.equal(Post.Meta.fields.reviewers.targetDocument.Meta.collection._name, 'Persons');
  test.equal(Post.Meta.fields.reviewers.fields, [
    {
      username: 1
    }
  ]);
  test.isNull(Post.Meta.fields.reviewers.reverseName);
  test.equal(Post.Meta.fields.reviewers.reverseFields, []);
  test.equal(_.size(Post.Meta.fields.subdocument), 3);
  test.instanceOf(Post.Meta.fields.subdocument.person, Post._ReferenceField);
  test.isNull(Post.Meta.fields.subdocument.person.ancestorArray, Post.Meta.fields.subdocument.person.ancestorArray);
  test.isFalse(Post.Meta.fields.subdocument.person.required);
  test.equal(Post.Meta.fields.subdocument.person.sourcePath, 'subdocument.person');
  test.equal(Post.Meta.fields.subdocument.person.sourceDocument, Post);
  test.equal(Post.Meta.fields.subdocument.person.targetDocument, Person);
  test.equal(Post.Meta.fields.subdocument.person.sourceCollection._name, 'Posts');
  test.equal(Post.Meta.fields.subdocument.person.targetCollection._name, 'Persons');
  test.equal(Post.Meta.fields.subdocument.person.sourceDocument.Meta.collection._name, 'Posts');
  test.equal(Post.Meta.fields.subdocument.person.targetDocument.Meta.collection._name, 'Persons');
  test.equal(Post.Meta.fields.subdocument.person.fields, ['username', 'displayName', 'field1', 'field2']);
  test.equal(Post.Meta.fields.subdocument.person.reverseName, 'subdocumentPosts');
  test.equal(Post.Meta.fields.subdocument.person.reverseFields, ['body', 'subdocument.body', 'nested.body']);
  test.instanceOf(Post.Meta.fields.subdocument.persons, Post._ReferenceField);
  test.equal(Post.Meta.fields.subdocument.persons.ancestorArray, 'subdocument.persons');
  test.isTrue(Post.Meta.fields.subdocument.persons.required);
  test.equal(Post.Meta.fields.subdocument.persons.sourcePath, 'subdocument.persons');
  test.equal(Post.Meta.fields.subdocument.persons.sourceDocument, Post);
  test.equal(Post.Meta.fields.subdocument.persons.targetDocument, Person);
  test.equal(Post.Meta.fields.subdocument.persons.sourceCollection._name, 'Posts');
  test.equal(Post.Meta.fields.subdocument.persons.targetCollection._name, 'Persons');
  test.equal(Post.Meta.fields.subdocument.persons.sourceDocument.Meta.collection._name, 'Posts');
  test.equal(Post.Meta.fields.subdocument.persons.targetDocument.Meta.collection._name, 'Persons');
  test.equal(Post.Meta.fields.subdocument.persons.fields, ['username', 'displayName', 'field1', 'field2']);
  test.equal(Post.Meta.fields.subdocument.persons.reverseName, 'subdocumentsPosts');
  test.equal(Post.Meta.fields.subdocument.persons.reverseFields, ['body', 'subdocument.body', 'nested.body']);
  test.instanceOf(Post.Meta.fields.subdocument.slug, Post._GeneratedField);
  test.isNull(Post.Meta.fields.subdocument.slug.ancestorArray, Post.Meta.fields.subdocument.slug.ancestorArray);
  test.isTrue(_.isFunction(Post.Meta.fields.subdocument.slug.generator));
  test.equal(Post.Meta.fields.subdocument.slug.sourcePath, 'subdocument.slug');
  test.equal(Post.Meta.fields.subdocument.slug.sourceDocument, Post);
  test.equal(Post.Meta.fields.subdocument.slug.targetDocument, Post);
  test.equal(Post.Meta.fields.subdocument.slug.sourceCollection._name, 'Posts');
  test.equal(Post.Meta.fields.subdocument.slug.targetCollection._name, 'Posts');
  test.equal(Post.Meta.fields.subdocument.slug.sourceDocument.Meta.collection._name, 'Posts');
  test.equal(Post.Meta.fields.subdocument.slug.targetDocument.Meta.collection._name, 'Posts');
  test.equal(Post.Meta.fields.subdocument.slug.fields, ['body', 'subdocument.body']);
  test.isUndefined(Post.Meta.fields.subdocument.slug.reverseName);
  test.isUndefined(Post.Meta.fields.subdocument.slug.reverseFields);
  test.equal(_.size(Post.Meta.fields.nested), 3);
  test.instanceOf(Post.Meta.fields.nested.required, Post._ReferenceField);
  test.equal(Post.Meta.fields.nested.required.ancestorArray, 'nested');
  test.isTrue(Post.Meta.fields.nested.required.required);
  test.equal(Post.Meta.fields.nested.required.sourcePath, 'nested.required');
  test.equal(Post.Meta.fields.nested.required.sourceDocument, Post);
  test.equal(Post.Meta.fields.nested.required.targetDocument, Person);
  test.equal(Post.Meta.fields.nested.required.sourceCollection._name, 'Posts');
  test.equal(Post.Meta.fields.nested.required.targetCollection._name, 'Persons');
  test.equal(Post.Meta.fields.nested.required.sourceDocument.Meta.collection._name, 'Posts');
  test.equal(Post.Meta.fields.nested.required.targetDocument.Meta.collection._name, 'Persons');
  test.equal(Post.Meta.fields.nested.required.fields, ['username', 'displayName', 'field1', 'field2']);
  test.equal(Post.Meta.fields.nested.required.reverseName, 'nestedPosts');
  test.equal(Post.Meta.fields.nested.required.reverseFields, ['body', 'subdocument.body', 'nested.body']);
  test.instanceOf(Post.Meta.fields.nested.optional, Post._ReferenceField);
  test.equal(Post.Meta.fields.nested.optional.ancestorArray, 'nested');
  test.isFalse(Post.Meta.fields.nested.optional.required);
  test.equal(Post.Meta.fields.nested.optional.sourcePath, 'nested.optional');
  test.equal(Post.Meta.fields.nested.optional.sourceDocument, Post);
  test.equal(Post.Meta.fields.nested.optional.targetDocument, Person);
  test.equal(Post.Meta.fields.nested.optional.sourceCollection._name, 'Posts');
  test.equal(Post.Meta.fields.nested.optional.targetCollection._name, 'Persons');
  test.equal(Post.Meta.fields.nested.optional.sourceDocument.Meta.collection._name, 'Posts');
  test.equal(Post.Meta.fields.nested.optional.targetDocument.Meta.collection._name, 'Persons');
  test.equal(Post.Meta.fields.nested.optional.fields, ['username']);
  test.isNull(Post.Meta.fields.nested.optional.reverseName);
  test.equal(Post.Meta.fields.nested.optional.reverseFields, []);
  test.instanceOf(Post.Meta.fields.nested.slug, Post._GeneratedField);
  test.equal(Post.Meta.fields.nested.slug.ancestorArray, 'nested');
  test.isTrue(_.isFunction(Post.Meta.fields.nested.slug.generator));
  test.equal(Post.Meta.fields.nested.slug.sourcePath, 'nested.slug');
  test.equal(Post.Meta.fields.nested.slug.sourceDocument, Post);
  test.equal(Post.Meta.fields.nested.slug.targetDocument, Post);
  test.equal(Post.Meta.fields.nested.slug.sourceCollection._name, 'Posts');
  test.equal(Post.Meta.fields.nested.slug.targetCollection._name, 'Posts');
  test.equal(Post.Meta.fields.nested.slug.sourceDocument.Meta.collection._name, 'Posts');
  test.equal(Post.Meta.fields.nested.slug.targetDocument.Meta.collection._name, 'Posts');
  test.equal(Post.Meta.fields.nested.slug.fields, ['body', 'nested.body']);
  test.isUndefined(Post.Meta.fields.nested.slug.reverseName);
  test.isUndefined(Post.Meta.fields.nested.slug.reverseFields);
  test.instanceOf(Post.Meta.fields.slug, Post._GeneratedField);
  test.isNull(Post.Meta.fields.slug.ancestorArray, Post.Meta.fields.slug.ancestorArray);
  test.isTrue(_.isFunction(Post.Meta.fields.slug.generator));
  test.equal(Post.Meta.fields.slug.sourcePath, 'slug');
  test.equal(Post.Meta.fields.slug.sourceDocument, Post);
  test.equal(Post.Meta.fields.slug.targetDocument, Post);
  test.equal(Post.Meta.fields.slug.sourceCollection._name, 'Posts');
  test.equal(Post.Meta.fields.slug.targetCollection._name, 'Posts');
  test.equal(Post.Meta.fields.slug.sourceDocument.Meta.collection._name, 'Posts');
  test.equal(Post.Meta.fields.slug.targetDocument.Meta.collection._name, 'Posts');
  test.equal(Post.Meta.fields.slug.fields, ['body', 'subdocument.body']);
  test.isUndefined(Post.Meta.fields.slug.reverseName);
  test.isUndefined(Post.Meta.fields.slug.reverseFields);
  test.instanceOf(Post.Meta.fields.tags, Post._GeneratedField);
  test.equal(Post.Meta.fields.tags.ancestorArray, 'tags');
  test.isTrue(_.isFunction(Post.Meta.fields.tags.generator));
  test.equal(Post.Meta.fields.tags.sourcePath, 'tags');
  test.equal(Post.Meta.fields.tags.sourceDocument, Post);
  test.equal(Post.Meta.fields.tags.targetDocument, Post);
  test.equal(Post.Meta.fields.tags.sourceCollection._name, 'Posts');
  test.equal(Post.Meta.fields.tags.targetCollection._name, 'Posts');
  test.equal(Post.Meta.fields.tags.sourceDocument.Meta.collection._name, 'Posts');
  test.equal(Post.Meta.fields.tags.targetDocument.Meta.collection._name, 'Posts');
  test.equal(Post.Meta.fields.tags.fields, ['body', 'subdocument.body', 'nested.body']);
  test.isUndefined(Post.Meta.fields.tags.reverseName);
  test.isUndefined(Post.Meta.fields.tags.reverseFields);
  test.equal(User.Meta._name, 'User');
  test.isFalse(User.Meta.parent);
  test.equal(User.Meta.document, User);
  test.equal(User.Meta.collection._name, 'users');
  if (Meteor.isServer) {
    test.equal(User.Meta.schema, '1.0.0');
  }
  if (Meteor.isServer) {
    test.equal(User.Meta.migrations, []);
  }
  test.equal(_.size(User.Meta.triggers), 0);
  test.equal(_.size(User.Meta.fields), 0);
  test.equal(UserLink.Meta._name, 'UserLink');
  test.isFalse(UserLink.Meta.parent);
  test.equal(UserLink.Meta.document, UserLink);
  test.equal(UserLink.Meta.collection._name, 'UserLinks');
  if (Meteor.isServer) {
    test.equal(UserLink.Meta.schema, '1.0.0');
  }
  if (Meteor.isServer) {
    test.equal(UserLink.Meta.migrations, []);
  }
  test.equal(_.size(UserLink.Meta.triggers), 0);
  test.equal(_.size(UserLink.Meta.fields), 1);
  test.instanceOf(UserLink.Meta.fields.user, UserLink._ReferenceField);
  test.isNull(UserLink.Meta.fields.user.ancestorArray, UserLink.Meta.fields.user.ancestorArray);
  test.isFalse(UserLink.Meta.fields.user.required);
  test.equal(UserLink.Meta.fields.user.sourcePath, 'user');
  test.equal(UserLink.Meta.fields.user.sourceDocument, UserLink);
  test.equal(UserLink.Meta.fields.user.targetDocument, User);
  test.equal(UserLink.Meta.fields.user.sourceCollection._name, 'UserLinks');
  test.equal(UserLink.Meta.fields.user.targetCollection._name, 'users');
  test.equal(UserLink.Meta.fields.user.sourceDocument.Meta.collection._name, 'UserLinks');
  test.equal(UserLink.Meta.fields.user.fields, ['username']);
  test.isNull(UserLink.Meta.fields.user.reverseName);
  test.equal(UserLink.Meta.fields.user.reverseFields, []);
  test.equal(PostLink.Meta._name, 'PostLink');
  test.equal(PostLink.Meta.parent, _TestPostLink.Meta);
  test.equal(PostLink.Meta.document, PostLink);
  test.equal(PostLink.Meta.collection._name, 'PostLinks');
  if (Meteor.isServer) {
    test.equal(PostLink.Meta.schema, '1.0.0');
  }
  if (Meteor.isServer) {
    test.equal(PostLink.Meta.migrations, []);
  }
  test.equal(_.size(PostLink.Meta.triggers), 0);
  test.equal(_.size(PostLink.Meta.fields), 1);
  test.instanceOf(PostLink.Meta.fields.post, PostLink._ReferenceField);
  test.isNull(PostLink.Meta.fields.post.ancestorArray, PostLink.Meta.fields.post.ancestorArray);
  test.isTrue(PostLink.Meta.fields.post.required);
  test.equal(PostLink.Meta.fields.post.sourcePath, 'post');
  test.equal(PostLink.Meta.fields.post.sourceDocument, PostLink);
  test.equal(PostLink.Meta.fields.post.targetDocument, Post);
  test.equal(PostLink.Meta.fields.post.sourceCollection._name, 'PostLinks');
  test.equal(PostLink.Meta.fields.post.targetCollection._name, 'Posts');
  test.equal(PostLink.Meta.fields.post.sourceDocument.Meta.collection._name, 'PostLinks');
  test.equal(PostLink.Meta.fields.post.fields, ['subdocument.person', 'subdocument.persons']);
  test.isNull(PostLink.Meta.fields.post.reverseName);
  test.equal(PostLink.Meta.fields.post.reverseFields, []);
  test.equal(CircularFirst.Meta._name, 'CircularFirst');
  test.equal(CircularFirst.Meta.parent, _TestCircularFirst.Meta);
  test.equal(CircularFirst.Meta.document, CircularFirst);
  test.equal(CircularFirst.Meta.collection._name, 'CircularFirsts');
  if (Meteor.isServer) {
    test.equal(CircularFirst.Meta.schema, '1.0.0');
  }
  if (Meteor.isServer) {
    test.equal(CircularFirst.Meta.migrations, []);
  }
  test.equal(_.size(CircularFirst.Meta.triggers), 0);
  test.equal(_.size(CircularFirst.Meta.fields), 2);
  test.instanceOf(CircularFirst.Meta.fields.second, CircularFirst._ReferenceField);
  test.isNull(CircularFirst.Meta.fields.second.ancestorArray, CircularFirst.Meta.fields.second.ancestorArray);
  test.isTrue(CircularFirst.Meta.fields.second.required);
  test.equal(CircularFirst.Meta.fields.second.sourcePath, 'second');
  test.equal(CircularFirst.Meta.fields.second.sourceDocument, CircularFirst);
  test.equal(CircularFirst.Meta.fields.second.targetDocument, CircularSecond);
  test.equal(CircularFirst.Meta.fields.second.sourceCollection._name, 'CircularFirsts');
  test.equal(CircularFirst.Meta.fields.second.targetCollection._name, 'CircularSeconds');
  test.equal(CircularFirst.Meta.fields.second.sourceDocument.Meta.collection._name, 'CircularFirsts');
  test.equal(CircularFirst.Meta.fields.second.targetDocument.Meta.collection._name, 'CircularSeconds');
  test.equal(CircularFirst.Meta.fields.second.fields, ['content']);
  test.equal(CircularFirst.Meta.fields.second.reverseName, 'reverseFirsts');
  test.equal(CircularFirst.Meta.fields.second.reverseFields, ['content']);
  test.instanceOf(CircularFirst.Meta.fields.reverseSeconds, CircularFirst._ReferenceField);
  test.equal(CircularFirst.Meta.fields.reverseSeconds.ancestorArray, 'reverseSeconds');
  test.isTrue(CircularFirst.Meta.fields.reverseSeconds.required);
  test.equal(CircularFirst.Meta.fields.reverseSeconds.sourcePath, 'reverseSeconds');
  test.equal(CircularFirst.Meta.fields.reverseSeconds.sourceDocument, CircularFirst);
  test.equal(CircularFirst.Meta.fields.reverseSeconds.targetDocument, CircularSecond);
  test.equal(CircularFirst.Meta.fields.reverseSeconds.sourceCollection._name, 'CircularFirsts');
  test.equal(CircularFirst.Meta.fields.reverseSeconds.targetCollection._name, 'CircularSeconds');
  test.equal(CircularFirst.Meta.fields.reverseSeconds.sourceDocument.Meta.collection._name, 'CircularFirsts');
  test.equal(CircularFirst.Meta.fields.reverseSeconds.targetDocument.Meta.collection._name, 'CircularSeconds');
  test.equal(CircularFirst.Meta.fields.reverseSeconds.fields, ['content']);
  test.isNull(CircularFirst.Meta.fields.reverseSeconds.reverseName);
  test.equal(CircularFirst.Meta.fields.reverseSeconds.reverseFields, []);
  test.equal(CircularSecond.Meta._name, 'CircularSecond');
  test.isFalse(CircularSecond.Meta.parent);
  test.equal(CircularSecond.Meta.document, CircularSecond);
  test.equal(CircularSecond.Meta.collection._name, 'CircularSeconds');
  if (Meteor.isServer) {
    test.equal(CircularSecond.Meta.schema, '1.0.0');
  }
  if (Meteor.isServer) {
    test.equal(CircularSecond.Meta.migrations, []);
  }
  test.equal(_.size(CircularSecond.Meta.triggers), 0);
  test.equal(_.size(CircularSecond.Meta.fields), 2);
  test.instanceOf(CircularSecond.Meta.fields.first, CircularSecond._ReferenceField);
  test.isNull(CircularSecond.Meta.fields.first.ancestorArray, CircularSecond.Meta.fields.first.ancestorArray);
  test.isFalse(CircularSecond.Meta.fields.first.required);
  test.equal(CircularSecond.Meta.fields.first.sourcePath, 'first');
  test.equal(CircularSecond.Meta.fields.first.sourceDocument, CircularSecond);
  test.equal(CircularSecond.Meta.fields.first.targetDocument, CircularFirst);
  test.equal(CircularSecond.Meta.fields.first.sourceCollection._name, 'CircularSeconds');
  test.equal(CircularSecond.Meta.fields.first.targetCollection._name, 'CircularFirsts');
  test.equal(CircularSecond.Meta.fields.first.sourceDocument.Meta.collection._name, 'CircularSeconds');
  test.equal(CircularSecond.Meta.fields.first.targetDocument.Meta.collection._name, 'CircularFirsts');
  test.equal(CircularSecond.Meta.fields.first.fields, ['content']);
  test.equal(CircularSecond.Meta.fields.first.reverseName, 'reverseSeconds');
  test.equal(CircularSecond.Meta.fields.first.reverseFields, ['content']);
  test.instanceOf(CircularSecond.Meta.fields.reverseFirsts, CircularSecond._ReferenceField);
  test.equal(CircularSecond.Meta.fields.reverseFirsts.ancestorArray, 'reverseFirsts');
  test.isTrue(CircularSecond.Meta.fields.reverseFirsts.required);
  test.equal(CircularSecond.Meta.fields.reverseFirsts.sourcePath, 'reverseFirsts');
  test.equal(CircularSecond.Meta.fields.reverseFirsts.sourceDocument, CircularSecond);
  test.equal(CircularSecond.Meta.fields.reverseFirsts.targetDocument, CircularFirst);
  test.equal(CircularSecond.Meta.fields.reverseFirsts.sourceCollection._name, 'CircularSeconds');
  test.equal(CircularSecond.Meta.fields.reverseFirsts.targetCollection._name, 'CircularFirsts');
  test.equal(CircularSecond.Meta.fields.reverseFirsts.sourceDocument.Meta.collection._name, 'CircularSeconds');
  test.equal(CircularSecond.Meta.fields.reverseFirsts.targetDocument.Meta.collection._name, 'CircularFirsts');
  test.equal(CircularSecond.Meta.fields.reverseFirsts.fields, ['content']);
  test.isNull(CircularSecond.Meta.fields.reverseFirsts.reverseName);
  test.equal(CircularSecond.Meta.fields.reverseFirsts.reverseFields, []);
  test.equal(Person.Meta._name, 'Person');
  test.equal(Person.Meta.parent, _TestPerson.Meta);
  test.equal(Person.Meta.document, Person);
  test.equal(Person.Meta._name, 'Person');
  test.equal(Person.Meta.collection._name, 'Persons');
  if (Meteor.isServer) {
    test.equal(Person.Meta.schema, '1.0.0');
  }
  if (Meteor.isServer) {
    test.equal(Person.Meta.migrations, []);
  }
  test.equal(_.size(Person.Meta.triggers), 0);
  test.equal(_.size(Person.Meta.fields), 5);
  test.instanceOf(Person.Meta.fields.posts, Person._ReferenceField);
  test.equal(Person.Meta.fields.posts.ancestorArray, 'posts');
  test.isTrue(Person.Meta.fields.posts.required);
  test.equal(Person.Meta.fields.posts.sourcePath, 'posts');
  test.equal(Person.Meta.fields.posts.sourceDocument, Person);
  test.equal(Person.Meta.fields.posts.targetDocument, Post);
  test.equal(Person.Meta.fields.posts.sourceCollection._name, 'Persons');
  test.equal(Person.Meta.fields.posts.targetCollection._name, 'Posts');
  test.equal(Person.Meta.fields.posts.sourceDocument.Meta.collection._name, 'Persons');
  test.equal(Person.Meta.fields.posts.targetDocument.Meta.collection._name, 'Posts');
  test.equal(Person.Meta.fields.posts.fields, ['body', 'subdocument.body', 'nested.body']);
  test.isNull(Person.Meta.fields.posts.reverseName);
  test.equal(Person.Meta.fields.posts.reverseFields, []);
  test.instanceOf(Person.Meta.fields.nestedPosts, Person._ReferenceField);
  test.equal(Person.Meta.fields.nestedPosts.ancestorArray, 'nestedPosts');
  test.isTrue(Person.Meta.fields.nestedPosts.required);
  test.equal(Person.Meta.fields.nestedPosts.sourcePath, 'nestedPosts');
  test.equal(Person.Meta.fields.nestedPosts.sourceDocument, Person);
  test.equal(Person.Meta.fields.nestedPosts.targetDocument, Post);
  test.equal(Person.Meta.fields.nestedPosts.sourceCollection._name, 'Persons');
  test.equal(Person.Meta.fields.nestedPosts.targetCollection._name, 'Posts');
  test.equal(Person.Meta.fields.nestedPosts.sourceDocument.Meta.collection._name, 'Persons');
  test.equal(Person.Meta.fields.nestedPosts.targetDocument.Meta.collection._name, 'Posts');
  test.equal(Person.Meta.fields.nestedPosts.fields, ['body', 'subdocument.body', 'nested.body']);
  test.isNull(Person.Meta.fields.nestedPosts.reverseName);
  test.equal(Person.Meta.fields.nestedPosts.reverseFields, []);
  test.instanceOf(Person.Meta.fields.count, Person._GeneratedField);
  test.isNull(Person.Meta.fields.count.ancestorArray, Person.Meta.fields.count.ancestorArray);
  test.isTrue(_.isFunction(Person.Meta.fields.count.generator));
  test.equal(Person.Meta.fields.count.sourcePath, 'count');
  test.equal(Person.Meta.fields.count.sourceDocument, Person);
  test.equal(Person.Meta.fields.count.targetDocument, Person);
  test.equal(Person.Meta.fields.count.sourceCollection._name, 'Persons');
  test.equal(Person.Meta.fields.count.targetCollection._name, 'Persons');
  test.equal(Person.Meta.fields.count.sourceDocument.Meta.collection._name, 'Persons');
  test.equal(Person.Meta.fields.count.targetDocument.Meta.collection._name, 'Persons');
  test.equal(Person.Meta.fields.count.fields, ['posts', 'subdocumentPosts', 'subdocumentsPosts', 'nestedPosts']);
  test.isUndefined(Person.Meta.fields.count.reverseName);
  test.isUndefined(Person.Meta.fields.count.reverseFields);
  test.instanceOf(Person.Meta.fields.subdocumentPosts, Person._ReferenceField);
  test.equal(Person.Meta.fields.subdocumentPosts.ancestorArray, 'subdocumentPosts');
  test.isTrue(Person.Meta.fields.subdocumentPosts.required);
  test.equal(Person.Meta.fields.subdocumentPosts.sourcePath, 'subdocumentPosts');
  test.equal(Person.Meta.fields.subdocumentPosts.sourceDocument, Person);
  test.equal(Person.Meta.fields.subdocumentPosts.targetDocument, Post);
  test.equal(Person.Meta.fields.subdocumentPosts.sourceCollection._name, 'Persons');
  test.equal(Person.Meta.fields.subdocumentPosts.targetCollection._name, 'Posts');
  test.equal(Person.Meta.fields.subdocumentPosts.sourceDocument.Meta.collection._name, 'Persons');
  test.equal(Person.Meta.fields.subdocumentPosts.targetDocument.Meta.collection._name, 'Posts');
  test.equal(Person.Meta.fields.subdocumentPosts.fields, ['body', 'subdocument.body', 'nested.body']);
  test.isNull(Person.Meta.fields.subdocumentPosts.reverseName);
  test.equal(Person.Meta.fields.subdocumentPosts.reverseFields, []);
  test.instanceOf(Person.Meta.fields.subdocumentsPosts, Person._ReferenceField);
  test.equal(Person.Meta.fields.subdocumentsPosts.ancestorArray, 'subdocumentsPosts');
  test.isTrue(Person.Meta.fields.subdocumentsPosts.required);
  test.equal(Person.Meta.fields.subdocumentsPosts.sourcePath, 'subdocumentsPosts');
  test.equal(Person.Meta.fields.subdocumentsPosts.sourceDocument, Person);
  test.equal(Person.Meta.fields.subdocumentsPosts.targetDocument, Post);
  test.equal(Person.Meta.fields.subdocumentsPosts.sourceCollection._name, 'Persons');
  test.equal(Person.Meta.fields.subdocumentsPosts.targetCollection._name, 'Posts');
  test.equal(Person.Meta.fields.subdocumentsPosts.sourceDocument.Meta.collection._name, 'Persons');
  test.equal(Person.Meta.fields.subdocumentsPosts.targetDocument.Meta.collection._name, 'Posts');
  test.equal(Person.Meta.fields.subdocumentsPosts.fields, ['body', 'subdocument.body', 'nested.body']);
  test.isNull(Person.Meta.fields.subdocumentsPosts.reverseName);
  test.equal(Person.Meta.fields.subdocumentsPosts.reverseFields, []);
  test.equal(SpecialPerson.Meta._name, 'SpecialPerson');
  test.equal(SpecialPerson.Meta.parent, Person.Meta);
  test.equal(SpecialPerson.Meta.document, SpecialPerson);
  test.equal(SpecialPerson.Meta._name, 'SpecialPerson');
  test.equal(SpecialPerson.Meta.collection._name, 'SpecialPersons');
  if (Meteor.isServer) {
    test.equal(SpecialPerson.Meta.schema, '1.0.0');
  }
  if (Meteor.isServer) {
    test.equal(SpecialPerson.Meta.migrations, []);
  }
  test.equal(_.size(SpecialPerson.Meta.triggers), 0);
  test.equal(_.size(SpecialPerson.Meta.fields), 0);
  test.equal(Recursive.Meta._name, 'Recursive');
  test.isFalse(Recursive.Meta.parent);
  test.equal(Recursive.Meta.document, Recursive);
  test.equal(Recursive.Meta.collection._name, 'Recursives');
  if (Meteor.isServer) {
    test.equal(Recursive.Meta.schema, '1.0.0');
  }
  if (Meteor.isServer) {
    test.equal(Recursive.Meta.migrations, []);
  }
  test.equal(_.size(Recursive.Meta.triggers), 0);
  test.equal(_.size(Recursive.Meta.fields), 2);
  test.instanceOf(Recursive.Meta.fields.other, Recursive._ReferenceField);
  test.isNull(Recursive.Meta.fields.other.ancestorArray, Recursive.Meta.fields.other.ancestorArray);
  test.isFalse(Recursive.Meta.fields.other.required);
  test.equal(Recursive.Meta.fields.other.sourcePath, 'other');
  test.equal(Recursive.Meta.fields.other.sourceDocument, Recursive);
  test.equal(Recursive.Meta.fields.other.targetDocument, Recursive);
  test.equal(Recursive.Meta.fields.other.sourceCollection._name, 'Recursives');
  test.equal(Recursive.Meta.fields.other.targetCollection._name, 'Recursives');
  test.equal(Recursive.Meta.fields.other.sourceDocument.Meta.collection._name, 'Recursives');
  test.equal(Recursive.Meta.fields.other.targetDocument.Meta.collection._name, 'Recursives');
  test.equal(Recursive.Meta.fields.other.fields, ['content']);
  test.equal(Recursive.Meta.fields.other.reverseName, 'reverse');
  test.equal(Recursive.Meta.fields.other.reverseFields, ['content']);
  test.instanceOf(Recursive.Meta.fields.reverse, Recursive._ReferenceField);
  test.equal(Recursive.Meta.fields.reverse.ancestorArray, 'reverse');
  test.isTrue(Recursive.Meta.fields.reverse.required);
  test.equal(Recursive.Meta.fields.reverse.sourcePath, 'reverse');
  test.equal(Recursive.Meta.fields.reverse.sourceDocument, Recursive);
  test.equal(Recursive.Meta.fields.reverse.targetDocument, Recursive);
  test.equal(Recursive.Meta.fields.reverse.sourceCollection._name, 'Recursives');
  test.equal(Recursive.Meta.fields.reverse.targetCollection._name, 'Recursives');
  test.equal(Recursive.Meta.fields.reverse.sourceDocument.Meta.collection._name, 'Recursives');
  test.equal(Recursive.Meta.fields.reverse.targetDocument.Meta.collection._name, 'Recursives');
  test.equal(Recursive.Meta.fields.reverse.fields, ['content']);
  test.isNull(Recursive.Meta.fields.reverse.reverseName);
  test.equal(Recursive.Meta.fields.reverse.reverseFields, []);
  test.equal(IdentityGenerator.Meta._name, 'IdentityGenerator');
  test.isFalse(IdentityGenerator.Meta.parent);
  test.equal(IdentityGenerator.Meta.document, IdentityGenerator);
  test.equal(IdentityGenerator.Meta.collection._name, 'IdentityGenerators');
  if (Meteor.isServer) {
    test.equal(IdentityGenerator.Meta.schema, '1.0.0');
  }
  if (Meteor.isServer) {
    test.equal(IdentityGenerator.Meta.migrations, []);
  }
  test.equal(_.size(IdentityGenerator.Meta.triggers), 0);
  test.equal(_.size(IdentityGenerator.Meta.fields), 2);
  test.instanceOf(IdentityGenerator.Meta.fields.result, IdentityGenerator._GeneratedField);
  test.isNull(IdentityGenerator.Meta.fields.result.ancestorArray, IdentityGenerator.Meta.fields.result.ancestorArray);
  test.isTrue(_.isFunction(IdentityGenerator.Meta.fields.result.generator));
  test.equal(IdentityGenerator.Meta.fields.result.sourcePath, 'result');
  test.equal(IdentityGenerator.Meta.fields.result.sourceDocument, IdentityGenerator);
  test.equal(IdentityGenerator.Meta.fields.result.targetDocument, IdentityGenerator);
  test.equal(IdentityGenerator.Meta.fields.result.sourceCollection._name, 'IdentityGenerators');
  test.equal(IdentityGenerator.Meta.fields.result.targetCollection._name, 'IdentityGenerators');
  test.equal(IdentityGenerator.Meta.fields.result.sourceDocument.Meta.collection._name, 'IdentityGenerators');
  test.equal(IdentityGenerator.Meta.fields.result.targetDocument.Meta.collection._name, 'IdentityGenerators');
  test.equal(IdentityGenerator.Meta.fields.result.fields, ['source']);
  test.isUndefined(IdentityGenerator.Meta.fields.result.reverseName);
  test.isUndefined(IdentityGenerator.Meta.fields.result.reverseFields);
  test.instanceOf(IdentityGenerator.Meta.fields.results, IdentityGenerator._GeneratedField);
  test.equal(IdentityGenerator.Meta.fields.results.ancestorArray, 'results');
  test.isTrue(_.isFunction(IdentityGenerator.Meta.fields.results.generator));
  test.equal(IdentityGenerator.Meta.fields.results.sourcePath, 'results');
  test.equal(IdentityGenerator.Meta.fields.results.sourceDocument, IdentityGenerator);
  test.equal(IdentityGenerator.Meta.fields.results.targetDocument, IdentityGenerator);
  test.equal(IdentityGenerator.Meta.fields.results.sourceCollection._name, 'IdentityGenerators');
  test.equal(IdentityGenerator.Meta.fields.results.targetCollection._name, 'IdentityGenerators');
  test.equal(IdentityGenerator.Meta.fields.results.sourceDocument.Meta.collection._name, 'IdentityGenerators');
  test.equal(IdentityGenerator.Meta.fields.results.targetDocument.Meta.collection._name, 'IdentityGenerators');
  test.equal(IdentityGenerator.Meta.fields.results.fields, ['source']);
  test.isUndefined(IdentityGenerator.Meta.fields.results.reverseName);
  test.isUndefined(IdentityGenerator.Meta.fields.results.reverseFields);
  test.equal(SpecialPost.Meta._name, 'SpecialPost');
  test.equal(SpecialPost.Meta.parent, _TestPost2.Meta);
  test.equal(SpecialPost.Meta.document, SpecialPost);
  test.equal(SpecialPost.Meta.collection._name, 'SpecialPosts');
  if (Meteor.isServer) {
    test.equal(SpecialPost.Meta.schema, '1.0.0');
  }
  if (Meteor.isServer) {
    test.equal(SpecialPost.Meta.migrations, []);
  }
  test.equal(_.size(SpecialPost.Meta.triggers), 1);
  test.instanceOf(SpecialPost.Meta.triggers.testTrigger, SpecialPost._Trigger);
  test.equal(SpecialPost.Meta.triggers.testTrigger.name, 'testTrigger');
  test.equal(SpecialPost.Meta.triggers.testTrigger.document, SpecialPost);
  test.equal(SpecialPost.Meta.triggers.testTrigger.collection._name, 'SpecialPosts');
  test.equal(SpecialPost.Meta.triggers.testTrigger.fields, ['body']);
  test.equal(_.size(SpecialPost.Meta.fields), 8);
  test.instanceOf(SpecialPost.Meta.fields.author, SpecialPost._ReferenceField);
  test.isNull(SpecialPost.Meta.fields.author.ancestorArray, SpecialPost.Meta.fields.author.ancestorArray);
  test.isTrue(SpecialPost.Meta.fields.author.required);
  test.equal(SpecialPost.Meta.fields.author.sourcePath, 'author');
  test.equal(SpecialPost.Meta.fields.author.sourceDocument, SpecialPost);
  test.equal(SpecialPost.Meta.fields.author.targetDocument, Person);
  test.equal(SpecialPost.Meta.fields.author.sourceCollection._name, 'SpecialPosts');
  test.equal(SpecialPost.Meta.fields.author.targetCollection._name, 'Persons');
  test.equal(SpecialPost.Meta.fields.author.sourceDocument.Meta.collection._name, 'SpecialPosts');
  test.equal(SpecialPost.Meta.fields.author.targetDocument.Meta.collection._name, 'Persons');
  test.equal(SpecialPost.Meta.fields.author.fields, ['username', 'displayName', 'field1', 'field2']);
  test.equal(SpecialPost.Meta.fields.author.reverseName, 'posts');
  test.equal(SpecialPost.Meta.fields.author.reverseFields, ['body', 'subdocument.body', 'nested.body']);
  test.instanceOf(SpecialPost.Meta.fields.subscribers, SpecialPost._ReferenceField);
  test.equal(SpecialPost.Meta.fields.subscribers.ancestorArray, 'subscribers');
  test.isTrue(SpecialPost.Meta.fields.subscribers.required);
  test.equal(SpecialPost.Meta.fields.subscribers.sourcePath, 'subscribers');
  test.equal(SpecialPost.Meta.fields.subscribers.sourceDocument, SpecialPost);
  test.equal(SpecialPost.Meta.fields.subscribers.targetDocument, Person);
  test.equal(SpecialPost.Meta.fields.subscribers.sourceCollection._name, 'SpecialPosts');
  test.equal(SpecialPost.Meta.fields.subscribers.targetCollection._name, 'Persons');
  test.equal(SpecialPost.Meta.fields.subscribers.sourceDocument.Meta.collection._name, 'SpecialPosts');
  test.equal(SpecialPost.Meta.fields.subscribers.targetDocument.Meta.collection._name, 'Persons');
  test.equal(SpecialPost.Meta.fields.subscribers.fields, []);
  test.isNull(SpecialPost.Meta.fields.subscribers.reverseName);
  test.equal(SpecialPost.Meta.fields.subscribers.reverseFields, []);
  test.instanceOf(SpecialPost.Meta.fields.reviewers, SpecialPost._ReferenceField);
  test.equal(SpecialPost.Meta.fields.reviewers.ancestorArray, 'reviewers');
  test.isTrue(SpecialPost.Meta.fields.reviewers.required);
  test.equal(SpecialPost.Meta.fields.reviewers.sourcePath, 'reviewers');
  test.equal(SpecialPost.Meta.fields.reviewers.sourceDocument, SpecialPost);
  test.equal(SpecialPost.Meta.fields.reviewers.targetDocument, Person);
  test.equal(SpecialPost.Meta.fields.reviewers.sourceCollection._name, 'SpecialPosts');
  test.equal(SpecialPost.Meta.fields.reviewers.targetCollection._name, 'Persons');
  test.equal(SpecialPost.Meta.fields.reviewers.sourceDocument.Meta.collection._name, 'SpecialPosts');
  test.equal(SpecialPost.Meta.fields.reviewers.targetDocument.Meta.collection._name, 'Persons');
  test.equal(SpecialPost.Meta.fields.reviewers.fields, [
    {
      username: 1
    }
  ]);
  test.isNull(SpecialPost.Meta.fields.reviewers.reverseName);
  test.equal(SpecialPost.Meta.fields.reviewers.reverseFields, []);
  test.equal(_.size(SpecialPost.Meta.fields.subdocument), 3);
  test.instanceOf(SpecialPost.Meta.fields.subdocument.person, SpecialPost._ReferenceField);
  test.isNull(SpecialPost.Meta.fields.subdocument.person.ancestorArray, SpecialPost.Meta.fields.subdocument.person.ancestorArray);
  test.isFalse(SpecialPost.Meta.fields.subdocument.person.required);
  test.equal(SpecialPost.Meta.fields.subdocument.person.sourcePath, 'subdocument.person');
  test.equal(SpecialPost.Meta.fields.subdocument.person.sourceDocument, SpecialPost);
  test.equal(SpecialPost.Meta.fields.subdocument.person.targetDocument, Person);
  test.equal(SpecialPost.Meta.fields.subdocument.person.sourceCollection._name, 'SpecialPosts');
  test.equal(SpecialPost.Meta.fields.subdocument.person.targetCollection._name, 'Persons');
  test.equal(SpecialPost.Meta.fields.subdocument.person.sourceDocument.Meta.collection._name, 'SpecialPosts');
  test.equal(SpecialPost.Meta.fields.subdocument.person.targetDocument.Meta.collection._name, 'Persons');
  test.equal(SpecialPost.Meta.fields.subdocument.person.fields, ['username', 'displayName', 'field1', 'field2']);
  test.equal(SpecialPost.Meta.fields.subdocument.person.reverseName, 'subdocumentPosts');
  test.equal(SpecialPost.Meta.fields.subdocument.person.reverseFields, ['body', 'subdocument.body', 'nested.body']);
  test.instanceOf(SpecialPost.Meta.fields.subdocument.persons, SpecialPost._ReferenceField);
  test.equal(SpecialPost.Meta.fields.subdocument.persons.ancestorArray, 'subdocument.persons');
  test.isTrue(SpecialPost.Meta.fields.subdocument.persons.required);
  test.equal(SpecialPost.Meta.fields.subdocument.persons.sourcePath, 'subdocument.persons');
  test.equal(SpecialPost.Meta.fields.subdocument.persons.sourceDocument, SpecialPost);
  test.equal(SpecialPost.Meta.fields.subdocument.persons.targetDocument, Person);
  test.equal(SpecialPost.Meta.fields.subdocument.persons.sourceCollection._name, 'SpecialPosts');
  test.equal(SpecialPost.Meta.fields.subdocument.persons.targetCollection._name, 'Persons');
  test.equal(SpecialPost.Meta.fields.subdocument.persons.sourceDocument.Meta.collection._name, 'SpecialPosts');
  test.equal(SpecialPost.Meta.fields.subdocument.persons.targetDocument.Meta.collection._name, 'Persons');
  test.equal(SpecialPost.Meta.fields.subdocument.persons.fields, ['username', 'displayName', 'field1', 'field2']);
  test.equal(SpecialPost.Meta.fields.subdocument.persons.reverseName, 'subdocumentsPosts');
  test.equal(SpecialPost.Meta.fields.subdocument.persons.reverseFields, ['body', 'subdocument.body', 'nested.body']);
  test.instanceOf(SpecialPost.Meta.fields.subdocument.slug, SpecialPost._GeneratedField);
  test.isNull(SpecialPost.Meta.fields.subdocument.slug.ancestorArray, SpecialPost.Meta.fields.subdocument.slug.ancestorArray);
  test.isTrue(_.isFunction(SpecialPost.Meta.fields.subdocument.slug.generator));
  test.equal(SpecialPost.Meta.fields.subdocument.slug.sourcePath, 'subdocument.slug');
  test.equal(SpecialPost.Meta.fields.subdocument.slug.sourceDocument, SpecialPost);
  test.equal(SpecialPost.Meta.fields.subdocument.slug.targetDocument, SpecialPost);
  test.equal(SpecialPost.Meta.fields.subdocument.slug.sourceCollection._name, 'SpecialPosts');
  test.equal(SpecialPost.Meta.fields.subdocument.slug.targetCollection._name, 'SpecialPosts');
  test.equal(SpecialPost.Meta.fields.subdocument.slug.sourceDocument.Meta.collection._name, 'SpecialPosts');
  test.equal(SpecialPost.Meta.fields.subdocument.slug.targetDocument.Meta.collection._name, 'SpecialPosts');
  test.equal(SpecialPost.Meta.fields.subdocument.slug.fields, ['body', 'subdocument.body']);
  test.isUndefined(SpecialPost.Meta.fields.subdocument.slug.reverseName);
  test.isUndefined(SpecialPost.Meta.fields.subdocument.slug.reverseFields);
  test.equal(_.size(SpecialPost.Meta.fields.nested), 3);
  test.instanceOf(SpecialPost.Meta.fields.nested.required, SpecialPost._ReferenceField);
  test.equal(SpecialPost.Meta.fields.nested.required.ancestorArray, 'nested');
  test.isTrue(SpecialPost.Meta.fields.nested.required.required);
  test.equal(SpecialPost.Meta.fields.nested.required.sourcePath, 'nested.required');
  test.equal(SpecialPost.Meta.fields.nested.required.sourceDocument, SpecialPost);
  test.equal(SpecialPost.Meta.fields.nested.required.targetDocument, Person);
  test.equal(SpecialPost.Meta.fields.nested.required.sourceCollection._name, 'SpecialPosts');
  test.equal(SpecialPost.Meta.fields.nested.required.targetCollection._name, 'Persons');
  test.equal(SpecialPost.Meta.fields.nested.required.sourceDocument.Meta.collection._name, 'SpecialPosts');
  test.equal(SpecialPost.Meta.fields.nested.required.targetDocument.Meta.collection._name, 'Persons');
  test.equal(SpecialPost.Meta.fields.nested.required.fields, ['username', 'displayName', 'field1', 'field2']);
  test.equal(SpecialPost.Meta.fields.nested.required.reverseName, 'nestedPosts');
  test.equal(SpecialPost.Meta.fields.nested.required.reverseFields, ['body', 'subdocument.body', 'nested.body']);
  test.instanceOf(SpecialPost.Meta.fields.nested.optional, SpecialPost._ReferenceField);
  test.equal(SpecialPost.Meta.fields.nested.optional.ancestorArray, 'nested');
  test.isFalse(SpecialPost.Meta.fields.nested.optional.required);
  test.equal(SpecialPost.Meta.fields.nested.optional.sourcePath, 'nested.optional');
  test.equal(SpecialPost.Meta.fields.nested.optional.sourceDocument, SpecialPost);
  test.equal(SpecialPost.Meta.fields.nested.optional.targetDocument, Person);
  test.equal(SpecialPost.Meta.fields.nested.optional.sourceCollection._name, 'SpecialPosts');
  test.equal(SpecialPost.Meta.fields.nested.optional.targetCollection._name, 'Persons');
  test.equal(SpecialPost.Meta.fields.nested.optional.sourceDocument.Meta.collection._name, 'SpecialPosts');
  test.equal(SpecialPost.Meta.fields.nested.optional.targetDocument.Meta.collection._name, 'Persons');
  test.equal(SpecialPost.Meta.fields.nested.optional.fields, ['username']);
  test.isNull(SpecialPost.Meta.fields.nested.optional.reverseName);
  test.equal(SpecialPost.Meta.fields.nested.optional.reverseFields, []);
  test.instanceOf(SpecialPost.Meta.fields.nested.slug, SpecialPost._GeneratedField);
  test.equal(SpecialPost.Meta.fields.nested.slug.ancestorArray, 'nested');
  test.isTrue(_.isFunction(SpecialPost.Meta.fields.nested.slug.generator));
  test.equal(SpecialPost.Meta.fields.nested.slug.sourcePath, 'nested.slug');
  test.equal(SpecialPost.Meta.fields.nested.slug.sourceDocument, SpecialPost);
  test.equal(SpecialPost.Meta.fields.nested.slug.targetDocument, SpecialPost);
  test.equal(SpecialPost.Meta.fields.nested.slug.sourceCollection._name, 'SpecialPosts');
  test.equal(SpecialPost.Meta.fields.nested.slug.targetCollection._name, 'SpecialPosts');
  test.equal(SpecialPost.Meta.fields.nested.slug.sourceDocument.Meta.collection._name, 'SpecialPosts');
  test.equal(SpecialPost.Meta.fields.nested.slug.targetDocument.Meta.collection._name, 'SpecialPosts');
  test.equal(SpecialPost.Meta.fields.nested.slug.fields, ['body', 'nested.body']);
  test.isUndefined(SpecialPost.Meta.fields.nested.slug.reverseName);
  test.isUndefined(SpecialPost.Meta.fields.nested.slug.reverseFields);
  test.instanceOf(SpecialPost.Meta.fields.slug, SpecialPost._GeneratedField);
  test.isNull(SpecialPost.Meta.fields.slug.ancestorArray, SpecialPost.Meta.fields.slug.ancestorArray);
  test.isTrue(_.isFunction(SpecialPost.Meta.fields.slug.generator));
  test.equal(SpecialPost.Meta.fields.slug.sourcePath, 'slug');
  test.equal(SpecialPost.Meta.fields.slug.sourceDocument, SpecialPost);
  test.equal(SpecialPost.Meta.fields.slug.targetDocument, SpecialPost);
  test.equal(SpecialPost.Meta.fields.slug.sourceCollection._name, 'SpecialPosts');
  test.equal(SpecialPost.Meta.fields.slug.targetCollection._name, 'SpecialPosts');
  test.equal(SpecialPost.Meta.fields.slug.sourceDocument.Meta.collection._name, 'SpecialPosts');
  test.equal(SpecialPost.Meta.fields.slug.targetDocument.Meta.collection._name, 'SpecialPosts');
  test.equal(SpecialPost.Meta.fields.slug.fields, ['body', 'subdocument.body']);
  test.isUndefined(SpecialPost.Meta.fields.slug.reverseName);
  test.isUndefined(SpecialPost.Meta.fields.slug.reverseFields);
  test.instanceOf(SpecialPost.Meta.fields.tags, SpecialPost._GeneratedField);
  test.equal(SpecialPost.Meta.fields.tags.ancestorArray, 'tags');
  test.isTrue(_.isFunction(SpecialPost.Meta.fields.tags.generator));
  test.equal(SpecialPost.Meta.fields.tags.sourcePath, 'tags');
  test.equal(SpecialPost.Meta.fields.tags.sourceDocument, SpecialPost);
  test.equal(SpecialPost.Meta.fields.tags.targetDocument, SpecialPost);
  test.equal(SpecialPost.Meta.fields.tags.sourceCollection._name, 'SpecialPosts');
  test.equal(SpecialPost.Meta.fields.tags.targetCollection._name, 'SpecialPosts');
  test.equal(SpecialPost.Meta.fields.tags.sourceDocument.Meta.collection._name, 'SpecialPosts');
  test.equal(SpecialPost.Meta.fields.tags.targetDocument.Meta.collection._name, 'SpecialPosts');
  test.equal(SpecialPost.Meta.fields.tags.fields, ['body', 'subdocument.body', 'nested.body']);
  test.isUndefined(SpecialPost.Meta.fields.tags.reverseName);
  test.isUndefined(SpecialPost.Meta.fields.tags.reverseFields);
  test.instanceOf(SpecialPost.Meta.fields.special, SpecialPost._ReferenceField);
  test.isNull(SpecialPost.Meta.fields.special.ancestorArray, SpecialPost.Meta.fields.special.ancestorArray);
  test.isTrue(SpecialPost.Meta.fields.special.required);
  test.equal(SpecialPost.Meta.fields.special.sourcePath, 'special');
  test.equal(SpecialPost.Meta.fields.special.sourceDocument, SpecialPost);
  test.equal(SpecialPost.Meta.fields.special.targetDocument, Person);
  test.equal(SpecialPost.Meta.fields.special.sourceCollection._name, 'SpecialPosts');
  test.equal(SpecialPost.Meta.fields.special.targetCollection._name, 'Persons');
  test.equal(SpecialPost.Meta.fields.special.sourceDocument.Meta.collection._name, 'SpecialPosts');
  test.equal(SpecialPost.Meta.fields.special.targetDocument.Meta.collection._name, 'Persons');
  test.equal(SpecialPost.Meta.fields.special.fields, []);
  test.isNull(SpecialPost.Meta.fields.special.reverseName);
  test.equal(SpecialPost.Meta.fields.special.reverseFields, []);
  return testDocumentList(test, ALL);
};

plainObject = function(obj) {
  var keys, o, values;
  if (!_.isObject(obj)) {
    return obj;
  }
  if (_.isArray(obj)) {
    return (function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = obj.length; _i < _len; _i++) {
        o = obj[_i];
        _results.push(plainObject(o));
      }
      return _results;
    })();
  }
  keys = _.keys(obj);
  values = (function() {
    var _i, _len, _ref1, _results;
    _ref1 = _.values(obj);
    _results = [];
    for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
      o = _ref1[_i];
      _results.push(plainObject(o));
    }
    return _results;
  })();
  return _.object(keys, values);
};

testAsyncMulti('peerdb - references', [
  function(test, expect) {
    testDefinition(test);
    Document.defineAll();
    testDefinition(test);
    Person.documents.insert({
      username: 'person1',
      displayName: 'Person 1',
      field1: 'Field 1 - 1',
      field2: 'Field 1 - 2'
    }, expect((function(_this) {
      return function(error, person1Id) {
        test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
        test.isTrue(person1Id);
        return _this.person1Id = person1Id;
      };
    })(this)));
    Person.documents.insert({
      username: 'person2',
      displayName: 'Person 2',
      field1: 'Field 2 - 1',
      field2: 'Field 2 - 2'
    }, expect((function(_this) {
      return function(error, person2Id) {
        test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
        test.isTrue(person2Id);
        return _this.person2Id = person2Id;
      };
    })(this)));
    Person.documents.insert({
      username: 'person3',
      displayName: 'Person 3',
      field1: 'Field 3 - 1',
      field2: 'Field 3 - 2'
    }, expect((function(_this) {
      return function(error, person3Id) {
        test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
        test.isTrue(person3Id);
        return _this.person3Id = person3Id;
      };
    })(this)));
    return Meteor.setTimeout(expect(), WAIT_TIME);
  }, function(test, expect) {
    test.isTrue(Person.documents.exists(this.person1Id));
    test.isTrue(Person.documents.exists(this.person2Id));
    test.isTrue(Person.documents.exists(this.person3Id));
    this.person1 = Person.documents.findOne(this.person1Id, {
      transform: null
    });
    this.person2 = Person.documents.findOne(this.person2Id, {
      transform: null
    });
    this.person3 = Person.documents.findOne(this.person3Id, {
      transform: null
    });
    test.equal(this.person1, {
      _id: this.person1Id,
      _schema: '1.0.0',
      username: 'person1',
      displayName: 'Person 1',
      field1: 'Field 1 - 1',
      field2: 'Field 1 - 2',
      count: 0
    });
    test.equal(this.person2, {
      _id: this.person2Id,
      _schema: '1.0.0',
      username: 'person2',
      displayName: 'Person 2',
      field1: 'Field 2 - 1',
      field2: 'Field 2 - 2',
      count: 0
    });
    test.equal(this.person3, {
      _id: this.person3Id,
      _schema: '1.0.0',
      username: 'person3',
      displayName: 'Person 3',
      field1: 'Field 3 - 1',
      field2: 'Field 3 - 2',
      count: 0
    });
    Post.documents.insert({
      author: {
        _id: this.person1._id,
        username: 'wrong',
        displayName: 'wrong',
        field1: 'wrong',
        field2: 'wrong'
      },
      subscribers: [
        {
          _id: this.person2._id
        }, {
          _id: this.person3._id
        }
      ],
      reviewers: [
        {
          _id: this.person2._id,
          username: 'wrong'
        }, {
          _id: this.person3._id,
          username: 'wrong'
        }
      ],
      subdocument: {
        person: {
          _id: this.person2._id,
          username: 'wrong'
        },
        persons: [
          {
            _id: this.person2._id
          }, {
            _id: this.person3._id
          }
        ],
        body: 'SubdocumentFooBar'
      },
      nested: [
        {
          required: {
            _id: this.person2._id,
            username: 'wrong',
            displayName: 'wrong'
          },
          optional: {
            _id: this.person3._id,
            username: 'wrong'
          },
          body: 'NestedFooBar'
        }
      ],
      body: 'FooBar'
    }, expect((function(_this) {
      return function(error, postId) {
        test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
        test.isTrue(postId);
        return _this.postId = postId;
      };
    })(this)));
    return Meteor.setTimeout(expect(), WAIT_TIME);
  }, function(test, expect) {
    this.post = Post.documents.findOne(this.postId, {
      transform: null
    });
    test.equal(this.post, {
      _id: this.postId,
      _schema: '1.0.0',
      author: {
        _id: this.person1._id,
        username: this.person1.username,
        displayName: this.person1.displayName,
        field1: this.person1.field1,
        field2: this.person1.field2
      },
      subscribers: [
        {
          _id: this.person2._id
        }, {
          _id: this.person3._id
        }
      ],
      reviewers: [
        {
          _id: this.person2._id,
          username: this.person2.username
        }, {
          _id: this.person3._id,
          username: this.person3.username
        }
      ],
      subdocument: {
        person: {
          _id: this.person2._id,
          username: this.person2.username,
          displayName: this.person2.displayName,
          field1: this.person2.field1,
          field2: this.person2.field2
        },
        persons: [
          {
            _id: this.person2._id,
            username: this.person2.username,
            displayName: this.person2.displayName,
            field1: this.person2.field1,
            field2: this.person2.field2
          }, {
            _id: this.person3._id,
            username: this.person3.username,
            displayName: this.person3.displayName,
            field1: this.person3.field1,
            field2: this.person3.field2
          }
        ],
        slug: 'subdocument-prefix-foobar-subdocumentfoobar-suffix',
        body: 'SubdocumentFooBar'
      },
      nested: [
        {
          required: {
            _id: this.person2._id,
            username: this.person2.username,
            displayName: this.person2.displayName,
            field1: this.person2.field1,
            field2: this.person2.field2
          },
          optional: {
            _id: this.person3._id,
            username: this.person3.username
          },
          slug: 'nested-prefix-foobar-nestedfoobar-suffix',
          body: 'NestedFooBar'
        }
      ],
      body: 'FooBar',
      slug: 'prefix-foobar-subdocumentfoobar-suffix',
      tags: ['tag-0-prefix-foobar-subdocumentfoobar-suffix', 'tag-1-prefix-foobar-nestedfoobar-suffix']
    });
    Person.documents.update(this.person1Id, {
      $set: {
        username: 'person1a'
      }
    }, expect((function(_this) {
      return function(error, res) {
        test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
        return test.isTrue(res);
      };
    })(this)));
    Person.documents.update(this.person2Id, {
      $set: {
        username: 'person2a'
      }
    }, expect((function(_this) {
      return function(error, res) {
        test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
        return test.isTrue(res);
      };
    })(this)));
    return Meteor.setTimeout(expect(), WAIT_TIME);
  }, function(test, expect) {
    return Person.documents.update(this.person3Id, {
      $set: {
        username: 'person3a'
      }
    }, expect((function(_this) {
      return function(error, res) {
        test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
        return test.isTrue(res);
      };
    })(this)));
  }, function(test, expect) {
    this.person1 = Person.documents.findOne(this.person1Id, {
      transform: null
    });
    this.person2 = Person.documents.findOne(this.person2Id, {
      transform: null
    });
    this.person3 = Person.documents.findOne(this.person3Id, {
      transform: null
    });
    test.equal(this.person1, {
      _id: this.person1Id,
      _schema: '1.0.0',
      username: 'person1a',
      displayName: 'Person 1',
      field1: 'Field 1 - 1',
      field2: 'Field 1 - 2',
      posts: [
        {
          _id: this.postId,
          body: 'FooBar',
          nested: [
            {
              body: 'NestedFooBar'
            }
          ],
          subdocument: {
            body: 'SubdocumentFooBar'
          }
        }
      ],
      count: 1
    });
    test.equal(this.person2, {
      _id: this.person2Id,
      _schema: '1.0.0',
      username: 'person2a',
      displayName: 'Person 2',
      field1: 'Field 2 - 1',
      field2: 'Field 2 - 2',
      subdocumentPosts: [
        {
          _id: this.postId,
          body: 'FooBar',
          nested: [
            {
              body: 'NestedFooBar'
            }
          ],
          subdocument: {
            body: 'SubdocumentFooBar'
          }
        }
      ],
      subdocumentsPosts: [
        {
          _id: this.postId,
          body: 'FooBar',
          nested: [
            {
              body: 'NestedFooBar'
            }
          ],
          subdocument: {
            body: 'SubdocumentFooBar'
          }
        }
      ],
      nestedPosts: [
        {
          _id: this.postId,
          body: 'FooBar',
          nested: [
            {
              body: 'NestedFooBar'
            }
          ],
          subdocument: {
            body: 'SubdocumentFooBar'
          }
        }
      ],
      count: 3
    });
    test.equal(this.person3, {
      _id: this.person3Id,
      _schema: '1.0.0',
      username: 'person3a',
      displayName: 'Person 3',
      field1: 'Field 3 - 1',
      field2: 'Field 3 - 2',
      subdocumentsPosts: [
        {
          _id: this.postId,
          body: 'FooBar',
          nested: [
            {
              body: 'NestedFooBar'
            }
          ],
          subdocument: {
            body: 'SubdocumentFooBar'
          }
        }
      ],
      count: 1
    });
    return Meteor.setTimeout(expect(), WAIT_TIME);
  }, function(test, expect) {
    this.post = Post.documents.findOne(this.postId, {
      transform: null
    });
    test.equal(this.post, {
      _id: this.postId,
      _schema: '1.0.0',
      author: {
        _id: this.person1._id,
        username: this.person1.username,
        displayName: this.person1.displayName,
        field1: this.person1.field1,
        field2: this.person1.field2
      },
      subscribers: [
        {
          _id: this.person2._id
        }, {
          _id: this.person3._id
        }
      ],
      reviewers: [
        {
          _id: this.person2._id,
          username: this.person2.username
        }, {
          _id: this.person3._id,
          username: this.person3.username
        }
      ],
      subdocument: {
        person: {
          _id: this.person2._id,
          username: this.person2.username,
          displayName: this.person2.displayName,
          field1: this.person2.field1,
          field2: this.person2.field2
        },
        persons: [
          {
            _id: this.person2._id,
            username: this.person2.username,
            displayName: this.person2.displayName,
            field1: this.person2.field1,
            field2: this.person2.field2
          }, {
            _id: this.person3._id,
            username: this.person3.username,
            displayName: this.person3.displayName,
            field1: this.person3.field1,
            field2: this.person3.field2
          }
        ],
        slug: 'subdocument-prefix-foobar-subdocumentfoobar-suffix',
        body: 'SubdocumentFooBar'
      },
      nested: [
        {
          required: {
            _id: this.person2._id,
            username: this.person2.username,
            displayName: this.person2.displayName,
            field1: this.person2.field1,
            field2: this.person2.field2
          },
          optional: {
            _id: this.person3._id,
            username: this.person3.username
          },
          slug: 'nested-prefix-foobar-nestedfoobar-suffix',
          body: 'NestedFooBar'
        }
      ],
      body: 'FooBar',
      slug: 'prefix-foobar-subdocumentfoobar-suffix',
      tags: ['tag-0-prefix-foobar-subdocumentfoobar-suffix', 'tag-1-prefix-foobar-nestedfoobar-suffix']
    });
    Person.documents.remove(this.person3Id, expect((function(_this) {
      return function(error) {
        return test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
      };
    })(this)));
    return Meteor.setTimeout(expect(), WAIT_TIME);
  }, function(test, expect) {
    this.post = Post.documents.findOne(this.postId, {
      transform: null
    });
    test.equal(this.post, {
      _id: this.postId,
      _schema: '1.0.0',
      author: {
        _id: this.person1._id,
        username: this.person1.username,
        displayName: this.person1.displayName,
        field1: this.person1.field1,
        field2: this.person1.field2
      },
      subscribers: [
        {
          _id: this.person2._id
        }
      ],
      reviewers: [
        {
          _id: this.person2._id,
          username: this.person2.username
        }
      ],
      subdocument: {
        person: {
          _id: this.person2._id,
          username: this.person2.username,
          displayName: this.person2.displayName,
          field1: this.person2.field1,
          field2: this.person2.field2
        },
        persons: [
          {
            _id: this.person2._id,
            username: this.person2.username,
            displayName: this.person2.displayName,
            field1: this.person2.field1,
            field2: this.person2.field2
          }
        ],
        slug: 'subdocument-prefix-foobar-subdocumentfoobar-suffix',
        body: 'SubdocumentFooBar'
      },
      nested: [
        {
          required: {
            _id: this.person2._id,
            username: this.person2.username,
            displayName: this.person2.displayName,
            field1: this.person2.field1,
            field2: this.person2.field2
          },
          optional: null,
          slug: 'nested-prefix-foobar-nestedfoobar-suffix',
          body: 'NestedFooBar'
        }
      ],
      body: 'FooBar',
      slug: 'prefix-foobar-subdocumentfoobar-suffix',
      tags: ['tag-0-prefix-foobar-subdocumentfoobar-suffix', 'tag-1-prefix-foobar-nestedfoobar-suffix']
    });
    Person.documents.remove(this.person2Id, expect((function(_this) {
      return function(error) {
        return test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
      };
    })(this)));
    return Meteor.setTimeout(expect(), WAIT_TIME);
  }, function(test, expect) {
    this.post = Post.documents.findOne(this.postId, {
      transform: null
    });
    test.equal(this.post, {
      _id: this.postId,
      _schema: '1.0.0',
      author: {
        _id: this.person1._id,
        username: this.person1.username,
        displayName: this.person1.displayName,
        field1: this.person1.field1,
        field2: this.person1.field2
      },
      subscribers: [],
      reviewers: [],
      subdocument: {
        person: null,
        persons: [],
        slug: 'subdocument-prefix-foobar-subdocumentfoobar-suffix',
        body: 'SubdocumentFooBar'
      },
      nested: [],
      body: 'FooBar',
      slug: 'prefix-foobar-subdocumentfoobar-suffix',
      tags: ['tag-0-prefix-foobar-subdocumentfoobar-suffix']
    });
    Person.documents.remove(this.person1Id, expect((function(_this) {
      return function(error) {
        return test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
      };
    })(this)));
    return Meteor.setTimeout(expect(), WAIT_TIME);
  }, function(test, expect) {
    this.post = Post.documents.findOne(this.postId, {
      transform: null
    });
    return test.isFalse(this.post, this.post);
  }
]);

Tinytest.add('peerdb - invalid optional', function(test) {
  test.throws(function() {
    var BadPost1;
    return BadPost1 = (function(_super) {
      __extends(BadPost1, _super);

      function BadPost1() {
        return BadPost1.__super__.constructor.apply(this, arguments);
      }

      BadPost1.Meta({
        name: 'BadPost1',
        fields: function() {
          return {
            reviewers: [BadPost1.ReferenceField(Person, ['username'], false)]
          };
        }
      });

      return BadPost1;

    })(Document);
  }, /Reference field directly in an array cannot be optional/);
  testDocumentList(test, ALL);
  return Document.defineAll();
});

Tinytest.add('peerdb - invalid nested arrays', function(test) {
  test.throws(function() {
    var BadPost2;
    return BadPost2 = (function(_super) {
      __extends(BadPost2, _super);

      function BadPost2() {
        return BadPost2.__super__.constructor.apply(this, arguments);
      }

      BadPost2.Meta({
        name: 'BadPost2',
        fields: function() {
          return {
            nested: [
              {
                many: [BadPost2.ReferenceField(Person, ['username'])]
              }
            ]
          };
        }
      });

      return BadPost2;

    })(Document);
  }, /Field cannot be in a nested array/);
  testDocumentList(test, ALL);
  return Document.defineAll();
});

if (!CODE_MINIMIZED) {
  Tinytest.add('peerdb - invalid name', function(test) {
    test.throws(function() {
      var BadPost3;
      return BadPost3 = (function(_super) {
        __extends(BadPost3, _super);

        function BadPost3() {
          return BadPost3.__super__.constructor.apply(this, arguments);
        }

        BadPost3.Meta({
          name: 'Post'
        });

        return BadPost3;

      })(Document);
    }, /Document name does not match class name/);
    testDocumentList(test, ALL);
    return Document.defineAll();
  });
}

Tinytest.add('peerdb - abstract with parent', function(test) {
  test.throws(function() {
    var BadPost4;
    return BadPost4 = (function(_super) {
      __extends(BadPost4, _super);

      function BadPost4() {
        return BadPost4.__super__.constructor.apply(this, arguments);
      }

      BadPost4.Meta({
        abstract: true
      });

      return BadPost4;

    })(Post);
  }, /Abstract document with a parent/);
  testDocumentList(test, ALL);
  return Document.defineAll();
});

testAsyncMulti('peerdb - circular changes', [
  function(test, expect) {
    if (Meteor.isServer && Document.instances === 1) {
      Log._intercept(3);
    }
    CircularFirst.documents.insert({
      second: null,
      content: 'FooBar 1'
    }, expect((function(_this) {
      return function(error, circularFirstId) {
        test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
        test.isTrue(circularFirstId);
        return _this.circularFirstId = circularFirstId;
      };
    })(this)));
    CircularSecond.documents.insert({
      first: null,
      content: 'FooBar 2'
    }, expect((function(_this) {
      return function(error, circularSecondId) {
        test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
        test.isTrue(circularSecondId);
        return _this.circularSecondId = circularSecondId;
      };
    })(this)));
    return Meteor.setTimeout(expect(), WAIT_TIME);
  }, function(test, expect) {
    var i, intercepted, _i, _len, _ref1;
    if (Meteor.isServer && Document.instances === 1) {
      intercepted = Log._intercepted();
      test.isTrue((1 <= (_ref1 = intercepted.length) && _ref1 <= 2), intercepted);
      for (_i = 0, _len = intercepted.length; _i < _len; _i++) {
        i = intercepted[_i];
        if (i.indexOf(this.circularFirstId) !== -1) {
          break;
        }
      }
      test.isTrue(_.isString(i), i);
      intercepted = EJSON.parse(i);
      test.equal(intercepted.message, "Document's '" + this.circularFirstId + "' field 'second' was updated with an invalid value: null");
      test.equal(intercepted.level, 'error');
    }
    this.circularFirst = CircularFirst.documents.findOne(this.circularFirstId, {
      transform: null
    });
    this.circularSecond = CircularSecond.documents.findOne(this.circularSecondId, {
      transform: null
    });
    test.equal(this.circularFirst, {
      _id: this.circularFirstId,
      _schema: '1.0.0',
      second: null,
      content: 'FooBar 1'
    });
    test.equal(this.circularSecond, {
      _id: this.circularSecondId,
      _schema: '1.0.0',
      first: null,
      content: 'FooBar 2'
    });
    CircularFirst.documents.update(this.circularFirstId, {
      $set: {
        second: {
          _id: this.circularSecondId
        }
      }
    }, expect((function(_this) {
      return function(error, res) {
        test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
        return test.isTrue(res);
      };
    })(this)));
    return Meteor.setTimeout(expect(), WAIT_TIME);
  }, function(test, expect) {
    this.circularFirst = CircularFirst.documents.findOne(this.circularFirstId, {
      transform: null
    });
    this.circularSecond = CircularSecond.documents.findOne(this.circularSecondId, {
      transform: null
    });
    test.equal(this.circularFirst, {
      _id: this.circularFirstId,
      _schema: '1.0.0',
      second: {
        _id: this.circularSecondId,
        content: 'FooBar 2'
      },
      content: 'FooBar 1'
    });
    test.equal(this.circularSecond, {
      _id: this.circularSecondId,
      _schema: '1.0.0',
      first: null,
      content: 'FooBar 2',
      reverseFirsts: [
        {
          _id: this.circularFirstId,
          content: 'FooBar 1'
        }
      ]
    });
    CircularSecond.documents.update(this.circularSecondId, {
      $set: {
        first: {
          _id: this.circularFirstId
        }
      }
    }, expect((function(_this) {
      return function(error, res) {
        test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
        return test.isTrue(res);
      };
    })(this)));
    return Meteor.setTimeout(expect(), WAIT_TIME);
  }, function(test, expect) {
    this.circularFirst = CircularFirst.documents.findOne(this.circularFirstId, {
      transform: null
    });
    this.circularSecond = CircularSecond.documents.findOne(this.circularSecondId, {
      transform: null
    });
    test.equal(this.circularFirst, {
      _id: this.circularFirstId,
      _schema: '1.0.0',
      second: {
        _id: this.circularSecondId,
        content: 'FooBar 2'
      },
      content: 'FooBar 1',
      reverseSeconds: [
        {
          _id: this.circularSecondId,
          content: 'FooBar 2'
        }
      ]
    });
    test.equal(this.circularSecond, {
      _id: this.circularSecondId,
      _schema: '1.0.0',
      first: {
        _id: this.circularFirstId,
        content: 'FooBar 1'
      },
      content: 'FooBar 2',
      reverseFirsts: [
        {
          _id: this.circularFirstId,
          content: 'FooBar 1'
        }
      ]
    });
    CircularFirst.documents.update(this.circularFirstId, {
      $set: {
        content: 'FooBar 1a'
      }
    }, expect((function(_this) {
      return function(error, res) {
        test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
        return test.isTrue(res);
      };
    })(this)));
    return Meteor.setTimeout(expect(), WAIT_TIME);
  }, function(test, expect) {
    this.circularFirst = CircularFirst.documents.findOne(this.circularFirstId, {
      transform: null
    });
    this.circularSecond = CircularSecond.documents.findOne(this.circularSecondId, {
      transform: null
    });
    test.equal(this.circularFirst, {
      _id: this.circularFirstId,
      _schema: '1.0.0',
      second: {
        _id: this.circularSecondId,
        content: 'FooBar 2'
      },
      content: 'FooBar 1a',
      reverseSeconds: [
        {
          _id: this.circularSecondId,
          content: 'FooBar 2'
        }
      ]
    });
    test.equal(this.circularSecond, {
      _id: this.circularSecondId,
      _schema: '1.0.0',
      first: {
        _id: this.circularFirstId,
        content: 'FooBar 1a'
      },
      content: 'FooBar 2',
      reverseFirsts: [
        {
          _id: this.circularFirstId,
          content: 'FooBar 1a'
        }
      ]
    });
    CircularSecond.documents.update(this.circularSecondId, {
      $set: {
        content: 'FooBar 2a'
      }
    }, expect((function(_this) {
      return function(error, res) {
        test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
        return test.isTrue(res);
      };
    })(this)));
    return Meteor.setTimeout(expect(), WAIT_TIME);
  }, function(test, expect) {
    this.circularFirst = CircularFirst.documents.findOne(this.circularFirstId, {
      transform: null
    });
    this.circularSecond = CircularSecond.documents.findOne(this.circularSecondId, {
      transform: null
    });
    test.equal(this.circularFirst, {
      _id: this.circularFirstId,
      _schema: '1.0.0',
      second: {
        _id: this.circularSecondId,
        content: 'FooBar 2a'
      },
      content: 'FooBar 1a',
      reverseSeconds: [
        {
          _id: this.circularSecondId,
          content: 'FooBar 2a'
        }
      ]
    });
    test.equal(this.circularSecond, {
      _id: this.circularSecondId,
      _schema: '1.0.0',
      first: {
        _id: this.circularFirstId,
        content: 'FooBar 1a'
      },
      content: 'FooBar 2a',
      reverseFirsts: [
        {
          _id: this.circularFirstId,
          content: 'FooBar 1a'
        }
      ]
    });
    CircularSecond.documents.remove(this.circularSecondId, expect((function(_this) {
      return function(error) {
        return test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
      };
    })(this)));
    return Meteor.setTimeout(expect(), WAIT_TIME);
  }, function(test, expect) {
    this.circularFirst = CircularFirst.documents.findOne(this.circularFirstId, {
      transform: null
    });
    this.circularSecond = CircularSecond.documents.findOne(this.circularSecondId, {
      transform: null
    });
    test.isFalse(this.circularSecond, this.circularSecond);
    test.isFalse(this.circularFirst, this.circularFirst);
    if (Meteor.isServer && Document.instances === 1) {
      Log._intercept(1);
    }
    return CircularSecond.documents.insert({
      first: null,
      content: 'FooBar 2'
    }, expect((function(_this) {
      return function(error, circularSecondId) {
        test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
        test.isTrue(circularSecondId);
        return _this.circularSecondId = circularSecondId;
      };
    })(this)));
  }, function(test, expect) {
    CircularFirst.documents.insert({
      second: {
        _id: this.circularSecondId
      },
      content: 'FooBar 1'
    }, expect((function(_this) {
      return function(error, circularFirstId) {
        test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
        test.isTrue(circularFirstId);
        return _this.circularFirstId = circularFirstId;
      };
    })(this)));
    return Meteor.setTimeout(expect(), WAIT_TIME);
  }, function(test, expect) {
    var intercepted;
    if (Meteor.isServer && Document.instances === 1) {
      intercepted = Log._intercepted();
      test.equal(intercepted.length, 0, intercepted);
    }
    this.circularFirst = CircularFirst.documents.findOne(this.circularFirstId, {
      transform: null
    });
    this.circularSecond = CircularSecond.documents.findOne(this.circularSecondId, {
      transform: null
    });
    test.equal(this.circularFirst, {
      _id: this.circularFirstId,
      _schema: '1.0.0',
      second: {
        _id: this.circularSecondId,
        content: 'FooBar 2'
      },
      content: 'FooBar 1'
    });
    test.equal(this.circularSecond, {
      _id: this.circularSecondId,
      _schema: '1.0.0',
      first: null,
      content: 'FooBar 2',
      reverseFirsts: [
        {
          _id: this.circularFirstId,
          content: 'FooBar 1'
        }
      ]
    });
    CircularSecond.documents.update(this.circularSecondId, {
      $set: {
        first: {
          _id: this.circularFirstId
        }
      }
    }, expect((function(_this) {
      return function(error, res) {
        test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
        return test.isTrue(res);
      };
    })(this)));
    return Meteor.setTimeout(expect(), WAIT_TIME);
  }, function(test, expect) {
    this.circularFirst = CircularFirst.documents.findOne(this.circularFirstId, {
      transform: null
    });
    this.circularSecond = CircularSecond.documents.findOne(this.circularSecondId, {
      transform: null
    });
    test.equal(this.circularFirst, {
      _id: this.circularFirstId,
      _schema: '1.0.0',
      second: {
        _id: this.circularSecondId,
        content: 'FooBar 2'
      },
      content: 'FooBar 1',
      reverseSeconds: [
        {
          _id: this.circularSecondId,
          content: 'FooBar 2'
        }
      ]
    });
    test.equal(this.circularSecond, {
      _id: this.circularSecondId,
      _schema: '1.0.0',
      first: {
        _id: this.circularFirstId,
        content: 'FooBar 1'
      },
      content: 'FooBar 2',
      reverseFirsts: [
        {
          _id: this.circularFirstId,
          content: 'FooBar 1'
        }
      ]
    });
    CircularFirst.documents.remove(this.circularFirstId, expect((function(_this) {
      return function(error) {
        return test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
      };
    })(this)));
    return Meteor.setTimeout(expect(), WAIT_TIME);
  }, function(test, expect) {
    this.circularFirst = CircularFirst.documents.findOne(this.circularFirstId, {
      transform: null
    });
    this.circularSecond = CircularSecond.documents.findOne(this.circularSecondId, {
      transform: null
    });
    test.isFalse(this.circularFirst, this.circularFirst);
    return test.equal(this.circularSecond, {
      _id: this.circularSecondId,
      _schema: '1.0.0',
      first: null,
      content: 'FooBar 2',
      reverseFirsts: []
    });
  }
]);

testAsyncMulti('peerdb - recursive two', [
  function(test, expect) {
    Recursive.documents.insert({
      other: null,
      content: 'FooBar 1'
    }, expect((function(_this) {
      return function(error, recursive1Id) {
        test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
        test.isTrue(recursive1Id);
        return _this.recursive1Id = recursive1Id;
      };
    })(this)));
    Recursive.documents.insert({
      other: null,
      content: 'FooBar 2'
    }, expect((function(_this) {
      return function(error, recursive2Id) {
        test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
        test.isTrue(recursive2Id);
        return _this.recursive2Id = recursive2Id;
      };
    })(this)));
    return Meteor.setTimeout(expect(), WAIT_TIME);
  }, function(test, expect) {
    this.recursive1 = Recursive.documents.findOne(this.recursive1Id, {
      transform: null
    });
    this.recursive2 = Recursive.documents.findOne(this.recursive2Id, {
      transform: null
    });
    test.equal(this.recursive1, {
      _id: this.recursive1Id,
      _schema: '1.0.0',
      other: null,
      content: 'FooBar 1'
    });
    test.equal(this.recursive2, {
      _id: this.recursive2Id,
      _schema: '1.0.0',
      other: null,
      content: 'FooBar 2'
    });
    Recursive.documents.update(this.recursive1Id, {
      $set: {
        other: {
          _id: this.recursive2Id
        }
      }
    }, expect((function(_this) {
      return function(error, res) {
        test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
        return test.isTrue(res);
      };
    })(this)));
    return Meteor.setTimeout(expect(), WAIT_TIME);
  }, function(test, expect) {
    this.recursive1 = Recursive.documents.findOne(this.recursive1Id, {
      transform: null
    });
    this.recursive2 = Recursive.documents.findOne(this.recursive2Id, {
      transform: null
    });
    test.equal(this.recursive1, {
      _id: this.recursive1Id,
      _schema: '1.0.0',
      other: {
        _id: this.recursive2Id,
        content: 'FooBar 2'
      },
      content: 'FooBar 1'
    });
    test.equal(this.recursive2, {
      _id: this.recursive2Id,
      _schema: '1.0.0',
      other: null,
      content: 'FooBar 2',
      reverse: [
        {
          _id: this.recursive1Id,
          content: 'FooBar 1'
        }
      ]
    });
    Recursive.documents.update(this.recursive2Id, {
      $set: {
        other: {
          _id: this.recursive1Id
        }
      }
    }, expect((function(_this) {
      return function(error, res) {
        test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
        return test.isTrue(res);
      };
    })(this)));
    return Meteor.setTimeout(expect(), WAIT_TIME);
  }, function(test, expect) {
    this.recursive1 = Recursive.documents.findOne(this.recursive1Id, {
      transform: null
    });
    this.recursive2 = Recursive.documents.findOne(this.recursive2Id, {
      transform: null
    });
    test.equal(this.recursive1, {
      _id: this.recursive1Id,
      _schema: '1.0.0',
      other: {
        _id: this.recursive2Id,
        content: 'FooBar 2'
      },
      content: 'FooBar 1',
      reverse: [
        {
          _id: this.recursive2Id,
          content: 'FooBar 2'
        }
      ]
    });
    test.equal(this.recursive2, {
      _id: this.recursive2Id,
      _schema: '1.0.0',
      other: {
        _id: this.recursive1Id,
        content: 'FooBar 1'
      },
      content: 'FooBar 2',
      reverse: [
        {
          _id: this.recursive1Id,
          content: 'FooBar 1'
        }
      ]
    });
    Recursive.documents.update(this.recursive1Id, {
      $set: {
        content: 'FooBar 1a'
      }
    }, expect((function(_this) {
      return function(error, res) {
        test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
        return test.isTrue(res);
      };
    })(this)));
    return Meteor.setTimeout(expect(), WAIT_TIME);
  }, function(test, expect) {
    this.recursive1 = Recursive.documents.findOne(this.recursive1Id, {
      transform: null
    });
    this.recursive2 = Recursive.documents.findOne(this.recursive2Id, {
      transform: null
    });
    test.equal(this.recursive1, {
      _id: this.recursive1Id,
      _schema: '1.0.0',
      other: {
        _id: this.recursive2Id,
        content: 'FooBar 2'
      },
      content: 'FooBar 1a',
      reverse: [
        {
          _id: this.recursive2Id,
          content: 'FooBar 2'
        }
      ]
    });
    test.equal(this.recursive2, {
      _id: this.recursive2Id,
      _schema: '1.0.0',
      other: {
        _id: this.recursive1Id,
        content: 'FooBar 1a'
      },
      content: 'FooBar 2',
      reverse: [
        {
          _id: this.recursive1Id,
          content: 'FooBar 1a'
        }
      ]
    });
    Recursive.documents.update(this.recursive2Id, {
      $set: {
        content: 'FooBar 2a'
      }
    }, expect((function(_this) {
      return function(error, res) {
        test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
        return test.isTrue(res);
      };
    })(this)));
    return Meteor.setTimeout(expect(), WAIT_TIME);
  }, function(test, expect) {
    this.recursive1 = Recursive.documents.findOne(this.recursive1Id, {
      transform: null
    });
    this.recursive2 = Recursive.documents.findOne(this.recursive2Id, {
      transform: null
    });
    test.equal(this.recursive1, {
      _id: this.recursive1Id,
      _schema: '1.0.0',
      other: {
        _id: this.recursive2Id,
        content: 'FooBar 2a'
      },
      content: 'FooBar 1a',
      reverse: [
        {
          _id: this.recursive2Id,
          content: 'FooBar 2a'
        }
      ]
    });
    test.equal(this.recursive2, {
      _id: this.recursive2Id,
      _schema: '1.0.0',
      other: {
        _id: this.recursive1Id,
        content: 'FooBar 1a'
      },
      content: 'FooBar 2a',
      reverse: [
        {
          _id: this.recursive1Id,
          content: 'FooBar 1a'
        }
      ]
    });
    Recursive.documents.remove(this.recursive2Id, expect((function(_this) {
      return function(error) {
        return test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
      };
    })(this)));
    return Meteor.setTimeout(expect(), WAIT_TIME);
  }, function(test, expect) {
    this.recursive1 = Recursive.documents.findOne(this.recursive1Id, {
      transform: null
    });
    this.recursive2 = Recursive.documents.findOne(this.recursive2Id, {
      transform: null
    });
    test.isFalse(this.recursive2, this.recursive2);
    return test.equal(this.recursive1, {
      _id: this.recursive1Id,
      _schema: '1.0.0',
      other: null,
      content: 'FooBar 1a',
      reverse: []
    });
  }
]);

testAsyncMulti('peerdb - recursive one', [
  function(test, expect) {
    Recursive.documents.insert({
      other: null,
      content: 'FooBar'
    }, expect((function(_this) {
      return function(error, recursiveId) {
        test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
        test.isTrue(recursiveId);
        return _this.recursiveId = recursiveId;
      };
    })(this)));
    return Meteor.setTimeout(expect(), WAIT_TIME);
  }, function(test, expect) {
    this.recursive = Recursive.documents.findOne(this.recursiveId, {
      transform: null
    });
    test.equal(this.recursive, {
      _id: this.recursiveId,
      _schema: '1.0.0',
      other: null,
      content: 'FooBar'
    });
    Recursive.documents.update(this.recursiveId, {
      $set: {
        other: {
          _id: this.recursiveId
        }
      }
    }, expect((function(_this) {
      return function(error, res) {
        test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
        return test.isTrue(res);
      };
    })(this)));
    return Meteor.setTimeout(expect(), WAIT_TIME);
  }, function(test, expect) {
    this.recursive = Recursive.documents.findOne(this.recursiveId, {
      transform: null
    });
    test.equal(this.recursive, {
      _id: this.recursiveId,
      _schema: '1.0.0',
      other: {
        _id: this.recursiveId,
        content: 'FooBar'
      },
      content: 'FooBar',
      reverse: [
        {
          _id: this.recursiveId,
          content: 'FooBar'
        }
      ]
    });
    Recursive.documents.update(this.recursiveId, {
      $set: {
        content: 'FooBara'
      }
    }, expect((function(_this) {
      return function(error, res) {
        test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
        return test.isTrue(res);
      };
    })(this)));
    return Meteor.setTimeout(expect(), WAIT_TIME);
  }, function(test, expect) {
    this.recursive = Recursive.documents.findOne(this.recursiveId, {
      transform: null
    });
    test.equal(this.recursive, {
      _id: this.recursiveId,
      _schema: '1.0.0',
      other: {
        _id: this.recursiveId,
        content: 'FooBara'
      },
      content: 'FooBara',
      reverse: [
        {
          _id: this.recursiveId,
          content: 'FooBara'
        }
      ]
    });
    Recursive.documents.remove(this.recursiveId, expect((function(_this) {
      return function(error) {
        return test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
      };
    })(this)));
    return Meteor.setTimeout(expect(), WAIT_TIME);
  }, function(test, expect) {
    this.recursive = Recursive.documents.findOne(this.recursiveId, {
      transform: null
    });
    return test.isFalse(this.recursive, this.recursive);
  }
]);

if (Meteor.isServer && Document.instances === 1) {
  Tinytest.add('peerdb - errors', function(test) {
    var intercepted, postId, userLinkId;
    Log._intercept(2);
    postId = Post.documents.insert({
      author: {
        _id: 'nonexistent'
      }
    });
    Meteor._sleepForMs(WAIT_TIME);
    intercepted = Log._intercepted();
    test.equal(intercepted.length, 1, intercepted);
    test.isTrue(_.isString(intercepted[0]), intercepted[0]);
    intercepted = EJSON.parse(intercepted[0]);
    test.equal(intercepted.message, "Document's '" + postId + "' field 'author' is referencing a nonexistent document 'nonexistent'");
    test.equal(intercepted.level, 'error');
    Log._intercept(2);
    postId = Post.documents.insert({
      subscribers: 'foobar'
    });
    Meteor._sleepForMs(WAIT_TIME);
    intercepted = Log._intercepted();
    test.equal(intercepted.length, 1, intercepted);
    test.isTrue(_.isString(intercepted[0]), intercepted[0]);
    intercepted = EJSON.parse(intercepted[0]);
    test.equal(intercepted.message, "Document's '" + postId + "' field 'subscribers' was updated with a non-array value: 'foobar'");
    test.equal(intercepted.level, 'error');
    Log._intercept(2);
    postId = Post.documents.insert({
      author: null
    });
    Meteor._sleepForMs(WAIT_TIME);
    intercepted = Log._intercepted();
    test.equal(intercepted.length, 1, intercepted);
    test.isTrue(_.isString(intercepted[0]), intercepted[0]);
    intercepted = EJSON.parse(intercepted[0]);
    test.equal(intercepted.message, "Document's '" + postId + "' field 'author' was updated with an invalid value: null");
    test.equal(intercepted.level, 'error');
    Log._intercept(1);
    userLinkId = UserLink.documents.insert({
      user: null
    });
    Meteor._sleepForMs(WAIT_TIME);
    intercepted = Log._intercepted();
    return test.equal(intercepted.length, 0, intercepted);
  });
}

testAsyncMulti('peerdb - delayed defintion', [
  function(test, expect) {
    var BadPost5;
    BadPost5 = (function(_super) {
      __extends(BadPost5, _super);

      function BadPost5() {
        return BadPost5.__super__.constructor.apply(this, arguments);
      }

      BadPost5.Meta({
        name: 'BadPost5',
        fields: function() {
          return {
            author: BadPost5.ReferenceField(void 0, ['username'])
          };
        }
      });

      return BadPost5;

    })(Document);
    Log._intercept(2);
    return Meteor.setTimeout(expect(), 1000);
  }, function(test, expect) {
    var i, intercepted, _i, _len, _ref1;
    intercepted = Log._intercepted();
    test.isTrue((1 <= (_ref1 = intercepted.length) && _ref1 <= 2), intercepted);
    for (_i = 0, _len = intercepted.length; _i < _len; _i++) {
      i = intercepted[_i];
      if (i.indexOf('BadPost5') !== -1) {
        break;
      }
    }
    test.isTrue(_.isString(i), i);
    intercepted = EJSON.parse(i);
    test.equal(intercepted.message.lastIndexOf("Not all delayed document definitions were successfully retried:\nBadPost5 from"), 0, intercepted.message);
    test.equal(intercepted.level, 'error');
    testDocumentList(test, ALL);
    test.equal(Document._delayed.length, 1);
    Document._delayed = [];
    return Document._clearDelayedCheck();
  }
]);

testAsyncMulti('peerdb - subdocument fields', [
  function(test, expect) {
    Person.documents.insert({
      username: 'person1',
      displayName: 'Person 1',
      field1: 'Field 1 - 1',
      field2: 'Field 1 - 2'
    }, expect((function(_this) {
      return function(error, person1Id) {
        test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
        test.isTrue(person1Id);
        return _this.person1Id = person1Id;
      };
    })(this)));
    Person.documents.insert({
      username: 'person2',
      displayName: 'Person 2',
      field1: 'Field 2 - 1',
      field2: 'Field 2 - 2'
    }, expect((function(_this) {
      return function(error, person2Id) {
        test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
        test.isTrue(person2Id);
        return _this.person2Id = person2Id;
      };
    })(this)));
    Person.documents.insert({
      username: 'person3',
      displayName: 'Person 3',
      field1: 'Field 3 - 1',
      field2: 'Field 3 - 2'
    }, expect((function(_this) {
      return function(error, person3Id) {
        test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
        test.isTrue(person3Id);
        return _this.person3Id = person3Id;
      };
    })(this)));
    return Meteor.setTimeout(expect(), WAIT_TIME);
  }, function(test, expect) {
    this.person1 = Person.documents.findOne(this.person1Id, {
      transform: null
    });
    this.person2 = Person.documents.findOne(this.person2Id, {
      transform: null
    });
    this.person3 = Person.documents.findOne(this.person3Id, {
      transform: null
    });
    test.equal(this.person1, {
      _id: this.person1Id,
      _schema: '1.0.0',
      username: 'person1',
      displayName: 'Person 1',
      field1: 'Field 1 - 1',
      field2: 'Field 1 - 2',
      count: 0
    });
    test.equal(this.person2, {
      _id: this.person2Id,
      _schema: '1.0.0',
      username: 'person2',
      displayName: 'Person 2',
      field1: 'Field 2 - 1',
      field2: 'Field 2 - 2',
      count: 0
    });
    test.equal(this.person3, {
      _id: this.person3Id,
      _schema: '1.0.0',
      username: 'person3',
      displayName: 'Person 3',
      field1: 'Field 3 - 1',
      field2: 'Field 3 - 2',
      count: 0
    });
    Post.documents.insert({
      author: {
        _id: this.person1._id
      },
      subscribers: [
        {
          _id: this.person2._id
        }, {
          _id: this.person3._id
        }
      ],
      reviewers: [
        {
          _id: this.person2._id
        }, {
          _id: this.person3._id
        }
      ],
      subdocument: {
        person: {
          _id: this.person2._id
        },
        persons: [
          {
            _id: this.person2._id
          }, {
            _id: this.person3._id
          }
        ],
        body: 'SubdocumentFooBar'
      },
      nested: [
        {
          required: {
            _id: this.person2._id
          },
          optional: {
            _id: this.person3._id
          },
          body: 'NestedFooBar'
        }
      ],
      body: 'FooBar'
    }, expect((function(_this) {
      return function(error, postId) {
        test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
        test.isTrue(postId);
        return _this.postId = postId;
      };
    })(this)));
    return Meteor.setTimeout(expect(), WAIT_TIME);
  }, function(test, expect) {
    this.post = Post.documents.findOne(this.postId, {
      transform: null
    });
    test.equal(this.post, {
      _id: this.postId,
      _schema: '1.0.0',
      author: {
        _id: this.person1._id,
        username: this.person1.username,
        displayName: this.person1.displayName,
        field1: this.person1.field1,
        field2: this.person1.field2
      },
      subscribers: [
        {
          _id: this.person2._id
        }, {
          _id: this.person3._id
        }
      ],
      reviewers: [
        {
          _id: this.person2._id,
          username: this.person2.username
        }, {
          _id: this.person3._id,
          username: this.person3.username
        }
      ],
      subdocument: {
        person: {
          _id: this.person2._id,
          username: this.person2.username,
          displayName: this.person2.displayName,
          field1: this.person2.field1,
          field2: this.person2.field2
        },
        persons: [
          {
            _id: this.person2._id,
            username: this.person2.username,
            displayName: this.person2.displayName,
            field1: this.person2.field1,
            field2: this.person2.field2
          }, {
            _id: this.person3._id,
            username: this.person3.username,
            displayName: this.person3.displayName,
            field1: this.person3.field1,
            field2: this.person3.field2
          }
        ],
        slug: 'subdocument-prefix-foobar-subdocumentfoobar-suffix',
        body: 'SubdocumentFooBar'
      },
      nested: [
        {
          required: {
            _id: this.person2._id,
            username: this.person2.username,
            displayName: this.person2.displayName,
            field1: this.person2.field1,
            field2: this.person2.field2
          },
          optional: {
            _id: this.person3._id,
            username: this.person3.username
          },
          slug: 'nested-prefix-foobar-nestedfoobar-suffix',
          body: 'NestedFooBar'
        }
      ],
      body: 'FooBar',
      slug: 'prefix-foobar-subdocumentfoobar-suffix',
      tags: ['tag-0-prefix-foobar-subdocumentfoobar-suffix', 'tag-1-prefix-foobar-nestedfoobar-suffix']
    });
    PostLink.documents.insert({
      post: {
        _id: this.post._id
      }
    }, expect((function(_this) {
      return function(error, postLinkId) {
        test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
        test.isTrue(postLinkId);
        return _this.postLinkId = postLinkId;
      };
    })(this)));
    return Meteor.setTimeout(expect(), WAIT_TIME);
  }, function(test, expect) {
    this.postLink = PostLink.documents.findOne(this.postLinkId, {
      transform: null
    });
    test.equal(this.postLink, {
      _id: this.postLinkId,
      _schema: '1.0.0',
      post: {
        _id: this.post._id,
        subdocument: {
          person: {
            _id: this.person2._id,
            username: this.person2.username,
            displayName: this.person2.displayName,
            field1: this.person2.field1,
            field2: this.person2.field2
          },
          persons: [
            {
              _id: this.person2._id,
              username: this.person2.username,
              displayName: this.person2.displayName,
              field1: this.person2.field1,
              field2: this.person2.field2
            }, {
              _id: this.person3._id,
              username: this.person3.username,
              displayName: this.person3.displayName,
              field1: this.person3.field1,
              field2: this.person3.field2
            }
          ]
        }
      }
    });
    Person.documents.update(this.person2Id, {
      $set: {
        username: 'person2a'
      }
    }, expect((function(_this) {
      return function(error, res) {
        test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
        return test.isTrue(res);
      };
    })(this)));
    return Meteor.setTimeout(expect(), WAIT_TIME);
  }, function(test, expect) {
    this.person2 = Person.documents.findOne(this.person2Id, {
      transform: null
    });
    test.equal(this.person2, {
      _id: this.person2Id,
      _schema: '1.0.0',
      username: 'person2a',
      displayName: 'Person 2',
      field1: 'Field 2 - 1',
      field2: 'Field 2 - 2',
      subdocumentPosts: [
        {
          _id: this.postId,
          body: 'FooBar',
          nested: [
            {
              body: 'NestedFooBar'
            }
          ],
          subdocument: {
            body: 'SubdocumentFooBar'
          }
        }
      ],
      subdocumentsPosts: [
        {
          _id: this.postId,
          body: 'FooBar',
          nested: [
            {
              body: 'NestedFooBar'
            }
          ],
          subdocument: {
            body: 'SubdocumentFooBar'
          }
        }
      ],
      nestedPosts: [
        {
          _id: this.postId,
          body: 'FooBar',
          nested: [
            {
              body: 'NestedFooBar'
            }
          ],
          subdocument: {
            body: 'SubdocumentFooBar'
          }
        }
      ],
      count: 3
    });
    this.postLink = PostLink.documents.findOne(this.postLinkId, {
      transform: null
    });
    test.equal(this.postLink, {
      _id: this.postLinkId,
      _schema: '1.0.0',
      post: {
        _id: this.post._id,
        subdocument: {
          person: {
            _id: this.person2._id,
            username: this.person2.username,
            displayName: this.person2.displayName,
            field1: this.person2.field1,
            field2: this.person2.field2
          },
          persons: [
            {
              _id: this.person2._id,
              username: this.person2.username,
              displayName: this.person2.displayName,
              field1: this.person2.field1,
              field2: this.person2.field2
            }, {
              _id: this.person3._id,
              username: this.person3.username,
              displayName: this.person3.displayName,
              field1: this.person3.field1,
              field2: this.person3.field2
            }
          ]
        }
      }
    });
    Person.documents.remove(this.person2Id, expect((function(_this) {
      return function(error) {
        return test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
      };
    })(this)));
    return Meteor.setTimeout(expect(), WAIT_TIME);
  }, function(test, expect) {
    this.postLink = PostLink.documents.findOne(this.postLinkId, {
      transform: null
    });
    test.equal(this.postLink, {
      _id: this.postLinkId,
      _schema: '1.0.0',
      post: {
        _id: this.post._id,
        subdocument: {
          person: null,
          persons: [
            {
              _id: this.person3._id,
              username: this.person3.username,
              displayName: this.person3.displayName,
              field1: this.person3.field1,
              field2: this.person3.field2
            }
          ]
        }
      }
    });
    Post.documents.remove(this.post._id, expect((function(_this) {
      return function(error) {
        return test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
      };
    })(this)));
    return Meteor.setTimeout(expect(), WAIT_TIME);
  }, function(test, expect) {
    this.postLink = PostLink.documents.findOne(this.postLinkId, {
      transform: null
    });
    return test.isFalse(this.postLink, this.postLink);
  }
]);

testAsyncMulti('peerdb - generated fields', [
  function(test, expect) {
    Person.documents.insert({
      username: 'person1',
      displayName: 'Person 1'
    }, expect((function(_this) {
      return function(error, person1Id) {
        test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
        test.isTrue(person1Id);
        return _this.person1Id = person1Id;
      };
    })(this)));
    Person.documents.insert({
      username: 'person2',
      displayName: 'Person 2'
    }, expect((function(_this) {
      return function(error, person2Id) {
        test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
        test.isTrue(person2Id);
        return _this.person2Id = person2Id;
      };
    })(this)));
    Person.documents.insert({
      username: 'person3',
      displayName: 'Person 3'
    }, expect((function(_this) {
      return function(error, person3Id) {
        test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
        test.isTrue(person3Id);
        return _this.person3Id = person3Id;
      };
    })(this)));
    return Meteor.setTimeout(expect(), WAIT_TIME);
  }, function(test, expect) {
    this.person1 = Person.documents.findOne(this.person1Id, {
      transform: null
    });
    this.person2 = Person.documents.findOne(this.person2Id, {
      transform: null
    });
    this.person3 = Person.documents.findOne(this.person3Id, {
      transform: null
    });
    test.equal(this.person1, {
      _id: this.person1Id,
      _schema: '1.0.0',
      username: 'person1',
      displayName: 'Person 1',
      count: 0
    });
    test.equal(this.person2, {
      _id: this.person2Id,
      _schema: '1.0.0',
      username: 'person2',
      displayName: 'Person 2',
      count: 0
    });
    test.equal(this.person3, {
      _id: this.person3Id,
      _schema: '1.0.0',
      username: 'person3',
      displayName: 'Person 3',
      count: 0
    });
    Post.documents.insert({
      author: {
        _id: this.person1._id
      },
      subscribers: [
        {
          _id: this.person2._id
        }, {
          _id: this.person3._id
        }
      ],
      reviewers: [
        {
          _id: this.person2._id
        }, {
          _id: this.person3._id
        }
      ],
      subdocument: {
        person: {
          _id: this.person2._id
        },
        persons: [
          {
            _id: this.person2._id
          }, {
            _id: this.person3._id
          }
        ],
        body: 'SubdocumentFooBar'
      },
      nested: [
        {
          required: {
            _id: this.person2._id
          },
          optional: {
            _id: this.person3._id
          },
          body: 'NestedFooBar'
        }
      ],
      body: 'FooBar'
    }, expect((function(_this) {
      return function(error, postId) {
        test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
        test.isTrue(postId);
        return _this.postId = postId;
      };
    })(this)));
    return Meteor.setTimeout(expect(), WAIT_TIME);
  }, function(test, expect) {
    this.post = Post.documents.findOne(this.postId, {
      transform: null
    });
    test.equal(this.post, {
      _id: this.postId,
      _schema: '1.0.0',
      author: {
        _id: this.person1._id,
        username: this.person1.username,
        displayName: this.person1.displayName
      },
      subscribers: [
        {
          _id: this.person2._id
        }, {
          _id: this.person3._id
        }
      ],
      reviewers: [
        {
          _id: this.person2._id,
          username: this.person2.username
        }, {
          _id: this.person3._id,
          username: this.person3.username
        }
      ],
      subdocument: {
        person: {
          _id: this.person2._id,
          username: this.person2.username,
          displayName: this.person2.displayName
        },
        persons: [
          {
            _id: this.person2._id,
            username: this.person2.username,
            displayName: this.person2.displayName
          }, {
            _id: this.person3._id,
            username: this.person3.username,
            displayName: this.person3.displayName
          }
        ],
        slug: 'subdocument-prefix-foobar-subdocumentfoobar-suffix',
        body: 'SubdocumentFooBar'
      },
      nested: [
        {
          required: {
            _id: this.person2._id,
            username: this.person2.username,
            displayName: this.person2.displayName
          },
          optional: {
            _id: this.person3._id,
            username: this.person3.username
          },
          slug: 'nested-prefix-foobar-nestedfoobar-suffix',
          body: 'NestedFooBar'
        }
      ],
      body: 'FooBar',
      slug: 'prefix-foobar-subdocumentfoobar-suffix',
      tags: ['tag-0-prefix-foobar-subdocumentfoobar-suffix', 'tag-1-prefix-foobar-nestedfoobar-suffix']
    });
    Post.documents.update(this.postId, {
      $set: {
        body: 'FooBarZ'
      }
    }, expect((function(_this) {
      return function(error, res) {
        test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
        return test.isTrue(res);
      };
    })(this)));
    return Meteor.setTimeout(expect(), WAIT_TIME);
  }, function(test, expect) {
    this.post = Post.documents.findOne(this.postId, {
      transform: null
    });
    test.equal(this.post, {
      _id: this.postId,
      _schema: '1.0.0',
      author: {
        _id: this.person1._id,
        username: this.person1.username,
        displayName: this.person1.displayName
      },
      subscribers: [
        {
          _id: this.person2._id
        }, {
          _id: this.person3._id
        }
      ],
      reviewers: [
        {
          _id: this.person2._id,
          username: this.person2.username
        }, {
          _id: this.person3._id,
          username: this.person3.username
        }
      ],
      subdocument: {
        person: {
          _id: this.person2._id,
          username: this.person2.username,
          displayName: this.person2.displayName
        },
        persons: [
          {
            _id: this.person2._id,
            username: this.person2.username,
            displayName: this.person2.displayName
          }, {
            _id: this.person3._id,
            username: this.person3.username,
            displayName: this.person3.displayName
          }
        ],
        slug: 'subdocument-prefix-foobarz-subdocumentfoobar-suffix',
        body: 'SubdocumentFooBar'
      },
      nested: [
        {
          required: {
            _id: this.person2._id,
            username: this.person2.username,
            displayName: this.person2.displayName
          },
          optional: {
            _id: this.person3._id,
            username: this.person3.username
          },
          slug: 'nested-prefix-foobarz-nestedfoobar-suffix',
          body: 'NestedFooBar'
        }
      ],
      body: 'FooBarZ',
      slug: 'prefix-foobarz-subdocumentfoobar-suffix',
      tags: ['tag-0-prefix-foobarz-subdocumentfoobar-suffix', 'tag-1-prefix-foobarz-nestedfoobar-suffix']
    });
    Post.documents.update(this.postId, {
      $set: {
        'subdocument.body': 'SubdocumentFooBarZ'
      }
    }, expect((function(_this) {
      return function(error, res) {
        test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
        return test.isTrue(res);
      };
    })(this)));
    return Meteor.setTimeout(expect(), WAIT_TIME);
  }, function(test, expect) {
    this.post = Post.documents.findOne(this.postId, {
      transform: null
    });
    test.equal(this.post, {
      _id: this.postId,
      _schema: '1.0.0',
      author: {
        _id: this.person1._id,
        username: this.person1.username,
        displayName: this.person1.displayName
      },
      subscribers: [
        {
          _id: this.person2._id
        }, {
          _id: this.person3._id
        }
      ],
      reviewers: [
        {
          _id: this.person2._id,
          username: this.person2.username
        }, {
          _id: this.person3._id,
          username: this.person3.username
        }
      ],
      subdocument: {
        person: {
          _id: this.person2._id,
          username: this.person2.username,
          displayName: this.person2.displayName
        },
        persons: [
          {
            _id: this.person2._id,
            username: this.person2.username,
            displayName: this.person2.displayName
          }, {
            _id: this.person3._id,
            username: this.person3.username,
            displayName: this.person3.displayName
          }
        ],
        slug: 'subdocument-prefix-foobarz-subdocumentfoobarz-suffix',
        body: 'SubdocumentFooBarZ'
      },
      nested: [
        {
          required: {
            _id: this.person2._id,
            username: this.person2.username,
            displayName: this.person2.displayName
          },
          optional: {
            _id: this.person3._id,
            username: this.person3.username
          },
          slug: 'nested-prefix-foobarz-nestedfoobar-suffix',
          body: 'NestedFooBar'
        }
      ],
      body: 'FooBarZ',
      slug: 'prefix-foobarz-subdocumentfoobarz-suffix',
      tags: ['tag-0-prefix-foobarz-subdocumentfoobarz-suffix', 'tag-1-prefix-foobarz-nestedfoobar-suffix']
    });
    Post.documents.update(this.postId, {
      $set: {
        'nested.0.body': 'NestedFooBarZ'
      }
    }, expect((function(_this) {
      return function(error, res) {
        test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
        return test.isTrue(res);
      };
    })(this)));
    return Meteor.setTimeout(expect(), WAIT_TIME);
  }, function(test, expect) {
    this.post = Post.documents.findOne(this.postId, {
      transform: null
    });
    test.equal(this.post, {
      _id: this.postId,
      _schema: '1.0.0',
      author: {
        _id: this.person1._id,
        username: this.person1.username,
        displayName: this.person1.displayName
      },
      subscribers: [
        {
          _id: this.person2._id
        }, {
          _id: this.person3._id
        }
      ],
      reviewers: [
        {
          _id: this.person2._id,
          username: this.person2.username
        }, {
          _id: this.person3._id,
          username: this.person3.username
        }
      ],
      subdocument: {
        person: {
          _id: this.person2._id,
          username: this.person2.username,
          displayName: this.person2.displayName
        },
        persons: [
          {
            _id: this.person2._id,
            username: this.person2.username,
            displayName: this.person2.displayName
          }, {
            _id: this.person3._id,
            username: this.person3.username,
            displayName: this.person3.displayName
          }
        ],
        slug: 'subdocument-prefix-foobarz-subdocumentfoobarz-suffix',
        body: 'SubdocumentFooBarZ'
      },
      nested: [
        {
          required: {
            _id: this.person2._id,
            username: this.person2.username,
            displayName: this.person2.displayName
          },
          optional: {
            _id: this.person3._id,
            username: this.person3.username
          },
          slug: 'nested-prefix-foobarz-nestedfoobarz-suffix',
          body: 'NestedFooBarZ'
        }
      ],
      body: 'FooBarZ',
      slug: 'prefix-foobarz-subdocumentfoobarz-suffix',
      tags: ['tag-0-prefix-foobarz-subdocumentfoobarz-suffix', 'tag-1-prefix-foobarz-nestedfoobarz-suffix']
    });
    Post.documents.update(this.postId, {
      $set: {
        body: null
      }
    }, expect((function(_this) {
      return function(error, res) {
        test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
        return test.isTrue(res);
      };
    })(this)));
    return Meteor.setTimeout(expect(), WAIT_TIME);
  }, function(test, expect) {
    this.post = Post.documents.findOne(this.postId, {
      transform: null
    });
    test.equal(this.post, {
      _id: this.postId,
      _schema: '1.0.0',
      author: {
        _id: this.person1._id,
        username: this.person1.username,
        displayName: this.person1.displayName
      },
      subscribers: [
        {
          _id: this.person2._id
        }, {
          _id: this.person3._id
        }
      ],
      reviewers: [
        {
          _id: this.person2._id,
          username: this.person2.username
        }, {
          _id: this.person3._id,
          username: this.person3.username
        }
      ],
      subdocument: {
        person: {
          _id: this.person2._id,
          username: this.person2.username,
          displayName: this.person2.displayName
        },
        persons: [
          {
            _id: this.person2._id,
            username: this.person2.username,
            displayName: this.person2.displayName
          }, {
            _id: this.person3._id,
            username: this.person3.username,
            displayName: this.person3.displayName
          }
        ],
        slug: null,
        body: 'SubdocumentFooBarZ'
      },
      nested: [
        {
          required: {
            _id: this.person2._id,
            username: this.person2.username,
            displayName: this.person2.displayName
          },
          optional: {
            _id: this.person3._id,
            username: this.person3.username
          },
          slug: null,
          body: 'NestedFooBarZ'
        }
      ],
      body: null,
      slug: null,
      tags: []
    });
    Post.documents.update(this.postId, {
      $unset: {
        body: ''
      }
    }, expect((function(_this) {
      return function(error, res) {
        test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
        return test.isTrue(res);
      };
    })(this)));
    return Meteor.setTimeout(expect(), WAIT_TIME);
  }, function(test, expect) {
    this.post = Post.documents.findOne(this.postId, {
      transform: null
    });
    return test.equal(this.post, {
      _id: this.postId,
      _schema: '1.0.0',
      author: {
        _id: this.person1._id,
        username: this.person1.username,
        displayName: this.person1.displayName
      },
      subscribers: [
        {
          _id: this.person2._id
        }, {
          _id: this.person3._id
        }
      ],
      reviewers: [
        {
          _id: this.person2._id,
          username: this.person2.username
        }, {
          _id: this.person3._id,
          username: this.person3.username
        }
      ],
      subdocument: {
        person: {
          _id: this.person2._id,
          username: this.person2.username,
          displayName: this.person2.displayName
        },
        persons: [
          {
            _id: this.person2._id,
            username: this.person2.username,
            displayName: this.person2.displayName
          }, {
            _id: this.person3._id,
            username: this.person3.username,
            displayName: this.person3.displayName
          }
        ],
        body: 'SubdocumentFooBarZ'
      },
      nested: [
        {
          required: {
            _id: this.person2._id,
            username: this.person2.username,
            displayName: this.person2.displayName
          },
          optional: {
            _id: this.person3._id,
            username: this.person3.username
          },
          body: 'NestedFooBarZ'
        }
      ],
      tags: []
    });
  }
]);

Tinytest.add('peerdb - chain of extended classes', function(test) {
  var First, Second, Third, firstReferenceA, firstReferenceB, list, secondReferenceA, secondReferenceB, _TestFirst, _TestFirst2, _TestSecond, _TestThird, _TestThird2;
  list = _.clone(Document.list);
  firstReferenceA = void 0;
  secondReferenceA = void 0;
  firstReferenceB = void 0;
  secondReferenceB = void 0;
  First = (function(_super) {
    __extends(First, _super);

    function First() {
      return First.__super__.constructor.apply(this, arguments);
    }

    First.Meta({
      name: 'First',
      fields: function() {
        return {
          first: First.ReferenceField(firstReferenceA)
        };
      }
    });

    return First;

  })(Document);
  Second = (function(_super) {
    __extends(Second, _super);

    function Second() {
      return Second.__super__.constructor.apply(this, arguments);
    }

    Second.Meta({
      name: 'Second',
      fields: function(fields) {
        fields.second = Second.ReferenceField(Post);
        return fields;
      }
    });

    return Second;

  })(First);
  Third = (function(_super) {
    __extends(Third, _super);

    function Third() {
      return Third.__super__.constructor.apply(this, arguments);
    }

    Third.Meta({
      name: 'Third',
      fields: function(fields) {
        fields.third = Third.ReferenceField(secondReferenceA);
        return fields;
      }
    });

    return Third;

  })(Second);
  testDocumentList(test, ALL);
  test.equal(Document._delayed.length, 3);
  test.equal(Document._delayed[0], First);
  test.equal(Document._delayed[1], Second);
  test.equal(Document._delayed[2], Third);
  _TestFirst = First;
  First = (function(_super) {
    __extends(First, _super);

    function First() {
      return First.__super__.constructor.apply(this, arguments);
    }

    First.Meta({
      name: 'First',
      replaceParent: true,
      fields: function(fields) {
        fields.first = First.ReferenceField(firstReferenceB);
        return fields;
      }
    });

    return First;

  })(First);
  _TestSecond = Second;
  Second = (function(_super) {
    __extends(Second, _super);

    function Second() {
      return Second.__super__.constructor.apply(this, arguments);
    }

    Second.Meta({
      name: 'Second',
      replaceParent: true,
      fields: function(fields) {
        fields.second = Second.ReferenceField(Person);
        return fields;
      }
    });

    return Second;

  })(Second);
  _TestThird = Third;
  Third = (function(_super) {
    __extends(Third, _super);

    function Third() {
      return Third.__super__.constructor.apply(this, arguments);
    }

    Third.Meta({
      name: 'Third',
      replaceParent: true,
      fields: function(fields) {
        fields.third = Third.ReferenceField(secondReferenceB);
        return fields;
      }
    });

    return Third;

  })(Third);
  testDocumentList(test, ALL);
  test.equal(Document._delayed.length, 6);
  test.equal(Document._delayed[0], _TestFirst);
  test.equal(Document._delayed[1], _TestSecond);
  test.equal(Document._delayed[2], _TestThird);
  test.equal(Document._delayed[3], First);
  test.equal(Document._delayed[4], Second);
  test.equal(Document._delayed[5], Third);
  _TestThird2 = Third;
  Third = (function(_super) {
    __extends(Third, _super);

    function Third() {
      return Third.__super__.constructor.apply(this, arguments);
    }

    Third.Meta({
      name: 'Third',
      replaceParent: true,
      fields: function(fields) {
        fields.third = Third.ReferenceField(Person);
        return fields;
      }
    });

    return Third;

  })(Third);
  testDocumentList(test, ALL);
  test.equal(Document._delayed.length, 7);
  test.equal(Document._delayed[0], _TestFirst);
  test.equal(Document._delayed[1], _TestSecond);
  test.equal(Document._delayed[2], _TestThird);
  test.equal(Document._delayed[3], First);
  test.equal(Document._delayed[4], Second);
  test.equal(Document._delayed[5], _TestThird2);
  test.equal(Document._delayed[6], Third);
  _TestFirst2 = First;
  First = (function(_super) {
    __extends(First, _super);

    function First() {
      return First.__super__.constructor.apply(this, arguments);
    }

    First.Meta({
      name: 'First',
      replaceParent: true,
      fields: function(fields) {
        fields.first = First.ReferenceField(Person);
        return fields;
      }
    });

    return First;

  })(First);
  testDocumentList(test, ALL);
  test.equal(Document._delayed.length, 8);
  test.equal(Document._delayed[0], _TestFirst);
  test.equal(Document._delayed[1], _TestSecond);
  test.equal(Document._delayed[2], _TestThird);
  test.equal(Document._delayed[3], _TestFirst2);
  test.equal(Document._delayed[4], Second);
  test.equal(Document._delayed[5], _TestThird2);
  test.equal(Document._delayed[6], Third);
  test.equal(Document._delayed[7], First);
  firstReferenceA = First;
  Document._retryDelayed();
  testDocumentList(test, ALL.concat([_TestFirst, Second]));
  test.equal(Document._delayed.length, 5);
  test.equal(Document._delayed[0], _TestThird);
  test.equal(Document._delayed[1], _TestFirst2);
  test.equal(Document._delayed[2], _TestThird2);
  test.equal(Document._delayed[3], Third);
  test.equal(Document._delayed[4], First);
  test.equal(Second.Meta._name, 'Second');
  test.equal(Second.Meta.parent, _TestSecond.Meta);
  test.equal(Second.Meta.document, Second);
  test.equal(Second.Meta.collection._name, 'Seconds');
  test.equal(_.size(Second.Meta.fields), 2);
  test.instanceOf(Second.Meta.fields.first, Second._ReferenceField);
  test.isFalse(Second.Meta.fields.first.ancestorArray, Second.Meta.fields.first.ancestorArray);
  test.isTrue(Second.Meta.fields.first.required);
  test.equal(Second.Meta.fields.first.sourcePath, 'first');
  test.equal(Second.Meta.fields.first.sourceDocument, Second);
  test.equal(Second.Meta.fields.first.targetDocument, firstReferenceA);
  test.equal(Second.Meta.fields.first.sourceCollection._name, 'Seconds');
  test.equal(Second.Meta.fields.first.targetCollection._name, 'Firsts');
  test.equal(Second.Meta.fields.first.sourceDocument.Meta.collection._name, 'Seconds');
  test.equal(Second.Meta.fields.first.targetDocument.Meta.collection._name, 'Firsts');
  test.equal(Second.Meta.fields.first.fields, []);
  test.isNull(Second.Meta.fields.first.reverseName);
  test.equal(Second.Meta.fields.first.reverseFields, []);
  test.instanceOf(Second.Meta.fields.second, Second._ReferenceField);
  test.isFalse(Second.Meta.fields.second.ancestorArray, Second.Meta.fields.second.ancestorArray);
  test.isTrue(Second.Meta.fields.second.required);
  test.equal(Second.Meta.fields.second.sourcePath, 'second');
  test.equal(Second.Meta.fields.second.sourceDocument, Second);
  test.equal(Second.Meta.fields.second.targetDocument, Person);
  test.equal(Second.Meta.fields.second.sourceCollection._name, 'Seconds');
  test.equal(Second.Meta.fields.second.targetCollection._name, 'Persons');
  test.equal(Second.Meta.fields.second.sourceDocument.Meta.collection._name, 'Seconds');
  test.equal(Second.Meta.fields.second.targetDocument.Meta.collection._name, 'Persons');
  test.equal(Second.Meta.fields.second.fields, []);
  test.isNull(Second.Meta.fields.second.reverseName);
  test.equal(Second.Meta.fields.second.reverseFields, []);
  firstReferenceB = Post;
  Document._retryDelayed();
  testDocumentList(test, ALL.concat([Second, First]));
  test.equal(Document._delayed.length, 3);
  test.equal(Document._delayed[0], _TestThird);
  test.equal(Document._delayed[1], _TestThird2);
  test.equal(Document._delayed[2], Third);
  test.equal(Second.Meta._name, 'Second');
  test.equal(Second.Meta.parent, _TestSecond.Meta);
  test.equal(Second.Meta.document, Second);
  test.equal(Second.Meta.collection._name, 'Seconds');
  test.equal(_.size(Second.Meta.fields), 2);
  test.instanceOf(Second.Meta.fields.first, Second._ReferenceField);
  test.isFalse(Second.Meta.fields.first.ancestorArray, Second.Meta.fields.first.ancestorArray);
  test.isTrue(Second.Meta.fields.first.required);
  test.equal(Second.Meta.fields.first.sourcePath, 'first');
  test.equal(Second.Meta.fields.first.sourceDocument, Second);
  test.equal(Second.Meta.fields.first.targetDocument, firstReferenceA);
  test.equal(Second.Meta.fields.first.sourceCollection._name, 'Seconds');
  test.equal(Second.Meta.fields.first.targetCollection._name, 'Firsts');
  test.equal(Second.Meta.fields.first.sourceDocument.Meta.collection._name, 'Seconds');
  test.equal(Second.Meta.fields.first.targetDocument.Meta.collection._name, 'Firsts');
  test.equal(Second.Meta.fields.first.fields, []);
  test.isNull(Second.Meta.fields.first.reverseName);
  test.equal(Second.Meta.fields.first.reverseFields, []);
  test.instanceOf(Second.Meta.fields.second, Second._ReferenceField);
  test.isFalse(Second.Meta.fields.second.ancestorArray, Second.Meta.fields.second.ancestorArray);
  test.isTrue(Second.Meta.fields.second.required);
  test.equal(Second.Meta.fields.second.sourcePath, 'second');
  test.equal(Second.Meta.fields.second.sourceDocument, Second);
  test.equal(Second.Meta.fields.second.targetDocument, Person);
  test.equal(Second.Meta.fields.second.sourceCollection._name, 'Seconds');
  test.equal(Second.Meta.fields.second.targetCollection._name, 'Persons');
  test.equal(Second.Meta.fields.second.sourceDocument.Meta.collection._name, 'Seconds');
  test.equal(Second.Meta.fields.second.targetDocument.Meta.collection._name, 'Persons');
  test.equal(Second.Meta.fields.second.fields, []);
  test.isNull(Second.Meta.fields.second.reverseName);
  test.equal(Second.Meta.fields.second.reverseFields, []);
  test.equal(First.Meta._name, 'First');
  test.equal(First.Meta.parent, _TestFirst2.Meta);
  test.equal(First.Meta.document, First);
  test.equal(First.Meta.collection._name, 'Firsts');
  test.equal(_.size(First.Meta.fields), 1);
  test.instanceOf(First.Meta.fields.first, First._ReferenceField);
  test.isFalse(First.Meta.fields.first.ancestorArray, First.Meta.fields.first.ancestorArray);
  test.isTrue(First.Meta.fields.first.required);
  test.equal(First.Meta.fields.first.sourcePath, 'first');
  test.equal(First.Meta.fields.first.sourceDocument, First);
  test.equal(First.Meta.fields.first.targetDocument, Person);
  test.equal(First.Meta.fields.first.sourceCollection._name, 'Firsts');
  test.equal(First.Meta.fields.first.targetCollection._name, 'Persons');
  test.equal(First.Meta.fields.first.sourceDocument.Meta.collection._name, 'Firsts');
  test.equal(First.Meta.fields.first.targetDocument.Meta.collection._name, 'Persons');
  test.equal(First.Meta.fields.first.fields, []);
  test.isNull(First.Meta.fields.first.reverseName);
  test.equal(First.Meta.fields.first.reverseFields, []);
  secondReferenceA = First;
  Document._retryDelayed();
  testDocumentList(test, ALL.concat([Second, First, _TestThird]));
  test.equal(Document._delayed.length, 2);
  test.equal(Document._delayed[0], _TestThird2);
  test.equal(Document._delayed[1], Third);
  test.equal(Second.Meta._name, 'Second');
  test.equal(Second.Meta.parent, _TestSecond.Meta);
  test.equal(Second.Meta.document, Second);
  test.equal(Second.Meta.collection._name, 'Seconds');
  test.equal(_.size(Second.Meta.fields), 2);
  test.instanceOf(Second.Meta.fields.first, Second._ReferenceField);
  test.isFalse(Second.Meta.fields.first.ancestorArray, Second.Meta.fields.first.ancestorArray);
  test.isTrue(Second.Meta.fields.first.required);
  test.equal(Second.Meta.fields.first.sourcePath, 'first');
  test.equal(Second.Meta.fields.first.sourceDocument, Second);
  test.equal(Second.Meta.fields.first.targetDocument, firstReferenceA);
  test.equal(Second.Meta.fields.first.sourceCollection._name, 'Seconds');
  test.equal(Second.Meta.fields.first.targetCollection._name, 'Firsts');
  test.equal(Second.Meta.fields.first.sourceDocument.Meta.collection._name, 'Seconds');
  test.equal(Second.Meta.fields.first.targetDocument.Meta.collection._name, 'Firsts');
  test.equal(Second.Meta.fields.first.fields, []);
  test.isNull(Second.Meta.fields.first.reverseName);
  test.equal(Second.Meta.fields.first.reverseFields, []);
  test.instanceOf(Second.Meta.fields.second, Second._ReferenceField);
  test.isFalse(Second.Meta.fields.second.ancestorArray, Second.Meta.fields.second.ancestorArray);
  test.isTrue(Second.Meta.fields.second.required);
  test.equal(Second.Meta.fields.second.sourcePath, 'second');
  test.equal(Second.Meta.fields.second.sourceDocument, Second);
  test.equal(Second.Meta.fields.second.targetDocument, Person);
  test.equal(Second.Meta.fields.second.sourceCollection._name, 'Seconds');
  test.equal(Second.Meta.fields.second.targetCollection._name, 'Persons');
  test.equal(Second.Meta.fields.second.sourceDocument.Meta.collection._name, 'Seconds');
  test.equal(Second.Meta.fields.second.targetDocument.Meta.collection._name, 'Persons');
  test.equal(Second.Meta.fields.second.fields, []);
  test.isNull(Second.Meta.fields.second.reverseName);
  test.equal(Second.Meta.fields.second.reverseFields, []);
  test.equal(First.Meta._name, 'First');
  test.equal(First.Meta.parent, _TestFirst2.Meta);
  test.equal(First.Meta.document, First);
  test.equal(First.Meta.collection._name, 'Firsts');
  test.equal(_.size(First.Meta.fields), 1);
  test.instanceOf(First.Meta.fields.first, First._ReferenceField);
  test.isFalse(First.Meta.fields.first.ancestorArray, First.Meta.fields.first.ancestorArray);
  test.isTrue(First.Meta.fields.first.required);
  test.equal(First.Meta.fields.first.sourcePath, 'first');
  test.equal(First.Meta.fields.first.sourceDocument, First);
  test.equal(First.Meta.fields.first.targetDocument, Person);
  test.equal(First.Meta.fields.first.sourceCollection._name, 'Firsts');
  test.equal(First.Meta.fields.first.targetCollection._name, 'Persons');
  test.equal(First.Meta.fields.first.sourceDocument.Meta.collection._name, 'Firsts');
  test.equal(First.Meta.fields.first.targetDocument.Meta.collection._name, 'Persons');
  test.equal(First.Meta.fields.first.fields, []);
  test.isNull(First.Meta.fields.first.reverseName);
  test.equal(First.Meta.fields.first.reverseFields, []);
  secondReferenceB = Post;
  Document._retryDelayed();
  testDocumentList(test, ALL.concat([Second, First, Third]));
  test.equal(Document._delayed.length, 0);
  test.equal(Second.Meta._name, 'Second');
  test.equal(Second.Meta.parent, _TestSecond.Meta);
  test.equal(Second.Meta.document, Second);
  test.equal(Second.Meta.collection._name, 'Seconds');
  test.equal(_.size(Second.Meta.fields), 2);
  test.instanceOf(Second.Meta.fields.first, Second._ReferenceField);
  test.isFalse(Second.Meta.fields.first.ancestorArray, Second.Meta.fields.first.ancestorArray);
  test.isTrue(Second.Meta.fields.first.required);
  test.equal(Second.Meta.fields.first.sourcePath, 'first');
  test.equal(Second.Meta.fields.first.sourceDocument, Second);
  test.equal(Second.Meta.fields.first.targetDocument, firstReferenceA);
  test.equal(Second.Meta.fields.first.sourceCollection._name, 'Seconds');
  test.equal(Second.Meta.fields.first.targetCollection._name, 'Firsts');
  test.equal(Second.Meta.fields.first.sourceDocument.Meta.collection._name, 'Seconds');
  test.equal(Second.Meta.fields.first.targetDocument.Meta.collection._name, 'Firsts');
  test.equal(Second.Meta.fields.first.fields, []);
  test.isNull(Second.Meta.fields.first.reverseName);
  test.equal(Second.Meta.fields.first.reverseFields, []);
  test.instanceOf(Second.Meta.fields.second, Second._ReferenceField);
  test.isFalse(Second.Meta.fields.second.ancestorArray, Second.Meta.fields.second.ancestorArray);
  test.isTrue(Second.Meta.fields.second.required);
  test.equal(Second.Meta.fields.second.sourcePath, 'second');
  test.equal(Second.Meta.fields.second.sourceDocument, Second);
  test.equal(Second.Meta.fields.second.targetDocument, Person);
  test.equal(Second.Meta.fields.second.sourceCollection._name, 'Seconds');
  test.equal(Second.Meta.fields.second.targetCollection._name, 'Persons');
  test.equal(Second.Meta.fields.second.sourceDocument.Meta.collection._name, 'Seconds');
  test.equal(Second.Meta.fields.second.targetDocument.Meta.collection._name, 'Persons');
  test.equal(Second.Meta.fields.second.fields, []);
  test.isNull(Second.Meta.fields.second.reverseName);
  test.equal(Second.Meta.fields.second.reverseFields, []);
  test.equal(First.Meta._name, 'First');
  test.equal(First.Meta.parent, _TestFirst2.Meta);
  test.equal(First.Meta.document, First);
  test.equal(First.Meta.collection._name, 'Firsts');
  test.equal(_.size(First.Meta.fields), 1);
  test.instanceOf(First.Meta.fields.first, First._ReferenceField);
  test.isFalse(First.Meta.fields.first.ancestorArray, First.Meta.fields.first.ancestorArray);
  test.isTrue(First.Meta.fields.first.required);
  test.equal(First.Meta.fields.first.sourcePath, 'first');
  test.equal(First.Meta.fields.first.sourceDocument, First);
  test.equal(First.Meta.fields.first.targetDocument, Person);
  test.equal(First.Meta.fields.first.sourceCollection._name, 'Firsts');
  test.equal(First.Meta.fields.first.targetCollection._name, 'Persons');
  test.equal(First.Meta.fields.first.sourceDocument.Meta.collection._name, 'Firsts');
  test.equal(First.Meta.fields.first.targetDocument.Meta.collection._name, 'Persons');
  test.equal(First.Meta.fields.first.fields, []);
  test.isNull(First.Meta.fields.first.reverseName);
  test.equal(First.Meta.fields.first.reverseFields, []);
  test.equal(Third.Meta._name, 'Third');
  test.equal(Third.Meta.parent, _TestThird2.Meta);
  test.equal(Third.Meta.document, Third);
  test.equal(Third.Meta.collection._name, 'Thirds');
  test.equal(_.size(Third.Meta.fields), 3);
  test.instanceOf(Third.Meta.fields.first, Third._ReferenceField);
  test.isFalse(Third.Meta.fields.first.ancestorArray, Third.Meta.fields.first.ancestorArray);
  test.isTrue(Third.Meta.fields.first.required);
  test.equal(Third.Meta.fields.first.sourcePath, 'first');
  test.equal(Third.Meta.fields.first.sourceDocument, Third);
  test.equal(Third.Meta.fields.first.targetDocument, firstReferenceA);
  test.equal(Third.Meta.fields.first.sourceCollection._name, 'Thirds');
  test.equal(Third.Meta.fields.first.targetCollection._name, 'Firsts');
  test.equal(Third.Meta.fields.first.sourceDocument.Meta.collection._name, 'Thirds');
  test.equal(Third.Meta.fields.first.targetDocument.Meta.collection._name, 'Firsts');
  test.equal(Third.Meta.fields.first.fields, []);
  test.isNull(Third.Meta.fields.first.reverseName);
  test.equal(Third.Meta.fields.first.reverseFields, []);
  test.instanceOf(Third.Meta.fields.second, Third._ReferenceField);
  test.isFalse(Third.Meta.fields.second.ancestorArray, Third.Meta.fields.second.ancestorArray);
  test.isTrue(Third.Meta.fields.second.required);
  test.equal(Third.Meta.fields.second.sourcePath, 'second');
  test.equal(Third.Meta.fields.second.sourceDocument, Third);
  test.equal(Third.Meta.fields.second.targetDocument, Post);
  test.equal(Third.Meta.fields.second.sourceCollection._name, 'Thirds');
  test.equal(Third.Meta.fields.second.targetCollection._name, 'Posts');
  test.equal(Third.Meta.fields.second.sourceDocument.Meta.collection._name, 'Thirds');
  test.equal(Third.Meta.fields.second.targetDocument.Meta.collection._name, 'Posts');
  test.equal(Third.Meta.fields.second.fields, []);
  test.isNull(Third.Meta.fields.second.reverseName);
  test.equal(Third.Meta.fields.second.reverseFields, []);
  test.instanceOf(Third.Meta.fields.third, Third._ReferenceField);
  test.isFalse(Third.Meta.fields.third.ancestorArray, Third.Meta.fields.third.ancestorArray);
  test.isTrue(Third.Meta.fields.third.required);
  test.equal(Third.Meta.fields.third.sourcePath, 'third');
  test.equal(Third.Meta.fields.third.sourceDocument, Third);
  test.equal(Third.Meta.fields.third.targetDocument, Person);
  test.equal(Third.Meta.fields.third.sourceCollection._name, 'Thirds');
  test.equal(Third.Meta.fields.third.targetCollection._name, 'Persons');
  test.equal(Third.Meta.fields.third.sourceDocument.Meta.collection._name, 'Thirds');
  test.equal(Third.Meta.fields.third.targetDocument.Meta.collection._name, 'Persons');
  test.equal(Third.Meta.fields.third.fields, []);
  test.isNull(Third.Meta.fields.third.reverseName);
  test.equal(Third.Meta.fields.third.reverseFields, []);
  Document.defineAll();
  test.equal(Second.Meta._name, 'Second');
  test.equal(Second.Meta.parent, _TestSecond.Meta);
  test.equal(Second.Meta.document, Second);
  test.equal(Second.Meta.collection._name, 'Seconds');
  test.equal(_.size(Second.Meta.fields), 2);
  test.instanceOf(Second.Meta.fields.first, Second._ReferenceField);
  test.isFalse(Second.Meta.fields.first.ancestorArray, Second.Meta.fields.first.ancestorArray);
  test.isTrue(Second.Meta.fields.first.required);
  test.equal(Second.Meta.fields.first.sourcePath, 'first');
  test.equal(Second.Meta.fields.first.sourceDocument, Second);
  test.equal(Second.Meta.fields.first.targetDocument, firstReferenceA);
  test.equal(Second.Meta.fields.first.sourceCollection._name, 'Seconds');
  test.equal(Second.Meta.fields.first.targetCollection._name, 'Firsts');
  test.equal(Second.Meta.fields.first.sourceDocument.Meta.collection._name, 'Seconds');
  test.equal(Second.Meta.fields.first.targetDocument.Meta.collection._name, 'Firsts');
  test.equal(Second.Meta.fields.first.fields, []);
  test.isNull(Second.Meta.fields.first.reverseName);
  test.equal(Second.Meta.fields.first.reverseFields, []);
  test.instanceOf(Second.Meta.fields.second, Second._ReferenceField);
  test.isFalse(Second.Meta.fields.second.ancestorArray, Second.Meta.fields.second.ancestorArray);
  test.isTrue(Second.Meta.fields.second.required);
  test.equal(Second.Meta.fields.second.sourcePath, 'second');
  test.equal(Second.Meta.fields.second.sourceDocument, Second);
  test.equal(Second.Meta.fields.second.targetDocument, Person);
  test.equal(Second.Meta.fields.second.sourceCollection._name, 'Seconds');
  test.equal(Second.Meta.fields.second.targetCollection._name, 'Persons');
  test.equal(Second.Meta.fields.second.sourceDocument.Meta.collection._name, 'Seconds');
  test.equal(Second.Meta.fields.second.targetDocument.Meta.collection._name, 'Persons');
  test.equal(Second.Meta.fields.second.fields, []);
  test.isNull(Second.Meta.fields.second.reverseName);
  test.equal(Second.Meta.fields.second.reverseFields, []);
  test.equal(First.Meta._name, 'First');
  test.equal(First.Meta.parent, _TestFirst2.Meta);
  test.equal(First.Meta.document, First);
  test.equal(First.Meta.collection._name, 'Firsts');
  test.equal(_.size(First.Meta.fields), 1);
  test.instanceOf(First.Meta.fields.first, First._ReferenceField);
  test.isFalse(First.Meta.fields.first.ancestorArray, First.Meta.fields.first.ancestorArray);
  test.isTrue(First.Meta.fields.first.required);
  test.equal(First.Meta.fields.first.sourcePath, 'first');
  test.equal(First.Meta.fields.first.sourceDocument, First);
  test.equal(First.Meta.fields.first.targetDocument, Person);
  test.equal(First.Meta.fields.first.sourceCollection._name, 'Firsts');
  test.equal(First.Meta.fields.first.targetCollection._name, 'Persons');
  test.equal(First.Meta.fields.first.sourceDocument.Meta.collection._name, 'Firsts');
  test.equal(First.Meta.fields.first.targetDocument.Meta.collection._name, 'Persons');
  test.equal(First.Meta.fields.first.fields, []);
  test.isNull(First.Meta.fields.first.reverseName);
  test.equal(First.Meta.fields.first.reverseFields, []);
  test.equal(Third.Meta._name, 'Third');
  test.equal(Third.Meta.parent, _TestThird2.Meta);
  test.equal(Third.Meta.document, Third);
  test.equal(Third.Meta.collection._name, 'Thirds');
  test.equal(_.size(Third.Meta.fields), 3);
  test.instanceOf(Third.Meta.fields.first, Third._ReferenceField);
  test.isFalse(Third.Meta.fields.first.ancestorArray, Third.Meta.fields.first.ancestorArray);
  test.isTrue(Third.Meta.fields.first.required);
  test.equal(Third.Meta.fields.first.sourcePath, 'first');
  test.equal(Third.Meta.fields.first.sourceDocument, Third);
  test.equal(Third.Meta.fields.first.targetDocument, firstReferenceA);
  test.equal(Third.Meta.fields.first.sourceCollection._name, 'Thirds');
  test.equal(Third.Meta.fields.first.targetCollection._name, 'Firsts');
  test.equal(Third.Meta.fields.first.sourceDocument.Meta.collection._name, 'Thirds');
  test.equal(Third.Meta.fields.first.targetDocument.Meta.collection._name, 'Firsts');
  test.equal(Third.Meta.fields.first.fields, []);
  test.isNull(Third.Meta.fields.first.reverseName);
  test.equal(Third.Meta.fields.first.reverseFields, []);
  test.instanceOf(Third.Meta.fields.second, Third._ReferenceField);
  test.isFalse(Third.Meta.fields.second.ancestorArray, Third.Meta.fields.second.ancestorArray);
  test.isTrue(Third.Meta.fields.second.required);
  test.equal(Third.Meta.fields.second.sourcePath, 'second');
  test.equal(Third.Meta.fields.second.sourceDocument, Third);
  test.equal(Third.Meta.fields.second.targetDocument, Post);
  test.equal(Third.Meta.fields.second.sourceCollection._name, 'Thirds');
  test.equal(Third.Meta.fields.second.targetCollection._name, 'Posts');
  test.equal(Third.Meta.fields.second.sourceDocument.Meta.collection._name, 'Thirds');
  test.equal(Third.Meta.fields.second.targetDocument.Meta.collection._name, 'Posts');
  test.equal(Third.Meta.fields.second.fields, []);
  test.isNull(Third.Meta.fields.second.reverseName);
  test.equal(Third.Meta.fields.second.reverseFields, []);
  test.instanceOf(Third.Meta.fields.third, Third._ReferenceField);
  test.isFalse(Third.Meta.fields.third.ancestorArray, Third.Meta.fields.third.ancestorArray);
  test.isTrue(Third.Meta.fields.third.required);
  test.equal(Third.Meta.fields.third.sourcePath, 'third');
  test.equal(Third.Meta.fields.third.sourceDocument, Third);
  test.equal(Third.Meta.fields.third.targetDocument, Person);
  test.equal(Third.Meta.fields.third.sourceCollection._name, 'Thirds');
  test.equal(Third.Meta.fields.third.targetCollection._name, 'Persons');
  test.equal(Third.Meta.fields.third.sourceDocument.Meta.collection._name, 'Thirds');
  test.equal(Third.Meta.fields.third.targetDocument.Meta.collection._name, 'Persons');
  test.equal(Third.Meta.fields.third.fields, []);
  test.isNull(Third.Meta.fields.third.reverseName);
  test.equal(Third.Meta.fields.third.reverseFields, []);
  Document.list = list;
  Document._delayed = [];
  Document._clearDelayedCheck();
  return testDefinition(test);
});

Tinytest.add('peerdb - local collections', function(test) {
  var Local, list;
  list = _.clone(Document.list);
  Local = (function(_super) {
    __extends(Local, _super);

    function Local() {
      return Local.__super__.constructor.apply(this, arguments);
    }

    Local.Meta({
      name: 'Local',
      collection: null
    });

    return Local;

  })(Document);
  testDocumentList(test, ALL.concat([Local]));
  test.equal(Document._delayed.length, 0);
  test.equal(Local.Meta._name, 'Local');
  test.isFalse(Local.Meta.parent);
  test.equal(Local.Meta.document, Local);
  test.equal(Local.Meta.collection._name, null);
  test.equal(_.size(Local.Meta.fields), 0);
  Document.list = list;
  Document._delayed = [];
  Document._clearDelayedCheck();
  return testDefinition(test);
});

testAsyncMulti('peerdb - errors for generated fields', [
  function(test, expect) {
    if (Meteor.isServer && Document.instances === 1) {
      Log._intercept(3);
    }
    IdentityGenerator.documents.insert({
      source: 'foobar'
    }, expect((function(_this) {
      return function(error, identityGeneratorId) {
        test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
        test.isTrue(identityGeneratorId);
        return _this.identityGeneratorId = identityGeneratorId;
      };
    })(this)));
    return Meteor.setTimeout(expect(), WAIT_TIME);
  }, function(test, expect) {
    var i, intercepted, _i, _len, _ref1;
    if (Meteor.isServer && Document.instances === 1) {
      intercepted = Log._intercepted();
      test.isTrue((1 <= (_ref1 = intercepted.length) && _ref1 <= 2), intercepted);
      for (_i = 0, _len = intercepted.length; _i < _len; _i++) {
        i = intercepted[_i];
        if (i.indexOf(this.identityGeneratorId) !== -1) {
          break;
        }
      }
      test.isTrue(_.isString(i), i);
      intercepted = EJSON.parse(i);
      test.equal(intercepted.message, "Generated field 'results' defined as an array with selector '" + this.identityGeneratorId + "' was updated with a non-array value: 'foobar'");
      test.equal(intercepted.level, 'error');
    }
    this.identityGenerator = IdentityGenerator.documents.findOne(this.identityGeneratorId, {
      transform: null
    });
    test.equal(this.identityGenerator, {
      _id: this.identityGeneratorId,
      _schema: '1.0.0',
      source: 'foobar',
      result: 'foobar'
    });
    if (Meteor.isServer && Document.instances === 1) {
      Log._intercept(3);
    }
    IdentityGenerator.documents.update(this.identityGeneratorId, {
      $set: {
        source: ['foobar2']
      }
    }, expect((function(_this) {
      return function(error, res) {
        test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
        return test.isTrue(res);
      };
    })(this)));
    return Meteor.setTimeout(expect(), WAIT_TIME);
  }, function(test, expect) {
    var i, intercepted, _i, _len, _ref1;
    if (Meteor.isServer && Document.instances === 1) {
      intercepted = Log._intercepted();
      test.isTrue((1 <= (_ref1 = intercepted.length) && _ref1 <= 2), intercepted);
      for (_i = 0, _len = intercepted.length; _i < _len; _i++) {
        i = intercepted[_i];
        if (i.indexOf(this.identityGeneratorId) !== -1) {
          break;
        }
      }
      test.isTrue(_.isString(i), i);
      intercepted = EJSON.parse(i);
      test.equal(intercepted.message, "Generated field 'result' not defined as an array with selector '" + this.identityGeneratorId + "' was updated with an array value: [ 'foobar2' ]");
      test.equal(intercepted.level, 'error');
    }
    this.identityGenerator = IdentityGenerator.documents.findOne(this.identityGeneratorId, {
      transform: null
    });
    return test.equal(this.identityGenerator, {
      _id: this.identityGeneratorId,
      _schema: '1.0.0',
      source: ['foobar2'],
      result: 'foobar',
      results: ['foobar2']
    });
  }
]);

Tinytest.add('peerdb - tricky references', function(test) {
  var First1, First2, Second2, list;
  list = _.clone(Document.list);
  First1 = (function(_super) {
    __extends(First1, _super);

    function First1() {
      return First1.__super__.constructor.apply(this, arguments);
    }

    First1.Meta({
      name: 'First1',
      fields: function() {
        return {
          first: First1.ReferenceField(First1)
        };
      }
    });

    return First1;

  })(Document);
  Document.defineAll();
  test.equal(First1.Meta._name, 'First1');
  test.isFalse(First1.Meta.parent);
  test.equal(First1.Meta.document, First1);
  test.equal(First1.Meta.collection._name, 'First1s');
  test.equal(_.size(First1.Meta.fields), 1);
  test.instanceOf(First1.Meta.fields.first, First1._ReferenceField);
  test.isFalse(First1.Meta.fields.first.ancestorArray, First1.Meta.fields.first.ancestorArray);
  test.isTrue(First1.Meta.fields.first.required);
  test.equal(First1.Meta.fields.first.sourcePath, 'first');
  test.equal(First1.Meta.fields.first.sourceDocument, First1);
  test.equal(First1.Meta.fields.first.targetDocument, First1);
  test.equal(First1.Meta.fields.first.sourceCollection._name, 'First1s');
  test.equal(First1.Meta.fields.first.targetCollection._name, 'First1s');
  test.equal(First1.Meta.fields.first.sourceDocument.Meta.collection._name, 'First1s');
  test.equal(First1.Meta.fields.first.targetDocument.Meta.collection._name, 'First1s');
  test.equal(First1.Meta.fields.first.fields, []);
  Document.list = _.clone(list);
  Document._delayed = [];
  Document._clearDelayedCheck();
  First2 = (function(_super) {
    __extends(First2, _super);

    function First2() {
      return First2.__super__.constructor.apply(this, arguments);
    }

    First2.Meta({
      name: 'First2',
      fields: function() {
        return {
          first: First2.ReferenceField(void 0)
        };
      }
    });

    return First2;

  })(Document);
  Second2 = (function(_super) {
    __extends(Second2, _super);

    function Second2() {
      return Second2.__super__.constructor.apply(this, arguments);
    }

    Second2.Meta({
      name: 'Second2',
      fields: function() {
        return {
          first: Second2.ReferenceField(First2)
        };
      }
    });

    return Second2;

  })(Document);
  test.throws(function() {
    return Document.defineAll(true);
  }, /Target document not defined/);
  test.throws(function() {
    return Document.defineAll();
  }, /Invalid fields/);
  Document.list = _.clone(list);
  Document._delayed = [];
  Document._clearDelayedCheck();
  return testDefinition(test);
});

testAsyncMulti('peerdb - duplicate values in lists', [
  function(test, expect) {
    Person.documents.insert({
      username: 'person1',
      displayName: 'Person 1',
      field1: 'Field 1 - 1',
      field2: 'Field 1 - 2'
    }, expect((function(_this) {
      return function(error, person1Id) {
        test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
        test.isTrue(person1Id);
        return _this.person1Id = person1Id;
      };
    })(this)));
    Person.documents.insert({
      username: 'person2',
      displayName: 'Person 2',
      field1: 'Field 2 - 1',
      field2: 'Field 2 - 2'
    }, expect((function(_this) {
      return function(error, person2Id) {
        test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
        test.isTrue(person2Id);
        return _this.person2Id = person2Id;
      };
    })(this)));
    Person.documents.insert({
      username: 'person3',
      displayName: 'Person 3',
      field1: 'Field 3 - 1',
      field2: 'Field 3 - 2'
    }, expect((function(_this) {
      return function(error, person3Id) {
        test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
        test.isTrue(person3Id);
        return _this.person3Id = person3Id;
      };
    })(this)));
    return Meteor.setTimeout(expect(), WAIT_TIME);
  }, function(test, expect) {
    this.person1 = Person.documents.findOne(this.person1Id, {
      transform: null
    });
    this.person2 = Person.documents.findOne(this.person2Id, {
      transform: null
    });
    this.person3 = Person.documents.findOne(this.person3Id, {
      transform: null
    });
    test.equal(this.person1, {
      _id: this.person1Id,
      _schema: '1.0.0',
      username: 'person1',
      displayName: 'Person 1',
      field1: 'Field 1 - 1',
      field2: 'Field 1 - 2',
      count: 0
    });
    test.equal(this.person2, {
      _id: this.person2Id,
      _schema: '1.0.0',
      username: 'person2',
      displayName: 'Person 2',
      field1: 'Field 2 - 1',
      field2: 'Field 2 - 2',
      count: 0
    });
    test.equal(this.person3, {
      _id: this.person3Id,
      _schema: '1.0.0',
      username: 'person3',
      displayName: 'Person 3',
      field1: 'Field 3 - 1',
      field2: 'Field 3 - 2',
      count: 0
    });
    Post.documents.insert({
      author: {
        _id: this.person1._id,
        username: 'wrong',
        displayName: 'wrong'
      },
      subscribers: [
        {
          _id: this.person2._id
        }, {
          _id: this.person2._id
        }, {
          _id: this.person3._id
        }
      ],
      reviewers: [
        {
          _id: this.person2._id
        }, {
          _id: this.person3._id
        }, {
          _id: this.person3._id
        }
      ],
      subdocument: {
        person: {
          _id: this.person2._id
        },
        persons: [
          {
            _id: this.person2._id,
            username: 'wrong',
            displayName: 'wrong'
          }, {
            _id: this.person2._id,
            username: this.person2.username,
            displayName: this.person2.displayName,
            field1: 'wrong'
          }, {
            _id: this.person3._id,
            username: this.person3.username,
            displayName: this.person3.displayName,
            field1: this.person3.field1,
            field2: this.person3.field2
          }, {
            _id: this.person3._id
          }
        ],
        body: 'SubdocumentFooBar'
      },
      nested: [
        {
          required: {
            _id: this.person2._id,
            username: 'wrong',
            displayName: 'wrong'
          },
          optional: {
            _id: this.person3._id
          },
          body: 'NestedFooBar'
        }, {
          required: {
            _id: this.person2._id,
            username: this.person2.username,
            displayName: this.person2.displayName
          },
          optional: {
            _id: this.person3._id
          },
          body: 'NestedFooBar'
        }, {
          required: {
            _id: this.person3._id
          },
          optional: {
            _id: this.person2._id
          },
          body: 'NestedFooBar'
        }, {
          required: {
            _id: this.person3._id
          },
          optional: {
            _id: this.person2._id
          },
          body: 'NestedFooBar'
        }, {
          required: {
            _id: this.person2._id,
            username: this.person2.username,
            displayName: this.person2.displayName,
            field1: 'wrong'
          },
          optional: {
            _id: this.person2._id
          },
          body: 'NestedFooBar'
        }, {
          required: {
            _id: this.person3._id
          },
          optional: {
            _id: this.person3._id
          },
          body: 'NestedFooBar'
        }
      ],
      body: 'FooBar'
    }, expect((function(_this) {
      return function(error, postId) {
        test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
        test.isTrue(postId);
        return _this.postId = postId;
      };
    })(this)));
    return Meteor.setTimeout(expect(), WAIT_TIME);
  }, function(test, expect) {
    this.post = Post.documents.findOne(this.postId, {
      transform: null
    });
    test.equal(this.post, {
      _id: this.postId,
      _schema: '1.0.0',
      author: {
        _id: this.person1._id,
        username: this.person1.username,
        displayName: this.person1.displayName,
        field1: this.person1.field1,
        field2: this.person1.field2
      },
      subscribers: [
        {
          _id: this.person2._id
        }, {
          _id: this.person2._id
        }, {
          _id: this.person3._id
        }
      ],
      reviewers: [
        {
          _id: this.person2._id,
          username: this.person2.username
        }, {
          _id: this.person3._id,
          username: this.person3.username
        }, {
          _id: this.person3._id,
          username: this.person3.username
        }
      ],
      subdocument: {
        person: {
          _id: this.person2._id,
          username: this.person2.username,
          displayName: this.person2.displayName,
          field1: this.person2.field1,
          field2: this.person2.field2
        },
        persons: [
          {
            _id: this.person2._id,
            username: this.person2.username,
            displayName: this.person2.displayName,
            field1: this.person2.field1,
            field2: this.person2.field2
          }, {
            _id: this.person2._id,
            username: this.person2.username,
            displayName: this.person2.displayName,
            field1: this.person2.field1,
            field2: this.person2.field2
          }, {
            _id: this.person3._id,
            username: this.person3.username,
            displayName: this.person3.displayName,
            field1: this.person3.field1,
            field2: this.person3.field2
          }, {
            _id: this.person3._id,
            username: this.person3.username,
            displayName: this.person3.displayName,
            field1: this.person3.field1,
            field2: this.person3.field2
          }
        ],
        slug: 'subdocument-prefix-foobar-subdocumentfoobar-suffix',
        body: 'SubdocumentFooBar'
      },
      nested: [
        {
          required: {
            _id: this.person2._id,
            username: this.person2.username,
            displayName: this.person2.displayName,
            field1: this.person2.field1,
            field2: this.person2.field2
          },
          optional: {
            _id: this.person3._id,
            username: this.person3.username
          },
          slug: 'nested-prefix-foobar-nestedfoobar-suffix',
          body: 'NestedFooBar'
        }, {
          required: {
            _id: this.person2._id,
            username: this.person2.username,
            displayName: this.person2.displayName,
            field1: this.person2.field1,
            field2: this.person2.field2
          },
          optional: {
            _id: this.person3._id,
            username: this.person3.username
          },
          slug: 'nested-prefix-foobar-nestedfoobar-suffix',
          body: 'NestedFooBar'
        }, {
          required: {
            _id: this.person3._id,
            username: this.person3.username,
            displayName: this.person3.displayName,
            field1: this.person3.field1,
            field2: this.person3.field2
          },
          optional: {
            _id: this.person2._id,
            username: this.person2.username
          },
          slug: 'nested-prefix-foobar-nestedfoobar-suffix',
          body: 'NestedFooBar'
        }, {
          required: {
            _id: this.person3._id,
            username: this.person3.username,
            displayName: this.person3.displayName,
            field1: this.person3.field1,
            field2: this.person3.field2
          },
          optional: {
            _id: this.person2._id,
            username: this.person2.username
          },
          slug: 'nested-prefix-foobar-nestedfoobar-suffix',
          body: 'NestedFooBar'
        }, {
          required: {
            _id: this.person2._id,
            username: this.person2.username,
            displayName: this.person2.displayName,
            field1: this.person2.field1,
            field2: this.person2.field2
          },
          optional: {
            _id: this.person2._id,
            username: this.person2.username
          },
          slug: 'nested-prefix-foobar-nestedfoobar-suffix',
          body: 'NestedFooBar'
        }, {
          required: {
            _id: this.person3._id,
            username: this.person3.username,
            displayName: this.person3.displayName,
            field1: this.person3.field1,
            field2: this.person3.field2
          },
          optional: {
            _id: this.person3._id,
            username: this.person3.username
          },
          slug: 'nested-prefix-foobar-nestedfoobar-suffix',
          body: 'NestedFooBar'
        }
      ],
      body: 'FooBar',
      slug: 'prefix-foobar-subdocumentfoobar-suffix',
      tags: ['tag-0-prefix-foobar-subdocumentfoobar-suffix', 'tag-1-prefix-foobar-nestedfoobar-suffix', 'tag-2-prefix-foobar-nestedfoobar-suffix', 'tag-3-prefix-foobar-nestedfoobar-suffix', 'tag-4-prefix-foobar-nestedfoobar-suffix', 'tag-5-prefix-foobar-nestedfoobar-suffix', 'tag-6-prefix-foobar-nestedfoobar-suffix']
    });
    Person.documents.update(this.person1Id, {
      $set: {
        username: 'person1a'
      }
    }, expect((function(_this) {
      return function(error, res) {
        test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
        return test.isTrue(res);
      };
    })(this)));
    Person.documents.update(this.person2Id, {
      $set: {
        username: 'person2a'
      }
    }, expect((function(_this) {
      return function(error, res) {
        test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
        return test.isTrue(res);
      };
    })(this)));
    return Meteor.setTimeout(expect(), WAIT_TIME);
  }, function(test, expect) {
    Person.documents.update(this.person3Id, {
      $set: {
        username: 'person3a'
      }
    }, expect((function(_this) {
      return function(error, res) {
        test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
        return test.isTrue(res);
      };
    })(this)));
    return Meteor.setTimeout(expect(), WAIT_TIME);
  }, function(test, expect) {
    this.person1 = Person.documents.findOne(this.person1Id, {
      transform: null
    });
    this.person2 = Person.documents.findOne(this.person2Id, {
      transform: null
    });
    this.person3 = Person.documents.findOne(this.person3Id, {
      transform: null
    });
    test.equal(this.person1, {
      _id: this.person1Id,
      _schema: '1.0.0',
      username: 'person1a',
      displayName: 'Person 1',
      field1: 'Field 1 - 1',
      field2: 'Field 1 - 2',
      posts: [
        {
          _id: this.postId,
          subdocument: {
            body: 'SubdocumentFooBar'
          },
          nested: [
            {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }
          ],
          body: 'FooBar'
        }
      ],
      count: 1
    });
    test.equal(this.person2, {
      _id: this.person2Id,
      _schema: '1.0.0',
      username: 'person2a',
      displayName: 'Person 2',
      field1: 'Field 2 - 1',
      field2: 'Field 2 - 2',
      subdocumentPosts: [
        {
          _id: this.postId,
          subdocument: {
            body: 'SubdocumentFooBar'
          },
          nested: [
            {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }
          ],
          body: 'FooBar'
        }
      ],
      subdocumentsPosts: [
        {
          _id: this.postId,
          subdocument: {
            body: 'SubdocumentFooBar'
          },
          nested: [
            {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }
          ],
          body: 'FooBar'
        }
      ],
      nestedPosts: [
        {
          _id: this.postId,
          subdocument: {
            body: 'SubdocumentFooBar'
          },
          nested: [
            {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }
          ],
          body: 'FooBar'
        }
      ],
      count: 3
    });
    test.equal(this.person3, {
      _id: this.person3Id,
      _schema: '1.0.0',
      username: 'person3a',
      displayName: 'Person 3',
      field1: 'Field 3 - 1',
      field2: 'Field 3 - 2',
      subdocumentsPosts: [
        {
          _id: this.postId,
          subdocument: {
            body: 'SubdocumentFooBar'
          },
          nested: [
            {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }
          ],
          body: 'FooBar'
        }
      ],
      nestedPosts: [
        {
          _id: this.postId,
          subdocument: {
            body: 'SubdocumentFooBar'
          },
          nested: [
            {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }
          ],
          body: 'FooBar'
        }
      ],
      count: 2
    });
    return Meteor.setTimeout(expect(), WAIT_TIME);
  }, function(test, expect) {
    this.post = Post.documents.findOne(this.postId, {
      transform: null
    });
    return test.equal(this.post, {
      _id: this.postId,
      _schema: '1.0.0',
      author: {
        _id: this.person1._id,
        username: this.person1.username,
        displayName: this.person1.displayName,
        field1: this.person1.field1,
        field2: this.person1.field2
      },
      subscribers: [
        {
          _id: this.person2._id
        }, {
          _id: this.person2._id
        }, {
          _id: this.person3._id
        }
      ],
      reviewers: [
        {
          _id: this.person2._id,
          username: this.person2.username
        }, {
          _id: this.person3._id,
          username: this.person3.username
        }, {
          _id: this.person3._id,
          username: this.person3.username
        }
      ],
      subdocument: {
        person: {
          _id: this.person2._id,
          username: this.person2.username,
          displayName: this.person2.displayName,
          field1: this.person2.field1,
          field2: this.person2.field2
        },
        persons: [
          {
            _id: this.person2._id,
            username: this.person2.username,
            displayName: this.person2.displayName,
            field1: this.person2.field1,
            field2: this.person2.field2
          }, {
            _id: this.person2._id,
            username: this.person2.username,
            displayName: this.person2.displayName,
            field1: this.person2.field1,
            field2: this.person2.field2
          }, {
            _id: this.person3._id,
            username: this.person3.username,
            displayName: this.person3.displayName,
            field1: this.person3.field1,
            field2: this.person3.field2
          }, {
            _id: this.person3._id,
            username: this.person3.username,
            displayName: this.person3.displayName,
            field1: this.person3.field1,
            field2: this.person3.field2
          }
        ],
        slug: 'subdocument-prefix-foobar-subdocumentfoobar-suffix',
        body: 'SubdocumentFooBar'
      },
      nested: [
        {
          required: {
            _id: this.person2._id,
            username: this.person2.username,
            displayName: this.person2.displayName,
            field1: this.person2.field1,
            field2: this.person2.field2
          },
          optional: {
            _id: this.person3._id,
            username: this.person3.username
          },
          slug: 'nested-prefix-foobar-nestedfoobar-suffix',
          body: 'NestedFooBar'
        }, {
          required: {
            _id: this.person2._id,
            username: this.person2.username,
            displayName: this.person2.displayName,
            field1: this.person2.field1,
            field2: this.person2.field2
          },
          optional: {
            _id: this.person3._id,
            username: this.person3.username
          },
          slug: 'nested-prefix-foobar-nestedfoobar-suffix',
          body: 'NestedFooBar'
        }, {
          required: {
            _id: this.person3._id,
            username: this.person3.username,
            displayName: this.person3.displayName,
            field1: this.person3.field1,
            field2: this.person3.field2
          },
          optional: {
            _id: this.person2._id,
            username: this.person2.username
          },
          slug: 'nested-prefix-foobar-nestedfoobar-suffix',
          body: 'NestedFooBar'
        }, {
          required: {
            _id: this.person3._id,
            username: this.person3.username,
            displayName: this.person3.displayName,
            field1: this.person3.field1,
            field2: this.person3.field2
          },
          optional: {
            _id: this.person2._id,
            username: this.person2.username
          },
          slug: 'nested-prefix-foobar-nestedfoobar-suffix',
          body: 'NestedFooBar'
        }, {
          required: {
            _id: this.person2._id,
            username: this.person2.username,
            displayName: this.person2.displayName,
            field1: this.person2.field1,
            field2: this.person2.field2
          },
          optional: {
            _id: this.person2._id,
            username: this.person2.username
          },
          slug: 'nested-prefix-foobar-nestedfoobar-suffix',
          body: 'NestedFooBar'
        }, {
          required: {
            _id: this.person3._id,
            username: this.person3.username,
            displayName: this.person3.displayName,
            field1: this.person3.field1,
            field2: this.person3.field2
          },
          optional: {
            _id: this.person3._id,
            username: this.person3.username
          },
          slug: 'nested-prefix-foobar-nestedfoobar-suffix',
          body: 'NestedFooBar'
        }
      ],
      body: 'FooBar',
      slug: 'prefix-foobar-subdocumentfoobar-suffix',
      tags: ['tag-0-prefix-foobar-subdocumentfoobar-suffix', 'tag-1-prefix-foobar-nestedfoobar-suffix', 'tag-2-prefix-foobar-nestedfoobar-suffix', 'tag-3-prefix-foobar-nestedfoobar-suffix', 'tag-4-prefix-foobar-nestedfoobar-suffix', 'tag-5-prefix-foobar-nestedfoobar-suffix', 'tag-6-prefix-foobar-nestedfoobar-suffix']
    });
  }, function(test, expect) {
    Person.documents.update(this.person1Id, {
      $set: {
        field1: 'Field 1 - 1a',
        field2: 'Field 1 - 2a'
      }
    }, expect((function(_this) {
      return function(error, res) {
        test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
        return test.isTrue(res);
      };
    })(this)));
    return Meteor.setTimeout(expect(), WAIT_TIME);
  }, function(test, expect) {
    this.person1 = Person.documents.findOne(this.person1Id, {
      transform: null
    });
    test.equal(this.person1, {
      _id: this.person1Id,
      _schema: '1.0.0',
      username: 'person1a',
      displayName: 'Person 1',
      field1: 'Field 1 - 1a',
      field2: 'Field 1 - 2a',
      posts: [
        {
          _id: this.postId,
          subdocument: {
            body: 'SubdocumentFooBar'
          },
          nested: [
            {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }
          ],
          body: 'FooBar'
        }
      ],
      count: 1
    });
    this.post = Post.documents.findOne(this.postId, {
      transform: null
    });
    test.equal(this.post, {
      _id: this.postId,
      _schema: '1.0.0',
      author: {
        _id: this.person1._id,
        username: this.person1.username,
        displayName: this.person1.displayName,
        field1: this.person1.field1,
        field2: this.person1.field2
      },
      subscribers: [
        {
          _id: this.person2._id
        }, {
          _id: this.person2._id
        }, {
          _id: this.person3._id
        }
      ],
      reviewers: [
        {
          _id: this.person2._id,
          username: this.person2.username
        }, {
          _id: this.person3._id,
          username: this.person3.username
        }, {
          _id: this.person3._id,
          username: this.person3.username
        }
      ],
      subdocument: {
        person: {
          _id: this.person2._id,
          username: this.person2.username,
          displayName: this.person2.displayName,
          field1: this.person2.field1,
          field2: this.person2.field2
        },
        persons: [
          {
            _id: this.person2._id,
            username: this.person2.username,
            displayName: this.person2.displayName,
            field1: this.person2.field1,
            field2: this.person2.field2
          }, {
            _id: this.person2._id,
            username: this.person2.username,
            displayName: this.person2.displayName,
            field1: this.person2.field1,
            field2: this.person2.field2
          }, {
            _id: this.person3._id,
            username: this.person3.username,
            displayName: this.person3.displayName,
            field1: this.person3.field1,
            field2: this.person3.field2
          }, {
            _id: this.person3._id,
            username: this.person3.username,
            displayName: this.person3.displayName,
            field1: this.person3.field1,
            field2: this.person3.field2
          }
        ],
        slug: 'subdocument-prefix-foobar-subdocumentfoobar-suffix',
        body: 'SubdocumentFooBar'
      },
      nested: [
        {
          required: {
            _id: this.person2._id,
            username: this.person2.username,
            displayName: this.person2.displayName,
            field1: this.person2.field1,
            field2: this.person2.field2
          },
          optional: {
            _id: this.person3._id,
            username: this.person3.username
          },
          slug: 'nested-prefix-foobar-nestedfoobar-suffix',
          body: 'NestedFooBar'
        }, {
          required: {
            _id: this.person2._id,
            username: this.person2.username,
            displayName: this.person2.displayName,
            field1: this.person2.field1,
            field2: this.person2.field2
          },
          optional: {
            _id: this.person3._id,
            username: this.person3.username
          },
          slug: 'nested-prefix-foobar-nestedfoobar-suffix',
          body: 'NestedFooBar'
        }, {
          required: {
            _id: this.person3._id,
            username: this.person3.username,
            displayName: this.person3.displayName,
            field1: this.person3.field1,
            field2: this.person3.field2
          },
          optional: {
            _id: this.person2._id,
            username: this.person2.username
          },
          slug: 'nested-prefix-foobar-nestedfoobar-suffix',
          body: 'NestedFooBar'
        }, {
          required: {
            _id: this.person3._id,
            username: this.person3.username,
            displayName: this.person3.displayName,
            field1: this.person3.field1,
            field2: this.person3.field2
          },
          optional: {
            _id: this.person2._id,
            username: this.person2.username
          },
          slug: 'nested-prefix-foobar-nestedfoobar-suffix',
          body: 'NestedFooBar'
        }, {
          required: {
            _id: this.person2._id,
            username: this.person2.username,
            displayName: this.person2.displayName,
            field1: this.person2.field1,
            field2: this.person2.field2
          },
          optional: {
            _id: this.person2._id,
            username: this.person2.username
          },
          slug: 'nested-prefix-foobar-nestedfoobar-suffix',
          body: 'NestedFooBar'
        }, {
          required: {
            _id: this.person3._id,
            username: this.person3.username,
            displayName: this.person3.displayName,
            field1: this.person3.field1,
            field2: this.person3.field2
          },
          optional: {
            _id: this.person3._id,
            username: this.person3.username
          },
          slug: 'nested-prefix-foobar-nestedfoobar-suffix',
          body: 'NestedFooBar'
        }
      ],
      body: 'FooBar',
      slug: 'prefix-foobar-subdocumentfoobar-suffix',
      tags: ['tag-0-prefix-foobar-subdocumentfoobar-suffix', 'tag-1-prefix-foobar-nestedfoobar-suffix', 'tag-2-prefix-foobar-nestedfoobar-suffix', 'tag-3-prefix-foobar-nestedfoobar-suffix', 'tag-4-prefix-foobar-nestedfoobar-suffix', 'tag-5-prefix-foobar-nestedfoobar-suffix', 'tag-6-prefix-foobar-nestedfoobar-suffix']
    });
    Person.documents.update(this.person1Id, {
      $unset: {
        username: ''
      }
    }, expect((function(_this) {
      return function(error, res) {
        test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
        return test.isTrue(res);
      };
    })(this)));
    return Meteor.setTimeout(expect(), WAIT_TIME);
  }, function(test, expect) {
    this.person1 = Person.documents.findOne(this.person1Id, {
      transform: null
    });
    test.equal(this.person1, {
      _id: this.person1Id,
      _schema: '1.0.0',
      displayName: 'Person 1',
      field1: 'Field 1 - 1a',
      field2: 'Field 1 - 2a',
      posts: [
        {
          _id: this.postId,
          subdocument: {
            body: 'SubdocumentFooBar'
          },
          nested: [
            {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }
          ],
          body: 'FooBar'
        }
      ],
      count: 1
    });
    this.post = Post.documents.findOne(this.postId, {
      transform: null
    });
    test.equal(this.post, {
      _id: this.postId,
      _schema: '1.0.0',
      author: {
        _id: this.person1._id,
        displayName: this.person1.displayName,
        field1: this.person1.field1,
        field2: this.person1.field2
      },
      subscribers: [
        {
          _id: this.person2._id
        }, {
          _id: this.person2._id
        }, {
          _id: this.person3._id
        }
      ],
      reviewers: [
        {
          _id: this.person2._id,
          username: this.person2.username
        }, {
          _id: this.person3._id,
          username: this.person3.username
        }, {
          _id: this.person3._id,
          username: this.person3.username
        }
      ],
      subdocument: {
        person: {
          _id: this.person2._id,
          username: this.person2.username,
          displayName: this.person2.displayName,
          field1: this.person2.field1,
          field2: this.person2.field2
        },
        persons: [
          {
            _id: this.person2._id,
            username: this.person2.username,
            displayName: this.person2.displayName,
            field1: this.person2.field1,
            field2: this.person2.field2
          }, {
            _id: this.person2._id,
            username: this.person2.username,
            displayName: this.person2.displayName,
            field1: this.person2.field1,
            field2: this.person2.field2
          }, {
            _id: this.person3._id,
            username: this.person3.username,
            displayName: this.person3.displayName,
            field1: this.person3.field1,
            field2: this.person3.field2
          }, {
            _id: this.person3._id,
            username: this.person3.username,
            displayName: this.person3.displayName,
            field1: this.person3.field1,
            field2: this.person3.field2
          }
        ],
        slug: 'subdocument-prefix-foobar-subdocumentfoobar-suffix',
        body: 'SubdocumentFooBar'
      },
      nested: [
        {
          required: {
            _id: this.person2._id,
            username: this.person2.username,
            displayName: this.person2.displayName,
            field1: this.person2.field1,
            field2: this.person2.field2
          },
          optional: {
            _id: this.person3._id,
            username: this.person3.username
          },
          slug: 'nested-prefix-foobar-nestedfoobar-suffix',
          body: 'NestedFooBar'
        }, {
          required: {
            _id: this.person2._id,
            username: this.person2.username,
            displayName: this.person2.displayName,
            field1: this.person2.field1,
            field2: this.person2.field2
          },
          optional: {
            _id: this.person3._id,
            username: this.person3.username
          },
          slug: 'nested-prefix-foobar-nestedfoobar-suffix',
          body: 'NestedFooBar'
        }, {
          required: {
            _id: this.person3._id,
            username: this.person3.username,
            displayName: this.person3.displayName,
            field1: this.person3.field1,
            field2: this.person3.field2
          },
          optional: {
            _id: this.person2._id,
            username: this.person2.username
          },
          slug: 'nested-prefix-foobar-nestedfoobar-suffix',
          body: 'NestedFooBar'
        }, {
          required: {
            _id: this.person3._id,
            username: this.person3.username,
            displayName: this.person3.displayName,
            field1: this.person3.field1,
            field2: this.person3.field2
          },
          optional: {
            _id: this.person2._id,
            username: this.person2.username
          },
          slug: 'nested-prefix-foobar-nestedfoobar-suffix',
          body: 'NestedFooBar'
        }, {
          required: {
            _id: this.person2._id,
            username: this.person2.username,
            displayName: this.person2.displayName,
            field1: this.person2.field1,
            field2: this.person2.field2
          },
          optional: {
            _id: this.person2._id,
            username: this.person2.username
          },
          slug: 'nested-prefix-foobar-nestedfoobar-suffix',
          body: 'NestedFooBar'
        }, {
          required: {
            _id: this.person3._id,
            username: this.person3.username,
            displayName: this.person3.displayName,
            field1: this.person3.field1,
            field2: this.person3.field2
          },
          optional: {
            _id: this.person3._id,
            username: this.person3.username
          },
          slug: 'nested-prefix-foobar-nestedfoobar-suffix',
          body: 'NestedFooBar'
        }
      ],
      body: 'FooBar',
      slug: 'prefix-foobar-subdocumentfoobar-suffix',
      tags: ['tag-0-prefix-foobar-subdocumentfoobar-suffix', 'tag-1-prefix-foobar-nestedfoobar-suffix', 'tag-2-prefix-foobar-nestedfoobar-suffix', 'tag-3-prefix-foobar-nestedfoobar-suffix', 'tag-4-prefix-foobar-nestedfoobar-suffix', 'tag-5-prefix-foobar-nestedfoobar-suffix', 'tag-6-prefix-foobar-nestedfoobar-suffix']
    });
    Person.documents.update(this.person2Id, {
      $unset: {
        username: ''
      }
    }, expect((function(_this) {
      return function(error, res) {
        test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
        return test.isTrue(res);
      };
    })(this)));
    return Meteor.setTimeout(expect(), WAIT_TIME);
  }, function(test, expect) {
    this.person2 = Person.documents.findOne(this.person2Id, {
      transform: null
    });
    test.equal(this.person2, {
      _id: this.person2Id,
      _schema: '1.0.0',
      displayName: 'Person 2',
      field1: 'Field 2 - 1',
      field2: 'Field 2 - 2',
      subdocumentPosts: [
        {
          _id: this.postId,
          subdocument: {
            body: 'SubdocumentFooBar'
          },
          nested: [
            {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }
          ],
          body: 'FooBar'
        }
      ],
      subdocumentsPosts: [
        {
          _id: this.postId,
          subdocument: {
            body: 'SubdocumentFooBar'
          },
          nested: [
            {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }
          ],
          body: 'FooBar'
        }
      ],
      nestedPosts: [
        {
          _id: this.postId,
          subdocument: {
            body: 'SubdocumentFooBar'
          },
          nested: [
            {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }
          ],
          body: 'FooBar'
        }
      ],
      count: 3
    });
    this.post = Post.documents.findOne(this.postId, {
      transform: null
    });
    test.equal(this.post, {
      _id: this.postId,
      _schema: '1.0.0',
      author: {
        _id: this.person1._id,
        displayName: this.person1.displayName,
        field1: this.person1.field1,
        field2: this.person1.field2
      },
      subscribers: [
        {
          _id: this.person2._id
        }, {
          _id: this.person2._id
        }, {
          _id: this.person3._id
        }
      ],
      reviewers: [
        {
          _id: this.person2._id
        }, {
          _id: this.person3._id,
          username: this.person3.username
        }, {
          _id: this.person3._id,
          username: this.person3.username
        }
      ],
      subdocument: {
        person: {
          _id: this.person2._id,
          displayName: this.person2.displayName,
          field1: this.person2.field1,
          field2: this.person2.field2
        },
        persons: [
          {
            _id: this.person2._id,
            displayName: this.person2.displayName,
            field1: this.person2.field1,
            field2: this.person2.field2
          }, {
            _id: this.person2._id,
            displayName: this.person2.displayName,
            field1: this.person2.field1,
            field2: this.person2.field2
          }, {
            _id: this.person3._id,
            username: this.person3.username,
            displayName: this.person3.displayName,
            field1: this.person3.field1,
            field2: this.person3.field2
          }, {
            _id: this.person3._id,
            username: this.person3.username,
            displayName: this.person3.displayName,
            field1: this.person3.field1,
            field2: this.person3.field2
          }
        ],
        slug: 'subdocument-prefix-foobar-subdocumentfoobar-suffix',
        body: 'SubdocumentFooBar'
      },
      nested: [
        {
          required: {
            _id: this.person2._id,
            displayName: this.person2.displayName,
            field1: this.person2.field1,
            field2: this.person2.field2
          },
          optional: {
            _id: this.person3._id,
            username: this.person3.username
          },
          slug: 'nested-prefix-foobar-nestedfoobar-suffix',
          body: 'NestedFooBar'
        }, {
          required: {
            _id: this.person2._id,
            displayName: this.person2.displayName,
            field1: this.person2.field1,
            field2: this.person2.field2
          },
          optional: {
            _id: this.person3._id,
            username: this.person3.username
          },
          slug: 'nested-prefix-foobar-nestedfoobar-suffix',
          body: 'NestedFooBar'
        }, {
          required: {
            _id: this.person3._id,
            username: this.person3.username,
            displayName: this.person3.displayName,
            field1: this.person3.field1,
            field2: this.person3.field2
          },
          optional: {
            _id: this.person2._id
          },
          slug: 'nested-prefix-foobar-nestedfoobar-suffix',
          body: 'NestedFooBar'
        }, {
          required: {
            _id: this.person3._id,
            username: this.person3.username,
            displayName: this.person3.displayName,
            field1: this.person3.field1,
            field2: this.person3.field2
          },
          optional: {
            _id: this.person2._id
          },
          slug: 'nested-prefix-foobar-nestedfoobar-suffix',
          body: 'NestedFooBar'
        }, {
          required: {
            _id: this.person2._id,
            displayName: this.person2.displayName,
            field1: this.person2.field1,
            field2: this.person2.field2
          },
          optional: {
            _id: this.person2._id
          },
          slug: 'nested-prefix-foobar-nestedfoobar-suffix',
          body: 'NestedFooBar'
        }, {
          required: {
            _id: this.person3._id,
            username: this.person3.username,
            displayName: this.person3.displayName,
            field1: this.person3.field1,
            field2: this.person3.field2
          },
          optional: {
            _id: this.person3._id,
            username: this.person3.username
          },
          slug: 'nested-prefix-foobar-nestedfoobar-suffix',
          body: 'NestedFooBar'
        }
      ],
      body: 'FooBar',
      slug: 'prefix-foobar-subdocumentfoobar-suffix',
      tags: ['tag-0-prefix-foobar-subdocumentfoobar-suffix', 'tag-1-prefix-foobar-nestedfoobar-suffix', 'tag-2-prefix-foobar-nestedfoobar-suffix', 'tag-3-prefix-foobar-nestedfoobar-suffix', 'tag-4-prefix-foobar-nestedfoobar-suffix', 'tag-5-prefix-foobar-nestedfoobar-suffix', 'tag-6-prefix-foobar-nestedfoobar-suffix']
    });
    Person.documents.update(this.person3Id, {
      $unset: {
        username: ''
      }
    }, expect((function(_this) {
      return function(error, res) {
        test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
        return test.isTrue(res);
      };
    })(this)));
    return Meteor.setTimeout(expect(), WAIT_TIME);
  }, function(test, expect) {
    this.person3 = Person.documents.findOne(this.person3Id, {
      transform: null
    });
    test.equal(this.person3, {
      _id: this.person3Id,
      _schema: '1.0.0',
      displayName: 'Person 3',
      field1: 'Field 3 - 1',
      field2: 'Field 3 - 2',
      subdocumentsPosts: [
        {
          _id: this.postId,
          subdocument: {
            body: 'SubdocumentFooBar'
          },
          nested: [
            {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }
          ],
          body: 'FooBar'
        }
      ],
      nestedPosts: [
        {
          _id: this.postId,
          subdocument: {
            body: 'SubdocumentFooBar'
          },
          nested: [
            {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }
          ],
          body: 'FooBar'
        }
      ],
      count: 2
    });
    this.post = Post.documents.findOne(this.postId, {
      transform: null
    });
    test.equal(this.post, {
      _id: this.postId,
      _schema: '1.0.0',
      author: {
        _id: this.person1._id,
        displayName: this.person1.displayName,
        field1: this.person1.field1,
        field2: this.person1.field2
      },
      subscribers: [
        {
          _id: this.person2._id
        }, {
          _id: this.person2._id
        }, {
          _id: this.person3._id
        }
      ],
      reviewers: [
        {
          _id: this.person2._id
        }, {
          _id: this.person3._id
        }, {
          _id: this.person3._id
        }
      ],
      subdocument: {
        person: {
          _id: this.person2._id,
          displayName: this.person2.displayName,
          field1: this.person2.field1,
          field2: this.person2.field2
        },
        persons: [
          {
            _id: this.person2._id,
            displayName: this.person2.displayName,
            field1: this.person2.field1,
            field2: this.person2.field2
          }, {
            _id: this.person2._id,
            displayName: this.person2.displayName,
            field1: this.person2.field1,
            field2: this.person2.field2
          }, {
            _id: this.person3._id,
            displayName: this.person3.displayName,
            field1: this.person3.field1,
            field2: this.person3.field2
          }, {
            _id: this.person3._id,
            displayName: this.person3.displayName,
            field1: this.person3.field1,
            field2: this.person3.field2
          }
        ],
        slug: 'subdocument-prefix-foobar-subdocumentfoobar-suffix',
        body: 'SubdocumentFooBar'
      },
      nested: [
        {
          required: {
            _id: this.person2._id,
            displayName: this.person2.displayName,
            field1: this.person2.field1,
            field2: this.person2.field2
          },
          optional: {
            _id: this.person3._id
          },
          slug: 'nested-prefix-foobar-nestedfoobar-suffix',
          body: 'NestedFooBar'
        }, {
          required: {
            _id: this.person2._id,
            displayName: this.person2.displayName,
            field1: this.person2.field1,
            field2: this.person2.field2
          },
          optional: {
            _id: this.person3._id
          },
          slug: 'nested-prefix-foobar-nestedfoobar-suffix',
          body: 'NestedFooBar'
        }, {
          required: {
            _id: this.person3._id,
            displayName: this.person3.displayName,
            field1: this.person3.field1,
            field2: this.person3.field2
          },
          optional: {
            _id: this.person2._id
          },
          slug: 'nested-prefix-foobar-nestedfoobar-suffix',
          body: 'NestedFooBar'
        }, {
          required: {
            _id: this.person3._id,
            displayName: this.person3.displayName,
            field1: this.person3.field1,
            field2: this.person3.field2
          },
          optional: {
            _id: this.person2._id
          },
          slug: 'nested-prefix-foobar-nestedfoobar-suffix',
          body: 'NestedFooBar'
        }, {
          required: {
            _id: this.person2._id,
            displayName: this.person2.displayName,
            field1: this.person2.field1,
            field2: this.person2.field2
          },
          optional: {
            _id: this.person2._id
          },
          slug: 'nested-prefix-foobar-nestedfoobar-suffix',
          body: 'NestedFooBar'
        }, {
          required: {
            _id: this.person3._id,
            displayName: this.person3.displayName,
            field1: this.person3.field1,
            field2: this.person3.field2
          },
          optional: {
            _id: this.person3._id
          },
          slug: 'nested-prefix-foobar-nestedfoobar-suffix',
          body: 'NestedFooBar'
        }
      ],
      body: 'FooBar',
      slug: 'prefix-foobar-subdocumentfoobar-suffix',
      tags: ['tag-0-prefix-foobar-subdocumentfoobar-suffix', 'tag-1-prefix-foobar-nestedfoobar-suffix', 'tag-2-prefix-foobar-nestedfoobar-suffix', 'tag-3-prefix-foobar-nestedfoobar-suffix', 'tag-4-prefix-foobar-nestedfoobar-suffix', 'tag-5-prefix-foobar-nestedfoobar-suffix', 'tag-6-prefix-foobar-nestedfoobar-suffix']
    });
    Person.documents.update(this.person1Id, {
      $set: {
        username: 'person1b'
      }
    }, expect((function(_this) {
      return function(error, res) {
        test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
        return test.isTrue(res);
      };
    })(this)));
    return Meteor.setTimeout(expect(), WAIT_TIME);
  }, function(test, expect) {
    this.person1 = Person.documents.findOne(this.person1Id, {
      transform: null
    });
    test.equal(this.person1, {
      _id: this.person1Id,
      _schema: '1.0.0',
      username: 'person1b',
      displayName: 'Person 1',
      field1: 'Field 1 - 1a',
      field2: 'Field 1 - 2a',
      posts: [
        {
          _id: this.postId,
          subdocument: {
            body: 'SubdocumentFooBar'
          },
          nested: [
            {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }
          ],
          body: 'FooBar'
        }
      ],
      count: 1
    });
    this.post = Post.documents.findOne(this.postId, {
      transform: null
    });
    test.equal(this.post, {
      _id: this.postId,
      _schema: '1.0.0',
      author: {
        _id: this.person1._id,
        username: this.person1.username,
        displayName: this.person1.displayName,
        field1: this.person1.field1,
        field2: this.person1.field2
      },
      subscribers: [
        {
          _id: this.person2._id
        }, {
          _id: this.person2._id
        }, {
          _id: this.person3._id
        }
      ],
      reviewers: [
        {
          _id: this.person2._id
        }, {
          _id: this.person3._id
        }, {
          _id: this.person3._id
        }
      ],
      subdocument: {
        person: {
          _id: this.person2._id,
          displayName: this.person2.displayName,
          field1: this.person2.field1,
          field2: this.person2.field2
        },
        persons: [
          {
            _id: this.person2._id,
            displayName: this.person2.displayName,
            field1: this.person2.field1,
            field2: this.person2.field2
          }, {
            _id: this.person2._id,
            displayName: this.person2.displayName,
            field1: this.person2.field1,
            field2: this.person2.field2
          }, {
            _id: this.person3._id,
            displayName: this.person3.displayName,
            field1: this.person3.field1,
            field2: this.person3.field2
          }, {
            _id: this.person3._id,
            displayName: this.person3.displayName,
            field1: this.person3.field1,
            field2: this.person3.field2
          }
        ],
        slug: 'subdocument-prefix-foobar-subdocumentfoobar-suffix',
        body: 'SubdocumentFooBar'
      },
      nested: [
        {
          required: {
            _id: this.person2._id,
            displayName: this.person2.displayName,
            field1: this.person2.field1,
            field2: this.person2.field2
          },
          optional: {
            _id: this.person3._id
          },
          slug: 'nested-prefix-foobar-nestedfoobar-suffix',
          body: 'NestedFooBar'
        }, {
          required: {
            _id: this.person2._id,
            displayName: this.person2.displayName,
            field1: this.person2.field1,
            field2: this.person2.field2
          },
          optional: {
            _id: this.person3._id
          },
          slug: 'nested-prefix-foobar-nestedfoobar-suffix',
          body: 'NestedFooBar'
        }, {
          required: {
            _id: this.person3._id,
            displayName: this.person3.displayName,
            field1: this.person3.field1,
            field2: this.person3.field2
          },
          optional: {
            _id: this.person2._id
          },
          slug: 'nested-prefix-foobar-nestedfoobar-suffix',
          body: 'NestedFooBar'
        }, {
          required: {
            _id: this.person3._id,
            displayName: this.person3.displayName,
            field1: this.person3.field1,
            field2: this.person3.field2
          },
          optional: {
            _id: this.person2._id
          },
          slug: 'nested-prefix-foobar-nestedfoobar-suffix',
          body: 'NestedFooBar'
        }, {
          required: {
            _id: this.person2._id,
            displayName: this.person2.displayName,
            field1: this.person2.field1,
            field2: this.person2.field2
          },
          optional: {
            _id: this.person2._id
          },
          slug: 'nested-prefix-foobar-nestedfoobar-suffix',
          body: 'NestedFooBar'
        }, {
          required: {
            _id: this.person3._id,
            displayName: this.person3.displayName,
            field1: this.person3.field1,
            field2: this.person3.field2
          },
          optional: {
            _id: this.person3._id
          },
          slug: 'nested-prefix-foobar-nestedfoobar-suffix',
          body: 'NestedFooBar'
        }
      ],
      body: 'FooBar',
      slug: 'prefix-foobar-subdocumentfoobar-suffix',
      tags: ['tag-0-prefix-foobar-subdocumentfoobar-suffix', 'tag-1-prefix-foobar-nestedfoobar-suffix', 'tag-2-prefix-foobar-nestedfoobar-suffix', 'tag-3-prefix-foobar-nestedfoobar-suffix', 'tag-4-prefix-foobar-nestedfoobar-suffix', 'tag-5-prefix-foobar-nestedfoobar-suffix', 'tag-6-prefix-foobar-nestedfoobar-suffix']
    });
    Person.documents.update(this.person2Id, {
      $set: {
        username: 'person2b'
      }
    }, expect((function(_this) {
      return function(error, res) {
        test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
        return test.isTrue(res);
      };
    })(this)));
    return Meteor.setTimeout(expect(), WAIT_TIME);
  }, function(test, expect) {
    this.person2 = Person.documents.findOne(this.person2Id, {
      transform: null
    });
    test.equal(this.person2, {
      _id: this.person2Id,
      _schema: '1.0.0',
      username: 'person2b',
      displayName: 'Person 2',
      field1: 'Field 2 - 1',
      field2: 'Field 2 - 2',
      subdocumentPosts: [
        {
          _id: this.postId,
          subdocument: {
            body: 'SubdocumentFooBar'
          },
          nested: [
            {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }
          ],
          body: 'FooBar'
        }
      ],
      subdocumentsPosts: [
        {
          _id: this.postId,
          subdocument: {
            body: 'SubdocumentFooBar'
          },
          nested: [
            {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }
          ],
          body: 'FooBar'
        }
      ],
      nestedPosts: [
        {
          _id: this.postId,
          subdocument: {
            body: 'SubdocumentFooBar'
          },
          nested: [
            {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }
          ],
          body: 'FooBar'
        }
      ],
      count: 3
    });
    this.post = Post.documents.findOne(this.postId, {
      transform: null
    });
    test.equal(this.post, {
      _id: this.postId,
      _schema: '1.0.0',
      author: {
        _id: this.person1._id,
        username: this.person1.username,
        displayName: this.person1.displayName,
        field1: this.person1.field1,
        field2: this.person1.field2
      },
      subscribers: [
        {
          _id: this.person2._id
        }, {
          _id: this.person2._id
        }, {
          _id: this.person3._id
        }
      ],
      reviewers: [
        {
          _id: this.person2._id,
          username: this.person2.username
        }, {
          _id: this.person3._id
        }, {
          _id: this.person3._id
        }
      ],
      subdocument: {
        person: {
          _id: this.person2._id,
          username: this.person2.username,
          displayName: this.person2.displayName,
          field1: this.person2.field1,
          field2: this.person2.field2
        },
        persons: [
          {
            _id: this.person2._id,
            username: this.person2.username,
            displayName: this.person2.displayName,
            field1: this.person2.field1,
            field2: this.person2.field2
          }, {
            _id: this.person2._id,
            username: this.person2.username,
            displayName: this.person2.displayName,
            field1: this.person2.field1,
            field2: this.person2.field2
          }, {
            _id: this.person3._id,
            displayName: this.person3.displayName,
            field1: this.person3.field1,
            field2: this.person3.field2
          }, {
            _id: this.person3._id,
            displayName: this.person3.displayName,
            field1: this.person3.field1,
            field2: this.person3.field2
          }
        ],
        slug: 'subdocument-prefix-foobar-subdocumentfoobar-suffix',
        body: 'SubdocumentFooBar'
      },
      nested: [
        {
          required: {
            _id: this.person2._id,
            username: this.person2.username,
            displayName: this.person2.displayName,
            field1: this.person2.field1,
            field2: this.person2.field2
          },
          optional: {
            _id: this.person3._id
          },
          slug: 'nested-prefix-foobar-nestedfoobar-suffix',
          body: 'NestedFooBar'
        }, {
          required: {
            _id: this.person2._id,
            username: this.person2.username,
            displayName: this.person2.displayName,
            field1: this.person2.field1,
            field2: this.person2.field2
          },
          optional: {
            _id: this.person3._id
          },
          slug: 'nested-prefix-foobar-nestedfoobar-suffix',
          body: 'NestedFooBar'
        }, {
          required: {
            _id: this.person3._id,
            displayName: this.person3.displayName,
            field1: this.person3.field1,
            field2: this.person3.field2
          },
          optional: {
            _id: this.person2._id,
            username: this.person2.username
          },
          slug: 'nested-prefix-foobar-nestedfoobar-suffix',
          body: 'NestedFooBar'
        }, {
          required: {
            _id: this.person3._id,
            displayName: this.person3.displayName,
            field1: this.person3.field1,
            field2: this.person3.field2
          },
          optional: {
            _id: this.person2._id,
            username: this.person2.username
          },
          slug: 'nested-prefix-foobar-nestedfoobar-suffix',
          body: 'NestedFooBar'
        }, {
          required: {
            _id: this.person2._id,
            username: this.person2.username,
            displayName: this.person2.displayName,
            field1: this.person2.field1,
            field2: this.person2.field2
          },
          optional: {
            _id: this.person2._id,
            username: this.person2.username
          },
          slug: 'nested-prefix-foobar-nestedfoobar-suffix',
          body: 'NestedFooBar'
        }, {
          required: {
            _id: this.person3._id,
            displayName: this.person3.displayName,
            field1: this.person3.field1,
            field2: this.person3.field2
          },
          optional: {
            _id: this.person3._id
          },
          slug: 'nested-prefix-foobar-nestedfoobar-suffix',
          body: 'NestedFooBar'
        }
      ],
      body: 'FooBar',
      slug: 'prefix-foobar-subdocumentfoobar-suffix',
      tags: ['tag-0-prefix-foobar-subdocumentfoobar-suffix', 'tag-1-prefix-foobar-nestedfoobar-suffix', 'tag-2-prefix-foobar-nestedfoobar-suffix', 'tag-3-prefix-foobar-nestedfoobar-suffix', 'tag-4-prefix-foobar-nestedfoobar-suffix', 'tag-5-prefix-foobar-nestedfoobar-suffix', 'tag-6-prefix-foobar-nestedfoobar-suffix']
    });
    Person.documents.update(this.person3Id, {
      $set: {
        username: 'person3b'
      }
    }, expect((function(_this) {
      return function(error, res) {
        test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
        return test.isTrue(res);
      };
    })(this)));
    return Meteor.setTimeout(expect(), WAIT_TIME);
  }, function(test, expect) {
    this.person3 = Person.documents.findOne(this.person3Id, {
      transform: null
    });
    test.equal(this.person3, {
      _id: this.person3Id,
      _schema: '1.0.0',
      username: 'person3b',
      displayName: 'Person 3',
      field1: 'Field 3 - 1',
      field2: 'Field 3 - 2',
      subdocumentsPosts: [
        {
          _id: this.postId,
          subdocument: {
            body: 'SubdocumentFooBar'
          },
          nested: [
            {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }
          ],
          body: 'FooBar'
        }
      ],
      nestedPosts: [
        {
          _id: this.postId,
          subdocument: {
            body: 'SubdocumentFooBar'
          },
          nested: [
            {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }
          ],
          body: 'FooBar'
        }
      ],
      count: 2
    });
    this.post = Post.documents.findOne(this.postId, {
      transform: null
    });
    return test.equal(this.post, {
      _id: this.postId,
      _schema: '1.0.0',
      author: {
        _id: this.person1._id,
        username: this.person1.username,
        displayName: this.person1.displayName,
        field1: this.person1.field1,
        field2: this.person1.field2
      },
      subscribers: [
        {
          _id: this.person2._id
        }, {
          _id: this.person2._id
        }, {
          _id: this.person3._id
        }
      ],
      reviewers: [
        {
          _id: this.person2._id,
          username: this.person2.username
        }, {
          _id: this.person3._id,
          username: this.person3.username
        }, {
          _id: this.person3._id,
          username: this.person3.username
        }
      ],
      subdocument: {
        person: {
          _id: this.person2._id,
          username: this.person2.username,
          displayName: this.person2.displayName,
          field1: this.person2.field1,
          field2: this.person2.field2
        },
        persons: [
          {
            _id: this.person2._id,
            username: this.person2.username,
            displayName: this.person2.displayName,
            field1: this.person2.field1,
            field2: this.person2.field2
          }, {
            _id: this.person2._id,
            username: this.person2.username,
            displayName: this.person2.displayName,
            field1: this.person2.field1,
            field2: this.person2.field2
          }, {
            _id: this.person3._id,
            username: this.person3.username,
            displayName: this.person3.displayName,
            field1: this.person3.field1,
            field2: this.person3.field2
          }, {
            _id: this.person3._id,
            username: this.person3.username,
            displayName: this.person3.displayName,
            field1: this.person3.field1,
            field2: this.person3.field2
          }
        ],
        slug: 'subdocument-prefix-foobar-subdocumentfoobar-suffix',
        body: 'SubdocumentFooBar'
      },
      nested: [
        {
          required: {
            _id: this.person2._id,
            username: this.person2.username,
            displayName: this.person2.displayName,
            field1: this.person2.field1,
            field2: this.person2.field2
          },
          optional: {
            _id: this.person3._id,
            username: this.person3.username
          },
          slug: 'nested-prefix-foobar-nestedfoobar-suffix',
          body: 'NestedFooBar'
        }, {
          required: {
            _id: this.person2._id,
            username: this.person2.username,
            displayName: this.person2.displayName,
            field1: this.person2.field1,
            field2: this.person2.field2
          },
          optional: {
            _id: this.person3._id,
            username: this.person3.username
          },
          slug: 'nested-prefix-foobar-nestedfoobar-suffix',
          body: 'NestedFooBar'
        }, {
          required: {
            _id: this.person3._id,
            username: this.person3.username,
            displayName: this.person3.displayName,
            field1: this.person3.field1,
            field2: this.person3.field2
          },
          optional: {
            _id: this.person2._id,
            username: this.person2.username
          },
          slug: 'nested-prefix-foobar-nestedfoobar-suffix',
          body: 'NestedFooBar'
        }, {
          required: {
            _id: this.person3._id,
            username: this.person3.username,
            displayName: this.person3.displayName,
            field1: this.person3.field1,
            field2: this.person3.field2
          },
          optional: {
            _id: this.person2._id,
            username: this.person2.username
          },
          slug: 'nested-prefix-foobar-nestedfoobar-suffix',
          body: 'NestedFooBar'
        }, {
          required: {
            _id: this.person2._id,
            username: this.person2.username,
            displayName: this.person2.displayName,
            field1: this.person2.field1,
            field2: this.person2.field2
          },
          optional: {
            _id: this.person2._id,
            username: this.person2.username
          },
          slug: 'nested-prefix-foobar-nestedfoobar-suffix',
          body: 'NestedFooBar'
        }, {
          required: {
            _id: this.person3._id,
            username: this.person3.username,
            displayName: this.person3.displayName,
            field1: this.person3.field1,
            field2: this.person3.field2
          },
          optional: {
            _id: this.person3._id,
            username: this.person3.username
          },
          slug: 'nested-prefix-foobar-nestedfoobar-suffix',
          body: 'NestedFooBar'
        }
      ],
      body: 'FooBar',
      slug: 'prefix-foobar-subdocumentfoobar-suffix',
      tags: ['tag-0-prefix-foobar-subdocumentfoobar-suffix', 'tag-1-prefix-foobar-nestedfoobar-suffix', 'tag-2-prefix-foobar-nestedfoobar-suffix', 'tag-3-prefix-foobar-nestedfoobar-suffix', 'tag-4-prefix-foobar-nestedfoobar-suffix', 'tag-5-prefix-foobar-nestedfoobar-suffix', 'tag-6-prefix-foobar-nestedfoobar-suffix']
    });
  }, function(test, expect) {
    Person.documents.update(this.person2Id, {
      $unset: {
        field1: '',
        field2: ''
      }
    }, expect((function(_this) {
      return function(error, res) {
        test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
        return test.isTrue(res);
      };
    })(this)));
    return Meteor.setTimeout(expect(), WAIT_TIME);
  }, function(test, expect) {
    this.person2 = Person.documents.findOne(this.person2Id, {
      transform: null
    });
    test.equal(this.person2, {
      _id: this.person2Id,
      _schema: '1.0.0',
      username: 'person2b',
      displayName: 'Person 2',
      subdocumentPosts: [
        {
          _id: this.postId,
          subdocument: {
            body: 'SubdocumentFooBar'
          },
          nested: [
            {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }
          ],
          body: 'FooBar'
        }
      ],
      subdocumentsPosts: [
        {
          _id: this.postId,
          subdocument: {
            body: 'SubdocumentFooBar'
          },
          nested: [
            {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }
          ],
          body: 'FooBar'
        }
      ],
      nestedPosts: [
        {
          _id: this.postId,
          subdocument: {
            body: 'SubdocumentFooBar'
          },
          nested: [
            {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }
          ],
          body: 'FooBar'
        }
      ],
      count: 3
    });
    this.post = Post.documents.findOne(this.postId, {
      transform: null
    });
    return test.equal(this.post, {
      _id: this.postId,
      _schema: '1.0.0',
      author: {
        _id: this.person1._id,
        username: this.person1.username,
        displayName: this.person1.displayName,
        field1: this.person1.field1,
        field2: this.person1.field2
      },
      subscribers: [
        {
          _id: this.person2._id
        }, {
          _id: this.person2._id
        }, {
          _id: this.person3._id
        }
      ],
      reviewers: [
        {
          _id: this.person2._id,
          username: this.person2.username
        }, {
          _id: this.person3._id,
          username: this.person3.username
        }, {
          _id: this.person3._id,
          username: this.person3.username
        }
      ],
      subdocument: {
        person: {
          _id: this.person2._id,
          username: this.person2.username,
          displayName: this.person2.displayName
        },
        persons: [
          {
            _id: this.person2._id,
            username: this.person2.username,
            displayName: this.person2.displayName
          }, {
            _id: this.person2._id,
            username: this.person2.username,
            displayName: this.person2.displayName
          }, {
            _id: this.person3._id,
            username: this.person3.username,
            displayName: this.person3.displayName,
            field1: this.person3.field1,
            field2: this.person3.field2
          }, {
            _id: this.person3._id,
            username: this.person3.username,
            displayName: this.person3.displayName,
            field1: this.person3.field1,
            field2: this.person3.field2
          }
        ],
        slug: 'subdocument-prefix-foobar-subdocumentfoobar-suffix',
        body: 'SubdocumentFooBar'
      },
      nested: [
        {
          required: {
            _id: this.person2._id,
            username: this.person2.username,
            displayName: this.person2.displayName
          },
          optional: {
            _id: this.person3._id,
            username: this.person3.username
          },
          slug: 'nested-prefix-foobar-nestedfoobar-suffix',
          body: 'NestedFooBar'
        }, {
          required: {
            _id: this.person2._id,
            username: this.person2.username,
            displayName: this.person2.displayName
          },
          optional: {
            _id: this.person3._id,
            username: this.person3.username
          },
          slug: 'nested-prefix-foobar-nestedfoobar-suffix',
          body: 'NestedFooBar'
        }, {
          required: {
            _id: this.person3._id,
            username: this.person3.username,
            displayName: this.person3.displayName,
            field1: this.person3.field1,
            field2: this.person3.field2
          },
          optional: {
            _id: this.person2._id,
            username: this.person2.username
          },
          slug: 'nested-prefix-foobar-nestedfoobar-suffix',
          body: 'NestedFooBar'
        }, {
          required: {
            _id: this.person3._id,
            username: this.person3.username,
            displayName: this.person3.displayName,
            field1: this.person3.field1,
            field2: this.person3.field2
          },
          optional: {
            _id: this.person2._id,
            username: this.person2.username
          },
          slug: 'nested-prefix-foobar-nestedfoobar-suffix',
          body: 'NestedFooBar'
        }, {
          required: {
            _id: this.person2._id,
            username: this.person2.username,
            displayName: this.person2.displayName
          },
          optional: {
            _id: this.person2._id,
            username: this.person2.username
          },
          slug: 'nested-prefix-foobar-nestedfoobar-suffix',
          body: 'NestedFooBar'
        }, {
          required: {
            _id: this.person3._id,
            username: this.person3.username,
            displayName: this.person3.displayName,
            field1: this.person3.field1,
            field2: this.person3.field2
          },
          optional: {
            _id: this.person3._id,
            username: this.person3.username
          },
          slug: 'nested-prefix-foobar-nestedfoobar-suffix',
          body: 'NestedFooBar'
        }
      ],
      body: 'FooBar',
      slug: 'prefix-foobar-subdocumentfoobar-suffix',
      tags: ['tag-0-prefix-foobar-subdocumentfoobar-suffix', 'tag-1-prefix-foobar-nestedfoobar-suffix', 'tag-2-prefix-foobar-nestedfoobar-suffix', 'tag-3-prefix-foobar-nestedfoobar-suffix', 'tag-4-prefix-foobar-nestedfoobar-suffix', 'tag-5-prefix-foobar-nestedfoobar-suffix', 'tag-6-prefix-foobar-nestedfoobar-suffix']
    });
  }, function(test, expect) {
    Person.documents.update(this.person2Id, {
      $set: {
        field1: 'Field 2 - 1b',
        field2: 'Field 2 - 2b'
      }
    }, expect((function(_this) {
      return function(error, res) {
        test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
        return test.isTrue(res);
      };
    })(this)));
    return Meteor.setTimeout(expect(), WAIT_TIME);
  }, function(test, expect) {
    this.person2 = Person.documents.findOne(this.person2Id, {
      transform: null
    });
    test.equal(this.person2, {
      _id: this.person2Id,
      _schema: '1.0.0',
      username: 'person2b',
      displayName: 'Person 2',
      field1: 'Field 2 - 1b',
      field2: 'Field 2 - 2b',
      subdocumentPosts: [
        {
          _id: this.postId,
          subdocument: {
            body: 'SubdocumentFooBar'
          },
          nested: [
            {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }
          ],
          body: 'FooBar'
        }
      ],
      subdocumentsPosts: [
        {
          _id: this.postId,
          subdocument: {
            body: 'SubdocumentFooBar'
          },
          nested: [
            {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }
          ],
          body: 'FooBar'
        }
      ],
      nestedPosts: [
        {
          _id: this.postId,
          subdocument: {
            body: 'SubdocumentFooBar'
          },
          nested: [
            {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }
          ],
          body: 'FooBar'
        }
      ],
      count: 3
    });
    this.post = Post.documents.findOne(this.postId, {
      transform: null
    });
    test.equal(this.post, {
      _id: this.postId,
      _schema: '1.0.0',
      author: {
        _id: this.person1._id,
        username: this.person1.username,
        displayName: this.person1.displayName,
        field1: this.person1.field1,
        field2: this.person1.field2
      },
      subscribers: [
        {
          _id: this.person2._id
        }, {
          _id: this.person2._id
        }, {
          _id: this.person3._id
        }
      ],
      reviewers: [
        {
          _id: this.person2._id,
          username: this.person2.username
        }, {
          _id: this.person3._id,
          username: this.person3.username
        }, {
          _id: this.person3._id,
          username: this.person3.username
        }
      ],
      subdocument: {
        person: {
          _id: this.person2._id,
          username: this.person2.username,
          displayName: this.person2.displayName,
          field1: this.person2.field1,
          field2: this.person2.field2
        },
        persons: [
          {
            _id: this.person2._id,
            username: this.person2.username,
            displayName: this.person2.displayName,
            field1: this.person2.field1,
            field2: this.person2.field2
          }, {
            _id: this.person2._id,
            username: this.person2.username,
            displayName: this.person2.displayName,
            field1: this.person2.field1,
            field2: this.person2.field2
          }, {
            _id: this.person3._id,
            username: this.person3.username,
            displayName: this.person3.displayName,
            field1: this.person3.field1,
            field2: this.person3.field2
          }, {
            _id: this.person3._id,
            username: this.person3.username,
            displayName: this.person3.displayName,
            field1: this.person3.field1,
            field2: this.person3.field2
          }
        ],
        slug: 'subdocument-prefix-foobar-subdocumentfoobar-suffix',
        body: 'SubdocumentFooBar'
      },
      nested: [
        {
          required: {
            _id: this.person2._id,
            username: this.person2.username,
            displayName: this.person2.displayName,
            field1: this.person2.field1,
            field2: this.person2.field2
          },
          optional: {
            _id: this.person3._id,
            username: this.person3.username
          },
          slug: 'nested-prefix-foobar-nestedfoobar-suffix',
          body: 'NestedFooBar'
        }, {
          required: {
            _id: this.person2._id,
            username: this.person2.username,
            displayName: this.person2.displayName,
            field1: this.person2.field1,
            field2: this.person2.field2
          },
          optional: {
            _id: this.person3._id,
            username: this.person3.username
          },
          slug: 'nested-prefix-foobar-nestedfoobar-suffix',
          body: 'NestedFooBar'
        }, {
          required: {
            _id: this.person3._id,
            username: this.person3.username,
            displayName: this.person3.displayName,
            field1: this.person3.field1,
            field2: this.person3.field2
          },
          optional: {
            _id: this.person2._id,
            username: this.person2.username
          },
          slug: 'nested-prefix-foobar-nestedfoobar-suffix',
          body: 'NestedFooBar'
        }, {
          required: {
            _id: this.person3._id,
            username: this.person3.username,
            displayName: this.person3.displayName,
            field1: this.person3.field1,
            field2: this.person3.field2
          },
          optional: {
            _id: this.person2._id,
            username: this.person2.username
          },
          slug: 'nested-prefix-foobar-nestedfoobar-suffix',
          body: 'NestedFooBar'
        }, {
          required: {
            _id: this.person2._id,
            username: this.person2.username,
            displayName: this.person2.displayName,
            field1: this.person2.field1,
            field2: this.person2.field2
          },
          optional: {
            _id: this.person2._id,
            username: this.person2.username
          },
          slug: 'nested-prefix-foobar-nestedfoobar-suffix',
          body: 'NestedFooBar'
        }, {
          required: {
            _id: this.person3._id,
            username: this.person3.username,
            displayName: this.person3.displayName,
            field1: this.person3.field1,
            field2: this.person3.field2
          },
          optional: {
            _id: this.person3._id,
            username: this.person3.username
          },
          slug: 'nested-prefix-foobar-nestedfoobar-suffix',
          body: 'NestedFooBar'
        }
      ],
      body: 'FooBar',
      slug: 'prefix-foobar-subdocumentfoobar-suffix',
      tags: ['tag-0-prefix-foobar-subdocumentfoobar-suffix', 'tag-1-prefix-foobar-nestedfoobar-suffix', 'tag-2-prefix-foobar-nestedfoobar-suffix', 'tag-3-prefix-foobar-nestedfoobar-suffix', 'tag-4-prefix-foobar-nestedfoobar-suffix', 'tag-5-prefix-foobar-nestedfoobar-suffix', 'tag-6-prefix-foobar-nestedfoobar-suffix']
    });
    Post.documents.update(this.postId, {
      $set: {
        'subdocument.body': 'SubdocumentFooBarZ'
      }
    }, expect((function(_this) {
      return function(error, res) {
        test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
        return test.isTrue(res);
      };
    })(this)));
    return Meteor.setTimeout(expect(), WAIT_TIME);
  }, function(test, expect) {
    this.person1 = Person.documents.findOne(this.person1Id, {
      transform: null
    });
    this.person2 = Person.documents.findOne(this.person2Id, {
      transform: null
    });
    this.person3 = Person.documents.findOne(this.person3Id, {
      transform: null
    });
    test.equal(this.person1, {
      _id: this.person1Id,
      _schema: '1.0.0',
      username: 'person1b',
      displayName: 'Person 1',
      field1: 'Field 1 - 1a',
      field2: 'Field 1 - 2a',
      posts: [
        {
          _id: this.postId,
          subdocument: {
            body: 'SubdocumentFooBarZ'
          },
          nested: [
            {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }
          ],
          body: 'FooBar'
        }
      ],
      count: 1
    });
    test.equal(this.person2, {
      _id: this.person2Id,
      _schema: '1.0.0',
      username: 'person2b',
      displayName: 'Person 2',
      field1: 'Field 2 - 1b',
      field2: 'Field 2 - 2b',
      subdocumentPosts: [
        {
          _id: this.postId,
          subdocument: {
            body: 'SubdocumentFooBarZ'
          },
          nested: [
            {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }
          ],
          body: 'FooBar'
        }
      ],
      subdocumentsPosts: [
        {
          _id: this.postId,
          subdocument: {
            body: 'SubdocumentFooBarZ'
          },
          nested: [
            {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }
          ],
          body: 'FooBar'
        }
      ],
      nestedPosts: [
        {
          _id: this.postId,
          subdocument: {
            body: 'SubdocumentFooBarZ'
          },
          nested: [
            {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }
          ],
          body: 'FooBar'
        }
      ],
      count: 3
    });
    test.equal(this.person3, {
      _id: this.person3Id,
      _schema: '1.0.0',
      username: 'person3b',
      displayName: 'Person 3',
      field1: 'Field 3 - 1',
      field2: 'Field 3 - 2',
      subdocumentsPosts: [
        {
          _id: this.postId,
          subdocument: {
            body: 'SubdocumentFooBarZ'
          },
          nested: [
            {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }
          ],
          body: 'FooBar'
        }
      ],
      nestedPosts: [
        {
          _id: this.postId,
          subdocument: {
            body: 'SubdocumentFooBarZ'
          },
          nested: [
            {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }
          ],
          body: 'FooBar'
        }
      ],
      count: 2
    });
    this.post = Post.documents.findOne(this.postId, {
      transform: null
    });
    test.equal(this.post, {
      _id: this.postId,
      _schema: '1.0.0',
      author: {
        _id: this.person1._id,
        username: this.person1.username,
        displayName: this.person1.displayName,
        field1: this.person1.field1,
        field2: this.person1.field2
      },
      subscribers: [
        {
          _id: this.person2._id
        }, {
          _id: this.person2._id
        }, {
          _id: this.person3._id
        }
      ],
      reviewers: [
        {
          _id: this.person2._id,
          username: this.person2.username
        }, {
          _id: this.person3._id,
          username: this.person3.username
        }, {
          _id: this.person3._id,
          username: this.person3.username
        }
      ],
      subdocument: {
        person: {
          _id: this.person2._id,
          username: this.person2.username,
          displayName: this.person2.displayName,
          field1: this.person2.field1,
          field2: this.person2.field2
        },
        persons: [
          {
            _id: this.person2._id,
            username: this.person2.username,
            displayName: this.person2.displayName,
            field1: this.person2.field1,
            field2: this.person2.field2
          }, {
            _id: this.person2._id,
            username: this.person2.username,
            displayName: this.person2.displayName,
            field1: this.person2.field1,
            field2: this.person2.field2
          }, {
            _id: this.person3._id,
            username: this.person3.username,
            displayName: this.person3.displayName,
            field1: this.person3.field1,
            field2: this.person3.field2
          }, {
            _id: this.person3._id,
            username: this.person3.username,
            displayName: this.person3.displayName,
            field1: this.person3.field1,
            field2: this.person3.field2
          }
        ],
        slug: 'subdocument-prefix-foobar-subdocumentfoobarz-suffix',
        body: 'SubdocumentFooBarZ'
      },
      nested: [
        {
          required: {
            _id: this.person2._id,
            username: this.person2.username,
            displayName: this.person2.displayName,
            field1: this.person2.field1,
            field2: this.person2.field2
          },
          optional: {
            _id: this.person3._id,
            username: this.person3.username
          },
          slug: 'nested-prefix-foobar-nestedfoobar-suffix',
          body: 'NestedFooBar'
        }, {
          required: {
            _id: this.person2._id,
            username: this.person2.username,
            displayName: this.person2.displayName,
            field1: this.person2.field1,
            field2: this.person2.field2
          },
          optional: {
            _id: this.person3._id,
            username: this.person3.username
          },
          slug: 'nested-prefix-foobar-nestedfoobar-suffix',
          body: 'NestedFooBar'
        }, {
          required: {
            _id: this.person3._id,
            username: this.person3.username,
            displayName: this.person3.displayName,
            field1: this.person3.field1,
            field2: this.person3.field2
          },
          optional: {
            _id: this.person2._id,
            username: this.person2.username
          },
          slug: 'nested-prefix-foobar-nestedfoobar-suffix',
          body: 'NestedFooBar'
        }, {
          required: {
            _id: this.person3._id,
            username: this.person3.username,
            displayName: this.person3.displayName,
            field1: this.person3.field1,
            field2: this.person3.field2
          },
          optional: {
            _id: this.person2._id,
            username: this.person2.username
          },
          slug: 'nested-prefix-foobar-nestedfoobar-suffix',
          body: 'NestedFooBar'
        }, {
          required: {
            _id: this.person2._id,
            username: this.person2.username,
            displayName: this.person2.displayName,
            field1: this.person2.field1,
            field2: this.person2.field2
          },
          optional: {
            _id: this.person2._id,
            username: this.person2.username
          },
          slug: 'nested-prefix-foobar-nestedfoobar-suffix',
          body: 'NestedFooBar'
        }, {
          required: {
            _id: this.person3._id,
            username: this.person3.username,
            displayName: this.person3.displayName,
            field1: this.person3.field1,
            field2: this.person3.field2
          },
          optional: {
            _id: this.person3._id,
            username: this.person3.username
          },
          slug: 'nested-prefix-foobar-nestedfoobar-suffix',
          body: 'NestedFooBar'
        }
      ],
      body: 'FooBar',
      slug: 'prefix-foobar-subdocumentfoobarz-suffix',
      tags: ['tag-0-prefix-foobar-subdocumentfoobarz-suffix', 'tag-1-prefix-foobar-nestedfoobar-suffix', 'tag-2-prefix-foobar-nestedfoobar-suffix', 'tag-3-prefix-foobar-nestedfoobar-suffix', 'tag-4-prefix-foobar-nestedfoobar-suffix', 'tag-5-prefix-foobar-nestedfoobar-suffix', 'tag-6-prefix-foobar-nestedfoobar-suffix']
    });
    Post.documents.update(this.postId, {
      $set: {
        'nested.0.body': 'NestedFooBarZ'
      }
    }, expect((function(_this) {
      return function(error, res) {
        test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
        return test.isTrue(res);
      };
    })(this)));
    return Meteor.setTimeout(expect(), WAIT_TIME);
  }, function(test, expect) {
    this.person1 = Person.documents.findOne(this.person1Id, {
      transform: null
    });
    this.person2 = Person.documents.findOne(this.person2Id, {
      transform: null
    });
    this.person3 = Person.documents.findOne(this.person3Id, {
      transform: null
    });
    test.equal(this.person1, {
      _id: this.person1Id,
      _schema: '1.0.0',
      username: 'person1b',
      displayName: 'Person 1',
      field1: 'Field 1 - 1a',
      field2: 'Field 1 - 2a',
      posts: [
        {
          _id: this.postId,
          subdocument: {
            body: 'SubdocumentFooBarZ'
          },
          nested: [
            {
              body: 'NestedFooBarZ'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }
          ],
          body: 'FooBar'
        }
      ],
      count: 1
    });
    test.equal(this.person2, {
      _id: this.person2Id,
      _schema: '1.0.0',
      username: 'person2b',
      displayName: 'Person 2',
      field1: 'Field 2 - 1b',
      field2: 'Field 2 - 2b',
      subdocumentsPosts: [
        {
          _id: this.postId,
          subdocument: {
            body: 'SubdocumentFooBarZ'
          },
          nested: [
            {
              body: 'NestedFooBarZ'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }
          ],
          body: 'FooBar'
        }
      ],
      subdocumentPosts: [
        {
          _id: this.postId,
          subdocument: {
            body: 'SubdocumentFooBarZ'
          },
          nested: [
            {
              body: 'NestedFooBarZ'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }
          ],
          body: 'FooBar'
        }
      ],
      nestedPosts: [
        {
          _id: this.postId,
          subdocument: {
            body: 'SubdocumentFooBarZ'
          },
          nested: [
            {
              body: 'NestedFooBarZ'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }
          ],
          body: 'FooBar'
        }
      ],
      count: 3
    });
    test.equal(this.person3, {
      _id: this.person3Id,
      _schema: '1.0.0',
      username: 'person3b',
      displayName: 'Person 3',
      field1: 'Field 3 - 1',
      field2: 'Field 3 - 2',
      subdocumentsPosts: [
        {
          _id: this.postId,
          subdocument: {
            body: 'SubdocumentFooBarZ'
          },
          nested: [
            {
              body: 'NestedFooBarZ'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }
          ],
          body: 'FooBar'
        }
      ],
      nestedPosts: [
        {
          _id: this.postId,
          subdocument: {
            body: 'SubdocumentFooBarZ'
          },
          nested: [
            {
              body: 'NestedFooBarZ'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }
          ],
          body: 'FooBar'
        }
      ],
      count: 2
    });
    this.post = Post.documents.findOne(this.postId, {
      transform: null
    });
    test.equal(this.post, {
      _id: this.postId,
      _schema: '1.0.0',
      author: {
        _id: this.person1._id,
        username: this.person1.username,
        displayName: this.person1.displayName,
        field1: this.person1.field1,
        field2: this.person1.field2
      },
      subscribers: [
        {
          _id: this.person2._id
        }, {
          _id: this.person2._id
        }, {
          _id: this.person3._id
        }
      ],
      reviewers: [
        {
          _id: this.person2._id,
          username: this.person2.username
        }, {
          _id: this.person3._id,
          username: this.person3.username
        }, {
          _id: this.person3._id,
          username: this.person3.username
        }
      ],
      subdocument: {
        person: {
          _id: this.person2._id,
          username: this.person2.username,
          displayName: this.person2.displayName,
          field1: this.person2.field1,
          field2: this.person2.field2
        },
        persons: [
          {
            _id: this.person2._id,
            username: this.person2.username,
            displayName: this.person2.displayName,
            field1: this.person2.field1,
            field2: this.person2.field2
          }, {
            _id: this.person2._id,
            username: this.person2.username,
            displayName: this.person2.displayName,
            field1: this.person2.field1,
            field2: this.person2.field2
          }, {
            _id: this.person3._id,
            username: this.person3.username,
            displayName: this.person3.displayName,
            field1: this.person3.field1,
            field2: this.person3.field2
          }, {
            _id: this.person3._id,
            username: this.person3.username,
            displayName: this.person3.displayName,
            field1: this.person3.field1,
            field2: this.person3.field2
          }
        ],
        slug: 'subdocument-prefix-foobar-subdocumentfoobarz-suffix',
        body: 'SubdocumentFooBarZ'
      },
      nested: [
        {
          required: {
            _id: this.person2._id,
            username: this.person2.username,
            displayName: this.person2.displayName,
            field1: this.person2.field1,
            field2: this.person2.field2
          },
          optional: {
            _id: this.person3._id,
            username: this.person3.username
          },
          slug: 'nested-prefix-foobar-nestedfoobarz-suffix',
          body: 'NestedFooBarZ'
        }, {
          required: {
            _id: this.person2._id,
            username: this.person2.username,
            displayName: this.person2.displayName,
            field1: this.person2.field1,
            field2: this.person2.field2
          },
          optional: {
            _id: this.person3._id,
            username: this.person3.username
          },
          slug: 'nested-prefix-foobar-nestedfoobar-suffix',
          body: 'NestedFooBar'
        }, {
          required: {
            _id: this.person3._id,
            username: this.person3.username,
            displayName: this.person3.displayName,
            field1: this.person3.field1,
            field2: this.person3.field2
          },
          optional: {
            _id: this.person2._id,
            username: this.person2.username
          },
          slug: 'nested-prefix-foobar-nestedfoobar-suffix',
          body: 'NestedFooBar'
        }, {
          required: {
            _id: this.person3._id,
            username: this.person3.username,
            displayName: this.person3.displayName,
            field1: this.person3.field1,
            field2: this.person3.field2
          },
          optional: {
            _id: this.person2._id,
            username: this.person2.username
          },
          slug: 'nested-prefix-foobar-nestedfoobar-suffix',
          body: 'NestedFooBar'
        }, {
          required: {
            _id: this.person2._id,
            username: this.person2.username,
            displayName: this.person2.displayName,
            field1: this.person2.field1,
            field2: this.person2.field2
          },
          optional: {
            _id: this.person2._id,
            username: this.person2.username
          },
          slug: 'nested-prefix-foobar-nestedfoobar-suffix',
          body: 'NestedFooBar'
        }, {
          required: {
            _id: this.person3._id,
            username: this.person3.username,
            displayName: this.person3.displayName,
            field1: this.person3.field1,
            field2: this.person3.field2
          },
          optional: {
            _id: this.person3._id,
            username: this.person3.username
          },
          slug: 'nested-prefix-foobar-nestedfoobar-suffix',
          body: 'NestedFooBar'
        }
      ],
      body: 'FooBar',
      slug: 'prefix-foobar-subdocumentfoobarz-suffix',
      tags: ['tag-0-prefix-foobar-subdocumentfoobarz-suffix', 'tag-1-prefix-foobar-nestedfoobarz-suffix', 'tag-2-prefix-foobar-nestedfoobar-suffix', 'tag-3-prefix-foobar-nestedfoobar-suffix', 'tag-4-prefix-foobar-nestedfoobar-suffix', 'tag-5-prefix-foobar-nestedfoobar-suffix', 'tag-6-prefix-foobar-nestedfoobar-suffix']
    });
    Post.documents.update(this.postId, {
      $set: {
        'nested.4.body': 'NestedFooBarA'
      }
    }, expect((function(_this) {
      return function(error, res) {
        test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
        return test.isTrue(res);
      };
    })(this)));
    return Meteor.setTimeout(expect(), WAIT_TIME);
  }, function(test, expect) {
    this.person1 = Person.documents.findOne(this.person1Id, {
      transform: null
    });
    this.person2 = Person.documents.findOne(this.person2Id, {
      transform: null
    });
    this.person3 = Person.documents.findOne(this.person3Id, {
      transform: null
    });
    test.equal(this.person1, {
      _id: this.person1Id,
      _schema: '1.0.0',
      username: 'person1b',
      displayName: 'Person 1',
      field1: 'Field 1 - 1a',
      field2: 'Field 1 - 2a',
      posts: [
        {
          _id: this.postId,
          subdocument: {
            body: 'SubdocumentFooBarZ'
          },
          nested: [
            {
              body: 'NestedFooBarZ'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBarA'
            }, {
              body: 'NestedFooBar'
            }
          ],
          body: 'FooBar'
        }
      ],
      count: 1
    });
    test.equal(this.person2, {
      _id: this.person2Id,
      _schema: '1.0.0',
      username: 'person2b',
      displayName: 'Person 2',
      field1: 'Field 2 - 1b',
      field2: 'Field 2 - 2b',
      subdocumentPosts: [
        {
          _id: this.postId,
          subdocument: {
            body: 'SubdocumentFooBarZ'
          },
          nested: [
            {
              body: 'NestedFooBarZ'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBarA'
            }, {
              body: 'NestedFooBar'
            }
          ],
          body: 'FooBar'
        }
      ],
      subdocumentsPosts: [
        {
          _id: this.postId,
          subdocument: {
            body: 'SubdocumentFooBarZ'
          },
          nested: [
            {
              body: 'NestedFooBarZ'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBarA'
            }, {
              body: 'NestedFooBar'
            }
          ],
          body: 'FooBar'
        }
      ],
      nestedPosts: [
        {
          _id: this.postId,
          subdocument: {
            body: 'SubdocumentFooBarZ'
          },
          nested: [
            {
              body: 'NestedFooBarZ'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBarA'
            }, {
              body: 'NestedFooBar'
            }
          ],
          body: 'FooBar'
        }
      ],
      count: 3
    });
    test.equal(this.person3, {
      _id: this.person3Id,
      _schema: '1.0.0',
      username: 'person3b',
      displayName: 'Person 3',
      field1: 'Field 3 - 1',
      field2: 'Field 3 - 2',
      subdocumentsPosts: [
        {
          _id: this.postId,
          subdocument: {
            body: 'SubdocumentFooBarZ'
          },
          nested: [
            {
              body: 'NestedFooBarZ'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBarA'
            }, {
              body: 'NestedFooBar'
            }
          ],
          body: 'FooBar'
        }
      ],
      nestedPosts: [
        {
          _id: this.postId,
          subdocument: {
            body: 'SubdocumentFooBarZ'
          },
          nested: [
            {
              body: 'NestedFooBarZ'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBarA'
            }, {
              body: 'NestedFooBar'
            }
          ],
          body: 'FooBar'
        }
      ],
      count: 2
    });
    this.post = Post.documents.findOne(this.postId, {
      transform: null
    });
    test.equal(this.post, {
      _id: this.postId,
      _schema: '1.0.0',
      author: {
        _id: this.person1._id,
        username: this.person1.username,
        displayName: this.person1.displayName,
        field1: this.person1.field1,
        field2: this.person1.field2
      },
      subscribers: [
        {
          _id: this.person2._id
        }, {
          _id: this.person2._id
        }, {
          _id: this.person3._id
        }
      ],
      reviewers: [
        {
          _id: this.person2._id,
          username: this.person2.username
        }, {
          _id: this.person3._id,
          username: this.person3.username
        }, {
          _id: this.person3._id,
          username: this.person3.username
        }
      ],
      subdocument: {
        person: {
          _id: this.person2._id,
          username: this.person2.username,
          displayName: this.person2.displayName,
          field1: this.person2.field1,
          field2: this.person2.field2
        },
        persons: [
          {
            _id: this.person2._id,
            username: this.person2.username,
            displayName: this.person2.displayName,
            field1: this.person2.field1,
            field2: this.person2.field2
          }, {
            _id: this.person2._id,
            username: this.person2.username,
            displayName: this.person2.displayName,
            field1: this.person2.field1,
            field2: this.person2.field2
          }, {
            _id: this.person3._id,
            username: this.person3.username,
            displayName: this.person3.displayName,
            field1: this.person3.field1,
            field2: this.person3.field2
          }, {
            _id: this.person3._id,
            username: this.person3.username,
            displayName: this.person3.displayName,
            field1: this.person3.field1,
            field2: this.person3.field2
          }
        ],
        slug: 'subdocument-prefix-foobar-subdocumentfoobarz-suffix',
        body: 'SubdocumentFooBarZ'
      },
      nested: [
        {
          required: {
            _id: this.person2._id,
            username: this.person2.username,
            displayName: this.person2.displayName,
            field1: this.person2.field1,
            field2: this.person2.field2
          },
          optional: {
            _id: this.person3._id,
            username: this.person3.username
          },
          slug: 'nested-prefix-foobar-nestedfoobarz-suffix',
          body: 'NestedFooBarZ'
        }, {
          required: {
            _id: this.person2._id,
            username: this.person2.username,
            displayName: this.person2.displayName,
            field1: this.person2.field1,
            field2: this.person2.field2
          },
          optional: {
            _id: this.person3._id,
            username: this.person3.username
          },
          slug: 'nested-prefix-foobar-nestedfoobar-suffix',
          body: 'NestedFooBar'
        }, {
          required: {
            _id: this.person3._id,
            username: this.person3.username,
            displayName: this.person3.displayName,
            field1: this.person3.field1,
            field2: this.person3.field2
          },
          optional: {
            _id: this.person2._id,
            username: this.person2.username
          },
          slug: 'nested-prefix-foobar-nestedfoobar-suffix',
          body: 'NestedFooBar'
        }, {
          required: {
            _id: this.person3._id,
            username: this.person3.username,
            displayName: this.person3.displayName,
            field1: this.person3.field1,
            field2: this.person3.field2
          },
          optional: {
            _id: this.person2._id,
            username: this.person2.username
          },
          slug: 'nested-prefix-foobar-nestedfoobar-suffix',
          body: 'NestedFooBar'
        }, {
          required: {
            _id: this.person2._id,
            username: this.person2.username,
            displayName: this.person2.displayName,
            field1: this.person2.field1,
            field2: this.person2.field2
          },
          optional: {
            _id: this.person2._id,
            username: this.person2.username
          },
          slug: 'nested-prefix-foobar-nestedfoobara-suffix',
          body: 'NestedFooBarA'
        }, {
          required: {
            _id: this.person3._id,
            username: this.person3.username,
            displayName: this.person3.displayName,
            field1: this.person3.field1,
            field2: this.person3.field2
          },
          optional: {
            _id: this.person3._id,
            username: this.person3.username
          },
          slug: 'nested-prefix-foobar-nestedfoobar-suffix',
          body: 'NestedFooBar'
        }
      ],
      body: 'FooBar',
      slug: 'prefix-foobar-subdocumentfoobarz-suffix',
      tags: ['tag-0-prefix-foobar-subdocumentfoobarz-suffix', 'tag-1-prefix-foobar-nestedfoobarz-suffix', 'tag-2-prefix-foobar-nestedfoobar-suffix', 'tag-3-prefix-foobar-nestedfoobar-suffix', 'tag-4-prefix-foobar-nestedfoobar-suffix', 'tag-5-prefix-foobar-nestedfoobara-suffix', 'tag-6-prefix-foobar-nestedfoobar-suffix']
    });
    Post.documents.update(this.postId, {
      $set: {
        'nested.3.body': null
      }
    }, expect((function(_this) {
      return function(error, res) {
        test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
        return test.isTrue(res);
      };
    })(this)));
    return Meteor.setTimeout(expect(), WAIT_TIME);
  }, function(test, expect) {
    this.person1 = Person.documents.findOne(this.person1Id, {
      transform: null
    });
    this.person2 = Person.documents.findOne(this.person2Id, {
      transform: null
    });
    this.person3 = Person.documents.findOne(this.person3Id, {
      transform: null
    });
    test.equal(this.person1, {
      _id: this.person1Id,
      _schema: '1.0.0',
      username: 'person1b',
      displayName: 'Person 1',
      field1: 'Field 1 - 1a',
      field2: 'Field 1 - 2a',
      posts: [
        {
          _id: this.postId,
          subdocument: {
            body: 'SubdocumentFooBarZ'
          },
          nested: [
            {
              body: 'NestedFooBarZ'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: null
            }, {
              body: 'NestedFooBarA'
            }, {
              body: 'NestedFooBar'
            }
          ],
          body: 'FooBar'
        }
      ],
      count: 1
    });
    test.equal(this.person2, {
      _id: this.person2Id,
      _schema: '1.0.0',
      username: 'person2b',
      displayName: 'Person 2',
      field1: 'Field 2 - 1b',
      field2: 'Field 2 - 2b',
      subdocumentPosts: [
        {
          _id: this.postId,
          subdocument: {
            body: 'SubdocumentFooBarZ'
          },
          nested: [
            {
              body: 'NestedFooBarZ'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: null
            }, {
              body: 'NestedFooBarA'
            }, {
              body: 'NestedFooBar'
            }
          ],
          body: 'FooBar'
        }
      ],
      subdocumentsPosts: [
        {
          _id: this.postId,
          subdocument: {
            body: 'SubdocumentFooBarZ'
          },
          nested: [
            {
              body: 'NestedFooBarZ'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: null
            }, {
              body: 'NestedFooBarA'
            }, {
              body: 'NestedFooBar'
            }
          ],
          body: 'FooBar'
        }
      ],
      nestedPosts: [
        {
          _id: this.postId,
          subdocument: {
            body: 'SubdocumentFooBarZ'
          },
          nested: [
            {
              body: 'NestedFooBarZ'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: null
            }, {
              body: 'NestedFooBarA'
            }, {
              body: 'NestedFooBar'
            }
          ],
          body: 'FooBar'
        }
      ],
      count: 3
    });
    test.equal(this.person3, {
      _id: this.person3Id,
      _schema: '1.0.0',
      username: 'person3b',
      displayName: 'Person 3',
      field1: 'Field 3 - 1',
      field2: 'Field 3 - 2',
      subdocumentsPosts: [
        {
          _id: this.postId,
          subdocument: {
            body: 'SubdocumentFooBarZ'
          },
          nested: [
            {
              body: 'NestedFooBarZ'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: null
            }, {
              body: 'NestedFooBarA'
            }, {
              body: 'NestedFooBar'
            }
          ],
          body: 'FooBar'
        }
      ],
      nestedPosts: [
        {
          _id: this.postId,
          subdocument: {
            body: 'SubdocumentFooBarZ'
          },
          nested: [
            {
              body: 'NestedFooBarZ'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NestedFooBar'
            }, {
              body: null
            }, {
              body: 'NestedFooBarA'
            }, {
              body: 'NestedFooBar'
            }
          ],
          body: 'FooBar'
        }
      ],
      count: 2
    });
    this.post = Post.documents.findOne(this.postId, {
      transform: null
    });
    test.equal(this.post, {
      _id: this.postId,
      _schema: '1.0.0',
      author: {
        _id: this.person1._id,
        username: this.person1.username,
        displayName: this.person1.displayName,
        field1: this.person1.field1,
        field2: this.person1.field2
      },
      subscribers: [
        {
          _id: this.person2._id
        }, {
          _id: this.person2._id
        }, {
          _id: this.person3._id
        }
      ],
      reviewers: [
        {
          _id: this.person2._id,
          username: this.person2.username
        }, {
          _id: this.person3._id,
          username: this.person3.username
        }, {
          _id: this.person3._id,
          username: this.person3.username
        }
      ],
      subdocument: {
        person: {
          _id: this.person2._id,
          username: this.person2.username,
          displayName: this.person2.displayName,
          field1: this.person2.field1,
          field2: this.person2.field2
        },
        persons: [
          {
            _id: this.person2._id,
            username: this.person2.username,
            displayName: this.person2.displayName,
            field1: this.person2.field1,
            field2: this.person2.field2
          }, {
            _id: this.person2._id,
            username: this.person2.username,
            displayName: this.person2.displayName,
            field1: this.person2.field1,
            field2: this.person2.field2
          }, {
            _id: this.person3._id,
            username: this.person3.username,
            displayName: this.person3.displayName,
            field1: this.person3.field1,
            field2: this.person3.field2
          }, {
            _id: this.person3._id,
            username: this.person3.username,
            displayName: this.person3.displayName,
            field1: this.person3.field1,
            field2: this.person3.field2
          }
        ],
        slug: 'subdocument-prefix-foobar-subdocumentfoobarz-suffix',
        body: 'SubdocumentFooBarZ'
      },
      nested: [
        {
          required: {
            _id: this.person2._id,
            username: this.person2.username,
            displayName: this.person2.displayName,
            field1: this.person2.field1,
            field2: this.person2.field2
          },
          optional: {
            _id: this.person3._id,
            username: this.person3.username
          },
          slug: 'nested-prefix-foobar-nestedfoobarz-suffix',
          body: 'NestedFooBarZ'
        }, {
          required: {
            _id: this.person2._id,
            username: this.person2.username,
            displayName: this.person2.displayName,
            field1: this.person2.field1,
            field2: this.person2.field2
          },
          optional: {
            _id: this.person3._id,
            username: this.person3.username
          },
          slug: 'nested-prefix-foobar-nestedfoobar-suffix',
          body: 'NestedFooBar'
        }, {
          required: {
            _id: this.person3._id,
            username: this.person3.username,
            displayName: this.person3.displayName,
            field1: this.person3.field1,
            field2: this.person3.field2
          },
          optional: {
            _id: this.person2._id,
            username: this.person2.username
          },
          slug: 'nested-prefix-foobar-nestedfoobar-suffix',
          body: 'NestedFooBar'
        }, {
          required: {
            _id: this.person3._id,
            username: this.person3.username,
            displayName: this.person3.displayName,
            field1: this.person3.field1,
            field2: this.person3.field2
          },
          optional: {
            _id: this.person2._id,
            username: this.person2.username
          },
          slug: null,
          body: null
        }, {
          required: {
            _id: this.person2._id,
            username: this.person2.username,
            displayName: this.person2.displayName,
            field1: this.person2.field1,
            field2: this.person2.field2
          },
          optional: {
            _id: this.person2._id,
            username: this.person2.username
          },
          slug: 'nested-prefix-foobar-nestedfoobara-suffix',
          body: 'NestedFooBarA'
        }, {
          required: {
            _id: this.person3._id,
            username: this.person3.username,
            displayName: this.person3.displayName,
            field1: this.person3.field1,
            field2: this.person3.field2
          },
          optional: {
            _id: this.person3._id,
            username: this.person3.username
          },
          slug: 'nested-prefix-foobar-nestedfoobar-suffix',
          body: 'NestedFooBar'
        }
      ],
      body: 'FooBar',
      slug: 'prefix-foobar-subdocumentfoobarz-suffix',
      tags: ['tag-0-prefix-foobar-subdocumentfoobarz-suffix', 'tag-1-prefix-foobar-nestedfoobarz-suffix', 'tag-2-prefix-foobar-nestedfoobar-suffix', 'tag-3-prefix-foobar-nestedfoobar-suffix', 'tag-4-prefix-foobar-nestedfoobara-suffix', 'tag-5-prefix-foobar-nestedfoobar-suffix']
    });
    Post.documents.update(this.postId, {
      $unset: {
        'nested.2.body': ''
      }
    }, expect((function(_this) {
      return function(error, res) {
        test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
        return test.isTrue(res);
      };
    })(this)));
    return Meteor.setTimeout(expect(), WAIT_TIME);
  }, function(test, expect) {
    this.person1 = Person.documents.findOne(this.person1Id, {
      transform: null
    });
    this.person2 = Person.documents.findOne(this.person2Id, {
      transform: null
    });
    this.person3 = Person.documents.findOne(this.person3Id, {
      transform: null
    });
    test.equal(this.person1, {
      _id: this.person1Id,
      _schema: '1.0.0',
      username: 'person1b',
      displayName: 'Person 1',
      field1: 'Field 1 - 1a',
      field2: 'Field 1 - 2a',
      posts: [
        {
          _id: this.postId,
          subdocument: {
            body: 'SubdocumentFooBarZ'
          },
          nested: [
            {
              body: 'NestedFooBarZ'
            }, {
              body: 'NestedFooBar'
            }, {}, {
              body: null
            }, {
              body: 'NestedFooBarA'
            }, {
              body: 'NestedFooBar'
            }
          ],
          body: 'FooBar'
        }
      ],
      count: 1
    });
    test.equal(this.person2, {
      _id: this.person2Id,
      _schema: '1.0.0',
      username: 'person2b',
      displayName: 'Person 2',
      field1: 'Field 2 - 1b',
      field2: 'Field 2 - 2b',
      subdocumentsPosts: [
        {
          _id: this.postId,
          subdocument: {
            body: 'SubdocumentFooBarZ'
          },
          nested: [
            {
              body: 'NestedFooBarZ'
            }, {
              body: 'NestedFooBar'
            }, {}, {
              body: null
            }, {
              body: 'NestedFooBarA'
            }, {
              body: 'NestedFooBar'
            }
          ],
          body: 'FooBar'
        }
      ],
      subdocumentPosts: [
        {
          _id: this.postId,
          subdocument: {
            body: 'SubdocumentFooBarZ'
          },
          nested: [
            {
              body: 'NestedFooBarZ'
            }, {
              body: 'NestedFooBar'
            }, {}, {
              body: null
            }, {
              body: 'NestedFooBarA'
            }, {
              body: 'NestedFooBar'
            }
          ],
          body: 'FooBar'
        }
      ],
      nestedPosts: [
        {
          _id: this.postId,
          subdocument: {
            body: 'SubdocumentFooBarZ'
          },
          nested: [
            {
              body: 'NestedFooBarZ'
            }, {
              body: 'NestedFooBar'
            }, {}, {
              body: null
            }, {
              body: 'NestedFooBarA'
            }, {
              body: 'NestedFooBar'
            }
          ],
          body: 'FooBar'
        }
      ],
      count: 3
    });
    test.equal(this.person3, {
      _id: this.person3Id,
      _schema: '1.0.0',
      username: 'person3b',
      displayName: 'Person 3',
      field1: 'Field 3 - 1',
      field2: 'Field 3 - 2',
      subdocumentsPosts: [
        {
          _id: this.postId,
          subdocument: {
            body: 'SubdocumentFooBarZ'
          },
          nested: [
            {
              body: 'NestedFooBarZ'
            }, {
              body: 'NestedFooBar'
            }, {}, {
              body: null
            }, {
              body: 'NestedFooBarA'
            }, {
              body: 'NestedFooBar'
            }
          ],
          body: 'FooBar'
        }
      ],
      nestedPosts: [
        {
          _id: this.postId,
          subdocument: {
            body: 'SubdocumentFooBarZ'
          },
          nested: [
            {
              body: 'NestedFooBarZ'
            }, {
              body: 'NestedFooBar'
            }, {}, {
              body: null
            }, {
              body: 'NestedFooBarA'
            }, {
              body: 'NestedFooBar'
            }
          ],
          body: 'FooBar'
        }
      ],
      count: 2
    });
    this.post = Post.documents.findOne(this.postId, {
      transform: null
    });
    test.equal(this.post, {
      _id: this.postId,
      _schema: '1.0.0',
      author: {
        _id: this.person1._id,
        username: this.person1.username,
        displayName: this.person1.displayName,
        field1: this.person1.field1,
        field2: this.person1.field2
      },
      subscribers: [
        {
          _id: this.person2._id
        }, {
          _id: this.person2._id
        }, {
          _id: this.person3._id
        }
      ],
      reviewers: [
        {
          _id: this.person2._id,
          username: this.person2.username
        }, {
          _id: this.person3._id,
          username: this.person3.username
        }, {
          _id: this.person3._id,
          username: this.person3.username
        }
      ],
      subdocument: {
        person: {
          _id: this.person2._id,
          username: this.person2.username,
          displayName: this.person2.displayName,
          field1: this.person2.field1,
          field2: this.person2.field2
        },
        persons: [
          {
            _id: this.person2._id,
            username: this.person2.username,
            displayName: this.person2.displayName,
            field1: this.person2.field1,
            field2: this.person2.field2
          }, {
            _id: this.person2._id,
            username: this.person2.username,
            displayName: this.person2.displayName,
            field1: this.person2.field1,
            field2: this.person2.field2
          }, {
            _id: this.person3._id,
            username: this.person3.username,
            displayName: this.person3.displayName,
            field1: this.person3.field1,
            field2: this.person3.field2
          }, {
            _id: this.person3._id,
            username: this.person3.username,
            displayName: this.person3.displayName,
            field1: this.person3.field1,
            field2: this.person3.field2
          }
        ],
        slug: 'subdocument-prefix-foobar-subdocumentfoobarz-suffix',
        body: 'SubdocumentFooBarZ'
      },
      nested: [
        {
          required: {
            _id: this.person2._id,
            username: this.person2.username,
            displayName: this.person2.displayName,
            field1: this.person2.field1,
            field2: this.person2.field2
          },
          optional: {
            _id: this.person3._id,
            username: this.person3.username
          },
          slug: 'nested-prefix-foobar-nestedfoobarz-suffix',
          body: 'NestedFooBarZ'
        }, {
          required: {
            _id: this.person2._id,
            username: this.person2.username,
            displayName: this.person2.displayName,
            field1: this.person2.field1,
            field2: this.person2.field2
          },
          optional: {
            _id: this.person3._id,
            username: this.person3.username
          },
          slug: 'nested-prefix-foobar-nestedfoobar-suffix',
          body: 'NestedFooBar'
        }, {
          required: {
            _id: this.person3._id,
            username: this.person3.username,
            displayName: this.person3.displayName,
            field1: this.person3.field1,
            field2: this.person3.field2
          },
          optional: {
            _id: this.person2._id,
            username: this.person2.username
          }
        }, {
          required: {
            _id: this.person3._id,
            username: this.person3.username,
            displayName: this.person3.displayName,
            field1: this.person3.field1,
            field2: this.person3.field2
          },
          optional: {
            _id: this.person2._id,
            username: this.person2.username
          },
          slug: null,
          body: null
        }, {
          required: {
            _id: this.person2._id,
            username: this.person2.username,
            displayName: this.person2.displayName,
            field1: this.person2.field1,
            field2: this.person2.field2
          },
          optional: {
            _id: this.person2._id,
            username: this.person2.username
          },
          slug: 'nested-prefix-foobar-nestedfoobara-suffix',
          body: 'NestedFooBarA'
        }, {
          required: {
            _id: this.person3._id,
            username: this.person3.username,
            displayName: this.person3.displayName,
            field1: this.person3.field1,
            field2: this.person3.field2
          },
          optional: {
            _id: this.person3._id,
            username: this.person3.username
          },
          slug: 'nested-prefix-foobar-nestedfoobar-suffix',
          body: 'NestedFooBar'
        }
      ],
      body: 'FooBar',
      slug: 'prefix-foobar-subdocumentfoobarz-suffix',
      tags: ['tag-0-prefix-foobar-subdocumentfoobarz-suffix', 'tag-1-prefix-foobar-nestedfoobarz-suffix', 'tag-2-prefix-foobar-nestedfoobar-suffix', 'tag-3-prefix-foobar-nestedfoobara-suffix', 'tag-4-prefix-foobar-nestedfoobar-suffix']
    });
    Post.documents.update(this.postId, {
      $set: {
        body: 'FooBarZ'
      }
    }, expect((function(_this) {
      return function(error, res) {
        test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
        return test.isTrue(res);
      };
    })(this)));
    return Meteor.setTimeout(expect(), WAIT_TIME);
  }, function(test, expect) {
    this.person1 = Person.documents.findOne(this.person1Id, {
      transform: null
    });
    this.person2 = Person.documents.findOne(this.person2Id, {
      transform: null
    });
    this.person3 = Person.documents.findOne(this.person3Id, {
      transform: null
    });
    test.equal(this.person1, {
      _id: this.person1Id,
      _schema: '1.0.0',
      username: 'person1b',
      displayName: 'Person 1',
      field1: 'Field 1 - 1a',
      field2: 'Field 1 - 2a',
      posts: [
        {
          _id: this.postId,
          subdocument: {
            body: 'SubdocumentFooBarZ'
          },
          nested: [
            {
              body: 'NestedFooBarZ'
            }, {
              body: 'NestedFooBar'
            }, {}, {
              body: null
            }, {
              body: 'NestedFooBarA'
            }, {
              body: 'NestedFooBar'
            }
          ],
          body: 'FooBarZ'
        }
      ],
      count: 1
    });
    test.equal(this.person2, {
      _id: this.person2Id,
      _schema: '1.0.0',
      username: 'person2b',
      displayName: 'Person 2',
      field1: 'Field 2 - 1b',
      field2: 'Field 2 - 2b',
      subdocumentPosts: [
        {
          _id: this.postId,
          subdocument: {
            body: 'SubdocumentFooBarZ'
          },
          nested: [
            {
              body: 'NestedFooBarZ'
            }, {
              body: 'NestedFooBar'
            }, {}, {
              body: null
            }, {
              body: 'NestedFooBarA'
            }, {
              body: 'NestedFooBar'
            }
          ],
          body: 'FooBarZ'
        }
      ],
      subdocumentsPosts: [
        {
          _id: this.postId,
          subdocument: {
            body: 'SubdocumentFooBarZ'
          },
          nested: [
            {
              body: 'NestedFooBarZ'
            }, {
              body: 'NestedFooBar'
            }, {}, {
              body: null
            }, {
              body: 'NestedFooBarA'
            }, {
              body: 'NestedFooBar'
            }
          ],
          body: 'FooBarZ'
        }
      ],
      nestedPosts: [
        {
          _id: this.postId,
          subdocument: {
            body: 'SubdocumentFooBarZ'
          },
          nested: [
            {
              body: 'NestedFooBarZ'
            }, {
              body: 'NestedFooBar'
            }, {}, {
              body: null
            }, {
              body: 'NestedFooBarA'
            }, {
              body: 'NestedFooBar'
            }
          ],
          body: 'FooBarZ'
        }
      ],
      count: 3
    });
    test.equal(this.person3, {
      _id: this.person3Id,
      _schema: '1.0.0',
      username: 'person3b',
      displayName: 'Person 3',
      field1: 'Field 3 - 1',
      field2: 'Field 3 - 2',
      subdocumentsPosts: [
        {
          _id: this.postId,
          subdocument: {
            body: 'SubdocumentFooBarZ'
          },
          nested: [
            {
              body: 'NestedFooBarZ'
            }, {
              body: 'NestedFooBar'
            }, {}, {
              body: null
            }, {
              body: 'NestedFooBarA'
            }, {
              body: 'NestedFooBar'
            }
          ],
          body: 'FooBarZ'
        }
      ],
      nestedPosts: [
        {
          _id: this.postId,
          subdocument: {
            body: 'SubdocumentFooBarZ'
          },
          nested: [
            {
              body: 'NestedFooBarZ'
            }, {
              body: 'NestedFooBar'
            }, {}, {
              body: null
            }, {
              body: 'NestedFooBarA'
            }, {
              body: 'NestedFooBar'
            }
          ],
          body: 'FooBarZ'
        }
      ],
      count: 2
    });
    this.post = Post.documents.findOne(this.postId, {
      transform: null
    });
    test.equal(this.post, {
      _id: this.postId,
      _schema: '1.0.0',
      author: {
        _id: this.person1._id,
        username: this.person1.username,
        displayName: this.person1.displayName,
        field1: this.person1.field1,
        field2: this.person1.field2
      },
      subscribers: [
        {
          _id: this.person2._id
        }, {
          _id: this.person2._id
        }, {
          _id: this.person3._id
        }
      ],
      reviewers: [
        {
          _id: this.person2._id,
          username: this.person2.username
        }, {
          _id: this.person3._id,
          username: this.person3.username
        }, {
          _id: this.person3._id,
          username: this.person3.username
        }
      ],
      subdocument: {
        person: {
          _id: this.person2._id,
          username: this.person2.username,
          displayName: this.person2.displayName,
          field1: this.person2.field1,
          field2: this.person2.field2
        },
        persons: [
          {
            _id: this.person2._id,
            username: this.person2.username,
            displayName: this.person2.displayName,
            field1: this.person2.field1,
            field2: this.person2.field2
          }, {
            _id: this.person2._id,
            username: this.person2.username,
            displayName: this.person2.displayName,
            field1: this.person2.field1,
            field2: this.person2.field2
          }, {
            _id: this.person3._id,
            username: this.person3.username,
            displayName: this.person3.displayName,
            field1: this.person3.field1,
            field2: this.person3.field2
          }, {
            _id: this.person3._id,
            username: this.person3.username,
            displayName: this.person3.displayName,
            field1: this.person3.field1,
            field2: this.person3.field2
          }
        ],
        slug: 'subdocument-prefix-foobarz-subdocumentfoobarz-suffix',
        body: 'SubdocumentFooBarZ'
      },
      nested: [
        {
          required: {
            _id: this.person2._id,
            username: this.person2.username,
            displayName: this.person2.displayName,
            field1: this.person2.field1,
            field2: this.person2.field2
          },
          optional: {
            _id: this.person3._id,
            username: this.person3.username
          },
          slug: 'nested-prefix-foobarz-nestedfoobarz-suffix',
          body: 'NestedFooBarZ'
        }, {
          required: {
            _id: this.person2._id,
            username: this.person2.username,
            displayName: this.person2.displayName,
            field1: this.person2.field1,
            field2: this.person2.field2
          },
          optional: {
            _id: this.person3._id,
            username: this.person3.username
          },
          slug: 'nested-prefix-foobarz-nestedfoobar-suffix',
          body: 'NestedFooBar'
        }, {
          required: {
            _id: this.person3._id,
            username: this.person3.username,
            displayName: this.person3.displayName,
            field1: this.person3.field1,
            field2: this.person3.field2
          },
          optional: {
            _id: this.person2._id,
            username: this.person2.username
          }
        }, {
          required: {
            _id: this.person3._id,
            username: this.person3.username,
            displayName: this.person3.displayName,
            field1: this.person3.field1,
            field2: this.person3.field2
          },
          optional: {
            _id: this.person2._id,
            username: this.person2.username
          },
          slug: null,
          body: null
        }, {
          required: {
            _id: this.person2._id,
            username: this.person2.username,
            displayName: this.person2.displayName,
            field1: this.person2.field1,
            field2: this.person2.field2
          },
          optional: {
            _id: this.person2._id,
            username: this.person2.username
          },
          slug: 'nested-prefix-foobarz-nestedfoobara-suffix',
          body: 'NestedFooBarA'
        }, {
          required: {
            _id: this.person3._id,
            username: this.person3.username,
            displayName: this.person3.displayName,
            field1: this.person3.field1,
            field2: this.person3.field2
          },
          optional: {
            _id: this.person3._id,
            username: this.person3.username
          },
          slug: 'nested-prefix-foobarz-nestedfoobar-suffix',
          body: 'NestedFooBar'
        }
      ],
      body: 'FooBarZ',
      slug: 'prefix-foobarz-subdocumentfoobarz-suffix',
      tags: ['tag-0-prefix-foobarz-subdocumentfoobarz-suffix', 'tag-1-prefix-foobarz-nestedfoobarz-suffix', 'tag-2-prefix-foobarz-nestedfoobar-suffix', 'tag-3-prefix-foobarz-nestedfoobara-suffix', 'tag-4-prefix-foobarz-nestedfoobar-suffix']
    });
    Post.documents.update(this.postId, {
      $push: {
        nested: {
          required: {
            _id: this.person2._id
          },
          optional: {
            _id: this.person3._id
          },
          body: 'NewFooBar'
        }
      }
    }, expect((function(_this) {
      return function(error, res) {
        test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
        return test.isTrue(res);
      };
    })(this)));
    return Meteor.setTimeout(expect(), WAIT_TIME);
  }, function(test, expect) {
    this.person1 = Person.documents.findOne(this.person1Id, {
      transform: null
    });
    this.person2 = Person.documents.findOne(this.person2Id, {
      transform: null
    });
    this.person3 = Person.documents.findOne(this.person3Id, {
      transform: null
    });
    test.equal(this.person1, {
      _id: this.person1Id,
      _schema: '1.0.0',
      username: 'person1b',
      displayName: 'Person 1',
      field1: 'Field 1 - 1a',
      field2: 'Field 1 - 2a',
      posts: [
        {
          _id: this.postId,
          subdocument: {
            body: 'SubdocumentFooBarZ'
          },
          nested: [
            {
              body: 'NestedFooBarZ'
            }, {
              body: 'NestedFooBar'
            }, {}, {
              body: null
            }, {
              body: 'NestedFooBarA'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NewFooBar'
            }
          ],
          body: 'FooBarZ'
        }
      ],
      count: 1
    });
    test.equal(this.person2, {
      _id: this.person2Id,
      _schema: '1.0.0',
      username: 'person2b',
      displayName: 'Person 2',
      field1: 'Field 2 - 1b',
      field2: 'Field 2 - 2b',
      subdocumentPosts: [
        {
          _id: this.postId,
          subdocument: {
            body: 'SubdocumentFooBarZ'
          },
          nested: [
            {
              body: 'NestedFooBarZ'
            }, {
              body: 'NestedFooBar'
            }, {}, {
              body: null
            }, {
              body: 'NestedFooBarA'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NewFooBar'
            }
          ],
          body: 'FooBarZ'
        }
      ],
      subdocumentsPosts: [
        {
          _id: this.postId,
          subdocument: {
            body: 'SubdocumentFooBarZ'
          },
          nested: [
            {
              body: 'NestedFooBarZ'
            }, {
              body: 'NestedFooBar'
            }, {}, {
              body: null
            }, {
              body: 'NestedFooBarA'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NewFooBar'
            }
          ],
          body: 'FooBarZ'
        }
      ],
      nestedPosts: [
        {
          _id: this.postId,
          subdocument: {
            body: 'SubdocumentFooBarZ'
          },
          nested: [
            {
              body: 'NestedFooBarZ'
            }, {
              body: 'NestedFooBar'
            }, {}, {
              body: null
            }, {
              body: 'NestedFooBarA'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NewFooBar'
            }
          ],
          body: 'FooBarZ'
        }
      ],
      count: 3
    });
    test.equal(this.person3, {
      _id: this.person3Id,
      _schema: '1.0.0',
      username: 'person3b',
      displayName: 'Person 3',
      field1: 'Field 3 - 1',
      field2: 'Field 3 - 2',
      subdocumentsPosts: [
        {
          _id: this.postId,
          subdocument: {
            body: 'SubdocumentFooBarZ'
          },
          nested: [
            {
              body: 'NestedFooBarZ'
            }, {
              body: 'NestedFooBar'
            }, {}, {
              body: null
            }, {
              body: 'NestedFooBarA'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NewFooBar'
            }
          ],
          body: 'FooBarZ'
        }
      ],
      nestedPosts: [
        {
          _id: this.postId,
          subdocument: {
            body: 'SubdocumentFooBarZ'
          },
          nested: [
            {
              body: 'NestedFooBarZ'
            }, {
              body: 'NestedFooBar'
            }, {}, {
              body: null
            }, {
              body: 'NestedFooBarA'
            }, {
              body: 'NestedFooBar'
            }, {
              body: 'NewFooBar'
            }
          ],
          body: 'FooBarZ'
        }
      ],
      count: 2
    });
    this.post = Post.documents.findOne(this.postId, {
      transform: null
    });
    test.equal(this.post, {
      _id: this.postId,
      _schema: '1.0.0',
      author: {
        _id: this.person1._id,
        username: this.person1.username,
        displayName: this.person1.displayName,
        field1: this.person1.field1,
        field2: this.person1.field2
      },
      subscribers: [
        {
          _id: this.person2._id
        }, {
          _id: this.person2._id
        }, {
          _id: this.person3._id
        }
      ],
      reviewers: [
        {
          _id: this.person2._id,
          username: this.person2.username
        }, {
          _id: this.person3._id,
          username: this.person3.username
        }, {
          _id: this.person3._id,
          username: this.person3.username
        }
      ],
      subdocument: {
        person: {
          _id: this.person2._id,
          username: this.person2.username,
          displayName: this.person2.displayName,
          field1: this.person2.field1,
          field2: this.person2.field2
        },
        persons: [
          {
            _id: this.person2._id,
            username: this.person2.username,
            displayName: this.person2.displayName,
            field1: this.person2.field1,
            field2: this.person2.field2
          }, {
            _id: this.person2._id,
            username: this.person2.username,
            displayName: this.person2.displayName,
            field1: this.person2.field1,
            field2: this.person2.field2
          }, {
            _id: this.person3._id,
            username: this.person3.username,
            displayName: this.person3.displayName,
            field1: this.person3.field1,
            field2: this.person3.field2
          }, {
            _id: this.person3._id,
            username: this.person3.username,
            displayName: this.person3.displayName,
            field1: this.person3.field1,
            field2: this.person3.field2
          }
        ],
        slug: 'subdocument-prefix-foobarz-subdocumentfoobarz-suffix',
        body: 'SubdocumentFooBarZ'
      },
      nested: [
        {
          required: {
            _id: this.person2._id,
            username: this.person2.username,
            displayName: this.person2.displayName,
            field1: this.person2.field1,
            field2: this.person2.field2
          },
          optional: {
            _id: this.person3._id,
            username: this.person3.username
          },
          slug: 'nested-prefix-foobarz-nestedfoobarz-suffix',
          body: 'NestedFooBarZ'
        }, {
          required: {
            _id: this.person2._id,
            username: this.person2.username,
            displayName: this.person2.displayName,
            field1: this.person2.field1,
            field2: this.person2.field2
          },
          optional: {
            _id: this.person3._id,
            username: this.person3.username
          },
          slug: 'nested-prefix-foobarz-nestedfoobar-suffix',
          body: 'NestedFooBar'
        }, {
          required: {
            _id: this.person3._id,
            username: this.person3.username,
            displayName: this.person3.displayName,
            field1: this.person3.field1,
            field2: this.person3.field2
          },
          optional: {
            _id: this.person2._id,
            username: this.person2.username
          }
        }, {
          required: {
            _id: this.person3._id,
            username: this.person3.username,
            displayName: this.person3.displayName,
            field1: this.person3.field1,
            field2: this.person3.field2
          },
          optional: {
            _id: this.person2._id,
            username: this.person2.username
          },
          slug: null,
          body: null
        }, {
          required: {
            _id: this.person2._id,
            username: this.person2.username,
            displayName: this.person2.displayName,
            field1: this.person2.field1,
            field2: this.person2.field2
          },
          optional: {
            _id: this.person2._id,
            username: this.person2.username
          },
          slug: 'nested-prefix-foobarz-nestedfoobara-suffix',
          body: 'NestedFooBarA'
        }, {
          required: {
            _id: this.person3._id,
            username: this.person3.username,
            displayName: this.person3.displayName,
            field1: this.person3.field1,
            field2: this.person3.field2
          },
          optional: {
            _id: this.person3._id,
            username: this.person3.username
          },
          slug: 'nested-prefix-foobarz-nestedfoobar-suffix',
          body: 'NestedFooBar'
        }, {
          required: {
            _id: this.person2._id,
            username: this.person2.username,
            displayName: this.person2.displayName,
            field1: this.person2.field1,
            field2: this.person2.field2
          },
          optional: {
            _id: this.person3._id,
            username: this.person3.username
          },
          slug: 'nested-prefix-foobarz-newfoobar-suffix',
          body: 'NewFooBar'
        }
      ],
      body: 'FooBarZ',
      slug: 'prefix-foobarz-subdocumentfoobarz-suffix',
      tags: ['tag-0-prefix-foobarz-subdocumentfoobarz-suffix', 'tag-1-prefix-foobarz-nestedfoobarz-suffix', 'tag-2-prefix-foobarz-nestedfoobar-suffix', 'tag-3-prefix-foobarz-nestedfoobara-suffix', 'tag-4-prefix-foobarz-nestedfoobar-suffix', 'tag-5-prefix-foobarz-newfoobar-suffix']
    });
    Person.documents.remove(this.person2Id, expect((function(_this) {
      return function(error) {
        return test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
      };
    })(this)));
    return Meteor.setTimeout(expect(), WAIT_TIME);
  }, function(test, expect) {
    this.person1 = Person.documents.findOne(this.person1Id, {
      transform: null
    });
    this.person3 = Person.documents.findOne(this.person3Id, {
      transform: null
    });
    test.equal(this.person1, {
      _id: this.person1Id,
      _schema: '1.0.0',
      username: 'person1b',
      displayName: 'Person 1',
      field1: 'Field 1 - 1a',
      field2: 'Field 1 - 2a',
      posts: [
        {
          _id: this.postId,
          subdocument: {
            body: 'SubdocumentFooBarZ'
          },
          nested: [
            {}, {
              body: null
            }, {
              body: 'NestedFooBar'
            }
          ],
          body: 'FooBarZ'
        }
      ],
      count: 1
    });
    test.equal(this.person3, {
      _id: this.person3Id,
      _schema: '1.0.0',
      username: 'person3b',
      displayName: 'Person 3',
      field1: 'Field 3 - 1',
      field2: 'Field 3 - 2',
      subdocumentsPosts: [
        {
          _id: this.postId,
          subdocument: {
            body: 'SubdocumentFooBarZ'
          },
          nested: [
            {}, {
              body: null
            }, {
              body: 'NestedFooBar'
            }
          ],
          body: 'FooBarZ'
        }
      ],
      nestedPosts: [
        {
          _id: this.postId,
          subdocument: {
            body: 'SubdocumentFooBarZ'
          },
          nested: [
            {}, {
              body: null
            }, {
              body: 'NestedFooBar'
            }
          ],
          body: 'FooBarZ'
        }
      ],
      count: 2
    });
    this.post = Post.documents.findOne(this.postId, {
      transform: null
    });
    test.equal(this.post, {
      _id: this.postId,
      _schema: '1.0.0',
      author: {
        _id: this.person1._id,
        username: this.person1.username,
        displayName: this.person1.displayName,
        field1: this.person1.field1,
        field2: this.person1.field2
      },
      subscribers: [
        {
          _id: this.person3._id
        }
      ],
      reviewers: [
        {
          _id: this.person3._id,
          username: this.person3.username
        }, {
          _id: this.person3._id,
          username: this.person3.username
        }
      ],
      subdocument: {
        person: null,
        persons: [
          {
            _id: this.person3._id,
            username: this.person3.username,
            displayName: this.person3.displayName,
            field1: this.person3.field1,
            field2: this.person3.field2
          }, {
            _id: this.person3._id,
            username: this.person3.username,
            displayName: this.person3.displayName,
            field1: this.person3.field1,
            field2: this.person3.field2
          }
        ],
        slug: 'subdocument-prefix-foobarz-subdocumentfoobarz-suffix',
        body: 'SubdocumentFooBarZ'
      },
      nested: [
        {
          required: {
            _id: this.person3._id,
            username: this.person3.username,
            displayName: this.person3.displayName,
            field1: this.person3.field1,
            field2: this.person3.field2
          },
          optional: null
        }, {
          required: {
            _id: this.person3._id,
            username: this.person3.username,
            displayName: this.person3.displayName,
            field1: this.person3.field1,
            field2: this.person3.field2
          },
          optional: null,
          slug: null,
          body: null
        }, {
          required: {
            _id: this.person3._id,
            username: this.person3.username,
            displayName: this.person3.displayName,
            field1: this.person3.field1,
            field2: this.person3.field2
          },
          optional: {
            _id: this.person3._id,
            username: this.person3.username
          },
          slug: 'nested-prefix-foobarz-nestedfoobar-suffix',
          body: 'NestedFooBar'
        }
      ],
      body: 'FooBarZ',
      slug: 'prefix-foobarz-subdocumentfoobarz-suffix',
      tags: ['tag-0-prefix-foobarz-subdocumentfoobarz-suffix', 'tag-1-prefix-foobarz-nestedfoobar-suffix']
    });
    Person.documents.remove(this.person3Id, expect((function(_this) {
      return function(error) {
        return test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
      };
    })(this)));
    return Meteor.setTimeout(expect(), WAIT_TIME);
  }, function(test, expect) {
    this.person1 = Person.documents.findOne(this.person1Id, {
      transform: null
    });
    test.equal(this.person1, {
      _id: this.person1Id,
      _schema: '1.0.0',
      username: 'person1b',
      displayName: 'Person 1',
      field1: 'Field 1 - 1a',
      field2: 'Field 1 - 2a',
      posts: [
        {
          _id: this.postId,
          subdocument: {
            body: 'SubdocumentFooBarZ'
          },
          nested: [],
          body: 'FooBarZ'
        }
      ],
      count: 1
    });
    this.post = Post.documents.findOne(this.postId, {
      transform: null
    });
    test.equal(this.post, {
      _id: this.postId,
      _schema: '1.0.0',
      author: {
        _id: this.person1._id,
        username: this.person1.username,
        displayName: this.person1.displayName,
        field1: this.person1.field1,
        field2: this.person1.field2
      },
      subscribers: [],
      reviewers: [],
      subdocument: {
        person: null,
        persons: [],
        slug: 'subdocument-prefix-foobarz-subdocumentfoobarz-suffix',
        body: 'SubdocumentFooBarZ'
      },
      nested: [],
      body: 'FooBarZ',
      slug: 'prefix-foobarz-subdocumentfoobarz-suffix',
      tags: ['tag-0-prefix-foobarz-subdocumentfoobarz-suffix']
    });
    Person.documents.remove(this.person1Id, expect((function(_this) {
      return function(error) {
        return test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
      };
    })(this)));
    return Meteor.setTimeout(expect(), WAIT_TIME);
  }, function(test, expect) {
    this.post = Post.documents.findOne(this.postId, {
      transform: null
    });
    return test.isFalse(this.post, this.post);
  }
]);

if (Meteor.isServer && Document.instances === 1) {
  testAsyncMulti('peerdb - exception while processing', [
    function(test, expect) {
      Log._intercept(4);
      IdentityGenerator.documents.insert({
        source: 'exception'
      }, expect((function(_this) {
        return function(error, identityGeneratorId) {
          test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
          test.isTrue(identityGeneratorId);
          return _this.identityGeneratorId = identityGeneratorId;
        };
      })(this)));
      return Meteor.setTimeout(expect(), WAIT_TIME);
    }, function(test, expect) {
      var i, intercepted, _i, _len, _results;
      intercepted = Log._intercepted();
      test.isTrue(intercepted.length === 3, intercepted);
      _results = [];
      for (_i = 0, _len = intercepted.length; _i < _len; _i++) {
        i = intercepted[_i];
        if (i.indexOf('PeerDB exception: Error: Test exception') !== -1) {
          i = EJSON.parse(i);
          test.equal(i.message, "PeerDB exception: Error: Test exception: [ { source: 'exception', _id: '" + this.identityGeneratorId + "' } ]");
          _results.push(test.equal(i.level, 'error'));
        } else if (i.indexOf('Error: Test exception') !== -1) {
          i = EJSON.parse(i);
          test.isTrue(i.message.indexOf('_GeneratedField.result') !== -1, i.message);
          _results.push(test.equal(i.level, 'error'));
        } else if (i.indexOf('defined as an array with selector') !== -1) {
          i = EJSON.parse(i);
          test.equal(i.message, "Generated field 'results' defined as an array with selector '" + this.identityGeneratorId + "' was updated with a non-array value: 'exception'");
          _results.push(test.equal(i.level, 'error'));
        } else {
          _results.push(test.fail({
            type: 'assert_never',
            message: i
          }));
        }
      }
      return _results;
    }
  ]);
}

testAsyncMulti('peerdb - instances', [
  function(test, expect) {
    testDefinition(test);
    Person.documents.insert({
      username: 'person1',
      displayName: 'Person 1'
    }, expect((function(_this) {
      return function(error, person1Id) {
        test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
        test.isTrue(person1Id);
        return _this.person1Id = person1Id;
      };
    })(this)));
    Person.documents.insert({
      username: 'person2',
      displayName: 'Person 2'
    }, expect((function(_this) {
      return function(error, person2Id) {
        test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
        test.isTrue(person2Id);
        return _this.person2Id = person2Id;
      };
    })(this)));
    Person.documents.insert({
      username: 'person3',
      displayName: 'Person 3'
    }, expect((function(_this) {
      return function(error, person3Id) {
        test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
        test.isTrue(person3Id);
        return _this.person3Id = person3Id;
      };
    })(this)));
    return Meteor.setTimeout(expect(), WAIT_TIME);
  }, function(test, expect) {
    this.person1 = Person.documents.findOne(this.person1Id);
    this.person2 = Person.documents.findOne(this.person2Id);
    this.person3 = Person.documents.findOne(this.person3Id);
    test.instanceOf(this.person1, Person);
    test.instanceOf(this.person2, Person);
    test.instanceOf(this.person3, Person);
    test.equal(plainObject(this.person1), {
      _id: this.person1Id,
      _schema: '1.0.0',
      username: 'person1',
      displayName: 'Person 1',
      count: 0
    });
    test.equal(plainObject(this.person2), {
      _id: this.person2Id,
      _schema: '1.0.0',
      username: 'person2',
      displayName: 'Person 2',
      count: 0
    });
    test.equal(plainObject(this.person3), {
      _id: this.person3Id,
      _schema: '1.0.0',
      username: 'person3',
      displayName: 'Person 3',
      count: 0
    });
    test.equal(this.person1.formatName(), 'person1-Person 1');
    test.equal(this.person2.formatName(), 'person2-Person 2');
    test.equal(this.person3.formatName(), 'person3-Person 3');
    Post.documents.insert({
      author: {
        _id: this.person1._id
      },
      subscribers: [
        {
          _id: this.person2._id
        }, {
          _id: this.person3._id
        }
      ],
      reviewers: [
        {
          _id: this.person2._id
        }, {
          _id: this.person3._id
        }
      ],
      subdocument: {
        person: {
          _id: this.person2._id
        },
        persons: [
          {
            _id: this.person2._id
          }, {
            _id: this.person3._id
          }
        ],
        body: 'SubdocumentFooBar'
      },
      nested: [
        {
          required: {
            _id: this.person2._id
          },
          optional: {
            _id: this.person3._id
          },
          body: 'NestedFooBar'
        }
      ],
      body: 'FooBar'
    }, expect((function(_this) {
      return function(error, postId) {
        test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
        test.isTrue(postId);
        return _this.postId = postId;
      };
    })(this)));
    return Meteor.setTimeout(expect(), WAIT_TIME);
  }, function(test, expect) {
    this.post = Post.documents.findOne(this.postId);
    test.instanceOf(this.post, Post);
    test.instanceOf(this.post.author, Person);
    test.instanceOf(this.post.subscribers[0], Person);
    test.instanceOf(this.post.subscribers[1], Person);
    test.instanceOf(this.post.reviewers[0], Person);
    test.instanceOf(this.post.reviewers[1], Person);
    test.instanceOf(this.post.subdocument.person, Person);
    test.instanceOf(this.post.subdocument.persons[0], Person);
    test.instanceOf(this.post.subdocument.persons[1], Person);
    test.instanceOf(this.post.nested[0].required, Person);
    test.instanceOf(this.post.nested[0].optional, Person);
    test.equal(this.post.author.formatName(), "" + this.person1.username + "-" + this.person1.displayName);
    test.equal(plainObject(this.post), {
      _id: this.postId,
      _schema: '1.0.0',
      author: {
        _id: this.person1._id,
        username: this.person1.username,
        displayName: this.person1.displayName
      },
      subscribers: [
        {
          _id: this.person2._id
        }, {
          _id: this.person3._id
        }
      ],
      reviewers: [
        {
          _id: this.person2._id,
          username: this.person2.username
        }, {
          _id: this.person3._id,
          username: this.person3.username
        }
      ],
      subdocument: {
        person: {
          _id: this.person2._id,
          username: this.person2.username,
          displayName: this.person2.displayName
        },
        persons: [
          {
            _id: this.person2._id,
            username: this.person2.username,
            displayName: this.person2.displayName
          }, {
            _id: this.person3._id,
            username: this.person3.username,
            displayName: this.person3.displayName
          }
        ],
        slug: 'subdocument-prefix-foobar-subdocumentfoobar-suffix',
        body: 'SubdocumentFooBar'
      },
      nested: [
        {
          required: {
            _id: this.person2._id,
            username: this.person2.username,
            displayName: this.person2.displayName
          },
          optional: {
            _id: this.person3._id,
            username: this.person3.username
          },
          slug: 'nested-prefix-foobar-nestedfoobar-suffix',
          body: 'NestedFooBar'
        }
      ],
      body: 'FooBar',
      slug: 'prefix-foobar-subdocumentfoobar-suffix',
      tags: ['tag-0-prefix-foobar-subdocumentfoobar-suffix', 'tag-1-prefix-foobar-nestedfoobar-suffix']
    });
    SpecialPost.documents.insert({
      author: {
        _id: this.person1._id
      },
      subscribers: [
        {
          _id: this.person2._id
        }, {
          _id: this.person3._id
        }
      ],
      reviewers: [
        {
          _id: this.person2._id
        }, {
          _id: this.person3._id
        }
      ],
      subdocument: {
        person: {
          _id: this.person2._id
        },
        persons: [
          {
            _id: this.person2._id
          }, {
            _id: this.person3._id
          }
        ],
        body: 'SubdocumentFooBar'
      },
      nested: [
        {
          required: {
            _id: this.person2._id
          },
          optional: {
            _id: this.person3._id
          },
          body: 'NestedFooBar'
        }
      ],
      body: 'FooBar',
      special: {
        _id: this.person1._id
      }
    }, expect((function(_this) {
      return function(error, postId) {
        test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
        test.isTrue(postId);
        return _this.postId = postId;
      };
    })(this)));
    return Meteor.setTimeout(expect(), WAIT_TIME);
  }, function(test, expect) {
    this.post = SpecialPost.documents.findOne(this.postId);
    test.instanceOf(this.post, SpecialPost);
    test.instanceOf(this.post.author, Person);
    test.instanceOf(this.post.subscribers[0], Person);
    test.instanceOf(this.post.subscribers[1], Person);
    test.instanceOf(this.post.reviewers[0], Person);
    test.instanceOf(this.post.reviewers[1], Person);
    test.instanceOf(this.post.subdocument.person, Person);
    test.instanceOf(this.post.subdocument.persons[0], Person);
    test.instanceOf(this.post.subdocument.persons[1], Person);
    test.instanceOf(this.post.nested[0].required, Person);
    test.instanceOf(this.post.nested[0].optional, Person);
    test.instanceOf(this.post.special, Person);
    test.equal(this.post.author.formatName(), "" + this.person1.username + "-" + this.person1.displayName);
    test.equal(plainObject(this.post), {
      _id: this.postId,
      _schema: '1.0.0',
      author: {
        _id: this.person1._id,
        username: this.person1.username,
        displayName: this.person1.displayName
      },
      subscribers: [
        {
          _id: this.person2._id
        }, {
          _id: this.person3._id
        }
      ],
      reviewers: [
        {
          _id: this.person2._id,
          username: this.person2.username
        }, {
          _id: this.person3._id,
          username: this.person3.username
        }
      ],
      subdocument: {
        person: {
          _id: this.person2._id,
          username: this.person2.username,
          displayName: this.person2.displayName
        },
        persons: [
          {
            _id: this.person2._id,
            username: this.person2.username,
            displayName: this.person2.displayName
          }, {
            _id: this.person3._id,
            username: this.person3.username,
            displayName: this.person3.displayName
          }
        ],
        slug: 'subdocument-prefix-foobar-subdocumentfoobar-suffix',
        body: 'SubdocumentFooBar'
      },
      nested: [
        {
          required: {
            _id: this.person2._id,
            username: this.person2.username,
            displayName: this.person2.displayName
          },
          optional: {
            _id: this.person3._id,
            username: this.person3.username
          },
          slug: 'nested-prefix-foobar-nestedfoobar-suffix',
          body: 'NestedFooBar'
        }
      ],
      body: 'FooBar',
      slug: 'prefix-foobar-subdocumentfoobar-suffix',
      tags: ['tag-0-prefix-foobar-subdocumentfoobar-suffix', 'tag-1-prefix-foobar-nestedfoobar-suffix'],
      special: {
        _id: this.person1._id
      }
    });
    this.username = Random.id();
    if (Meteor.isServer) {
      return this.userId = Accounts.createUser({
        username: this.username,
        password: 'test'
      });
    } else {
      return Accounts.createUser({
        username: this.username,
        password: 'test'
      }, expect((function(_this) {
        return function(error) {
          test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
          if (!error) {
            return _this.userId = Meteor.userId();
          }
        };
      })(this)));
    }
  }, function(test, expect) {
    this.user = User.documents.findOne(this.userId);
    test.instanceOf(this.user, User);
    return test.equal(this.user.username, this.username);
  }
]);

Tinytest.add('peerdb - bad instances', function(test) {
  var document, _i, _len, _ref1;
  _ref1 = Document.list;
  for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
    document = _ref1[_i];
    test.isTrue(new document);
  }
  test.isTrue(new Post({
    author: {
      _id: Random.id(),
      username: 'Foobar'
    }
  }));
  test.throws(function() {
    return new Post({
      author: [
        {
          _id: Random.id(),
          username: 'Foobar'
        }
      ]
    });
  }, /Document does not match schema, not a plain object/);
  test.throws(function() {
    return new Post({
      subscribers: [Random.id()]
    });
  }, /Document does not match schema, not a plain object/);
  test.throws(function() {
    return new Post({
      subdocument: []
    });
  }, /Document does not match schema, an unexpected array/);
  test.throws(function() {
    return new Post({
      subdocument: [
        {
          persons: []
        }
      ]
    });
  }, /Document does not match schema, an unexpected array/);
  test.throws(function() {
    return new Post({
      subdocument: [
        [
          {
            persons: []
          }
        ]
      ]
    });
  }, /Document does not match schema, an unexpected array/);
  test.throws(function() {
    return new Post({
      subdocument: {
        persons: [Random.id()]
      }
    });
  }, /Document does not match schema, not a plain object/);
  test.throws(function() {
    return new Post({
      nested: {
        _id: Random.id()
      }
    });
  }, /Document does not match schema, expected an array/);
  test.throws(function() {
    return new Post({
      nested: [
        {
          required: Random.id()
        }
      ]
    });
  }, /Document does not match schema, not a plain object/);
  test.throws(function() {
    return new Post({
      nested: {
        required: [
          {
            _id: Random.id()
          }
        ]
      }
    });
  }, /Document does not match schema, expected an array/);
  test.throws(function() {
    return new Post({
      nested: {
        required: {
          _id: Random.id()
        }
      }
    });
  }, /Document does not match schema, expected an array/);
  return test.throws(function() {
    return new Post({
      nested: [
        {
          required: [
            {
              _id: Random.id()
            }
          ]
        }
      ]
    });
  }, /Document does not match schema, not a plain object/);
});

if (Meteor.isServer && !Document.instanceDisabled) {
  testAsyncMulti('peerdb - update all', [
    function(test, expect) {
      testDefinition(test);
      Person.documents.insert({
        username: 'person1',
        displayName: 'Person 1'
      }, expect((function(_this) {
        return function(error, person1Id) {
          test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
          test.isTrue(person1Id);
          return _this.person1Id = person1Id;
        };
      })(this)));
      Person.documents.insert({
        username: 'person2',
        displayName: 'Person 2'
      }, expect((function(_this) {
        return function(error, person2Id) {
          test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
          test.isTrue(person2Id);
          return _this.person2Id = person2Id;
        };
      })(this)));
      Person.documents.insert({
        username: 'person3',
        displayName: 'Person 3'
      }, expect((function(_this) {
        return function(error, person3Id) {
          test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
          test.isTrue(person3Id);
          return _this.person3Id = person3Id;
        };
      })(this)));
      return Meteor.setTimeout(expect(), WAIT_TIME);
    }, function(test, expect) {
      this.person1 = Person.documents.findOne(this.person1Id);
      this.person2 = Person.documents.findOne(this.person2Id);
      this.person3 = Person.documents.findOne(this.person3Id);
      Post.documents.insert({
        author: {
          _id: this.person1._id,
          username: this.person1.username,
          displayName: 'wrong'
        },
        subscribers: [
          {
            _id: this.person2._id
          }, {
            _id: this.person3._id
          }
        ],
        reviewers: [
          {
            _id: this.person2._id
          }, {
            _id: this.person3._id
          }
        ],
        subdocument: {
          person: {
            _id: this.person2._id
          },
          persons: [
            {
              _id: this.person2._id
            }, {
              _id: this.person3._id
            }
          ],
          body: 'SubdocumentFooBar'
        },
        nested: [
          {
            required: {
              _id: this.person2._id
            },
            optional: {
              _id: this.person3._id
            },
            body: 'NestedFooBar'
          }
        ],
        body: 'FooBar'
      }, expect((function(_this) {
        return function(error, postId) {
          test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
          test.isTrue(postId);
          return _this.postId = postId;
        };
      })(this)));
      return Meteor.setTimeout(expect(), WAIT_TIME);
    }, function(test, expect) {
      this.post = Post.documents.findOne(this.postId, {
        transform: null
      });
      test.equal(this.post, {
        _id: this.postId,
        _schema: '1.0.0',
        author: {
          _id: this.person1._id,
          username: this.person1.username,
          displayName: this.person1.displayName
        },
        subscribers: [
          {
            _id: this.person2._id
          }, {
            _id: this.person3._id
          }
        ],
        reviewers: [
          {
            _id: this.person2._id,
            username: this.person2.username
          }, {
            _id: this.person3._id,
            username: this.person3.username
          }
        ],
        subdocument: {
          person: {
            _id: this.person2._id,
            username: this.person2.username,
            displayName: this.person2.displayName
          },
          persons: [
            {
              _id: this.person2._id,
              username: this.person2.username,
              displayName: this.person2.displayName
            }, {
              _id: this.person3._id,
              username: this.person3.username,
              displayName: this.person3.displayName
            }
          ],
          slug: 'subdocument-prefix-foobar-subdocumentfoobar-suffix',
          body: 'SubdocumentFooBar'
        },
        nested: [
          {
            required: {
              _id: this.person2._id,
              username: this.person2.username,
              displayName: this.person2.displayName
            },
            optional: {
              _id: this.person3._id,
              username: this.person3.username
            },
            slug: 'nested-prefix-foobar-nestedfoobar-suffix',
            body: 'NestedFooBar'
          }
        ],
        body: 'FooBar',
        slug: 'prefix-foobar-subdocumentfoobar-suffix',
        tags: ['tag-0-prefix-foobar-subdocumentfoobar-suffix', 'tag-1-prefix-foobar-nestedfoobar-suffix']
      });
      Post.documents.update(this.postId, {
        $set: {
          'author.username': 'wrong',
          'reviewers.0.username': 'wrong',
          'reviewers.1.username': 'wrong',
          'subdocument.person.username': 'wrong',
          'subdocument.persons.0.username': 'wrong',
          'subdocument.persons.1.username': 'wrong',
          'nested.0.required.username': 'wrong',
          'nested.0.optional.username': 'wrong',
          slug: 'wrong',
          tags: 'wrong'
        }
      }, expect((function(_this) {
        return function(error, res) {
          test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
          return test.isTrue(res);
        };
      })(this)));
      return Meteor.setTimeout(expect(), WAIT_TIME);
    }, function(test, expect) {
      this.post = Post.documents.findOne(this.postId, {
        transform: null
      });
      return test.equal(this.post, {
        _id: this.postId,
        _schema: '1.0.0',
        author: {
          _id: this.person1._id,
          username: this.person1.username,
          displayName: this.person1.displayName
        },
        subscribers: [
          {
            _id: this.person2._id
          }, {
            _id: this.person3._id
          }
        ],
        reviewers: [
          {
            _id: this.person2._id,
            username: this.person2.username
          }, {
            _id: this.person3._id,
            username: this.person3.username
          }
        ],
        subdocument: {
          person: {
            _id: this.person2._id,
            username: this.person2.username,
            displayName: this.person2.displayName
          },
          persons: [
            {
              _id: this.person2._id,
              username: this.person2.username,
              displayName: this.person2.displayName
            }, {
              _id: this.person3._id,
              username: this.person3.username,
              displayName: this.person3.displayName
            }
          ],
          slug: 'subdocument-prefix-foobar-subdocumentfoobar-suffix',
          body: 'SubdocumentFooBar'
        },
        nested: [
          {
            required: {
              _id: this.person2._id,
              username: this.person2.username,
              displayName: this.person2.displayName
            },
            optional: {
              _id: this.person3._id,
              username: this.person3.username
            },
            slug: 'nested-prefix-foobar-nestedfoobar-suffix',
            body: 'NestedFooBar'
          }
        ],
        body: 'FooBar',
        slug: 'wrong',
        tags: 'wrong'
      }, Document.updateAll());
    }, function(test, expect) {
      this.post = Post.documents.findOne(this.postId, {
        transform: null
      });
      return test.equal(this.post, {
        _id: this.postId,
        _schema: '1.0.0',
        author: {
          _id: this.person1._id,
          username: this.person1.username,
          displayName: this.person1.displayName
        },
        subscribers: [
          {
            _id: this.person2._id
          }, {
            _id: this.person3._id
          }
        ],
        reviewers: [
          {
            _id: this.person2._id,
            username: this.person2.username
          }, {
            _id: this.person3._id,
            username: this.person3.username
          }
        ],
        subdocument: {
          person: {
            _id: this.person2._id,
            username: this.person2.username,
            displayName: this.person2.displayName
          },
          persons: [
            {
              _id: this.person2._id,
              username: this.person2.username,
              displayName: this.person2.displayName
            }, {
              _id: this.person3._id,
              username: this.person3.username,
              displayName: this.person3.displayName
            }
          ],
          slug: 'subdocument-prefix-foobar-subdocumentfoobar-suffix',
          body: 'SubdocumentFooBar'
        },
        nested: [
          {
            required: {
              _id: this.person2._id,
              username: this.person2.username,
              displayName: this.person2.displayName
            },
            optional: {
              _id: this.person3._id,
              username: this.person3.username
            },
            slug: 'nested-prefix-foobar-nestedfoobar-suffix',
            body: 'NestedFooBar'
          }
        ],
        body: 'FooBar',
        slug: 'prefix-foobar-subdocumentfoobar-suffix',
        tags: ['tag-0-prefix-foobar-subdocumentfoobar-suffix', 'tag-1-prefix-foobar-nestedfoobar-suffix']
      });
    }
  ]);
}

testAsyncMulti('peerdb - reverse posts', [
  function(test, expect) {
    Person.documents.insert({
      username: 'person1',
      displayName: 'Person 1'
    }, expect((function(_this) {
      return function(error, person1Id) {
        test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
        test.isTrue(person1Id);
        return _this.person1Id = person1Id;
      };
    })(this)));
    Person.documents.insert({
      username: 'person2',
      displayName: 'Person 2'
    }, expect((function(_this) {
      return function(error, person2Id) {
        test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
        test.isTrue(person2Id);
        return _this.person2Id = person2Id;
      };
    })(this)));
    Person.documents.insert({
      username: 'person3',
      displayName: 'Person 3'
    }, expect((function(_this) {
      return function(error, person3Id) {
        test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
        test.isTrue(person3Id);
        return _this.person3Id = person3Id;
      };
    })(this)));
    return Meteor.setTimeout(expect(), WAIT_TIME);
  }, function(test, expect) {
    Post.documents.insert({
      author: {
        _id: this.person1Id
      },
      nested: [
        {
          required: {
            _id: this.person2Id
          },
          body: 'NestedFooBar1'
        }
      ],
      subdocument: {
        person: {
          _id: this.person1Id
        },
        persons: [
          {
            _id: this.person1Id
          }, {
            _id: this.person2Id
          }, {
            _id: this.person3Id
          }, {
            _id: this.person1Id
          }, {
            _id: this.person2Id
          }, {
            _id: this.person3Id
          }
        ],
        body: 'SubdocumentFooBar1'
      },
      body: 'FooBar1'
    }, expect((function(_this) {
      return function(error, postId) {
        test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
        test.isTrue(postId);
        return _this.postId1 = postId;
      };
    })(this)));
    Post.documents.insert({
      author: {
        _id: this.person1Id
      },
      nested: [
        {
          required: {
            _id: this.person3Id
          },
          body: 'NestedFooBar2'
        }
      ],
      subdocument: {
        person: {
          _id: this.person2Id
        },
        persons: [
          {
            _id: this.person2Id
          }, {
            _id: this.person2Id
          }, {
            _id: this.person2Id
          }, {
            _id: this.person1Id
          }, {
            _id: this.person2Id
          }, {
            _id: this.person3Id
          }
        ],
        body: 'SubdocumentFooBar2'
      },
      body: 'FooBar2'
    }, expect((function(_this) {
      return function(error, postId) {
        test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
        test.isTrue(postId);
        return _this.postId2 = postId;
      };
    })(this)));
    Post.documents.insert({
      author: {
        _id: this.person1Id
      },
      nested: [
        {
          required: {
            _id: this.person3Id
          },
          body: 'NestedFooBar3'
        }
      ],
      subdocument: {
        person: {
          _id: this.person1Id
        },
        persons: [
          {
            _id: this.person1Id
          }, {
            _id: this.person1Id
          }, {
            _id: this.person1Id
          }, {
            _id: this.person1Id
          }, {
            _id: this.person2Id
          }, {
            _id: this.person3Id
          }
        ],
        body: 'SubdocumentFooBar3'
      },
      body: 'FooBar3'
    }, expect((function(_this) {
      return function(error, postId) {
        test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
        test.isTrue(postId);
        return _this.postId3 = postId;
      };
    })(this)));
    return Meteor.setTimeout(expect(), WAIT_TIME);
  }, function(test, expect) {
    this.post1 = Post.documents.findOne(this.postId1, {
      transform: null
    });
    this.post2 = Post.documents.findOne(this.postId2, {
      transform: null
    });
    this.post3 = Post.documents.findOne(this.postId3, {
      transform: null
    });
    test.equal(this.post1, {
      _id: this.postId1,
      _schema: '1.0.0',
      author: {
        _id: this.person1Id,
        username: 'person1',
        displayName: 'Person 1'
      },
      subdocument: {
        person: {
          _id: this.person1Id,
          displayName: 'Person 1',
          username: 'person1'
        },
        persons: [
          {
            _id: this.person1Id,
            displayName: 'Person 1',
            username: 'person1'
          }, {
            _id: this.person2Id,
            displayName: 'Person 2',
            username: 'person2'
          }, {
            _id: this.person3Id,
            displayName: 'Person 3',
            username: 'person3'
          }, {
            _id: this.person1Id,
            displayName: 'Person 1',
            username: 'person1'
          }, {
            _id: this.person2Id,
            displayName: 'Person 2',
            username: 'person2'
          }, {
            _id: this.person3Id,
            displayName: 'Person 3',
            username: 'person3'
          }
        ],
        slug: 'subdocument-prefix-foobar1-subdocumentfoobar1-suffix',
        body: 'SubdocumentFooBar1'
      },
      nested: [
        {
          required: {
            _id: this.person2Id,
            username: 'person2',
            displayName: 'Person 2'
          },
          slug: 'nested-prefix-foobar1-nestedfoobar1-suffix',
          body: 'NestedFooBar1'
        }
      ],
      body: 'FooBar1',
      slug: 'prefix-foobar1-subdocumentfoobar1-suffix',
      tags: ['tag-0-prefix-foobar1-subdocumentfoobar1-suffix', 'tag-1-prefix-foobar1-nestedfoobar1-suffix']
    });
    test.equal(this.post2, {
      _id: this.postId2,
      _schema: '1.0.0',
      author: {
        _id: this.person1Id,
        username: 'person1',
        displayName: 'Person 1'
      },
      subdocument: {
        person: {
          _id: this.person2Id,
          displayName: 'Person 2',
          username: 'person2'
        },
        persons: [
          {
            _id: this.person2Id,
            displayName: 'Person 2',
            username: 'person2'
          }, {
            _id: this.person2Id,
            displayName: 'Person 2',
            username: 'person2'
          }, {
            _id: this.person2Id,
            displayName: 'Person 2',
            username: 'person2'
          }, {
            _id: this.person1Id,
            displayName: 'Person 1',
            username: 'person1'
          }, {
            _id: this.person2Id,
            displayName: 'Person 2',
            username: 'person2'
          }, {
            _id: this.person3Id,
            displayName: 'Person 3',
            username: 'person3'
          }
        ],
        slug: 'subdocument-prefix-foobar2-subdocumentfoobar2-suffix',
        body: 'SubdocumentFooBar2'
      },
      nested: [
        {
          required: {
            _id: this.person3Id,
            username: 'person3',
            displayName: 'Person 3'
          },
          slug: 'nested-prefix-foobar2-nestedfoobar2-suffix',
          body: 'NestedFooBar2'
        }
      ],
      body: 'FooBar2',
      slug: 'prefix-foobar2-subdocumentfoobar2-suffix',
      tags: ['tag-0-prefix-foobar2-subdocumentfoobar2-suffix', 'tag-1-prefix-foobar2-nestedfoobar2-suffix']
    });
    test.equal(this.post3, {
      _id: this.postId3,
      _schema: '1.0.0',
      author: {
        _id: this.person1Id,
        username: 'person1',
        displayName: 'Person 1'
      },
      subdocument: {
        person: {
          _id: this.person1Id,
          displayName: 'Person 1',
          username: 'person1'
        },
        persons: [
          {
            _id: this.person1Id,
            displayName: 'Person 1',
            username: 'person1'
          }, {
            _id: this.person1Id,
            displayName: 'Person 1',
            username: 'person1'
          }, {
            _id: this.person1Id,
            displayName: 'Person 1',
            username: 'person1'
          }, {
            _id: this.person1Id,
            displayName: 'Person 1',
            username: 'person1'
          }, {
            _id: this.person2Id,
            displayName: 'Person 2',
            username: 'person2'
          }, {
            _id: this.person3Id,
            displayName: 'Person 3',
            username: 'person3'
          }
        ],
        slug: 'subdocument-prefix-foobar3-subdocumentfoobar3-suffix',
        body: 'SubdocumentFooBar3'
      },
      nested: [
        {
          required: {
            _id: this.person3Id,
            username: 'person3',
            displayName: 'Person 3'
          },
          slug: 'nested-prefix-foobar3-nestedfoobar3-suffix',
          body: 'NestedFooBar3'
        }
      ],
      body: 'FooBar3',
      slug: 'prefix-foobar3-subdocumentfoobar3-suffix',
      tags: ['tag-0-prefix-foobar3-subdocumentfoobar3-suffix', 'tag-1-prefix-foobar3-nestedfoobar3-suffix']
    });
    this.person1 = Person.documents.findOne(this.person1Id, {
      transform: null
    });
    this.person2 = Person.documents.findOne(this.person2Id, {
      transform: null
    });
    this.person3 = Person.documents.findOne(this.person3Id, {
      transform: null
    });
    test.equal(_.omit(this.person1, 'posts', 'subdocumentPosts', 'subdocumentsPosts', 'nestedPosts'), {
      _id: this.person1Id,
      _schema: '1.0.0',
      username: 'person1',
      displayName: 'Person 1',
      count: 8
    });
    testSetEqual(test, this.person1.posts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1'
        },
        nested: [
          {
            body: 'NestedFooBar1'
          }
        ],
        body: 'FooBar1'
      }, {
        _id: this.postId2,
        subdocument: {
          body: 'SubdocumentFooBar2'
        },
        nested: [
          {
            body: 'NestedFooBar2'
          }
        ],
        body: 'FooBar2'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3'
        },
        nested: [
          {
            body: 'NestedFooBar3'
          }
        ],
        body: 'FooBar3'
      }
    ]);
    testSetEqual(test, this.person1.subdocumentPosts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1'
        },
        nested: [
          {
            body: 'NestedFooBar1'
          }
        ],
        body: 'FooBar1'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3'
        },
        nested: [
          {
            body: 'NestedFooBar3'
          }
        ],
        body: 'FooBar3'
      }
    ]);
    testSetEqual(test, this.person1.subdocumentsPosts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1'
        },
        nested: [
          {
            body: 'NestedFooBar1'
          }
        ],
        body: 'FooBar1'
      }, {
        _id: this.postId2,
        subdocument: {
          body: 'SubdocumentFooBar2'
        },
        nested: [
          {
            body: 'NestedFooBar2'
          }
        ],
        body: 'FooBar2'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3'
        },
        nested: [
          {
            body: 'NestedFooBar3'
          }
        ],
        body: 'FooBar3'
      }
    ]);
    testSetEqual(test, this.person1.nestedPosts, []);
    test.equal(_.omit(this.person2, 'posts', 'subdocumentPosts', 'subdocumentsPosts', 'nestedPosts'), {
      _id: this.person2Id,
      _schema: '1.0.0',
      username: 'person2',
      displayName: 'Person 2',
      count: 5
    });
    testSetEqual(test, this.person2.posts, []);
    testSetEqual(test, this.person2.subdocumentPosts, [
      {
        _id: this.postId2,
        subdocument: {
          body: 'SubdocumentFooBar2'
        },
        nested: [
          {
            body: 'NestedFooBar2'
          }
        ],
        body: 'FooBar2'
      }
    ]);
    testSetEqual(test, this.person2.subdocumentsPosts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1'
        },
        nested: [
          {
            body: 'NestedFooBar1'
          }
        ],
        body: 'FooBar1'
      }, {
        _id: this.postId2,
        subdocument: {
          body: 'SubdocumentFooBar2'
        },
        nested: [
          {
            body: 'NestedFooBar2'
          }
        ],
        body: 'FooBar2'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3'
        },
        nested: [
          {
            body: 'NestedFooBar3'
          }
        ],
        body: 'FooBar3'
      }
    ]);
    testSetEqual(test, this.person2.nestedPosts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1'
        },
        nested: [
          {
            body: 'NestedFooBar1'
          }
        ],
        body: 'FooBar1'
      }
    ]);
    test.equal(_.omit(this.person3, 'posts', 'subdocumentPosts', 'subdocumentsPosts', 'nestedPosts'), {
      _id: this.person3Id,
      _schema: '1.0.0',
      username: 'person3',
      displayName: 'Person 3',
      count: 5
    });
    testSetEqual(test, this.person3.posts, []);
    testSetEqual(test, this.person3.subdocumentPosts, []);
    testSetEqual(test, this.person3.subdocumentsPosts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1'
        },
        nested: [
          {
            body: 'NestedFooBar1'
          }
        ],
        body: 'FooBar1'
      }, {
        _id: this.postId2,
        subdocument: {
          body: 'SubdocumentFooBar2'
        },
        nested: [
          {
            body: 'NestedFooBar2'
          }
        ],
        body: 'FooBar2'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3'
        },
        nested: [
          {
            body: 'NestedFooBar3'
          }
        ],
        body: 'FooBar3'
      }
    ]);
    testSetEqual(test, this.person3.nestedPosts, [
      {
        _id: this.postId2,
        subdocument: {
          body: 'SubdocumentFooBar2'
        },
        nested: [
          {
            body: 'NestedFooBar2'
          }
        ],
        body: 'FooBar2'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3'
        },
        nested: [
          {
            body: 'NestedFooBar3'
          }
        ],
        body: 'FooBar3'
      }
    ]);
    Post.documents.insert({
      author: {
        _id: this.person1Id
      },
      nested: [
        {
          required: {
            _id: this.person3Id
          },
          body: 'NestedFooBar4'
        }, {
          required: {
            _id: this.person3Id
          },
          body: 'NestedFooBar4'
        }, {
          required: {
            _id: this.person1Id
          },
          body: 'NestedFooBar4'
        }, {
          required: {
            _id: this.person2Id
          },
          body: 'NestedFooBar4'
        }, {
          required: {
            _id: this.person3Id
          },
          body: 'NestedFooBar4'
        }, {
          required: {
            _id: this.person1Id
          },
          body: 'NestedFooBar4'
        }, {
          required: {
            _id: this.person2Id
          },
          body: 'NestedFooBar4'
        }, {
          required: {
            _id: this.person3Id
          },
          body: 'NestedFooBar4'
        }
      ],
      subdocument: {
        person: {
          _id: this.person1Id
        },
        persons: [
          {
            _id: this.person1Id
          }, {
            _id: this.person1Id
          }, {
            _id: this.person1Id
          }, {
            _id: this.person1Id
          }, {
            _id: this.person2Id
          }, {
            _id: this.person2Id
          }
        ],
        body: 'SubdocumentFooBar4'
      },
      body: 'FooBar4'
    }, expect((function(_this) {
      return function(error, postId) {
        test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
        test.isTrue(postId);
        return _this.postId4 = postId;
      };
    })(this)));
    Post.documents.insert({
      author: {
        _id: this.person1Id
      },
      nested: [
        {
          required: {
            _id: this.person3Id
          },
          body: 'NestedFooBar5'
        }, {
          required: {
            _id: this.person3Id
          },
          body: 'NestedFooBar5'
        }, {
          required: {
            _id: this.person3Id
          },
          body: 'NestedFooBar5'
        }
      ],
      subdocument: {
        person: {
          _id: this.person3Id
        },
        persons: [
          {
            _id: this.person3Id
          }, {
            _id: this.person3Id
          }, {
            _id: this.person3Id
          }, {
            _id: this.person3Id
          }, {
            _id: this.person2Id
          }, {
            _id: this.person3Id
          }
        ],
        body: 'SubdocumentFooBar5'
      },
      body: 'FooBar5'
    }, expect((function(_this) {
      return function(error, postId) {
        test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
        test.isTrue(postId);
        return _this.postId5 = postId;
      };
    })(this)));
    return Meteor.setTimeout(expect(), WAIT_TIME);
  }, function(test, expect) {
    this.person1 = Person.documents.findOne(this.person1Id, {
      transform: null
    });
    this.person2 = Person.documents.findOne(this.person2Id, {
      transform: null
    });
    this.person3 = Person.documents.findOne(this.person3Id, {
      transform: null
    });
    test.equal(_.omit(this.person1, 'posts', 'subdocumentPosts', 'subdocumentsPosts', 'nestedPosts'), {
      _id: this.person1Id,
      _schema: '1.0.0',
      username: 'person1',
      displayName: 'Person 1',
      count: 13
    });
    testSetEqual(test, this.person1.posts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1'
        },
        nested: [
          {
            body: 'NestedFooBar1'
          }
        ],
        body: 'FooBar1'
      }, {
        _id: this.postId2,
        subdocument: {
          body: 'SubdocumentFooBar2'
        },
        nested: [
          {
            body: 'NestedFooBar2'
          }
        ],
        body: 'FooBar2'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3'
        },
        nested: [
          {
            body: 'NestedFooBar3'
          }
        ],
        body: 'FooBar3'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4'
      }, {
        _id: this.postId5,
        subdocument: {
          body: 'SubdocumentFooBar5'
        },
        nested: [
          {
            body: 'NestedFooBar5'
          }, {
            body: 'NestedFooBar5'
          }, {
            body: 'NestedFooBar5'
          }
        ],
        body: 'FooBar5'
      }
    ]);
    testSetEqual(test, this.person1.subdocumentPosts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1'
        },
        nested: [
          {
            body: 'NestedFooBar1'
          }
        ],
        body: 'FooBar1'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3'
        },
        nested: [
          {
            body: 'NestedFooBar3'
          }
        ],
        body: 'FooBar3'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4'
      }
    ]);
    testSetEqual(test, this.person1.subdocumentsPosts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1'
        },
        nested: [
          {
            body: 'NestedFooBar1'
          }
        ],
        body: 'FooBar1'
      }, {
        _id: this.postId2,
        subdocument: {
          body: 'SubdocumentFooBar2'
        },
        nested: [
          {
            body: 'NestedFooBar2'
          }
        ],
        body: 'FooBar2'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3'
        },
        nested: [
          {
            body: 'NestedFooBar3'
          }
        ],
        body: 'FooBar3'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4'
      }
    ]);
    testSetEqual(test, this.person1.nestedPosts, [
      {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4'
      }
    ]);
    test.equal(_.omit(this.person2, 'posts', 'subdocumentPosts', 'subdocumentsPosts', 'nestedPosts'), {
      _id: this.person2Id,
      _schema: '1.0.0',
      username: 'person2',
      displayName: 'Person 2',
      count: 8
    });
    testSetEqual(test, this.person2.posts, []);
    testSetEqual(test, this.person2.subdocumentPosts, [
      {
        _id: this.postId2,
        subdocument: {
          body: 'SubdocumentFooBar2'
        },
        nested: [
          {
            body: 'NestedFooBar2'
          }
        ],
        body: 'FooBar2'
      }
    ]);
    testSetEqual(test, this.person2.subdocumentsPosts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1'
        },
        nested: [
          {
            body: 'NestedFooBar1'
          }
        ],
        body: 'FooBar1'
      }, {
        _id: this.postId2,
        subdocument: {
          body: 'SubdocumentFooBar2'
        },
        nested: [
          {
            body: 'NestedFooBar2'
          }
        ],
        body: 'FooBar2'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3'
        },
        nested: [
          {
            body: 'NestedFooBar3'
          }
        ],
        body: 'FooBar3'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4'
      }, {
        _id: this.postId5,
        subdocument: {
          body: 'SubdocumentFooBar5'
        },
        nested: [
          {
            body: 'NestedFooBar5'
          }, {
            body: 'NestedFooBar5'
          }, {
            body: 'NestedFooBar5'
          }
        ],
        body: 'FooBar5'
      }
    ]);
    testSetEqual(test, this.person2.nestedPosts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1'
        },
        nested: [
          {
            body: 'NestedFooBar1'
          }
        ],
        body: 'FooBar1'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4'
      }
    ]);
    test.equal(_.omit(this.person3, 'posts', 'subdocumentPosts', 'subdocumentsPosts', 'nestedPosts'), {
      _id: this.person3Id,
      _schema: '1.0.0',
      username: 'person3',
      displayName: 'Person 3',
      count: 9
    });
    testSetEqual(test, this.person3.posts, []);
    testSetEqual(test, this.person3.subdocumentPosts, [
      {
        _id: this.postId5,
        subdocument: {
          body: 'SubdocumentFooBar5'
        },
        nested: [
          {
            body: 'NestedFooBar5'
          }, {
            body: 'NestedFooBar5'
          }, {
            body: 'NestedFooBar5'
          }
        ],
        body: 'FooBar5'
      }
    ]);
    testSetEqual(test, this.person3.subdocumentsPosts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1'
        },
        nested: [
          {
            body: 'NestedFooBar1'
          }
        ],
        body: 'FooBar1'
      }, {
        _id: this.postId2,
        subdocument: {
          body: 'SubdocumentFooBar2'
        },
        nested: [
          {
            body: 'NestedFooBar2'
          }
        ],
        body: 'FooBar2'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3'
        },
        nested: [
          {
            body: 'NestedFooBar3'
          }
        ],
        body: 'FooBar3'
      }, {
        _id: this.postId5,
        subdocument: {
          body: 'SubdocumentFooBar5'
        },
        nested: [
          {
            body: 'NestedFooBar5'
          }, {
            body: 'NestedFooBar5'
          }, {
            body: 'NestedFooBar5'
          }
        ],
        body: 'FooBar5'
      }
    ]);
    testSetEqual(test, this.person3.nestedPosts, [
      {
        _id: this.postId2,
        subdocument: {
          body: 'SubdocumentFooBar2'
        },
        nested: [
          {
            body: 'NestedFooBar2'
          }
        ],
        body: 'FooBar2'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3'
        },
        nested: [
          {
            body: 'NestedFooBar3'
          }
        ],
        body: 'FooBar3'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4'
      }, {
        _id: this.postId5,
        subdocument: {
          body: 'SubdocumentFooBar5'
        },
        nested: [
          {
            body: 'NestedFooBar5'
          }, {
            body: 'NestedFooBar5'
          }, {
            body: 'NestedFooBar5'
          }
        ],
        body: 'FooBar5'
      }
    ]);
    Post.documents.update(this.postId1, {
      $set: {
        'body': 'FooBar1a',
        'subdocument.body': 'SubdocumentFooBar1a',
        'nested.0.body': 'NestedFooBar1a'
      }
    }, expect((function(_this) {
      return function(error, res) {
        test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
        return test.isTrue(res);
      };
    })(this)));
    Post.documents.update(this.postId2, {
      $set: {
        'body': 'FooBar2a',
        'subdocument.body': 'SubdocumentFooBar2a',
        'nested.0.body': 'NestedFooBar2a'
      }
    }, expect((function(_this) {
      return function(error, res) {
        test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
        return test.isTrue(res);
      };
    })(this)));
    Post.documents.update(this.postId3, {
      $set: {
        'body': 'FooBar3a',
        'subdocument.body': 'SubdocumentFooBar3a',
        'nested.0.body': 'NestedFooBar3a'
      }
    }, expect((function(_this) {
      return function(error, res) {
        test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
        return test.isTrue(res);
      };
    })(this)));
    Post.documents.update(this.postId4, {
      $set: {
        'body': 'FooBar4a',
        'subdocument.body': 'SubdocumentFooBar4a',
        'nested.1.body': 'NestedFooBar4a',
        'nested.3.body': 'NestedFooBar4a'
      }
    }, expect((function(_this) {
      return function(error, res) {
        test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
        return test.isTrue(res);
      };
    })(this)));
    Post.documents.update(this.postId5, {
      $set: {
        'body': 'FooBar5a',
        'subdocument.body': 'SubdocumentFooBar5a',
        'nested.1.body': 'NestedFooBar5a'
      }
    }, expect((function(_this) {
      return function(error, res) {
        test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
        return test.isTrue(res);
      };
    })(this)));
    return Meteor.setTimeout(expect(), WAIT_TIME);
  }, function(test, expect) {
    this.person1 = Person.documents.findOne(this.person1Id, {
      transform: null
    });
    this.person2 = Person.documents.findOne(this.person2Id, {
      transform: null
    });
    this.person3 = Person.documents.findOne(this.person3Id, {
      transform: null
    });
    test.equal(_.omit(this.person1, 'posts', 'subdocumentPosts', 'subdocumentsPosts', 'nestedPosts'), {
      _id: this.person1Id,
      _schema: '1.0.0',
      username: 'person1',
      displayName: 'Person 1',
      count: 13
    });
    testSetEqual(test, this.person1.posts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1a'
        },
        nested: [
          {
            body: 'NestedFooBar1a'
          }
        ],
        body: 'FooBar1a'
      }, {
        _id: this.postId2,
        subdocument: {
          body: 'SubdocumentFooBar2a'
        },
        nested: [
          {
            body: 'NestedFooBar2a'
          }
        ],
        body: 'FooBar2a'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3a'
        },
        nested: [
          {
            body: 'NestedFooBar3a'
          }
        ],
        body: 'FooBar3a'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }, {
        _id: this.postId5,
        subdocument: {
          body: 'SubdocumentFooBar5a'
        },
        nested: [
          {
            body: 'NestedFooBar5'
          }, {
            body: 'NestedFooBar5a'
          }, {
            body: 'NestedFooBar5'
          }
        ],
        body: 'FooBar5a'
      }
    ]);
    testSetEqual(test, this.person1.subdocumentPosts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1a'
        },
        nested: [
          {
            body: 'NestedFooBar1a'
          }
        ],
        body: 'FooBar1a'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3a'
        },
        nested: [
          {
            body: 'NestedFooBar3a'
          }
        ],
        body: 'FooBar3a'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }
    ]);
    testSetEqual(test, this.person1.subdocumentsPosts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1a'
        },
        nested: [
          {
            body: 'NestedFooBar1a'
          }
        ],
        body: 'FooBar1a'
      }, {
        _id: this.postId2,
        subdocument: {
          body: 'SubdocumentFooBar2a'
        },
        nested: [
          {
            body: 'NestedFooBar2a'
          }
        ],
        body: 'FooBar2a'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3a'
        },
        nested: [
          {
            body: 'NestedFooBar3a'
          }
        ],
        body: 'FooBar3a'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }
    ]);
    testSetEqual(test, this.person1.nestedPosts, [
      {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }
    ]);
    test.equal(_.omit(this.person2, 'posts', 'subdocumentPosts', 'subdocumentsPosts', 'nestedPosts'), {
      _id: this.person2Id,
      _schema: '1.0.0',
      username: 'person2',
      displayName: 'Person 2',
      count: 8
    });
    testSetEqual(test, this.person2.posts, []);
    testSetEqual(test, this.person2.subdocumentPosts, [
      {
        _id: this.postId2,
        subdocument: {
          body: 'SubdocumentFooBar2a'
        },
        nested: [
          {
            body: 'NestedFooBar2a'
          }
        ],
        body: 'FooBar2a'
      }
    ]);
    testSetEqual(test, this.person2.subdocumentsPosts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1a'
        },
        nested: [
          {
            body: 'NestedFooBar1a'
          }
        ],
        body: 'FooBar1a'
      }, {
        _id: this.postId2,
        subdocument: {
          body: 'SubdocumentFooBar2a'
        },
        nested: [
          {
            body: 'NestedFooBar2a'
          }
        ],
        body: 'FooBar2a'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3a'
        },
        nested: [
          {
            body: 'NestedFooBar3a'
          }
        ],
        body: 'FooBar3a'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }, {
        _id: this.postId5,
        subdocument: {
          body: 'SubdocumentFooBar5a'
        },
        nested: [
          {
            body: 'NestedFooBar5'
          }, {
            body: 'NestedFooBar5a'
          }, {
            body: 'NestedFooBar5'
          }
        ],
        body: 'FooBar5a'
      }
    ]);
    testSetEqual(test, this.person2.nestedPosts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1a'
        },
        nested: [
          {
            body: 'NestedFooBar1a'
          }
        ],
        body: 'FooBar1a'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }
    ]);
    test.equal(_.omit(this.person3, 'posts', 'subdocumentPosts', 'subdocumentsPosts', 'nestedPosts'), {
      _id: this.person3Id,
      _schema: '1.0.0',
      username: 'person3',
      displayName: 'Person 3',
      count: 9
    });
    testSetEqual(test, this.person3.posts, []);
    testSetEqual(test, this.person3.subdocumentPosts, [
      {
        _id: this.postId5,
        subdocument: {
          body: 'SubdocumentFooBar5a'
        },
        nested: [
          {
            body: 'NestedFooBar5'
          }, {
            body: 'NestedFooBar5a'
          }, {
            body: 'NestedFooBar5'
          }
        ],
        body: 'FooBar5a'
      }
    ]);
    testSetEqual(test, this.person3.subdocumentsPosts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1a'
        },
        nested: [
          {
            body: 'NestedFooBar1a'
          }
        ],
        body: 'FooBar1a'
      }, {
        _id: this.postId2,
        subdocument: {
          body: 'SubdocumentFooBar2a'
        },
        nested: [
          {
            body: 'NestedFooBar2a'
          }
        ],
        body: 'FooBar2a'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3a'
        },
        nested: [
          {
            body: 'NestedFooBar3a'
          }
        ],
        body: 'FooBar3a'
      }, {
        _id: this.postId5,
        subdocument: {
          body: 'SubdocumentFooBar5a'
        },
        nested: [
          {
            body: 'NestedFooBar5'
          }, {
            body: 'NestedFooBar5a'
          }, {
            body: 'NestedFooBar5'
          }
        ],
        body: 'FooBar5a'
      }
    ]);
    testSetEqual(test, this.person3.nestedPosts, [
      {
        _id: this.postId2,
        subdocument: {
          body: 'SubdocumentFooBar2a'
        },
        nested: [
          {
            body: 'NestedFooBar2a'
          }
        ],
        body: 'FooBar2a'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3a'
        },
        nested: [
          {
            body: 'NestedFooBar3a'
          }
        ],
        body: 'FooBar3a'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }, {
        _id: this.postId5,
        subdocument: {
          body: 'SubdocumentFooBar5a'
        },
        nested: [
          {
            body: 'NestedFooBar5'
          }, {
            body: 'NestedFooBar5a'
          }, {
            body: 'NestedFooBar5'
          }
        ],
        body: 'FooBar5a'
      }
    ]);
    Post.documents.update(this.postId2, {
      $push: {
        nested: {
          required: {
            _id: this.person2Id
          },
          body: 'NestedFooBarNew'
        }
      }
    }, expect((function(_this) {
      return function(error, res) {
        test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
        return test.isTrue(res);
      };
    })(this)));
    return Meteor.setTimeout(expect(), WAIT_TIME);
  }, function(test, expect) {
    this.post2 = Post.documents.findOne(this.postId2, {
      transform: null
    });
    test.equal(this.post2, {
      _id: this.postId2,
      _schema: '1.0.0',
      author: {
        _id: this.person1Id,
        username: 'person1',
        displayName: 'Person 1'
      },
      subdocument: {
        person: {
          _id: this.person2Id,
          displayName: 'Person 2',
          username: 'person2'
        },
        persons: [
          {
            _id: this.person2Id,
            displayName: 'Person 2',
            username: 'person2'
          }, {
            _id: this.person2Id,
            displayName: 'Person 2',
            username: 'person2'
          }, {
            _id: this.person2Id,
            displayName: 'Person 2',
            username: 'person2'
          }, {
            _id: this.person1Id,
            displayName: 'Person 1',
            username: 'person1'
          }, {
            _id: this.person2Id,
            displayName: 'Person 2',
            username: 'person2'
          }, {
            _id: this.person3Id,
            displayName: 'Person 3',
            username: 'person3'
          }
        ],
        slug: 'subdocument-prefix-foobar2a-subdocumentfoobar2a-suffix',
        body: 'SubdocumentFooBar2a'
      },
      nested: [
        {
          required: {
            _id: this.person3Id,
            username: 'person3',
            displayName: 'Person 3'
          },
          slug: 'nested-prefix-foobar2a-nestedfoobar2a-suffix',
          body: 'NestedFooBar2a'
        }, {
          required: {
            _id: this.person2Id,
            username: 'person2',
            displayName: 'Person 2'
          },
          slug: 'nested-prefix-foobar2a-nestedfoobarnew-suffix',
          body: 'NestedFooBarNew'
        }
      ],
      body: 'FooBar2a',
      slug: 'prefix-foobar2a-subdocumentfoobar2a-suffix',
      tags: ['tag-0-prefix-foobar2a-subdocumentfoobar2a-suffix', 'tag-1-prefix-foobar2a-nestedfoobar2a-suffix', 'tag-2-prefix-foobar2a-nestedfoobarnew-suffix']
    });
    this.person1 = Person.documents.findOne(this.person1Id, {
      transform: null
    });
    this.person2 = Person.documents.findOne(this.person2Id, {
      transform: null
    });
    this.person3 = Person.documents.findOne(this.person3Id, {
      transform: null
    });
    test.equal(_.omit(this.person1, 'posts', 'subdocumentPosts', 'subdocumentsPosts', 'nestedPosts'), {
      _id: this.person1Id,
      _schema: '1.0.0',
      username: 'person1',
      displayName: 'Person 1',
      count: 13
    });
    testSetEqual(test, this.person1.posts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1a'
        },
        nested: [
          {
            body: 'NestedFooBar1a'
          }
        ],
        body: 'FooBar1a'
      }, {
        _id: this.postId2,
        subdocument: {
          body: 'SubdocumentFooBar2a'
        },
        nested: [
          {
            body: 'NestedFooBar2a'
          }, {
            body: 'NestedFooBarNew'
          }
        ],
        body: 'FooBar2a'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3a'
        },
        nested: [
          {
            body: 'NestedFooBar3a'
          }
        ],
        body: 'FooBar3a'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }, {
        _id: this.postId5,
        subdocument: {
          body: 'SubdocumentFooBar5a'
        },
        nested: [
          {
            body: 'NestedFooBar5'
          }, {
            body: 'NestedFooBar5a'
          }, {
            body: 'NestedFooBar5'
          }
        ],
        body: 'FooBar5a'
      }
    ]);
    testSetEqual(test, this.person1.subdocumentPosts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1a'
        },
        nested: [
          {
            body: 'NestedFooBar1a'
          }
        ],
        body: 'FooBar1a'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3a'
        },
        nested: [
          {
            body: 'NestedFooBar3a'
          }
        ],
        body: 'FooBar3a'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }
    ]);
    testSetEqual(test, this.person1.subdocumentsPosts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1a'
        },
        nested: [
          {
            body: 'NestedFooBar1a'
          }
        ],
        body: 'FooBar1a'
      }, {
        _id: this.postId2,
        subdocument: {
          body: 'SubdocumentFooBar2a'
        },
        nested: [
          {
            body: 'NestedFooBar2a'
          }, {
            body: 'NestedFooBarNew'
          }
        ],
        body: 'FooBar2a'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3a'
        },
        nested: [
          {
            body: 'NestedFooBar3a'
          }
        ],
        body: 'FooBar3a'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }
    ]);
    testSetEqual(test, this.person1.nestedPosts, [
      {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }
    ]);
    test.equal(_.omit(this.person2, 'posts', 'subdocumentPosts', 'subdocumentsPosts', 'nestedPosts'), {
      _id: this.person2Id,
      _schema: '1.0.0',
      username: 'person2',
      displayName: 'Person 2',
      count: 9
    });
    testSetEqual(test, this.person2.posts, []);
    testSetEqual(test, this.person2.subdocumentPosts, [
      {
        _id: this.postId2,
        subdocument: {
          body: 'SubdocumentFooBar2a'
        },
        nested: [
          {
            body: 'NestedFooBar2a'
          }, {
            body: 'NestedFooBarNew'
          }
        ],
        body: 'FooBar2a'
      }
    ]);
    testSetEqual(test, this.person2.subdocumentsPosts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1a'
        },
        nested: [
          {
            body: 'NestedFooBar1a'
          }
        ],
        body: 'FooBar1a'
      }, {
        _id: this.postId2,
        subdocument: {
          body: 'SubdocumentFooBar2a'
        },
        nested: [
          {
            body: 'NestedFooBar2a'
          }, {
            body: 'NestedFooBarNew'
          }
        ],
        body: 'FooBar2a'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3a'
        },
        nested: [
          {
            body: 'NestedFooBar3a'
          }
        ],
        body: 'FooBar3a'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }, {
        _id: this.postId5,
        subdocument: {
          body: 'SubdocumentFooBar5a'
        },
        nested: [
          {
            body: 'NestedFooBar5'
          }, {
            body: 'NestedFooBar5a'
          }, {
            body: 'NestedFooBar5'
          }
        ],
        body: 'FooBar5a'
      }
    ]);
    testSetEqual(test, this.person2.nestedPosts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1a'
        },
        nested: [
          {
            body: 'NestedFooBar1a'
          }
        ],
        body: 'FooBar1a'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }, {
        _id: this.postId2,
        subdocument: {
          body: 'SubdocumentFooBar2a'
        },
        nested: [
          {
            body: 'NestedFooBar2a'
          }, {
            body: 'NestedFooBarNew'
          }
        ],
        body: 'FooBar2a'
      }
    ]);
    test.equal(_.omit(this.person3, 'posts', 'subdocumentPosts', 'subdocumentsPosts', 'nestedPosts'), {
      _id: this.person3Id,
      _schema: '1.0.0',
      username: 'person3',
      displayName: 'Person 3',
      count: 9
    });
    testSetEqual(test, this.person3.posts, []);
    testSetEqual(test, this.person3.subdocumentPosts, [
      {
        _id: this.postId5,
        subdocument: {
          body: 'SubdocumentFooBar5a'
        },
        nested: [
          {
            body: 'NestedFooBar5'
          }, {
            body: 'NestedFooBar5a'
          }, {
            body: 'NestedFooBar5'
          }
        ],
        body: 'FooBar5a'
      }
    ]);
    testSetEqual(test, this.person3.subdocumentsPosts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1a'
        },
        nested: [
          {
            body: 'NestedFooBar1a'
          }
        ],
        body: 'FooBar1a'
      }, {
        _id: this.postId2,
        subdocument: {
          body: 'SubdocumentFooBar2a'
        },
        nested: [
          {
            body: 'NestedFooBar2a'
          }, {
            body: 'NestedFooBarNew'
          }
        ],
        body: 'FooBar2a'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3a'
        },
        nested: [
          {
            body: 'NestedFooBar3a'
          }
        ],
        body: 'FooBar3a'
      }, {
        _id: this.postId5,
        subdocument: {
          body: 'SubdocumentFooBar5a'
        },
        nested: [
          {
            body: 'NestedFooBar5'
          }, {
            body: 'NestedFooBar5a'
          }, {
            body: 'NestedFooBar5'
          }
        ],
        body: 'FooBar5a'
      }
    ]);
    testSetEqual(test, this.person3.nestedPosts, [
      {
        _id: this.postId2,
        subdocument: {
          body: 'SubdocumentFooBar2a'
        },
        nested: [
          {
            body: 'NestedFooBar2a'
          }, {
            body: 'NestedFooBarNew'
          }
        ],
        body: 'FooBar2a'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3a'
        },
        nested: [
          {
            body: 'NestedFooBar3a'
          }
        ],
        body: 'FooBar3a'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }, {
        _id: this.postId5,
        subdocument: {
          body: 'SubdocumentFooBar5a'
        },
        nested: [
          {
            body: 'NestedFooBar5'
          }, {
            body: 'NestedFooBar5a'
          }, {
            body: 'NestedFooBar5'
          }
        ],
        body: 'FooBar5a'
      }
    ]);
    Post.documents.update(this.postId2, {
      $pop: {
        nested: 1
      }
    }, expect((function(_this) {
      return function(error, res) {
        test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
        return test.isTrue(res);
      };
    })(this)));
    return Meteor.setTimeout(expect(), WAIT_TIME);
  }, function(test, expect) {
    this.post2 = Post.documents.findOne(this.postId2, {
      transform: null
    });
    test.equal(this.post2, {
      _id: this.postId2,
      _schema: '1.0.0',
      author: {
        _id: this.person1Id,
        username: 'person1',
        displayName: 'Person 1'
      },
      subdocument: {
        person: {
          _id: this.person2Id,
          displayName: 'Person 2',
          username: 'person2'
        },
        persons: [
          {
            _id: this.person2Id,
            displayName: 'Person 2',
            username: 'person2'
          }, {
            _id: this.person2Id,
            displayName: 'Person 2',
            username: 'person2'
          }, {
            _id: this.person2Id,
            displayName: 'Person 2',
            username: 'person2'
          }, {
            _id: this.person1Id,
            displayName: 'Person 1',
            username: 'person1'
          }, {
            _id: this.person2Id,
            displayName: 'Person 2',
            username: 'person2'
          }, {
            _id: this.person3Id,
            displayName: 'Person 3',
            username: 'person3'
          }
        ],
        slug: 'subdocument-prefix-foobar2a-subdocumentfoobar2a-suffix',
        body: 'SubdocumentFooBar2a'
      },
      nested: [
        {
          required: {
            _id: this.person3Id,
            username: 'person3',
            displayName: 'Person 3'
          },
          slug: 'nested-prefix-foobar2a-nestedfoobar2a-suffix',
          body: 'NestedFooBar2a'
        }
      ],
      body: 'FooBar2a',
      slug: 'prefix-foobar2a-subdocumentfoobar2a-suffix',
      tags: ['tag-0-prefix-foobar2a-subdocumentfoobar2a-suffix', 'tag-1-prefix-foobar2a-nestedfoobar2a-suffix']
    });
    this.person1 = Person.documents.findOne(this.person1Id, {
      transform: null
    });
    this.person2 = Person.documents.findOne(this.person2Id, {
      transform: null
    });
    this.person3 = Person.documents.findOne(this.person3Id, {
      transform: null
    });
    test.equal(_.omit(this.person1, 'posts', 'subdocumentPosts', 'subdocumentsPosts', 'nestedPosts'), {
      _id: this.person1Id,
      _schema: '1.0.0',
      username: 'person1',
      displayName: 'Person 1',
      count: 13
    });
    testSetEqual(test, this.person1.posts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1a'
        },
        nested: [
          {
            body: 'NestedFooBar1a'
          }
        ],
        body: 'FooBar1a'
      }, {
        _id: this.postId2,
        subdocument: {
          body: 'SubdocumentFooBar2a'
        },
        nested: [
          {
            body: 'NestedFooBar2a'
          }
        ],
        body: 'FooBar2a'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3a'
        },
        nested: [
          {
            body: 'NestedFooBar3a'
          }
        ],
        body: 'FooBar3a'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }, {
        _id: this.postId5,
        subdocument: {
          body: 'SubdocumentFooBar5a'
        },
        nested: [
          {
            body: 'NestedFooBar5'
          }, {
            body: 'NestedFooBar5a'
          }, {
            body: 'NestedFooBar5'
          }
        ],
        body: 'FooBar5a'
      }
    ]);
    testSetEqual(test, this.person1.subdocumentPosts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1a'
        },
        nested: [
          {
            body: 'NestedFooBar1a'
          }
        ],
        body: 'FooBar1a'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3a'
        },
        nested: [
          {
            body: 'NestedFooBar3a'
          }
        ],
        body: 'FooBar3a'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }
    ]);
    testSetEqual(test, this.person1.subdocumentsPosts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1a'
        },
        nested: [
          {
            body: 'NestedFooBar1a'
          }
        ],
        body: 'FooBar1a'
      }, {
        _id: this.postId2,
        subdocument: {
          body: 'SubdocumentFooBar2a'
        },
        nested: [
          {
            body: 'NestedFooBar2a'
          }
        ],
        body: 'FooBar2a'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3a'
        },
        nested: [
          {
            body: 'NestedFooBar3a'
          }
        ],
        body: 'FooBar3a'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }
    ]);
    testSetEqual(test, this.person1.nestedPosts, [
      {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }
    ]);
    test.equal(_.omit(this.person2, 'posts', 'subdocumentPosts', 'subdocumentsPosts', 'nestedPosts'), {
      _id: this.person2Id,
      _schema: '1.0.0',
      username: 'person2',
      displayName: 'Person 2',
      count: 8
    });
    testSetEqual(test, this.person2.posts, []);
    testSetEqual(test, this.person2.subdocumentPosts, [
      {
        _id: this.postId2,
        subdocument: {
          body: 'SubdocumentFooBar2a'
        },
        nested: [
          {
            body: 'NestedFooBar2a'
          }
        ],
        body: 'FooBar2a'
      }
    ]);
    testSetEqual(test, this.person2.subdocumentsPosts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1a'
        },
        nested: [
          {
            body: 'NestedFooBar1a'
          }
        ],
        body: 'FooBar1a'
      }, {
        _id: this.postId2,
        subdocument: {
          body: 'SubdocumentFooBar2a'
        },
        nested: [
          {
            body: 'NestedFooBar2a'
          }
        ],
        body: 'FooBar2a'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3a'
        },
        nested: [
          {
            body: 'NestedFooBar3a'
          }
        ],
        body: 'FooBar3a'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }, {
        _id: this.postId5,
        subdocument: {
          body: 'SubdocumentFooBar5a'
        },
        nested: [
          {
            body: 'NestedFooBar5'
          }, {
            body: 'NestedFooBar5a'
          }, {
            body: 'NestedFooBar5'
          }
        ],
        body: 'FooBar5a'
      }
    ]);
    testSetEqual(test, this.person2.nestedPosts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1a'
        },
        nested: [
          {
            body: 'NestedFooBar1a'
          }
        ],
        body: 'FooBar1a'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }
    ]);
    test.equal(_.omit(this.person3, 'posts', 'subdocumentPosts', 'subdocumentsPosts', 'nestedPosts'), {
      _id: this.person3Id,
      _schema: '1.0.0',
      username: 'person3',
      displayName: 'Person 3',
      count: 9
    });
    testSetEqual(test, this.person3.posts, []);
    testSetEqual(test, this.person3.subdocumentPosts, [
      {
        _id: this.postId5,
        subdocument: {
          body: 'SubdocumentFooBar5a'
        },
        nested: [
          {
            body: 'NestedFooBar5'
          }, {
            body: 'NestedFooBar5a'
          }, {
            body: 'NestedFooBar5'
          }
        ],
        body: 'FooBar5a'
      }
    ]);
    testSetEqual(test, this.person3.subdocumentsPosts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1a'
        },
        nested: [
          {
            body: 'NestedFooBar1a'
          }
        ],
        body: 'FooBar1a'
      }, {
        _id: this.postId2,
        subdocument: {
          body: 'SubdocumentFooBar2a'
        },
        nested: [
          {
            body: 'NestedFooBar2a'
          }
        ],
        body: 'FooBar2a'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3a'
        },
        nested: [
          {
            body: 'NestedFooBar3a'
          }
        ],
        body: 'FooBar3a'
      }, {
        _id: this.postId5,
        subdocument: {
          body: 'SubdocumentFooBar5a'
        },
        nested: [
          {
            body: 'NestedFooBar5'
          }, {
            body: 'NestedFooBar5a'
          }, {
            body: 'NestedFooBar5'
          }
        ],
        body: 'FooBar5a'
      }
    ]);
    testSetEqual(test, this.person3.nestedPosts, [
      {
        _id: this.postId2,
        subdocument: {
          body: 'SubdocumentFooBar2a'
        },
        nested: [
          {
            body: 'NestedFooBar2a'
          }
        ],
        body: 'FooBar2a'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3a'
        },
        nested: [
          {
            body: 'NestedFooBar3a'
          }
        ],
        body: 'FooBar3a'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }, {
        _id: this.postId5,
        subdocument: {
          body: 'SubdocumentFooBar5a'
        },
        nested: [
          {
            body: 'NestedFooBar5'
          }, {
            body: 'NestedFooBar5a'
          }, {
            body: 'NestedFooBar5'
          }
        ],
        body: 'FooBar5a'
      }
    ]);
    Post.documents.update(this.postId2, {
      $push: {
        nested: {
          required: {
            _id: this.person3Id
          },
          body: 'NestedFooBarNew'
        }
      }
    }, expect((function(_this) {
      return function(error, res) {
        test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
        return test.isTrue(res);
      };
    })(this)));
    return Meteor.setTimeout(expect(), WAIT_TIME);
  }, function(test, expect) {
    this.post2 = Post.documents.findOne(this.postId2, {
      transform: null
    });
    test.equal(this.post2, {
      _id: this.postId2,
      _schema: '1.0.0',
      author: {
        _id: this.person1Id,
        username: 'person1',
        displayName: 'Person 1'
      },
      subdocument: {
        person: {
          _id: this.person2Id,
          displayName: 'Person 2',
          username: 'person2'
        },
        persons: [
          {
            _id: this.person2Id,
            displayName: 'Person 2',
            username: 'person2'
          }, {
            _id: this.person2Id,
            displayName: 'Person 2',
            username: 'person2'
          }, {
            _id: this.person2Id,
            displayName: 'Person 2',
            username: 'person2'
          }, {
            _id: this.person1Id,
            displayName: 'Person 1',
            username: 'person1'
          }, {
            _id: this.person2Id,
            displayName: 'Person 2',
            username: 'person2'
          }, {
            _id: this.person3Id,
            displayName: 'Person 3',
            username: 'person3'
          }
        ],
        slug: 'subdocument-prefix-foobar2a-subdocumentfoobar2a-suffix',
        body: 'SubdocumentFooBar2a'
      },
      nested: [
        {
          required: {
            _id: this.person3Id,
            username: 'person3',
            displayName: 'Person 3'
          },
          slug: 'nested-prefix-foobar2a-nestedfoobar2a-suffix',
          body: 'NestedFooBar2a'
        }, {
          required: {
            _id: this.person3Id,
            username: 'person3',
            displayName: 'Person 3'
          },
          slug: 'nested-prefix-foobar2a-nestedfoobarnew-suffix',
          body: 'NestedFooBarNew'
        }
      ],
      body: 'FooBar2a',
      slug: 'prefix-foobar2a-subdocumentfoobar2a-suffix',
      tags: ['tag-0-prefix-foobar2a-subdocumentfoobar2a-suffix', 'tag-1-prefix-foobar2a-nestedfoobar2a-suffix', 'tag-2-prefix-foobar2a-nestedfoobarnew-suffix']
    });
    this.person1 = Person.documents.findOne(this.person1Id, {
      transform: null
    });
    this.person2 = Person.documents.findOne(this.person2Id, {
      transform: null
    });
    this.person3 = Person.documents.findOne(this.person3Id, {
      transform: null
    });
    test.equal(_.omit(this.person1, 'posts', 'subdocumentPosts', 'subdocumentsPosts', 'nestedPosts'), {
      _id: this.person1Id,
      _schema: '1.0.0',
      username: 'person1',
      displayName: 'Person 1',
      count: 13
    });
    testSetEqual(test, this.person1.posts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1a'
        },
        nested: [
          {
            body: 'NestedFooBar1a'
          }
        ],
        body: 'FooBar1a'
      }, {
        _id: this.postId2,
        subdocument: {
          body: 'SubdocumentFooBar2a'
        },
        nested: [
          {
            body: 'NestedFooBar2a'
          }, {
            body: 'NestedFooBarNew'
          }
        ],
        body: 'FooBar2a'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3a'
        },
        nested: [
          {
            body: 'NestedFooBar3a'
          }
        ],
        body: 'FooBar3a'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }, {
        _id: this.postId5,
        subdocument: {
          body: 'SubdocumentFooBar5a'
        },
        nested: [
          {
            body: 'NestedFooBar5'
          }, {
            body: 'NestedFooBar5a'
          }, {
            body: 'NestedFooBar5'
          }
        ],
        body: 'FooBar5a'
      }
    ]);
    testSetEqual(test, this.person1.subdocumentPosts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1a'
        },
        nested: [
          {
            body: 'NestedFooBar1a'
          }
        ],
        body: 'FooBar1a'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3a'
        },
        nested: [
          {
            body: 'NestedFooBar3a'
          }
        ],
        body: 'FooBar3a'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }
    ]);
    testSetEqual(test, this.person1.subdocumentsPosts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1a'
        },
        nested: [
          {
            body: 'NestedFooBar1a'
          }
        ],
        body: 'FooBar1a'
      }, {
        _id: this.postId2,
        subdocument: {
          body: 'SubdocumentFooBar2a'
        },
        nested: [
          {
            body: 'NestedFooBar2a'
          }, {
            body: 'NestedFooBarNew'
          }
        ],
        body: 'FooBar2a'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3a'
        },
        nested: [
          {
            body: 'NestedFooBar3a'
          }
        ],
        body: 'FooBar3a'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }
    ]);
    testSetEqual(test, this.person1.nestedPosts, [
      {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }
    ]);
    test.equal(_.omit(this.person2, 'posts', 'subdocumentPosts', 'subdocumentsPosts', 'nestedPosts'), {
      _id: this.person2Id,
      _schema: '1.0.0',
      username: 'person2',
      displayName: 'Person 2',
      count: 8
    });
    testSetEqual(test, this.person2.posts, []);
    testSetEqual(test, this.person2.subdocumentPosts, [
      {
        _id: this.postId2,
        subdocument: {
          body: 'SubdocumentFooBar2a'
        },
        nested: [
          {
            body: 'NestedFooBar2a'
          }, {
            body: 'NestedFooBarNew'
          }
        ],
        body: 'FooBar2a'
      }
    ]);
    testSetEqual(test, this.person2.subdocumentsPosts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1a'
        },
        nested: [
          {
            body: 'NestedFooBar1a'
          }
        ],
        body: 'FooBar1a'
      }, {
        _id: this.postId2,
        subdocument: {
          body: 'SubdocumentFooBar2a'
        },
        nested: [
          {
            body: 'NestedFooBar2a'
          }, {
            body: 'NestedFooBarNew'
          }
        ],
        body: 'FooBar2a'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3a'
        },
        nested: [
          {
            body: 'NestedFooBar3a'
          }
        ],
        body: 'FooBar3a'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }, {
        _id: this.postId5,
        subdocument: {
          body: 'SubdocumentFooBar5a'
        },
        nested: [
          {
            body: 'NestedFooBar5'
          }, {
            body: 'NestedFooBar5a'
          }, {
            body: 'NestedFooBar5'
          }
        ],
        body: 'FooBar5a'
      }
    ]);
    testSetEqual(test, this.person2.nestedPosts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1a'
        },
        nested: [
          {
            body: 'NestedFooBar1a'
          }
        ],
        body: 'FooBar1a'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }
    ]);
    test.equal(_.omit(this.person3, 'posts', 'subdocumentPosts', 'subdocumentsPosts', 'nestedPosts'), {
      _id: this.person3Id,
      _schema: '1.0.0',
      username: 'person3',
      displayName: 'Person 3',
      count: 9
    });
    testSetEqual(test, this.person3.posts, []);
    testSetEqual(test, this.person3.subdocumentPosts, [
      {
        _id: this.postId5,
        subdocument: {
          body: 'SubdocumentFooBar5a'
        },
        nested: [
          {
            body: 'NestedFooBar5'
          }, {
            body: 'NestedFooBar5a'
          }, {
            body: 'NestedFooBar5'
          }
        ],
        body: 'FooBar5a'
      }
    ]);
    testSetEqual(test, this.person3.subdocumentsPosts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1a'
        },
        nested: [
          {
            body: 'NestedFooBar1a'
          }
        ],
        body: 'FooBar1a'
      }, {
        _id: this.postId2,
        subdocument: {
          body: 'SubdocumentFooBar2a'
        },
        nested: [
          {
            body: 'NestedFooBar2a'
          }, {
            body: 'NestedFooBarNew'
          }
        ],
        body: 'FooBar2a'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3a'
        },
        nested: [
          {
            body: 'NestedFooBar3a'
          }
        ],
        body: 'FooBar3a'
      }, {
        _id: this.postId5,
        subdocument: {
          body: 'SubdocumentFooBar5a'
        },
        nested: [
          {
            body: 'NestedFooBar5'
          }, {
            body: 'NestedFooBar5a'
          }, {
            body: 'NestedFooBar5'
          }
        ],
        body: 'FooBar5a'
      }
    ]);
    testSetEqual(test, this.person3.nestedPosts, [
      {
        _id: this.postId2,
        subdocument: {
          body: 'SubdocumentFooBar2a'
        },
        nested: [
          {
            body: 'NestedFooBar2a'
          }, {
            body: 'NestedFooBarNew'
          }
        ],
        body: 'FooBar2a'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3a'
        },
        nested: [
          {
            body: 'NestedFooBar3a'
          }
        ],
        body: 'FooBar3a'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }, {
        _id: this.postId5,
        subdocument: {
          body: 'SubdocumentFooBar5a'
        },
        nested: [
          {
            body: 'NestedFooBar5'
          }, {
            body: 'NestedFooBar5a'
          }, {
            body: 'NestedFooBar5'
          }
        ],
        body: 'FooBar5a'
      }
    ]);
    Post.documents.update(this.postId2, {
      $pop: {
        nested: 1
      }
    }, expect((function(_this) {
      return function(error, res) {
        test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
        return test.isTrue(res);
      };
    })(this)));
    return Meteor.setTimeout(expect(), WAIT_TIME);
  }, function(test, expect) {
    this.post2 = Post.documents.findOne(this.postId2, {
      transform: null
    });
    test.equal(this.post2, {
      _id: this.postId2,
      _schema: '1.0.0',
      author: {
        _id: this.person1Id,
        username: 'person1',
        displayName: 'Person 1'
      },
      subdocument: {
        person: {
          _id: this.person2Id,
          displayName: 'Person 2',
          username: 'person2'
        },
        persons: [
          {
            _id: this.person2Id,
            displayName: 'Person 2',
            username: 'person2'
          }, {
            _id: this.person2Id,
            displayName: 'Person 2',
            username: 'person2'
          }, {
            _id: this.person2Id,
            displayName: 'Person 2',
            username: 'person2'
          }, {
            _id: this.person1Id,
            displayName: 'Person 1',
            username: 'person1'
          }, {
            _id: this.person2Id,
            displayName: 'Person 2',
            username: 'person2'
          }, {
            _id: this.person3Id,
            displayName: 'Person 3',
            username: 'person3'
          }
        ],
        slug: 'subdocument-prefix-foobar2a-subdocumentfoobar2a-suffix',
        body: 'SubdocumentFooBar2a'
      },
      nested: [
        {
          required: {
            _id: this.person3Id,
            username: 'person3',
            displayName: 'Person 3'
          },
          slug: 'nested-prefix-foobar2a-nestedfoobar2a-suffix',
          body: 'NestedFooBar2a'
        }
      ],
      body: 'FooBar2a',
      slug: 'prefix-foobar2a-subdocumentfoobar2a-suffix',
      tags: ['tag-0-prefix-foobar2a-subdocumentfoobar2a-suffix', 'tag-1-prefix-foobar2a-nestedfoobar2a-suffix']
    });
    this.person1 = Person.documents.findOne(this.person1Id, {
      transform: null
    });
    this.person2 = Person.documents.findOne(this.person2Id, {
      transform: null
    });
    this.person3 = Person.documents.findOne(this.person3Id, {
      transform: null
    });
    test.equal(_.omit(this.person1, 'posts', 'subdocumentPosts', 'subdocumentsPosts', 'nestedPosts'), {
      _id: this.person1Id,
      _schema: '1.0.0',
      username: 'person1',
      displayName: 'Person 1',
      count: 13
    });
    testSetEqual(test, this.person1.posts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1a'
        },
        nested: [
          {
            body: 'NestedFooBar1a'
          }
        ],
        body: 'FooBar1a'
      }, {
        _id: this.postId2,
        subdocument: {
          body: 'SubdocumentFooBar2a'
        },
        nested: [
          {
            body: 'NestedFooBar2a'
          }
        ],
        body: 'FooBar2a'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3a'
        },
        nested: [
          {
            body: 'NestedFooBar3a'
          }
        ],
        body: 'FooBar3a'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }, {
        _id: this.postId5,
        subdocument: {
          body: 'SubdocumentFooBar5a'
        },
        nested: [
          {
            body: 'NestedFooBar5'
          }, {
            body: 'NestedFooBar5a'
          }, {
            body: 'NestedFooBar5'
          }
        ],
        body: 'FooBar5a'
      }
    ]);
    testSetEqual(test, this.person1.subdocumentPosts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1a'
        },
        nested: [
          {
            body: 'NestedFooBar1a'
          }
        ],
        body: 'FooBar1a'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3a'
        },
        nested: [
          {
            body: 'NestedFooBar3a'
          }
        ],
        body: 'FooBar3a'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }
    ]);
    testSetEqual(test, this.person1.subdocumentsPosts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1a'
        },
        nested: [
          {
            body: 'NestedFooBar1a'
          }
        ],
        body: 'FooBar1a'
      }, {
        _id: this.postId2,
        subdocument: {
          body: 'SubdocumentFooBar2a'
        },
        nested: [
          {
            body: 'NestedFooBar2a'
          }
        ],
        body: 'FooBar2a'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3a'
        },
        nested: [
          {
            body: 'NestedFooBar3a'
          }
        ],
        body: 'FooBar3a'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }
    ]);
    testSetEqual(test, this.person1.nestedPosts, [
      {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }
    ]);
    test.equal(_.omit(this.person2, 'posts', 'subdocumentPosts', 'subdocumentsPosts', 'nestedPosts'), {
      _id: this.person2Id,
      _schema: '1.0.0',
      username: 'person2',
      displayName: 'Person 2',
      count: 8
    });
    testSetEqual(test, this.person2.posts, []);
    testSetEqual(test, this.person2.subdocumentPosts, [
      {
        _id: this.postId2,
        subdocument: {
          body: 'SubdocumentFooBar2a'
        },
        nested: [
          {
            body: 'NestedFooBar2a'
          }
        ],
        body: 'FooBar2a'
      }
    ]);
    testSetEqual(test, this.person2.subdocumentsPosts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1a'
        },
        nested: [
          {
            body: 'NestedFooBar1a'
          }
        ],
        body: 'FooBar1a'
      }, {
        _id: this.postId2,
        subdocument: {
          body: 'SubdocumentFooBar2a'
        },
        nested: [
          {
            body: 'NestedFooBar2a'
          }
        ],
        body: 'FooBar2a'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3a'
        },
        nested: [
          {
            body: 'NestedFooBar3a'
          }
        ],
        body: 'FooBar3a'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }, {
        _id: this.postId5,
        subdocument: {
          body: 'SubdocumentFooBar5a'
        },
        nested: [
          {
            body: 'NestedFooBar5'
          }, {
            body: 'NestedFooBar5a'
          }, {
            body: 'NestedFooBar5'
          }
        ],
        body: 'FooBar5a'
      }
    ]);
    testSetEqual(test, this.person2.nestedPosts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1a'
        },
        nested: [
          {
            body: 'NestedFooBar1a'
          }
        ],
        body: 'FooBar1a'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }
    ]);
    test.equal(_.omit(this.person3, 'posts', 'subdocumentPosts', 'subdocumentsPosts', 'nestedPosts'), {
      _id: this.person3Id,
      _schema: '1.0.0',
      username: 'person3',
      displayName: 'Person 3',
      count: 9
    });
    testSetEqual(test, this.person3.posts, []);
    testSetEqual(test, this.person3.subdocumentPosts, [
      {
        _id: this.postId5,
        subdocument: {
          body: 'SubdocumentFooBar5a'
        },
        nested: [
          {
            body: 'NestedFooBar5'
          }, {
            body: 'NestedFooBar5a'
          }, {
            body: 'NestedFooBar5'
          }
        ],
        body: 'FooBar5a'
      }
    ]);
    testSetEqual(test, this.person3.subdocumentsPosts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1a'
        },
        nested: [
          {
            body: 'NestedFooBar1a'
          }
        ],
        body: 'FooBar1a'
      }, {
        _id: this.postId2,
        subdocument: {
          body: 'SubdocumentFooBar2a'
        },
        nested: [
          {
            body: 'NestedFooBar2a'
          }
        ],
        body: 'FooBar2a'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3a'
        },
        nested: [
          {
            body: 'NestedFooBar3a'
          }
        ],
        body: 'FooBar3a'
      }, {
        _id: this.postId5,
        subdocument: {
          body: 'SubdocumentFooBar5a'
        },
        nested: [
          {
            body: 'NestedFooBar5'
          }, {
            body: 'NestedFooBar5a'
          }, {
            body: 'NestedFooBar5'
          }
        ],
        body: 'FooBar5a'
      }
    ]);
    testSetEqual(test, this.person3.nestedPosts, [
      {
        _id: this.postId2,
        subdocument: {
          body: 'SubdocumentFooBar2a'
        },
        nested: [
          {
            body: 'NestedFooBar2a'
          }
        ],
        body: 'FooBar2a'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3a'
        },
        nested: [
          {
            body: 'NestedFooBar3a'
          }
        ],
        body: 'FooBar3a'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }, {
        _id: this.postId5,
        subdocument: {
          body: 'SubdocumentFooBar5a'
        },
        nested: [
          {
            body: 'NestedFooBar5'
          }, {
            body: 'NestedFooBar5a'
          }, {
            body: 'NestedFooBar5'
          }
        ],
        body: 'FooBar5a'
      }
    ]);
    Post.documents.update(this.postId5, {
      $set: {
        'nested.0.required._id': this.person2Id
      }
    }, expect((function(_this) {
      return function(error, res) {
        test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
        return test.isTrue(res);
      };
    })(this)));
    return Meteor.setTimeout(expect(), WAIT_TIME);
  }, function(test, expect) {
    this.post5 = Post.documents.findOne(this.postId5, {
      transform: null
    });
    test.equal(this.post5, {
      _id: this.postId5,
      _schema: '1.0.0',
      author: {
        _id: this.person1Id,
        username: 'person1',
        displayName: 'Person 1'
      },
      subdocument: {
        person: {
          _id: this.person3Id,
          displayName: 'Person 3',
          username: 'person3'
        },
        persons: [
          {
            _id: this.person3Id,
            displayName: 'Person 3',
            username: 'person3'
          }, {
            _id: this.person3Id,
            displayName: 'Person 3',
            username: 'person3'
          }, {
            _id: this.person3Id,
            displayName: 'Person 3',
            username: 'person3'
          }, {
            _id: this.person3Id,
            displayName: 'Person 3',
            username: 'person3'
          }, {
            _id: this.person2Id,
            displayName: 'Person 2',
            username: 'person2'
          }, {
            _id: this.person3Id,
            displayName: 'Person 3',
            username: 'person3'
          }
        ],
        slug: 'subdocument-prefix-foobar5a-subdocumentfoobar5a-suffix',
        body: 'SubdocumentFooBar5a'
      },
      nested: [
        {
          required: {
            _id: this.person2Id,
            username: 'person2',
            displayName: 'Person 2'
          },
          slug: 'nested-prefix-foobar5a-nestedfoobar5-suffix',
          body: 'NestedFooBar5'
        }, {
          required: {
            _id: this.person3Id,
            username: 'person3',
            displayName: 'Person 3'
          },
          slug: 'nested-prefix-foobar5a-nestedfoobar5a-suffix',
          body: 'NestedFooBar5a'
        }, {
          required: {
            _id: this.person3Id,
            username: 'person3',
            displayName: 'Person 3'
          },
          slug: 'nested-prefix-foobar5a-nestedfoobar5-suffix',
          body: 'NestedFooBar5'
        }
      ],
      body: 'FooBar5a',
      slug: 'prefix-foobar5a-subdocumentfoobar5a-suffix',
      tags: ['tag-0-prefix-foobar5a-subdocumentfoobar5a-suffix', 'tag-1-prefix-foobar5a-nestedfoobar5-suffix', 'tag-2-prefix-foobar5a-nestedfoobar5a-suffix', 'tag-3-prefix-foobar5a-nestedfoobar5-suffix']
    });
    this.person1 = Person.documents.findOne(this.person1Id, {
      transform: null
    });
    this.person2 = Person.documents.findOne(this.person2Id, {
      transform: null
    });
    this.person3 = Person.documents.findOne(this.person3Id, {
      transform: null
    });
    test.equal(_.omit(this.person1, 'posts', 'subdocumentPosts', 'subdocumentsPosts', 'nestedPosts'), {
      _id: this.person1Id,
      _schema: '1.0.0',
      username: 'person1',
      displayName: 'Person 1',
      count: 13
    });
    testSetEqual(test, this.person1.posts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1a'
        },
        nested: [
          {
            body: 'NestedFooBar1a'
          }
        ],
        body: 'FooBar1a'
      }, {
        _id: this.postId2,
        subdocument: {
          body: 'SubdocumentFooBar2a'
        },
        nested: [
          {
            body: 'NestedFooBar2a'
          }
        ],
        body: 'FooBar2a'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3a'
        },
        nested: [
          {
            body: 'NestedFooBar3a'
          }
        ],
        body: 'FooBar3a'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }, {
        _id: this.postId5,
        subdocument: {
          body: 'SubdocumentFooBar5a'
        },
        nested: [
          {
            body: 'NestedFooBar5'
          }, {
            body: 'NestedFooBar5a'
          }, {
            body: 'NestedFooBar5'
          }
        ],
        body: 'FooBar5a'
      }
    ]);
    testSetEqual(test, this.person1.subdocumentPosts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1a'
        },
        nested: [
          {
            body: 'NestedFooBar1a'
          }
        ],
        body: 'FooBar1a'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3a'
        },
        nested: [
          {
            body: 'NestedFooBar3a'
          }
        ],
        body: 'FooBar3a'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }
    ]);
    testSetEqual(test, this.person1.subdocumentsPosts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1a'
        },
        nested: [
          {
            body: 'NestedFooBar1a'
          }
        ],
        body: 'FooBar1a'
      }, {
        _id: this.postId2,
        subdocument: {
          body: 'SubdocumentFooBar2a'
        },
        nested: [
          {
            body: 'NestedFooBar2a'
          }
        ],
        body: 'FooBar2a'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3a'
        },
        nested: [
          {
            body: 'NestedFooBar3a'
          }
        ],
        body: 'FooBar3a'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }
    ]);
    testSetEqual(test, this.person1.nestedPosts, [
      {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }
    ]);
    test.equal(_.omit(this.person2, 'posts', 'subdocumentPosts', 'subdocumentsPosts', 'nestedPosts'), {
      _id: this.person2Id,
      _schema: '1.0.0',
      username: 'person2',
      displayName: 'Person 2',
      count: 9
    });
    testSetEqual(test, this.person2.posts, []);
    testSetEqual(test, this.person2.subdocumentPosts, [
      {
        _id: this.postId2,
        subdocument: {
          body: 'SubdocumentFooBar2a'
        },
        nested: [
          {
            body: 'NestedFooBar2a'
          }
        ],
        body: 'FooBar2a'
      }
    ]);
    testSetEqual(test, this.person2.subdocumentsPosts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1a'
        },
        nested: [
          {
            body: 'NestedFooBar1a'
          }
        ],
        body: 'FooBar1a'
      }, {
        _id: this.postId2,
        subdocument: {
          body: 'SubdocumentFooBar2a'
        },
        nested: [
          {
            body: 'NestedFooBar2a'
          }
        ],
        body: 'FooBar2a'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3a'
        },
        nested: [
          {
            body: 'NestedFooBar3a'
          }
        ],
        body: 'FooBar3a'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }, {
        _id: this.postId5,
        subdocument: {
          body: 'SubdocumentFooBar5a'
        },
        nested: [
          {
            body: 'NestedFooBar5'
          }, {
            body: 'NestedFooBar5a'
          }, {
            body: 'NestedFooBar5'
          }
        ],
        body: 'FooBar5a'
      }
    ]);
    testSetEqual(test, this.person2.nestedPosts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1a'
        },
        nested: [
          {
            body: 'NestedFooBar1a'
          }
        ],
        body: 'FooBar1a'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }, {
        _id: this.postId5,
        subdocument: {
          body: 'SubdocumentFooBar5a'
        },
        nested: [
          {
            body: 'NestedFooBar5'
          }, {
            body: 'NestedFooBar5a'
          }, {
            body: 'NestedFooBar5'
          }
        ],
        body: 'FooBar5a'
      }
    ]);
    test.equal(_.omit(this.person3, 'posts', 'subdocumentPosts', 'subdocumentsPosts', 'nestedPosts'), {
      _id: this.person3Id,
      _schema: '1.0.0',
      username: 'person3',
      displayName: 'Person 3',
      count: 9
    });
    testSetEqual(test, this.person3.posts, []);
    testSetEqual(test, this.person3.subdocumentPosts, [
      {
        _id: this.postId5,
        subdocument: {
          body: 'SubdocumentFooBar5a'
        },
        nested: [
          {
            body: 'NestedFooBar5'
          }, {
            body: 'NestedFooBar5a'
          }, {
            body: 'NestedFooBar5'
          }
        ],
        body: 'FooBar5a'
      }
    ]);
    testSetEqual(test, this.person3.subdocumentsPosts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1a'
        },
        nested: [
          {
            body: 'NestedFooBar1a'
          }
        ],
        body: 'FooBar1a'
      }, {
        _id: this.postId2,
        subdocument: {
          body: 'SubdocumentFooBar2a'
        },
        nested: [
          {
            body: 'NestedFooBar2a'
          }
        ],
        body: 'FooBar2a'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3a'
        },
        nested: [
          {
            body: 'NestedFooBar3a'
          }
        ],
        body: 'FooBar3a'
      }, {
        _id: this.postId5,
        subdocument: {
          body: 'SubdocumentFooBar5a'
        },
        nested: [
          {
            body: 'NestedFooBar5'
          }, {
            body: 'NestedFooBar5a'
          }, {
            body: 'NestedFooBar5'
          }
        ],
        body: 'FooBar5a'
      }
    ]);
    testSetEqual(test, this.person3.nestedPosts, [
      {
        _id: this.postId2,
        subdocument: {
          body: 'SubdocumentFooBar2a'
        },
        nested: [
          {
            body: 'NestedFooBar2a'
          }
        ],
        body: 'FooBar2a'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3a'
        },
        nested: [
          {
            body: 'NestedFooBar3a'
          }
        ],
        body: 'FooBar3a'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }, {
        _id: this.postId5,
        subdocument: {
          body: 'SubdocumentFooBar5a'
        },
        nested: [
          {
            body: 'NestedFooBar5'
          }, {
            body: 'NestedFooBar5a'
          }, {
            body: 'NestedFooBar5'
          }
        ],
        body: 'FooBar5a'
      }
    ]);
    Post.documents.update(this.postId5, {
      $set: {
        'nested.0.required._id': this.person3Id
      }
    }, expect((function(_this) {
      return function(error, res) {
        test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
        return test.isTrue(res);
      };
    })(this)));
    return Meteor.setTimeout(expect(), WAIT_TIME);
  }, function(test, expect) {
    this.post5 = Post.documents.findOne(this.postId5, {
      transform: null
    });
    test.equal(this.post5, {
      _id: this.postId5,
      _schema: '1.0.0',
      author: {
        _id: this.person1Id,
        username: 'person1',
        displayName: 'Person 1'
      },
      subdocument: {
        person: {
          _id: this.person3Id,
          displayName: 'Person 3',
          username: 'person3'
        },
        persons: [
          {
            _id: this.person3Id,
            displayName: 'Person 3',
            username: 'person3'
          }, {
            _id: this.person3Id,
            displayName: 'Person 3',
            username: 'person3'
          }, {
            _id: this.person3Id,
            displayName: 'Person 3',
            username: 'person3'
          }, {
            _id: this.person3Id,
            displayName: 'Person 3',
            username: 'person3'
          }, {
            _id: this.person2Id,
            displayName: 'Person 2',
            username: 'person2'
          }, {
            _id: this.person3Id,
            displayName: 'Person 3',
            username: 'person3'
          }
        ],
        slug: 'subdocument-prefix-foobar5a-subdocumentfoobar5a-suffix',
        body: 'SubdocumentFooBar5a'
      },
      nested: [
        {
          required: {
            _id: this.person3Id,
            username: 'person3',
            displayName: 'Person 3'
          },
          slug: 'nested-prefix-foobar5a-nestedfoobar5-suffix',
          body: 'NestedFooBar5'
        }, {
          required: {
            _id: this.person3Id,
            username: 'person3',
            displayName: 'Person 3'
          },
          slug: 'nested-prefix-foobar5a-nestedfoobar5a-suffix',
          body: 'NestedFooBar5a'
        }, {
          required: {
            _id: this.person3Id,
            username: 'person3',
            displayName: 'Person 3'
          },
          slug: 'nested-prefix-foobar5a-nestedfoobar5-suffix',
          body: 'NestedFooBar5'
        }
      ],
      body: 'FooBar5a',
      slug: 'prefix-foobar5a-subdocumentfoobar5a-suffix',
      tags: ['tag-0-prefix-foobar5a-subdocumentfoobar5a-suffix', 'tag-1-prefix-foobar5a-nestedfoobar5-suffix', 'tag-2-prefix-foobar5a-nestedfoobar5a-suffix', 'tag-3-prefix-foobar5a-nestedfoobar5-suffix']
    });
    this.person1 = Person.documents.findOne(this.person1Id, {
      transform: null
    });
    this.person2 = Person.documents.findOne(this.person2Id, {
      transform: null
    });
    this.person3 = Person.documents.findOne(this.person3Id, {
      transform: null
    });
    test.equal(_.omit(this.person1, 'posts', 'subdocumentPosts', 'subdocumentsPosts', 'nestedPosts'), {
      _id: this.person1Id,
      _schema: '1.0.0',
      username: 'person1',
      displayName: 'Person 1',
      count: 13
    });
    testSetEqual(test, this.person1.posts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1a'
        },
        nested: [
          {
            body: 'NestedFooBar1a'
          }
        ],
        body: 'FooBar1a'
      }, {
        _id: this.postId2,
        subdocument: {
          body: 'SubdocumentFooBar2a'
        },
        nested: [
          {
            body: 'NestedFooBar2a'
          }
        ],
        body: 'FooBar2a'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3a'
        },
        nested: [
          {
            body: 'NestedFooBar3a'
          }
        ],
        body: 'FooBar3a'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }, {
        _id: this.postId5,
        subdocument: {
          body: 'SubdocumentFooBar5a'
        },
        nested: [
          {
            body: 'NestedFooBar5'
          }, {
            body: 'NestedFooBar5a'
          }, {
            body: 'NestedFooBar5'
          }
        ],
        body: 'FooBar5a'
      }
    ]);
    testSetEqual(test, this.person1.subdocumentPosts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1a'
        },
        nested: [
          {
            body: 'NestedFooBar1a'
          }
        ],
        body: 'FooBar1a'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3a'
        },
        nested: [
          {
            body: 'NestedFooBar3a'
          }
        ],
        body: 'FooBar3a'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }
    ]);
    testSetEqual(test, this.person1.subdocumentsPosts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1a'
        },
        nested: [
          {
            body: 'NestedFooBar1a'
          }
        ],
        body: 'FooBar1a'
      }, {
        _id: this.postId2,
        subdocument: {
          body: 'SubdocumentFooBar2a'
        },
        nested: [
          {
            body: 'NestedFooBar2a'
          }
        ],
        body: 'FooBar2a'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3a'
        },
        nested: [
          {
            body: 'NestedFooBar3a'
          }
        ],
        body: 'FooBar3a'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }
    ]);
    testSetEqual(test, this.person1.nestedPosts, [
      {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }
    ]);
    test.equal(_.omit(this.person2, 'posts', 'subdocumentPosts', 'subdocumentsPosts', 'nestedPosts'), {
      _id: this.person2Id,
      _schema: '1.0.0',
      username: 'person2',
      displayName: 'Person 2',
      count: 8
    });
    testSetEqual(test, this.person2.posts, []);
    testSetEqual(test, this.person2.subdocumentPosts, [
      {
        _id: this.postId2,
        subdocument: {
          body: 'SubdocumentFooBar2a'
        },
        nested: [
          {
            body: 'NestedFooBar2a'
          }
        ],
        body: 'FooBar2a'
      }
    ]);
    testSetEqual(test, this.person2.subdocumentsPosts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1a'
        },
        nested: [
          {
            body: 'NestedFooBar1a'
          }
        ],
        body: 'FooBar1a'
      }, {
        _id: this.postId2,
        subdocument: {
          body: 'SubdocumentFooBar2a'
        },
        nested: [
          {
            body: 'NestedFooBar2a'
          }
        ],
        body: 'FooBar2a'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3a'
        },
        nested: [
          {
            body: 'NestedFooBar3a'
          }
        ],
        body: 'FooBar3a'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }, {
        _id: this.postId5,
        subdocument: {
          body: 'SubdocumentFooBar5a'
        },
        nested: [
          {
            body: 'NestedFooBar5'
          }, {
            body: 'NestedFooBar5a'
          }, {
            body: 'NestedFooBar5'
          }
        ],
        body: 'FooBar5a'
      }
    ]);
    testSetEqual(test, this.person2.nestedPosts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1a'
        },
        nested: [
          {
            body: 'NestedFooBar1a'
          }
        ],
        body: 'FooBar1a'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }
    ]);
    test.equal(_.omit(this.person3, 'posts', 'subdocumentPosts', 'subdocumentsPosts', 'nestedPosts'), {
      _id: this.person3Id,
      _schema: '1.0.0',
      username: 'person3',
      displayName: 'Person 3',
      count: 9
    });
    testSetEqual(test, this.person3.posts, []);
    testSetEqual(test, this.person3.subdocumentPosts, [
      {
        _id: this.postId5,
        subdocument: {
          body: 'SubdocumentFooBar5a'
        },
        nested: [
          {
            body: 'NestedFooBar5'
          }, {
            body: 'NestedFooBar5a'
          }, {
            body: 'NestedFooBar5'
          }
        ],
        body: 'FooBar5a'
      }
    ]);
    testSetEqual(test, this.person3.subdocumentsPosts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1a'
        },
        nested: [
          {
            body: 'NestedFooBar1a'
          }
        ],
        body: 'FooBar1a'
      }, {
        _id: this.postId2,
        subdocument: {
          body: 'SubdocumentFooBar2a'
        },
        nested: [
          {
            body: 'NestedFooBar2a'
          }
        ],
        body: 'FooBar2a'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3a'
        },
        nested: [
          {
            body: 'NestedFooBar3a'
          }
        ],
        body: 'FooBar3a'
      }, {
        _id: this.postId5,
        subdocument: {
          body: 'SubdocumentFooBar5a'
        },
        nested: [
          {
            body: 'NestedFooBar5'
          }, {
            body: 'NestedFooBar5a'
          }, {
            body: 'NestedFooBar5'
          }
        ],
        body: 'FooBar5a'
      }
    ]);
    testSetEqual(test, this.person3.nestedPosts, [
      {
        _id: this.postId2,
        subdocument: {
          body: 'SubdocumentFooBar2a'
        },
        nested: [
          {
            body: 'NestedFooBar2a'
          }
        ],
        body: 'FooBar2a'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3a'
        },
        nested: [
          {
            body: 'NestedFooBar3a'
          }
        ],
        body: 'FooBar3a'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }, {
        _id: this.postId5,
        subdocument: {
          body: 'SubdocumentFooBar5a'
        },
        nested: [
          {
            body: 'NestedFooBar5'
          }, {
            body: 'NestedFooBar5a'
          }, {
            body: 'NestedFooBar5'
          }
        ],
        body: 'FooBar5a'
      }
    ]);
    Post.documents.update(this.postId5, {
      $push: {
        'subdocument.persons': {
          _id: this.person1Id
        }
      }
    }, expect((function(_this) {
      return function(error, res) {
        test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
        return test.isTrue(res);
      };
    })(this)));
    return Meteor.setTimeout(expect(), WAIT_TIME);
  }, function(test, expect) {
    this.post5 = Post.documents.findOne(this.postId5, {
      transform: null
    });
    test.equal(this.post5, {
      _id: this.postId5,
      _schema: '1.0.0',
      author: {
        _id: this.person1Id,
        username: 'person1',
        displayName: 'Person 1'
      },
      subdocument: {
        person: {
          _id: this.person3Id,
          displayName: 'Person 3',
          username: 'person3'
        },
        persons: [
          {
            _id: this.person3Id,
            displayName: 'Person 3',
            username: 'person3'
          }, {
            _id: this.person3Id,
            displayName: 'Person 3',
            username: 'person3'
          }, {
            _id: this.person3Id,
            displayName: 'Person 3',
            username: 'person3'
          }, {
            _id: this.person3Id,
            displayName: 'Person 3',
            username: 'person3'
          }, {
            _id: this.person2Id,
            displayName: 'Person 2',
            username: 'person2'
          }, {
            _id: this.person3Id,
            displayName: 'Person 3',
            username: 'person3'
          }, {
            _id: this.person1Id,
            displayName: 'Person 1',
            username: 'person1'
          }
        ],
        slug: 'subdocument-prefix-foobar5a-subdocumentfoobar5a-suffix',
        body: 'SubdocumentFooBar5a'
      },
      nested: [
        {
          required: {
            _id: this.person3Id,
            username: 'person3',
            displayName: 'Person 3'
          },
          slug: 'nested-prefix-foobar5a-nestedfoobar5-suffix',
          body: 'NestedFooBar5'
        }, {
          required: {
            _id: this.person3Id,
            username: 'person3',
            displayName: 'Person 3'
          },
          slug: 'nested-prefix-foobar5a-nestedfoobar5a-suffix',
          body: 'NestedFooBar5a'
        }, {
          required: {
            _id: this.person3Id,
            username: 'person3',
            displayName: 'Person 3'
          },
          slug: 'nested-prefix-foobar5a-nestedfoobar5-suffix',
          body: 'NestedFooBar5'
        }
      ],
      body: 'FooBar5a',
      slug: 'prefix-foobar5a-subdocumentfoobar5a-suffix',
      tags: ['tag-0-prefix-foobar5a-subdocumentfoobar5a-suffix', 'tag-1-prefix-foobar5a-nestedfoobar5-suffix', 'tag-2-prefix-foobar5a-nestedfoobar5a-suffix', 'tag-3-prefix-foobar5a-nestedfoobar5-suffix']
    });
    this.person1 = Person.documents.findOne(this.person1Id, {
      transform: null
    });
    this.person2 = Person.documents.findOne(this.person2Id, {
      transform: null
    });
    this.person3 = Person.documents.findOne(this.person3Id, {
      transform: null
    });
    test.equal(_.omit(this.person1, 'posts', 'subdocumentPosts', 'subdocumentsPosts', 'nestedPosts'), {
      _id: this.person1Id,
      _schema: '1.0.0',
      username: 'person1',
      displayName: 'Person 1',
      count: 14
    });
    testSetEqual(test, this.person1.posts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1a'
        },
        nested: [
          {
            body: 'NestedFooBar1a'
          }
        ],
        body: 'FooBar1a'
      }, {
        _id: this.postId2,
        subdocument: {
          body: 'SubdocumentFooBar2a'
        },
        nested: [
          {
            body: 'NestedFooBar2a'
          }
        ],
        body: 'FooBar2a'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3a'
        },
        nested: [
          {
            body: 'NestedFooBar3a'
          }
        ],
        body: 'FooBar3a'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }, {
        _id: this.postId5,
        subdocument: {
          body: 'SubdocumentFooBar5a'
        },
        nested: [
          {
            body: 'NestedFooBar5'
          }, {
            body: 'NestedFooBar5a'
          }, {
            body: 'NestedFooBar5'
          }
        ],
        body: 'FooBar5a'
      }
    ]);
    testSetEqual(test, this.person1.subdocumentPosts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1a'
        },
        nested: [
          {
            body: 'NestedFooBar1a'
          }
        ],
        body: 'FooBar1a'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3a'
        },
        nested: [
          {
            body: 'NestedFooBar3a'
          }
        ],
        body: 'FooBar3a'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }
    ]);
    testSetEqual(test, this.person1.subdocumentsPosts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1a'
        },
        nested: [
          {
            body: 'NestedFooBar1a'
          }
        ],
        body: 'FooBar1a'
      }, {
        _id: this.postId2,
        subdocument: {
          body: 'SubdocumentFooBar2a'
        },
        nested: [
          {
            body: 'NestedFooBar2a'
          }
        ],
        body: 'FooBar2a'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3a'
        },
        nested: [
          {
            body: 'NestedFooBar3a'
          }
        ],
        body: 'FooBar3a'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }, {
        _id: this.postId5,
        subdocument: {
          body: 'SubdocumentFooBar5a'
        },
        nested: [
          {
            body: 'NestedFooBar5'
          }, {
            body: 'NestedFooBar5a'
          }, {
            body: 'NestedFooBar5'
          }
        ],
        body: 'FooBar5a'
      }
    ]);
    testSetEqual(test, this.person1.nestedPosts, [
      {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }
    ]);
    test.equal(_.omit(this.person2, 'posts', 'subdocumentPosts', 'subdocumentsPosts', 'nestedPosts'), {
      _id: this.person2Id,
      _schema: '1.0.0',
      username: 'person2',
      displayName: 'Person 2',
      count: 8
    });
    testSetEqual(test, this.person2.posts, []);
    testSetEqual(test, this.person2.subdocumentPosts, [
      {
        _id: this.postId2,
        subdocument: {
          body: 'SubdocumentFooBar2a'
        },
        nested: [
          {
            body: 'NestedFooBar2a'
          }
        ],
        body: 'FooBar2a'
      }
    ]);
    testSetEqual(test, this.person2.subdocumentsPosts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1a'
        },
        nested: [
          {
            body: 'NestedFooBar1a'
          }
        ],
        body: 'FooBar1a'
      }, {
        _id: this.postId2,
        subdocument: {
          body: 'SubdocumentFooBar2a'
        },
        nested: [
          {
            body: 'NestedFooBar2a'
          }
        ],
        body: 'FooBar2a'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3a'
        },
        nested: [
          {
            body: 'NestedFooBar3a'
          }
        ],
        body: 'FooBar3a'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }, {
        _id: this.postId5,
        subdocument: {
          body: 'SubdocumentFooBar5a'
        },
        nested: [
          {
            body: 'NestedFooBar5'
          }, {
            body: 'NestedFooBar5a'
          }, {
            body: 'NestedFooBar5'
          }
        ],
        body: 'FooBar5a'
      }
    ]);
    testSetEqual(test, this.person2.nestedPosts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1a'
        },
        nested: [
          {
            body: 'NestedFooBar1a'
          }
        ],
        body: 'FooBar1a'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }
    ]);
    test.equal(_.omit(this.person3, 'posts', 'subdocumentPosts', 'subdocumentsPosts', 'nestedPosts'), {
      _id: this.person3Id,
      _schema: '1.0.0',
      username: 'person3',
      displayName: 'Person 3',
      count: 9
    });
    testSetEqual(test, this.person3.posts, []);
    testSetEqual(test, this.person3.subdocumentPosts, [
      {
        _id: this.postId5,
        subdocument: {
          body: 'SubdocumentFooBar5a'
        },
        nested: [
          {
            body: 'NestedFooBar5'
          }, {
            body: 'NestedFooBar5a'
          }, {
            body: 'NestedFooBar5'
          }
        ],
        body: 'FooBar5a'
      }
    ]);
    testSetEqual(test, this.person3.subdocumentsPosts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1a'
        },
        nested: [
          {
            body: 'NestedFooBar1a'
          }
        ],
        body: 'FooBar1a'
      }, {
        _id: this.postId2,
        subdocument: {
          body: 'SubdocumentFooBar2a'
        },
        nested: [
          {
            body: 'NestedFooBar2a'
          }
        ],
        body: 'FooBar2a'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3a'
        },
        nested: [
          {
            body: 'NestedFooBar3a'
          }
        ],
        body: 'FooBar3a'
      }, {
        _id: this.postId5,
        subdocument: {
          body: 'SubdocumentFooBar5a'
        },
        nested: [
          {
            body: 'NestedFooBar5'
          }, {
            body: 'NestedFooBar5a'
          }, {
            body: 'NestedFooBar5'
          }
        ],
        body: 'FooBar5a'
      }
    ]);
    testSetEqual(test, this.person3.nestedPosts, [
      {
        _id: this.postId2,
        subdocument: {
          body: 'SubdocumentFooBar2a'
        },
        nested: [
          {
            body: 'NestedFooBar2a'
          }
        ],
        body: 'FooBar2a'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3a'
        },
        nested: [
          {
            body: 'NestedFooBar3a'
          }
        ],
        body: 'FooBar3a'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }, {
        _id: this.postId5,
        subdocument: {
          body: 'SubdocumentFooBar5a'
        },
        nested: [
          {
            body: 'NestedFooBar5'
          }, {
            body: 'NestedFooBar5a'
          }, {
            body: 'NestedFooBar5'
          }
        ],
        body: 'FooBar5a'
      }
    ]);
    Post.documents.update(this.postId5, {
      $pop: {
        'subdocument.persons': 1
      }
    }, expect((function(_this) {
      return function(error, res) {
        test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
        return test.isTrue(res);
      };
    })(this)));
    return Meteor.setTimeout(expect(), WAIT_TIME);
  }, function(test, expect) {
    this.post5 = Post.documents.findOne(this.postId5, {
      transform: null
    });
    test.equal(this.post5, {
      _id: this.postId5,
      _schema: '1.0.0',
      author: {
        _id: this.person1Id,
        username: 'person1',
        displayName: 'Person 1'
      },
      subdocument: {
        person: {
          _id: this.person3Id,
          displayName: 'Person 3',
          username: 'person3'
        },
        persons: [
          {
            _id: this.person3Id,
            displayName: 'Person 3',
            username: 'person3'
          }, {
            _id: this.person3Id,
            displayName: 'Person 3',
            username: 'person3'
          }, {
            _id: this.person3Id,
            displayName: 'Person 3',
            username: 'person3'
          }, {
            _id: this.person3Id,
            displayName: 'Person 3',
            username: 'person3'
          }, {
            _id: this.person2Id,
            displayName: 'Person 2',
            username: 'person2'
          }, {
            _id: this.person3Id,
            displayName: 'Person 3',
            username: 'person3'
          }
        ],
        slug: 'subdocument-prefix-foobar5a-subdocumentfoobar5a-suffix',
        body: 'SubdocumentFooBar5a'
      },
      nested: [
        {
          required: {
            _id: this.person3Id,
            username: 'person3',
            displayName: 'Person 3'
          },
          slug: 'nested-prefix-foobar5a-nestedfoobar5-suffix',
          body: 'NestedFooBar5'
        }, {
          required: {
            _id: this.person3Id,
            username: 'person3',
            displayName: 'Person 3'
          },
          slug: 'nested-prefix-foobar5a-nestedfoobar5a-suffix',
          body: 'NestedFooBar5a'
        }, {
          required: {
            _id: this.person3Id,
            username: 'person3',
            displayName: 'Person 3'
          },
          slug: 'nested-prefix-foobar5a-nestedfoobar5-suffix',
          body: 'NestedFooBar5'
        }
      ],
      body: 'FooBar5a',
      slug: 'prefix-foobar5a-subdocumentfoobar5a-suffix',
      tags: ['tag-0-prefix-foobar5a-subdocumentfoobar5a-suffix', 'tag-1-prefix-foobar5a-nestedfoobar5-suffix', 'tag-2-prefix-foobar5a-nestedfoobar5a-suffix', 'tag-3-prefix-foobar5a-nestedfoobar5-suffix']
    });
    this.person1 = Person.documents.findOne(this.person1Id, {
      transform: null
    });
    this.person2 = Person.documents.findOne(this.person2Id, {
      transform: null
    });
    this.person3 = Person.documents.findOne(this.person3Id, {
      transform: null
    });
    test.equal(_.omit(this.person1, 'posts', 'subdocumentPosts', 'subdocumentsPosts', 'nestedPosts'), {
      _id: this.person1Id,
      _schema: '1.0.0',
      username: 'person1',
      displayName: 'Person 1',
      count: 13
    });
    testSetEqual(test, this.person1.posts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1a'
        },
        nested: [
          {
            body: 'NestedFooBar1a'
          }
        ],
        body: 'FooBar1a'
      }, {
        _id: this.postId2,
        subdocument: {
          body: 'SubdocumentFooBar2a'
        },
        nested: [
          {
            body: 'NestedFooBar2a'
          }
        ],
        body: 'FooBar2a'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3a'
        },
        nested: [
          {
            body: 'NestedFooBar3a'
          }
        ],
        body: 'FooBar3a'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }, {
        _id: this.postId5,
        subdocument: {
          body: 'SubdocumentFooBar5a'
        },
        nested: [
          {
            body: 'NestedFooBar5'
          }, {
            body: 'NestedFooBar5a'
          }, {
            body: 'NestedFooBar5'
          }
        ],
        body: 'FooBar5a'
      }
    ]);
    testSetEqual(test, this.person1.subdocumentPosts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1a'
        },
        nested: [
          {
            body: 'NestedFooBar1a'
          }
        ],
        body: 'FooBar1a'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3a'
        },
        nested: [
          {
            body: 'NestedFooBar3a'
          }
        ],
        body: 'FooBar3a'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }
    ]);
    testSetEqual(test, this.person1.subdocumentsPosts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1a'
        },
        nested: [
          {
            body: 'NestedFooBar1a'
          }
        ],
        body: 'FooBar1a'
      }, {
        _id: this.postId2,
        subdocument: {
          body: 'SubdocumentFooBar2a'
        },
        nested: [
          {
            body: 'NestedFooBar2a'
          }
        ],
        body: 'FooBar2a'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3a'
        },
        nested: [
          {
            body: 'NestedFooBar3a'
          }
        ],
        body: 'FooBar3a'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }
    ]);
    testSetEqual(test, this.person1.nestedPosts, [
      {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }
    ]);
    test.equal(_.omit(this.person2, 'posts', 'subdocumentPosts', 'subdocumentsPosts', 'nestedPosts'), {
      _id: this.person2Id,
      _schema: '1.0.0',
      username: 'person2',
      displayName: 'Person 2',
      count: 8
    });
    testSetEqual(test, this.person2.posts, []);
    testSetEqual(test, this.person2.subdocumentPosts, [
      {
        _id: this.postId2,
        subdocument: {
          body: 'SubdocumentFooBar2a'
        },
        nested: [
          {
            body: 'NestedFooBar2a'
          }
        ],
        body: 'FooBar2a'
      }
    ]);
    testSetEqual(test, this.person2.subdocumentsPosts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1a'
        },
        nested: [
          {
            body: 'NestedFooBar1a'
          }
        ],
        body: 'FooBar1a'
      }, {
        _id: this.postId2,
        subdocument: {
          body: 'SubdocumentFooBar2a'
        },
        nested: [
          {
            body: 'NestedFooBar2a'
          }
        ],
        body: 'FooBar2a'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3a'
        },
        nested: [
          {
            body: 'NestedFooBar3a'
          }
        ],
        body: 'FooBar3a'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }, {
        _id: this.postId5,
        subdocument: {
          body: 'SubdocumentFooBar5a'
        },
        nested: [
          {
            body: 'NestedFooBar5'
          }, {
            body: 'NestedFooBar5a'
          }, {
            body: 'NestedFooBar5'
          }
        ],
        body: 'FooBar5a'
      }
    ]);
    testSetEqual(test, this.person2.nestedPosts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1a'
        },
        nested: [
          {
            body: 'NestedFooBar1a'
          }
        ],
        body: 'FooBar1a'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }
    ]);
    test.equal(_.omit(this.person3, 'posts', 'subdocumentPosts', 'subdocumentsPosts', 'nestedPosts'), {
      _id: this.person3Id,
      _schema: '1.0.0',
      username: 'person3',
      displayName: 'Person 3',
      count: 9
    });
    testSetEqual(test, this.person3.posts, []);
    testSetEqual(test, this.person3.subdocumentPosts, [
      {
        _id: this.postId5,
        subdocument: {
          body: 'SubdocumentFooBar5a'
        },
        nested: [
          {
            body: 'NestedFooBar5'
          }, {
            body: 'NestedFooBar5a'
          }, {
            body: 'NestedFooBar5'
          }
        ],
        body: 'FooBar5a'
      }
    ]);
    testSetEqual(test, this.person3.subdocumentsPosts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1a'
        },
        nested: [
          {
            body: 'NestedFooBar1a'
          }
        ],
        body: 'FooBar1a'
      }, {
        _id: this.postId2,
        subdocument: {
          body: 'SubdocumentFooBar2a'
        },
        nested: [
          {
            body: 'NestedFooBar2a'
          }
        ],
        body: 'FooBar2a'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3a'
        },
        nested: [
          {
            body: 'NestedFooBar3a'
          }
        ],
        body: 'FooBar3a'
      }, {
        _id: this.postId5,
        subdocument: {
          body: 'SubdocumentFooBar5a'
        },
        nested: [
          {
            body: 'NestedFooBar5'
          }, {
            body: 'NestedFooBar5a'
          }, {
            body: 'NestedFooBar5'
          }
        ],
        body: 'FooBar5a'
      }
    ]);
    testSetEqual(test, this.person3.nestedPosts, [
      {
        _id: this.postId2,
        subdocument: {
          body: 'SubdocumentFooBar2a'
        },
        nested: [
          {
            body: 'NestedFooBar2a'
          }
        ],
        body: 'FooBar2a'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3a'
        },
        nested: [
          {
            body: 'NestedFooBar3a'
          }
        ],
        body: 'FooBar3a'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }, {
        _id: this.postId5,
        subdocument: {
          body: 'SubdocumentFooBar5a'
        },
        nested: [
          {
            body: 'NestedFooBar5'
          }, {
            body: 'NestedFooBar5a'
          }, {
            body: 'NestedFooBar5'
          }
        ],
        body: 'FooBar5a'
      }
    ]);
    Post.documents.update(this.postId5, {
      $push: {
        'subdocument.persons': {
          _id: this.person3Id
        }
      }
    }, expect((function(_this) {
      return function(error, res) {
        test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
        return test.isTrue(res);
      };
    })(this)));
    return Meteor.setTimeout(expect(), WAIT_TIME);
  }, function(test, expect) {
    this.post5 = Post.documents.findOne(this.postId5, {
      transform: null
    });
    test.equal(this.post5, {
      _id: this.postId5,
      _schema: '1.0.0',
      author: {
        _id: this.person1Id,
        username: 'person1',
        displayName: 'Person 1'
      },
      subdocument: {
        person: {
          _id: this.person3Id,
          displayName: 'Person 3',
          username: 'person3'
        },
        persons: [
          {
            _id: this.person3Id,
            displayName: 'Person 3',
            username: 'person3'
          }, {
            _id: this.person3Id,
            displayName: 'Person 3',
            username: 'person3'
          }, {
            _id: this.person3Id,
            displayName: 'Person 3',
            username: 'person3'
          }, {
            _id: this.person3Id,
            displayName: 'Person 3',
            username: 'person3'
          }, {
            _id: this.person2Id,
            displayName: 'Person 2',
            username: 'person2'
          }, {
            _id: this.person3Id,
            displayName: 'Person 3',
            username: 'person3'
          }, {
            _id: this.person3Id,
            displayName: 'Person 3',
            username: 'person3'
          }
        ],
        slug: 'subdocument-prefix-foobar5a-subdocumentfoobar5a-suffix',
        body: 'SubdocumentFooBar5a'
      },
      nested: [
        {
          required: {
            _id: this.person3Id,
            username: 'person3',
            displayName: 'Person 3'
          },
          slug: 'nested-prefix-foobar5a-nestedfoobar5-suffix',
          body: 'NestedFooBar5'
        }, {
          required: {
            _id: this.person3Id,
            username: 'person3',
            displayName: 'Person 3'
          },
          slug: 'nested-prefix-foobar5a-nestedfoobar5a-suffix',
          body: 'NestedFooBar5a'
        }, {
          required: {
            _id: this.person3Id,
            username: 'person3',
            displayName: 'Person 3'
          },
          slug: 'nested-prefix-foobar5a-nestedfoobar5-suffix',
          body: 'NestedFooBar5'
        }
      ],
      body: 'FooBar5a',
      slug: 'prefix-foobar5a-subdocumentfoobar5a-suffix',
      tags: ['tag-0-prefix-foobar5a-subdocumentfoobar5a-suffix', 'tag-1-prefix-foobar5a-nestedfoobar5-suffix', 'tag-2-prefix-foobar5a-nestedfoobar5a-suffix', 'tag-3-prefix-foobar5a-nestedfoobar5-suffix']
    });
    this.person1 = Person.documents.findOne(this.person1Id, {
      transform: null
    });
    this.person2 = Person.documents.findOne(this.person2Id, {
      transform: null
    });
    this.person3 = Person.documents.findOne(this.person3Id, {
      transform: null
    });
    test.equal(_.omit(this.person1, 'posts', 'subdocumentPosts', 'subdocumentsPosts', 'nestedPosts'), {
      _id: this.person1Id,
      _schema: '1.0.0',
      username: 'person1',
      displayName: 'Person 1',
      count: 13
    });
    testSetEqual(test, this.person1.posts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1a'
        },
        nested: [
          {
            body: 'NestedFooBar1a'
          }
        ],
        body: 'FooBar1a'
      }, {
        _id: this.postId2,
        subdocument: {
          body: 'SubdocumentFooBar2a'
        },
        nested: [
          {
            body: 'NestedFooBar2a'
          }
        ],
        body: 'FooBar2a'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3a'
        },
        nested: [
          {
            body: 'NestedFooBar3a'
          }
        ],
        body: 'FooBar3a'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }, {
        _id: this.postId5,
        subdocument: {
          body: 'SubdocumentFooBar5a'
        },
        nested: [
          {
            body: 'NestedFooBar5'
          }, {
            body: 'NestedFooBar5a'
          }, {
            body: 'NestedFooBar5'
          }
        ],
        body: 'FooBar5a'
      }
    ]);
    testSetEqual(test, this.person1.subdocumentPosts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1a'
        },
        nested: [
          {
            body: 'NestedFooBar1a'
          }
        ],
        body: 'FooBar1a'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3a'
        },
        nested: [
          {
            body: 'NestedFooBar3a'
          }
        ],
        body: 'FooBar3a'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }
    ]);
    testSetEqual(test, this.person1.subdocumentsPosts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1a'
        },
        nested: [
          {
            body: 'NestedFooBar1a'
          }
        ],
        body: 'FooBar1a'
      }, {
        _id: this.postId2,
        subdocument: {
          body: 'SubdocumentFooBar2a'
        },
        nested: [
          {
            body: 'NestedFooBar2a'
          }
        ],
        body: 'FooBar2a'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3a'
        },
        nested: [
          {
            body: 'NestedFooBar3a'
          }
        ],
        body: 'FooBar3a'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }
    ]);
    testSetEqual(test, this.person1.nestedPosts, [
      {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }
    ]);
    test.equal(_.omit(this.person2, 'posts', 'subdocumentPosts', 'subdocumentsPosts', 'nestedPosts'), {
      _id: this.person2Id,
      _schema: '1.0.0',
      username: 'person2',
      displayName: 'Person 2',
      count: 8
    });
    testSetEqual(test, this.person2.posts, []);
    testSetEqual(test, this.person2.subdocumentPosts, [
      {
        _id: this.postId2,
        subdocument: {
          body: 'SubdocumentFooBar2a'
        },
        nested: [
          {
            body: 'NestedFooBar2a'
          }
        ],
        body: 'FooBar2a'
      }
    ]);
    testSetEqual(test, this.person2.subdocumentsPosts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1a'
        },
        nested: [
          {
            body: 'NestedFooBar1a'
          }
        ],
        body: 'FooBar1a'
      }, {
        _id: this.postId2,
        subdocument: {
          body: 'SubdocumentFooBar2a'
        },
        nested: [
          {
            body: 'NestedFooBar2a'
          }
        ],
        body: 'FooBar2a'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3a'
        },
        nested: [
          {
            body: 'NestedFooBar3a'
          }
        ],
        body: 'FooBar3a'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }, {
        _id: this.postId5,
        subdocument: {
          body: 'SubdocumentFooBar5a'
        },
        nested: [
          {
            body: 'NestedFooBar5'
          }, {
            body: 'NestedFooBar5a'
          }, {
            body: 'NestedFooBar5'
          }
        ],
        body: 'FooBar5a'
      }
    ]);
    testSetEqual(test, this.person2.nestedPosts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1a'
        },
        nested: [
          {
            body: 'NestedFooBar1a'
          }
        ],
        body: 'FooBar1a'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }
    ]);
    test.equal(_.omit(this.person3, 'posts', 'subdocumentPosts', 'subdocumentsPosts', 'nestedPosts'), {
      _id: this.person3Id,
      _schema: '1.0.0',
      username: 'person3',
      displayName: 'Person 3',
      count: 9
    });
    testSetEqual(test, this.person3.posts, []);
    testSetEqual(test, this.person3.subdocumentPosts, [
      {
        _id: this.postId5,
        subdocument: {
          body: 'SubdocumentFooBar5a'
        },
        nested: [
          {
            body: 'NestedFooBar5'
          }, {
            body: 'NestedFooBar5a'
          }, {
            body: 'NestedFooBar5'
          }
        ],
        body: 'FooBar5a'
      }
    ]);
    testSetEqual(test, this.person3.subdocumentsPosts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1a'
        },
        nested: [
          {
            body: 'NestedFooBar1a'
          }
        ],
        body: 'FooBar1a'
      }, {
        _id: this.postId2,
        subdocument: {
          body: 'SubdocumentFooBar2a'
        },
        nested: [
          {
            body: 'NestedFooBar2a'
          }
        ],
        body: 'FooBar2a'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3a'
        },
        nested: [
          {
            body: 'NestedFooBar3a'
          }
        ],
        body: 'FooBar3a'
      }, {
        _id: this.postId5,
        subdocument: {
          body: 'SubdocumentFooBar5a'
        },
        nested: [
          {
            body: 'NestedFooBar5'
          }, {
            body: 'NestedFooBar5a'
          }, {
            body: 'NestedFooBar5'
          }
        ],
        body: 'FooBar5a'
      }
    ]);
    testSetEqual(test, this.person3.nestedPosts, [
      {
        _id: this.postId2,
        subdocument: {
          body: 'SubdocumentFooBar2a'
        },
        nested: [
          {
            body: 'NestedFooBar2a'
          }
        ],
        body: 'FooBar2a'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3a'
        },
        nested: [
          {
            body: 'NestedFooBar3a'
          }
        ],
        body: 'FooBar3a'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }, {
        _id: this.postId5,
        subdocument: {
          body: 'SubdocumentFooBar5a'
        },
        nested: [
          {
            body: 'NestedFooBar5'
          }, {
            body: 'NestedFooBar5a'
          }, {
            body: 'NestedFooBar5'
          }
        ],
        body: 'FooBar5a'
      }
    ]);
    Post.documents.update(this.postId5, {
      $pop: {
        'subdocument.persons': 1
      }
    }, expect((function(_this) {
      return function(error, res) {
        test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
        return test.isTrue(res);
      };
    })(this)));
    return Meteor.setTimeout(expect(), WAIT_TIME);
  }, function(test, expect) {
    this.post5 = Post.documents.findOne(this.postId5, {
      transform: null
    });
    test.equal(this.post5, {
      _id: this.postId5,
      _schema: '1.0.0',
      author: {
        _id: this.person1Id,
        username: 'person1',
        displayName: 'Person 1'
      },
      subdocument: {
        person: {
          _id: this.person3Id,
          displayName: 'Person 3',
          username: 'person3'
        },
        persons: [
          {
            _id: this.person3Id,
            displayName: 'Person 3',
            username: 'person3'
          }, {
            _id: this.person3Id,
            displayName: 'Person 3',
            username: 'person3'
          }, {
            _id: this.person3Id,
            displayName: 'Person 3',
            username: 'person3'
          }, {
            _id: this.person3Id,
            displayName: 'Person 3',
            username: 'person3'
          }, {
            _id: this.person2Id,
            displayName: 'Person 2',
            username: 'person2'
          }, {
            _id: this.person3Id,
            displayName: 'Person 3',
            username: 'person3'
          }
        ],
        slug: 'subdocument-prefix-foobar5a-subdocumentfoobar5a-suffix',
        body: 'SubdocumentFooBar5a'
      },
      nested: [
        {
          required: {
            _id: this.person3Id,
            username: 'person3',
            displayName: 'Person 3'
          },
          slug: 'nested-prefix-foobar5a-nestedfoobar5-suffix',
          body: 'NestedFooBar5'
        }, {
          required: {
            _id: this.person3Id,
            username: 'person3',
            displayName: 'Person 3'
          },
          slug: 'nested-prefix-foobar5a-nestedfoobar5a-suffix',
          body: 'NestedFooBar5a'
        }, {
          required: {
            _id: this.person3Id,
            username: 'person3',
            displayName: 'Person 3'
          },
          slug: 'nested-prefix-foobar5a-nestedfoobar5-suffix',
          body: 'NestedFooBar5'
        }
      ],
      body: 'FooBar5a',
      slug: 'prefix-foobar5a-subdocumentfoobar5a-suffix',
      tags: ['tag-0-prefix-foobar5a-subdocumentfoobar5a-suffix', 'tag-1-prefix-foobar5a-nestedfoobar5-suffix', 'tag-2-prefix-foobar5a-nestedfoobar5a-suffix', 'tag-3-prefix-foobar5a-nestedfoobar5-suffix']
    });
    this.person1 = Person.documents.findOne(this.person1Id, {
      transform: null
    });
    this.person2 = Person.documents.findOne(this.person2Id, {
      transform: null
    });
    this.person3 = Person.documents.findOne(this.person3Id, {
      transform: null
    });
    test.equal(_.omit(this.person1, 'posts', 'subdocumentPosts', 'subdocumentsPosts', 'nestedPosts'), {
      _id: this.person1Id,
      _schema: '1.0.0',
      username: 'person1',
      displayName: 'Person 1',
      count: 13
    });
    testSetEqual(test, this.person1.posts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1a'
        },
        nested: [
          {
            body: 'NestedFooBar1a'
          }
        ],
        body: 'FooBar1a'
      }, {
        _id: this.postId2,
        subdocument: {
          body: 'SubdocumentFooBar2a'
        },
        nested: [
          {
            body: 'NestedFooBar2a'
          }
        ],
        body: 'FooBar2a'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3a'
        },
        nested: [
          {
            body: 'NestedFooBar3a'
          }
        ],
        body: 'FooBar3a'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }, {
        _id: this.postId5,
        subdocument: {
          body: 'SubdocumentFooBar5a'
        },
        nested: [
          {
            body: 'NestedFooBar5'
          }, {
            body: 'NestedFooBar5a'
          }, {
            body: 'NestedFooBar5'
          }
        ],
        body: 'FooBar5a'
      }
    ]);
    testSetEqual(test, this.person1.subdocumentPosts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1a'
        },
        nested: [
          {
            body: 'NestedFooBar1a'
          }
        ],
        body: 'FooBar1a'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3a'
        },
        nested: [
          {
            body: 'NestedFooBar3a'
          }
        ],
        body: 'FooBar3a'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }
    ]);
    testSetEqual(test, this.person1.subdocumentsPosts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1a'
        },
        nested: [
          {
            body: 'NestedFooBar1a'
          }
        ],
        body: 'FooBar1a'
      }, {
        _id: this.postId2,
        subdocument: {
          body: 'SubdocumentFooBar2a'
        },
        nested: [
          {
            body: 'NestedFooBar2a'
          }
        ],
        body: 'FooBar2a'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3a'
        },
        nested: [
          {
            body: 'NestedFooBar3a'
          }
        ],
        body: 'FooBar3a'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }
    ]);
    testSetEqual(test, this.person1.nestedPosts, [
      {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }
    ]);
    test.equal(_.omit(this.person2, 'posts', 'subdocumentPosts', 'subdocumentsPosts', 'nestedPosts'), {
      _id: this.person2Id,
      _schema: '1.0.0',
      username: 'person2',
      displayName: 'Person 2',
      count: 8
    });
    testSetEqual(test, this.person2.posts, []);
    testSetEqual(test, this.person2.subdocumentPosts, [
      {
        _id: this.postId2,
        subdocument: {
          body: 'SubdocumentFooBar2a'
        },
        nested: [
          {
            body: 'NestedFooBar2a'
          }
        ],
        body: 'FooBar2a'
      }
    ]);
    testSetEqual(test, this.person2.subdocumentsPosts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1a'
        },
        nested: [
          {
            body: 'NestedFooBar1a'
          }
        ],
        body: 'FooBar1a'
      }, {
        _id: this.postId2,
        subdocument: {
          body: 'SubdocumentFooBar2a'
        },
        nested: [
          {
            body: 'NestedFooBar2a'
          }
        ],
        body: 'FooBar2a'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3a'
        },
        nested: [
          {
            body: 'NestedFooBar3a'
          }
        ],
        body: 'FooBar3a'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }, {
        _id: this.postId5,
        subdocument: {
          body: 'SubdocumentFooBar5a'
        },
        nested: [
          {
            body: 'NestedFooBar5'
          }, {
            body: 'NestedFooBar5a'
          }, {
            body: 'NestedFooBar5'
          }
        ],
        body: 'FooBar5a'
      }
    ]);
    testSetEqual(test, this.person2.nestedPosts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1a'
        },
        nested: [
          {
            body: 'NestedFooBar1a'
          }
        ],
        body: 'FooBar1a'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }
    ]);
    test.equal(_.omit(this.person3, 'posts', 'subdocumentPosts', 'subdocumentsPosts', 'nestedPosts'), {
      _id: this.person3Id,
      _schema: '1.0.0',
      username: 'person3',
      displayName: 'Person 3',
      count: 9
    });
    testSetEqual(test, this.person3.posts, []);
    testSetEqual(test, this.person3.subdocumentPosts, [
      {
        _id: this.postId5,
        subdocument: {
          body: 'SubdocumentFooBar5a'
        },
        nested: [
          {
            body: 'NestedFooBar5'
          }, {
            body: 'NestedFooBar5a'
          }, {
            body: 'NestedFooBar5'
          }
        ],
        body: 'FooBar5a'
      }
    ]);
    testSetEqual(test, this.person3.subdocumentsPosts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1a'
        },
        nested: [
          {
            body: 'NestedFooBar1a'
          }
        ],
        body: 'FooBar1a'
      }, {
        _id: this.postId2,
        subdocument: {
          body: 'SubdocumentFooBar2a'
        },
        nested: [
          {
            body: 'NestedFooBar2a'
          }
        ],
        body: 'FooBar2a'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3a'
        },
        nested: [
          {
            body: 'NestedFooBar3a'
          }
        ],
        body: 'FooBar3a'
      }, {
        _id: this.postId5,
        subdocument: {
          body: 'SubdocumentFooBar5a'
        },
        nested: [
          {
            body: 'NestedFooBar5'
          }, {
            body: 'NestedFooBar5a'
          }, {
            body: 'NestedFooBar5'
          }
        ],
        body: 'FooBar5a'
      }
    ]);
    testSetEqual(test, this.person3.nestedPosts, [
      {
        _id: this.postId2,
        subdocument: {
          body: 'SubdocumentFooBar2a'
        },
        nested: [
          {
            body: 'NestedFooBar2a'
          }
        ],
        body: 'FooBar2a'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3a'
        },
        nested: [
          {
            body: 'NestedFooBar3a'
          }
        ],
        body: 'FooBar3a'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }, {
        _id: this.postId5,
        subdocument: {
          body: 'SubdocumentFooBar5a'
        },
        nested: [
          {
            body: 'NestedFooBar5'
          }, {
            body: 'NestedFooBar5a'
          }, {
            body: 'NestedFooBar5'
          }
        ],
        body: 'FooBar5a'
      }
    ]);
    Post.documents.update(this.postId5, {
      $set: {
        'subdocument.persons.2._id': this.person1Id
      }
    }, expect((function(_this) {
      return function(error, res) {
        test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
        return test.isTrue(res);
      };
    })(this)));
    return Meteor.setTimeout(expect(), WAIT_TIME);
  }, function(test, expect) {
    this.post5 = Post.documents.findOne(this.postId5, {
      transform: null
    });
    test.equal(this.post5, {
      _id: this.postId5,
      _schema: '1.0.0',
      author: {
        _id: this.person1Id,
        username: 'person1',
        displayName: 'Person 1'
      },
      subdocument: {
        person: {
          _id: this.person3Id,
          displayName: 'Person 3',
          username: 'person3'
        },
        persons: [
          {
            _id: this.person3Id,
            displayName: 'Person 3',
            username: 'person3'
          }, {
            _id: this.person3Id,
            displayName: 'Person 3',
            username: 'person3'
          }, {
            _id: this.person1Id,
            displayName: 'Person 1',
            username: 'person1'
          }, {
            _id: this.person3Id,
            displayName: 'Person 3',
            username: 'person3'
          }, {
            _id: this.person2Id,
            displayName: 'Person 2',
            username: 'person2'
          }, {
            _id: this.person3Id,
            displayName: 'Person 3',
            username: 'person3'
          }
        ],
        slug: 'subdocument-prefix-foobar5a-subdocumentfoobar5a-suffix',
        body: 'SubdocumentFooBar5a'
      },
      nested: [
        {
          required: {
            _id: this.person3Id,
            username: 'person3',
            displayName: 'Person 3'
          },
          slug: 'nested-prefix-foobar5a-nestedfoobar5-suffix',
          body: 'NestedFooBar5'
        }, {
          required: {
            _id: this.person3Id,
            username: 'person3',
            displayName: 'Person 3'
          },
          slug: 'nested-prefix-foobar5a-nestedfoobar5a-suffix',
          body: 'NestedFooBar5a'
        }, {
          required: {
            _id: this.person3Id,
            username: 'person3',
            displayName: 'Person 3'
          },
          slug: 'nested-prefix-foobar5a-nestedfoobar5-suffix',
          body: 'NestedFooBar5'
        }
      ],
      body: 'FooBar5a',
      slug: 'prefix-foobar5a-subdocumentfoobar5a-suffix',
      tags: ['tag-0-prefix-foobar5a-subdocumentfoobar5a-suffix', 'tag-1-prefix-foobar5a-nestedfoobar5-suffix', 'tag-2-prefix-foobar5a-nestedfoobar5a-suffix', 'tag-3-prefix-foobar5a-nestedfoobar5-suffix']
    });
    this.person1 = Person.documents.findOne(this.person1Id, {
      transform: null
    });
    this.person2 = Person.documents.findOne(this.person2Id, {
      transform: null
    });
    this.person3 = Person.documents.findOne(this.person3Id, {
      transform: null
    });
    test.equal(_.omit(this.person1, 'posts', 'subdocumentPosts', 'subdocumentsPosts', 'nestedPosts'), {
      _id: this.person1Id,
      _schema: '1.0.0',
      username: 'person1',
      displayName: 'Person 1',
      count: 14
    });
    testSetEqual(test, this.person1.posts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1a'
        },
        nested: [
          {
            body: 'NestedFooBar1a'
          }
        ],
        body: 'FooBar1a'
      }, {
        _id: this.postId2,
        subdocument: {
          body: 'SubdocumentFooBar2a'
        },
        nested: [
          {
            body: 'NestedFooBar2a'
          }
        ],
        body: 'FooBar2a'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3a'
        },
        nested: [
          {
            body: 'NestedFooBar3a'
          }
        ],
        body: 'FooBar3a'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }, {
        _id: this.postId5,
        subdocument: {
          body: 'SubdocumentFooBar5a'
        },
        nested: [
          {
            body: 'NestedFooBar5'
          }, {
            body: 'NestedFooBar5a'
          }, {
            body: 'NestedFooBar5'
          }
        ],
        body: 'FooBar5a'
      }
    ]);
    testSetEqual(test, this.person1.subdocumentPosts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1a'
        },
        nested: [
          {
            body: 'NestedFooBar1a'
          }
        ],
        body: 'FooBar1a'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3a'
        },
        nested: [
          {
            body: 'NestedFooBar3a'
          }
        ],
        body: 'FooBar3a'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }
    ]);
    testSetEqual(test, this.person1.subdocumentsPosts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1a'
        },
        nested: [
          {
            body: 'NestedFooBar1a'
          }
        ],
        body: 'FooBar1a'
      }, {
        _id: this.postId2,
        subdocument: {
          body: 'SubdocumentFooBar2a'
        },
        nested: [
          {
            body: 'NestedFooBar2a'
          }
        ],
        body: 'FooBar2a'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3a'
        },
        nested: [
          {
            body: 'NestedFooBar3a'
          }
        ],
        body: 'FooBar3a'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }, {
        _id: this.postId5,
        subdocument: {
          body: 'SubdocumentFooBar5a'
        },
        nested: [
          {
            body: 'NestedFooBar5'
          }, {
            body: 'NestedFooBar5a'
          }, {
            body: 'NestedFooBar5'
          }
        ],
        body: 'FooBar5a'
      }
    ]);
    testSetEqual(test, this.person1.nestedPosts, [
      {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }
    ]);
    test.equal(_.omit(this.person2, 'posts', 'subdocumentPosts', 'subdocumentsPosts', 'nestedPosts'), {
      _id: this.person2Id,
      _schema: '1.0.0',
      username: 'person2',
      displayName: 'Person 2',
      count: 8
    });
    testSetEqual(test, this.person2.posts, []);
    testSetEqual(test, this.person2.subdocumentPosts, [
      {
        _id: this.postId2,
        subdocument: {
          body: 'SubdocumentFooBar2a'
        },
        nested: [
          {
            body: 'NestedFooBar2a'
          }
        ],
        body: 'FooBar2a'
      }
    ]);
    testSetEqual(test, this.person2.subdocumentsPosts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1a'
        },
        nested: [
          {
            body: 'NestedFooBar1a'
          }
        ],
        body: 'FooBar1a'
      }, {
        _id: this.postId2,
        subdocument: {
          body: 'SubdocumentFooBar2a'
        },
        nested: [
          {
            body: 'NestedFooBar2a'
          }
        ],
        body: 'FooBar2a'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3a'
        },
        nested: [
          {
            body: 'NestedFooBar3a'
          }
        ],
        body: 'FooBar3a'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }, {
        _id: this.postId5,
        subdocument: {
          body: 'SubdocumentFooBar5a'
        },
        nested: [
          {
            body: 'NestedFooBar5'
          }, {
            body: 'NestedFooBar5a'
          }, {
            body: 'NestedFooBar5'
          }
        ],
        body: 'FooBar5a'
      }
    ]);
    testSetEqual(test, this.person2.nestedPosts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1a'
        },
        nested: [
          {
            body: 'NestedFooBar1a'
          }
        ],
        body: 'FooBar1a'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }
    ]);
    test.equal(_.omit(this.person3, 'posts', 'subdocumentPosts', 'subdocumentsPosts', 'nestedPosts'), {
      _id: this.person3Id,
      _schema: '1.0.0',
      username: 'person3',
      displayName: 'Person 3',
      count: 9
    });
    testSetEqual(test, this.person3.posts, []);
    testSetEqual(test, this.person3.subdocumentPosts, [
      {
        _id: this.postId5,
        subdocument: {
          body: 'SubdocumentFooBar5a'
        },
        nested: [
          {
            body: 'NestedFooBar5'
          }, {
            body: 'NestedFooBar5a'
          }, {
            body: 'NestedFooBar5'
          }
        ],
        body: 'FooBar5a'
      }
    ]);
    testSetEqual(test, this.person3.subdocumentsPosts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1a'
        },
        nested: [
          {
            body: 'NestedFooBar1a'
          }
        ],
        body: 'FooBar1a'
      }, {
        _id: this.postId2,
        subdocument: {
          body: 'SubdocumentFooBar2a'
        },
        nested: [
          {
            body: 'NestedFooBar2a'
          }
        ],
        body: 'FooBar2a'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3a'
        },
        nested: [
          {
            body: 'NestedFooBar3a'
          }
        ],
        body: 'FooBar3a'
      }, {
        _id: this.postId5,
        subdocument: {
          body: 'SubdocumentFooBar5a'
        },
        nested: [
          {
            body: 'NestedFooBar5'
          }, {
            body: 'NestedFooBar5a'
          }, {
            body: 'NestedFooBar5'
          }
        ],
        body: 'FooBar5a'
      }
    ]);
    testSetEqual(test, this.person3.nestedPosts, [
      {
        _id: this.postId2,
        subdocument: {
          body: 'SubdocumentFooBar2a'
        },
        nested: [
          {
            body: 'NestedFooBar2a'
          }
        ],
        body: 'FooBar2a'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3a'
        },
        nested: [
          {
            body: 'NestedFooBar3a'
          }
        ],
        body: 'FooBar3a'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }, {
        _id: this.postId5,
        subdocument: {
          body: 'SubdocumentFooBar5a'
        },
        nested: [
          {
            body: 'NestedFooBar5'
          }, {
            body: 'NestedFooBar5a'
          }, {
            body: 'NestedFooBar5'
          }
        ],
        body: 'FooBar5a'
      }
    ]);
    Post.documents.update(this.postId5, {
      $set: {
        'subdocument.persons.2._id': this.person3Id
      }
    }, expect((function(_this) {
      return function(error, res) {
        test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
        return test.isTrue(res);
      };
    })(this)));
    return Meteor.setTimeout(expect(), WAIT_TIME);
  }, function(test, expect) {
    this.post5 = Post.documents.findOne(this.postId5, {
      transform: null
    });
    test.equal(this.post5, {
      _id: this.postId5,
      _schema: '1.0.0',
      author: {
        _id: this.person1Id,
        username: 'person1',
        displayName: 'Person 1'
      },
      subdocument: {
        person: {
          _id: this.person3Id,
          displayName: 'Person 3',
          username: 'person3'
        },
        persons: [
          {
            _id: this.person3Id,
            displayName: 'Person 3',
            username: 'person3'
          }, {
            _id: this.person3Id,
            displayName: 'Person 3',
            username: 'person3'
          }, {
            _id: this.person3Id,
            displayName: 'Person 3',
            username: 'person3'
          }, {
            _id: this.person3Id,
            displayName: 'Person 3',
            username: 'person3'
          }, {
            _id: this.person2Id,
            displayName: 'Person 2',
            username: 'person2'
          }, {
            _id: this.person3Id,
            displayName: 'Person 3',
            username: 'person3'
          }
        ],
        slug: 'subdocument-prefix-foobar5a-subdocumentfoobar5a-suffix',
        body: 'SubdocumentFooBar5a'
      },
      nested: [
        {
          required: {
            _id: this.person3Id,
            username: 'person3',
            displayName: 'Person 3'
          },
          slug: 'nested-prefix-foobar5a-nestedfoobar5-suffix',
          body: 'NestedFooBar5'
        }, {
          required: {
            _id: this.person3Id,
            username: 'person3',
            displayName: 'Person 3'
          },
          slug: 'nested-prefix-foobar5a-nestedfoobar5a-suffix',
          body: 'NestedFooBar5a'
        }, {
          required: {
            _id: this.person3Id,
            username: 'person3',
            displayName: 'Person 3'
          },
          slug: 'nested-prefix-foobar5a-nestedfoobar5-suffix',
          body: 'NestedFooBar5'
        }
      ],
      body: 'FooBar5a',
      slug: 'prefix-foobar5a-subdocumentfoobar5a-suffix',
      tags: ['tag-0-prefix-foobar5a-subdocumentfoobar5a-suffix', 'tag-1-prefix-foobar5a-nestedfoobar5-suffix', 'tag-2-prefix-foobar5a-nestedfoobar5a-suffix', 'tag-3-prefix-foobar5a-nestedfoobar5-suffix']
    });
    this.person1 = Person.documents.findOne(this.person1Id, {
      transform: null
    });
    this.person2 = Person.documents.findOne(this.person2Id, {
      transform: null
    });
    this.person3 = Person.documents.findOne(this.person3Id, {
      transform: null
    });
    test.equal(_.omit(this.person1, 'posts', 'subdocumentPosts', 'subdocumentsPosts', 'nestedPosts'), {
      _id: this.person1Id,
      _schema: '1.0.0',
      username: 'person1',
      displayName: 'Person 1',
      count: 13
    });
    testSetEqual(test, this.person1.posts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1a'
        },
        nested: [
          {
            body: 'NestedFooBar1a'
          }
        ],
        body: 'FooBar1a'
      }, {
        _id: this.postId2,
        subdocument: {
          body: 'SubdocumentFooBar2a'
        },
        nested: [
          {
            body: 'NestedFooBar2a'
          }
        ],
        body: 'FooBar2a'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3a'
        },
        nested: [
          {
            body: 'NestedFooBar3a'
          }
        ],
        body: 'FooBar3a'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }, {
        _id: this.postId5,
        subdocument: {
          body: 'SubdocumentFooBar5a'
        },
        nested: [
          {
            body: 'NestedFooBar5'
          }, {
            body: 'NestedFooBar5a'
          }, {
            body: 'NestedFooBar5'
          }
        ],
        body: 'FooBar5a'
      }
    ]);
    testSetEqual(test, this.person1.subdocumentPosts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1a'
        },
        nested: [
          {
            body: 'NestedFooBar1a'
          }
        ],
        body: 'FooBar1a'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3a'
        },
        nested: [
          {
            body: 'NestedFooBar3a'
          }
        ],
        body: 'FooBar3a'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }
    ]);
    testSetEqual(test, this.person1.subdocumentsPosts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1a'
        },
        nested: [
          {
            body: 'NestedFooBar1a'
          }
        ],
        body: 'FooBar1a'
      }, {
        _id: this.postId2,
        subdocument: {
          body: 'SubdocumentFooBar2a'
        },
        nested: [
          {
            body: 'NestedFooBar2a'
          }
        ],
        body: 'FooBar2a'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3a'
        },
        nested: [
          {
            body: 'NestedFooBar3a'
          }
        ],
        body: 'FooBar3a'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }
    ]);
    testSetEqual(test, this.person1.nestedPosts, [
      {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }
    ]);
    test.equal(_.omit(this.person2, 'posts', 'subdocumentPosts', 'subdocumentsPosts', 'nestedPosts'), {
      _id: this.person2Id,
      _schema: '1.0.0',
      username: 'person2',
      displayName: 'Person 2',
      count: 8
    });
    testSetEqual(test, this.person2.posts, []);
    testSetEqual(test, this.person2.subdocumentPosts, [
      {
        _id: this.postId2,
        subdocument: {
          body: 'SubdocumentFooBar2a'
        },
        nested: [
          {
            body: 'NestedFooBar2a'
          }
        ],
        body: 'FooBar2a'
      }
    ]);
    testSetEqual(test, this.person2.subdocumentsPosts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1a'
        },
        nested: [
          {
            body: 'NestedFooBar1a'
          }
        ],
        body: 'FooBar1a'
      }, {
        _id: this.postId2,
        subdocument: {
          body: 'SubdocumentFooBar2a'
        },
        nested: [
          {
            body: 'NestedFooBar2a'
          }
        ],
        body: 'FooBar2a'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3a'
        },
        nested: [
          {
            body: 'NestedFooBar3a'
          }
        ],
        body: 'FooBar3a'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }, {
        _id: this.postId5,
        subdocument: {
          body: 'SubdocumentFooBar5a'
        },
        nested: [
          {
            body: 'NestedFooBar5'
          }, {
            body: 'NestedFooBar5a'
          }, {
            body: 'NestedFooBar5'
          }
        ],
        body: 'FooBar5a'
      }
    ]);
    testSetEqual(test, this.person2.nestedPosts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1a'
        },
        nested: [
          {
            body: 'NestedFooBar1a'
          }
        ],
        body: 'FooBar1a'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }
    ]);
    test.equal(_.omit(this.person3, 'posts', 'subdocumentPosts', 'subdocumentsPosts', 'nestedPosts'), {
      _id: this.person3Id,
      _schema: '1.0.0',
      username: 'person3',
      displayName: 'Person 3',
      count: 9
    });
    testSetEqual(test, this.person3.posts, []);
    testSetEqual(test, this.person3.subdocumentPosts, [
      {
        _id: this.postId5,
        subdocument: {
          body: 'SubdocumentFooBar5a'
        },
        nested: [
          {
            body: 'NestedFooBar5'
          }, {
            body: 'NestedFooBar5a'
          }, {
            body: 'NestedFooBar5'
          }
        ],
        body: 'FooBar5a'
      }
    ]);
    testSetEqual(test, this.person3.subdocumentsPosts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1a'
        },
        nested: [
          {
            body: 'NestedFooBar1a'
          }
        ],
        body: 'FooBar1a'
      }, {
        _id: this.postId2,
        subdocument: {
          body: 'SubdocumentFooBar2a'
        },
        nested: [
          {
            body: 'NestedFooBar2a'
          }
        ],
        body: 'FooBar2a'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3a'
        },
        nested: [
          {
            body: 'NestedFooBar3a'
          }
        ],
        body: 'FooBar3a'
      }, {
        _id: this.postId5,
        subdocument: {
          body: 'SubdocumentFooBar5a'
        },
        nested: [
          {
            body: 'NestedFooBar5'
          }, {
            body: 'NestedFooBar5a'
          }, {
            body: 'NestedFooBar5'
          }
        ],
        body: 'FooBar5a'
      }
    ]);
    testSetEqual(test, this.person3.nestedPosts, [
      {
        _id: this.postId2,
        subdocument: {
          body: 'SubdocumentFooBar2a'
        },
        nested: [
          {
            body: 'NestedFooBar2a'
          }
        ],
        body: 'FooBar2a'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3a'
        },
        nested: [
          {
            body: 'NestedFooBar3a'
          }
        ],
        body: 'FooBar3a'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }, {
        _id: this.postId5,
        subdocument: {
          body: 'SubdocumentFooBar5a'
        },
        nested: [
          {
            body: 'NestedFooBar5'
          }, {
            body: 'NestedFooBar5a'
          }, {
            body: 'NestedFooBar5'
          }
        ],
        body: 'FooBar5a'
      }
    ]);
    Post.documents.update(this.postId5, {
      $set: {
        'subdocument.person': null
      }
    }, expect((function(_this) {
      return function(error, res) {
        test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
        return test.isTrue(res);
      };
    })(this)));
    return Meteor.setTimeout(expect(), WAIT_TIME);
  }, function(test, expect) {
    this.post5 = Post.documents.findOne(this.postId5, {
      transform: null
    });
    test.equal(this.post5, {
      _id: this.postId5,
      _schema: '1.0.0',
      author: {
        _id: this.person1Id,
        username: 'person1',
        displayName: 'Person 1'
      },
      subdocument: {
        person: null,
        persons: [
          {
            _id: this.person3Id,
            displayName: 'Person 3',
            username: 'person3'
          }, {
            _id: this.person3Id,
            displayName: 'Person 3',
            username: 'person3'
          }, {
            _id: this.person3Id,
            displayName: 'Person 3',
            username: 'person3'
          }, {
            _id: this.person3Id,
            displayName: 'Person 3',
            username: 'person3'
          }, {
            _id: this.person2Id,
            displayName: 'Person 2',
            username: 'person2'
          }, {
            _id: this.person3Id,
            displayName: 'Person 3',
            username: 'person3'
          }
        ],
        slug: 'subdocument-prefix-foobar5a-subdocumentfoobar5a-suffix',
        body: 'SubdocumentFooBar5a'
      },
      nested: [
        {
          required: {
            _id: this.person3Id,
            username: 'person3',
            displayName: 'Person 3'
          },
          slug: 'nested-prefix-foobar5a-nestedfoobar5-suffix',
          body: 'NestedFooBar5'
        }, {
          required: {
            _id: this.person3Id,
            username: 'person3',
            displayName: 'Person 3'
          },
          slug: 'nested-prefix-foobar5a-nestedfoobar5a-suffix',
          body: 'NestedFooBar5a'
        }, {
          required: {
            _id: this.person3Id,
            username: 'person3',
            displayName: 'Person 3'
          },
          slug: 'nested-prefix-foobar5a-nestedfoobar5-suffix',
          body: 'NestedFooBar5'
        }
      ],
      body: 'FooBar5a',
      slug: 'prefix-foobar5a-subdocumentfoobar5a-suffix',
      tags: ['tag-0-prefix-foobar5a-subdocumentfoobar5a-suffix', 'tag-1-prefix-foobar5a-nestedfoobar5-suffix', 'tag-2-prefix-foobar5a-nestedfoobar5a-suffix', 'tag-3-prefix-foobar5a-nestedfoobar5-suffix']
    });
    this.person1 = Person.documents.findOne(this.person1Id, {
      transform: null
    });
    this.person2 = Person.documents.findOne(this.person2Id, {
      transform: null
    });
    this.person3 = Person.documents.findOne(this.person3Id, {
      transform: null
    });
    test.equal(_.omit(this.person1, 'posts', 'subdocumentPosts', 'subdocumentsPosts', 'nestedPosts'), {
      _id: this.person1Id,
      _schema: '1.0.0',
      username: 'person1',
      displayName: 'Person 1',
      count: 13
    });
    testSetEqual(test, this.person1.posts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1a'
        },
        nested: [
          {
            body: 'NestedFooBar1a'
          }
        ],
        body: 'FooBar1a'
      }, {
        _id: this.postId2,
        subdocument: {
          body: 'SubdocumentFooBar2a'
        },
        nested: [
          {
            body: 'NestedFooBar2a'
          }
        ],
        body: 'FooBar2a'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3a'
        },
        nested: [
          {
            body: 'NestedFooBar3a'
          }
        ],
        body: 'FooBar3a'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }, {
        _id: this.postId5,
        subdocument: {
          body: 'SubdocumentFooBar5a'
        },
        nested: [
          {
            body: 'NestedFooBar5'
          }, {
            body: 'NestedFooBar5a'
          }, {
            body: 'NestedFooBar5'
          }
        ],
        body: 'FooBar5a'
      }
    ]);
    testSetEqual(test, this.person1.subdocumentPosts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1a'
        },
        nested: [
          {
            body: 'NestedFooBar1a'
          }
        ],
        body: 'FooBar1a'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3a'
        },
        nested: [
          {
            body: 'NestedFooBar3a'
          }
        ],
        body: 'FooBar3a'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }
    ]);
    testSetEqual(test, this.person1.subdocumentsPosts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1a'
        },
        nested: [
          {
            body: 'NestedFooBar1a'
          }
        ],
        body: 'FooBar1a'
      }, {
        _id: this.postId2,
        subdocument: {
          body: 'SubdocumentFooBar2a'
        },
        nested: [
          {
            body: 'NestedFooBar2a'
          }
        ],
        body: 'FooBar2a'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3a'
        },
        nested: [
          {
            body: 'NestedFooBar3a'
          }
        ],
        body: 'FooBar3a'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }
    ]);
    testSetEqual(test, this.person1.nestedPosts, [
      {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }
    ]);
    test.equal(_.omit(this.person2, 'posts', 'subdocumentPosts', 'subdocumentsPosts', 'nestedPosts'), {
      _id: this.person2Id,
      _schema: '1.0.0',
      username: 'person2',
      displayName: 'Person 2',
      count: 8
    });
    testSetEqual(test, this.person2.posts, []);
    testSetEqual(test, this.person2.subdocumentPosts, [
      {
        _id: this.postId2,
        subdocument: {
          body: 'SubdocumentFooBar2a'
        },
        nested: [
          {
            body: 'NestedFooBar2a'
          }
        ],
        body: 'FooBar2a'
      }
    ]);
    testSetEqual(test, this.person2.subdocumentsPosts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1a'
        },
        nested: [
          {
            body: 'NestedFooBar1a'
          }
        ],
        body: 'FooBar1a'
      }, {
        _id: this.postId2,
        subdocument: {
          body: 'SubdocumentFooBar2a'
        },
        nested: [
          {
            body: 'NestedFooBar2a'
          }
        ],
        body: 'FooBar2a'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3a'
        },
        nested: [
          {
            body: 'NestedFooBar3a'
          }
        ],
        body: 'FooBar3a'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }, {
        _id: this.postId5,
        subdocument: {
          body: 'SubdocumentFooBar5a'
        },
        nested: [
          {
            body: 'NestedFooBar5'
          }, {
            body: 'NestedFooBar5a'
          }, {
            body: 'NestedFooBar5'
          }
        ],
        body: 'FooBar5a'
      }
    ]);
    testSetEqual(test, this.person2.nestedPosts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1a'
        },
        nested: [
          {
            body: 'NestedFooBar1a'
          }
        ],
        body: 'FooBar1a'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }
    ]);
    test.equal(_.omit(this.person3, 'posts', 'subdocumentPosts', 'subdocumentsPosts', 'nestedPosts'), {
      _id: this.person3Id,
      _schema: '1.0.0',
      username: 'person3',
      displayName: 'Person 3',
      count: 8
    });
    testSetEqual(test, this.person3.posts, []);
    testSetEqual(test, this.person3.subdocumentPosts, []);
    testSetEqual(test, this.person3.subdocumentsPosts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1a'
        },
        nested: [
          {
            body: 'NestedFooBar1a'
          }
        ],
        body: 'FooBar1a'
      }, {
        _id: this.postId2,
        subdocument: {
          body: 'SubdocumentFooBar2a'
        },
        nested: [
          {
            body: 'NestedFooBar2a'
          }
        ],
        body: 'FooBar2a'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3a'
        },
        nested: [
          {
            body: 'NestedFooBar3a'
          }
        ],
        body: 'FooBar3a'
      }, {
        _id: this.postId5,
        subdocument: {
          body: 'SubdocumentFooBar5a'
        },
        nested: [
          {
            body: 'NestedFooBar5'
          }, {
            body: 'NestedFooBar5a'
          }, {
            body: 'NestedFooBar5'
          }
        ],
        body: 'FooBar5a'
      }
    ]);
    testSetEqual(test, this.person3.nestedPosts, [
      {
        _id: this.postId2,
        subdocument: {
          body: 'SubdocumentFooBar2a'
        },
        nested: [
          {
            body: 'NestedFooBar2a'
          }
        ],
        body: 'FooBar2a'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3a'
        },
        nested: [
          {
            body: 'NestedFooBar3a'
          }
        ],
        body: 'FooBar3a'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }, {
        _id: this.postId5,
        subdocument: {
          body: 'SubdocumentFooBar5a'
        },
        nested: [
          {
            body: 'NestedFooBar5'
          }, {
            body: 'NestedFooBar5a'
          }, {
            body: 'NestedFooBar5'
          }
        ],
        body: 'FooBar5a'
      }
    ]);
    Post.documents.update(this.postId5, {
      $set: {
        'subdocument.person': {
          _id: this.person3Id
        }
      }
    }, expect((function(_this) {
      return function(error, res) {
        test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
        return test.isTrue(res);
      };
    })(this)));
    return Meteor.setTimeout(expect(), WAIT_TIME);
  }, function(test, expect) {
    this.post5 = Post.documents.findOne(this.postId5, {
      transform: null
    });
    test.equal(this.post5, {
      _id: this.postId5,
      _schema: '1.0.0',
      author: {
        _id: this.person1Id,
        username: 'person1',
        displayName: 'Person 1'
      },
      subdocument: {
        person: {
          _id: this.person3Id,
          displayName: 'Person 3',
          username: 'person3'
        },
        persons: [
          {
            _id: this.person3Id,
            displayName: 'Person 3',
            username: 'person3'
          }, {
            _id: this.person3Id,
            displayName: 'Person 3',
            username: 'person3'
          }, {
            _id: this.person3Id,
            displayName: 'Person 3',
            username: 'person3'
          }, {
            _id: this.person3Id,
            displayName: 'Person 3',
            username: 'person3'
          }, {
            _id: this.person2Id,
            displayName: 'Person 2',
            username: 'person2'
          }, {
            _id: this.person3Id,
            displayName: 'Person 3',
            username: 'person3'
          }
        ],
        slug: 'subdocument-prefix-foobar5a-subdocumentfoobar5a-suffix',
        body: 'SubdocumentFooBar5a'
      },
      nested: [
        {
          required: {
            _id: this.person3Id,
            username: 'person3',
            displayName: 'Person 3'
          },
          slug: 'nested-prefix-foobar5a-nestedfoobar5-suffix',
          body: 'NestedFooBar5'
        }, {
          required: {
            _id: this.person3Id,
            username: 'person3',
            displayName: 'Person 3'
          },
          slug: 'nested-prefix-foobar5a-nestedfoobar5a-suffix',
          body: 'NestedFooBar5a'
        }, {
          required: {
            _id: this.person3Id,
            username: 'person3',
            displayName: 'Person 3'
          },
          slug: 'nested-prefix-foobar5a-nestedfoobar5-suffix',
          body: 'NestedFooBar5'
        }
      ],
      body: 'FooBar5a',
      slug: 'prefix-foobar5a-subdocumentfoobar5a-suffix',
      tags: ['tag-0-prefix-foobar5a-subdocumentfoobar5a-suffix', 'tag-1-prefix-foobar5a-nestedfoobar5-suffix', 'tag-2-prefix-foobar5a-nestedfoobar5a-suffix', 'tag-3-prefix-foobar5a-nestedfoobar5-suffix']
    });
    this.person1 = Person.documents.findOne(this.person1Id, {
      transform: null
    });
    this.person2 = Person.documents.findOne(this.person2Id, {
      transform: null
    });
    this.person3 = Person.documents.findOne(this.person3Id, {
      transform: null
    });
    test.equal(_.omit(this.person1, 'posts', 'subdocumentPosts', 'subdocumentsPosts', 'nestedPosts'), {
      _id: this.person1Id,
      _schema: '1.0.0',
      username: 'person1',
      displayName: 'Person 1',
      count: 13
    });
    testSetEqual(test, this.person1.posts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1a'
        },
        nested: [
          {
            body: 'NestedFooBar1a'
          }
        ],
        body: 'FooBar1a'
      }, {
        _id: this.postId2,
        subdocument: {
          body: 'SubdocumentFooBar2a'
        },
        nested: [
          {
            body: 'NestedFooBar2a'
          }
        ],
        body: 'FooBar2a'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3a'
        },
        nested: [
          {
            body: 'NestedFooBar3a'
          }
        ],
        body: 'FooBar3a'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }, {
        _id: this.postId5,
        subdocument: {
          body: 'SubdocumentFooBar5a'
        },
        nested: [
          {
            body: 'NestedFooBar5'
          }, {
            body: 'NestedFooBar5a'
          }, {
            body: 'NestedFooBar5'
          }
        ],
        body: 'FooBar5a'
      }
    ]);
    testSetEqual(test, this.person1.subdocumentPosts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1a'
        },
        nested: [
          {
            body: 'NestedFooBar1a'
          }
        ],
        body: 'FooBar1a'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3a'
        },
        nested: [
          {
            body: 'NestedFooBar3a'
          }
        ],
        body: 'FooBar3a'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }
    ]);
    testSetEqual(test, this.person1.subdocumentsPosts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1a'
        },
        nested: [
          {
            body: 'NestedFooBar1a'
          }
        ],
        body: 'FooBar1a'
      }, {
        _id: this.postId2,
        subdocument: {
          body: 'SubdocumentFooBar2a'
        },
        nested: [
          {
            body: 'NestedFooBar2a'
          }
        ],
        body: 'FooBar2a'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3a'
        },
        nested: [
          {
            body: 'NestedFooBar3a'
          }
        ],
        body: 'FooBar3a'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }
    ]);
    testSetEqual(test, this.person1.nestedPosts, [
      {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }
    ]);
    test.equal(_.omit(this.person2, 'posts', 'subdocumentPosts', 'subdocumentsPosts', 'nestedPosts'), {
      _id: this.person2Id,
      _schema: '1.0.0',
      username: 'person2',
      displayName: 'Person 2',
      count: 8
    });
    testSetEqual(test, this.person2.posts, []);
    testSetEqual(test, this.person2.subdocumentPosts, [
      {
        _id: this.postId2,
        subdocument: {
          body: 'SubdocumentFooBar2a'
        },
        nested: [
          {
            body: 'NestedFooBar2a'
          }
        ],
        body: 'FooBar2a'
      }
    ]);
    testSetEqual(test, this.person2.subdocumentsPosts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1a'
        },
        nested: [
          {
            body: 'NestedFooBar1a'
          }
        ],
        body: 'FooBar1a'
      }, {
        _id: this.postId2,
        subdocument: {
          body: 'SubdocumentFooBar2a'
        },
        nested: [
          {
            body: 'NestedFooBar2a'
          }
        ],
        body: 'FooBar2a'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3a'
        },
        nested: [
          {
            body: 'NestedFooBar3a'
          }
        ],
        body: 'FooBar3a'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }, {
        _id: this.postId5,
        subdocument: {
          body: 'SubdocumentFooBar5a'
        },
        nested: [
          {
            body: 'NestedFooBar5'
          }, {
            body: 'NestedFooBar5a'
          }, {
            body: 'NestedFooBar5'
          }
        ],
        body: 'FooBar5a'
      }
    ]);
    testSetEqual(test, this.person2.nestedPosts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1a'
        },
        nested: [
          {
            body: 'NestedFooBar1a'
          }
        ],
        body: 'FooBar1a'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }
    ]);
    test.equal(_.omit(this.person3, 'posts', 'subdocumentPosts', 'subdocumentsPosts', 'nestedPosts'), {
      _id: this.person3Id,
      _schema: '1.0.0',
      username: 'person3',
      displayName: 'Person 3',
      count: 9
    });
    testSetEqual(test, this.person3.posts, []);
    testSetEqual(test, this.person3.subdocumentPosts, [
      {
        _id: this.postId5,
        subdocument: {
          body: 'SubdocumentFooBar5a'
        },
        nested: [
          {
            body: 'NestedFooBar5'
          }, {
            body: 'NestedFooBar5a'
          }, {
            body: 'NestedFooBar5'
          }
        ],
        body: 'FooBar5a'
      }
    ]);
    testSetEqual(test, this.person3.subdocumentsPosts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1a'
        },
        nested: [
          {
            body: 'NestedFooBar1a'
          }
        ],
        body: 'FooBar1a'
      }, {
        _id: this.postId2,
        subdocument: {
          body: 'SubdocumentFooBar2a'
        },
        nested: [
          {
            body: 'NestedFooBar2a'
          }
        ],
        body: 'FooBar2a'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3a'
        },
        nested: [
          {
            body: 'NestedFooBar3a'
          }
        ],
        body: 'FooBar3a'
      }, {
        _id: this.postId5,
        subdocument: {
          body: 'SubdocumentFooBar5a'
        },
        nested: [
          {
            body: 'NestedFooBar5'
          }, {
            body: 'NestedFooBar5a'
          }, {
            body: 'NestedFooBar5'
          }
        ],
        body: 'FooBar5a'
      }
    ]);
    testSetEqual(test, this.person3.nestedPosts, [
      {
        _id: this.postId2,
        subdocument: {
          body: 'SubdocumentFooBar2a'
        },
        nested: [
          {
            body: 'NestedFooBar2a'
          }
        ],
        body: 'FooBar2a'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3a'
        },
        nested: [
          {
            body: 'NestedFooBar3a'
          }
        ],
        body: 'FooBar3a'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }, {
        _id: this.postId5,
        subdocument: {
          body: 'SubdocumentFooBar5a'
        },
        nested: [
          {
            body: 'NestedFooBar5'
          }, {
            body: 'NestedFooBar5a'
          }, {
            body: 'NestedFooBar5'
          }
        ],
        body: 'FooBar5a'
      }
    ]);
    Post.documents.update(this.postId5, {
      $set: {
        'subdocument.person': {
          _id: this.person1Id
        }
      }
    }, expect((function(_this) {
      return function(error, res) {
        test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
        return test.isTrue(res);
      };
    })(this)));
    return Meteor.setTimeout(expect(), WAIT_TIME);
  }, function(test, expect) {
    this.post5 = Post.documents.findOne(this.postId5, {
      transform: null
    });
    test.equal(this.post5, {
      _id: this.postId5,
      _schema: '1.0.0',
      author: {
        _id: this.person1Id,
        username: 'person1',
        displayName: 'Person 1'
      },
      subdocument: {
        person: {
          _id: this.person1Id,
          displayName: 'Person 1',
          username: 'person1'
        },
        persons: [
          {
            _id: this.person3Id,
            displayName: 'Person 3',
            username: 'person3'
          }, {
            _id: this.person3Id,
            displayName: 'Person 3',
            username: 'person3'
          }, {
            _id: this.person3Id,
            displayName: 'Person 3',
            username: 'person3'
          }, {
            _id: this.person3Id,
            displayName: 'Person 3',
            username: 'person3'
          }, {
            _id: this.person2Id,
            displayName: 'Person 2',
            username: 'person2'
          }, {
            _id: this.person3Id,
            displayName: 'Person 3',
            username: 'person3'
          }
        ],
        slug: 'subdocument-prefix-foobar5a-subdocumentfoobar5a-suffix',
        body: 'SubdocumentFooBar5a'
      },
      nested: [
        {
          required: {
            _id: this.person3Id,
            username: 'person3',
            displayName: 'Person 3'
          },
          slug: 'nested-prefix-foobar5a-nestedfoobar5-suffix',
          body: 'NestedFooBar5'
        }, {
          required: {
            _id: this.person3Id,
            username: 'person3',
            displayName: 'Person 3'
          },
          slug: 'nested-prefix-foobar5a-nestedfoobar5a-suffix',
          body: 'NestedFooBar5a'
        }, {
          required: {
            _id: this.person3Id,
            username: 'person3',
            displayName: 'Person 3'
          },
          slug: 'nested-prefix-foobar5a-nestedfoobar5-suffix',
          body: 'NestedFooBar5'
        }
      ],
      body: 'FooBar5a',
      slug: 'prefix-foobar5a-subdocumentfoobar5a-suffix',
      tags: ['tag-0-prefix-foobar5a-subdocumentfoobar5a-suffix', 'tag-1-prefix-foobar5a-nestedfoobar5-suffix', 'tag-2-prefix-foobar5a-nestedfoobar5a-suffix', 'tag-3-prefix-foobar5a-nestedfoobar5-suffix']
    });
    this.person1 = Person.documents.findOne(this.person1Id, {
      transform: null
    });
    this.person2 = Person.documents.findOne(this.person2Id, {
      transform: null
    });
    this.person3 = Person.documents.findOne(this.person3Id, {
      transform: null
    });
    test.equal(_.omit(this.person1, 'posts', 'subdocumentPosts', 'subdocumentsPosts', 'nestedPosts'), {
      _id: this.person1Id,
      _schema: '1.0.0',
      username: 'person1',
      displayName: 'Person 1',
      count: 14
    });
    testSetEqual(test, this.person1.posts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1a'
        },
        nested: [
          {
            body: 'NestedFooBar1a'
          }
        ],
        body: 'FooBar1a'
      }, {
        _id: this.postId2,
        subdocument: {
          body: 'SubdocumentFooBar2a'
        },
        nested: [
          {
            body: 'NestedFooBar2a'
          }
        ],
        body: 'FooBar2a'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3a'
        },
        nested: [
          {
            body: 'NestedFooBar3a'
          }
        ],
        body: 'FooBar3a'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }, {
        _id: this.postId5,
        subdocument: {
          body: 'SubdocumentFooBar5a'
        },
        nested: [
          {
            body: 'NestedFooBar5'
          }, {
            body: 'NestedFooBar5a'
          }, {
            body: 'NestedFooBar5'
          }
        ],
        body: 'FooBar5a'
      }
    ]);
    testSetEqual(test, this.person1.subdocumentPosts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1a'
        },
        nested: [
          {
            body: 'NestedFooBar1a'
          }
        ],
        body: 'FooBar1a'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3a'
        },
        nested: [
          {
            body: 'NestedFooBar3a'
          }
        ],
        body: 'FooBar3a'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }, {
        _id: this.postId5,
        subdocument: {
          body: 'SubdocumentFooBar5a'
        },
        nested: [
          {
            body: 'NestedFooBar5'
          }, {
            body: 'NestedFooBar5a'
          }, {
            body: 'NestedFooBar5'
          }
        ],
        body: 'FooBar5a'
      }
    ]);
    testSetEqual(test, this.person1.subdocumentsPosts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1a'
        },
        nested: [
          {
            body: 'NestedFooBar1a'
          }
        ],
        body: 'FooBar1a'
      }, {
        _id: this.postId2,
        subdocument: {
          body: 'SubdocumentFooBar2a'
        },
        nested: [
          {
            body: 'NestedFooBar2a'
          }
        ],
        body: 'FooBar2a'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3a'
        },
        nested: [
          {
            body: 'NestedFooBar3a'
          }
        ],
        body: 'FooBar3a'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }
    ]);
    testSetEqual(test, this.person1.nestedPosts, [
      {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }
    ]);
    test.equal(_.omit(this.person2, 'posts', 'subdocumentPosts', 'subdocumentsPosts', 'nestedPosts'), {
      _id: this.person2Id,
      _schema: '1.0.0',
      username: 'person2',
      displayName: 'Person 2',
      count: 8
    });
    testSetEqual(test, this.person2.posts, []);
    testSetEqual(test, this.person2.subdocumentPosts, [
      {
        _id: this.postId2,
        subdocument: {
          body: 'SubdocumentFooBar2a'
        },
        nested: [
          {
            body: 'NestedFooBar2a'
          }
        ],
        body: 'FooBar2a'
      }
    ]);
    testSetEqual(test, this.person2.subdocumentsPosts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1a'
        },
        nested: [
          {
            body: 'NestedFooBar1a'
          }
        ],
        body: 'FooBar1a'
      }, {
        _id: this.postId2,
        subdocument: {
          body: 'SubdocumentFooBar2a'
        },
        nested: [
          {
            body: 'NestedFooBar2a'
          }
        ],
        body: 'FooBar2a'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3a'
        },
        nested: [
          {
            body: 'NestedFooBar3a'
          }
        ],
        body: 'FooBar3a'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }, {
        _id: this.postId5,
        subdocument: {
          body: 'SubdocumentFooBar5a'
        },
        nested: [
          {
            body: 'NestedFooBar5'
          }, {
            body: 'NestedFooBar5a'
          }, {
            body: 'NestedFooBar5'
          }
        ],
        body: 'FooBar5a'
      }
    ]);
    testSetEqual(test, this.person2.nestedPosts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1a'
        },
        nested: [
          {
            body: 'NestedFooBar1a'
          }
        ],
        body: 'FooBar1a'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }
    ]);
    test.equal(_.omit(this.person3, 'posts', 'subdocumentPosts', 'subdocumentsPosts', 'nestedPosts'), {
      _id: this.person3Id,
      _schema: '1.0.0',
      username: 'person3',
      displayName: 'Person 3',
      count: 8
    });
    testSetEqual(test, this.person3.posts, []);
    testSetEqual(test, this.person3.subdocumentPosts, []);
    testSetEqual(test, this.person3.subdocumentsPosts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1a'
        },
        nested: [
          {
            body: 'NestedFooBar1a'
          }
        ],
        body: 'FooBar1a'
      }, {
        _id: this.postId2,
        subdocument: {
          body: 'SubdocumentFooBar2a'
        },
        nested: [
          {
            body: 'NestedFooBar2a'
          }
        ],
        body: 'FooBar2a'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3a'
        },
        nested: [
          {
            body: 'NestedFooBar3a'
          }
        ],
        body: 'FooBar3a'
      }, {
        _id: this.postId5,
        subdocument: {
          body: 'SubdocumentFooBar5a'
        },
        nested: [
          {
            body: 'NestedFooBar5'
          }, {
            body: 'NestedFooBar5a'
          }, {
            body: 'NestedFooBar5'
          }
        ],
        body: 'FooBar5a'
      }
    ]);
    testSetEqual(test, this.person3.nestedPosts, [
      {
        _id: this.postId2,
        subdocument: {
          body: 'SubdocumentFooBar2a'
        },
        nested: [
          {
            body: 'NestedFooBar2a'
          }
        ],
        body: 'FooBar2a'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3a'
        },
        nested: [
          {
            body: 'NestedFooBar3a'
          }
        ],
        body: 'FooBar3a'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }, {
        _id: this.postId5,
        subdocument: {
          body: 'SubdocumentFooBar5a'
        },
        nested: [
          {
            body: 'NestedFooBar5'
          }, {
            body: 'NestedFooBar5a'
          }, {
            body: 'NestedFooBar5'
          }
        ],
        body: 'FooBar5a'
      }
    ]);
    Post.documents.update(this.postId5, {
      $unset: {
        'subdocument.person': ''
      }
    }, expect((function(_this) {
      return function(error, res) {
        test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
        return test.isTrue(res);
      };
    })(this)));
    return Meteor.setTimeout(expect(), WAIT_TIME);
  }, function(test, expect) {
    this.post5 = Post.documents.findOne(this.postId5, {
      transform: null
    });
    test.equal(this.post5, {
      _id: this.postId5,
      _schema: '1.0.0',
      author: {
        _id: this.person1Id,
        username: 'person1',
        displayName: 'Person 1'
      },
      subdocument: {
        persons: [
          {
            _id: this.person3Id,
            displayName: 'Person 3',
            username: 'person3'
          }, {
            _id: this.person3Id,
            displayName: 'Person 3',
            username: 'person3'
          }, {
            _id: this.person3Id,
            displayName: 'Person 3',
            username: 'person3'
          }, {
            _id: this.person3Id,
            displayName: 'Person 3',
            username: 'person3'
          }, {
            _id: this.person2Id,
            displayName: 'Person 2',
            username: 'person2'
          }, {
            _id: this.person3Id,
            displayName: 'Person 3',
            username: 'person3'
          }
        ],
        slug: 'subdocument-prefix-foobar5a-subdocumentfoobar5a-suffix',
        body: 'SubdocumentFooBar5a'
      },
      nested: [
        {
          required: {
            _id: this.person3Id,
            username: 'person3',
            displayName: 'Person 3'
          },
          slug: 'nested-prefix-foobar5a-nestedfoobar5-suffix',
          body: 'NestedFooBar5'
        }, {
          required: {
            _id: this.person3Id,
            username: 'person3',
            displayName: 'Person 3'
          },
          slug: 'nested-prefix-foobar5a-nestedfoobar5a-suffix',
          body: 'NestedFooBar5a'
        }, {
          required: {
            _id: this.person3Id,
            username: 'person3',
            displayName: 'Person 3'
          },
          slug: 'nested-prefix-foobar5a-nestedfoobar5-suffix',
          body: 'NestedFooBar5'
        }
      ],
      body: 'FooBar5a',
      slug: 'prefix-foobar5a-subdocumentfoobar5a-suffix',
      tags: ['tag-0-prefix-foobar5a-subdocumentfoobar5a-suffix', 'tag-1-prefix-foobar5a-nestedfoobar5-suffix', 'tag-2-prefix-foobar5a-nestedfoobar5a-suffix', 'tag-3-prefix-foobar5a-nestedfoobar5-suffix']
    });
    this.person1 = Person.documents.findOne(this.person1Id, {
      transform: null
    });
    this.person2 = Person.documents.findOne(this.person2Id, {
      transform: null
    });
    this.person3 = Person.documents.findOne(this.person3Id, {
      transform: null
    });
    test.equal(_.omit(this.person1, 'posts', 'subdocumentPosts', 'subdocumentsPosts', 'nestedPosts'), {
      _id: this.person1Id,
      _schema: '1.0.0',
      username: 'person1',
      displayName: 'Person 1',
      count: 13
    });
    testSetEqual(test, this.person1.posts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1a'
        },
        nested: [
          {
            body: 'NestedFooBar1a'
          }
        ],
        body: 'FooBar1a'
      }, {
        _id: this.postId2,
        subdocument: {
          body: 'SubdocumentFooBar2a'
        },
        nested: [
          {
            body: 'NestedFooBar2a'
          }
        ],
        body: 'FooBar2a'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3a'
        },
        nested: [
          {
            body: 'NestedFooBar3a'
          }
        ],
        body: 'FooBar3a'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }, {
        _id: this.postId5,
        subdocument: {
          body: 'SubdocumentFooBar5a'
        },
        nested: [
          {
            body: 'NestedFooBar5'
          }, {
            body: 'NestedFooBar5a'
          }, {
            body: 'NestedFooBar5'
          }
        ],
        body: 'FooBar5a'
      }
    ]);
    testSetEqual(test, this.person1.subdocumentPosts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1a'
        },
        nested: [
          {
            body: 'NestedFooBar1a'
          }
        ],
        body: 'FooBar1a'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3a'
        },
        nested: [
          {
            body: 'NestedFooBar3a'
          }
        ],
        body: 'FooBar3a'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }
    ]);
    testSetEqual(test, this.person1.subdocumentsPosts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1a'
        },
        nested: [
          {
            body: 'NestedFooBar1a'
          }
        ],
        body: 'FooBar1a'
      }, {
        _id: this.postId2,
        subdocument: {
          body: 'SubdocumentFooBar2a'
        },
        nested: [
          {
            body: 'NestedFooBar2a'
          }
        ],
        body: 'FooBar2a'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3a'
        },
        nested: [
          {
            body: 'NestedFooBar3a'
          }
        ],
        body: 'FooBar3a'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }
    ]);
    testSetEqual(test, this.person1.nestedPosts, [
      {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }
    ]);
    test.equal(_.omit(this.person2, 'posts', 'subdocumentPosts', 'subdocumentsPosts', 'nestedPosts'), {
      _id: this.person2Id,
      _schema: '1.0.0',
      username: 'person2',
      displayName: 'Person 2',
      count: 8
    });
    testSetEqual(test, this.person2.posts, []);
    testSetEqual(test, this.person2.subdocumentPosts, [
      {
        _id: this.postId2,
        subdocument: {
          body: 'SubdocumentFooBar2a'
        },
        nested: [
          {
            body: 'NestedFooBar2a'
          }
        ],
        body: 'FooBar2a'
      }
    ]);
    testSetEqual(test, this.person2.subdocumentsPosts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1a'
        },
        nested: [
          {
            body: 'NestedFooBar1a'
          }
        ],
        body: 'FooBar1a'
      }, {
        _id: this.postId2,
        subdocument: {
          body: 'SubdocumentFooBar2a'
        },
        nested: [
          {
            body: 'NestedFooBar2a'
          }
        ],
        body: 'FooBar2a'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3a'
        },
        nested: [
          {
            body: 'NestedFooBar3a'
          }
        ],
        body: 'FooBar3a'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }, {
        _id: this.postId5,
        subdocument: {
          body: 'SubdocumentFooBar5a'
        },
        nested: [
          {
            body: 'NestedFooBar5'
          }, {
            body: 'NestedFooBar5a'
          }, {
            body: 'NestedFooBar5'
          }
        ],
        body: 'FooBar5a'
      }
    ]);
    testSetEqual(test, this.person2.nestedPosts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1a'
        },
        nested: [
          {
            body: 'NestedFooBar1a'
          }
        ],
        body: 'FooBar1a'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }
    ]);
    test.equal(_.omit(this.person3, 'posts', 'subdocumentPosts', 'subdocumentsPosts', 'nestedPosts'), {
      _id: this.person3Id,
      _schema: '1.0.0',
      username: 'person3',
      displayName: 'Person 3',
      count: 8
    });
    testSetEqual(test, this.person3.posts, []);
    testSetEqual(test, this.person3.subdocumentPosts, []);
    testSetEqual(test, this.person3.subdocumentsPosts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1a'
        },
        nested: [
          {
            body: 'NestedFooBar1a'
          }
        ],
        body: 'FooBar1a'
      }, {
        _id: this.postId2,
        subdocument: {
          body: 'SubdocumentFooBar2a'
        },
        nested: [
          {
            body: 'NestedFooBar2a'
          }
        ],
        body: 'FooBar2a'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3a'
        },
        nested: [
          {
            body: 'NestedFooBar3a'
          }
        ],
        body: 'FooBar3a'
      }, {
        _id: this.postId5,
        subdocument: {
          body: 'SubdocumentFooBar5a'
        },
        nested: [
          {
            body: 'NestedFooBar5'
          }, {
            body: 'NestedFooBar5a'
          }, {
            body: 'NestedFooBar5'
          }
        ],
        body: 'FooBar5a'
      }
    ]);
    testSetEqual(test, this.person3.nestedPosts, [
      {
        _id: this.postId2,
        subdocument: {
          body: 'SubdocumentFooBar2a'
        },
        nested: [
          {
            body: 'NestedFooBar2a'
          }
        ],
        body: 'FooBar2a'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3a'
        },
        nested: [
          {
            body: 'NestedFooBar3a'
          }
        ],
        body: 'FooBar3a'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }, {
        _id: this.postId5,
        subdocument: {
          body: 'SubdocumentFooBar5a'
        },
        nested: [
          {
            body: 'NestedFooBar5'
          }, {
            body: 'NestedFooBar5a'
          }, {
            body: 'NestedFooBar5'
          }
        ],
        body: 'FooBar5a'
      }
    ]);
    Post.documents.update(this.postId5, {
      $set: {
        author: {
          _id: this.person2Id
        }
      }
    }, expect((function(_this) {
      return function(error, res) {
        test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
        return test.isTrue(res);
      };
    })(this)));
    return Meteor.setTimeout(expect(), WAIT_TIME);
  }, function(test, expect) {
    this.post5 = Post.documents.findOne(this.postId5, {
      transform: null
    });
    test.equal(this.post5, {
      _id: this.postId5,
      _schema: '1.0.0',
      author: {
        _id: this.person2Id,
        username: 'person2',
        displayName: 'Person 2'
      },
      subdocument: {
        persons: [
          {
            _id: this.person3Id,
            displayName: 'Person 3',
            username: 'person3'
          }, {
            _id: this.person3Id,
            displayName: 'Person 3',
            username: 'person3'
          }, {
            _id: this.person3Id,
            displayName: 'Person 3',
            username: 'person3'
          }, {
            _id: this.person3Id,
            displayName: 'Person 3',
            username: 'person3'
          }, {
            _id: this.person2Id,
            displayName: 'Person 2',
            username: 'person2'
          }, {
            _id: this.person3Id,
            displayName: 'Person 3',
            username: 'person3'
          }
        ],
        slug: 'subdocument-prefix-foobar5a-subdocumentfoobar5a-suffix',
        body: 'SubdocumentFooBar5a'
      },
      nested: [
        {
          required: {
            _id: this.person3Id,
            username: 'person3',
            displayName: 'Person 3'
          },
          slug: 'nested-prefix-foobar5a-nestedfoobar5-suffix',
          body: 'NestedFooBar5'
        }, {
          required: {
            _id: this.person3Id,
            username: 'person3',
            displayName: 'Person 3'
          },
          slug: 'nested-prefix-foobar5a-nestedfoobar5a-suffix',
          body: 'NestedFooBar5a'
        }, {
          required: {
            _id: this.person3Id,
            username: 'person3',
            displayName: 'Person 3'
          },
          slug: 'nested-prefix-foobar5a-nestedfoobar5-suffix',
          body: 'NestedFooBar5'
        }
      ],
      body: 'FooBar5a',
      slug: 'prefix-foobar5a-subdocumentfoobar5a-suffix',
      tags: ['tag-0-prefix-foobar5a-subdocumentfoobar5a-suffix', 'tag-1-prefix-foobar5a-nestedfoobar5-suffix', 'tag-2-prefix-foobar5a-nestedfoobar5a-suffix', 'tag-3-prefix-foobar5a-nestedfoobar5-suffix']
    });
    this.person1 = Person.documents.findOne(this.person1Id, {
      transform: null
    });
    this.person2 = Person.documents.findOne(this.person2Id, {
      transform: null
    });
    this.person3 = Person.documents.findOne(this.person3Id, {
      transform: null
    });
    test.equal(_.omit(this.person1, 'posts', 'subdocumentPosts', 'subdocumentsPosts', 'nestedPosts'), {
      _id: this.person1Id,
      _schema: '1.0.0',
      username: 'person1',
      displayName: 'Person 1',
      count: 12
    });
    testSetEqual(test, this.person1.posts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1a'
        },
        nested: [
          {
            body: 'NestedFooBar1a'
          }
        ],
        body: 'FooBar1a'
      }, {
        _id: this.postId2,
        subdocument: {
          body: 'SubdocumentFooBar2a'
        },
        nested: [
          {
            body: 'NestedFooBar2a'
          }
        ],
        body: 'FooBar2a'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3a'
        },
        nested: [
          {
            body: 'NestedFooBar3a'
          }
        ],
        body: 'FooBar3a'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }
    ]);
    testSetEqual(test, this.person1.subdocumentPosts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1a'
        },
        nested: [
          {
            body: 'NestedFooBar1a'
          }
        ],
        body: 'FooBar1a'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3a'
        },
        nested: [
          {
            body: 'NestedFooBar3a'
          }
        ],
        body: 'FooBar3a'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }
    ]);
    testSetEqual(test, this.person1.subdocumentsPosts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1a'
        },
        nested: [
          {
            body: 'NestedFooBar1a'
          }
        ],
        body: 'FooBar1a'
      }, {
        _id: this.postId2,
        subdocument: {
          body: 'SubdocumentFooBar2a'
        },
        nested: [
          {
            body: 'NestedFooBar2a'
          }
        ],
        body: 'FooBar2a'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3a'
        },
        nested: [
          {
            body: 'NestedFooBar3a'
          }
        ],
        body: 'FooBar3a'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }
    ]);
    testSetEqual(test, this.person1.nestedPosts, [
      {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }
    ]);
    test.equal(_.omit(this.person2, 'posts', 'subdocumentPosts', 'subdocumentsPosts', 'nestedPosts'), {
      _id: this.person2Id,
      _schema: '1.0.0',
      username: 'person2',
      displayName: 'Person 2',
      count: 9
    });
    testSetEqual(test, this.person2.posts, [
      {
        _id: this.postId5,
        subdocument: {
          body: 'SubdocumentFooBar5a'
        },
        nested: [
          {
            body: 'NestedFooBar5'
          }, {
            body: 'NestedFooBar5a'
          }, {
            body: 'NestedFooBar5'
          }
        ],
        body: 'FooBar5a'
      }
    ]);
    testSetEqual(test, this.person2.subdocumentPosts, [
      {
        _id: this.postId2,
        subdocument: {
          body: 'SubdocumentFooBar2a'
        },
        nested: [
          {
            body: 'NestedFooBar2a'
          }
        ],
        body: 'FooBar2a'
      }
    ]);
    testSetEqual(test, this.person2.subdocumentsPosts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1a'
        },
        nested: [
          {
            body: 'NestedFooBar1a'
          }
        ],
        body: 'FooBar1a'
      }, {
        _id: this.postId2,
        subdocument: {
          body: 'SubdocumentFooBar2a'
        },
        nested: [
          {
            body: 'NestedFooBar2a'
          }
        ],
        body: 'FooBar2a'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3a'
        },
        nested: [
          {
            body: 'NestedFooBar3a'
          }
        ],
        body: 'FooBar3a'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }, {
        _id: this.postId5,
        subdocument: {
          body: 'SubdocumentFooBar5a'
        },
        nested: [
          {
            body: 'NestedFooBar5'
          }, {
            body: 'NestedFooBar5a'
          }, {
            body: 'NestedFooBar5'
          }
        ],
        body: 'FooBar5a'
      }
    ]);
    testSetEqual(test, this.person2.nestedPosts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1a'
        },
        nested: [
          {
            body: 'NestedFooBar1a'
          }
        ],
        body: 'FooBar1a'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }
    ]);
    test.equal(_.omit(this.person3, 'posts', 'subdocumentPosts', 'subdocumentsPosts', 'nestedPosts'), {
      _id: this.person3Id,
      _schema: '1.0.0',
      username: 'person3',
      displayName: 'Person 3',
      count: 8
    });
    testSetEqual(test, this.person3.posts, []);
    testSetEqual(test, this.person3.subdocumentPosts, []);
    testSetEqual(test, this.person3.subdocumentsPosts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1a'
        },
        nested: [
          {
            body: 'NestedFooBar1a'
          }
        ],
        body: 'FooBar1a'
      }, {
        _id: this.postId2,
        subdocument: {
          body: 'SubdocumentFooBar2a'
        },
        nested: [
          {
            body: 'NestedFooBar2a'
          }
        ],
        body: 'FooBar2a'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3a'
        },
        nested: [
          {
            body: 'NestedFooBar3a'
          }
        ],
        body: 'FooBar3a'
      }, {
        _id: this.postId5,
        subdocument: {
          body: 'SubdocumentFooBar5a'
        },
        nested: [
          {
            body: 'NestedFooBar5'
          }, {
            body: 'NestedFooBar5a'
          }, {
            body: 'NestedFooBar5'
          }
        ],
        body: 'FooBar5a'
      }
    ]);
    testSetEqual(test, this.person3.nestedPosts, [
      {
        _id: this.postId2,
        subdocument: {
          body: 'SubdocumentFooBar2a'
        },
        nested: [
          {
            body: 'NestedFooBar2a'
          }
        ],
        body: 'FooBar2a'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3a'
        },
        nested: [
          {
            body: 'NestedFooBar3a'
          }
        ],
        body: 'FooBar3a'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }, {
        _id: this.postId5,
        subdocument: {
          body: 'SubdocumentFooBar5a'
        },
        nested: [
          {
            body: 'NestedFooBar5'
          }, {
            body: 'NestedFooBar5a'
          }, {
            body: 'NestedFooBar5'
          }
        ],
        body: 'FooBar5a'
      }
    ]);
    Post.documents.remove(this.postId5, expect((function(_this) {
      return function(error) {
        return test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
      };
    })(this)));
    return Meteor.setTimeout(expect(), WAIT_TIME);
  }, function(test, expect) {
    this.person1 = Person.documents.findOne(this.person1Id, {
      transform: null
    });
    this.person2 = Person.documents.findOne(this.person2Id, {
      transform: null
    });
    this.person3 = Person.documents.findOne(this.person3Id, {
      transform: null
    });
    test.equal(_.omit(this.person1, 'posts', 'subdocumentPosts', 'subdocumentsPosts', 'nestedPosts'), {
      _id: this.person1Id,
      _schema: '1.0.0',
      username: 'person1',
      displayName: 'Person 1',
      count: 12
    });
    testSetEqual(test, this.person1.posts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1a'
        },
        nested: [
          {
            body: 'NestedFooBar1a'
          }
        ],
        body: 'FooBar1a'
      }, {
        _id: this.postId2,
        subdocument: {
          body: 'SubdocumentFooBar2a'
        },
        nested: [
          {
            body: 'NestedFooBar2a'
          }
        ],
        body: 'FooBar2a'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3a'
        },
        nested: [
          {
            body: 'NestedFooBar3a'
          }
        ],
        body: 'FooBar3a'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }
    ]);
    testSetEqual(test, this.person1.subdocumentPosts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1a'
        },
        nested: [
          {
            body: 'NestedFooBar1a'
          }
        ],
        body: 'FooBar1a'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3a'
        },
        nested: [
          {
            body: 'NestedFooBar3a'
          }
        ],
        body: 'FooBar3a'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }
    ]);
    testSetEqual(test, this.person1.subdocumentsPosts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1a'
        },
        nested: [
          {
            body: 'NestedFooBar1a'
          }
        ],
        body: 'FooBar1a'
      }, {
        _id: this.postId2,
        subdocument: {
          body: 'SubdocumentFooBar2a'
        },
        nested: [
          {
            body: 'NestedFooBar2a'
          }
        ],
        body: 'FooBar2a'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3a'
        },
        nested: [
          {
            body: 'NestedFooBar3a'
          }
        ],
        body: 'FooBar3a'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }
    ]);
    testSetEqual(test, this.person1.nestedPosts, [
      {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }
    ]);
    test.equal(_.omit(this.person2, 'posts', 'subdocumentPosts', 'subdocumentsPosts', 'nestedPosts'), {
      _id: this.person2Id,
      _schema: '1.0.0',
      username: 'person2',
      displayName: 'Person 2',
      count: 7
    });
    testSetEqual(test, this.person2.posts, []);
    testSetEqual(test, this.person2.subdocumentPosts, [
      {
        _id: this.postId2,
        subdocument: {
          body: 'SubdocumentFooBar2a'
        },
        nested: [
          {
            body: 'NestedFooBar2a'
          }
        ],
        body: 'FooBar2a'
      }
    ]);
    testSetEqual(test, this.person2.subdocumentsPosts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1a'
        },
        nested: [
          {
            body: 'NestedFooBar1a'
          }
        ],
        body: 'FooBar1a'
      }, {
        _id: this.postId2,
        subdocument: {
          body: 'SubdocumentFooBar2a'
        },
        nested: [
          {
            body: 'NestedFooBar2a'
          }
        ],
        body: 'FooBar2a'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3a'
        },
        nested: [
          {
            body: 'NestedFooBar3a'
          }
        ],
        body: 'FooBar3a'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }
    ]);
    testSetEqual(test, this.person2.nestedPosts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1a'
        },
        nested: [
          {
            body: 'NestedFooBar1a'
          }
        ],
        body: 'FooBar1a'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }
    ]);
    test.equal(_.omit(this.person3, 'posts', 'subdocumentPosts', 'subdocumentsPosts', 'nestedPosts'), {
      _id: this.person3Id,
      _schema: '1.0.0',
      username: 'person3',
      displayName: 'Person 3',
      count: 6
    });
    testSetEqual(test, this.person3.posts, []);
    testSetEqual(test, this.person3.subdocumentPosts, []);
    testSetEqual(test, this.person3.subdocumentsPosts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1a'
        },
        nested: [
          {
            body: 'NestedFooBar1a'
          }
        ],
        body: 'FooBar1a'
      }, {
        _id: this.postId2,
        subdocument: {
          body: 'SubdocumentFooBar2a'
        },
        nested: [
          {
            body: 'NestedFooBar2a'
          }
        ],
        body: 'FooBar2a'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3a'
        },
        nested: [
          {
            body: 'NestedFooBar3a'
          }
        ],
        body: 'FooBar3a'
      }
    ]);
    testSetEqual(test, this.person3.nestedPosts, [
      {
        _id: this.postId2,
        subdocument: {
          body: 'SubdocumentFooBar2a'
        },
        nested: [
          {
            body: 'NestedFooBar2a'
          }
        ],
        body: 'FooBar2a'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3a'
        },
        nested: [
          {
            body: 'NestedFooBar3a'
          }
        ],
        body: 'FooBar3a'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }
    ]);
    Post.documents.remove(this.postId2, expect((function(_this) {
      return function(error) {
        return test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
      };
    })(this)));
    return Meteor.setTimeout(expect(), WAIT_TIME);
  }, function(test, expect) {
    this.person1 = Person.documents.findOne(this.person1Id, {
      transform: null
    });
    this.person2 = Person.documents.findOne(this.person2Id, {
      transform: null
    });
    this.person3 = Person.documents.findOne(this.person3Id, {
      transform: null
    });
    test.equal(_.omit(this.person1, 'posts', 'subdocumentPosts', 'subdocumentsPosts', 'nestedPosts'), {
      _id: this.person1Id,
      _schema: '1.0.0',
      username: 'person1',
      displayName: 'Person 1',
      count: 10
    });
    testSetEqual(test, this.person1.posts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1a'
        },
        nested: [
          {
            body: 'NestedFooBar1a'
          }
        ],
        body: 'FooBar1a'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3a'
        },
        nested: [
          {
            body: 'NestedFooBar3a'
          }
        ],
        body: 'FooBar3a'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }
    ]);
    testSetEqual(test, this.person1.subdocumentPosts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1a'
        },
        nested: [
          {
            body: 'NestedFooBar1a'
          }
        ],
        body: 'FooBar1a'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3a'
        },
        nested: [
          {
            body: 'NestedFooBar3a'
          }
        ],
        body: 'FooBar3a'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }
    ]);
    testSetEqual(test, this.person1.subdocumentsPosts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1a'
        },
        nested: [
          {
            body: 'NestedFooBar1a'
          }
        ],
        body: 'FooBar1a'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3a'
        },
        nested: [
          {
            body: 'NestedFooBar3a'
          }
        ],
        body: 'FooBar3a'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }
    ]);
    testSetEqual(test, this.person1.nestedPosts, [
      {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }
    ]);
    test.equal(_.omit(this.person2, 'posts', 'subdocumentPosts', 'subdocumentsPosts', 'nestedPosts'), {
      _id: this.person2Id,
      _schema: '1.0.0',
      username: 'person2',
      displayName: 'Person 2',
      count: 5
    });
    testSetEqual(test, this.person2.posts, []);
    testSetEqual(test, this.person2.subdocumentPosts, []);
    testSetEqual(test, this.person2.subdocumentsPosts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1a'
        },
        nested: [
          {
            body: 'NestedFooBar1a'
          }
        ],
        body: 'FooBar1a'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3a'
        },
        nested: [
          {
            body: 'NestedFooBar3a'
          }
        ],
        body: 'FooBar3a'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }
    ]);
    testSetEqual(test, this.person2.nestedPosts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1a'
        },
        nested: [
          {
            body: 'NestedFooBar1a'
          }
        ],
        body: 'FooBar1a'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }
    ]);
    test.equal(_.omit(this.person3, 'posts', 'subdocumentPosts', 'subdocumentsPosts', 'nestedPosts'), {
      _id: this.person3Id,
      _schema: '1.0.0',
      username: 'person3',
      displayName: 'Person 3',
      count: 4
    });
    testSetEqual(test, this.person3.posts, []);
    testSetEqual(test, this.person3.subdocumentPosts, []);
    testSetEqual(test, this.person3.subdocumentsPosts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1a'
        },
        nested: [
          {
            body: 'NestedFooBar1a'
          }
        ],
        body: 'FooBar1a'
      }, {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3a'
        },
        nested: [
          {
            body: 'NestedFooBar3a'
          }
        ],
        body: 'FooBar3a'
      }
    ]);
    testSetEqual(test, this.person3.nestedPosts, [
      {
        _id: this.postId3,
        subdocument: {
          body: 'SubdocumentFooBar3a'
        },
        nested: [
          {
            body: 'NestedFooBar3a'
          }
        ],
        body: 'FooBar3a'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }
    ]);
    Post.documents.remove(this.postId3, expect((function(_this) {
      return function(error) {
        return test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
      };
    })(this)));
    return Meteor.setTimeout(expect(), WAIT_TIME);
  }, function(test, expect) {
    this.person1 = Person.documents.findOne(this.person1Id, {
      transform: null
    });
    this.person2 = Person.documents.findOne(this.person2Id, {
      transform: null
    });
    this.person3 = Person.documents.findOne(this.person3Id, {
      transform: null
    });
    test.equal(_.omit(this.person1, 'posts', 'subdocumentPosts', 'subdocumentsPosts', 'nestedPosts'), {
      _id: this.person1Id,
      _schema: '1.0.0',
      username: 'person1',
      displayName: 'Person 1',
      count: 7
    });
    testSetEqual(test, this.person1.posts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1a'
        },
        nested: [
          {
            body: 'NestedFooBar1a'
          }
        ],
        body: 'FooBar1a'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }
    ]);
    testSetEqual(test, this.person1.subdocumentPosts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1a'
        },
        nested: [
          {
            body: 'NestedFooBar1a'
          }
        ],
        body: 'FooBar1a'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }
    ]);
    testSetEqual(test, this.person1.subdocumentsPosts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1a'
        },
        nested: [
          {
            body: 'NestedFooBar1a'
          }
        ],
        body: 'FooBar1a'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }
    ]);
    testSetEqual(test, this.person1.nestedPosts, [
      {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }
    ]);
    test.equal(_.omit(this.person2, 'posts', 'subdocumentPosts', 'subdocumentsPosts', 'nestedPosts'), {
      _id: this.person2Id,
      _schema: '1.0.0',
      username: 'person2',
      displayName: 'Person 2',
      count: 4
    });
    testSetEqual(test, this.person2.posts, []);
    testSetEqual(test, this.person2.subdocumentPosts, []);
    testSetEqual(test, this.person2.subdocumentsPosts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1a'
        },
        nested: [
          {
            body: 'NestedFooBar1a'
          }
        ],
        body: 'FooBar1a'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }
    ]);
    testSetEqual(test, this.person2.nestedPosts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1a'
        },
        nested: [
          {
            body: 'NestedFooBar1a'
          }
        ],
        body: 'FooBar1a'
      }, {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }
    ]);
    test.equal(_.omit(this.person3, 'posts', 'subdocumentPosts', 'subdocumentsPosts', 'nestedPosts'), {
      _id: this.person3Id,
      _schema: '1.0.0',
      username: 'person3',
      displayName: 'Person 3',
      count: 2
    });
    testSetEqual(test, this.person3.posts, []);
    testSetEqual(test, this.person3.subdocumentPosts, []);
    testSetEqual(test, this.person3.subdocumentsPosts, [
      {
        _id: this.postId1,
        subdocument: {
          body: 'SubdocumentFooBar1a'
        },
        nested: [
          {
            body: 'NestedFooBar1a'
          }
        ],
        body: 'FooBar1a'
      }
    ]);
    return testSetEqual(test, this.person3.nestedPosts, [
      {
        _id: this.postId4,
        subdocument: {
          body: 'SubdocumentFooBar4a'
        },
        nested: [
          {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4a'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }, {
            body: 'NestedFooBar4'
          }
        ],
        body: 'FooBar4a'
      }
    ]);
  }
]);

if (Meteor.isServer) {
  testAsyncMulti('peerdb - triggers', [
    function(test, expect) {
      testDefinition(test);
      Person.documents.insert({
        username: 'person1',
        displayName: 'Person 1'
      }, expect((function(_this) {
        return function(error, person1Id) {
          test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
          test.isTrue(person1Id);
          return _this.person1Id = person1Id;
        };
      })(this)));
      return Meteor.setTimeout(expect(), WAIT_TIME);
    }, function(test, expect) {
      this.person1 = Person.documents.findOne(this.person1Id);
      test.instanceOf(this.person1, Person);
      test.equal(plainObject(this.person1), {
        _id: this.person1Id,
        _schema: '1.0.0',
        username: 'person1',
        displayName: 'Person 1',
        count: 0
      });
      test.equal(this.person1.formatName(), 'person1-Person 1');
      Post.documents.insert({
        author: {
          _id: this.person1._id
        },
        subdocument: {},
        body: 'FooBar'
      }, expect((function(_this) {
        return function(error, postId) {
          test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
          test.isTrue(postId);
          return _this.postId = postId;
        };
      })(this)));
      return Meteor.setTimeout(expect(), WAIT_TIME);
    }, function(test, expect) {
      this.post = Post.documents.findOne(this.postId);
      test.instanceOf(this.post, Post);
      test.instanceOf(this.post.author, Person);
      test.equal(this.post.author.formatName(), "" + this.person1.username + "-" + this.person1.displayName);
      test.equal(plainObject(this.post), {
        _id: this.postId,
        _schema: '1.0.0',
        author: {
          _id: this.person1._id,
          username: this.person1.username,
          displayName: this.person1.displayName
        },
        subdocument: {},
        body: 'FooBar',
        tags: []
      });
      SpecialPost.documents.insert({
        author: {
          _id: this.person1._id
        },
        subdocument: {},
        body: 'FooBar',
        special: {
          _id: this.person1._id
        }
      }, expect((function(_this) {
        return function(error, postId) {
          test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
          test.isTrue(postId);
          return _this.specialPostId = postId;
        };
      })(this)));
      return Meteor.setTimeout(expect(), WAIT_TIME);
    }, function(test, expect) {
      this.specialPost = SpecialPost.documents.findOne(this.specialPostId);
      test.instanceOf(this.specialPost, SpecialPost);
      test.instanceOf(this.specialPost.author, Person);
      test.instanceOf(this.specialPost.special, Person);
      test.equal(this.specialPost.author.formatName(), "" + this.person1.username + "-" + this.person1.displayName);
      test.equal(plainObject(this.specialPost), {
        _id: this.specialPostId,
        _schema: '1.0.0',
        author: {
          _id: this.person1._id,
          username: this.person1.username,
          displayName: this.person1.displayName
        },
        subdocument: {},
        body: 'FooBar',
        tags: [],
        special: {
          _id: this.person1._id
        }
      });
      test.equal(globalTestTriggerCounters[this.postId], 1);
      test.equal(globalTestTriggerCounters[this.specialPostId], 1);
      Post.documents.update(this.postId, {
        $set: {
          body: 'FooBar 1'
        }
      }, expect((function(_this) {
        return function(error, res) {
          test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
          return test.isTrue(res);
        };
      })(this)));
      SpecialPost.documents.update(this.specialPostId, {
        $set: {
          body: 'FooBar 1'
        }
      }, expect((function(_this) {
        return function(error, res) {
          test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
          return test.isTrue(res);
        };
      })(this)));
      return Meteor.setTimeout(expect(), WAIT_TIME);
    }, function(test, expect) {
      this.post = Post.documents.findOne(this.postId);
      test.instanceOf(this.post, Post);
      test.instanceOf(this.post.author, Person);
      test.equal(this.post.author.formatName(), "" + this.person1.username + "-" + this.person1.displayName);
      test.equal(plainObject(this.post), {
        _id: this.postId,
        _schema: '1.0.0',
        author: {
          _id: this.person1._id,
          username: this.person1.username,
          displayName: this.person1.displayName
        },
        subdocument: {},
        body: 'FooBar 1',
        tags: []
      });
      this.specialPost = SpecialPost.documents.findOne(this.specialPostId);
      test.instanceOf(this.specialPost, SpecialPost);
      test.instanceOf(this.specialPost.author, Person);
      test.instanceOf(this.specialPost.special, Person);
      test.equal(this.specialPost.author.formatName(), "" + this.person1.username + "-" + this.person1.displayName);
      test.equal(plainObject(this.specialPost), {
        _id: this.specialPostId,
        _schema: '1.0.0',
        author: {
          _id: this.person1._id,
          username: this.person1.username,
          displayName: this.person1.displayName
        },
        subdocument: {},
        body: 'FooBar 1',
        tags: [],
        special: {
          _id: this.person1._id
        }
      });
      test.equal(globalTestTriggerCounters[this.postId], 2);
      test.equal(globalTestTriggerCounters[this.specialPostId], 2);
      Post.documents.update(this.postId, {
        $set: {
          'subdocument.body': 'FooBar zzz'
        }
      }, expect((function(_this) {
        return function(error, res) {
          test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
          return test.isTrue(res);
        };
      })(this)));
      SpecialPost.documents.update(this.specialPostId, {
        $set: {
          'subdocument.body': 'FooBar zzz'
        }
      }, expect((function(_this) {
        return function(error, res) {
          test.isFalse(error, (error != null ? typeof error.toString === "function" ? error.toString() : void 0 : void 0) || error);
          return test.isTrue(res);
        };
      })(this)));
      return Meteor.setTimeout(expect(), WAIT_TIME);
    }, function(test, expect) {
      this.post = Post.documents.findOne(this.postId);
      test.instanceOf(this.post, Post);
      test.instanceOf(this.post.author, Person);
      test.equal(this.post.author.formatName(), "" + this.person1.username + "-" + this.person1.displayName);
      test.equal(plainObject(this.post), {
        _id: this.postId,
        _schema: '1.0.0',
        author: {
          _id: this.person1._id,
          username: this.person1.username,
          displayName: this.person1.displayName
        },
        subdocument: {
          body: 'FooBar zzz',
          slug: 'subdocument-prefix-foobar 1-foobar zzz-suffix'
        },
        body: 'FooBar 1',
        slug: 'prefix-foobar 1-foobar zzz-suffix',
        tags: ['tag-0-prefix-foobar 1-foobar zzz-suffix']
      });
      this.specialPost = SpecialPost.documents.findOne(this.specialPostId);
      test.instanceOf(this.specialPost, SpecialPost);
      test.instanceOf(this.specialPost.author, Person);
      test.instanceOf(this.specialPost.special, Person);
      test.equal(this.specialPost.author.formatName(), "" + this.person1.username + "-" + this.person1.displayName);
      test.equal(plainObject(this.specialPost), {
        _id: this.specialPostId,
        _schema: '1.0.0',
        author: {
          _id: this.person1._id,
          username: this.person1.username,
          displayName: this.person1.displayName
        },
        subdocument: {
          body: 'FooBar zzz',
          slug: 'subdocument-prefix-foobar 1-foobar zzz-suffix'
        },
        body: 'FooBar 1',
        slug: 'prefix-foobar 1-foobar zzz-suffix',
        tags: ['tag-0-prefix-foobar 1-foobar zzz-suffix'],
        special: {
          _id: this.person1._id
        }
      });
      test.equal(globalTestTriggerCounters[this.postId], 2);
      return test.equal(globalTestTriggerCounters[this.specialPostId], 2);
    }
  ]);
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages\peerdb\tests_migrations.coffee.js                                                                          //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var Migration1, Migration2, Migration3, Migration4, Migration5, Migration6, Migration7, Migration8, MigrationTest, testDefinition, _TestMigrationTest,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

MigrationTest = (function(_super) {
  __extends(MigrationTest, _super);

  function MigrationTest() {
    return MigrationTest.__super__.constructor.apply(this, arguments);
  }

  MigrationTest.Meta({
    name: 'MigrationTest'
  });

  return MigrationTest;

})(Document);

Migration1 = (function(_super) {
  __extends(Migration1, _super);

  function Migration1() {
    return Migration1.__super__.constructor.apply(this, arguments);
  }

  Migration1.prototype.name = "Migration 1";

  return Migration1;

})(Document.PatchMigration);

MigrationTest.addMigration(new Migration1());

Migration2 = (function(_super) {
  __extends(Migration2, _super);

  function Migration2() {
    return Migration2.__super__.constructor.apply(this, arguments);
  }

  Migration2.prototype.name = "Migration 2";

  return Migration2;

})(Document.PatchMigration);

MigrationTest.addMigration(new Migration2());

MigrationTest.renameCollectionMigration('OlderMigrationTests', 'OldMigrationTests');

Migration3 = (function(_super) {
  __extends(Migration3, _super);

  function Migration3() {
    return Migration3.__super__.constructor.apply(this, arguments);
  }

  Migration3.prototype.name = "Migration 3";

  return Migration3;

})(Document.MinorMigration);

MigrationTest.addMigration(new Migration3());

Migration4 = (function(_super) {
  __extends(Migration4, _super);

  function Migration4() {
    this.backward = __bind(this.backward, this);
    this.forward = __bind(this.forward, this);
    return Migration4.__super__.constructor.apply(this, arguments);
  }

  Migration4.prototype.name = "Migration 4";

  Migration4.prototype.forward = function(document, collection, currentSchema, newSchema) {
    var count, counts;
    count = collection.update({
      _schema: currentSchema
    }, {
      $rename: {
        test: 'renamed'
      },
      $set: {
        _schema: newSchema
      }
    }, {
      multi: true
    });
    counts = Migration4.__super__.forward.apply(this, arguments);
    counts.migrated += count;
    counts.all += count;
    return counts;
  };

  Migration4.prototype.backward = function(document, collection, currentSchema, oldSchema) {
    var count, counts;
    count = collection.update({
      _schema: currentSchema
    }, {
      $rename: {
        renamed: 'test'
      },
      $set: {
        _schema: oldSchema
      }
    }, {
      multi: true
    });
    counts = Migration4.__super__.backward.apply(this, arguments);
    counts.migrated += count;
    counts.all += count;
    return counts;
  };

  return Migration4;

})(Document.MajorMigration);

MigrationTest.addMigration(new Migration4());

MigrationTest.renameCollectionMigration('OldMigrationTests', 'MigrationTests');

Migration5 = (function(_super) {
  __extends(Migration5, _super);

  function Migration5() {
    return Migration5.__super__.constructor.apply(this, arguments);
  }

  Migration5.prototype.name = "Migration 5";

  return Migration5;

})(Document.MajorMigration);

MigrationTest.addMigration(new Migration5());

Migration6 = (function(_super) {
  __extends(Migration6, _super);

  function Migration6() {
    return Migration6.__super__.constructor.apply(this, arguments);
  }

  Migration6.prototype.name = "Migration 6";

  return Migration6;

})(Document.MinorMigration);

MigrationTest.addMigration(new Migration6());

Migration7 = (function(_super) {
  __extends(Migration7, _super);

  function Migration7() {
    return Migration7.__super__.constructor.apply(this, arguments);
  }

  Migration7.prototype.name = "Migration 7";

  return Migration7;

})(Document.MinorMigration);

MigrationTest.addMigration(new Migration7());

Migration8 = (function(_super) {
  __extends(Migration8, _super);

  function Migration8() {
    return Migration8.__super__.constructor.apply(this, arguments);
  }

  Migration8.prototype.name = "Migration 8";

  return Migration8;

})(Document.PatchMigration);

MigrationTest.addMigration(new Migration8());

_TestMigrationTest = MigrationTest;

MigrationTest = (function(_super) {
  __extends(MigrationTest, _super);

  function MigrationTest() {
    return MigrationTest.__super__.constructor.apply(this, arguments);
  }

  MigrationTest.Meta({
    name: 'MigrationTest',
    replaceParent: true
  });

  return MigrationTest;

})(MigrationTest);

if (Meteor.isServer) {
  MigrationTest.documents.remove({});
}

this.ALL.push(MigrationTest);

testDefinition = function(test, count) {
  var migration, migrations;
  test.equal(MigrationTest.Meta._name, 'MigrationTest');
  test.equal(MigrationTest.Meta.parent, _TestMigrationTest.Meta);
  test.equal(MigrationTest.Meta.document, MigrationTest);
  test.equal(MigrationTest.Meta.collection._name, 'MigrationTests');
  test.equal(MigrationTest.Meta.schema, '5.2.1');
  test.equal(_.pluck(MigrationTest.Meta.migrations, 'name'), ["Migration 1", "Migration 2", "Renaming collection from 'OlderMigrationTests' to 'OldMigrationTests'", "Migration 3", "Migration 4", "Renaming collection from 'OldMigrationTests' to 'MigrationTests'", "Migration 5", "Migration 6", "Migration 7", "Migration 8"]);
  test.equal(_.size(MigrationTest.Meta.fields), 0);
  migrations = Document.Migrations.find().fetch();
  migrations = (function() {
    var _i, _len, _results;
    _results = [];
    for (_i = 0, _len = migrations.length; _i < _len; _i++) {
      migration = migrations[_i];
      delete migration._id;
      delete migration.timestamp;
      _results.push(migration);
    }
    return _results;
  })();
  return test.equal(migrations, [
    {
      serial: 1,
      migrationName: null,
      oldCollectionName: null,
      newCollectionName: null,
      oldVersion: null,
      newVersion: null,
      migrated: 0,
      all: 0
    }, {
      serial: 2,
      migrationName: 'Migration 1',
      oldCollectionName: 'OlderMigrationTests',
      newCollectionName: 'OlderMigrationTests',
      oldVersion: '1.0.0',
      newVersion: '1.0.1',
      migrated: 0,
      all: count
    }, {
      serial: 3,
      migrationName: 'Migration 2',
      oldCollectionName: 'OlderMigrationTests',
      newCollectionName: 'OlderMigrationTests',
      oldVersion: '1.0.1',
      newVersion: '1.0.2',
      migrated: 0,
      all: count
    }, {
      serial: 4,
      migrationName: 'Renaming collection from \'OlderMigrationTests\' to \'OldMigrationTests\'',
      oldCollectionName: 'OlderMigrationTests',
      newCollectionName: 'OldMigrationTests',
      oldVersion: '1.0.2',
      newVersion: '2.0.0',
      migrated: count,
      all: count
    }, {
      serial: 5,
      migrationName: 'Migration 3',
      oldCollectionName: 'OldMigrationTests',
      newCollectionName: 'OldMigrationTests',
      oldVersion: '2.0.0',
      newVersion: '2.1.0',
      migrated: 0,
      all: count
    }, {
      serial: 6,
      migrationName: 'Migration 4',
      oldCollectionName: 'OldMigrationTests',
      newCollectionName: 'OldMigrationTests',
      oldVersion: '2.1.0',
      newVersion: '3.0.0',
      migrated: count,
      all: count
    }, {
      serial: 7,
      migrationName: 'Renaming collection from \'OldMigrationTests\' to \'MigrationTests\'',
      oldCollectionName: 'OldMigrationTests',
      newCollectionName: 'MigrationTests',
      oldVersion: '3.0.0',
      newVersion: '4.0.0',
      migrated: count,
      all: count
    }, {
      serial: 8,
      migrationName: 'Migration 5',
      oldCollectionName: 'MigrationTests',
      newCollectionName: 'MigrationTests',
      oldVersion: '4.0.0',
      newVersion: '5.0.0',
      migrated: 0,
      all: count
    }, {
      serial: 9,
      migrationName: 'Migration 6',
      oldCollectionName: 'MigrationTests',
      newCollectionName: 'MigrationTests',
      oldVersion: '5.0.0',
      newVersion: '5.1.0',
      migrated: 0,
      all: count
    }, {
      serial: 10,
      migrationName: 'Migration 7',
      oldCollectionName: 'MigrationTests',
      newCollectionName: 'MigrationTests',
      oldVersion: '5.1.0',
      newVersion: '5.2.0',
      migrated: 0,
      all: count
    }, {
      serial: 11,
      migrationName: 'Migration 8',
      oldCollectionName: 'MigrationTests',
      newCollectionName: 'MigrationTests',
      oldVersion: '5.2.0',
      newVersion: '5.2.1',
      migrated: 0,
      all: count
    }
  ]);
};

if (!Document.migrationsDisabled) {
  testAsyncMulti('peerdb - migrations', [
    function(test, expect) {
      var db;
      db = MongoInternals.defaultRemoteCollectionDriver().mongo.db;
      test.isTrue(db);
      Document.Migrations.update({}, {
        $set: {
          migrated: 0,
          all: 0
        }
      }, {
        multi: true
      });
      db.dropCollection('OlderMigrationTests', Meteor.bindEnvironment(expect(function() {}), function(e) {
        throw e;
      }));
      db.dropCollection('OldMigrationTests', Meteor.bindEnvironment(expect(function() {}), function(e) {
        throw e;
      }));
      db.dropCollection('MigrationTests', Meteor.bindEnvironment(expect(function() {}), function(e) {
        throw e;
      }));
      testDefinition(test, 0);
      MigrationTest.migrate();
      testDefinition(test, 0);
      db.dropCollection('OlderMigrationTests', Meteor.bindEnvironment(expect(function() {}), function(e) {
        throw e;
      }));
      db.dropCollection('OldMigrationTests', Meteor.bindEnvironment(expect(function() {}), function(e) {
        throw e;
      }));
      return db.dropCollection('MigrationTests', Meteor.bindEnvironment(expect(function() {}), function(e) {
        throw e;
      }));
    }, function(test, expect) {
      var collection, docs, id;
      Document.Migrations.remove({
        serial: {
          $ne: 1
        }
      });
      collection = new DirectCollection('OlderMigrationTests');
      id = Random.id();
      collection.insert({
        _id: id,
        _schema: '1.0.0',
        test: 'test field'
      });
      MigrationTest.migrate();
      docs = MigrationTest.documents.find({}, {
        transform: null
      }).fetch();
      test.equal(docs, [
        {
          _id: id,
          _schema: '5.2.1',
          renamed: 'test field'
        }
      ]);
      testDefinition(test, 1);
      MigrationTest.migrate();
      testDefinition(test, 1);
      docs = MigrationTest.documents.find({}, {
        transform: null
      }).fetch();
      return test.equal(docs, [
        {
          _id: id,
          _schema: '5.2.1',
          renamed: 'test field'
        }
      ]);
    }
  ]);
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);
