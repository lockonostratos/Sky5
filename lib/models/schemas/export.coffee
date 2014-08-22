Schema.Export = new Meteor.Collection 'exports'
Schema.registerDictionary Schema.Export, 'exports'

Schema2.Export = new SimpleSchema
  version: { type: Schema.Version }

Schema.Export.attachSchema(Schema2.Export)