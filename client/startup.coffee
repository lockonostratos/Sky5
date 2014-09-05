root = global ? window
root.food = "apple"
root.foodDep = new Deps.Dependency
root.getFood = -> root.foodDep.depend(); root.food
root.setFood = (val) ->
  foodDep.changed() if val isnt root.food
  root.food = val

Meteor.startup ->
  Deps.autorun ->
    Session.set "mostExpensiveProduct", Schema.products.findOne({}, {sort: {price: -1}})
    root.mostExpensiveProduct = Session.get "mostExpensiveProduct"

    Session.set "currentMerchant", Schema.merchants.findOne({})
    root.currentMerchant = Session.get "currentMerchant"

#    Session.set "personalNewProducts",
    Sky.global.personalNewProducts = Schema.products.find({creator: Meteor.userId(), totalQuality: 0},sort: {version:{createdAt: -1}})

    if root.currentMerchant
      Session.set "currentWarehouse", Schema.warehouses.findOne({merchant: root.currentMerchant._id})
      root.currentWarehouse = Session.get "currentWarehouse"

    Sky.global.sellers = Meteor.users.find({}).fetch()
    Sky.global.personalOrders = Schema.orders.find({})

  Deps.autorun ->
    console.log "Your food is #{root.getFood()}"