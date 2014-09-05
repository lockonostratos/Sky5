#  orderCollection: Schema.orders.find({})
#  orderDetailCollection: Schema.orderDetails.find({})
#  currentOrderDetails: -> Session.get 'currentOrderDetails'

_.extend Template.sales,
  tabOptions:
    source: 'orderHistory'
    currentSource: 'currentOrder'
    caption: 'orderCode'
    key: '_id'
    createAction: -> orderCreator('dsa', 'asd')
    destroyAction: (instance) -> Schema.orders.remove(instance._id)
    navigateAction: (instance) -> console.log "You had navigated to ", instance
  orderDetailCollection: {}
  rendered: ->

orderCreator = (merchantId, warehouseId)->
  newOrder =
    merchant      : merchantId
    warehouse     : warehouseId
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
  newId = Schema.orders.insert newOrder
  newOrder._id = newId
  newOrder
