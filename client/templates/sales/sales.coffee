Sky.global.personalOrders = ->
  data = Schema.orders.find({creator: Meteor.userId()}).fetch()
  _.map data, (item) ->
    item.caption = item._id
    item.details = -> Schema.orderDetails.find({order: item._id})
    item

_.extend Template.sales,
  saleTabOptions: ->
    tabs: -> Sky.global.personalOrders()
    createInstance: (caption) ->
      newOrder =
        caption: caption
        class: 'active'
        dumpData: 'yeha'
        merchant: currentMerchant._id
        warehouse: currentWarehouse._id
        creator: Meteor.userId()
        saler: 'sang'
        buyer: 'Ky'
        orderCode: '123213'
        status: 1

      success = false;
      Schema.orders.insert newOrder, (error, result) -> console.log error; console.log result
#      Schema.orders.insert newOrder, (error, result) -> success = true if !error
#      return unless success



    currentTab: 'currentOrderTab'
  rendered: -> console.log 'sales rendered'


#    orderCollection: Schema.orders.find({})
#  orderDetailCollection: Schema.orderDetails.find({})
#  currentOrderDetails: -> Session.get 'currentOrderDetails'