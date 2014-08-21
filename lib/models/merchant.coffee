class Model.Merchant
  @Create: (obj, creator) ->
    obj.creator = creator
    Schema.Merchant.insert obj

  @FindById: (id) ->
    found = Schema.Merchant.findOne(_id: id)
    return new @(found) if found
    return undefined

  @Find: (condition) ->
    found = Schema.Merchant.findOne(condition)
    return new @(found) if found
    return undefined

  constructor: (@data) -> @id = @data._id

  addAccount: (obj, creator, currentWarehouse = null) =>
    obj.merchant = @id
    obj.creator = creator
    obj.currentWarehouse = currentWarehouse if currentWarehouse
    Accounts.createUser obj

  addBranch: (obj, creator) =>
    obj.parent = @id
    obj.creator = creator
    Schema.Merchant.insert obj

  addWarehouse: (obj, creator) =>
    obj.merchant = @id
    obj.creator = creator
    Schema.Warehouse.insert obj

  addProvider: (obj, creator) ->
    obj.merchant = @id
    obj.creator = creator
    Schema.Provider.insert obj

  addSkull: (obj, creator) ->
    obj.merchant = @id
    obj.creator = creator
    Schema.Skull.insert obj