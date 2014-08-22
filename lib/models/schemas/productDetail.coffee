Schema.ProductDetail = new Meteor.Collection 'productDetails'
Schema.registerDictionary Schema.ProductDetail, 'productDetails'

Schema2.ProductDetail = new SimpleSchema
  import:
    type: String

  merchant:
    type: String

  warehouse:
    type: String

  provider:
    type: String
    optional: true

  product:
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

  systemTransaction:
    type: String
    optional: true

  version: { type: Schema.Version }

Schema.ProductDetail.attachSchema Schema2.ProductDetail