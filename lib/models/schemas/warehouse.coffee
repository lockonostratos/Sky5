Schema.warehouses = new Meteor.Collection 'warehouses'
Schema.registerDictionary Schema.warehouses, 'warehouses'

Schema2.warehouses = new SimpleSchema
  merchant:
    type: String

  creator:
    type: String

  name:
    type: String

  location: { type: Schema.Location, optional: true }
  version: { type: Schema.Version }

Schema.warehouses.attachSchema(Schema2.warehouses)
