Meteor.startup ->
  resetDatabase()
  if Schema.Merchant.find().count() is 0
    huynhChauId = Model.Merchant.Create 'Huynh Chau'
    Model.Merchant.Create 'Euro Windows'

    merchant = Model.Merchant.FindById huynhChauId
    merchant.addBranch { name: 'Huynh Chau HA NOI' }
    merchant.addWarehouse { name: 'Kho Chính' }
    seedProvidersFor merchant



resetDatabase = ->
  Schema.Merchant.remove({})

seedProvidersFor = (merchant) ->
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
  merchant.addProvider { name: "DẦU NHỚT #{provider}" } for provider in providers
