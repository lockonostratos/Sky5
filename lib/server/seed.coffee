Meteor.startup ->
  resetDatabase()
  if Schema.Merchant.find().count() is 0
    account = Accounts.createUser(email: 'lehaoson@gmail.com', password: '123456')
    huynhChauId = Model.Merchant.Create { name: 'Huynh Chau' }, account
    Model.Merchant.Create { name: 'Euro Windows' }, account

    merchant = Model.Merchant.FindById huynhChauId
    merchant.addBranch { name: 'Huynh Chau HA NOI' }, account
    merchant.addWarehouse { name: 'Kho Chính' }, account
    seedProvidersFor merchant, account
    seedSkullsFor merchant, account

resetDatabase = ->
  Schema.Merchant.remove({})
  Meteor.users.remove({})

seedAccountsFor = (merchant) ->
  merchant.addAccount


seedProvidersFor = (merchant, account) ->
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
  merchant.addProvider { name: "DẦU NHỚT #{provider}" }, account for provider in providers

seedSkullsFor = (merchant, account) ->
  skulls = [
    "QUI CÁCH"
    "ĐƠN VỊ TÍNH"
  ]
  merchant.addSkull { name: skull }, account for skull in skulls

seedProductsFor = (merchant) ->
