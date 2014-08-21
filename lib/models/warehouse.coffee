Schema.Warehouse = new Meteor.Collection 'warehouses'

Schema2.Warehouse = new SimpleSchema
  merchant:
    type: String

  name:
    type: String

  location:
    type: [String]
    optional: true

  area:
    type: String

  version: { type: Schema.Version }

Schema.Warehouse.attachSchema(Schema2.Warehouse)
