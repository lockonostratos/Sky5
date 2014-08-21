Schema.Skull = new Meteor.Collection 'skulls'

Schema2.Skull = new SimpleSchema
  merchant:
    type: String

  name:
    type: String

  skulls:
    type: [String]
    optional: true

  version: { type: Schema.Version }

Schema.Skull.attachSchema(Schema2.Skull)