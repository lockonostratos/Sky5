Schema.importDetails = new Meteor.Collection 'importDetails'
Schema.registerDictionary Schema.importDetails, 'importDetails'

Schema2.importDetails = new SimpleSchema
  version: { type: Schema.Version }

Schema.importDetails.attachSchema(Schema2.importDetails)