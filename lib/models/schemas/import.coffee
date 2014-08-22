Schema.Import = new Meteor.Collection 'imports'
Schema.registerDictionary Schema.Import, 'imports'

Schema2.Import = new SimpleSchema
  creator:
    type: String

  merchant:
    type: String

  warehouse:
    type: String

  description:
    type: String

  systemTransaction:
    type: String
    optional: true

  version: { type: Schema.Version }

Schema.Import.attachSchema(Schema2.Import)