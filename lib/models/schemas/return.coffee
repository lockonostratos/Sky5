Schema2.returns = new SimpleSchema
  merchant:
    type: String

  warehouse:
    type: String

  order:
    type: String

  creator:
    type: String

  submitReturn:
    type: String

  name:
    type: String

  productSale:
    type: Number

  productQuality:
    type: Number

  totalPrice:
    type: Number

  comment:
    type: String

  status:
    type: Number

  version: { type: Schema.Version }

Schema.add 'returns'
