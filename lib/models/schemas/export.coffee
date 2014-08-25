Schema.exports = new Meteor.Collection 'exports'
Schema.registerDictionary Schema.exports, 'exports'

Schema2.exports = new SimpleSchema
  version: { type: Schema.Version }

Schema.exports.attachSchema(Schema2.exports)