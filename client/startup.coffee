root = global ? window

Meteor.startup ->
  Deps.autorun ->
    Session.set "mostExpensiveProduct", Schema.products.findOne({}, {sort: {price: -1}})
    root.mostExpensiveProduct = Session.get "mostExpensiveProduct"

    Session.set "currentMerchant", Schema.merchants.findOne({})
    root.currentMerchant = Session.get "currentMerchant"

    if root.currentMerchant
      Session.set "currentWarehouse", Schema.warehouses.findOne({merchant: root.currentMerchant._id})
      root.currentWarehouse = Session.get "currentWarehouse"

#    if root.currentWarehouse
#      Session.set "currentImport", Schema.imports.findOne {merchant: root.currentMerchant._id, warehouse: root.currentWarehouse._id, finish: false}
#      root.currentImport = Session.get "currentImport"
#
#    Session.set 'showCreateImport', true