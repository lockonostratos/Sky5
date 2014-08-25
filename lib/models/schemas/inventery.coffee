Schema.inventories = new Meteor.Collection 'inventories'
Schema.registerDictionary Schema.inventories, 'inventories'

Schema2.inventories = new SimpleSchema
  version: { type: Schema.Version }

Schema.inventories.attachSchema(Schema2.inventories)