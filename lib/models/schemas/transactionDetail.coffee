Schema.transactionDetails = new Meteor.Collection 'transactionDetails'
Schema.registerDictionary Schema.transactionDetails, 'transactionDetails'

Schema2.transactionDetails = new SimpleSchema
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

  description:
    type: String
    optional: true

  version: {type: Schema.Version}

Schema.transactionDetails.attachSchema(Schema2.transactionDetails)






