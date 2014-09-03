Sky.global.personalOrders = -> Schema.orders.find({creator: Meteor.userId()})

_.extend Template.sales,
  saleTabOptions: ->
    tabs: [{caption: "tab 1", class: "active"}, {caption: "tab 2"}, {caption: "tab 3"}]

  rendered: -> console.log 'sales rendered'


#    orderCollection: Schema.orders.find({})
#  orderDetailCollection: Schema.orderDetails.find({})
#  currentOrderDetails: -> Session.get 'currentOrderDetails'