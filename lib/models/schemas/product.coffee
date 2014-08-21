Schema.Product = new Meteor.Collection 'products'

Schema2.Product = new SimpleSchema
  import:
    type: String

  merchant:
    type: String

  warehouse:
    type: String

  provider:
    type: String

  skull:
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
    optional: true

  version: { type: Schema.Version }

Schema.Product.attachSchema Schema2.Product