Router.configure
  layoutTemplate: 'layout'

Router.map ->
  @route 'metroHome', { path: '/', onBeforeAction: -> AccountsEntry.signInRequired(this) }
  @route 'home', { path: '/home', onBeforeAction: -> AccountsEntry.signInRequired(this) }
  @route 'warehouse', { path: '/warehouse' }
  @route 'sales', { path: '/sales' }
  @route 'import', { path: '/import' }
  @route 'delivery', { path: '/delivery' }
  @route 'returns', { path: '/returns' }
  @route 'report', { path: '/report' }
  @route 'roleManager', { path: '/roleManager' }
