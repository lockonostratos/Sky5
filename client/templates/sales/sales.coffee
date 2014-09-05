#  orderCollection: Schema.orders.find({})
#  orderDetailCollection: Schema.orderDetails.find({})
#  currentOrderDetails: -> Session.get 'currentOrderDetails'

Sky.template.extends Template.sales,
  orderDetails: -> Session.get('currentOrderDetails')

  tabOptions:
    source: 'orderHistory'
    currentSource: 'currentOrder'
    caption: 'orderCode'
    key: '_id'
    createAction: -> orderCreator('dsa', 'asd')
    destroyAction: (instance) -> Schema.orders.remove(instance._id)
    navigateAction: (instance) ->
#      console.log "You had navigated to ", instance
  ui:
    productSelection: ".product-select2"

  rendered: ->
    jProductSelection = $(@ui.productSelection)

    @autoSelectProduct = Deps.autorun ->
      jProductSelection.select2("val", Session.get('currentOrder').currentProduct) if Session.get('currentOrder')

    $(document).bind 'keyup', 'return', -> jProductSelection.select2("open")
    jProductSelection.select2
      placeholder: "CHỌN SẢN PHẨM"
      query: (query) -> query.callback
        results: _.filter Session.get('availableProducts'), (item) ->
          unsignedTerm = Sky.helpers.removeVnSigns query.term
          unsignedName = Sky.helpers.removeVnSigns item.name

          unsignedName.indexOf(unsignedTerm) > -1 || item.productCode.indexOf(unsignedTerm) > -1
        text: 'name'
      initSelection: (element, callback) -> callback(Schema.products.findOne(Session.get('currentOrder')?.currentProduct));

      id: '_id'
      formatSelection: formatProductSearch
      formatResult: formatProductSearch
    .on "change", (e) ->
      Schema.orders.update(Session.get('currentOrder')._id, {$set: {currentProduct: e.added._id}})
      Session.set('currentOrder', Schema.orders.findOne(Session.get('currentOrder')._id))
    jProductSelection.select2("val", Session.get('currentOrder').currentProduct) if Session.get('currentOrder')

  destroyed: -> @autoSelectProduct.stop()





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

formatProductSearch = (item) -> "#{item.name} [#{item.skulls}]"