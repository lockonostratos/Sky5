Schema.Skull = new Meteor.Collection 'skulls'

Schema2.Skull = new SimpleSchema
  merchant:
    type: String

  creator:
    type: String

  name:
    type: String

  version: { type: Schema.Version }

Schema.Skull.attachSchema(Schema2.Skull)