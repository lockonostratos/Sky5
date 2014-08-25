Package.describe({
  summary: "Extends Meteor.Collection with before/after hooks for insert/update/remove/find/findOne"
});

var both = ["client", "server"];

Package.on_use(function (api, where) {
  api.use([
    "meteor",
    "underscore",
    "ejson",
    "mongo-livedata",
    "minimongo",
    "deps"
  ], both);

  api.use([
    "accounts-base"
  ], both, { weak: true });

  api.add_files([
    "bind-polyfill.js",
    "collection-hooks.js",
    "insert.js",
    "update.js",
    "remove.js",
    "find.js",
    "findone.js"
  ], both);

  // Load after all advices have been defined
  api.add_files([
    "users-compat.js"
  ], both);

  if (typeof api.export !== 'undefined') {
    api.export(["CollectionHooks"]);
  }
});

Package.on_test(function (api) {
  api.use([
    "collection-hooks",
    "underscore",
    "accounts-base",
    "accounts-password",
    "tinytest",
    "test-helpers"
  ], both);

  api.add_files(["tests/insecure_login.js"], both);

  // local = minimongo (on server and client)
  // both = minimongo on client and server, mongo on server, with mutator methods
  // allow = same as both but with an allow rule test
  api.add_files(["tests/insert_local.js"], both);
  api.add_files(["tests/insert_both.js"], both);
  api.add_files(["tests/insert_allow.js"], both);
  api.add_files(["tests/insert_user.js"], "server");

  api.add_files(["tests/update_local.js"], both);
  api.add_files(["tests/update_both.js"], both);
  api.add_files(["tests/update_allow.js"], both);
  api.add_files(["tests/update_user.js"], "server");
  api.add_files(["tests/update_without_id.js"], "server");

  api.add_files(["tests/remove_local.js"], both);
  api.add_files(["tests/remove_both.js"], both);
  api.add_files(["tests/remove_allow.js"], both);

  api.add_files(["tests/find.js"], both);
  api.add_files(["tests/findone.js"], both);
  api.add_files(["tests/find_users.js"], both);
  api.add_files(["tests/find_findone_userid.js"], both);

  api.add_files(["tests/multiple_hooks.js"], both);
  api.add_files(["tests/transform.js"], both);
  api.add_files(["tests/direct.js"], both);
  api.add_files(["tests/optional_previous.js"], both);

  // NOTE: not supporting fetch for the time being.
  // NOTE: fetch can only work server-side because find's "fields" option is
  // limited to only working on the server
  //api.add_files(["tests/fetch.js"], "server");
});
