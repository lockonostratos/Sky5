Schema.imports = new Meteor.Collection 'imports'
Schema.registerDictionary Schema.imports, 'imports'

Schema2.imports = new SimpleSchema
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

Schema.imports.attachSchema(Schema2.imports)