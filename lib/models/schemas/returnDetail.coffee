Schema2.returnDetails  = new SimpleSchema
  sale:
    type: String

  returns:
    type: String

  productDetail:
    type: String

  returnQuality:
    type: String

  price:
    type: Number

  discountCash:
    type: Number

  finalPrice:
    type: Number

  submit:
    type: Boolean
    optional: true


  version: { type: Schema.Version }

Schema.add 'returnDetails'