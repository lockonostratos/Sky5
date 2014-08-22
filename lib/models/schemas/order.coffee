Schema.Order = new Meteor.Collection 'orders'
Schema.registerDictionary Schema.Order, 'orders'

Schema2.Order = new SimpleSchema
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

  return:
    type: Boolean

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

  status:
    type: Number

  version: { type: Schema.Version }

Schema.Order.attachSchema(Schema2.Order)