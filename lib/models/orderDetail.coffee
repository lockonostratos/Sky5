root = global ? window
root.OrderDetails      = new Meteor.Collection 'order_details'

Schemas = {}
Schemas.OrderDetail = new SimpleSchema(
  orderId:
    type: String
  productId:
    type: String
  quality:
    type: Number
  returnQuality:
    type: String
  price:
    type: Number
  discountCash:
    type: Number
  discountPercent:
    type: Number
  finalPrice:
    type: Number
  status:
    type: Number
  createdAt:
    type: Date
  updatedAt:
    type: Date
)
root.OrderDetails.attachSchema(Schemas.OrderDetail)