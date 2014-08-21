root = global ? window
root.Orders = new Meteor.Collection 'orders'

Schemas = {}
Schemas.Order = new SimpleSchema(
    merchantId:
      type: String
    warehouseId:
      type: String
    creatorId:
      type: String
    sellerId:
      type: String
    buyerId:
      type: String
    orderCode:
      type: String
    return:
      type: Boolean
    delivery:
      type: Number
    paymentMethod:
      type: Number
    billDiscount:
      type: Boolean
    discountPercent:
      type: Number
    discountCast:
      type: Number
    totalPrice:
      type: Number
    finalPrice:
      type: Number
    deposit:
      type: Number
    debit:
      type: Number
    status:
      type: Number
    createdAt:
      type: Date
    updatedAt:
      type: Date
  )
root.Orders.attachSchema(Schemas.Order)