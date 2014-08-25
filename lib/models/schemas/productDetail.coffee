Schema2.productDetails = new SimpleSchema
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

Schema.add 'productDetails'