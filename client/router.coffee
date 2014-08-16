Router.configure
  layoutTemplate: 'layout'

Router.map ->
  @route 'home', { path: '/' }
  @route 'warehouse', { path: '/warehouse' }
  @route 'sales', { path: '/sales' }
  @route 'report', { path: '/report' }

