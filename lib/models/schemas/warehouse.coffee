Schema.Warehouse = new Meteor.Collection 'warehouses'

Schema2.Warehouse = new SimpleSchema
  merchant:
    type: String

  creator:
    type: String

  name:
    type: String

  location: { type: Schema.Location, optional: true }
  version: { type: Schema.Version }

Schema.Warehouse.attachSchema(Schema2.Warehouse)
