Schema2.saleDetails = new SimpleSchema
  sale:
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


  version: { type: Schema.Version }

Schema.add 'saleDetails'