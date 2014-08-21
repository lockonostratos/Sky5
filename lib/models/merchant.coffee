root = global ? window
root.Merchants = new Meteor.Collection 'merchants'

Schemas = {}


Schemas.Merchant = new SimpleSchema(
    parent:
      type: String
      optional: true
    owner:
      type: String
      optional: true
    name:
      type: String
    createdAt:
      type: Date
      optional: true
    updatedAt:
      type: Date
      optional: true
)
root.Merchants.attachSchema(Schemas.Merchant)