root = global ? window
root.Providers         = new Meteor.Collection 'providers'

Schemas = {}
Schemas.Provider = new SimpleSchema(
  merchantId:
    type: String
  name:
    type: String
  createdAt:
    type: Date
  updatedAt:
    type: Date
)
root.Providers.attachSchema(Schemas.Provider)


