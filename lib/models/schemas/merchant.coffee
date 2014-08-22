Schema.Merchant = new Meteor.Collection 'merchants'
Schema.registerDictionary Schema.Merchant, 'merchants'

Schema2.Merchant = new SimpleSchema
  parent:
    type: String
    optional: true

  creator:
    type: String
    optional: true

  owner:
    type: String
    optional: true

  name:
    type: String

  location:
    type: [String]
    optional: true

  area:
    type: [String]
    optional: true

  version: { type: Schema.Version }

Schema.Merchant.attachSchema(Schema2.Merchant)