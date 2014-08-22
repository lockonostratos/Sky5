class Model.Merchant
  @Create: (option) -> Schema.Merchant.insert option

  @FindById: (id) ->
    found = Schema.Merchant.findOne(_id: id)
    return new @(found) if found
    return undefined

  @Find: (condition) ->
    found = Schema.Merchant.findOne(condition)
    return new @(found) if found
    return undefined

  constructor: (@data) -> @id = @data._id

  addAccount: (option, creator, currentWarehouse = null) =>
    option.merchant = @id
    option.creator = creator
    option.currentWarehouse = currentWarehouse if currentWarehouse
    Accounts.createUser option

  addBranch: (option) =>
    option.parent = @id
    Schema.Merchant.insert option

  addWarehouse: (option) =>
    option.merchant = @id
    Schema.Warehouse.insert option

  addProvider: (option) ->
    option.merchant = @id
    Schema.Provider.insert option

  addSkull: (option) ->
    option.merchant = @id
    Schema.Skull.insert option

  addProduct: (option) ->
    option.merchant = @id
    option.quality = 0
    Schema.Product.insert option

  #option: warehouse, creator, description
  #productDetails: product, importQuality, importPrice, provider?, exprire?
  import: (option, productDetails) =>
    transaction = new System.Transaction ["productDetails", "imports"]

    option.merchant = @id
    option.systemTransaction = transaction.id
    newImport = Schema.Import.insert option

    for productDetail in productDetails
      product = Schema.Product.findOne productDetail.product
      if !product then transaction.rollBack(); return

      productDetail.import = newImport
      productDetail.merchant = @id
      productDetail.warehouse = option.warehouse
      productDetail.creator = option.creator
      productDetail.availableQuality = productDetail.importQuality
      productDetail.instockQuality = productDetail.importQuality
      productDetail.systemTransaction = transaction.id

      Schema.ProductDetail.insert productDetail, (error, result) ->
        if error then transaction.rollBack(); return

      #@updateProductQualities productDetail


  #PRIVATES------------------------------------
  updateProductQualities: (detail) ->
    product = Schema.Product.findOne detail.product
    #TODO: implement this section

