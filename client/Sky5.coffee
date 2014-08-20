root = global ? window
root.Merchants          = new Meteor.Collection 'merchants'
root.Warehouses         = new Meteor.Collection 'warehouses'
root.Skulls             = new Meteor.Collection 'skulls'
root.Providers          = new Meteor.Collection 'providers'
root.Products           = new Meteor.Collection 'products'
root.ProductSummaries   = new Meteor.Collection 'product_summaries'
root.MetroSummaries     = new Meteor.Collection 'metro_summaries'
root.Orders             = new Meteor.Collection 'orders'
root.OrderDetails       = new Meteor.Collection 'order_details'
root.Deliveries         = new Meteor.Collection 'deliveries'
root.Returns            = new Meteor.Collection 'returns'
root.ReturnDetails      = new Meteor.Collection 'return_details'
root.Imports            = new Meteor.Collection 'imports'
root.ImportDetails      = new Meteor.Collection 'import_details'
root.Exports            = new Meteor.Collection 'exmports'
root.ExportDetails      = new Meteor.Collection 'export_details'
root.Inventeries        = new Meteor.Collection 'inventeries'
root.InventeryDetails   = new Meteor.Collection 'inventery_details'
root.Transactions       = new Meteor.Collection 'transactions'
root.TransactionDetails = new Meteor.Collection 'transaction_details'

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
  Schemas.OrderDetail = new SimpleSchema(
    orderId:
      type: String
    productId:
      type: String
    quality:
      type: Number
    returnQuality:
      type: String
    price:
      type: Number
    discountCash:
      type: Number
    discountPercent:
      type: Number
    finalPrice:
      type: Number
    status:
      type: Number
    createdAt:
      type: Date
    updatedAt:
      type: Date
  )
  Schemas.Delivery = new SimpleSchema(
    warehouseId:
      type: String
    orderId:
      type: String
    creatorId:
      type: String
    deliveryAddress:
      type: String
    contactName:
      type: String
    contactPhone:
      type: String
    deliveryDate:
      type: Date
    comment:
      type: String
    transportationFee:
      type: Number
    shipper:
      type: String
    export:
      type: String
    import:
      type: String
    cashier:
      type: String
    createdAt:
      type: Date
    updatedAt:
      type: Date
  )
  Schemas.Return = new SimpleSchema(
    merchantId:
      type: String
    warehouseId:
      type: String
    orderId:
      type: String
    creatorId:
      type: String
    submitReturn:
      type: String
    name:
      type: String
    productSale:
      type: Number
    productQuality:
      type: Number
    totalPrice:
      type: Number
    comment:
      type: String
    status:
      type: Number
    createdAt:
      type: Date
    updatedAt:
      type: Date
  )
  Schemas.ReturnDetail  = new SimpleSchema(
    orderId:
      type: String
    returnId:
      type: String
    productId:
      type: String
    quality:
      type: String
    price:
      type: Number
    discountCash:
      type: Number
    finalPrice:
      type: Number
    submited:
      type: Boolean
    createdAt:
      type: Date
    updatedAt:
      type: Date
  )
  Schemas.Import = new SimpleSchema(

  )
  Schemas.ImportDetail  = new SimpleSchema(

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

  Merchants.attachSchema(Schemas.Merchant)
  Warehouses.attachSchema(Schemas.Warehouse)
  Skulls.attachSchema(Schemas.Skull)
  Providers.attachSchema(Schemas.Provider)
  Products.attachSchema(Schemas.Product)
  ProductSummaries.attachSchema(Schemas.ProductSummarie)
  MetroSummaries.attachSchema(Schemas.MetroSummarie)
  Orders.attachSchema(Schemas.Order)
  OrderDetails.attachSchema(Schemas.OrderDetail)
  Deliveries.attachSchema(Schemas.Delivery)
  Returns.attachSchema(Schemas.Return)
  ReturnDetails.attachSchema(Schemas.ReturnDetail)
  Imports.attachSchema(Schemas.Import)
  ImportDetails.attachSchema(Schemas.ImportDetail)
  Exports.attachSchema(Schemas.Export)
  ExportDetails.attachSchema(Schemas.ExportDetail)
  Inventeries.attachSchema(Schemas.Inventerie)
  InventeryDetails.attachSchema(Schemas.InventeryDetail)
  Transactions.attachSchema(Schemas.Transaction)
  TransactionDetails.attachSchema(Schemas.TransactionDetail)

  Books.attachSchema(Schemas.Book)

  return


if root.Meteor.isServer
  Meteor.startup ->


