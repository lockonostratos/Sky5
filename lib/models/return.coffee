root = global ? window
root.Returns = new Meteor.Collection 'returns'

Schemas = {}
Schemas.Return = new SimpleSchema(
  merchantId:
    type: String
  warehouseId:
    type: String
  orderId:
    type: String
  creatorId:
    type: String
  submitReturn:
    type: String
  name:
    type: String
  productSale:
    type: Number
  productQuality:
    type: Number
  totalPrice:
    type: Number
  comment:
    type: String
  status:
    type: Number
  createdAt:
    type: Date
  updatedAt:
    type: Date
)
root.Returns.attachSchema(Schemas.Return)
