tabSource = [{alias: "tab 1", class: "active"}, {alias: "tab 2"}, {alias: "tab 3"}]

Deps.autorun ->
#  if options.currentTab then currentTab = Schema.orderDetails.find({order: options.currentTab._id})

options =
  source: -> Sky.global.personalOrders
  caption: 'orderCode'
  key: '_id'
  instanceCreator: ->
    newOrder =
      merchant      : currentMerchant._id
      warehouse     : currentWarehouse._id
      creator       : Meteor.userId()
      seller        : 'asdsad'
      buyer         : 'asdsad'
      orderCode     : 'asdsad'
      deliveryType  : 0
      paymentMethod : 0
      discountCash  : 0
      productCount  : 0
      saleCount     : 0
      totalPrice    : 0
      finalPrice    : 0
      deposit       : 0
      debit         : 0
      billDiscount  : false
      status        : 1
    Schema.orders.insert newOrder
    newOrder
  instanceDestroyer: (instance) ->


_.extend Template.sales,
  tabOptions: options
  orderDetailCollection: currentTab
  rendered: ->

  events:
    "click": -> console.log options.currentTab

#    orderCollection: Schema.orders.find({})
#  orderDetailCollection: Schema.orderDetails.find({})
#  currentOrderDetails: -> Session.get 'currentOrderDetails'