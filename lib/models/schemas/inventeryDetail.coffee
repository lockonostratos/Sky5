Schema.InventoryDetail = new Meteor.Collection 'inventoryDetails'
Schema.registerDictionary Schema.InventoryDetail, 'inventoryDetails'

Schema2.InventoryDetail = new SimpleSchema
  version: { type: Schema.Version }

Schema.InventoryDetail.attachSchema(Schema2.InventoryDetail)