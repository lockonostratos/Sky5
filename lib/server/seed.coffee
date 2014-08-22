Meteor.startup ->
  resetDatabase()
  if Schema.Merchant.find().count() is 0
    creator = Accounts.createUser(email: 'lehaoson@gmail.com', password: '123456')
    huynhChauId = Model.Merchant.Create { name: 'Huynh Chau', creator: creator }
    Model.Merchant.Create { name: 'Euro Windows', creator: creator }

    merchant = Model.Merchant.FindById huynhChauId
    merchant.addBranch { name: 'Huynh Chau HA NOI', creator: creator }
    warehouse = merchant.addWarehouse { name: 'Kho Chính', creator: creator }
    seedProvidersFor merchant, creator
    seedSkullsFor merchant, creator
    seedProductsFor merchant, creator, warehouse

resetDatabase = ->
  Meteor.users.remove({})
  Schema.Merchant.remove({})
  Schema.Warehouse.remove({})
  Schema.Provider.remove({})
  Schema.Skull.remove({})
  Schema.Import.remove({})
  Schema.Product.remove({})
  Schema.ProductDetail.remove({})

seedAccountsFor = (merchant) ->
  merchant.addAccount

seedProvidersFor = (merchant, creator) ->
  providers = [
    "BP"
    "CASTROL"
    "HONDA"
    "YAMAHA"
    "SYM"
    "SUZUKI"
    "SHELL ADVANCE"
    "VILUBE"
    "INDO - PETROL"
    "THÁI ECO"
    "MOTUL"
    "OGAWA"
    "CALTEX"
    "NIKKO"
    "SPECTROL"
    "MEKONG"
    "SHIP OIL"
  ]
  merchant.addProvider { name: "DẦU NHỚT #{provider}", creator: creator } for provider in providers

seedSkullsFor = (merchant, creator) ->
  skulls = [
    "QUI CÁCH"
    "ĐƠN VỊ TÍNH"
  ]
  merchant.addSkull { name: skull, creator: creator } for skull in skulls

seedProductsFor = (merchant, creator, warehouse) ->


  childPro = merchant.addProduct
    creator: creator
    warehouse: warehouse
    name: "Advance SX2"
    productCode: "1234567890123"
    skulls: ["1L", "CHAI"]
    price: 725000

  pro = merchant.addProduct
    creator: creator
    warehouse: warehouse
    name: "Advance SX2"
    productCode: "123456789003"
    skulls: ["1L", "THÙNG"]
    childProduct: {product: childPro, quality: 20}
    price: 1400000

  products = [
    { name: "Helix HX3", productCode: "123456789002", skulls: ["12L", "CHAI"], price: 63000 }
    { name: "Helix HX3", productCode: "123456789003", skulls: ["9L", "CHAI"], price: 543000 }
    { name: "Helix Ultra", productCode: "123456789004", skulls: ["4L", "CHAI"], price: 63000 }
    { name: "Helix Diesel HX5", productCode: "123456789005", skulls: ["6L", "CHAI"], price: 424000 }
    { name: "Rimula R1", productCode: "123456789006", skulls: ["209L", "THÙNG"], price: 10287000 }
    { name: "Gadus S2 V100", productCode: "123456789007", skulls: ["180K", "THÙNG"], price: 18219000 }
    { name: "Tellus S2 M100", productCode: "123456789008", skulls: ["209L", "THÙNG"], price: 18219000 }
  ]

  importDetails = []
  for product in products
    product.creator = creator
    product.warehouse = warehouse
    id = merchant.addProduct product

    importDetails.push
      product: id
      importQuality: 100
      importPrice: product.price

  importDetails.push
    product: pro
    importQuality: 100
#    importPrice: 1200000

  imprt = merchant.import {
    creator: creator
    description: "Nhập tồn đầu kỳ 2014"
    warehouse: warehouse
  }, importDetails