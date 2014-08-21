root = global ? window
root.Warehouses        = new Meteor.Collection 'warehouses'

Schemas = {}
Schemas.Warehouse = new SimpleSchema(
  merchantId:
    type: String
  name:
    type: String
  location:
    type: String
  createdAt:
    type: Date
  updatedAt:
    type: Date
)
root.Warehouses.attachSchema(Schemas.Warehouse)
