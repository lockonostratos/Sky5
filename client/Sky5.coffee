root = global ? window
root.Merchants        = new Meteor.Collection 'merchants'
root.Warehouses       = new Meteor.Collection 'warehouses'
root.Skulls           = new Meteor.Collection 'skulls'
root.Providers        = new Meteor.Collection 'providers'
root.ProductSummaries = new Meteor.Collection 'product_summaries'
root.MetroSummaries   = new Meteor.Collection 'metro_summaries'
root.Orders           = new Meteor.Collection 'orders'
root.Deliveries       = new Meteor.Collection 'deliveries'
root.Returns          = new Meteor.Collection 'returns'
root.ReturnDetails    = new Meteor.Collection 'return_details'
root.Imports          = new Meteor.Collection 'imports'
root.ImportDetales    = new Meteor.Collection 'import_details'
root.Exports          = new Meteor.Collection 'exmports'
root.ExportDetales    = new Meteor.Collection 'export_details'
root.Inventeries      = new Meteor.Collection 'inventeries'
root.InventeryDetails = new Meteor.Collection 'inventery_details'
root.Transactions     = new Meteor.Collection 'transactions'
root.TransactionDetails = new Meteor.Collection 'transaction_details'


root.OrderDetails     = new Meteor.Collection 'order_details'
root.Products         = new Meteor.Collection 'products'
root.Lists = new Meteor.Collection "lists"
root.Todos = new Meteor.Collection "todos"

root.Books = new Meteor.Collection "books"



if root.Meteor.isClient
  Schemas = {}

  Schemas.Merchant = new SimpleSchema(
    headquater:
      type: String
    ownerId:
      type: String
    name:
      type: String
    createdAt:
      type: Date
    updatedAt:
      type: Date
  )
  Schemas.Warehouse = new SimpleSchema(
    merchantId:
      type: String
    name:
      type: String
    location:
      type: String
    createdAt:
      type: Date
    updatedAt:
      type: Date
  )
  Schemas.Provider = new SimpleSchema(
    merchantId:
      type: String
    name:
      type: String
    createdAt:
      type: Date
    updatedAt:
      type: Date
  )
  Schemas.Skull = new SimpleSchema(
    merchantId:
      type: String
    unit:
      type: String
    unit_quality:
      type: String
    skull_01:
      type: String
    createdAt:
      type: Date
    updatedAt:
      type: Date
  )
  Schemas.Product = new SimpleSchema(
    importId:
      type: String
    merchantId:
      type: String
    warehouseId:
      type: String
    providerId:
      type: String
    productCode:
      type: String
    skullId:
      type: String
    name:
      type: String
    importQuality:
      type: Number
    availableQuality:
      type: Number
    instockQuality:
      type: Number
    importPrice:
      type: Number
    expire:
      type: Date
    createdAt:
      type: Date
    updatedAt:
      type: Date
  )
  Schemas.ProductSummary = new SimpleSchema(
    warehouseId:
      type: String
    productCode:
      type: String
    skullId:
      type: String
    name:
      type: String
    quality:
      type: Number
    price:
      type: Number
    createdAt:
      type: Date
    updatedAt:
      type: Date
  )
  Schemas.Order = new SimpleSchema(
    merchantId:
      type: String
    warehouseId:
      type: String
    creatorId:
      type: String
    sellerId:
      type: String
    buyerId:
      type: String
    orderCode:
      type: String
    return:
      type: Boolean
    delivery:
      type: Number
    paymentMethod:
      type: Number
    billDiscount:
      type: Boolean
    discountPercent:
      type: Number
    discountCast:
      type: Number
    totalPrice:
      type: Number
    finalPrice:
      type: Number
    deposit:
      type: Number
    debit:
      type: Number
    status:
      type: Number
    createdAt:
      type: Date
    updatedAt:
      type: Date
  )
  Schemas.Orders = new SimpleSchema(

  )
  Schemas.Deliveries = new SimpleSchema(

  )
  Schemas.Returns = new SimpleSchema(

  )
  Schemas.ReturnDetails  = new SimpleSchema(

  )
  Schemas.Imports = new SimpleSchema(

  )
  Schemas.ImportDetales  = new SimpleSchema(

  )
  Schemas.Exports  = new SimpleSchema(

  )
  Schemas.ExportDetales  = new SimpleSchema(

  )
  Schemas.Inventeries = new SimpleSchema(

  )
  Schemas.InventeryDetails  = new SimpleSchema(

  )
  Schemas.Transactions = new SimpleSchema(

  )
  Schemas.TransactionDetails = new SimpleSchema(

  )


  Books.attachSchema(Schemas.Book)

  return


if root.Meteor.isServer
  Meteor.startup ->


