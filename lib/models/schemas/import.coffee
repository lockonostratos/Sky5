Schema.Import = new Meteor.Collection 'imports'

Schema2.Import = new SimpleSchema
  version: { type: Schema.Version }

Schema.Import.attachSchema(Schema2.Import)