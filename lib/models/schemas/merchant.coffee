Schema.merchants = new Meteor.Collection 'merchants'
Schema.registerDictionary Schema.merchants, 'merchants'

Schema2.merchants = new SimpleSchema
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

Schema.merchants.attachSchema(Schema2.merchants)