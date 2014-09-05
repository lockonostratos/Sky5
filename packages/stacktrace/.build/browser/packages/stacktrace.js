(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages\stacktrace\stacktrace\stacktrace.js                                                                        //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
// Domain Public by Eric Wendelin http://eriwen.com/ (2008)                                                            // 1
//                  Luke Smith http://lucassmith.name/ (2008)                                                          // 2
//                  Loic Dachary <loic@dachary.org> (2008)                                                             // 3
//                  Johan Euphrosine <proppy@aminche.com> (2008)                                                       // 4
//                  Oyvind Sean Kinsey http://kinsey.no/blog (2010)                                                    // 5
//                  Victor Homyakov <victor-homyakov@users.sourceforge.net> (2010)                                     // 6
/*global module, exports, define, ActiveXObject*/                                                                      // 7
(function(global, factory) {                                                                                           // 8
    if (typeof exports === 'object') {                                                                                 // 9
        // Node                                                                                                        // 10
        module.exports = factory();                                                                                    // 11
    } else if (typeof define === 'function' && define.amd) {                                                           // 12
        // AMD                                                                                                         // 13
        define(factory);                                                                                               // 14
    } else {                                                                                                           // 15
        // Browser globals                                                                                             // 16
        global.printStackTrace = factory();                                                                            // 17
    }                                                                                                                  // 18
}(this, function() {                                                                                                   // 19
    /**                                                                                                                // 20
     * Main function giving a function stack trace with a forced or passed in Error                                    // 21
     *                                                                                                                 // 22
     * @cfg {Error} e The error to create a stacktrace from (optional)                                                 // 23
     * @cfg {Boolean} guess If we should try to resolve the names of anonymous functions                               // 24
     * @return {Array} of Strings with functions, lines, files, and arguments where possible                           // 25
     */                                                                                                                // 26
    function printStackTrace(options) {                                                                                // 27
        options = options || {guess: true};                                                                            // 28
        var ex = options.e || null, guess = !!options.guess;                                                           // 29
        var p = new printStackTrace.implementation(), result = p.run(ex);                                              // 30
        return (guess) ? p.guessAnonymousFunctions(result) : result;                                                   // 31
    }                                                                                                                  // 32
                                                                                                                       // 33
    printStackTrace.implementation = function() {                                                                      // 34
    };                                                                                                                 // 35
                                                                                                                       // 36
    printStackTrace.implementation.prototype = {                                                                       // 37
        /**                                                                                                            // 38
         * @param {Error} [ex] The error to create a stacktrace from (optional)                                        // 39
         * @param {String} [mode] Forced mode (optional, mostly for unit tests)                                        // 40
         */                                                                                                            // 41
        run: function(ex, mode) {                                                                                      // 42
            ex = ex || this.createException();                                                                         // 43
            mode = mode || this.mode(ex);                                                                              // 44
            if (mode === 'other') {                                                                                    // 45
                return this.other(arguments.callee);                                                                   // 46
            } else {                                                                                                   // 47
                return this[mode](ex);                                                                                 // 48
            }                                                                                                          // 49
        },                                                                                                             // 50
                                                                                                                       // 51
        createException: function() {                                                                                  // 52
            try {                                                                                                      // 53
                this.undef();                                                                                          // 54
            } catch (e) {                                                                                              // 55
                return e;                                                                                              // 56
            }                                                                                                          // 57
        },                                                                                                             // 58
                                                                                                                       // 59
        /**                                                                                                            // 60
         * Mode could differ for different exception, e.g.                                                             // 61
         * exceptions in Chrome may or may not have arguments or stack.                                                // 62
         *                                                                                                             // 63
         * @return {String} mode of operation for the exception                                                        // 64
         */                                                                                                            // 65
        mode: function(e) {                                                                                            // 66
            if (e['arguments'] && e.stack) {                                                                           // 67
                return 'chrome';                                                                                       // 68
            }                                                                                                          // 69
                                                                                                                       // 70
            if (e.stack && e.sourceURL) {                                                                              // 71
                return 'safari';                                                                                       // 72
            }                                                                                                          // 73
                                                                                                                       // 74
            if (e.stack && e.number) {                                                                                 // 75
                return 'ie';                                                                                           // 76
            }                                                                                                          // 77
                                                                                                                       // 78
            if (e.stack && e.fileName) {                                                                               // 79
                return 'firefox';                                                                                      // 80
            }                                                                                                          // 81
                                                                                                                       // 82
            if (e.message && e['opera#sourceloc']) {                                                                   // 83
                // e.message.indexOf("Backtrace:") > -1 -> opera9                                                      // 84
                // 'opera#sourceloc' in e -> opera9, opera10a                                                          // 85
                // !e.stacktrace -> opera9                                                                             // 86
                if (!e.stacktrace) {                                                                                   // 87
                    return 'opera9'; // use e.message                                                                  // 88
                }                                                                                                      // 89
                if (e.message.indexOf('\n') > -1 && e.message.split('\n').length > e.stacktrace.split('\n').length) {  // 90
                    // e.message may have more stack entries than e.stacktrace                                         // 91
                    return 'opera9'; // use e.message                                                                  // 92
                }                                                                                                      // 93
                return 'opera10a'; // use e.stacktrace                                                                 // 94
            }                                                                                                          // 95
                                                                                                                       // 96
            if (e.message && e.stack && e.stacktrace) {                                                                // 97
                // e.stacktrace && e.stack -> opera10b                                                                 // 98
                if (e.stacktrace.indexOf("called from line") < 0) {                                                    // 99
                    return 'opera10b'; // use e.stacktrace, format differs from 'opera10a'                             // 100
                }                                                                                                      // 101
                // e.stacktrace && e.stack -> opera11                                                                  // 102
                return 'opera11'; // use e.stacktrace, format differs from 'opera10a', 'opera10b'                      // 103
            }                                                                                                          // 104
                                                                                                                       // 105
            if (e.stack && !e.fileName) {                                                                              // 106
                // Chrome 27 does not have e.arguments as earlier versions,                                            // 107
                // but still does not have e.fileName as Firefox                                                       // 108
                return 'chrome';                                                                                       // 109
            }                                                                                                          // 110
                                                                                                                       // 111
            return 'other';                                                                                            // 112
        },                                                                                                             // 113
                                                                                                                       // 114
        /**                                                                                                            // 115
         * Given a context, function name, and callback function, overwrite it so that it calls                        // 116
         * printStackTrace() first with a callback and then runs the rest of the body.                                 // 117
         *                                                                                                             // 118
         * @param {Object} context of execution (e.g. window)                                                          // 119
         * @param {String} functionName to instrument                                                                  // 120
         * @param {Function} callback function to call with a stack trace on invocation                                // 121
         */                                                                                                            // 122
        instrumentFunction: function(context, functionName, callback) {                                                // 123
            context = context || window;                                                                               // 124
            var original = context[functionName];                                                                      // 125
            context[functionName] = function instrumented() {                                                          // 126
                callback.call(this, printStackTrace().slice(4));                                                       // 127
                return context[functionName]._instrumented.apply(this, arguments);                                     // 128
            };                                                                                                         // 129
            context[functionName]._instrumented = original;                                                            // 130
        },                                                                                                             // 131
                                                                                                                       // 132
        /**                                                                                                            // 133
         * Given a context and function name of a function that has been                                               // 134
         * instrumented, revert the function to it's original (non-instrumented)                                       // 135
         * state.                                                                                                      // 136
         *                                                                                                             // 137
         * @param {Object} context of execution (e.g. window)                                                          // 138
         * @param {String} functionName to de-instrument                                                               // 139
         */                                                                                                            // 140
        deinstrumentFunction: function(context, functionName) {                                                        // 141
            if (context[functionName].constructor === Function &&                                                      // 142
                context[functionName]._instrumented &&                                                                 // 143
                context[functionName]._instrumented.constructor === Function) {                                        // 144
                context[functionName] = context[functionName]._instrumented;                                           // 145
            }                                                                                                          // 146
        },                                                                                                             // 147
                                                                                                                       // 148
        /**                                                                                                            // 149
         * Given an Error object, return a formatted Array based on Chrome's stack string.                             // 150
         *                                                                                                             // 151
         * @param e - Error object to inspect                                                                          // 152
         * @return Array<String> of function calls, files and line numbers                                             // 153
         */                                                                                                            // 154
        chrome: function(e) {                                                                                          // 155
            return (e.stack + '\n')                                                                                    // 156
                .replace(/^[\s\S]+?\s+at\s+/, ' at ') // remove message                                                // 157
                .replace(/^\s+(at eval )?at\s+/gm, '') // remove 'at' and indentation                                  // 158
                .replace(/^([^\(]+?)([\n$])/gm, '{anonymous}() ($1)$2')                                                // 159
                .replace(/^Object.<anonymous>\s*\(([^\)]+)\)/gm, '{anonymous}() ($1)')                                 // 160
                .replace(/^(.+) \((.+)\)$/gm, '$1@$2')                                                                 // 161
                .split('\n')                                                                                           // 162
                .slice(0, -1);                                                                                         // 163
        },                                                                                                             // 164
                                                                                                                       // 165
        /**                                                                                                            // 166
         * Given an Error object, return a formatted Array based on Safari's stack string.                             // 167
         *                                                                                                             // 168
         * @param e - Error object to inspect                                                                          // 169
         * @return Array<String> of function calls, files and line numbers                                             // 170
         */                                                                                                            // 171
        safari: function(e) {                                                                                          // 172
            return e.stack.replace(/\[native code\]\n/m, '')                                                           // 173
                .replace(/^(?=\w+Error\:).*$\n/m, '')                                                                  // 174
                .replace(/^@/gm, '{anonymous}()@')                                                                     // 175
                .split('\n');                                                                                          // 176
        },                                                                                                             // 177
                                                                                                                       // 178
        /**                                                                                                            // 179
         * Given an Error object, return a formatted Array based on IE's stack string.                                 // 180
         *                                                                                                             // 181
         * @param e - Error object to inspect                                                                          // 182
         * @return Array<String> of function calls, files and line numbers                                             // 183
         */                                                                                                            // 184
        ie: function(e) {                                                                                              // 185
            return e.stack                                                                                             // 186
                .replace(/^\s*at\s+(.*)$/gm, '$1')                                                                     // 187
                .replace(/^Anonymous function\s+/gm, '{anonymous}() ')                                                 // 188
                .replace(/^(.+)\s+\((.+)\)$/gm, '$1@$2')                                                               // 189
                .split('\n')                                                                                           // 190
                .slice(1);                                                                                             // 191
        },                                                                                                             // 192
                                                                                                                       // 193
        /**                                                                                                            // 194
         * Given an Error object, return a formatted Array based on Firefox's stack string.                            // 195
         *                                                                                                             // 196
         * @param e - Error object to inspect                                                                          // 197
         * @return Array<String> of function calls, files and line numbers                                             // 198
         */                                                                                                            // 199
        firefox: function(e) {                                                                                         // 200
            return e.stack.replace(/(?:\n@:0)?\s+$/m, '')                                                              // 201
                .replace(/^(?:\((\S*)\))?@/gm, '{anonymous}($1)@')                                                     // 202
                .split('\n');                                                                                          // 203
        },                                                                                                             // 204
                                                                                                                       // 205
        opera11: function(e) {                                                                                         // 206
            var ANON = '{anonymous}', lineRE = /^.*line (\d+), column (\d+)(?: in (.+))? in (\S+):$/;                  // 207
            var lines = e.stacktrace.split('\n'), result = [];                                                         // 208
                                                                                                                       // 209
            for (var i = 0, len = lines.length; i < len; i += 2) {                                                     // 210
                var match = lineRE.exec(lines[i]);                                                                     // 211
                if (match) {                                                                                           // 212
                    var location = match[4] + ':' + match[1] + ':' + match[2];                                         // 213
                    var fnName = match[3] || "global code";                                                            // 214
                    fnName = fnName.replace(/<anonymous function: (\S+)>/, "$1").replace(/<anonymous function>/, ANON);
                    result.push(fnName + '@' + location + ' -- ' + lines[i + 1].replace(/^\s+/, ''));                  // 216
                }                                                                                                      // 217
            }                                                                                                          // 218
                                                                                                                       // 219
            return result;                                                                                             // 220
        },                                                                                                             // 221
                                                                                                                       // 222
        opera10b: function(e) {                                                                                        // 223
            // "<anonymous function: run>([arguments not available])@file://localhost/G:/js/stacktrace.js:27\n" +      // 224
            // "printStackTrace([arguments not available])@file://localhost/G:/js/stacktrace.js:18\n" +                // 225
            // "@file://localhost/G:/js/test/functional/testcase1.html:15"                                             // 226
            var lineRE = /^(.*)@(.+):(\d+)$/;                                                                          // 227
            var lines = e.stacktrace.split('\n'), result = [];                                                         // 228
                                                                                                                       // 229
            for (var i = 0, len = lines.length; i < len; i++) {                                                        // 230
                var match = lineRE.exec(lines[i]);                                                                     // 231
                if (match) {                                                                                           // 232
                    var fnName = match[1] ? (match[1] + '()') : "global code";                                         // 233
                    result.push(fnName + '@' + match[2] + ':' + match[3]);                                             // 234
                }                                                                                                      // 235
            }                                                                                                          // 236
                                                                                                                       // 237
            return result;                                                                                             // 238
        },                                                                                                             // 239
                                                                                                                       // 240
        /**                                                                                                            // 241
         * Given an Error object, return a formatted Array based on Opera 10's stacktrace string.                      // 242
         *                                                                                                             // 243
         * @param e - Error object to inspect                                                                          // 244
         * @return Array<String> of function calls, files and line numbers                                             // 245
         */                                                                                                            // 246
        opera10a: function(e) {                                                                                        // 247
            // "  Line 27 of linked script file://localhost/G:/js/stacktrace.js\n"                                     // 248
            // "  Line 11 of inline#1 script in file://localhost/G:/js/test/functional/testcase1.html: In function foo\n"
            var ANON = '{anonymous}', lineRE = /Line (\d+).*script (?:in )?(\S+)(?:: In function (\S+))?$/i;           // 250
            var lines = e.stacktrace.split('\n'), result = [];                                                         // 251
                                                                                                                       // 252
            for (var i = 0, len = lines.length; i < len; i += 2) {                                                     // 253
                var match = lineRE.exec(lines[i]);                                                                     // 254
                if (match) {                                                                                           // 255
                    var fnName = match[3] || ANON;                                                                     // 256
                    result.push(fnName + '()@' + match[2] + ':' + match[1] + ' -- ' + lines[i + 1].replace(/^\s+/, ''));
                }                                                                                                      // 258
            }                                                                                                          // 259
                                                                                                                       // 260
            return result;                                                                                             // 261
        },                                                                                                             // 262
                                                                                                                       // 263
        // Opera 7.x-9.2x only!                                                                                        // 264
        opera9: function(e) {                                                                                          // 265
            // "  Line 43 of linked script file://localhost/G:/js/stacktrace.js\n"                                     // 266
            // "  Line 7 of inline#1 script in file://localhost/G:/js/test/functional/testcase1.html\n"                // 267
            var ANON = '{anonymous}', lineRE = /Line (\d+).*script (?:in )?(\S+)/i;                                    // 268
            var lines = e.message.split('\n'), result = [];                                                            // 269
                                                                                                                       // 270
            for (var i = 2, len = lines.length; i < len; i += 2) {                                                     // 271
                var match = lineRE.exec(lines[i]);                                                                     // 272
                if (match) {                                                                                           // 273
                    result.push(ANON + '()@' + match[2] + ':' + match[1] + ' -- ' + lines[i + 1].replace(/^\s+/, '')); // 274
                }                                                                                                      // 275
            }                                                                                                          // 276
                                                                                                                       // 277
            return result;                                                                                             // 278
        },                                                                                                             // 279
                                                                                                                       // 280
        // Safari 5-, IE 9-, and others                                                                                // 281
        other: function(curr) {                                                                                        // 282
            var ANON = '{anonymous}', fnRE = /function(?:\s+([\w$]+))?\s*\(/, stack = [], fn, args, maxStackSize = 10; // 283
            var slice = Array.prototype.slice;                                                                         // 284
            while (curr && stack.length < maxStackSize) {                                                              // 285
                fn = fnRE.test(curr.toString()) ? RegExp.$1 || ANON : ANON;                                            // 286
                try {                                                                                                  // 287
                    args = slice.call(curr['arguments'] || []);                                                        // 288
                } catch (e) {                                                                                          // 289
                    args = ['Cannot access arguments: ' + e];                                                          // 290
                }                                                                                                      // 291
                stack[stack.length] = fn + '(' + this.stringifyArguments(args) + ')';                                  // 292
                try {                                                                                                  // 293
                    curr = curr.caller;                                                                                // 294
                } catch (e) {                                                                                          // 295
                    stack[stack.length] = 'Cannot access caller: ' + e;                                                // 296
                    break;                                                                                             // 297
                }                                                                                                      // 298
            }                                                                                                          // 299
            return stack;                                                                                              // 300
        },                                                                                                             // 301
                                                                                                                       // 302
        /**                                                                                                            // 303
         * Given arguments array as a String, substituting type names for non-string types.                            // 304
         *                                                                                                             // 305
         * @param {Arguments,Array} args                                                                               // 306
         * @return {String} stringified arguments                                                                      // 307
         */                                                                                                            // 308
        stringifyArguments: function(args) {                                                                           // 309
            var result = [];                                                                                           // 310
            var slice = Array.prototype.slice;                                                                         // 311
            for (var i = 0; i < args.length; ++i) {                                                                    // 312
                var arg = args[i];                                                                                     // 313
                if (arg === undefined) {                                                                               // 314
                    result[i] = 'undefined';                                                                           // 315
                } else if (arg === null) {                                                                             // 316
                    result[i] = 'null';                                                                                // 317
                } else if (arg.constructor) {                                                                          // 318
                    // TODO constructor comparison does not work for iframes                                           // 319
                    if (arg.constructor === Array) {                                                                   // 320
                        if (arg.length < 3) {                                                                          // 321
                            result[i] = '[' + this.stringifyArguments(arg) + ']';                                      // 322
                        } else {                                                                                       // 323
                            result[i] = '[' + this.stringifyArguments(slice.call(arg, 0, 1)) + '...' + this.stringifyArguments(slice.call(arg, -1)) + ']';
                        }                                                                                              // 325
                    } else if (arg.constructor === Object) {                                                           // 326
                        result[i] = '#object';                                                                         // 327
                    } else if (arg.constructor === Function) {                                                         // 328
                        result[i] = '#function';                                                                       // 329
                    } else if (arg.constructor === String) {                                                           // 330
                        result[i] = '"' + arg + '"';                                                                   // 331
                    } else if (arg.constructor === Number) {                                                           // 332
                        result[i] = arg;                                                                               // 333
                    } else {                                                                                           // 334
                        result[i] = '?';                                                                               // 335
                    }                                                                                                  // 336
                }                                                                                                      // 337
            }                                                                                                          // 338
            return result.join(',');                                                                                   // 339
        },                                                                                                             // 340
                                                                                                                       // 341
        sourceCache: {},                                                                                               // 342
                                                                                                                       // 343
        /**                                                                                                            // 344
         * @return {String} the text from a given URL                                                                  // 345
         */                                                                                                            // 346
        ajax: function(url) {                                                                                          // 347
            var req = this.createXMLHTTPObject();                                                                      // 348
            if (req) {                                                                                                 // 349
                try {                                                                                                  // 350
                    req.open('GET', url, false);                                                                       // 351
                    //req.overrideMimeType('text/plain');                                                              // 352
                    //req.overrideMimeType('text/javascript');                                                         // 353
                    req.send(null);                                                                                    // 354
                    //return req.status == 200 ? req.responseText : '';                                                // 355
                    return req.responseText;                                                                           // 356
                } catch (e) {                                                                                          // 357
                }                                                                                                      // 358
            }                                                                                                          // 359
            return '';                                                                                                 // 360
        },                                                                                                             // 361
                                                                                                                       // 362
        /**                                                                                                            // 363
         * Try XHR methods in order and store XHR factory.                                                             // 364
         *                                                                                                             // 365
         * @return {XMLHttpRequest} XHR function or equivalent                                                         // 366
         */                                                                                                            // 367
        createXMLHTTPObject: function() {                                                                              // 368
            var xmlhttp, XMLHttpFactories = [                                                                          // 369
                function() {                                                                                           // 370
                    return new XMLHttpRequest();                                                                       // 371
                }, function() {                                                                                        // 372
                    return new ActiveXObject('Msxml2.XMLHTTP');                                                        // 373
                }, function() {                                                                                        // 374
                    return new ActiveXObject('Msxml3.XMLHTTP');                                                        // 375
                }, function() {                                                                                        // 376
                    return new ActiveXObject('Microsoft.XMLHTTP');                                                     // 377
                }                                                                                                      // 378
            ];                                                                                                         // 379
            for (var i = 0; i < XMLHttpFactories.length; i++) {                                                        // 380
                try {                                                                                                  // 381
                    xmlhttp = XMLHttpFactories[i]();                                                                   // 382
                    // Use memoization to cache the factory                                                            // 383
                    this.createXMLHTTPObject = XMLHttpFactories[i];                                                    // 384
                    return xmlhttp;                                                                                    // 385
                } catch (e) {                                                                                          // 386
                }                                                                                                      // 387
            }                                                                                                          // 388
        },                                                                                                             // 389
                                                                                                                       // 390
        /**                                                                                                            // 391
         * Given a URL, check if it is in the same domain (so we can get the source                                    // 392
         * via Ajax).                                                                                                  // 393
         *                                                                                                             // 394
         * @param url {String} source url                                                                              // 395
         * @return {Boolean} False if we need a cross-domain request                                                   // 396
         */                                                                                                            // 397
        isSameDomain: function(url) {                                                                                  // 398
            return typeof location !== "undefined" && url.indexOf(location.hostname) !== -1; // location may not be defined, e.g. when running from nodejs.
        },                                                                                                             // 400
                                                                                                                       // 401
        /**                                                                                                            // 402
         * Get source code from given URL if in the same domain.                                                       // 403
         *                                                                                                             // 404
         * @param url {String} JS source URL                                                                           // 405
         * @return {Array} Array of source code lines                                                                  // 406
         */                                                                                                            // 407
        getSource: function(url) {                                                                                     // 408
            // TODO reuse source from script tags?                                                                     // 409
            if (!(url in this.sourceCache)) {                                                                          // 410
                this.sourceCache[url] = this.ajax(url).split('\n');                                                    // 411
            }                                                                                                          // 412
            return this.sourceCache[url];                                                                              // 413
        },                                                                                                             // 414
                                                                                                                       // 415
        guessAnonymousFunctions: function(stack) {                                                                     // 416
            for (var i = 0; i < stack.length; ++i) {                                                                   // 417
                var reStack = /\{anonymous\}\(.*\)@(.*)/,                                                              // 418
                    reRef = /^(.*?)(?::(\d+))(?::(\d+))?(?: -- .+)?$/,                                                 // 419
                    frame = stack[i], ref = reStack.exec(frame);                                                       // 420
                                                                                                                       // 421
                if (ref) {                                                                                             // 422
                    var m = reRef.exec(ref[1]);                                                                        // 423
                    if (m) { // If falsey, we did not get any file/line information                                    // 424
                        var file = m[1], lineno = m[2], charno = m[3] || 0;                                            // 425
                        if (file && this.isSameDomain(file) && lineno) {                                               // 426
                            var functionName = this.guessAnonymousFunction(file, lineno, charno);                      // 427
                            stack[i] = frame.replace('{anonymous}', functionName);                                     // 428
                        }                                                                                              // 429
                    }                                                                                                  // 430
                }                                                                                                      // 431
            }                                                                                                          // 432
            return stack;                                                                                              // 433
        },                                                                                                             // 434
                                                                                                                       // 435
        guessAnonymousFunction: function(url, lineNo, charNo) {                                                        // 436
            var ret;                                                                                                   // 437
            try {                                                                                                      // 438
                ret = this.findFunctionName(this.getSource(url), lineNo);                                              // 439
            } catch (e) {                                                                                              // 440
                ret = 'getSource failed with url: ' + url + ', exception: ' + e.toString();                            // 441
            }                                                                                                          // 442
            return ret;                                                                                                // 443
        },                                                                                                             // 444
                                                                                                                       // 445
        findFunctionName: function(source, lineNo) {                                                                   // 446
            // FIXME findFunctionName fails for compressed source                                                      // 447
            // (more than one function on the same line)                                                               // 448
            // function {name}({args}) m[1]=name m[2]=args                                                             // 449
            var reFunctionDeclaration = /function\s+([^(]*?)\s*\(([^)]*)\)/;                                           // 450
            // {name} = function ({args}) TODO args capture                                                            // 451
            // /['"]?([0-9A-Za-z_]+)['"]?\s*[:=]\s*function(?:[^(]*)/                                                  // 452
            var reFunctionExpression = /['"]?([$_A-Za-z][$_A-Za-z0-9]*)['"]?\s*[:=]\s*function\b/;                     // 453
            // {name} = eval()                                                                                         // 454
            var reFunctionEvaluation = /['"]?([$_A-Za-z][$_A-Za-z0-9]*)['"]?\s*[:=]\s*(?:eval|new Function)\b/;        // 455
            // Walk backwards in the source lines until we find                                                        // 456
            // the line which matches one of the patterns above                                                        // 457
            var code = "", line, maxLines = Math.min(lineNo, 20), m, commentPos;                                       // 458
            for (var i = 0; i < maxLines; ++i) {                                                                       // 459
                // lineNo is 1-based, source[] is 0-based                                                              // 460
                line = source[lineNo - i - 1];                                                                         // 461
                commentPos = line.indexOf('//');                                                                       // 462
                if (commentPos >= 0) {                                                                                 // 463
                    line = line.substr(0, commentPos);                                                                 // 464
                }                                                                                                      // 465
                // TODO check other types of comments? Commented code may lead to false positive                       // 466
                if (line) {                                                                                            // 467
                    code = line + code;                                                                                // 468
                    m = reFunctionExpression.exec(code);                                                               // 469
                    if (m && m[1]) {                                                                                   // 470
                        return m[1];                                                                                   // 471
                    }                                                                                                  // 472
                    m = reFunctionDeclaration.exec(code);                                                              // 473
                    if (m && m[1]) {                                                                                   // 474
                        //return m[1] + "(" + (m[2] || "") + ")";                                                      // 475
                        return m[1];                                                                                   // 476
                    }                                                                                                  // 477
                    m = reFunctionEvaluation.exec(code);                                                               // 478
                    if (m && m[1]) {                                                                                   // 479
                        return m[1];                                                                                   // 480
                    }                                                                                                  // 481
                }                                                                                                      // 482
            }                                                                                                          // 483
            return '(?)';                                                                                              // 484
        }                                                                                                              // 485
    };                                                                                                                 // 486
                                                                                                                       // 487
    return printStackTrace;                                                                                            // 488
}));                                                                                                                   // 489
                                                                                                                       // 490
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages\stacktrace\export-stacktrace.js                                                                            //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
StackTrace = {                                                                                                         // 1
  printStackTrace: printStackTrace,                                                                                    // 2
  getCaller: function (skip) {                                                                                         // 3
    skip = skip || 2;                                                                                                  // 4
    var lines = printStackTrace();                                                                                     // 5
    var i = 0;                                                                                                         // 6
    for (; skip > 0 && i < lines.length; skip--) {                                                                     // 7
      var thisFile = (lines[i].match(/@(.*\/.+\.(coffee|js)).*$/))[1];                                                 // 8
      for (i++; i < lines.length; i++) {                                                                               // 9
        if (lines[i].indexOf(thisFile) === -1) {                                                                       // 10
          break;                                                                                                       // 11
        }                                                                                                              // 12
      }                                                                                                                // 13
    }                                                                                                                  // 14
    return lines[i] || '<code_minimized>';                                                                             // 15
  }                                                                                                                    // 16
};                                                                                                                     // 17
                                                                                                                       // 18
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);
