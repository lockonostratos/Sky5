Schema.Provider = new Meteor.Collection 'providers'

Schema2.Provider = new SimpleSchema(
  parentMerchant:
    type: String

  name:
    type: String

  location: { type: Schema.Location, optional: true }
  version: { type: Schema.Version }
)

Schema.Provider.attachSchema(Schema2.Provider)
