Schema.Product = new Meteor.Collection 'products'
Schema.registerDictionary Schema.Product, 'products'

Schema2.Product = new SimpleSchema
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

Schema.Product.attachSchema(Schema2.Product)