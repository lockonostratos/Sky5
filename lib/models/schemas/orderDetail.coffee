Schema2.orderDetails = new SimpleSchema
  order:
    type: String

  product:
    type: String

  quality:
    type: Number

  returnQuality:
    type: String

  price:
    type: Number

  discountCash:
    type: Number

  discountPercent:
    type: Number

  finalPrice:
    type: Number

  status:
    type: Number

  version: { type: Schema.Version }

Schema.add 'orderDetails'