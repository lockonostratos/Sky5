Schema.exportDetails = new Meteor.Collection 'exportDetails'
Schema.registerDictionary Schema.exportDetails, 'exportDetails'

Schema2.exportDetails = new SimpleSchema
  version: { type: Schema.Version }

Schema.exportDetails.attachSchema(Schema2.exportDetails)