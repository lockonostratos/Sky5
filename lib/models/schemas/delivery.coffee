Schema.Delivery = new Meteor.Collection 'deliveries'

Schema2.Delivery = new SimpleSchema
  warehouse:
    type: String

  order:
    type: String

  creator:
    type: String

  deliveryAddress:
    type: String

  contactName:
    type: String
    optional: true

  contactPhone:
    type: String

  deliveryDate:
    type: Date

  comment:
    type: String
    optional: true

  transportationFee:
    type: Number
    optional: true

  shipper:
    type: String

  exporter:
    type: String
    optional: true

  importer:
    type: String
    optional: true

  cashier:
    type: String
    optional: true

  status:
    type: Number

  version: { type: Schema.Version }

Schema.Delivery.attachSchema(Schema2.Delivery)
