Schema.ReturnDetail = new Meteor.Collection 'returnDetails'
Schema.registerDictionary Schema.ReturnDetail, 'returnDetails'

Schema2.ReturnDetail  = new SimpleSchema
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

Schema.ReturnDetail.attachSchema(Schema2.ReturnDetail)