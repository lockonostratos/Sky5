Schema2.sales = new SimpleSchema
  merchant:
    type: String

  warehouse:
    type: String

  creator:
    type: String

  seller:
    type: String

  buyer:
    type: String

  orderCode:
    type: String

  productCount:
    type: String

  saleCount:
    type: String

  return:
    type: Boolean
    optional: true

  deliveryType:
    type: Number

  paymentMethod:
    type: Number

  billDiscount:
    type: Boolean

  discountCash:
    type: Number

  totalPrice:
    type: Number

  finalPrice:
    type: Number

  deposit:
    type: Number

  debit:
    type: Number

  version: { type: Schema.Version }

Schema.add 'sales'