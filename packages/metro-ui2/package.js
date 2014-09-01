Package.describe({
  "summary": "Metro UI CSS 2.x packaged for MeteorJS",
  "version": "2.0.32",
  "git": "https://github.com/chrismbeckett/meteor-metro-ui2.git"
});

Package.on_use(function (api) {
  api.use("jquery","client");

  api.add_files("lib/fonts/iconFont.dev.svg", "client");
  api.add_files("lib/fonts/iconFont.eot", "client");
  api.add_files("lib/fonts/iconFont.svg", "client");
  api.add_files("lib/fonts/iconFont.ttf", "client");
  api.add_files("lib/fonts/iconFont.woff", "client");
  api.add_files("lib/fonts/metroSysIcons.svg", "client");
  api.add_files("lib/fonts/metroSysIcons.ttf", "client");
  api.add_files("lib/fonts/metroSysIcons.woff", "client");
//  api.add_files("lib/fonts/OpenSans-Bold.woff", "client");
//  api.add_files("lib/fonts/OpenSans-Light.woff", "client");
//  api.add_files("lib/fonts/OpenSans.woff", "client");
  api.add_files("lib/fonts/PTSerif-Caption.woff", "client");

  api.add_files("lib/images/meter-210.png", "client");

//  api.add_files("lib/css/iconFont.min.css", "client");
//  api.add_files("lib/css/metro-bootstrap.min.css", "client");
//  api.add_files("lib/css/metro-bootstrap-responsive.min.css", "client");
//  api.add_files("metroui-overrides.css", "client");

  api.add_files("lib/js/jquery.widget.min.js", "client");
  api.add_files("lib/js/metro.min.js", "client");

});