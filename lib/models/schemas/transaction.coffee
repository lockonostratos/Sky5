Schema.transactions = new Meteor.Collection 'transactions'
Schema.registerDictionary Schema.transactions, 'transactions'

Schema2.transactions = new SimpleSchema
  merchant:
    type: String

  warehouse:
    type: String

  parent:
    type: String

  creator:
    type: String

  owner:
    type: String

  group:
    type: String

  receivable:
    type: String

  dueDay:
    type: Date

  status:
    type: Number

  version: {type: Schema.Version}

Schema.transactions.attachSchema(Schema2.transactions)






