Schema.Provider = new Meteor.Collection 'providers'

Schema2.Provider = new SimpleSchema(
  merchant:
    type: String

  name:
    type: String

  version: { type: Schema.Version }
)

Schema.Provider.attachSchema(Schema2.Provider)
