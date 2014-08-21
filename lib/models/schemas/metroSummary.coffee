Schema.MetroSummary = new Meteor.Collection 'metroSummaries'

Schema2.MetroSummary = new SimpleSchema()

Schema.MetroSummary.attachSchema(Schema2.MetroSummary)
