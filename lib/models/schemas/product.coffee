Schema.products = new Meteor.Collection 'products'
Schema.registerDictionary Schema.products, 'products'

Schema2.products = new SimpleSchema
  creator:
    type: String

  merchant:
    type: String

  warehouse:
    type: String

  name:
    type: String

  image:
    type: String
    optional: true

  groups:
    type: [String]
    optional: true

  productCode:
    type: String

  skulls:
    type: [String]

  childProduct:
    type: Schema.ChildProduct
    optional: true

  quality:
    type: Number

  price:
    type: Number

  version: { type: Schema.Version }

Schema.products.attachSchema(Schema2.products)