Package.describe({
  name: "natestrauser:x-editable-bootstrap",
  summary: "Latest version of X-Editable for Bootstrap with wysihtml5 rich text editor",
  version: "1.5.2",
  git: "https://github.com/nate-strauser/meteor-x-editable-bootstrap.git"
});

Package.on_use(function (api){
  // Package needs jQuery
  api.use('jquery');

  //x-editable
  api.add_files('lib/bootstrap-editable/css/bootstrap-editable.css', 'client');
  api.add_files('lib/bootstrap-editable/js/bootstrap-editable.js', 'client', {bare:true});
  api.add_files('lib/bootstrap-editable/img/clear.png', 'client');
  api.add_files('lib/bootstrap-editable/img/loading.gif', 'client');

  //address
  api.add_files('lib/address/address.css', 'client');
  api.add_files('lib/address/address.js', 'client', {bare:true});

  //wysihtml5
  api.add_files('lib/wysihtml5/wysihtml5.js', 'client', {bare:true});
  api.add_files('lib/wysihtml5/bootstrap-wysihtml5-0.0.2/wysiwyg-color.css', 'client');
  api.add_files('lib/wysihtml5/bootstrap-wysihtml5-0.0.2/wysihtml5-0.3.0.js', 'client', {bare:true});
  api.add_files('lib/wysihtml5/bootstrap-wysihtml5-0.0.2/bootstrap-wysihtml5-0.0.2.css', 'client');
  api.add_files('lib/wysihtml5/bootstrap-wysihtml5-0.0.2/bootstrap-wysihtml5-0.0.2.js', 'client', {bare:true});

  //override image paths
  api.add_files('path-override.css', 'client');
});
