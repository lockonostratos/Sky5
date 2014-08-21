root = global ? window
root.Products          = new Meteor.Collection 'products'

Schemas = {}
Schemas.Product = new SimpleSchema(
  importId:
    type: String
  merchantId:
    type: String
  warehouseId:
    type: String
  providerId:
    type: String
  productCode:
    type: String
  skullId:
    type: String
  name:
    type: String
  importQuality:
    type: Number
  availableQuality:
    type: Number
  instockQuality:
    type: Number
  importPrice:
    type: Number
  expire:
    type: Date
  createdAt:
    type: Date
  updatedAt:
    type: Date
)
root.Products.attachSchema(Schemas.Product)