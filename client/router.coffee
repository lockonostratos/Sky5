Router.configure
  layoutTemplate: 'layout'

Router.map ->
  @route 'metroHome', { path: '/', onBeforeAction: -> AccountsEntry.signInRequired(this) }
  @route 'home', { path: '/home', onBeforeAction: -> AccountsEntry.signInRequired(this) }
  @route 'warehouse', { path: '/warehouse' }
  @route 'import', { path: '/import' }
  @route 'sales', { path: '/sales' }
  @route 'report', { path: '/report' }
  @route 'roleManager', { path: '/roleManager' }
