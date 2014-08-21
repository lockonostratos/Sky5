root = global ? window
root.ReturnDetails = new Meteor.Collection 'return_details'

Schemas = {}
Schemas.ReturnDetail  = new SimpleSchema(
  orderId:
    type: String
  returnId:
    type: String
  productId:
    type: String
  quality:
    type: String
  price:
    type: Number
  discountCash:
    type: Number
  finalPrice:
    type: Number
  submited:
    type: Boolean
  createdAt:
    type: Date
  updatedAt:
    type: Date
)
root.ReturnDetails.attachSchema(Schemas.ReturnDetail)