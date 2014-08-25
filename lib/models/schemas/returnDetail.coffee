Schema.returnDetails = new Meteor.Collection 'returnDetails'
Schema.registerDictionary Schema.returnDetails, 'returnDetails'

Schema2.returnDetails  = new SimpleSchema
  order:
    type: String

  return:
    type: String

  product:
    type: String

  quality:
    type: String

  price:
    type: Number

  discountCash:
    type: Number

  finalPrice:
    type: Number

  submited:
    type: Boolean

  createdAt:
    type: Date

  updatedAt:
    type: Date

Schema.returnDetails.attachSchema(Schema2.returnDetails)