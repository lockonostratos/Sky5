Schema.metroSummaries = new Meteor.Collection 'metroSummaries'
Schema.registerDictionary Schema.metroSummaries, 'metroSummaries'

Schema2.metroSummaries = new SimpleSchema()

Schema.metroSummaries.attachSchema(Schema2.metroSummaries)
