Package.describe({
    summary: "Metro UI CSS a set of styles to create a site with an interface similar to Windows 8."
});

Package.on_use(function (api) {
    api.use("jquery", "client");

    api.add_files([
        "lib/metro-ui/metro.min.js"
    ], "client", {bare: true});

    api.add_files([
        "lib/metro-ui/iconFont.min.css",
        "lib/metro-ui/metro-bootstrap.min.css",
        "lib/metro-ui/metro-bootstrap-responsive.min.css",
        "lib/fonts/metroSysIcons.svg",
        "lib/fonts/metroSysIcons.woff",
        "lib/fonts/metroSysIcons.ttf"
    ], "client");
});
