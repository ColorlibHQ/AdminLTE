Package.describe({
  name: 'dangrossman:bootstrap-daterangepicker',
  version: '3.0.5',
  summary: 'Date range picker component',
  git: 'https://github.com/dangrossman/daterangepicker',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('METEOR@0.9.0.1');

  api.use('momentjs:moment@2.22.1', ["client"]);
  api.use('jquery@3.3.1', ["client"]);

  api.addFiles('daterangepicker.js', ["client"]);
  api.addFiles('daterangepicker.css', ["client"]);
});
