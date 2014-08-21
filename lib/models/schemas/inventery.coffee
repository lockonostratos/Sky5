Schema.Inventory = new Meteor.Collection 'inventories'

Schema2.Inventory = new SimpleSchema
  version: { type: Schema.Version }

Schema.Inventory.attachSchema(Schema2.Inventory)