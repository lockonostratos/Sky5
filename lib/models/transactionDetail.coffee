Schema.TransactionDetail = new Meteor.Collection 'transactionDetails'

Schema2.TransactionDetail = new SimpleSchema
  merchant:
    type: String

  warehouse:
    type: String

  transaction:
    type: String

  totalCash:
    type: Number

  debtCash:
    type: Number

  debtCash:
    type: Number

  decription:
    type: String
    optional: true

  version: {type: Schema.Version}

Schema.TransactionDetail.attachSchema(Schema2.TransactionDetail)






