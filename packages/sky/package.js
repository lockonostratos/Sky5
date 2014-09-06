Package.describe({
    summary: "System package for Sky Engine."
});

Package.on_use(function (api, where) {
    api.add_files('3rds/animate.css', 'client');
    api.add_files('3rds/slimscroll.js', 'client');

    api.add_files(['lib/sky.coffee', 'lib/template.coffee'], ['client', 'server']);

    api.use(['coffeescript', 'handlebars', 'deps'], ['client', 'server']);
    api.export('Sky', ['client', 'server']);
});