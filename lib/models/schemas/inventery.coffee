Schema.Inventory = new Meteor.Collection 'inventories'
Schema.registerDictionary Schema.Inventory, 'inventories'

Schema2.Inventory = new SimpleSchema
  version: { type: Schema.Version }

Schema.Inventory.attachSchema(Schema2.Inventory)