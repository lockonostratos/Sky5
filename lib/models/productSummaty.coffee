Schema.ProductSummary = new Meteor.Collection 'productSummaries'

Schema2.ProductSummary = new SimpleSchema
  warehouse:
    type: String

  productCode:
    type: String

  skull:
    type: String

  name:
    type: String

  quality:
    type: Number

  price:
    type: Number

  version: { type: Schema.Version }

Schema.ProductSummary.attachSchema(Schema2.ProductSummary)