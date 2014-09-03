Schema.add 'orders', class Order
  addOrderDetail: (option) ->
    option.order = @id
    Schema.orderDetails.insert option, (error, result) -> console.log result; console.log error if error

  addDelivery: (option) ->
    option.merchant = @data.merchant
    option.warehouse = @data.warehouses
    option.creator = @data.creator
    Schema.deliveries.insert option, (error, result) -> console.log result; console.log error if error
