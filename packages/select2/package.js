Package.describe({
    summary: "Select2 is a jQuery based replacement for select boxes."
});

Package.on_use(function (api) {
    api.use("jquery", "client");

    api.add_files([
        "lib/select2/select2.js"
    ], "client", {bare: true});

    api.add_files([
        "lib/select2/select2.css",
        "lib/select2/select2.png",
        "lib/select2/select2x2.png",
        "lib/select2/select2-spinner.gif",
        "path-override.css"
    ], "client");
});
