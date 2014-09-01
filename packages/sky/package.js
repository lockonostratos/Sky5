Package.describe({
    summary: "System package for Sky Engine."
});

Package.on_use(function (api, where) {
    api.add_files('sky.coffee', ['client', 'server']);
    api.use(['coffeescript', 'handlebars', 'deps'], ['client', 'server']);
    api.export('Sky', ['client', 'server']);
});