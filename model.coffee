#############----Merchants----#####################
Merchants         = new Meteor.Collection 'merchants'
#Merchants.allow(
#  insert: ->
#  update: ->
#  remove: ->
#)

#############----Warehouses----#####################
Warehouses        = new Meteor.Collection 'warehouses'
Providers         = new Meteor.Collection 'providers'
Skulls            = new Meteor.Collection 'skulls'
Products          = new Meteor.Collection 'products'
ProductSummaries  = new Meteor.Collection 'product_summaries'
MetroSummaries    = new Meteor.Collection 'metro_summaries'
Orders            = new Meteor.Collection 'orders'
OrderDetails      = new Meteor.Collection 'order_details'
Deliveries        = new Meteor.Collection 'deliveries'
Returns           = new Meteor.Collection 'returns'
ReturnDetails     = new Meteor.Collection 'return_details'
Imports           = new Meteor.Collection 'imports'
ImportDetails     = new Meteor.Collection 'import_details'
Exports           = new Meteor.Collection 'exmports'
ExportDetails     = new Meteor.Collection 'export_details'
Inventeries       = new Meteor.Collection 'inventeries'
InventeryDetails  = new Meteor.Collection 'inventery_details'
Transactions      = new Meteor.Collection 'transactions'
TransactionDetails = new Meteor.Collection 'transaction_details'

