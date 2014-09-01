Schema2.orderDetails = new SimpleSchema
  order:
    type: String
    optional: true

  product:
    type: String
    optional: true

  quality:
    type: Number
    optional: true

  price:
    type: Number
    optional: true

  discountCash:
    type: Number
    optional: true

  discountPercent:
    type: Number
    decimal: true
    optional: true

  finalPrice:
    type: Number
    optional: true

  version: { type: Schema.Version }

Schema.add 'orderDetails'