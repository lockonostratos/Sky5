Schema.ExportDetail = new Meteor.Collection 'exportDetails'

Schema2.ExportDetail = new SimpleSchema
  version: { type: Schema.Version }

Schema.ExportDetail.attachSchema(Schema2.ExportDetail)