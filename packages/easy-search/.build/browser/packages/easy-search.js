(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages\easy-search\lib\easy-search-client.js                                                                   //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
'use strict';                                                                                                       // 1
                                                                                                                    // 2
/**                                                                                                                 // 3
 * @title EasySearch Client Methods                                                                                 // 4
 * @overview These are all the methods exposed to the client.                                                       // 5
 * @author Matteo De Micheli                                                                                        // 6
 * @license MIT                                                                                                     // 7
 *                                                                                                                  // 8
 * @module EasySearch                                                                                               // 9
 */                                                                                                                 // 10
                                                                                                                    // 11
EasySearch = (function () {                                                                                         // 12
    var defaults = {                                                                                                // 13
            limit: 10                                                                                               // 14
        },                                                                                                          // 15
        indexes = {};                                                                                               // 16
                                                                                                                    // 17
    /**                                                                                                             // 18
     * Removes all functions from a given configuration.                                                            // 19
     *                                                                                                              // 20
     * @param {Array} conf                                                                                          // 21
     *                                                                                                              // 22
     * @return {Array}                                                                                              // 23
     */                                                                                                             // 24
    function filterFunctions(conf) {                                                                                // 25
        return _.omit(conf, 'collection', 'query', 'sort', 'permission');                                           // 26
    }                                                                                                               // 27
                                                                                                                    // 28
    return {                                                                                                        // 29
        /**                                                                                                         // 30
         * Create a search "index" to search on.                                                                    // 31
         *                                                                                                          // 32
         * @param {String} name                                                                                     // 33
         * @param {Object} options                                                                                  // 34
         */                                                                                                         // 35
        'createSearchIndex' : function (name, options) {                                                            // 36
            check(name, String);                                                                                    // 37
            check(options, Object);                                                                                 // 38
                                                                                                                    // 39
            options.field = _.isArray(options.field) ? options.field : [options.field];                             // 40
            indexes[name] = _.extend(_.clone(defaults), options);                                                   // 41
            indexes[name].defaultLimit = options.limit;                                                             // 42
        },                                                                                                          // 43
        /**                                                                                                         // 44
         * Search over one of the defined indexes.                                                                  // 45
         *                                                                                                          // 46
         * @param {String} name                                                                                     // 47
         * @param {String} searchString                                                                             // 48
         * @param {Function} callback                                                                               // 49
         * @api public                                                                                              // 50
         */                                                                                                         // 51
        'search' : function (name, searchString, callback) {                                                        // 52
            Meteor.call('easySearch', name, searchString, filterFunctions(indexes[name]), callback);                // 53
        },                                                                                                          // 54
        /**                                                                                                         // 55
         * Search over multiple indexes.                                                                            // 56
         *                                                                                                          // 57
         * @param {Array} indexes                                                                                   // 58
         * @param {String} searchString                                                                             // 59
         * @param {Function} callback                                                                               // 60
         * @api public                                                                                              // 61
         */                                                                                                         // 62
        'searchMultiple' : function (indexes, searchString, callback) {                                             // 63
            _.each(indexes, function (name) {                                                                       // 64
                Meteor.call('easySearch', name, searchString, filterFunctions(indexes[name]), callback);            // 65
            });                                                                                                     // 66
        },                                                                                                          // 67
        /**                                                                                                         // 68
         * Allow easily changing properties (for example the global search fields).                                 // 69
         *                                                                                                          // 70
         * @param {String} name                                                                                     // 71
         * @param {String} key                                                                                      // 72
         * @param {Object} value                                                                                    // 73
         * @api public                                                                                              // 74
         */                                                                                                         // 75
        'changeProperty' : function(name, key, value) {                                                             // 76
            check(name, String);                                                                                    // 77
            check(key, String);                                                                                     // 78
                                                                                                                    // 79
            indexes[name][key] = value;                                                                             // 80
        },                                                                                                          // 81
        /**                                                                                                         // 82
         * Retrieve a specific index configuration.                                                                 // 83
         *                                                                                                          // 84
         * @param {String} name                                                                                     // 85
         * @return {Object}                                                                                         // 86
         * @api public                                                                                              // 87
         */                                                                                                         // 88
        'getIndex' : function (name) {                                                                              // 89
            return indexes[name];                                                                                   // 90
        },                                                                                                          // 91
        /**                                                                                                         // 92
         * Retrieve all index configurations                                                                        // 93
         *                                                                                                          // 94
         * @return {Array}                                                                                          // 95
         * @api public                                                                                              // 96
         */                                                                                                         // 97
        'getIndexes' : function () {                                                                                // 98
            return indexes;                                                                                         // 99
        }                                                                                                           // 100
    };                                                                                                              // 101
})();                                                                                                               // 102
                                                                                                                    // 103
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages\easy-search\lib\components\template.easy-search-components.js                                           //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
                                                                                                                    // 1
Template.__define__("esInput", (function() {                                                                        // 2
  var view = this;                                                                                                  // 3
  return HTML.INPUT({                                                                                               // 4
    type: "text",                                                                                                   // 5
    id: function() {                                                                                                // 6
      return Spacebars.mustache(view.lookup("id"));                                                                 // 7
    },                                                                                                              // 8
    placeholder: function() {                                                                                       // 9
      return Spacebars.mustache(view.lookup("placeholder"));                                                        // 10
    },                                                                                                              // 11
    "class": function() {                                                                                           // 12
      return Spacebars.mustache(view.lookup("classes"));                                                            // 13
    }                                                                                                               // 14
  });                                                                                                               // 15
}));                                                                                                                // 16
                                                                                                                    // 17
Template.__define__("esEach", (function() {                                                                         // 18
  var view = this;                                                                                                  // 19
  return Blaze.Each(function() {                                                                                    // 20
    return Spacebars.call(view.lookup("elasticSearchDoc"));                                                         // 21
  }, function() {                                                                                                   // 22
    return [ "\n        ", Blaze.InOuterTemplateScope(view, function() {                                            // 23
      return Spacebars.TemplateWith(function() {                                                                    // 24
        return Spacebars.call(view.lookup("."));                                                                    // 25
      }, function() {                                                                                               // 26
        return Spacebars.include(function() {                                                                       // 27
          return Spacebars.call(view.templateContentBlock);                                                         // 28
        });                                                                                                         // 29
      });                                                                                                           // 30
    }), "\n    " ];                                                                                                 // 31
  });                                                                                                               // 32
}));                                                                                                                // 33
                                                                                                                    // 34
Template.__define__("ifEsIsSearching", (function() {                                                                // 35
  var view = this;                                                                                                  // 36
  return Blaze.If(function() {                                                                                      // 37
    return Spacebars.call(view.lookup("isSearching"));                                                              // 38
  }, function() {                                                                                                   // 39
    return [ "\n        ", Blaze.InOuterTemplateScope(view, function() {                                            // 40
      return Spacebars.include(function() {                                                                         // 41
        return Spacebars.call(view.templateContentBlock);                                                           // 42
      });                                                                                                           // 43
    }), "\n    " ];                                                                                                 // 44
  }, function() {                                                                                                   // 45
    return [ "\n        ", Blaze.If(function() {                                                                    // 46
      return Spacebars.call(view.templateElseBlock);                                                                // 47
    }, function() {                                                                                                 // 48
      return [ "\n            ", Blaze.InOuterTemplateScope(view, function() {                                      // 49
        return Spacebars.include(function() {                                                                       // 50
          return Spacebars.call(view.templateElseBlock);                                                            // 51
        });                                                                                                         // 52
      }), "\n        " ];                                                                                           // 53
    }), "\n    " ];                                                                                                 // 54
  });                                                                                                               // 55
}));                                                                                                                // 56
                                                                                                                    // 57
Template.__define__("ifEsHasNoResults", (function() {                                                               // 58
  var view = this;                                                                                                  // 59
  return Blaze.If(function() {                                                                                      // 60
    return Spacebars.call(view.lookup("hasNoResults"));                                                             // 61
  }, function() {                                                                                                   // 62
    return [ "\n        ", Blaze.InOuterTemplateScope(view, function() {                                            // 63
      return Spacebars.include(function() {                                                                         // 64
        return Spacebars.call(view.templateContentBlock);                                                           // 65
      });                                                                                                           // 66
    }), "\n    " ];                                                                                                 // 67
  }, function() {                                                                                                   // 68
    return [ "\n        ", Blaze.If(function() {                                                                    // 69
      return Spacebars.call(view.templateElseBlock);                                                                // 70
    }, function() {                                                                                                 // 71
      return [ "\n            ", Blaze.InOuterTemplateScope(view, function() {                                      // 72
        return Spacebars.include(function() {                                                                       // 73
          return Spacebars.call(view.templateElseBlock);                                                            // 74
        });                                                                                                         // 75
      }), "\n        " ];                                                                                           // 76
    }), "\n    " ];                                                                                                 // 77
  });                                                                                                               // 78
}));                                                                                                                // 79
                                                                                                                    // 80
Template.__define__("esLoadMoreButton", (function() {                                                               // 81
  var view = this;                                                                                                  // 82
  return Blaze.If(function() {                                                                                      // 83
    return Spacebars.call(view.lookup("hasMoreResults"));                                                           // 84
  }, function() {                                                                                                   // 85
    return [ "\n        ", HTML.BUTTON({                                                                            // 86
      id: function() {                                                                                              // 87
        return Spacebars.mustache(view.lookup("id"));                                                               // 88
      },                                                                                                            // 89
      "class": function() {                                                                                         // 90
        return Spacebars.mustache(view.lookup("classes"));                                                          // 91
      }                                                                                                             // 92
    }, Blaze.View(function() {                                                                                      // 93
      return Spacebars.mustache(view.lookup("content"));                                                            // 94
    })), "\n    " ];                                                                                                // 95
  });                                                                                                               // 96
}));                                                                                                                // 97
                                                                                                                    // 98
Template.__define__("esAutosuggest", (function() {                                                                  // 99
  var view = this;                                                                                                  // 100
  return HTML.DIV({                                                                                                 // 101
    "class": "es-autosuggest-wrapper",                                                                              // 102
    "data-id": function() {                                                                                         // 103
      return Spacebars.mustache(view.lookup("id"));                                                                 // 104
    },                                                                                                              // 105
    "data-index": function() {                                                                                      // 106
      return Spacebars.mustache(view.lookup("index"));                                                              // 107
    }                                                                                                               // 108
  }, " \n        ", HTML.DIV({                                                                                      // 109
    "class": "selected values"                                                                                      // 110
  }, "\n            ", Blaze.Each(function() {                                                                      // 111
    return Spacebars.call(view.lookup("selectedValue"));                                                            // 112
  }, function() {                                                                                                   // 113
    return [ "\n                ", HTML.SPAN({                                                                      // 114
      "class": "value"                                                                                              // 115
    }, "\n                    ", HTML.A({                                                                           // 116
      href: "#",                                                                                                    // 117
      "class": "remove"                                                                                             // 118
    }, "X"), "\n                    ", Blaze.View(function() {                                                      // 119
      return Spacebars.mustache(view.lookup("value"));                                                              // 120
    }), "\n                "), "\n            " ];                                                                  // 121
  }), "\n        "), "\n        \n        ", Spacebars.TemplateWith(function() {                                    // 122
    return {                                                                                                        // 123
      index: Spacebars.call(view.lookup("index")),                                                                  // 124
      id: Spacebars.call(view.lookup("id")),                                                                        // 125
      placeholder: Spacebars.call(view.lookup("placeholder")),                                                      // 126
      timeout: Spacebars.call(view.lookup("timeout")),                                                              // 127
      classes: Spacebars.call(view.lookup("classes"))                                                               // 128
    };                                                                                                              // 129
  }, function() {                                                                                                   // 130
    return Spacebars.include(view.lookupTemplate("esInput"));                                                       // 131
  }), "\n\n        ", HTML.UL({                                                                                     // 132
    "class": function() {                                                                                           // 133
      return [ "suggestions ", Spacebars.mustache(view.lookup("isHidden")) ];                                       // 134
    }                                                                                                               // 135
  }, "\n            ", Spacebars.TemplateWith(function() {                                                          // 136
    return {                                                                                                        // 137
      index: Spacebars.call(view.lookup("index")),                                                                  // 138
      id: Spacebars.call(view.lookup("id"))                                                                         // 139
    };                                                                                                              // 140
  }, function() {                                                                                                   // 141
    return Spacebars.include(view.lookupTemplate("ifEsHasNoResults"), function() {                                  // 142
      return [ "\n                ", HTML.LI("No results found!"), "\n            " ];                              // 143
    }, function() {                                                                                                 // 144
      return [ "\n                ", Spacebars.TemplateWith(function() {                                            // 145
        return {                                                                                                    // 146
          index: Spacebars.call(view.lookup("index")),                                                              // 147
          id: Spacebars.call(view.lookup("id")),                                                                    // 148
          options: Spacebars.call(view.lookup("options"))                                                           // 149
        };                                                                                                          // 150
      }, function() {                                                                                               // 151
        return Spacebars.include(view.lookupTemplate("esEach"), function() {                                        // 152
          return [ "\n                    ", Blaze.If(function() {                                                  // 153
            return Spacebars.call(Spacebars.dot(view.lookup(".."), "renderSuggestion"));                            // 154
          }, function() {                                                                                           // 155
            return [ "\n                        ", Spacebars.With(function() {                                      // 156
              return Spacebars.dataMustache(view.lookup("snippets"), view.lookup(".."), view.lookup("..."));        // 157
            }, function() {                                                                                         // 158
              return [ "\n                            ", HTML.LI({                                                  // 159
                "class": function() {                                                                               // 160
                  return Spacebars.mustache(view.lookup("selected"));                                               // 161
                }                                                                                                   // 162
              }, "\n                                ", Spacebars.TemplateWith(function() {                          // 163
                return Spacebars.call(view.lookup("."));                                                            // 164
              }, function() {                                                                                       // 165
                return Spacebars.include(function() {                                                               // 166
                  return Spacebars.call(Spacebars.dot(view.lookup("...."), "renderSuggestion"));                    // 167
                });                                                                                                 // 168
              }), "\n                            "), "\n                        " ];                                // 169
            }), "\n                    " ];                                                                         // 170
          }, function() {                                                                                           // 171
            return [ "\n                        ", Spacebars.With(function() {                                      // 172
              return Spacebars.dataMustache(view.lookup("snippets"), view.lookup(".."), view.lookup("..."));        // 173
            }, function() {                                                                                         // 174
              return [ "\n                            ", HTML.LI({                                                  // 175
                "class": function() {                                                                               // 176
                  return Spacebars.mustache(view.lookup("selected"));                                               // 177
                }                                                                                                   // 178
              }, "\n                                ", HTML.A({                                                     // 179
                href: "#",                                                                                          // 180
                "class": "suggestion"                                                                               // 181
              }, "\n                                    ", Blaze.View(function() {                                  // 182
                return Spacebars.mustache(view.lookup("pre"));                                                      // 183
              }), HTML.SPAN({                                                                                       // 184
                "class": "found"                                                                                    // 185
              }, Blaze.View(function() {                                                                            // 186
                return Spacebars.mustache(view.lookup("found"));                                                    // 187
              })), Blaze.View(function() {                                                                          // 188
                return Spacebars.mustache(view.lookup("post"));                                                     // 189
              }), "\n                                "), "\n                            "), "\n                        " ];
            }), "\n                    " ];                                                                         // 191
          }), "\n                " ];                                                                               // 192
        });                                                                                                         // 193
      }), "\n            " ];                                                                                       // 194
    });                                                                                                             // 195
  }), "\n        "), "\n    ");                                                                                     // 196
}));                                                                                                                // 197
                                                                                                                    // 198
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages\easy-search\lib\components\easy-search-components.js                                                    //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
(function () {                                                                                                      // 1
    'use strict';                                                                                                   // 2
                                                                                                                    // 3
    var m = {},                                                                                                     // 4
        defaults,                                                                                                   // 5
        LocalTimer,                                                                                                 // 6
        inputCache,                                                                                                 // 7
        SearchVars,                                                                                                 // 8
        autosuggestCache = {},                                                                                      // 9
        LocalCache = new Meteor.Collection(null);                                                                   // 10
                                                                                                                    // 11
    // Default values                                                                                               // 12
    defaults = {                                                                                                    // 13
        'inputTimeout' : 200,                                                                                       // 14
        'reactive' : true,                                                                                          // 15
        'event' : 'keyup'                                                                                           // 16
    };                                                                                                              // 17
                                                                                                                    // 18
    // Session Abstraction                                                                                          // 19
    Session.setDefault('esVariables', {});                                                                          // 20
                                                                                                                    // 21
    SearchVars = {                                                                                                  // 22
        'set' : function (id, obj) {                                                                                // 23
            Session.set('esVariables_' + id, _.extend(Session.get('esVariables_'  + id) || {}, obj));               // 24
        },                                                                                                          // 25
        'get' : function (id, key) {                                                                                // 26
            return (Session.get('esVariables_' + id) || {})[key];                                                   // 27
        }                                                                                                           // 28
    };                                                                                                              // 29
                                                                                                                    // 30
    // Error Messages                                                                                               // 31
    m.specifyIndex = 'Specify an index, for example {{> esInput index="name"}}!';                                   // 32
    m.searchingFailed = "Searching failed within the EasySearch API";                                               // 33
    m.firstValueStringAutosuggest = "Use a string value as the first field specified for autosuggest!";             // 34
                                                                                                                    // 35
    // A simple timer                                                                                               // 36
    LocalTimer = {                                                                                                  // 37
        'timers' : {},                                                                                              // 38
        'stop' : function (id) {                                                                                    // 39
            clearTimeout(this.timers[id]);                                                                          // 40
            delete this.timers[id];                                                                                 // 41
        },                                                                                                          // 42
        'runAt' : function (id, millSec, func, params) {                                                            // 43
            var that = this;                                                                                        // 44
                                                                                                                    // 45
            this.timers[id] = setTimeout(function () {                                                              // 46
                func(params);                                                                                       // 47
                that.stop(id);                                                                                      // 48
            }, parseInt(millSec, 10));                                                                              // 49
        },                                                                                                          // 50
        'isRunning' : function (id) {                                                                               // 51
            return "undefined" !== typeof this.timers[id];                                                          // 52
        }                                                                                                           // 53
    };                                                                                                              // 54
                                                                                                                    // 55
    // Add the search results to cache and process it                                                               // 56
    function processSearchResults(index, data, isReactive)                                                          // 57
    {                                                                                                               // 58
        // Just store the data                                                                                      // 59
        if (!isReactive) {                                                                                          // 60
            LocalCache.upsert(                                                                                      // 61
                { _id : index },                                                                                    // 62
                { _id : index, r : isReactive, d : data.results }                                                   // 63
            );                                                                                                      // 64
                                                                                                                    // 65
            return;                                                                                                 // 66
        }                                                                                                           // 67
                                                                                                                    // 68
        // If it has to be reactive                                                                                 // 69
        LocalCache.upsert(                                                                                          // 70
            { _id : index },                                                                                        // 71
            {                                                                                                       // 72
                _id : index,                                                                                        // 73
                r : isReactive,                                                                                     // 74
                d : _.map(data.results, function(doc) { return doc._id; })                                          // 75
            }                                                                                                       // 76
        );                                                                                                          // 77
    }                                                                                                               // 78
                                                                                                                    // 79
    // Perform a search with esInput                                                                                // 80
    function esInputSearch (conf) {                                                                                 // 81
        var id = conf.easySearchID,                                                                                 // 82
            searchValue = conf.value,                                                                               // 83
            index = conf.easySearchIndex;                                                                           // 84
                                                                                                                    // 85
        if (searchValue.length < 1) {                                                                               // 86
            SearchVars.set(id, { 'searching' : false, 'searchingDone' : false });                                   // 87
            LocalCache.upsert({ _id : index }, { _id : index, d : null });                                          // 88
            return;                                                                                                 // 89
        }                                                                                                           // 90
                                                                                                                    // 91
        EasySearch.search(index, searchValue, function (err, data) {                                                // 92
            if (err) {                                                                                              // 93
                throw new Meteor.Error(500, m.searchingFailed);                                                     // 94
            }                                                                                                       // 95
                                                                                                                    // 96
            SearchVars.set(id, {                                                                                    // 97
                'searching' : false,                                                                                // 98
                'total' : data.total,                                                                               // 99
                'searchingDone' : true,                                                                             // 100
                'searchResults' : data.results,                                                                     // 101
                'currentValue' : searchValue                                                                        // 102
            });                                                                                                     // 103
                                                                                                                    // 104
            processSearchResults(index, data, conf.easySearchReactive);                                             // 105
        });                                                                                                         // 106
    }                                                                                                               // 107
                                                                                                                    // 108
    // Generate an id used for the components                                                                       // 109
    function generateId(index, id) {                                                                                // 110
        var generatedId = index;                                                                                    // 111
                                                                                                                    // 112
        if (!generatedId) {                                                                                         // 113
            throw new Meteor.Error(400, m.specifyIndex);                                                            // 114
        }                                                                                                           // 115
                                                                                                                    // 116
        if (id) {                                                                                                   // 117
            generatedId += '_' + id;                                                                                // 118
        }                                                                                                           // 119
                                                                                                                    // 120
        return generatedId;                                                                                         // 121
    }                                                                                                               // 122
                                                                                                                    // 123
    /* esInput */                                                                                                   // 124
                                                                                                                    // 125
    Template.esInput.events({                                                                                       // 126
        'keyup input' : function (e) {                                                                              // 127
            var i, id, index,                                                                                       // 128
                searchValue,                                                                                        // 129
                eventScope = this,                                                                                  // 130
                input = $(e.target),                                                                                // 131
                reactive = this.reactive !== "false",                                                               // 132
                timeout = this.timeout || defaults.inputTimeout,                                                    // 133
                event = this.event || defaults.event,                                                               // 134
                searchValue = input.val().trim(),                                                                   // 135
                keyCode = e.keyCode || e.which;                                                                     // 136
                                                                                                                    // 137
            // Pressed not enter with enter configuration                                                           // 138
            if ("enter" === event && 13 !== keyCode) {                                                              // 139
                return;                                                                                             // 140
            }                                                                                                       // 141
                                                                                                                    // 142
            if (!_.isArray(this.index)) {                                                                           // 143
                this.index = [this.index];                                                                          // 144
            }                                                                                                       // 145
                                                                                                                    // 146
            // Reset values if search value is empty                                                                // 147
            if (searchValue.length === 0) {                                                                         // 148
                _.each(this.index, function (index) {                                                               // 149
                    var id = generateId(index, eventScope.id);                                                      // 150
                    inputCache = '';                                                                                // 151
                    SearchVars.set(id, { 'searchingDone' : false, 'currentValue' : '', 'searching' : false });      // 152
                });                                                                                                 // 153
                                                                                                                    // 154
                return;                                                                                             // 155
            }                                                                                                       // 156
                                                                                                                    // 157
            // Only search when the value hasn't changed                                                            // 158
            if (inputCache === searchValue) {                                                                       // 159
                return;                                                                                             // 160
            }                                                                                                       // 161
                                                                                                                    // 162
            // Run the search at the specified timeout                                                              // 163
            inputCache = searchValue;                                                                               // 164
                                                                                                                    // 165
            _.each(this.index, function (index) {                                                                   // 166
                id = generateId(index, eventScope.id);                                                              // 167
                SearchVars.set(id, { 'searching' : false });                                                        // 168
                                                                                                                    // 169
                // If already running, stop the timer                                                               // 170
                if (LocalTimer.isRunning(id)) {                                                                     // 171
                    LocalTimer.stop(id);                                                                            // 172
                }                                                                                                   // 173
                                                                                                                    // 174
                // Set to default limit                                                                             // 175
                EasySearch.changeProperty(index, 'limit', EasySearch.getIndex(index).defaultLimit);                 // 176
                                                                                                                    // 177
                LocalTimer.runAt(id, timeout, esInputSearch, {                                                      // 178
                    value : searchValue,                                                                            // 179
                    easySearchID : id,                                                                              // 180
                    easySearchIndex : index,                                                                        // 181
                    easySearchReactive : reactive                                                                   // 182
                });                                                                                                 // 183
                                                                                                                    // 184
                SearchVars.set(id, { 'searchingDone' : false, 'searching' : true });                                // 185
            });                                                                                                     // 186
        },                                                                                                          // 187
        'keydown input' : function (e) {                                                                            // 188
            if ($(e.target).val().length === 0) {                                                                   // 189
                SearchVars.set(generateId(this.index, this.id), { 'currentValue' : '' });                           // 190
            }                                                                                                       // 191
        }                                                                                                           // 192
    });                                                                                                             // 193
                                                                                                                    // 194
    /* esEach */                                                                                                    // 195
    UI.registerHelper('esEach', function () {                                                                       // 196
        return Template.esEach;                                                                                     // 197
    });                                                                                                             // 198
                                                                                                                    // 199
    Template.esEach.helpers({                                                                                       // 200
        'elasticSearchDoc' : function () {                                                                          // 201
            var config,                                                                                             // 202
                indexConf,                                                                                          // 203
                isReactive,                                                                                         // 204
                options = this.options || null,                                                                     // 205
                doc = LocalCache.findOne(this.index);                                                               // 206
                                                                                                                    // 207
            if (!_.isObject(doc)) {                                                                                 // 208
                return [];                                                                                          // 209
            }                                                                                                       // 210
                                                                                                                    // 211
            if (SearchVars.get(generateId(this.index, this.id), 'searching')) {                                     // 212
                return [];                                                                                          // 213
            }                                                                                                       // 214
                                                                                                                    // 215
            isReactive = doc.r;                                                                                     // 216
                                                                                                                    // 217
            // Not reactive                                                                                         // 218
            if (doc && doc.d && !isReactive) {                                                                      // 219
                return doc.d;                                                                                       // 220
            }                                                                                                       // 221
                                                                                                                    // 222
            // Is reactive                                                                                          // 223
            if (doc && doc.d) {                                                                                     // 224
                config = EasySearch.getIndexes();                                                                   // 225
                indexConf = config[this.index];                                                                     // 226
                                                                                                                    // 227
                if (options) {                                                                                      // 228
                    return indexConf.collection.find({ _id : { $in : doc.d } }, options);                           // 229
                }                                                                                                   // 230
                                                                                                                    // 231
                // TODO: Find a more performant way than this for ordering the documents                            // 232
                return _.sortBy(indexConf.collection.find({ _id : { $in : doc.d } }).fetch(), function (document) { // 233
                    return doc.d.indexOf(document._id);                                                             // 234
                });                                                                                                 // 235
            }                                                                                                       // 236
        }                                                                                                           // 237
    });                                                                                                             // 238
                                                                                                                    // 239
    /* ifEsIsSearching */                                                                                           // 240
    Template.ifEsIsSearching.isSearching = function () {                                                            // 241
        var tplScope = this,                                                                                        // 242
            combineMethod = tplScope.logic && tplScope.logic.toUpperCase() === 'OR' ? 'some' : 'every';             // 243
                                                                                                                    // 244
        if (!_.isArray(this.index)) {                                                                               // 245
            this.index = [this.index];                                                                              // 246
        }                                                                                                           // 247
                                                                                                                    // 248
        return _[combineMethod](_.map(this.index, function (index) {                                                // 249
            var id = generateId(index, tplScope.id),                                                                // 250
                isSearching = SearchVars.get(id, 'searching');                                                      // 251
                                                                                                                    // 252
            return isSearching ? isSearching : null;                                                                // 253
        }));                                                                                                        // 254
    };                                                                                                              // 255
                                                                                                                    // 256
    /* ifEsHasNoResults */                                                                                          // 257
    Template.ifEsHasNoResults.hasNoResults = function () {                                                          // 258
        var tplScope = this,                                                                                        // 259
            combineMethod = tplScope.logic && tplScope.logic.toUpperCase() === 'OR' ? 'some' : 'every';             // 260
                                                                                                                    // 261
        if (!_.isArray(this.index)) {                                                                               // 262
            this.index = [this.index];                                                                              // 263
        }                                                                                                           // 264
                                                                                                                    // 265
        return _[combineMethod](_.map(this.index, function (index) {                                                // 266
            var id = generateId(index, tplScope.id),                                                                // 267
                cache = LocalCache.findOne({ '_id' : index }),                                                      // 268
                searchValue = SearchVars.get(id, 'currentValue');                                                   // 269
                                                                                                                    // 270
            if (SearchVars.get(id, 'searching') || (_.isString(searchValue) && searchValue.length === 0)) {         // 271
                return false;                                                                                       // 272
            }                                                                                                       // 273
                                                                                                                    // 274
            return cache && _.isArray(cache.d) && cache.d.length === 0;                                             // 275
        }));                                                                                                        // 276
    }                                                                                                               // 277
                                                                                                                    // 278
    /* esLoadMoreButton */                                                                                          // 279
    Template.esLoadMoreButton.rendered = function () {                                                              // 280
        SearchVars.set(generateId(this.data.index, this.data.id), { 'currentLimit' :  EasySearch.getIndex(this.data.index).limit });
    };                                                                                                              // 282
                                                                                                                    // 283
    Template.esLoadMoreButton.helpers({                                                                             // 284
        'content' : function () {                                                                                   // 285
            return this.content ? this.content : 'Load more';                                                       // 286
        },                                                                                                          // 287
        'hasMoreResults' : function () {                                                                            // 288
            var id = generateId(this.index, this.id);                                                               // 289
                                                                                                                    // 290
            return !SearchVars.get(id, 'searching')                                                                 // 291
                    && (SearchVars.get(id, 'total') > SearchVars.get(id, 'currentLimit'));                          // 292
        }                                                                                                           // 293
    });                                                                                                             // 294
                                                                                                                    // 295
    Template.esLoadMoreButton.events({                                                                              // 296
        'click button' : function () {                                                                              // 297
            var templateScope = this,                                                                               // 298
                id = generateId(this.index, this.id),                                                               // 299
                currentLimit = EasySearch.getIndexes()[this.index].limit,                                           // 300
                howManyMore = this.howMany ? this.howMany : 10;                                                     // 301
                                                                                                                    // 302
            templateScope.reactive = this.reactive !== "false";                                                     // 303
                                                                                                                    // 304
            EasySearch.changeProperty(this.index, 'limit', currentLimit + howManyMore);                             // 305
            EasySearch.search(this.index, SearchVars.get(id, 'currentValue'), function (err, data) {                // 306
                if (err) {                                                                                          // 307
                    throw new Meteor.Error(500, m.searchingFailed);                                                 // 308
                }                                                                                                   // 309
                                                                                                                    // 310
                SearchVars.set(id, { 'total' : data.total });                                                       // 311
                SearchVars.set(id, { 'currentLimit' : currentLimit + howManyMore });                                // 312
                processSearchResults(templateScope.index, data, templateScope.reactive);                            // 313
            });                                                                                                     // 314
        }                                                                                                           // 315
    });                                                                                                             // 316
                                                                                                                    // 317
    /* esAutosuggest */                                                                                             // 318
    Template.esAutosuggest.created = function () {                                                                  // 319
        var tplScope = this,                                                                                        // 320
            id = generateId(tplScope.data.index, tplScope.data.id);                                                 // 321
                                                                                                                    // 322
        SearchVars.set(id, { 'autosuggestSelected' : [] });                                                         // 323
                                                                                                                    // 324
        Deps.autorun(function () {                                                                                  // 325
            autosuggestCache.value = SearchVars.get(id, 'currentValue');                                            // 326
        });                                                                                                         // 327
    }                                                                                                               // 328
                                                                                                                    // 329
    Template.esAutosuggest.rendered = function () {                                                                 // 330
        var tplScope = this,                                                                                        // 331
            id = generateId(tplScope.data.index, tplScope.data.id);                                                 // 332
                                                                                                                    // 333
        Deps.autorun(function () {                                                                                  // 334
            var input = $(tplScope.find('input')),                                                                  // 335
                wrapper = $(tplScope.find('div')),                                                                  // 336
                values = SearchVars.get(id, 'autosuggestSelected');                                                 // 337
                                                                                                                    // 338
            // Reposition the input when a value gets added                                                         // 339
            input.css('padding-left', wrapper.find('.selected.values').width());                                    // 340
        });                                                                                                         // 341
    };                                                                                                              // 342
                                                                                                                    // 343
    Template.esAutosuggest.helpers({                                                                                // 344
        'selectedValue' : function () {                                                                             // 345
            var id = generateId(this.index, this.id);                                                               // 346
                                                                                                                    // 347
            return _.map(SearchVars.get(id, 'autosuggestSelected'), function (val) {                                // 348
                return {                                                                                            // 349
                    'id' : id,                                                                                      // 350
                    'docId' : val.id,                                                                               // 351
                    'value' : val.value                                                                             // 352
                };                                                                                                  // 353
            });                                                                                                     // 354
        },                                                                                                          // 355
        'selected' : function () {                                                                                  // 356
            var suggestionsSelected = SearchVars.get(generateId(this.options.index, this.options.id), 'suggestionsSelected');
            return _.isObject(suggestionsSelected) && suggestionsSelected.id === this.id ? 'selected' : '';         // 358
        },                                                                                                          // 359
        'isHidden' : function () {                                                                                  // 360
            var id = generateId(this.index, this.id),                                                               // 361
                inputValue = SearchVars.get(id, 'currentValue'),                                                    // 362
                searchingDone = SearchVars.get(id, 'searchingDone');                                                // 363
                                                                                                                    // 364
            return (inputValue && inputValue.length > 0) && searchingDone  ? 'show' : 'hide';                       // 365
        },                                                                                                          // 366
        'snippets' : function (options) {                                                                           // 367
            var regex, firstFieldValue, searchValue, parts,                                                         // 368
                index = EasySearch.getIndex(options.index),                                                         // 369
                firstField  = _.isArray(index.field) ? index.field[0] : index.field;                                // 370
                                                                                                                    // 371
            firstFieldValue = this[firstField];                                                                     // 372
                                                                                                                    // 373
            if (!_.isString(firstFieldValue)) {                                                                     // 374
                throw new Error(m.firstValueStringAutosuggest);                                                     // 375
            }                                                                                                       // 376
                                                                                                                    // 377
            searchValue = autosuggestCache.value,                                                                   // 378
            regex = new RegExp(searchValue + '(.+)?', "i");                                                         // 379
            parts = firstFieldValue.split(regex);                                                                   // 380
                                                                                                                    // 381
            // Not found in the first field                                                                         // 382
            if (parts.length === 1) {                                                                               // 383
                return {                                                                                            // 384
                    'pre' : firstFieldValue,                                                                        // 385
                    'value' : firstFieldValue,                                                                      // 386
                    'id' : this._id,                                                                                // 387
                    'options' : options                                                                             // 388
                };                                                                                                  // 389
            }                                                                                                       // 390
                                                                                                                    // 391
            return {                                                                                                // 392
                'pre' : parts[0],                                                                                   // 393
                'found' : (new RegExp(searchValue, 'i')).exec(firstFieldValue).shift(),                             // 394
                'post' : parts[1],                                                                                  // 395
                'value' : firstFieldValue,                                                                          // 396
                'id' : this._id,                                                                                    // 397
                'options' : options                                                                                 // 398
            };                                                                                                      // 399
        }                                                                                                           // 400
    });                                                                                                             // 401
                                                                                                                    // 402
    Template.esAutosuggest.events({                                                                                 // 403
        'click .suggestion:not(.remove)' : function (e) {                                                           // 404
            var values,                                                                                             // 405
                id = generateId(this.options.index, this.options.id),                                               // 406
                wrapper = $(e.target).closest('.es-autosuggest-wrapper'),                                           // 407
                input = wrapper.find('input');                                                                      // 408
                                                                                                                    // 409
            // Add a box in front of the input which is the selected "value"                                        // 410
            values = SearchVars.get(id, 'autosuggestSelected');                                                     // 411
            values.push({ 'id' : this.id, 'value' : this.value });                                                  // 412
            SearchVars.set(id, { 'autosuggestSelected' :  values, 'currentValue' : '' });                           // 413
                                                                                                                    // 414
            input.val('').keyup().keypress().keydown();                                                             // 415
                                                                                                                    // 416
            e.preventDefault();                                                                                     // 417
        },                                                                                                          // 418
        'click .remove' : function (e) {                                                                            // 419
            var tplScope = this;                                                                                    // 420
                                                                                                                    // 421
            // Removes a suggestion                                                                                 // 422
            SearchVars.set(this.id, { 'autosuggestSelected' :  _.reject(                                            // 423
                SearchVars.get(this.id, 'autosuggestSelected'), function (val) {                                    // 424
                    return val.id === tplScope.docId;                                                               // 425
                })                                                                                                  // 426
            });                                                                                                     // 427
        },                                                                                                          // 428
        'keydown input' : function (e) {                                                                            // 429
            var selected, currentValues,                                                                            // 430
                id = generateId(this.index, this.id), input = $(e.target),                                          // 431
                selected = SearchVars.get(id, 'suggestionsSelected');                                               // 432
                                                                                                                    // 433
            if (!$(e.target).val() && !e.which === 8) {                                                             // 434
                return;                                                                                             // 435
            }                                                                                                       // 436
                                                                                                                    // 437
            if (e.which === 13 && selected && _.isObject(selected)) {                                               // 438
                // Enter                                                                                            // 439
                currentValues = SearchVars.get(id, 'autosuggestSelected');                                          // 440
                currentValues.push(selected);                                                                       // 441
                                                                                                                    // 442
                SearchVars.set(id, {                                                                                // 443
                    'autosuggestSelected' : currentValues,                                                          // 444
                });                                                                                                 // 445
                                                                                                                    // 446
                $(e.target).val('');                                                                                // 447
                SearchVars.set(id, { 'suggestionsSelected' : '' });                                                 // 448
            } else if (e.which === 40 || e.which === 38) {                                                          // 449
                // Down or Up                                                                                       // 450
                var incrementalValue,                                                                               // 451
                    toBeSelectedDoc, firstField,                                                                    // 452
                    index = EasySearch.getIndex(this.index[0]),                                                     // 453
                    suggestions = SearchVars.get(id, 'searchResults');                                              // 454
                                                                                                                    // 455
                if (!index || !suggestions) {                                                                       // 456
                    return;                                                                                         // 457
                }                                                                                                   // 458
                                                                                                                    // 459
                firstField = firstField  = _.isArray(index.field) ? index.field[0] : index.field;                   // 460
                                                                                                                    // 461
                // If there's none selected                                                                         // 462
                if (!selected && e.which === 40) {                                                                  // 463
                    selected = {                                                                                    // 464
                        'pos' : -1                                                                                  // 465
                    };                                                                                              // 466
                } else if (!selected && e.which === 38) {                                                           // 467
                    selected = {                                                                                    // 468
                        'pos' : suggestions.length                                                                  // 469
                    };                                                                                              // 470
                }                                                                                                   // 471
                                                                                                                    // 472
                // Take the one below or up, decide by key                                                          // 473
                incrementalValue = e.which === 40 ? 1 :  -1;                                                        // 474
                                                                                                                    // 475
                toBeSelectedDoc = suggestions[selected.pos + incrementalValue];                                     // 476
                                                                                                                    // 477
                if (!toBeSelectedDoc) {                                                                             // 478
                    return;                                                                                         // 479
                }                                                                                                   // 480
                                                                                                                    // 481
                SearchVars.set(id, { 'suggestionsSelected' : {                                                      // 482
                    'value' : toBeSelectedDoc[firstField],                                                          // 483
                    'id' : toBeSelectedDoc._id,                                                                     // 484
                    'pos' : selected.pos + incrementalValue                                                         // 485
                }});                                                                                                // 486
                                                                                                                    // 487
                e.preventDefault();                                                                                 // 488
            } else if (e.which === 8 && input.val().length === 0) {                                                 // 489
                // Remove                                                                                           // 490
                SearchVars.set(id, {                                                                                // 491
                    'autosuggestSelected' : _.initial(SearchVars.get(id, 'autosuggestSelected'))                    // 492
                });                                                                                                 // 493
            }                                                                                                       // 494
        },                                                                                                          // 495
        'keyup input' : function () {                                                                               // 496
            var id = generateId(this.index, this.id);                                                               // 497
                                                                                                                    // 498
            if (SearchVars.get(id, 'searching')) {                                                                  // 499
                SearchVars.set(id, { 'suggestionsSelected' : '' });                                                 // 500
            }                                                                                                       // 501
        }                                                                                                           // 502
    });                                                                                                             // 503
                                                                                                                    // 504
    EasySearch.ComponentVariables = SearchVars;                                                                     // 505
    EasySearch.Components = {                                                                                       // 506
        'generateId' : generateId                                                                                   // 507
    };                                                                                                              // 508
})();                                                                                                               // 509
                                                                                                                    // 510
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages\easy-search\lib\easy-search-convenience.js                                                              //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
Meteor.Collection.prototype.initEasySearch = function (fields, options) {                                           // 1
    if (!_.isObject(options)) {                                                                                     // 2
        options = {};                                                                                               // 3
    }                                                                                                               // 4
                                                                                                                    // 5
    EasySearch.createSearchIndex(this._name, _.extend(options, {                                                    // 6
        'collection' : this,                                                                                        // 7
        'field' : fields                                                                                            // 8
    }));                                                                                                            // 9
};                                                                                                                  // 10
                                                                                                                    // 11
if (Meteor.isClient) {                                                                                              // 12
    jQuery.fn.esAutosuggestData = function () {                                                                     // 13
        var id,                                                                                                     // 14
            input = $(this);                                                                                        // 15
                                                                                                                    // 16
        if (input.prop("tagName") !== 'INPUT') {                                                                    // 17
            return [];                                                                                              // 18
        }                                                                                                           // 19
                                                                                                                    // 20
        id = EasySearch.Components.generateId(input.parent().data('index'), input.parent().data('id'));             // 21
                                                                                                                    // 22
        return EasySearch.ComponentVariables.get(id, 'autosuggestSelected');                                        // 23
    }                                                                                                               // 24
}                                                                                                                   // 25
                                                                                                                    // 26
                                                                                                                    // 27
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);
