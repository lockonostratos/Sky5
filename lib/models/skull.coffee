root = global ? window
root.Skulls            = new Meteor.Collection 'skulls'

Schemas = {}
Schemas.SkullName = new SimpleSchema(
  name:
    type: String
  value:
    type: Number
)

Schemas.Skull = new SimpleSchema(
  merchantId:
    type: String
#  unit:
#    type: String
#  unit_quality:
#    type: String
  skulls:
    type: [String]
    optional: true
  createdAt:
    type: Date
  updatedAt:
    type: Date
)
root.Skulls.attachSchema(Schemas.Skull)