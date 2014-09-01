Package.describe({
    summary: "Meteor-Hotkeys lets you watch for keyboard events anywhere in your code supporting almost any key combination."
});

Package.on_use(function (api) {
    api.use("jquery", "client");

    api.add_files([
        "lib/jquery.hotkeys.js"
    ], "client", {bare: true});
});
