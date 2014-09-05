tabSource = [{alias: "tab 1", class: "active"}, {alias: "tab 2"}, {alias: "tab 3"}]

_.extend Template.sales,
  tabOptions:
    source: 'orderHistory'
    caption: 'orderCode'
    key: '_id'
    currentTab: 'currentOrderTab'
    instanceCreator: -> orderCreator()
    instanceDestroyer: (instance) -> Schema.orders.remove instance._id; instance

  orderDetailCollection: {}
  rendered: ->

#    orderCollection: Schema.orders.find({})
#  orderDetailCollection: Schema.orderDetails.find({})
#  currentOrderDetails: -> Session.get 'currentOrderDetails'

orderCreator = ->
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
