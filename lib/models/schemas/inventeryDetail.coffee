Schema.inventoryDetails = new Meteor.Collection 'inventoryDetails'
Schema.registerDictionary Schema.inventoryDetails, 'inventoryDetails'

Schema2.inventoryDetails = new SimpleSchema
  version: { type: Schema.Version }

Schema.inventoryDetails.attachSchema(Schema2.inventoryDetails)