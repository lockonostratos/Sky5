root = global ? window
root.ProductSummaries  = new Meteor.Collection 'product_summaries'

Schemas = {}
Schemas.ProductSummary = new SimpleSchema(
  warehouseId:
    type: String
  productCode:
    type: String
  skullId:
    type: String
  name:
    type: String
  quality:
    type: Number
  price:
    type: Number
  createdAt:
    type: Date
  updatedAt:
    type: Date
)
root.ProductSummaries.attachSchema(Schemas.ProductSummary)

