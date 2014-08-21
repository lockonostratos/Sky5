Schema.ImportDetail = new Meteor.Collection 'importDetails'

Schema2.Importdetail = new SimpleSchema
  version: { type: Schema.Version }

Schema.ImportDetail.attachSchema(Schema2.ImportDetail)