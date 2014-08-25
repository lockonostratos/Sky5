Schema.skulls = new Meteor.Collection 'skulls'
Schema.registerDictionary Schema.skulls, 'skulls'

Schema2.skulls = new SimpleSchema
  merchant:
    type: String

  creator:
    type: String

  name:
    type: String

  version: { type: Schema.Version }

Schema.skulls.attachSchema(Schema2.skulls)