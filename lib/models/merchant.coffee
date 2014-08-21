class Model.Merchant
  @Create: (name) ->
    Schema.Merchant.insert {name: name}

  @FindById: (id) ->
    found = Schema.Merchant.findOne(_id: id)
    return new @(found) if found
    return undefined

  @Find: (condition) ->
    found = Schema.Merchant.findOne(condition)
    return new @(found) if found
    return undefined

  constructor: (@data) -> @id = @data._id

  addBranch: (obj) =>
    obj.parent = @id
    Schema.Merchant.insert obj

  addWarehouse: (obj) =>
    obj.parentMerchant = @id
    Schema.Warehouse.insert obj

  addProvider: (obj) ->
    obj.parentMerchant = @id
    Schema.Provider.insert obj
