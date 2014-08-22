Schema.Provider = new Meteor.Collection 'providers'
Schema.registerDictionary Schema.Provider, 'providers'

Schema2.Provider = new SimpleSchema(
  merchant:
    type: String

  creator:
    type: String

  name:
    type: String

  location: { type: Schema.Location, optional: true }
  version: { type: Schema.Version }
)

Schema.Provider.attachSchema(Schema2.Provider)
