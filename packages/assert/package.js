Package.describe({
  summary: "Make code assertions to assure your code works as expected"
});

Package.on_use(function (api) {
  api.export('assert');

  api.add_files([
    'server.js'
  ], 'server');

  api.add_files([
    'client/assert.js',
    'export-assert.js'
  ], 'client');
});

Package.on_test(function (api) {
  api.use(['assert', 'tinytest', 'test-helpers'], ['client', 'server']);
  api.add_files('tests.js', ['client', 'server']);
});