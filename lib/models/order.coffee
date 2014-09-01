Schema.add 'orders', class Order
  addOrderDetail: (option) ->
    option.order = @id
    Schema.orderDetails.insert option, (error, result) -> console.log result; console.log error if error

  addDelivery: (option) ->
    option.merchant = @data.merchant
    option.warehouse = @data.warehouses
    option.creator = @data.creator
    Schema.deliveries.insert option, (error, result) -> console.log result; console.log error if error

#  orderFinish: (listOrderDetails)->
#    if sellingCheckQualityBeforeSale(listOrderDetails)
#      for orderDetail in listOrderDetails
#        productDetails = Schema.productDetails.find({merchant: @data.merchant, warehouse: @data.warehouse, product: orderDetail.product})
#        subtractQualityOnSales productDetails, orderDetail

checkOrderDetail= -> if Schema.orderDetails.find({order: @id}).fetch().length() > 0 then return true else return false
sellingCheckQualityBeforeSale= (item)-> return true
updateMetroSummary= ->
  Schema.metroSummaries.update {warehouse: @data.warehouse},
    $inc:
      stockCount: -@data.saleCount
      saleCount: @data.saleCount
      saleCountDay: @data.saleCount
      saleCountMonth: @data.saleCount
      revenue: @data.finalPrice
      revenueDay: @data.finalPrice
      revenueMonth: @data.finalPrice
  , (error, result) -> console.log result; console.log error if error

